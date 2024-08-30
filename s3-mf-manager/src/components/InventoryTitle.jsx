import RectangleComponent from "./RectangleComponent";
import PropTypes from "prop-types";
import styles from "./InventoryTitle.module.css";
import { Link } from "react-router-dom";

const InventoryTitle = ({ className = "" }) => {
  return (
    <div className={[styles.inventoryTitle, className].join(" ")}>
      <div className={styles.inventoryInfo}>
        <div className={styles.rectangleParent}>
          <div className={styles.frameChild} />
          <div className={styles.informacinDeInventarios}>
            Información de Inventarios
          </div>
        </div>
        <div className={styles.dashboardIcons}>
          <Link to={"/sedes"} className={styles.rectangleGroup} >
            
            <div className={styles.frameItem} />
            
            <div className={styles.sedes}>Sedes</div>
            <div className={styles.dashboardIconsSetWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </Link>
          <div className={styles.rectangleContainer}>
            <div className={styles.frameInner} />
            <div className={styles.inventario}>Inventario</div>
            <div className={styles.vectorWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </div>
          <div className={styles.groupDiv}>
            <div className={styles.frameInner} />
            <div className={styles.inventario}>Visitantes</div>
            <div className={styles.vectorWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.rectangleParent1}>
          <div className={styles.frameChild} />
          <div className={styles.informacinDeCompras}>
            Información de Compras
          </div>
        </div>
        <div className={styles.dashboardIcons}>
          <Link to={"/membresias"} className={styles.rectangleParent2}>
            <div className={styles.frameInner} />
            <div className={styles.membresas}>Membresías</div>
            <div className={styles.smileBeam} />
            <div className={styles.salesforce} />
            <div className={styles.dashboardIconsSetWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </Link>
          <div className={styles.rectangleParent3}>
            <div className={styles.frameInner} />
            <div className={styles.membresas}>Promociones</div>
            <div className={styles.vectorWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </div>
          <Link to={"/empleados"} className={styles.rectangleParent4}>
            <div className={styles.frameInner} />
            <div className={styles.empleados}>Empleados</div>
            <div className={styles.vectorWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.frameParent}>
        <div className={styles.rectangleParent1}>
          <div className={styles.frameChild} />
          <div className={styles.informacinDeCompras}>
            Información de Ventas
          </div>
        </div>
        <div className={styles.dashboardIcons}>
          <div className={styles.instanceParent}>
            <RectangleComponent />
            <div className={styles.rangos}>Rangos</div>
            <div className={styles.dashboardIconsSetWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </div>
          <div className={styles.rectangleParent6}>
            <div className={styles.frameInner} />
            <div className={styles.inventario}>Clientes</div>
            <div className={styles.dashboardIconsSetWrapper}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </div>
          <div className={styles.rectangleParent7}>
            <div className={styles.frameInner} />
            <div className={styles.membresas}>Pagos</div>
            <div className={styles.frameDiv}>
              <img
                className={styles.dashboardIconsSet}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InventoryTitle.propTypes = {
  className: PropTypes.string,
};

export default InventoryTitle;
