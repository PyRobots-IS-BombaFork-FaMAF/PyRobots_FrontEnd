import { Stage, Layer, Rect } from 'react-konva';
import { boardConfig } from './boardHelper';

function BackGround(board: boardConfig) {
  return (
    <Rect
      x={board.x0}
      y={board.y0}
      width={board.size}
      height={board.size}
      fill="white"
      shadowBlur={10}
    />
  );
}


function Board() {

  const window_min_size: number = Math.min(window.innerWidth, window.innerHeight)
  const margin_percentage: number = 0.025

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <BackGround
          x0={window_min_size * margin_percentage}
          y0={window_min_size * margin_percentage}
          size={window_min_size * (1 - 2 * margin_percentage)}
        />
      </Layer>
    </Stage>
  );
}

export default Board;
