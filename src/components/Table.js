import React, { useState, useEffect } from "react";
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
  const [sequences, setSequences] = useState({
    two: 0,
    three: 0,
    four: 0,
    five: 0,
  });

  const handleCell = (row, col) => {
    if (startGame && selectAble) {
      const cellKey = `${row}-${col}`;
      setSelectCells((prev) => {
        if (prev.includes(cellKey)) {
          return prev.filter((cell) => cell !== cellKey);
        } else {
          const newCells = [...prev, cellKey];
          if (newCells.length > 19) {
            console.log("No puedes seleccionar más de 19 celdas en total.");
            return prev;
          }
          const sequences = verifySequence(newCells);

          const maxSequenceLength = Math.max(
            ...Object.entries(sequences).map(([key, count]) => {
              const length =
                key === "two"
                  ? 2
                  : key === "three"
                  ? 3
                  : key === "four"
                  ? 4
                  : 5;
              return length * count;
            })
          );

          return newCells;
        }
      });
    }
  };

  const verifySequence = (cells) => {
    const sortedCells = cells
      .map((cell) => {
        const [row, col] = cell.split("-");
        return { x: parseInt(row), y: parseInt(col) };
      })
      .sort((a, b) => a.x - b.x || a.y - b.y);
    return findSequences(sortedCells);
  };

  const findSequences = (sortedCells) => {
    const sequences = [];
    let currentSequence = [sortedCells[0]];

    for (let i = 1; i < sortedCells.length; i++) {
      const prev = sortedCells[i - 1];
      const curr = sortedCells[i];

      if (
        (prev.x === curr.x && prev.y + 1 === curr.y) ||
        (prev.y === curr.y && prev.x + 1 === curr.x)
      ) {
        currentSequence.push(curr);
      } else {
        sequences.push(currentSequence);
        currentSequence = [curr];
      }
    }
    sequences.push(currentSequence);

    const counts = { two: 0, three: 0, four: 0, five: 0 };
    sequences.forEach((seq) => {
      const length = seq.length;
      if (length >= 2 && length <= 5) {
        counts[
          length === 2
            ? "two"
            : length === 3
            ? "three"
            : length === 4
            ? "four"
            : "five"
        ]++;
      }
    });
    return counts;
  };

  useEffect(() => {
    if (selectCells.length > 0) {
      const newSequences = verifySequence(selectCells);
      console.log("Secuencias calculadas:", newSequences);
      setSequences(newSequences);
    }
  }, [selectCells]);

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
