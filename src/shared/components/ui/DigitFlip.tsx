"use client";

import { useEffect, useState } from "react";
import FlipNumbers from "react-flip-numbers";

interface DigitFlipProps {
  digit: string;
  size?: number;
}

function DigitFlip({ digit, size = 64 }: DigitFlipProps) {
  const [play, setPlay] = useState(false);

  // trigger animation ตอน mount (เข้าเพจ/รีเฟรช)
  useEffect(() => {
    setPlay(true);
  }, []);

  return (
    <div className="mx-1 rounded-2xl bg-[#65349C] shadow-lg flex items-center justify-center p-2">
      <FlipNumbers
        height={size}
        width={size * 0.7}
        color="#fff"
        background="transparent"
        play={play}
        duration={5} 
        perspective={1000}
        numbers={digit}
      />
    </div>
  );
}

export default DigitFlip