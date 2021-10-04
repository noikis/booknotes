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
  const bundle = useTypedSelector(({ bundle }) => bundle?.[id]);

  const cumulativeCode = useTypedSelector(({ cells }) => {
    const orderedCells = cells?.order.map((id) => cells.data[id]);

    // show function implementation
    const cumulativeCode = [
      `
      import _React from "react";
      import _ReactDOM from "react-dom";
      const show = (value) => {
        const root = document.getElementById("root");

        if(typeof value === "object") {
          if(value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML =  value;
        }
      };
    `,
    ];

    // loop over previous code cells
    for (let currentCell of orderedCells as Cell[]) {
      if (currentCell.type === "code") {
        cumulativeCode.push(currentCell.content);
      }
      if (currentCell.id === id) {
        break;
      }
    }

    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(id, cumulativeCode.join("\n"));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(id, cumulativeCode.join("\n"));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode.join("\n"), id, createBundle]);

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
