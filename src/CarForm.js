import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "./config";

const CarForm = (props) => {
  const { onNewCar, editCarData } = props;

  // const colorOptions = [
  //   "black",
  //   "red",
  //   "blue",
  //   "silver",
  //   "white",
  //   "special blue",
  //   "other",
  // ];

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [engine, setEngine] = useState("");
  const [engineTypes, setEngineTypes] = useState([]);
  const [basePrice, setBasePrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [otherColor, setOtherColor] = useState("");
  const [image, setImage] = useState("");
  const [discount, setDiscount] = useState("");
  const [colorOptions, setColorOptions] = useState([]);

  const colorHandler = (e) => setSelectedColor(e.target.value);
  const otherColorHandler = (e) => setOtherColor(e.target.value);

  useEffect(() => {
    const getEngineTypes = async () => {
      const { data } = await axios(`${API_URL}/engineTypes`);
      setEngineTypes(data);
      setEngine(data[0].id);
    };

    const getColors = async () => {
      const { data } = await axios(`${API_URL}/colors`);
      setColorOptions(data);
      setSelectedColor(data[0].id);
    };
    getEngineTypes();
    getColors();
  }, []);

  useEffect(() => {
    if (editCarData) {
      const { otherColor } = editCarData;
      setBrand(editCarData.brand);
      setModel(editCarData.model);
      setEngine(editCarData.engineTypeId);
      setBasePrice(editCarData.basePrice);
      setMileage(editCarData.mileage);

      if (otherColor) {
        setSelectedColor("other");
        setOtherColor(editCarData.color);
      } else {
        setSelectedColor(editCarData.color.id);
      }

      setImage(editCarData.image);
      setDiscount(editCarData.discount);
    }
  }, [editCarData]);

  const newCarHandler = (e) => {
    e.preventDefault();
    // const pickedColor = selectedColor === "other" ? otherColor : selectedColor;

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
      engineTypeId: Number(engine),
      colorId: Number(selectedColor),
      basePrice,
      mileage,
      // color: pickedColor,
      otherColor: selectedColor === "other",
      image,
      // additionalColorCost,
      mileageDiscount,
      discount,
    };
    setBrand("");
    setModel("");
    setEngine(engineTypes[0].id);
    setBasePrice("");
    setMileage("");
    setSelectedColor(colorOptions[0].id);
    setOtherColor("");
    setImage("");
    setDiscount("");

    onNewCar(newCar);
  };
  const brandInputHandler = (e) => setBrand(e.target.value);
  const modelInputHandler = (e) => setModel(e.target.value);
  const engineTypeHandler = (e) => setEngine(e.target.value);
  const basePriceInputHandler = (e) => setBasePrice(e.target.valueAsNumber);
  const mileageInputHandler = (e) => setMileage(e.target.valueAsNumber);

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
          value={engine}
          onChange={engineTypeHandler}
        >
          {engineTypes.map((engineType) => (
            <option value={engineType.id} key={engineType.id}>
              {engineType.title}
            </option>
          ))}
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
          onChange={colorHandler}
          value={selectedColor}
        >
          {colorOptions.map((color) => (
            <option key={color.id} value={color.id}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      {selectedColor === "other" && (
        <div className="form-control">
          <label htmlFor="custom-color">Enter your custom color:</label>
          <input
            type="text"
            id="custom-color"
            name="custom-color"
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
      <input
        type="submit"
        value={editCarData ? "Save edited car" : "Add new car"}
      />
    </form>
  );
};
export default CarForm;
