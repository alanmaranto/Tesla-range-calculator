import React from "react";
import PropTypes from "prop-types";
// import "./TeslaWheels.css";

const LabelLists = ({ value, handleChangeWheels }) => {
  const sizes = [19, 21];

  const LabelItems = sizes.map((size) => (
    <label
      key={size}
      htmlFor=""
      className={`tesla-wheels__item tesla-wheels__item--${size} ${
        value === size ? "tesla-wheels__item--active" : ""
      }`}
    >
      <input
        type="radio"
        name="wheelsize"
        value={size}
        checked={value === size}
        onChange={() => handleChangeWheels(size)}
      />
      <p>{size}"</p>
    </label>
  ));

  return <div>{LabelItems}</div>;
};

const TeslaWheels = ({ value, handleChangeWheels }) => (
  <div className="tesla-wheels__component">
    <p className="tesla-wheels__title">Wheels</p>
    <div className="tesla-wheels__container cf">
      <LabelLists value={value} handleChangeWheels={handleChangeWheels} />
    </div>
  </div>
);

TeslaWheels.propTypes = {
  value: PropTypes.number,
  changeHandlerWheels: PropTypes.func,
};

export default LabelLists;
