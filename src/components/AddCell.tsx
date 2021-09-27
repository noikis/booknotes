import React from "react";
import { useActions } from "../hooks/useActions";
import "./AddCell.css";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forceVisible }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className={`add-cell ${forceVisible ? "force-visible" : ""}`}>
      <div className="add-buttons">
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellBefore(nextCellId, "code")}
        >
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Code</span>
        </button>
        <button
          className="button is-primary is-rounded is-small"
          onClick={() => insertCellBefore(nextCellId, "text")}
        >
          <span className="icon">
            <i className="fas fa-plus"></i>
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
