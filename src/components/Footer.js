import { FaWater } from "react-icons/fa";
import { GiGooeyImpact } from "react-icons/gi";

function Footer({ handleStartGame }) {
  return (
    <div className="card-footer card-group">
      <div className="card card-footer-detail card-instruction">
        <h4 className="instruction-title">Instrucciones</h4>
        <div className="row">
          <div className="col-4">
            <nav
              id="navbar-example3"
              className="h-100 flex-column align-items-stretch pe-4 border-end instruction-item"
            >
              <nav className="nav nav-pills flex-column">
                <a className="nav-link ms-3 my-1" href="#item-1">
                  Item 1
                </a>
                <a className="nav-link ms-3 my-1" href="#item-2">
                  Item 2
                </a>
                <a className="nav-link ms-3 my-1" href="#item-3">
                  Item 3
                </a>
                <a className="nav-link ms-3 my-1" href="#item-4">
                  Item 4
                </a>
                <a className="nav-link ms-3 my-1" href="#item-5">
                  Item 5
                </a>
                <a className="nav-link ms-3 my-1" href="#item-6">
                  Item 6
                </a>
                <a className="nav-link ms-3 my-1" href="#item-7">
                  Item 7
                </a>
              </nav>
            </nav>
          </div>

          <div className="col-8">
            <div
              data-bs-spy="scroll"
              data-bs-target="#navbar-example3"
              data-bs-offset="10"
              data-bs-smooth-scroll="true"
              className="scrollspy-example-2 instruction-item-detail"
              tabIndex="0"
            >
              <div id="item-1">
                <h5>Item 1</h5>
                <p>
                  El participante debe ordenar la flota en la matriz del lado
                  izquierdo horizontal o verticalmente.
                </p>
              </div>
              <div id="item-2">
                <h5>Item 2</h5>
                <p>
                  Si el participante desea cambiar el orden inicial de la flota,
                  debe presionar el botón "Reordenar" para que la matriz se
                  inicialice, siempre que no haya iniciado la batalla.
                </p>
              </div>

              <div id="item-3">
                <h5>Item 3</h5>
                <p>
                  Debe seleccionar una coordenada en la matriz del lado derecho
                  y hacer click.
                </p>
              </div>
              <div id="item-4">
                <h5>Item 4</h5>
                <p>
                  Si al disparar impactó un barco, la celda de la matriz derecha
                  se marca con un punto rojo o en caso contrario se muestra de
                  color azul.
                </p>
              </div>
              <div id="item-5">
                <h5>Item 5</h5>
                <p>
                  Si al disparar se derriva una embarcación se marcará
                  automaticamente la embarcación en la parte superior de la
                  matriz derecha.
                </p>
              </div>
              <div id="item-6">
                <h5>Item 6</h5>
                <p>
                  En caso de que sea impactado una de las embarcaciones del
                  participante, esta se marcará sobre el con un punto rojo.
                </p>
              </div>
              <div id="item-7">
                <h5>Item 7</h5>
                <p>
                  El ganador es el jugador que hunda todos los barcos del
                  oponente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-footer-detail card-action">
        <div className="row justify-content-center align-items-center mt-3">
          <div className="col-6">
            <h4 className="pt-1">Leyenda</h4>
            <div className="d-flex align-items-center legend-icon">
              <FaWater size={20} className="me-2" />
              <h6 className="mb-0">Agua!</h6>
            </div>
            <div className="d-flex align-items-center mt-2 legend-icon">
              <GiGooeyImpact size={20} className="me-2" />
              <h6 className="mb-0">Impacto!</h6>
            </div>
          </div>
          <div className="col-6 d-grid gap-3">
            <div>
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={handleStartGame}
              >
                Iniciar
              </button>
            </div>
            <div>
              <button type="button" className="btn btn-danger w-100">
                Finalizar juego
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
