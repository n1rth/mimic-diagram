import { MnemoScreen } from './types';

type ScreenPathItem = {
  id: string;
  title: string;
};
type Listener = () => void;

export class ScreenStore {
  private screens = new Map<string, MnemoScreen>();
  private currentScreenId: string | null = null;
  private path: ScreenPathItem[] = [];
  private listeners = new Set<Listener>();

  setScreens(screens: MnemoScreen[], initialId: string) {
    screens.forEach(s => this.screens.set(s.id, s));
    this.currentScreenId = initialId;
    this.emit();
  }

   openScreen(screenId: string, title: string) {
    const existingIndex = this.path.findIndex(p => p.id === screenId);

    if (existingIndex !== -1) {
      // возврат назад по пути
      this.path = this.path.slice(0, existingIndex + 1);
    } else {
      this.path.push({ id: screenId, title });
    }

    this.currentScreenId = screenId;
    this.emit();
  }

  getCurrentScreen() {
    return this.currentScreenId
      ? this.screens.get(this.currentScreenId)
      : null;
  }

  getPath() {
    return this.path;
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