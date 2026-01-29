import { Layer } from 'react-konva';
import { useEffect, useState } from 'react';

import { sceneStore } from '../model/SceneStore';
import { screenStore } from '../model/ScreenStore';

import { SymbolRegistry } from './SymbolRegistry';
import ConnectionsLayer from './ConnectionsLayer';
import StageWithChildren from './StageWithChildren';

import { observer } from 'mobx-react-lite';

export default observer(function MnemoStage() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const unsub1 = sceneStore.subscribe(() => forceUpdate(x => x + 1));
    const unsub2 = screenStore.subscribe(() => forceUpdate(x => x + 1));
    return () => { unsub1(); unsub2(); };
  }, []);

  const screen = screenStore.getCurrentScreen();
  if (!screen) return null;

  const symbols = sceneStore.getSymbols(screen.symbolIds);

  return (
  <StageWithChildren
    width={window.innerWidth - 200}
    height={600}
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