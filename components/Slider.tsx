"use client";

import * as RadixSlider from "@radix-ui/react-slider";
import { twMerge } from "tailwind-merge";

type Props = {
  value?: number;
  onChange?: any;
  className?: string;
  max?: number;
};

const Slider = ({ value = 1, onChange, className, max = 1 }: Props) => {
  
  const handleChange = (newValue: any) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={max}
      step={0.01}
      aria-label="Volume"
      className={twMerge(
        `group cursor-pointer relative flex items-center select-none touch-none w-full py-3 opacity-70 hover:opacity-100`,
        className
      )}
    >
      <RadixSlider.Track className="bg-neutral-700 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className=" absolute bg-green-500 rounded-full h-full " />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block borded-none rounded-full opacity-0 bg-green-600 w-[12px] h-[12px] group-hover:opacity-100 transition" />
    </RadixSlider.Root>
  );
};

export default Slider;
