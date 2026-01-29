import { Group, Rect, Text } from 'react-konva';
import { MimicSymbol } from '../../model/types';
import { screenStore } from '../../model/ScreenStore';
import { renderLabel } from '../common/renderLabel';
import { navigationStore } from '../../stores/NavigationStore';
import { BaseSymbol } from './BaseSymbol';

const WIDTH = 80;
const HEIGHT = 120;

export default function Tank({ symbol }: { symbol: MimicSymbol }) {
  const level = Math.max(0, Math.min(100, symbol.value ?? 0));
  const fillHeight = (HEIGHT * level) / 100;

  const stroke =
    symbol.state === 'alarm' ? 'red' :
    symbol.state === 'warning' ? 'orange' : 'black';

  return (
    <BaseSymbol symbol={symbol}>
      {renderLabel(symbol.label, WIDTH, HEIGHT)}

      {/* Контур бака */}
      <Rect
        width={WIDTH}
        height={HEIGHT}
        stroke={stroke}
        strokeWidth={2}
        fill="lightblue"
        listening={true}
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
      </BaseSymbol>
  );
}