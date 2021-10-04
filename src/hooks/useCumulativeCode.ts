import { Cell } from "../redux";
import { useTypedSelector } from "./useTypedSelector";

// Code written in code cells above can be used in the current one
// there is a special function "show()" to preview data even JSX
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector(({ cells }) => {
    const orderedCells = cells?.order.map((id) => cells.data[id]);

    const showFunc = `
    import _React from "react";
    import _ReactDOM from "react-dom";
    var show = (value) => {
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
  `;
    const showFuncEmpty = `var show = () => {}`;

    // show function implementation
    const cumulativeCode = [];

    // loop over code cells
    for (let currentCell of orderedCells as Cell[]) {
      if (currentCell.type === "code") {
        // only the current cell implements the show function
        if (currentCell.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncEmpty);
        }
        cumulativeCode.push(currentCell.content);
      }
      if (currentCell.id === cellId) {
        break;
      }
    }

    return cumulativeCode;
  }).join("\n");
};
