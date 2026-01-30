import { ScreenDTO, SymbolDTO } from './dto';
import { LabelPosition } from '../model/types';

const TYPES = ['pump', 'valve', 'tank'] as const;

export function loadMainScreenMock(): Promise<ScreenDTO> {
  return new Promise(resolve => {

    const symbols: SymbolDTO[] = Array.from({ length: 1500 }).map((_, i) => {
      const position: LabelPosition =
        i % 3 === 0 ? 'top' : 'bottom';

      return {
        id: `symbol_${i}`,
        type: TYPES[i % TYPES.length],
        x: (i % 50) * 140,
        y: Math.floor(i / 50) * 110,

        label: {
          text: `Элемент ${i}`,
          position,
        },

        targetScreenId: i % 20 === 0
          ? `screen_${i}`
          : undefined,
      };
    });

    resolve({
      id: 'main',
      title: 'Главная схема',
      symbols,
      connections: [],
    });
  });
}