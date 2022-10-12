import { Stage, Layer, Rect } from 'react-konva';
import { boardConfig } from './boardHelper';

import './board.css';

function BackGround(board: boardConfig) {
  return (
    <Rect
      x={board.x0}
      y={board.y0}
      width={board.size}
      height={board.size}
      fill="#FDFD96"
      shadowBlur={10}
    />
  );
}

function MainBoard() {
  const window_min_size: number = Math.min(window.innerWidth, window.innerHeight)
  const margin_percentage: number = 0.025
  const margin: number = window_min_size * margin_percentage

  return (
    <Stage width={window_min_size} height={window_min_size}>
      <Layer>
        <BackGround
          x0={margin}
          y0={margin}
          size={window_min_size * (1 - 2 * margin_percentage)}
        />
      </Layer>
    </Stage>
  )
}

function SideText() {
  return (
    <div>
      <h1>
        Simulación
      </h1>
    </div>
  );
}

function Board() {
  return (
    <div className="Board">
      <div className="MainBoard">
        <MainBoard />
      </div>
      <div className="SideText">
        <SideText />
      </div>
    </div>
  );
}

export default Board;
