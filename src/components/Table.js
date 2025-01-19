import React, { useState, useEffect } from "react";
import "../App.css";
import { FaWater } from "react-icons/fa";
import { GiGooeyImpact } from "react-icons/gi";

function Table({ id, startGame, selectAble }) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const [selectCells, setSelectCells] = useState([]); //selección de celdas
  const [highlightedCells, setHighlightedCells] = useState([]); //pintar celdas aleatoreas
  const [clickedCells, setClickedCells] = useState(new Set()); //para click en celdas tabla 2
  const [clickedCellsCPU, setClickedCellsCPU] = useState(new Set()); //para ver celda seleccionada tabla 1

  const [renderedCells, setRenderedCells] = useState(new Set());

  useEffect(() => {
    if (id === 1) {
      // Cuando clickedCellsCPU cambia, actualizar el conjunto de celdas renderizadas
      setRenderedCells(new Set(clickedCellsCPU));
      console.log("clickedCellsCPU actualizado:", Array.from(clickedCellsCPU));
    }
  }, [clickedCellsCPU, id]);

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

  const handleCell = async (row, col) => {
    const cellKey = `${row}-${col}`;
    if (!startGame) return null;

    if (id === 2) {
      if (clickedCells.has(cellKey)) return;

      setClickedCells((prevCells) => {
        const newCells = new Set(prevCells);
        newCells.add(cellKey);
        return newCells;
      });

      const randomCell = randomSelectCPU();
      if (randomCell) {
        setClickedCellsCPU((prevCPUCells) => {
          const newCPUCells = new Set(prevCPUCells);
          newCPUCells.add(randomCell);
          console.log(
            "[Tabla 2] Actualizando clickedCellsCPU:",
            Array.from(newCPUCells)
          );
          setRenderedCells(new Set(newCPUCells));

          return newCPUCells;
        });
      }
    } else if (selectAble) {
      setSelectCells((prev) => {
        if (prev.includes(cellKey)) {
          return prev.filter((cell) => cell !== cellKey);
        }
        return [...prev, cellKey];
      });
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
    const isClicked = isCellClicked(cellKey);
    if (isClicked) {
      console.log(`[Table ${id}] Renderizando icono para:`, {
        cellKey,
        isHighlighted,
      });
      return isHighlighted ? (
        <GiGooeyImpact key={`icon-${cellKey}`} className="icon-size" />
      ) : (
        <FaWater key={`icon-${cellKey}`} className="icon-size" />
      );
    }
    return null;
  };

  const isCellClicked = (cellKey) => {
    console.log(`[Table ${id}] Verificando celda:`, {
      cellKey,
      isTable1: id === 1,
      clickedCellsCPUSize: clickedCellsCPU.size,
      clickedCellsCPUContent: Array.from(clickedCellsCPU),
    });

    if (id === 1) {
      console.log("entro en el 1 siiiiiii");
      return renderedCells.has(cellKey);
    }
    return clickedCells.has(cellKey);
  };

  const randomSelectCPU = () => {
    const availableCell = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cellKey = `${row}-${col}`;

        if (!clickedCellsCPU.has(cellKey)) {
          availableCell.push(cellKey);
        }
      }
    }
    if (availableCell.length === 0) return null;

    const randomValueToSelect = Math.floor(
      Math.random() * availableCell.length
    );
    const selectedCell = availableCell[randomValueToSelect];
    console.log("Celda CPU seleccionada:", selectedCell);

    return selectedCell;
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
            <tr key={`row-${indexRow}`}>
              <td className="table-cell">{letters[indexRow]}</td>

              {item.map((_, cellIndex) => {
                const cellKey = `${indexRow}-${cellIndex}`;
                const isHighlighted = highlightedCells.includes(cellKey);
                const isSelected = selectCells.includes(cellKey);
                const isClicked = isCellClicked(cellKey);

                return (
                  <td
                    key={`cell-${cellKey}`}
                    className={`table-cell 
                        ${startGame ? "cell-enabled" : "cell-disabled"}
                        ${isSelected ? "cell-selected-matrix" : ""}
                        ${isHighlighted ? `cell-highlighted-${id}` : ""}
                        ${
                          isClicked
                            ? id === 1
                              ? "clicked-cell2"
                              : "clicked-cell"
                            : ""
                        }`}
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
