import { useState } from "react";
const CarForm = (props) => {
  const { onNewCar } = props;

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [engineType, setEngineType] = useState("electric");
  const [basePrice, setBasePrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [selectedColor, setSelectedColor] = useState("black");
  const [otherColor, setOtherColor] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState("");

  const newCarHandler = (e) => {
    e.preventDefault();
    const pickedColor =
      selectedColor === "other"
        ? `${otherColor.charAt(0).toUpperCase()}${otherColor.slice(1)}`
        : `${selectedColor.charAt(0).toUpperCase()}${selectedColor.slice(1)}`;

    let additionalEngineCost = 0;
    if (engineType === "electric") {
      additionalEngineCost = 10000;
    } else if (engineType === "hybrid") {
      additionalEngineCost = 7500;
    } else if (engineType === "diesel") {
      additionalEngineCost = 5000;
    }

    let additionalColorCost = 0;
    if (selectedColor === "special blue") {
      additionalColorCost = 500;
    } else if (selectedColor === "other") {
      additionalColorCost = 3000;
    }

    let mileageDiscount = 0;
    if (mileage > 400000) {
      mileageDiscount = 0.5;
    } else if (mileage > 100000) {
      mileageDiscount = 0.3;
    } else if (mileage > 50000) {
      mileageDiscount = 0.2;
    } else if (mileage > 20000) {
      mileageDiscount = 0.15;
    } else if (mileage > 0) {
      mileageDiscount = 0.1;
    }

    const newCar = {
      brand,
      model,
      engineType,
      basePrice,
      mileage,
      color: pickedColor,
      image,
      additionalEngineCost,
      additionalColorCost,
      mileageDiscount,
      discount,
    };
    setBrand("");
    setModel("");
    setEngineType("electric");
    setBasePrice("");
    setMileage("");
    setSelectedColor("black");
    setOtherColor("");
    setImage("");
    setDiscount("");

    onNewCar(newCar);
  };
  const brandInputHandler = (e) => setBrand(e.target.value);
  const modelInputHandler = (e) => setModel(e.target.value);
  const engineTypeHandler = (e) => setEngineType(e.target.value);
  const basePriceInputHandler = (e) => setBasePrice(e.target.valueAsNumber);
  const mileageInputHandler = (e) => setMileage(e.target.valueAsNumber);
  const colorHandler = (e) => {
    setSelectedColor(e.target.value);
  };
  const otherColorHandler = (e) => setOtherColor(e.target.value);
  const imageHandler = (e) => setImage(e.target.value);
  const discountInputHandler = (e) => setDiscount(e.target.valueAsNumber);

  return (
    <form id="car-form" onSubmit={newCarHandler}>
      <div className="form-control">
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          name="brand"
          required
          value={brand}
          onChange={brandInputHandler}
        />
      </div>
      <div className="form-control">
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          name="model"
          required
          value={model}
          onChange={modelInputHandler}
        />
      </div>
      <div className="form-control">
        <label htmlFor="engine-type">Engine type:</label>
        <select
          id="engine-type"
          name="engine-type"
          value={engineType}
          onChange={engineTypeHandler}
        >
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
          <option value="diesel">Diesel</option>
          <option value="petrol">Petrol</option>
        </select>
      </div>
      <div className="form-control">
        <label htmlFor="base-price">Base price:</label>
        <input
          type="number"
          id="base-price"
          name="base-price"
          min="0"
          required
          value={basePrice}
          onChange={basePriceInputHandler}
        />
      </div>
      <div className="form-control">
        <label htmlFor="mileage">Mileage:</label>
        <input
          type="number"
          id="mileage"
          name="mileage"
          min="0"
          value={mileage}
          onChange={mileageInputHandler}
        />
      </div>
      <div className="form-control">
        <label htmlFor="color">Color:</label>
        <select
          id="color"
          name="color"
          value={selectedColor}
          onChange={colorHandler}
        >
          <option value="black">Black</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="silver">Silver</option>
          <option value="white">White</option>
          <option value="special blue">Special Blue</option>
          <option value="other">Other</option>
        </select>
      </div>
      {selectedColor === "other" && (
        <div className="form-control">
          <label htmlFor="other-color">Enter custom color:</label>
          <input
            type="text"
            id="other-color"
            name="other-color"
            value={otherColor}
            onChange={otherColorHandler}
          />
        </div>
      )}

      <div className="form-control">
        <label htmlFor="image">Image link:</label>
        <input
          type="url"
          id="image"
          name="image"
          min="0"
          value={image}
          onChange={imageHandler}
        />
      </div>
      <div className="form-control">
        <label htmlFor="discount">Discount:</label>
        <input
          type="number"
          id="discount"
          name="discount"
          value={discount}
          onChange={discountInputHandler}
        />
      </div>
      <input type="submit" value="Add Car" />
    </form>
  );
};
export default CarForm;
