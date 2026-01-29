//Фабрика создания символов
import { MimicSymbol, SymbolLabel } from './types';

export function createSymbol(
  partial: Omit<MimicSymbol, 'label'> & {
    label?: Partial<SymbolLabel>;
  }
): MimicSymbol {
  const label: SymbolLabel = {
    text: partial.label?.text ?? '',
    position: partial.label?.position ?? 'bottom',
  };

  return {
    ...partial,
    label,
  };
}