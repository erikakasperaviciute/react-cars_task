import { useState } from "react";
import CarForm from "./CarForm";
import CarItem from "./CarItem";

function CarsPage() {
  const carsData = [];
  const [cars, setCars] = useState(carsData);
  const [editCarIndex, setEditCarIndex] = useState(null);
  const [editCar, setEditCar] = useState(null);

  const carsListElement = cars.map((car, index) => (
    <CarItem
      key={index}
      data={car}
      onDelete={() => handleDeleteCar(index)}
      editCarHandler={() => editCarHandler(index)}
    />
  ));

  const handleDeleteCar = (index) => {
    setCars((prevState) => {
      const updatedCars = [...prevState];
      updatedCars.splice(index, 1);
      return updatedCars;
    });
  };

  const carsUpdateHandler = (newCar) => {
    if (editCar) {
      setCars((prevState) => prevState.toSpliced(editCarIndex, 1, newCar));
      setEditCar(null);
      setEditCarIndex(null);
    } else {
      setCars((prevState) => [newCar, ...prevState]);
    }
  };

  const editCarHandler = (index) => {
    setEditCar(cars[index]);
    setEditCarIndex(index);
  };

  return (
    <>
      <CarForm onNewCar={carsUpdateHandler} editCarData={editCar} />
      <div className="car-list">{carsListElement}</div>
    </>
  );
}
export default CarsPage;
