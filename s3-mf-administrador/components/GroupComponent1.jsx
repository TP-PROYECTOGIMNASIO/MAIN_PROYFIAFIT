import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./GroupComponent1.module.css";

const GroupComponent1 = ({
  className = "",
  propFlex,
  propAlignSelf,
  propGap,
  propWidth,
  mANAGER,
  productsIcon,
}) => {
  const groupDivStyle = useMemo(() => {
    return {
      flex: propFlex,
    };
  }, [propFlex]);

  const frameDivStyle = useMemo(() => {
    return {
      alignSelf: propAlignSelf,
      gap: propGap,
      width: propWidth,
    };
  }, [propAlignSelf, propGap, propWidth]);

  return (
    <div
      className={[styles.rectangleParent, className].join(" ")}
      style={groupDivStyle}
    >
      <div className={styles.frameChild} />
      <div className={styles.administrar}>Administrar</div>
      <div className={styles.managerParent} style={frameDivStyle}>
        <h2 className={styles.manager}>{mANAGER}</h2>
        <img className={styles.productsIcon} alt="" src={productsIcon} />
      </div>
    </div>
  );
};

GroupComponent1.propTypes = {
  className: PropTypes.string,
  mANAGER: PropTypes.string,
  productsIcon: PropTypes.string,

  /** Style props */
  propFlex: PropTypes.any,
  propAlignSelf: PropTypes.any,
  propGap: PropTypes.any,
  propWidth: PropTypes.any,
};

export default GroupComponent1;
