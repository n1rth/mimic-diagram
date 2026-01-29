import { observer } from 'mobx-react-lite';
import { navigationStore } from '../stores/NavigationStore';

export const Breadcrumb = observer(() => (
  <div className="breadcrumb">
    {navigationStore.path.map((node, i) => (
      <span key={node.screenId}>
        <button onClick={() => navigationStore.navigateUp(i)}>
          {node.title}
        </button>
        {i < navigationStore.path.length - 1 && ' / '}
      </span>
    ))}
  </div>
));