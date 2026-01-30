import { Layer } from 'react-konva';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { sceneStore } from '../model/SceneStore';
import { screenStore } from '../model/ScreenStore';

import { SymbolRegistry } from './SymbolRegistry';
import ConnectionsLayer from './ConnectionsLayer';
import StageWithChildren from './StageWithChildren';

export default observer(function MnemoStage() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsub1 = sceneStore.subscribe(() => forceUpdate(x => x + 1));
    const unsub2 = screenStore.subscribe(() => forceUpdate(x => x + 1));
    return () => { unsub1(); unsub2(); };
  }, []);

  const screen = screenStore.getCurrentScreen();
  if (!screen) return null;

  const symbols = sceneStore.getSymbols();

  const bounds = sceneStore.getBounds();

const padding = 40;
const viewportWidth = window.innerWidth - 200;
const viewportHeight = 600;

const scaleX = viewportWidth / (bounds.width + padding * 2);
const scaleY = viewportHeight / (bounds.height + padding * 2);
const scale = Math.min(scaleX, scaleY, 1);

  return (
  <StageWithChildren
    width={viewportWidth}
    height={viewportHeight}
    scaleX={scale}
    scaleY={scale}
    x={-bounds.x * scale + padding}
    y={-bounds.y * scale + padding}
    draggable
  >
     {/* Слой соединений */}
    <ConnectionsLayer />
    {/* Слой символов */}
    <Layer>
      {symbols.map(s => {
        const Comp = SymbolRegistry[s.type];
        return <Comp key={s.id} symbol={s} />;
      })}
    </Layer>
  </StageWithChildren>
);
});