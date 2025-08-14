// 测试emoji和乱码问题
console.log('=== 测试emoji和乱码问题 ===\n');

// 模拟AI生成的文案
const testCopies = [
  "Portable Design နဲ့ Durable Material တို့ပါဝင်တဲ့ ကျန်းမာရေးပစ္စည်းများ အိမ်တိုင်းရောက်ရှိနေပါပြီ! ✨ အထူးအခွင့်အရေးကို လက်လွတ်မခံပါနဲ့ - ယခုပဲ ဝယ်ယူလိုက်ပါ!",
  "Transform your home into a gym with our portable & multi-functional fitness equipment! ⭐ Durable design perfect for family workouts. Limited-time offer - don't miss out! Click now to upgrade your home fitness!",
  "Portable & Durable Fitness Equipment သူတွေအတွက် လာပါပြီ! ⭐ အထူးအခွင့်အရေးကို လက်လွတ်မခံပါနဲ့ - ယခုပဲ ဝယ်ယူလိုက်ပါ!"
];

// 模拟当前的cleanEmojis函数
const cleanEmojis = (text) => {
  if (!text) return '';
  
  let cleanedText = text;
  
  // 第一轮：只移除真正的乱码字符，保留所有正常字符
  cleanedText = cleanedText.replace(/[\uFFFD\uFFFE\uFFFF]/g, ''); // 替换字符（真正的乱码）
  cleanedText = cleanedText.replace(/[\uD800-\uDFFF](?![\uDC00-\uDFFF])/g, ''); // 孤立的代理对
  cleanedText = cleanedText.replace(/(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, ''); // 孤立的代理对
  
  // 第二轮：移除控制字符（除了换行符和制表符）
  cleanedText = cleanedText.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '');
  
  // 第三轮：移除零宽字符
  cleanedText = cleanedText.replace(/[\u200B-\u200D\uFEFF]/g, '');
  
  // 第四轮：移除其他可能的乱码字符
  cleanedText = cleanedText.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  
  // 清理多余的空格和换行
  cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
  
  return cleanedText;
};

// 模拟缅甸语处理
const processMyanmar = (text) => {
  let processed = text;
  
  // 第一轮：移除所有中文字符和标点
  processed = processed.replace(/[\u4E00-\u9FFF\u3000-\u303F\uFF00-\uFFEF]/g, '');
  
  // 第二轮：移除控制字符和零宽字符
  processed = processed.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, '');
  
  // 第三轮：移除真正的乱码字符
  processed = processed.replace(/[\uFFFD\uFFFE\uFFFF]/g, '');
  
  // 第四轮：清理多余的空格
  processed = processed.replace(/\s+/g, ' ').trim();
  
  return processed;
};

// 测试每个文案
testCopies.forEach((copy, index) => {
  console.log(`=== 文案 ${index + 1} ===`);
  console.log('原始:', copy);
  console.log('长度:', copy.length);
  
  // 检查是否包含特殊字符
  const hasSpecialChars = /[\uFFFD\uFFFE\uFFFF]/.test(copy);
  const hasEmoji = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(copy);
  
  console.log('包含乱码字符:', hasSpecialChars ? '是' : '否');
  console.log('包含emoji:', hasEmoji ? '是' : '否');
  
  // 第一轮清理
  const cleaned1 = cleanEmojis(copy);
  console.log('第一轮清理后:', cleaned1);
  console.log('长度:', cleaned1.length);
  
  // 缅甸语处理
  const cleaned2 = processMyanmar(cleaned1);
  console.log('缅甸语处理后:', cleaned2);
  console.log('长度:', cleaned2.length);
  
  // 字符分析
  console.log('字符分析:');
  for (let i = 0; i < Math.min(cleaned2.length, 20); i++) {
    const char = cleaned2[i];
    const code = char.charCodeAt(0);
    console.log(`  位置${i}: "${char}" (U+${code.toString(16).toUpperCase()})`);
  }
  
  console.log('\n');
});

// 测试可能导致问题的emoji
console.log('=== 测试问题emoji ===');
const problemEmojis = ['✨', '⭐', '🎉', '💡', '🚀', '🎯', '💪', '🎵', '🎧', '🎁', '🔥'];

problemEmojis.forEach(emoji => {
  const code = emoji.codePointAt(0);
  const hex = code.toString(16).toUpperCase();
  console.log(`${emoji}: U+${hex} (${code})`);
  
  // 检查是否在安全范围内
  const isSafe = (code >= 0x1F600 && code <= 0x1F64F) || 
                 (code >= 0x1F300 && code <= 0x1F5FF) || 
                 (code >= 0x1F680 && code <= 0x1F6FF) || 
                 (code >= 0x2600 && code <= 0x26FF) || 
                 (code >= 0x2700 && code <= 0x27BF);
  
  console.log(`  是否安全: ${isSafe ? '是' : '否'}`);
});

// 测试编码/解码问题
console.log('\n=== 测试编码/解码问题 ===');
const testString = "Portable Design နဲ့ Durable Material တို့ပါဝင်တဲ့ ကျန်းမာရေးပစ္စည်းများ အိမ်တိုင်းရောက်ရှိနေပါပြီ! ✨";

console.log('原始字符串:', testString);
console.log('长度:', testString.length);

// 模拟可能的编码问题
try {
  // 转换为Buffer再转回来
  const buffer = Buffer.from(testString, 'utf8');
  const decoded = buffer.toString('utf8');
  console.log('Buffer编码/解码后:', decoded);
  console.log('长度:', decoded.length);
  console.log('是否相等:', testString === decoded);
  
  // 检查是否有替换字符
  const hasReplacement = decoded.includes('');
  console.log('是否包含替换字符:', hasReplacement ? '是' : '否');
  
} catch (error) {
  console.log('编码/解码错误:', error.message);
}
