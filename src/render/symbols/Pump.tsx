//Пример одного мнемознака (Pump)
// render/symbols/Pump.tsx
import { Group, Circle, Text } from 'react-konva';
import { MimicSymbol } from '../../model/types';
import { screenStore } from '../../model/ScreenStore';
import { navigationStore } from '../../stores/NavigationStore';
import { BaseSymbol } from './BaseSymbol';

export default function Pump({ symbol }: { symbol: MimicSymbol }) {
  const fill =
    symbol.state === 'alarm' ? 'red' :
    symbol.state === 'warning' ? 'orange' : 'green';

  return (
    <BaseSymbol symbol={symbol}>
      <Circle 
      radius={30} 
      fill={fill} 
      stroke="black" 
      listening={true}
      />

      <Text
        text={`Насос\n${symbol.value ?? ''}`}
        y={40}
        align="center"
      />
    </BaseSymbol>
  );
}