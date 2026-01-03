"use client";

import DigitFlip from '@/shared/components/ui/DigitFlip'

interface FlipCounterProps {
  value: number;
  size?: number;
}

function FlipCounter({ value, size = 64 }: FlipCounterProps) {
  const strValue = value.toLocaleString("en-US");
  return (
    <div className="flex justify-center">
      {strValue.split("").map((char, i) =>
        char === "," ? (
          <span
            key={i}
            className="mx-1 text-5xl font-extrabold text-white relative top-3"
          >
            ,
          </span>
        ) : (
          <DigitFlip key={`${char}-${i}-${Date.now()}`} digit={char} size={size} />
        )
      )}
    </div>
  );
}

export default FlipCounter