import { useEffect } from "react";

import "./CodeCell.css";
import { Cell } from "../redux";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useCumulativeCode } from "../hooks/useCumulativeCode";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector(({ bundle }) => bundle?.[id]);
  const cumulativeCode = useCumulativeCode(id);

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, id, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="code-cell-wrapper">
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
