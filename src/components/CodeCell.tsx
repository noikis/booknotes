import { useEffect } from "react";

import "./CodeCell.css";
import { Cell } from "../redux";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundle?.[id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(id, content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            value={content}
            onChange={(value) => updateCell(id, value)}
            language="javascript"
            bundlingError={bundle?.err || ""}
          />
        </Resizable>
        <div className="preview-wrapper">
          {!bundle || bundle.loading ? (
            <div className="progress-wrapper">
              <progress className="progress is-primary is-small" max="100">
                Loading...
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingError={bundle?.err || ""} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
