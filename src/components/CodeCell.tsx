import { useEffect } from "react";

import { Cell } from "../redux";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundle?.[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

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
            value={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
            language="javascript"
            bundlingError={bundle?.err || ""}
          />
        </Resizable>
        {!bundle || bundle.loading ? (
          <div>Loading...</div>
        ) : (
          <Preview code={bundle.code} bundlingError={bundle?.err || ""} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
