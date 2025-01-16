import ShipCard from "./ShipCard";
import { barco, bote, buque, submarino } from "../assets";

function Ship({ startGame }) {
  return (
    <div>
      <div className="ship-order ship-top">
        <ShipCard image={buque} alt="buque" columns={5} startGame={startGame} />
        <ShipCard image={submarino} alt="submarino" columns={2} startGame={startGame} />
        <ShipCard image={submarino} alt="submarino" columns={2} startGame={startGame} />
      </div>
      <div className="ship-order ship-bottom">
        <ShipCard image={barco} alt="barco" columns={4} startGame={startGame} />
        <ShipCard image={bote} alt="bote" columns={3} startGame={startGame} />
        <ShipCard image={bote} alt="bote" columns={3} startGame={startGame} />
      </div>
    </div>
  );
}

export default Ship;
