import React from "react";

const HeaderWrapper = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}></div>
    </div>
  );
};

const styles = {
  container: {
    width: "300px",
    height: "200px",
    backgroundColor: "white",
    position: "relative",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
  },
  header: {
    width: "100%",
    height: "60px",
    background: "linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1))",
    position: "absolute",
    top: "0",
    left: "0",
    borderRadius: "40px / 60px",
    clipPath: "ellipse(100% 60px at center)",
  },
};

export default HeaderWrapper;
