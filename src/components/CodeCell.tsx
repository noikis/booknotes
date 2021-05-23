import { useState } from 'react';

import bundler from '../bundler';
import CodeEditor from './CodeEditor';
import Preview from './Preview';
import Resizable from './Resizable';

const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundler(input);
    setCode(output);
  };
  return (
    <Resizable direction='horizontal'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <CodeEditor value={input} onChange={setInput} language='jsx' />
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
