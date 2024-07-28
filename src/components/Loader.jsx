import React from "react";
import { ClipLoader } from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const Loader = ({ loading }) => {
  return (
    <ClipLoader
      color="#2f2e37"
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Loader;
