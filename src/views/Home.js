import "../App.css";
import Table from "../components/Table";
import Ship from "../components/Ship";
import Footer from "../components/Footer";
import { useState } from "react";

function Home() {
  const tables = [
    { id: 1, title: "Mi flota" },
    { id: 2, title: "Flota enemiga" },
  ];
  const [startGame, setStartGame] = useState("");
  const [selectTable, setSelectTable] = useState(2);

  const handleStartGame = () => {
    setStartGame(true);
  };
  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header style-title">Batalla Naval</div>
        <div className="card-body">
          <div className="row">
            {startGame &&
              tables.map((table, index) => (
                <div key={index} className="col-6 matrix-play">
                  <span>{table.title}</span>
                  <Ship startGame={startGame} />
                  <Table id={table.id} startGame={startGame} selectAble={table.id === selectTable}/>
                </div>
              ))}
          </div>
        </div>
        <Footer handleStartGame={handleStartGame} />
      </div>
    </div>
  );
}

export default Home;
