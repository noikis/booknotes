import "./ActionBar.css";
import { useActions } from "../hooks/useActions";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { deleteCell, moveCell } = useActions();
  return (
    <div className="action-bar">
      {/* Btn Up */}
      <button
        className="button button-format is-primary is-small"
        onClick={() => moveCell(id, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      {/* Btn Down */}
      <button
        className="button button-format is-primary is-small"
        onClick={() => moveCell(id, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      {/* Delete Btn */}
      <button
        className="button button-format is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
