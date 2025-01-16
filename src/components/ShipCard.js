import { buque, submarino } from "../assets";

function ShipCard({ image, alt, columns, startGame }) {
  return (
    <div>
      <img src={image} className="card-img-top ship-card" alt={alt} />
      <div className="card m-3">
        <table
          className={`table table-buque ${startGame ? "enabled" : "disabled"}`}
        >
          <tbody>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <td
                  key={index}
                  className={startGame ? "cell-enabled" : "cell-disabled"}
                ></td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShipCard;
