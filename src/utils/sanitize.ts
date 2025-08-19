// 统一的文案清理与无效字符过滤工具
// - 移除 Markdown 痕迹
// - 过滤 Unicode 替换符(U+FFFD)、控制字符、不可见格式字符
// - 去除非字符码位与孤立代理项，避免渲染为 �

// 去除 Markdown 格式标记，仅保留纯文本
export function stripMarkdown(input: string): string {
	return input
		.replace(/\*\*(.*?)\*\*/g, '$1')
		.replace(/\*(.*?)\*/g, '$1')
		.replace(/`(.*?)`/g, '$1')
		.replace(/\[(.*?)\]\(.*?\)/g, '$1');
}

// 过滤无效字符并规范化
export function sanitizeCopyText(input: string): string {
	if (!input) return '';

	let text = stripMarkdown(input);

	// 移除明显的无效/多余符号
	text = text
		.replace(/[\[\]{}<>|【】「」『』]/g, ' ')
		.replace(/[~^_=\\]/g, ' ');

	// 移除 Unicode 替换符(U+FFFD)
	text = text.replace(/\uFFFD/g, '');

	// 移除 C0/C1 控制字符
	text = text.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

	// 移除零宽与BOM等不可见格式字符，以及变体选择符 VS15/VS16（FE0E/FE0F）
	text = text.replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFE0E\uFE0F\uFEFF]/g, '');

	// 移除非字符码位（BMP 内）以及对象替换符(FFFC)、注解控制(FFF9-FFFB)
	text = text.replace(/[\uFDD0-\uFDEF\uFFFE\uFFFF\uFFFC\uFFF9-\uFFFB]/g, '');

	// 移除增补平面的非字符码位（需要 u 标志）
	text = text.replace(/[\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/gu, '');

	// 移除孤立代理项（未配对的高/低代理）
	text = text.replace(/([\uD800-\uDBFF](?![\uDC00-\uDFFF]))|((?<![\uD800-\uDBFF])[\uDC00-\uDFFF])/g, '');

	// 规范化
	text = text.normalize('NFC');

	// 合并多空格
	text = text.replace(/\s{2,}/g, ' ').trim();

	return text;
}

export default {
	stripMarkdown,
	sanitizeCopyText
};


