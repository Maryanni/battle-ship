function Table(startGame) {
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

              {item.map((_, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`table-cell ${
                    startGame ? "cell-enabled" : "cell-disabled"
                  }`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
