import { MimicSymbol } from './types';
import { ScreenDTO } from '../api/dto';
import { mapSymbolDTO } from '../model/mappers/symbolMapper';

//import { MimicSymbol } from '../model/MimicSymbol';

type Listener = () => void;

export class SceneStore {
  private symbols = new Map<string, MimicSymbol>();
  private listeners = new Set<Listener>();

  screenId: string | null = null;
  title: string = '';

  connections: ScreenDTO['connections'] = [];

  /*
  setSymbols(symbols: MimicSymbol[]) {
    this.symbols.clear();
    symbols.forEach(s => this.symbols.set(s.id, s));
    this.emit();
  }*/
 
 loadScreen(screen: ScreenDTO) {
    this.screenId = screen.id;
    this.title = screen.title;

    this.symbols.clear();
    
    screen.symbols
      .map(mapSymbolDTO)
      .forEach(s => this.symbols.set(s.id, s));

    this.connections = screen.connections;

    this.layoutAsGrid({
    columns: 45,
  });
  }

  layoutAsGrid(options?: {
  columns?: number;
  cellWidth?: number;
  cellHeight?: number;
  padding?: number;
}) {
  const {
    columns = 20,
    cellWidth = 240,
    cellHeight = 110,
    padding = 20,
  } = options || {};

  let i = 0;

  for (const symbol of this.symbols.values()) {
    const col = i % columns;
    const row = Math.floor(i / columns);

    symbol.x = padding + col * cellWidth;
    symbol.y = padding + row * cellHeight;

    i++;
  }

  this.emit();
}

getBounds() {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const s of this.symbols.values()) {
    minX = Math.min(minX, s.x);
    minY = Math.min(minY, s.y);
    maxX = Math.max(maxX, s.x);
    maxY = Math.max(maxY, s.y);
  }

  if (!isFinite(minX)) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

  updateSymbol(id: string, patch: Partial<MimicSymbol>) {
    const s = this.symbols.get(id);
    if (!s) return;

    Object.assign(s, patch);
    this.emit();
  }

  getSymbol(id: string): MimicSymbol | undefined {
    return this.symbols.get(id);
  }

  getSymbols(): MimicSymbol[] {
    return Array.from(this.symbols.values());
  }

  /*
  getSymbols(ids: string[]) {
    return ids
      .map(id => this.symbols.get(id))
      .filter(Boolean) as MimicSymbol[];
  }*/

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    this.listeners.forEach(fn => fn());
  }
}

export const sceneStore = new SceneStore();