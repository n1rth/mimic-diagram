import { Group, Rect, Text } from 'react-konva';
import { MimicSymbol } from '../../model/types';
import { screenStore } from '../../model/ScreenStore';
import { renderLabel } from '../common/renderLabel';

const WIDTH = 80;
const HEIGHT = 120;

export default function Tank({ symbol }: { symbol: MimicSymbol }) {
  const level = Math.max(0, Math.min(100, symbol.value ?? 0));
  const fillHeight = (HEIGHT * level) / 100;

  const stroke =
    symbol.state === 'alarm' ? 'red' :
    symbol.state === 'warning' ? 'orange' : 'black';

  return (
    <Group
      x={symbol.x}
      y={symbol.y}
      onDblClick={() => {
        if (symbol.targetScreenId) {
          screenStore.openScreen(symbol.targetScreenId);
        }
      }}
    >
      {renderLabel(symbol.label, WIDTH, HEIGHT)}

      {/* Контур бака */}
      <Rect
        width={WIDTH}
        height={HEIGHT}
        stroke={stroke}
        strokeWidth={2}
        fill="lightblue"
      />

      {/* Уровень */}
      <Rect
        y={HEIGHT - fillHeight}
        width={WIDTH}
        height={fillHeight}
        fill="blue"
      />

      {/* Значение */}
      <Text
        text={`${level}%`}
        width={WIDTH}
        align="center"
        y={HEIGHT / 2 - 8}
        fill="white"
        listening={false}
      />
    </Group>
  );
}