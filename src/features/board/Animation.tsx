import { useState, useEffect, useRef } from "react";

export function Animate(
  renderFrame: (frame: number) => JSX.Element,
  amount_frames: number
): JSX.Element {
  const [frame, setFrame]: [number, React.Dispatch<React.SetStateAction<number>>] = useState(0);

  const intervalRef = useRef<NodeJS.Timer>()

  useEffect(() => {
    intervalRef.current = getInterval()
    return () => clearInterval(intervalRef.current)
  })

  const getInterval = () => {
    const progressInterval = setInterval(() => {
      setFrame((frame) => frame + 1)
    }, 500)
    return progressInterval
  }

  const animation = () => {
    setFrame(frame + 1);
  };

  useEffect(() => {
    const interval = setInterval(animation, 1000);
    return () => clearInterval(interval);
  });

  return <div>{renderFrame(frame)}</div>;
}
