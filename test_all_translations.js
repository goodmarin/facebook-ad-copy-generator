// 测试所有72个地区的护肤产品翻译
console.log('=== 验证所有地区的护肤产品翻译 ===\n');

// 从 languages.ts 中提取的所有地区代码
const allRegions = [
  'JP', 'KR', 'IN', 'SG', 'MY', 'TH', 'VN', 'ID', 'PH', 'MM', 'KH', 'LA', 'BN', 'TW', 'HK',
  'US', 'CA', 'MX', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'SE', 'NO', 'DK', 'FI', 'CH',
  'AT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'LT', 'LV', 'EE', 'IE', 'PT', 'GR',
  'AE', 'SA', 'IL', 'TR', 'EG', 'QA', 'KW', 'BH', 'OM', 'BR', 'AR', 'CL', 'CO', 'PE', 'VE',
  'UY', 'PY', 'EC', 'AU', 'NZ', 'ZA', 'NG', 'KE', 'GH', 'MA', 'TN', 'DZ'
];

// 模拟翻译数据（从App.tsx中提取）
const translations = {
  '护肤美容产品': {
    'US': 'Skincare & Beauty Products',
    'JP': 'スキンケア・ビューティー製品',
    'KR': '스킨케어 & 뷰티 제품',
    'GB': 'Skincare & Beauty Products',
    'DE': 'Hautpflege- & Schönheitsprodukte',
    'FR': 'Produits de Soins & Beauté',
    'IT': 'Prodotti per la Cura della Pelle & Bellezza',
    'ES': 'Productos de Cuidado de la Piel & Belleza',
    'SG': 'Skincare & Beauty Products',
    'MY': 'Produk Penjagaan Kulit & Kecantikan',
    'TH': 'ผลิตภัณฑ์ดูแลผิวและความงาม',
    'VN': 'Sản Phẩm Chăm Sóc Da & Làm Đẹp',
    'ID': 'Produk Perawatan Kulit & Kecantikan',
    'AU': 'Skincare & Beauty Products',
    'NZ': 'Skincare & Beauty Products',
    'LT': 'Odos priežiūros ir grožio produktai',
    'LV': 'Ādas kopšanas un skaistuma produkti',
    'IN': 'Skincare & Beauty Products',
    'PH': 'Skincare & Beauty Products',
    'MM': 'Skincare & Beauty Products',
    'KH': 'Skincare & Beauty Products',
    'LA': 'Skincare & Beauty Products',
    'BN': 'Skincare & Beauty Products',
    'TW': 'Skincare & Beauty Products',
    'HK': 'Skincare & Beauty Products',
    'CA': 'Skincare & Beauty Products',
    'MX': 'Productos de Cuidado de la Piel & Belleza',
    'NL': 'Huidverzorging & Schoonheidsproducten',
    'BE': 'Huidverzorging & Schoonheidsproducten',
    'SE': 'Hudvård & Skönhetsprodukter',
    'NO': 'Hudpleie & Skjønnhetsprodukter',
    'DK': 'Hudpleje & Skønhedsprodukter',
    'FI': 'Ihonhoito & Kauneustuotteet',
    'CH': 'Hautpflege- & Schönheitsprodukte',
    'AT': 'Hautpflege- & Schönheitsprodukte',
    'PL': 'Produkty do Pielęgnacji Skóry & Urody',
    'CZ': 'Produkty pro Péči o Pleť & Krásu',
    'HU': 'Bőrápolási & Szépségápolási Termékek',
    'RO': 'Produse de Îngrijire a Pielei & Frumusețe',
    'BG': 'Продукти за Грижа за Кожата & Красота',
    'HR': 'Proizvodi za Njegu Kože & Ljepote',
    'SI': 'Izdelki za Nego Kože & Lepote',
    'SK': 'Produkty pre Starostlivosť o Pleť & Krásu',
    'EE': 'Nahahooldus & Ilutooted',
    'IE': 'Skincare & Beauty Products',
    'PT': 'Produtos de Cuidado da Pele & Beleza',
    'GR': 'Προϊόντα Φροντίδας Δέρματος & Ομορφιάς',
    'AE': 'منتجات العناية بالبشرة والجمال',
    'SA': 'منتجات العناية بالبشرة والجمال',
    'IL': 'מוצרי טיפוח עור ויופי',
    'TR': 'Cilt Bakımı & Güzellik Ürünleri',
    'EG': 'منتجات العناية بالبشرة والجمال',
    'QA': 'منتجات العناية بالبشرة والجمال',
    'KW': 'منتجات العناية بالبشرة والجمال',
    'BH': 'منتجات العناية بالبشرة والجمال',
    'OM': 'منتجات العناية بالبشرة والجمال',
    'BR': 'Produtos de Cuidado da Pele & Beleza',
    'AR': 'Productos de Cuidado de la Piel & Belleza',
    'CL': 'Productos de Cuidado de la Piel & Belleza',
    'CO': 'Productos de Cuidado de la Piel & Belleza',
    'PE': 'Productos de Cuidado de la Piel & Belleza',
    'VE': 'Productos de Cuidado de la Piel & Belleza',
    'UY': 'Productos de Cuidado de la Piel & Belleza',
    'PY': 'Productos de Cuidado de la Piel & Belleza',
    'EC': 'Productos de Cuidado de la Piel & Belleza',
    'ZA': 'Skincare & Beauty Products',
    'NG': 'Skincare & Beauty Products',
    'KE': 'Skincare & Beauty Products',
    'GH': 'Skincare & Beauty Products',
    'MA': 'منتجات العناية بالبشرة والجمال',
    'TN': 'منتجات العناية بالبشرة والجمال',
    'DZ': 'منتجات العناية بالبشرة والجمال'
  }
};

// 检查每个地区是否有翻译
console.log('总地区数量:', allRegions.length);

const missingRegions = [];
const supportedRegions = [];

allRegions.forEach(region => {
  if (translations['护肤美容产品'][region]) {
    supportedRegions.push(region);
  } else {
    missingRegions.push(region);
  }
});

console.log('已翻译地区数量:', supportedRegions.length);
console.log('缺少翻译的地区数量:', missingRegions.length);

if (missingRegions.length > 0) {
  console.log('\n❌ 缺少翻译的地区:');
  missingRegions.forEach((region, index) => {
    console.log(`${index + 1}. ${region}`);
  });
} else {
  console.log('\n✅ 所有地区都有翻译！');
}

// 按地区分类显示
console.log('\n=== 按地区分类 ===');

const regionCategories = {
  '亚洲': ['JP', 'KR', 'IN', 'SG', 'MY', 'TH', 'VN', 'ID', 'PH', 'MM', 'KH', 'LA', 'BN', 'TW', 'HK'],
  '北美': ['US', 'CA', 'MX'],
  '欧洲': ['GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'SE', 'NO', 'DK', 'FI', 'CH', 'AT', 'PL', 'CZ', 'HU', 'RO', 'BG', 'HR', 'SI', 'SK', 'LT', 'LV', 'EE', 'IE', 'PT', 'GR'],
  '中东': ['AE', 'SA', 'IL', 'TR', 'EG', 'QA', 'KW', 'BH', 'OM'],
  '南美': ['BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'UY', 'PY', 'EC'],
  '大洋洲': ['AU', 'NZ'],
  '非洲': ['ZA', 'NG', 'KE', 'GH', 'MA', 'TN', 'DZ']
};

Object.entries(regionCategories).forEach(([category, regions]) => {
  const missingInCategory = regions.filter(region => !translations['护肤美容产品'][region]);
  const supportedInCategory = regions.filter(region => translations['护肤美容产品'][region]);
  
  console.log(`\n${category}:`);
  console.log(`  已支持: ${supportedInCategory.length}/${regions.length}`);
  if (missingInCategory.length > 0) {
    console.log(`  缺少: ${missingInCategory.join(', ')}`);
  }
});

console.log('\n=== 测试完成 ===');
