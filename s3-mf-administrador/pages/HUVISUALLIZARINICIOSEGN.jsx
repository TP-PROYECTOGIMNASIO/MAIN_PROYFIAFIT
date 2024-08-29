import Content from "../components/Content";
import styles from "./HUVISUALLIZARINICIOSEGN.module.css";

const HUVISUALLIZARINICIOSEGN = () => {
  return (
    <div className={styles.huVisuallizarInicioSegn}>
      <main className={styles.top}>
      <header className={styles.navbarWrapper}>
  <nav className={styles.navbar}>
    <img
      className={styles.navbarLogo}
      alt="Logo"
      src="/rectangle-147.svg"
    />
    <img
      className={styles.image56Icon}
      loading="lazy"
      alt="Imagen"
      src="/image-56@2x.png"
    />
    <h2 className={styles.inicio}>Inicio</h2>
    <img
      className={styles.userIcon}
      loading="lazy"
      alt="Usuario"
      src="/icons8usuariomasculinoencrculo96-1@2x.png"
    />
  </nav>
</header>

        <div className={styles.adminWelcome}>
          <h2 className={styles.bienvenidoAdmin}>Bienvenido Admin</h2>
        </div>
        <Content />
      </main>
      <div className={styles.image64Wrapper}>
        <img className={styles.image64Icon} alt="" src="/image-64@2x.png" />
      </div>
      <footer className={styles.bot}>
        <div className={styles.botChild} />
        <div className={styles.link}>Copiryght © Gimnasio 2024</div>
        <div className={styles.socialIcons}>
          <div className={styles.socialMediaIcons}>
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
