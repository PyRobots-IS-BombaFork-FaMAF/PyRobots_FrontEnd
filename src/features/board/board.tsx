import { Stage, Layer, Rect } from 'react-konva';

function Board() {

  const window_min_size: number = Math.min(window.innerWidth, window.innerHeight)
  const margin_percentage: number = 0.025

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={window_min_size * margin_percentage}
          y={window_min_size * margin_percentage}
          width={window_min_size * (1 - 2 * margin_percentage)}
          height={window_min_size * (1 - 2 * margin_percentage)}
          fill="white"
          shadowBlur={10}
        />
      </Layer>
    </Stage>
  );
}

export default Board;
