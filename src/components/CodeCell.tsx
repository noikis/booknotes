import { useState, useEffect } from "react";

import bundler from "../bundler";
import { Cell } from "../redux";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import Resizable from "./Resizable";
import { useActions } from "../hooks/useActions";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell: { id, content } }) => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");

  const { updateCell } = useActions();

  useEffect(() => {
    // bundle the code input after 1s
    const timer = setTimeout(async () => {
      const output = await bundler(content);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [content]);

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
            bundlingError={err}
            value={content}
            onChange={(value) => updateCell(id, value)}
            language="javascript"
          />
        </Resizable>
        <Preview code={code} bundlingError={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
