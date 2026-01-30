import { observer } from 'mobx-react-lite';
import { screenStore } from '../model/ScreenStore';

import './NavigationBar.css';

const NavigationBar = observer(function NavigationBar() {
  const path = screenStore.getPath();

  if (!path.length) return null;

  return (
    <div className="nav-root">
      {path.map((p, i) => (
        <div
          key={p.id}
          className="nav-item"
          onClick={() => screenStore.openScreen(p.id, p.title)}
        >
          {p.title}
          {i < path.length - 1 && <span className="nav-sep">›</span>}
        </div>
      ))}
    </div>
  );
});

export default NavigationBar;