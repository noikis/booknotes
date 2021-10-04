import { Fragment } from "react";

import "./CellList.css";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    return cells?.order.map((id) => cells.data[id]);
  });

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
