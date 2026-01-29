//WebSocket (net/socket.ts)
// Пример без Socket.io, обычный WebSocket:
import { sceneStore } from '../model/SceneStore';

const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);

  if (msg.type === 'symbol_update') {
    sceneStore.updateSymbol(msg.id, msg.patch);
  }
};

export function connectSocket() {
  // инициализация при старте
}

/* Сообщение с сервера:
{
  "type": "symbol_update",
  "id": "pump_1",
  "patch": { "value": 43.1, "state": "warning" }
} 
*/