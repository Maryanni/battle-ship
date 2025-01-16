import "../App.css";
import Table from "../components/Table";
import Ship from "../components/Ship";
import Footer from "../components/Footer";
import { useState } from "react";

function Home() {
  const tables = [{ title: "Mi flota" }, { title: "Flota enemiga" }];
  const [startGame, setStartGame] = useState("");

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
                  <Table startGame={startGame} />
                </div>
              ))}
          </div>
        </div>
        <Footer handleStartGame={handleStartGame}/>
      </div>
    </div>
  );
}

export default Home;
