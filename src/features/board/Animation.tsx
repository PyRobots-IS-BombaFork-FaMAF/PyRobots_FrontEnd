import { useState, useEffect } from 'react';

export function Animate(renderFrame: (frame: number) => JSX.Element, amount_frames: number): JSX.Element {
    const [frame, setFrame] = useState(0);
    const [playing, setPlaying] = useState(false);
    
    const animation = () => {
        if (playing) {
        setFrame(frame + 1);
        }
    };
    
    useEffect(() => {
        const interval = setInterval(animation, amount_frames);
        return () => clearInterval(interval);
    }, [frame]);
    
    return (
        <div>
        <div>
            <button onClick={() => setPlaying(!playing)}>
            {playing ? "Pause" : "Play"}
            </button>
        </div>
        <div>
            {renderFrame(frame)}
        </div>
        </div>
    );
}



