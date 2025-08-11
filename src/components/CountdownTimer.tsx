import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  className?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ className = '' }) => {
  const [countdowns, setCountdowns] = useState({
    newYear: 0,
    blackFriday: 0,
    cyberMonday: 0,
    christmas: 0,
    chineseNewYear: 0,
    valentinesDay: 0
  });

  useEffect(() => {
    const calculateDays = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // 计算各种节日的日期
      const newYear = new Date(currentYear + 1, 0, 1);
      const blackFriday = new Date(currentYear, 10, 29); // 11月最后一个星期五
      const cyberMonday = new Date(currentYear, 10, 2); // 11月第一个星期一
      const christmas = new Date(currentYear, 11, 25);
      const chineseNewYear = new Date(currentYear, 1, 10); // 简化处理
      const valentinesDay = new Date(currentYear + 1, 1, 14);

      // 如果今年的节日已经过了，计算明年的
      const adjustDate = (date: Date, targetYear: number) => {
        if (date < now) {
          return new Date(targetYear + 1, date.getMonth(), date.getDate());
        }
        return date;
      };

      const daysDiff = (target: Date) => {
        const diffTime = target.getTime() - now.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      };

      setCountdowns({
        newYear: daysDiff(adjustDate(newYear, currentYear)),
        blackFriday: daysDiff(adjustDate(blackFriday, currentYear)),
        cyberMonday: daysDiff(adjustDate(cyberMonday, currentYear)),
        christmas: daysDiff(adjustDate(christmas, currentYear)),
        chineseNewYear: daysDiff(adjustDate(chineseNewYear, currentYear)),
        valentinesDay: daysDiff(adjustDate(valentinesDay, currentYear))
      });
    };

    calculateDays();
    const interval = setInterval(calculateDays, 60000); // 每分钟更新一次

    return () => clearInterval(interval);
  }, []);

  const getCurrentWeek = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const days = Math.floor((now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);
    return `${now.getFullYear()}年第${weekNumber}周`;
  };

  return (
    <div className={`bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-4 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between text-sm">
          <div className="font-medium">
            {getCurrentWeek()}
          </div>
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <span>距2026年还有</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded font-bold">{countdowns.newYear}</span>
              <span>天</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>距黑五还有</span>
              <span className="bg-red-500 px-2 py-1 rounded font-bold">{countdowns.blackFriday}</span>
              <span>天</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>距网络星期一还有</span>
              <span className="bg-blue-500 px-2 py-1 rounded font-bold">{countdowns.cyberMonday}</span>
              <span>天</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>距圣诞节还有</span>
              <span className="bg-green-500 px-2 py-1 rounded font-bold">{countdowns.christmas}</span>
              <span>天</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>距春节还有</span>
              <span className="bg-red-500 px-2 py-1 rounded font-bold">{countdowns.chineseNewYear}</span>
              <span>天</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>距情人节还有</span>
              <span className="bg-red-500 px-2 py-1 rounded font-bold">{countdowns.valentinesDay}</span>
              <span>天</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 