import { SymbolType, LabelPosition } from '../model/types';

export interface SymbolDTO {
  id: string;
  type: SymbolType;

  x: number;
  y: number;

  label: {
    text: string;
    position?: LabelPosition;
  };

  color?: string;
  targetScreenId?: string;
}

export interface ConnectionDTO {
  id: string;
  from: string;
  to: string;
}

export interface ScreenDTO {
  id: string;
  title: string;

  symbols: SymbolDTO[];
  connections: ConnectionDTO[];
}