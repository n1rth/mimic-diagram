import { useEffect } from 'react';

import { sceneStore } from './model/SceneStore';
import { screenStore } from './model/ScreenStore';

import MnemoStage from './render/MnemoStage';
import { connectSocket } from './net/socket';
import { createSymbol } from './model/factories';

import { autorun } from 'mobx';
import { navigationStore } from './stores/NavigationStore';
import { Breadcrumb } from './ui/Breadcrumb';
import { loadMainScreenMock } from './api/screens';

import NavigationBar from './ui/NavigationBar';

/*
autorun(() => {
  const screenId = navigationStore.currentScreenId;
  if (!screenId) return;

  sceneStore.loadScreen(screenId); // lazy load
});*/

export default function App() {
 useEffect(() => {
    // Инициализируем навигацию корневым экраном
    //navigationStore.openRoot('main', 'Главная');

    /*sceneStore.setSymbols([
      createSymbol({
        id: 'pump_1',
        type: 'pump',
        x: 100,
        y: 100,
        state: 'normal',
        value: 42,
        targetScreenId: 'details',
        label: { text: 'Насос №1' },
        title: 'Насос №1'
      }),
      createSymbol({
        id: 'tank_1',
        type: 'tank',
        x: 300,
        y: 120,
        state: 'alarm',
        value: 80,
        label: { text: 'Бак №1', position: 'top' },
        title: 'Бак №1'
      }),
    ]);*/

    loadMainScreenMock().then(screen => {
    sceneStore.loadScreen(screen);
    navigationStore.openRoot(screen.id, screen.title);
  });

    screenStore.setScreens(
      [
        { id: 'main', name: 'Главная', symbolIds: ['pump_1', 'tank_1'] },
        { id: 'details', name: 'Детали насоса', symbolIds: ['pump_1'] },
      ],
      'main'
    );

    connectSocket();
  }, []);
  

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavigationBar />
      <Breadcrumb />
      <div style={{ flex: 1 }}>
        <MnemoStage />
      </div>
    </div>
  );
}