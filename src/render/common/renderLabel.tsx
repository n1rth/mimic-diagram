//Вспомогательная функция: отрисовка подписи
// render/common/renderLabel.tsx
import { Text } from 'react-konva';
import { SymbolLabel } from '../../model/types';

export function renderLabel(
  label: SymbolLabel,
  width: number,
  height: number
) {
  let y = 0;

  switch (label.position) {
    case 'top':
      y = -20;
      break;
    case 'center':
      y = height / 2 - 8;
      break;
    case 'bottom':
      y = height + 5;
      break;
  }

  return (
    <Text
      text={label.text}
      y={y}
      width={width}
      align="center"
      fontSize={14}
      listening={false} // чтобы клики шли в фигуру
    />
  );
}
