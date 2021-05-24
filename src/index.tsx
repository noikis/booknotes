import 'bulmaswatch/superhero/bulmaswatch.min.css';
import ReactDOM from 'react-dom';
import MDEditor from '@uiw/react-md-editor';

const App = () => {
  return (
    <div>
      <MDEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
