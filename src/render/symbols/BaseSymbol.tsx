import { Group } from 'react-konva';
import { navigationStore } from '../../stores/NavigationStore';
import { MimicSymbol } from '../../model/types';

interface Props {
  symbol: MimicSymbol;
  children: React.ReactNode;
}

export function BaseSymbol({ symbol, children }: Props) {
  return (
    <Group
      x={symbol.x}
      y={symbol.y}
      listening={true}
      onDblClick={() => {
        if (!symbol.targetScreenId) return;

        navigationStore.navigateTo(
          symbol.targetScreenId,
          symbol.title
        );
      }}
    >
      {children}
    </Group>
  );
}