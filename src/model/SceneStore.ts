import { MimicSymbol } from './types';

type Listener = () => void;

export class SceneStore {
  private symbols = new Map<string, MimicSymbol>();
  private listeners = new Set<Listener>();

  setSymbols(symbols: MimicSymbol[]) {
    this.symbols.clear();
    symbols.forEach(s => this.symbols.set(s.id, s));
    this.emit();
  }

  updateSymbol(id: string, patch: Partial<MimicSymbol>) {
    const s = this.symbols.get(id);
    if (!s) return;
    Object.assign(s, patch);
    this.emit();
  }

  getSymbol(id: string) {
    return this.symbols.get(id);
  }

  getSymbols(ids: string[]) {
    return ids
      .map(id => this.symbols.get(id))
      .filter(Boolean) as MimicSymbol[];
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    this.listeners.forEach(fn => fn());
  }
}

export const sceneStore = new SceneStore();