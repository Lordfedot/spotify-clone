import { useState, useEffect } from "react";

import { convertTime } from "@/helpers/convertTime";

const useMP3Duration = (): [string | null, (file: File) => void] => {
  const [duration, setDuration] = useState<string | null>(null);
  const [fileToDecode, setFileToDecode] = useState<File | null>(null);

  const setFileToGetDuration = (file: File) => {
    setFileToDecode(file);
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
          const fileDuration =buffer.duration;
          const time = convertTime(fileDuration);
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
