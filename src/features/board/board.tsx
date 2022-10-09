import { Stage, Layer, Rect } from 'react-konva';

function Board() {

  const window_min_size = Math.min(window.innerWidth, window.innerHeight)

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
            x={window_min_size * 0.025}
            y={window_min_size * 0.025}
            width={window_min_size * 0.95}
            height={window_min_size * 0.95}
            fill="white"
            shadowBlur={10}
          />
      </Layer>
    </Stage>
  );
}

export default Board;
