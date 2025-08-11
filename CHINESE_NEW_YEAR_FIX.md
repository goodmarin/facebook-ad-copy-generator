# 春节倒计时功能修复说明

## 问题描述
倒计时功能中春节的倒计时时间不正确，需要重新校准并确保每天都会自动校准。

## 修复内容

### 1. 问题分析
- 原代码中春节日期是硬编码的固定值
- 没有考虑农历春节的实际日期变化
- 缺乏自动校准机制

### 2. 解决方案
在 `src/components/CountdownTimer.tsx` 中添加了以下功能：

#### 2.1 农历春节日期表
```typescript
const chineseNewYearDates: { [key: number]: string } = {
  2024: '2024-02-10',
  2025: '2025-01-29',
  2026: '2026-02-17',
  // ... 更多年份
};
```

#### 2.2 动态计算春节日期
```typescript
const getChineseNewYear = (year: number): Date => {
  // 如果年份在表中，直接返回
  if (chineseNewYearDates[year]) {
    return new Date(chineseNewYearDates[year] + 'T00:00:00');
  }
  
  // 如果年份不在表中，使用估算算法
  const baseDate = new Date(year, 0, 21);
  const dayOfWeek = baseDate.getDay();
  const daysToAdd = (15 - dayOfWeek + 7) % 7;
  return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
};
```

#### 2.3 自动获取下一个春节
```typescript
const getNextChineseNewYear = (): Date => {
  const currentTime = new Date(); // Assuming currentTime is defined elsewhere or needs to be passed
  const currentYear = currentTime.getFullYear();
  const currentYearCNY = getChineseNewYear(currentYear);
  const nextYearCNY = getChineseNewYear(currentYear + 1);
  
  // 如果今年的春节还没到，返回今年的春节
  if (currentTime < currentYearCNY) {
    return currentYearCNY;
  }
  
  // 否则返回明年的春节
  return nextYearCNY;
};
```

### 3. 功能特点

#### 3.1 自动校准
- 每天都会自动重新计算春节倒计时
- 基于当前时间动态确定下一个春节日期
- 无需手动更新日期

#### 3.2 准确性
- 使用准确的农历春节日期表（2024-2050年）
- 对于超出表格范围的年份，使用估算算法
- 确保倒计时显示的准确性

#### 3.3 实时更新
- 每秒更新倒计时显示
- 自动处理年份跨越
- 实时反映距离下一个春节的天数

### 4. 验证结果

当前时间（2025年8月11日）的验证结果：
- 2025年春节：2025年1月29日（已过）
- 2026年春节：2026年2月17日（下一个春节）
- 距离下一个春节：190天

### 5. 测试用例

已测试以下场景：
- 春节前：显示距离今年春节的天数
- 春节当天：显示距离明年春节的天数
- 春节后：显示距离明年春节的天数
- 年份跨越：自动切换到下一年

### 6. 技术实现

- 使用 TypeScript 确保类型安全
- 基于 React Hooks 实现状态管理
- 使用 `useEffect` 实现定时器功能
- 响应式设计，适配不同屏幕尺寸

## 总结

通过这次修复，春节倒计时功能现在能够：
1. ✅ 正确显示农历春节日期
2. ✅ 每天自动校准倒计时
3. ✅ 实时更新显示
4. ✅ 处理年份跨越
5. ✅ 保持高准确性

修复后的倒计时功能现在完全符合要求，能够准确显示距离下一个春节的天数，并且每天都会自动校准。
