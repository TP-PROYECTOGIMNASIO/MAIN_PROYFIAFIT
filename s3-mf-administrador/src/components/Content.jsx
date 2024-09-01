import GroupComponent1 from "./GroupComponent1";
import PropTypes from "prop-types";
import styles from "./Content.module.css";
import { Link } from "react-router-dom";

const Content = ({ className = "" }) => {
  return (
    <section className={[styles.content, className].join(" ")}>
      <div className={styles.main}>
        <div className={styles.options}>
          <div className={styles.adminOptions}>
            <div className={styles.rectangleParent}>
              <div className={styles.frameChild} />
              <div className={styles.trainersAdmin}>
                <div className={styles.trainersTitle}>
                  <div className={styles.administrar}>Administrar</div>
                  <div className={styles.administrar1}>Administrar</div>
                </div>
                <div className={styles.managersTitle}>
                  <a className={styles.manager}>MANAGER</a>
                  <a className={styles.manager1}>MANAGER</a>
                </div>
              </div>
              <div className={styles.clientAdmin}>
                <img
                  className={styles.clientTitleIcon}
                  loading="lazy"
                  alt=""
                  src="/vector.svg"
                />
              </div>
            </div>
            <div className={styles.rectangleGroup}>
              <div className={styles.frameItem} />
              <div className={styles.administrar2}>Administrar</div>
              <div className={styles.frameParent}>
                <div className={styles.entrenadoresWrapper}>
                  <div className={styles.entrenadores}>ENTRENADORES</div>
                </div>
                <img
                  className={styles.clientsIcon}
                  alt=""
                  src="/dashboard-icons-set.svg"
                />
              </div>
            </div>
          </div>
          <div className={styles.productsAdmin}>
            <GroupComponent1 mANAGER="MANAGER" productsIcon="/vector.svg" />
            <GroupComponent1
              propFlex="1"
              propAlignSelf="unset"
              propGap="2px"
              propWidth="247.1px"
              mANAGER="CLIENTES"
              productsIcon="/dashboard-icons-set.svg"
            />
          </div>
        </div>
        <div className={styles.exercisesAdmin}>
          <div className={styles.rectangleContainer}>
            <div className={styles.frameItem} />
            <div className={styles.administrar3}>Administrar</div>
            <div className={styles.managersTitle}>
              <div className={styles.exerciseTypeTitle}>
                <Link to={"/tproductos"} className={styles.tProductos}>T. PRODUCTOS</Link>
              </div>
              <img className={styles.exercisesIcon} alt="" src="/vector.svg" />
            </div>
          </div>
          <div className={styles.groupDiv}>
            <div className={styles.frameItem} />
            <div className={styles.administrar2}>Administrar</div>
            <div className={styles.frameGroup}>
              <div className={styles.tEjerciciosWrapper}>
                <h2 className={styles.tEjercicios}>T. EJERCICIOS</h2>
              </div>
              <img
                className={styles.clientsIcon}
                alt=""
                src="/dashboard-icons-set.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Content.propTypes = {
  className: PropTypes.string,
};

export default Content;
