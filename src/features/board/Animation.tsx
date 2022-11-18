import { useEffect, useRef, useState } from "react";

/** Show `renderFrame(i - i % skipFrames)` in the `i`th frame.
 * Showing a new frame every `frameInterval` mili-seconds. */
export function Animate(
  amountFrames: number,
  frameInterval: number,
  skipFrames: number,
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
        setFrame(frame + skipFrames > amountFrames ? amountFrames : frame + skipFrames);
      }
    }, frameInterval * skipFrames);
    return progressInterval;
  };

  const animation = () => {
    if (frame < amountFrames) {
      setFrame(frame + skipFrames > amountFrames ? amountFrames : frame + skipFrames);
    }
  };

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(animation, 20);
    return () => clearInterval(interval);
  });

  function restart(): void {
    clearInterval(intervalRef.current);
    setFrame(0);
    intervalRef.current = getInterval();
  }

  return (
    <div>
      <button onClick={restart}>Reiniciar</button>
      {renderFrame(frame)}
    </div>
  )
}
