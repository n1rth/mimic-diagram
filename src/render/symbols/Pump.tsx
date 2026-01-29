//Пример одного мнемознака (Pump)
// render/symbols/Pump.tsx
import { Group, Circle, Text } from 'react-konva';
import { MimicSymbol } from '../../model/types';
import { screenStore } from '../../model/ScreenStore';

export default function Pump({ symbol }: { symbol: MimicSymbol }) {
  const fill =
    symbol.state === 'alarm' ? 'red' :
    symbol.state === 'warning' ? 'orange' : 'green';

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
      <Circle radius={30} fill={fill} stroke="black" />
      <Text
        text={`Насос\n${symbol.value ?? ''}`}
        y={40}
        align="center"
      />
    </Group>
  );
}