import PropTypes from "prop-types";
import styles from "./RectangleComponent.module.css";

const RectangleComponent = ({ className = "" }) => {
  return (
    <div className={[styles.rectangleParent, className].join(" ")}>
      <div className={styles.instanceChild} />
      <img className={styles.vectorIcon} alt="" src="/vector.svg" />
    </div>
  );
};

RectangleComponent.propTypes = {
  className: PropTypes.string,
};

export default RectangleComponent;
