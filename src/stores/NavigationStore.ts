import { makeAutoObservable } from 'mobx';

export interface NavNode {
  screenId: string;
  title: string;
}

export class NavigationStore {
  path: NavNode[] = [];
  currentScreenId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openRoot(screenId: string, title: string) {
    this.path = [{ screenId, title }];
    this.currentScreenId = screenId;
  }

  navigateTo(screenId: string, title: string) {
    this.path.push({ screenId, title });
    this.currentScreenId = screenId;
  }

  navigateUp(index: number) {
    this.path = this.path.slice(0, index + 1);
    this.currentScreenId = this.path[index].screenId;
  }
}

export const navigationStore = new NavigationStore();

/*
import { makeAutoObservable } from 'mobx'; // Интегрируем с MobX
export class NavigationStore {
  history: string[] = []; // Массив id экранов
  currentIndex: number = -1;
  constructor() { makeAutoObservable(this); }
  navigateTo(screenId: string) {
    // Обрезаем историю после currentIndex и добавляем новый экран
    this.history = [...this.history.slice(0, this.currentIndex + 1), screenId];
    this.currentIndex++;
  }
  goBack() { if (this.currentIndex > 0) this.currentIndex--; }
  goForward() { if (this.currentIndex < this.history.length - 1) this.currentIndex++; }
  get currentScreenId() { return this.history[this.currentIndex]; }
}*/