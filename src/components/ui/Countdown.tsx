'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = ({ targetDate, className = '' }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`flex justify-center items-center gap-2 sm:gap-4 md:gap-8 lg:gap-12 xl:gap-20 px-2 ${className}`}>
      <div className="text-center flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
        <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-1 sm:pb-2 border-b-2 sm:border-b-4 border-primary px-1 sm:px-2">{timeLeft.days}</div>
        <div className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 font-semibold mt-2 sm:mt-3 md:mt-4 font-sans tracking-wide">Days</div>
      </div>
      <div className="text-center flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
        <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-1 sm:pb-2 border-b-2 sm:border-b-4 border-primary px-1 sm:px-2">{timeLeft.hours}</div>
        <div className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 font-semibold mt-2 sm:mt-3 md:mt-4 font-sans tracking-wide">Hours</div>
      </div>
      <div className="text-center flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
        <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-1 sm:pb-2 border-b-2 sm:border-b-4 border-primary px-1 sm:px-2">{timeLeft.minutes}</div>
        <div className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 font-semibold mt-2 sm:mt-3 md:mt-4 font-sans tracking-wide">Minutes</div>
      </div>
      <div className="text-center flex-1 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
        <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-primary font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-1 sm:pb-2 border-b-2 sm:border-b-4 border-primary px-1 sm:px-2">{timeLeft.seconds}</div>
        <div className="text-xs sm:text-sm md:text-lg lg:text-xl text-gray-600 font-semibold mt-2 sm:mt-3 md:mt-4 font-sans tracking-wide">Seconds</div>
      </div>
    </div>
  );
};

export default Countdown;