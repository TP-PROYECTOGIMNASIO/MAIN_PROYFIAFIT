import PropTypes from "prop-types";
import styles from "./NAVBAR.module.css";

const NAVBAR = ({ className = "" }) => {
  return (
    <header className={[styles.navbar, className].join(" ")}>
      <div className={styles.navbarChild} />
      <img
        className={styles.image59Icon}
        loading="lazy"
        alt=""
        src="/image-59@2x.png"
      />
      <div className={styles.userActions}>
        <div className={styles.userMenu}>
          <div className={styles.productsLink}>
            <h2 className={styles.productos}>Productos</h2>
          </div>
          <div className={styles.cartUser}>
            <div className={styles.cartIcon}>
              <img
                className={styles.icons8ShoppingCart521}
                loading="lazy"
                alt=""
                src="/icons8shoppingcart52-1@2x.png"
              />
            </div>
            <img
              className={styles.icons8UsuarioMasculinoEnC}
              loading="lazy"
              alt=""
              src="/icons8usuariomasculinoencrculo96-1@2x.png"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

NAVBAR.propTypes = {
  className: PropTypes.string,
};

export default NAVBAR;
