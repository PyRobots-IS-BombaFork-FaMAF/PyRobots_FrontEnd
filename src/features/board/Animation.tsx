import { useState, useEffect, useRef } from "react";

/** Show `renderFrame(i)` in the `i`th frame. */
export function Animate(
  amountFrames: number,
  renderFrame: (frame: number) => JSX.Element
): JSX.Element {
  const [frame, setFrame] = useState(0);

  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = getInterval();
    return () => clearInterval(intervalRef.current);
  });

  const getInterval = () => {
    const progressInterval: NodeJS.Timer = setInterval(() => {
      if (frame < amountFrames) {
        setFrame((frame) => frame + 1);
      }
    }, 500);
    return progressInterval;
  };

  const animation = () => {
    if (frame < amountFrames) {
      setFrame(frame + 1);
    }
  };

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(animation, 20);
    return () => clearInterval(interval);
  });

  return renderFrame(frame);
}
