import NAVBAR1 from "../components/NAVBAR1";
import InventoryTitle from "../components/InventoryTitle";
import styles from "./HUVISUALLIZARINICIOSEGN.module.css";

const HUVISUALLIZARINICIOSEGN = () => {
  return (
    <div className={styles.huVisuallizarInicioSegn}>
      <main className={styles.main}>
        <NAVBAR1 />
        <div className={styles.managerGreeting}>
          <div className={styles.bienvenidoManager}>Bienvenido Manager!</div>
        </div>
        <section className={styles.inventoryTitleWrapper}>
          <InventoryTitle />
        </section>
      </main>
      <div className={styles.image64Wrapper}>
        <img className={styles.image64Icon} alt="" src="/image-64@2x.png" />
      </div>
      <footer className={styles.bot}>
        <div className={styles.botChild} />
        <div className={styles.link}>Copiryght © Gimnasio 2024</div>
        <div className={styles.socialIconsContainer}>
          <div className={styles.iconFacebookParent}>
            <img
              className={styles.iconFacebook}
              loading="lazy"
              alt=""
              src="/icon--facebook.svg"
            />
            <img
              className={styles.iconFacebook}
              loading="lazy"
              alt=""
              src="/icon--instagram.svg"
            />
            <img
              className={styles.iconFacebook}
              loading="lazy"
              alt=""
              src="/icon--x.svg"
            />
            <img
              className={styles.iconFacebook}
              loading="lazy"
              alt=""
              src="/icon--linkedin.svg"
            />
          </div>
        </div>
        <img
          className={styles.iconYoutube}
          loading="lazy"
          alt=""
          src="/icon--youtube.svg"
        />
      </footer>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
