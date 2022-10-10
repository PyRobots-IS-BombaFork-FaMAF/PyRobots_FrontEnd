import { Stage, Layer, Rect, Text } from 'react-konva';
import { boardConfig, sideTextConfig } from './boardHelper';

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


function SideText(sideText: sideTextConfig) {
  const { x0, y0, x1, y1} = sideText;
  return (
    <Text
      x={x0}
      y={y0}
      width={x1}
      height={y1}
      fill="black"
      text="Simulación"
      fontSize={50}
    />
  );
}


function Board() {

  const window_min_size: number = Math.min(window.innerWidth, window.innerHeight)
  const margin_percentage: number = 0.025
  const margin: number = window_min_size * margin_percentage

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <BackGround
          x0={margin}
          y0={margin}
          size={window_min_size * (1 - 2 * margin_percentage)}
        />
        <SideText
          x0={window_min_size}
          y0={margin}
          x1={window.innerWidth - margin}
          y1={window.innerHeight - margin}
        />
      </Layer>
    </Stage>
  );
}

export default Board;
