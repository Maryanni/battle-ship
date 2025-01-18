import React, { useState, useEffect, useRef } from "react";
import "../App.css";

function Table({ id, startGame, selectAble }) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [selectCells, setSelectCells] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState([]);

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

  const handleCell = (row, col) => {
    if (startGame && selectAble) {
      const cellKey = `${row}-${col}`;
      setSelectCells((prev) => {
        if (prev.includes(cellKey)) {
          return prev.filter((cell) => cell !== cellKey);
        } else {
          const newCells = [...prev, cellKey];
          if (newCells.length > 19) {
            return prev;
          }
          return newCells;
        }
      });
    }
  };

  const generateCombinations = () => {
    const allCells = tableData.flatMap((row, rowIndex) =>
      row.map((_, colIndex) => `${rowIndex}-${colIndex}`)
    );
    const selectedCells = new Set();
    const combinations = [
      { count: 2, times: 2 },
      { count: 3, times: 2 },
      { count: 4, times: 1 },
      { count: 5, times: 1 },
    ];

    const getRandomDirection = () =>
      Math.random() > 0.5 ? "horizontal" : "vertical";

    const isValidCombination = (cells) =>
      cells.every(
        (cell) => allCells.includes(cell) && !selectedCells.has(cell)
      );

    combinations.forEach(({ count, times }) => {
      for (let i = 0; i < times; i++) {
        let valid = false;

        while (!valid) {
          const start = Math.floor(Math.random() * allCells.length);
          const direction = getRandomDirection();
          const row = Math.floor(start / 10);
          const col = start % 10;

          const cells = [];
          for (let j = 0; j < count; j++) {
            if (direction === "horizontal") {
              cells.push(`${row}-${col + j}`);
            } else {
              cells.push(`${row + j}-${col}`);
            }
          }

          if (isValidCombination(cells)) {
            cells.forEach((cell) => selectedCells.add(cell));
            valid = true;
          }
        }
      }
    });

    return Array.from(selectedCells);
  };

  useEffect(() => {
    if (startGame && id === 1) {
      const cellsToHighlight = generateCombinations();
      setHighlightedCells(cellsToHighlight);
    }
  }, [startGame, id]);


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
                //const isSelected = selectCells.includes(cellKey);
                const isHighlighted = highlightedCells.includes(cellKey);
                console.log("cellKey", isHighlighted);

                console.log("isHighlighted", isHighlighted);
                //console.log("isSelected", isSelected);
                //este va en el claseName del return
                //${isSelected ? "cell-selected-matrix" : ""}

                console.log({
                    cellKey,
                    highlightedCells: highlightedCells,
                    isInArray: highlightedCells.includes(cellKey),
                    resultingClassName: `table-cell ${startGame ? "cell-enabled" : "cell-disabled"} ${isHighlighted ? "cell-highlighted" : ""}`
                });

                return (
                  <td
                    key={cellIndex}
                    className={`table-cell 
                        ${startGame ? "cell-enabled" : "cell-disabled"}
                        ${isHighlighted ? "cell-highlighted" : ""}`}
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
