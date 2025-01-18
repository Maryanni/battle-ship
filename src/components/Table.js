import React, { useState, useEffect, useRef } from "react";
import "../App.css";
import { FaWater } from "react-icons/fa";
import { GiGooeyImpact } from "react-icons/gi";

function Table({ id, startGame, selectAble }) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [selectCells, setSelectCells] = useState([]);
  const [highlightedCells, setHighlightedCells] = useState([]);
  const [clickedCells, setClickedCells] = useState(new Set());

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

  //Hacer click sobre la celda que selecciono
  const handleCell = (row, col) => {
    const cellKey = `${row}-${col}`;
    if (startGame) {
      if (id === 2) {
        setClickedCells((prev) => {
          const newClick = new Set(prev);
          newClick.add(cellKey);
          return newClick;
        });
      } else if (selectAble) {
        setSelectCells((prev) => {
          if (prev.includes(cellKey)) {
            return prev.filter((cell) => cell !== cellKey);
          } else {
            const newCells = [...prev, cellKey];
            return newCells;
          }
        });
      }
    }
  };

  //Genero la combinación aleatorea
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
    if (startGame) {
      const cellsToHighlight = generateCombinations();
      setHighlightedCells(cellsToHighlight);
    }
  }, [startGame, id]);

  //Asigno el icono al hacer click
  const sendIcon = (cellKey, isHighlighted) => {
    if (id === 2 && clickedCells.has(cellKey)) {
      return isHighlighted ? (
        <GiGooeyImpact className="icon-size" />
      ) : (
        <FaWater className="icon-size" />
      );
    }
    return null;
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
                const isHighlighted = highlightedCells.includes(cellKey);
                const isSelected = selectCells.includes(cellKey);

                return (
                  <td
                    key={cellIndex}
                    className={`table-cell 
                        ${startGame ? "cell-enabled" : "cell-disabled"}
                        ${isSelected ? "cell-selected-matrix" : ""}
                        ${isHighlighted ? `cell-highlighted-${id}` : ""}
                        ${clickedCells.has(cellKey) ? "clicked-cell" : ""}`}
                    onClick={() => handleCell(indexRow, cellIndex)}
                  >
                    {sendIcon(cellKey, isHighlighted)}
                  </td>
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
