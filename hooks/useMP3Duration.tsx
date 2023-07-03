import { useState, useEffect } from "react";

const useMP3Duration = (): [string | null, (file: File) => void] => {
  const [duration, setDuration] = useState<string | null>(null);
  const [fileToDecode, setFileToDecode] = useState<File | null>(null);

  const setFileToGetDuration = (file: File) => {
    setFileToDecode(file);
  };

  const convertToTime = (number: number) => {
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!fileToDecode) return;

    const audioContext = new AudioContext();
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const arrayBuffer = fileReader.result as ArrayBuffer;

      audioContext.decodeAudioData(
        arrayBuffer,
        (buffer) => {
          const fileDuration = Math.round(buffer.duration);
          const time = convertToTime(fileDuration);
          setDuration(time);
        },
        (error) => {
          console.error("Error decoding audio data:", error);
        }
      );
    };

    fileReader.onerror = (error) => {
      console.error("Error reading file:", error);
    };

    fileReader.readAsArrayBuffer(fileToDecode);
    return () => {
      audioContext.close();
    };
  }, [fileToDecode]);

  return [duration, setFileToGetDuration];
};

export default useMP3Duration;
