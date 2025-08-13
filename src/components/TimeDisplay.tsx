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
    <div className="py-2">
      <div className="w-full px-4">
        <div className="flex items-center justify-center gap-4 md:gap-6 text-sm overflow-x-auto">
          {timeZones.map((tz) => (
            <div key={tz.name} className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200 flex-shrink-0">
              <span className="text-base">{tz.flag}</span>
              <span className="font-medium text-slate-700 hidden md:inline">{tz.name}</span>
              <span className="text-slate-600 font-mono text-sm">
                {formatTime(currentTime, tz.timezone)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
