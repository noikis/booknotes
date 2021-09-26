import { Cell } from "../redux";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  child = cell.type === "code" ? <CodeCell /> : <TextEditor />;

  return <div>{child}</div>;
};

export default CellListItem;
