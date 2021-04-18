import React, { useEffect, useState } from 'react';

interface CountDownProps {
  remaininTime: number,
}

const CountDown = ({ remaininTime }: CountDownProps) => {
  const [seconds, setSeconds] = useState(remaininTime);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      console.log('BOOOOM!');
    }
  });

  return (
    <div>
      <div>
        {`${new Date(seconds * 1000).toISOString().substr(14, 5)}`}
      </div>
    </div>
  );
};

export { CountDown };
