import React, { useState, useEffect } from 'react';

interface ClockProps {
  timezone: string;
  city: string;
  flag: string;
  timeDiff: string;
}

interface AppleStyleClocksProps {
  show: boolean;
}

const AppleStyleClocks: React.FC<AppleStyleClocksProps> = ({ show }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeZones: ClockProps[] = [
  { timezone: 'Asia/Shanghai', city: '北京', flag: '🇨🇳', timeDiff: '+0小时' },
  { timezone: 'America/New_York', city: '美东', flag: '🇺🇸', timeDiff: '-12小时' },
  { timezone: 'America/Los_Angeles', city: '美西', flag: '🇺🇸', timeDiff: '-15小时' },
  { timezone: 'Europe/London', city: '英国', flag: '🇬🇧', timeDiff: '-7小时' },
  { timezone: 'Europe/Paris', city: '欧洲', flag: '🇪🇺', timeDiff: '-6小时' },
  { timezone: 'Asia/Tokyo', city: '日本', flag: '🇯🇵', timeDiff: '+1小时' },
];

  const getTimeInTimezone = (date: Date, timezone: string) => {
    return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  };

  const getClockAngles = (date: Date, timezone: string) => {
    const tzDate = getTimeInTimezone(date, timezone);
    const hours = tzDate.getHours() % 12;
    const minutes = tzDate.getMinutes();
    const seconds = tzDate.getSeconds();

    const hourAngle = (hours * 30) + (minutes * 0.5); // 每小时30度，每分钟0.5度
    const minuteAngle = minutes * 6; // 每分钟6度
    const secondAngle = seconds * 6; // 每秒6度

    return { hourAngle, minuteAngle, secondAngle };
  };

  const Clock: React.FC<ClockProps> = ({ timezone, city, timeDiff }) => {
    const { hourAngle, minuteAngle, secondAngle } = getClockAngles(currentTime, timezone);

    return (
      <div className="flex flex-col items-center">
        {/* 时钟容器 */}
        <div className="relative w-20 h-20 mb-3">
          {/* 时钟外圈 */}
          <div className="absolute inset-0 rounded-full bg-gray-900 border-2 border-gray-700 shadow-lg">
            {/* 时钟数字 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
              const angle = (num * 30) - 90; // 从12点钟方向开始
              const radius = 28; // 数字距离中心的距离
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={num}
                  className="absolute text-white text-xs font-medium"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {num}
                </div>
              );
            })}

            {/* 中心点 */}
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />

            {/* 时针 */}
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-6 bg-white rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom z-5"
              style={{
                transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
              }}
            />

            {/* 分针 */}
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom z-6"
              style={{
                transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
              }}
            />

            {/* 秒针 */}
            <div
              className="absolute top-1/2 left-1/2 w-0.5 h-8 bg-orange-400 rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom z-7"
              style={{
                transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
              }}
            />
          </div>
        </div>

        {/* 城市信息 */}
        <div className="text-center">
          <div className="text-white text-sm font-medium mb-1">{city}</div>
          <div className="text-gray-400 text-xs">
            <span>今天</span>
            <span className="ml-1">{timeDiff}</span>
          </div>
        </div>
      </div>
    );
  };

  if (!show) return null;

  return (
    <div className="mt-6 p-6 bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700/50">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        🌍 全球时间
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {timeZones.map((tz) => (
          <Clock key={tz.timezone} {...tz} />
        ))}
      </div>
    </div>
  );
};

export default AppleStyleClocks;
