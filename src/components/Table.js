import React, { useState } from "react";
import "../App.css";

function Table({ startGame, selectAble }) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const myTable = () => {
    let myTable = [];
    for (let x = 0; x < 10; x++) {
      const row = [];
      for (let y = 0; y < 10; y++) {
        row.push({ x, y });
      }
      myTable.push(row);
    }
    return myTable;
  };

  const tableData = myTable();

  const [selectCells, setSelectCells] = useState([]);

  const handleCell = (row, col) => {
    if (startGame && selectAble) {
    const cellKey = `${row}-${col}`;
    console.log(`Celda clicada: ${letters[row]}${col + 1}`);
    setSelectCells((prev) =>
        prev.includes(cellKey)
          ? prev.filter((cell) => cell !== cellKey)
          : [...prev, cellKey]
      );
    }
  };


  return (
    <div className="d-flex justify-content-center">
      <table className={`table ${startGame ? "enabled" : "disabled"}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            {Array.from({ length: 10 }, (_, index) => (
              <th key={index} className="table-cell">
                {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, indexRow) => (
            <tr key={indexRow}>
              <td className="table-cell">{letters[indexRow]}</td>

              {item.map((_, cellIndex) => {
                const cellKey = `${indexRow}-${cellIndex}`;
                const isSelected = selectCells.includes(cellKey);
                return (
                  <td
                    key={cellIndex}

                    className={`table-cell ${
                      startGame ? "cell-enabled" : "cell-disabled"
                    } ${isSelected ? "cell-selected-matrix" : ""}`}
                    onClick={() => handleCell(indexRow, cellIndex)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
