import React, { useState, useEffect } from 'react';

interface CountdownItem {
  name: string;
  targetDate: Date;
  color: string;
}

export const CountdownTimer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // 计算农历春节日期
  const getChineseNewYear = (year: number): Date => {
    // 农历春节日期表（公历日期）
    const chineseNewYearDates: { [key: number]: string } = {
      2024: '2024-02-10',
      2025: '2025-01-29',
      2026: '2026-02-17',
      2027: '2027-02-06',
      2028: '2028-01-26',
      2029: '2029-02-13',
      2030: '2030-02-03',
      2031: '2031-01-23',
      2032: '2032-02-11',
      2033: '2033-01-31',
      2034: '2034-02-19',
      2035: '2035-02-08',
      2036: '2036-01-28',
      2037: '2037-02-15',
      2038: '2038-02-04',
      2039: '2039-01-24',
      2040: '2040-02-12',
      2041: '2041-02-01',
      2042: '2042-01-22',
      2043: '2043-02-10',
      2044: '2044-01-30',
      2045: '2045-02-17',
      2046: '2046-02-06',
      2047: '2047-01-26',
      2048: '2048-02-14',
      2049: '2049-02-02',
      2050: '2050-01-23'
    };

    // 如果年份在表中，直接返回
    if (chineseNewYearDates[year]) {
      return new Date(chineseNewYearDates[year] + 'T00:00:00');
    }

    // 如果年份不在表中，使用简单的估算（农历春节通常在1月21日到2月20日之间）
    // 这里使用一个简化的算法，实际应用中可能需要更复杂的农历转换库
    const baseDate = new Date(year, 0, 21); // 1月21日作为基准
    const dayOfWeek = baseDate.getDay();
    const daysToAdd = (15 - dayOfWeek + 7) % 7; // 调整到最近的农历春节
    return new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  };

  // 获取下一个春节日期
  const getNextChineseNewYear = (): Date => {
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

  // 动态计算节日日期，参考AMZ123网站
  const getCountdownItems = (): CountdownItem[] => {
    const currentYear = currentTime.getFullYear();
    const nextYear = currentYear + 1;
    
    // 计算黑五日期（11月最后一个星期五）
    const getBlackFriday = (year: number) => {
      const november = new Date(year, 10, 1); // 11月1日
      const firstFriday = new Date(november);
      while (firstFriday.getDay() !== 5) { // 5 = 星期五
        firstFriday.setDate(firstFriday.getDate() + 1);
      }
      return new Date(firstFriday.getTime() + 3 * 7 * 24 * 60 * 60 * 1000); // 第4个星期五
    };

    // 计算网络星期一（黑五后的第一个星期一）
    const getCyberMonday = (blackFriday: Date) => {
      const cyberMonday = new Date(blackFriday);
      cyberMonday.setDate(blackFriday.getDate() + 3); // 黑五后3天
      return cyberMonday;
    };

    const blackFriday = getBlackFriday(currentYear);
    const cyberMonday = getCyberMonday(blackFriday);
    
    // 如果今年的黑五已经过了，计算明年的
    const adjustedBlackFriday = blackFriday < currentTime ? getBlackFriday(nextYear) : blackFriday;
    const adjustedCyberMonday = cyberMonday < currentTime ? getCyberMonday(getBlackFriday(nextYear)) : cyberMonday;

    // 获取下一个春节日期
    const nextChineseNewYear = getNextChineseNewYear();

    return [
      {
        name: '2026年',
        targetDate: new Date('2026-01-01T00:00:00'),
        color: 'bg-white bg-opacity-20'
      },
      {
        name: '黑五',
        targetDate: adjustedBlackFriday,
        color: 'bg-red-500'
      },
      {
        name: '网络星期一',
        targetDate: adjustedCyberMonday,
        color: 'bg-blue-500'
      },
      {
        name: '圣诞节',
        targetDate: new Date(currentYear, 11, 25) < currentTime ? 
          new Date(nextYear, 11, 25) : new Date(currentYear, 11, 25),
        color: 'bg-green-500'
      },
      {
        name: '春节',
        targetDate: nextChineseNewYear,
        color: 'bg-red-500'
      },
      {
        name: '情人节',
        targetDate: new Date(currentYear, 1, 14) < currentTime ? 
          new Date(nextYear, 1, 14) : new Date(currentYear, 1, 14),
        color: 'bg-red-500'
      }
    ];
  };

  const countdownItems = getCountdownItems();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateDays = (targetDate: Date) => {
    const diffTime = targetDate.getTime() - currentTime.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getCurrentWeek = () => {
    const startOfYear = new Date(currentTime.getFullYear(), 0, 1);
    const days = Math.floor((currentTime.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
  };

  return (
    <div className="bg-gray-50 text-gray-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          <div className="font-semibold text-base">
            {currentTime.getFullYear()}年第{getCurrentWeek()}周
          </div>
          <div className="flex space-x-6">
            {countdownItems.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">距{item.name}还有</span>
                <span className="text-red-600 font-bold text-lg">
                  {calculateDays(item.targetDate)}
                </span>
                <span className="text-gray-600 font-medium">天</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 