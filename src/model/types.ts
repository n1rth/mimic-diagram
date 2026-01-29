//Типы данных (model/types.ts)
export type SymbolType = 'pump' | 'valve' | 'tank';
export type SymbolState = 'normal' | 'warning' | 'alarm';

export interface MimicSymbol {
  id: string;
  type: SymbolType;
  x: number;
  y: number;
  state: SymbolState;
  value?: number;
  targetScreenId?: string; // для навигации
  title: string;
}

export interface MnemoScreen {
  id: string;
  name: string;
  symbolIds: string[];
}

//Дополнение
//Расширяем модель: подпись — часть состояния
export type LabelPosition = 'top' | 'center' | 'bottom';

export interface SymbolLabel {
  text: string;
  position: LabelPosition;
}

export interface MimicSymbol {
  id: string;
  type: SymbolType;
  x: number;
  y: number;
  state: SymbolState;
  value?: number;

  label: SymbolLabel;         
  targetScreenId?: string;
}

//Тип соединения
export interface Connection {
  id: string;
  from: string; // symbol id
  to: string;   // symbol id
  arrow?: boolean;
}