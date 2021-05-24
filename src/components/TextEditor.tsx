import './TextEditor.css';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';

const TextEditor: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState('# Header');
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }
      setEditMode(false);
    };

    // capture: reverse the propagation event
    // from the window to the node listening (in this case document)
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editMode) {
    return (
      <div className='text-editor card' ref={ref}>
        <MDEditor value={text} onChange={(value) => setText(value || '')} />
      </div>
    );
  }

  return (
    <div className='text-editor card' onClick={() => setEditMode(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={text} />
      </div>
    </div>
  );
};

export default TextEditor;
