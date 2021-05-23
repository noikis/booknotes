import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import CodeCell from './components/CodeCell';

const App = () => {
  return (
    <div>
      <CodeCell />
      <h3>Other</h3>
      <CodeCell />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
