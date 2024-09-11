import NAVBAR from "../components/NAVBAR";
import GroupComponent from "../components/GroupComponent";
import styles from "./HU01INICIARSESINPRINCIPA.module.css";

const HU01INICIARSESINPRINCIPA = () => {
  return (
    <div className={styles.hu01IniciarSesinPrincipa}>
      <main className={styles.fondoCuerpo}>
        <div className={styles.fondoCuerpoChild} />
        <img className={styles.image60Icon} alt="" src="/image-60@2x.png" />
      </main>
      <div className={styles.topbot}>
        <NAVBAR />
        <footer className={styles.bot}>
          <div className={styles.botChild} />
          <div className={styles.copyright2024}>Copyright 2024</div>
        </footer>
      </div>
      <div className={styles.content}>
        <div className={styles.linksContainer}>
          <GroupComponent mISPLANES="MIS PLANES" />
        </div>
        <GroupComponent propFlex="unset" mISPLANES="MIS MÉTRICAS" />
      </div>
      <GroupComponent propFlex="unset" mISPLANES="MIS COMPRAS" />
    </div>
  );
};

export default HU01INICIARSESINPRINCIPA;
