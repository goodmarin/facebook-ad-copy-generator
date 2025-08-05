import React, { useState, useEffect } from 'react';

interface CountdownItem {
  name: string;
  date: Date;
  color: string;
}

export const CountdownTimer: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 计算当前是第几周
  const getWeekNumber = (date: Date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
    return Math.ceil((days + startOfYear.getDay() + 1) / 7);
  };

  // 计算距离目标日期的天数
  const getDaysUntil = (targetDate: Date) => {
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  // 重要节日和日期
  const countdownItems: CountdownItem[] = [
    {
      name: '2026年',
      date: new Date(2026, 0, 1),
      color: 'text-orange-500'
    },
    {
      name: '黑五',
      date: new Date(2025, 10, 28), // 11月28日
      color: 'text-red-500'
    },
    {
      name: '网络星期一',
      date: new Date(2025, 11, 1), // 12月1日
      color: 'text-blue-500'
    },
    {
      name: '圣诞节',
      date: new Date(2025, 11, 25), // 12月25日
      color: 'text-green-500'
    },
    {
      name: '春节',
      date: new Date(2026, 0, 29), // 2026年1月29日
      color: 'text-red-600'
    },
    {
      name: '情人节',
      date: new Date(2026, 1, 14), // 2026年2月14日
      color: 'text-pink-500'
    }
  ];

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60); // 每小时更新一次

    return () => clearInterval(timer);
  }, []);

  const currentWeek = getWeekNumber(currentDate);

  return (
    <div className="w-full">
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 w-full">
        <div className="flex items-center justify-between text-sm flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-white/90 font-medium">
              {currentDate.getFullYear()}年第{currentWeek}周
            </span>
          </div>
          
          <div className="flex items-center space-x-4 flex-wrap">
            {countdownItems.map((item, index) => {
              const daysUntil = getDaysUntil(item.date);
              return (
                <div key={index} className="flex items-center space-x-1">
                  <span className="text-white/80">距{item.name}还有</span>
                  <span className={`font-bold text-base ${item.color}`}>
                    {daysUntil > 0 ? daysUntil : 0}
                  </span>
                  <span className="text-white/80">天</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}; 