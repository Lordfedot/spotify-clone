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
      step={0.01}
      aria-label="Volume"
      className="cursor-pointer relative flex items-center select-none touch-none w-full h-10"
    >
      <RadixSlider.Track className="bg-neutral-700 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className=" absolute bg-green-500 rounded-full h-full " />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block borded-none rounded-full  bg-green-600 w-[12px] h-[12px]" />
    </RadixSlider.Root>
  );
};

export default Slider;
