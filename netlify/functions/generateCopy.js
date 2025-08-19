// Netlify Function: generateCopy
// Fan-out to multiple provider keys (hedged requests) and return the fastest successful response

const PROVIDERS = () => {
  const providers = [];
  if (process.env.DEEPSEEK_KEY_1) {
    providers.push({ name: 'deepseek-1', url: 'https://api.deepseek.com/v1/chat/completions', key: process.env.DEEPSEEK_KEY_1 });
  }
  if (process.env.DEEPSEEK_KEY_2) {
    providers.push({ name: 'deepseek-2', url: 'https://api.deepseek.com/v1/chat/completions', key: process.env.DEEPSEEK_KEY_2 });
  }
  // Fallback to a single key if provided under DEEPSEEK_API_KEY
  if (providers.length === 0 && process.env.DEEPSEEK_API_KEY) {
    providers.push({ name: 'deepseek-default', url: 'https://api.deepseek.com/v1/chat/completions', key: process.env.DEEPSEEK_API_KEY });
  }
  return providers;
};

const withTimeout = (promise, ms, controller) => {
  const timeout = new Promise((_, reject) => {
    const id = setTimeout(() => {
      try { controller && controller.abort(); } catch {}
      reject(new Error(`Upstream request timed out after ${ms}ms`));
    }, ms);
    promise.finally(() => clearTimeout(id));
  });
  return Promise.race([promise, timeout]);
};

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const providers = PROVIDERS();
    if (providers.length === 0) {
      return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'No provider keys configured' }) };
    }

    const payload = event.body ? JSON.parse(event.body) : {};
    const { messages, prompt, model, max_tokens, temperature, top_p, presence_penalty, frequency_penalty } = payload;

    const requestBody = {
      model: model || 'deepseek-chat',
      messages: messages && Array.isArray(messages) ? messages : [
        { role: 'system', content: 'You are a helpful AI copywriter.' },
        { role: 'user', content: String(prompt || '') }
      ],
      max_tokens: typeof max_tokens === 'number' ? max_tokens : 600,
      temperature: typeof temperature === 'number' ? temperature : 0.7,
      top_p: typeof top_p === 'number' ? top_p : 0.8,
      presence_penalty: typeof presence_penalty === 'number' ? presence_penalty : 0.1,
      frequency_penalty: typeof frequency_penalty === 'number' ? frequency_penalty : 0.1
    };

    const abortController = new AbortController();
    const tasks = providers.map(p =>
      withTimeout(
        fetch(p.url, {
          method: 'POST',
          signal: abortController.signal,
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${p.key}` },
          body: JSON.stringify(requestBody)
        }).then(async (res) => {
          if (!res.ok) {
            let detail;
            try { detail = await res.json(); } catch {}
            throw new Error(`${p.name} ${res.status} ${res.statusText}${detail ? ` - ${JSON.stringify(detail)}` : ''}`);
          }
          const data = await res.json();
          return { provider: p.name, data };
        }),
        20000,
        abortController
      )
    );

    let winner;
    try {
      winner = await Promise.any(tasks);
      try { abortController.abort(); } catch {}
    } catch {
      try { abortController.abort(); } catch {}
      winner = null;
    }

    if (!winner) {
      return { statusCode: 502, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'All providers failed' }) };
    }

    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(winner.data) };
  } catch (err) {
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown error' }) };
  }
};


