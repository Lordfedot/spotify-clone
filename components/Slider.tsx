"use client";

import * as RadixSlider from "@radix-ui/react-slider";

type Props = {
  value?: number;
  onChange?: (value: number) => void;
};

const Slider = ({ value = 1, onChange }: Props) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadixSlider.Root
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
      className="relative flex items-center select-none touch-none w-full h-10"
    >
      <RadixSlider.Track className="bg-neutral relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="cursor-pointer absolute bg-white rounded-full h-full "/>
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default Slider;
