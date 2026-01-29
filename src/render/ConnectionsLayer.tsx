import { Layer, Arrow, Line } from 'react-konva';
import { sceneStore } from '../model/SceneStore';
import { connectionStore } from '../model/ConnectionStore';

export default function ConnectionsLayer() {
  const connections = connectionStore.getAll();

  return (
    <Layer listening={false}>
      {connections.map(c => {
        const from = sceneStore.getSymbol(c.from);
        const to = sceneStore.getSymbol(c.to);
        if (!from || !to) return null;

        const points = [
          from.x + 40,
          from.y + 40,
          to.x + 40,
          to.y + 40,
        ];

        return c.arrow ? (
          <Arrow
            key={c.id}
            points={points}
            stroke="gray"
            strokeWidth={2}
            pointerLength={8}
            pointerWidth={8}
          />
        ) : (
          <Line
            key={c.id}
            points={points}
            stroke="gray"
            strokeWidth={2}
          />
        );
      })}
    </Layer>
  );
}