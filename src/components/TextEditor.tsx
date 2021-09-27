import "./TextEditor.css";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { Cell } from "../redux";
import { useActions } from "../hooks/useActions";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell: { id, content } }) => {
  const [editMode, setEditMode] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (ref.current && e.target && ref.current.contains(e.target as Node)) {
        return;
      }
      setEditMode(false);
    };

    // capture: reverse the propagation event
    // from the window to the node listening (in this case document)
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editMode) {
    return (
      <div className="text-editor card" ref={ref}>
        <MDEditor
          value={content}
          onChange={(value) => updateCell(id, value || "")}
        />
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditMode(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={content || "Click to edit"} />
      </div>
    </div>
  );
};

export default TextEditor;
