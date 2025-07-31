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
    <div className={`flex justify-center items-center gap-12 md:gap-20 ${className}`}>
      <div className="text-center">
        <div className="text-5xl md:text-7xl font-extrabold text-primary min-w-[120px] font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-2 border-b-4 border-primary px-2">{timeLeft.days}</div>
        <div className="text-xl text-gray-600 font-semibold mt-4 font-sans tracking-wide">Days</div>
      </div>
      <div className="text-center">
        <div className="text-5xl md:text-7xl font-extrabold text-primary min-w-[120px] font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-2 border-b-4 border-primary px-2">{timeLeft.hours}</div>
        <div className="text-xl text-gray-600 font-semibold mt-4 font-sans tracking-wide">Hours</div>
      </div>
      <div className="text-center">
        <div className="text-5xl md:text-7xl font-extrabold text-primary min-w-[120px] font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-2 border-b-4 border-primary px-2">{timeLeft.minutes}</div>
        <div className="text-xl text-gray-600 font-semibold mt-4 font-sans tracking-wide">Minutes</div>
      </div>
      <div className="text-center">
        <div className="text-5xl md:text-7xl font-extrabold text-primary min-w-[120px] font-sans tracking-tight transform hover:scale-105 transition-transform duration-200 pb-2 border-b-4 border-primary px-2">{timeLeft.seconds}</div>
        <div className="text-xl text-gray-600 font-semibold mt-4 font-sans tracking-wide">Seconds</div>
      </div>
    </div>
  );
};

export default Countdown;