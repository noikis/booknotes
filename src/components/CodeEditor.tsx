import React from 'react';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/theme/material.css';
import { Controlled as ControlledEditor, ICodeMirror } from 'react-codemirror2';

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

  return (
    <div className='editor-container'>
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
        }}
      />
    </div>
  );
};

export default CodeEditor;
