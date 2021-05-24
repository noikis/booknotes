import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect } from 'react';

const TextEditor: React.FC = () => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const listener = () => {
      if (editMode) {
        setEditMode(false);
      }
    };

    // capture: reverse the propagation event
    // from the window to the node listening (in this case document)
    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [editMode]);

  if (editMode) {
    return (
      <div onClick={(event) => event.stopPropagation()}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div onClick={() => setEditMode(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;
