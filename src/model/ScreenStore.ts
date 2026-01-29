import { MnemoScreen } from './types';

type Listener = () => void;

export class ScreenStore {
  private screens = new Map<string, MnemoScreen>();
  private currentScreenId: string | null = null;
  private listeners = new Set<Listener>();

  setScreens(screens: MnemoScreen[], initialId: string) {
    screens.forEach(s => this.screens.set(s.id, s));
    this.currentScreenId = initialId;
    this.emit();
  }

  openScreen(id: string) {
    if (this.screens.has(id)) {
      this.currentScreenId = id;
      this.emit();
    }
  }

  getCurrentScreen() {
    return this.currentScreenId
      ? this.screens.get(this.currentScreenId)
      : null;
  }

  getAllScreens() {
    return Array.from(this.screens.values());
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    this.listeners.forEach(fn => fn());
  }
}

export const screenStore = new ScreenStore();