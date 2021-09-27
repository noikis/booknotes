import { Fragment } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CellListItem from "./CellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    return cells?.order.map((id) => cells.data[id]);
  });

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      <AddCell forceVisible={cells?.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
