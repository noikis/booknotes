import React from 'react';
import { Controlled as ControlledEditor, ICodeMirror } from 'react-codemirror2';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/material.css';

interface CodeEditorProps {
  language: string;
  onChange(value: string): void;
  value: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  onChange,
  value,
}) => {
  const handleChange = (editor: ICodeMirror, data: any, value: string) => {
    onChange(value);
  };

  const onFormatClick = () => {
    const formattedValue = prettier.format(value, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    });

    onChange(formattedValue);
  };

  return (
    <div className='editor-container'>
      <button onClick={onFormatClick}>Format</button>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className='code-mirror-wrapper'
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: 'material',
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
