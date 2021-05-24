import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import TextEditor from './components/TextEditor';
import CodeCell from './components/CodeCell';
import { store } from './redux';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CodeCell />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
