import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';

import TextEditor from './components/TextEditor';
import CodeCell from './components/CodeCell';

const App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
