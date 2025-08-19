import { useEffect, useState } from 'react';
import { AppleApp } from './components/AppleApp';
import CopyGeneratorPage from './pages/CopyGeneratorPage';
import LegacyApp from './App';

function normalizeHash(): string {
  const raw = window.location.hash || '#/';
  const cleaned = raw.replace(/^#/, '');
  return cleaned || '/';
}

export default function RootRouter() {
  const [route, setRoute] = useState<string>(normalizeHash());

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeHash());
    window.addEventListener('hashchange', onHashChange);
    // 兼容直接访问不带 hash 的情况
    if (!window.location.hash) {
      window.location.hash = '/';
    }
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  if (route.startsWith('/generate')) {
    return <CopyGeneratorPage />;
  }
  if (route.startsWith('/classic')) {
    return <LegacyApp />;
  }
  return <AppleApp />;
}


