//Хранилище соединений
// model/ConnectionStore.ts
import { Connection } from './types';

type Listener = () => void;

export class ConnectionStore {
  private connections: Connection[] = [];
  private listeners = new Set<Listener>();

  setConnections(c: Connection[]) {
    this.connections = c;
    this.emit();
  }

  getAll() {
    return this.connections;
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private emit() {
    this.listeners.forEach(fn => fn());
  }
}

export const connectionStore = new ConnectionStore();
