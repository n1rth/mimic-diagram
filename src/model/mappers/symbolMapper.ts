import { SymbolDTO } from '../../api/dto';
import { MimicSymbol } from '../types';
import { createSymbol } from '../factories';

export function mapSymbolDTO(dto: SymbolDTO): MimicSymbol {
  return createSymbol({
    id: dto.id,
    title: dto.label.text,

    type: dto.type,
    x: dto.x,
    y: dto.y,

    state: 'normal',

    label: {
      text: dto.label.text,
      position: dto.label.position,
    },

    targetScreenId: dto.targetScreenId,
  });
}