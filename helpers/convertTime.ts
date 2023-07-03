export const convertTime = (number: number) => {
  const hours = Math.round(Math.floor(number / 60));
  const minutes = Math.round(number % 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

export const convertTimeToNumber = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};