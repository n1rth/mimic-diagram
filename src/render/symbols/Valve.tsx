import { Group, Rect, Arrow } from 'react-konva';
import { MimicSymbol } from '../../model/types';
import { screenStore } from '../../model/ScreenStore';
import { renderLabel } from '../common/renderLabel';

const SIZE = 60;

export default function Valve({ symbol }: { symbol: MimicSymbol }) {
  const fill =
    symbol.state === 'alarm' ? '#ffb3b3' :
    symbol.state === 'warning' ? '#ffe0b3' : '#e0ffe0';

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
      {renderLabel(symbol.label, SIZE, SIZE)}

      <Rect
        width={SIZE}
        height={SIZE}
        fill={fill}
        stroke="black"
        cornerRadius={6}
      />

      <Arrow
        points={[10, SIZE / 2, SIZE - 10, SIZE / 2]}
        stroke="black"
        strokeWidth={3}
        pointerLength={6}
        pointerWidth={6}
      />
    </Group>
  );
}