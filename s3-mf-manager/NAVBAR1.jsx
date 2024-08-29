import PropTypes from "prop-types";
import styles from "./NAVBAR1.module.css";

const NAVBAR1 = ({ className = "" }) => {
  return (
    <header className={[styles.navbar, className].join(" ")}>
      <img className={styles.navbarChild} alt="" src="/rectangle-147.svg" />
      <img
        className={styles.image56Icon}
        loading="lazy"
        alt=""
        src="/image-56@2x.png"
      />
      <div className={styles.navbarMenu}>
        <div className={styles.inicioParent}>
          <div className={styles.inicio}>Inicio</div>
          <div className={styles.homeImage}>
            <img
              className={styles.imageLummiCategoryavat}
              loading="lazy"
              alt=""
              src="/public/perfil.png"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

NAVBAR1.propTypes = {
  className: PropTypes.string,
};

export default NAVBAR1;
