import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';

import CodeEditor from './components/CodeEditor';
import bundler from './bundler';
import Preview from './components/Preview';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor value={input} onChange={setInput} language='jsx' />
      <div>
        <button className='button button-format is-primary' onClick={onClick}>
          Submit
        </button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
