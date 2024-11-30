import React, { useEffect, useState } from 'react';
const CountdownTimer = ({ bgColor = '#E91E31', texColor = '#E91E31', textColor = '#fff', date, justify }) => {
    const targetDate = new Date(date);
    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = targetDate - now;
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            return { days, hours, minutes, seconds };
        } else {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return (
        <div className={`flex gap-5 md:text-base text-sm ${justify}`}>
            <div className='text-center'>
                <div className='  w-fit px-3 py-1   rounded-md font-bold' style={{ backgroundColor: bgColor, color: textColor }}>
                    {String(timeLeft.days).padStart(2, '0')}
                </div>
                <p className='  font-bold concert-one-regular' style={{ color: texColor }} >DAYS</p>
            </div>
            <div className='text-center'>
                <div className=' w-fit px-3 py-1  rounded-md font-bold' style={{ backgroundColor: bgColor, color: textColor }} >
                    {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <p className=' font-bold concert-one-regular' style={{ color: texColor }}>HRS</p>
            </div>
            <div className='text-center'>
                <div className=' w-fit px-3 py-1  rounded-md font-bold' style={{ backgroundColor: bgColor, color: textColor }}>
                    {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <p className=' font-bold concert-one-regular' style={{ color: texColor }}>MINS</p>
            </div>
            <div className='text-center'>
                <div className=' w-[40px] px-3 py-1  rounded-md font-bold text-center' style={{ backgroundColor: bgColor, color: textColor }}>
                    {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <p className=' font-bold concert-one-regular' style={{ color: texColor }}>SECS</p>
            </div>
        </div>
    );
};
export default CountdownTimer;
