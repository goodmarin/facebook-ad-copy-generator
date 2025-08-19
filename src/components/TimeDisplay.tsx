import React, { useState, useEffect } from 'react';

interface TimeZone {
  name: string;
  flag: string;
  timezone: string;
}

export const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeZones: TimeZone[] = [
    { name: '北京', flag: '🇨🇳', timezone: 'Asia/Shanghai' },
    { name: '美东', flag: '🇺🇸', timezone: 'America/New_York' },
    { name: '美西', flag: '🇺🇸', timezone: 'America/Los_Angeles' },
    { name: '英国', flag: '🇬🇧', timezone: 'Europe/London' },
    { name: '欧洲', flag: '🇪🇺', timezone: 'Europe/Paris' },
    { name: '日本', flag: '🇯🇵', timezone: 'Asia/Tokyo' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date, timezone: string) => {
    try {
      return new Intl.DateTimeFormat('zh-CN', {
        timeZone: timezone,
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(date);
    } catch (error) {
      return '--:--:--';
    }
  };

  return (
    <div className="relative overflow-hidden py-2 border-b border-blue-200/60 bg-gradient-to-r from-white/60 to-white/30">
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-3 text-[13px] sm:text-sm">
          {timeZones.map((tz) => (
            <div key={tz.name} className="flex items-center space-x-1.5 px-2 py-1 rounded-md bg-white/70 hover:bg-white/80 backdrop-blur-sm border border-blue-200 transition-colors duration-200">
              <span className="text-sm">{tz.flag}</span>
              <span className="font-medium text-slate-700 hidden md:inline">{tz.name}</span>
              <span className="text-slate-600 font-mono text-[11px] sm:text-xs">
                {formatTime(currentTime, tz.timezone)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
