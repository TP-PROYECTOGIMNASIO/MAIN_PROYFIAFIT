import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./GroupComponent.module.css";

const GroupComponent = ({ className = "", propFlex, mISPLANES }) => {
  const groupDivStyle = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  return (
    <div
      className={[styles.rectangleParent, className].join(" ")}
      style={groupDivStyle}
    >
      <div className={styles.frameChild} />
      <div className={styles.ver}>VER</div>
      <h1 className={styles.misPlanes}>{mISPLANES}</h1>
    </div>
  );
};

GroupComponent.propTypes = {
  className: PropTypes.string,
  mISPLANES: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
};

export default GroupComponent;
