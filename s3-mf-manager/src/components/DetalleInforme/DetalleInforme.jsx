import './DetalleI.css'

export default function DetalleInforme() {
    return(
        <div className="containerDetalleI">
        <h3 className="title">Informe XXXX</h3>
       
        <br></br>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Tipo Producto</th>
              <th>Nombre Producto</th>
              <th>Cantidad</th>
              <th>Precio Total</th>
              <th>Boleta</th>
            </tr>
          </thead>
          <tbody>
            
                <tr>
                  <td>1</td>
                  <td>2024-08-20</td>
                  <td>Otro</td>
                  <td>Banda Elastica</td>
                  <td>5</td>
                  <td>150 soles</td>
                  <td>
                    <button
                      className="btn btn-prm btn-sm"
                      onClick=""
                    >
                       <img src="/detalleInforme.png" alt="boleta" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2024-08-20</td>
                  <td>Otro</td>
                  <td>Tomatodo</td>
                  <td>1</td>
                  <td>45 soles</td>
                  <td>
                    <button
                      className="btn btn-prm btn-sm"
                      onClick=""
                    >
                      <img src="/detalleInforme.png" alt="boleta" />
                    </button>
                 
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2024-08-20</td>
                  <td>Otro</td>
                  <td>Polo</td>
                  <td>1</td>
                  <td>55 soles</td>
                  <td>
                    <button
                      className="btn btn-prm btn-sm"
                      onClick=""
                    >
                       <img src="/detalleInforme.png" alt="boleta" />
                    </button>
                   
                  </td>
                </tr>
                             
          </tbody>
        </table>
        <br></br>
        <div className='montoTotal'>
          <p>MONTO TOTAL: S/. 250.00 </p>
        </div>
      </div>
    );
}