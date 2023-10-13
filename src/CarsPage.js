import { useState } from "react";
import CarForm from "./CarForm";
import CarItem from "./CarItem";

function CarsPage() {
  const carsData = [];
  const [cars, setCars] = useState(carsData);
  const addNewCar = (newCar) => setCars((prevState) => [newCar, ...prevState]);
  const carsListElement = cars.map((car, index) => (
    <CarItem key={index} data={car} onDelete={() => handleDeleteCar(index)} />
  ));

  const handleDeleteCar = (index) => {
    setCars((prevState) => {
      const updatedCars = [...prevState];
      updatedCars.splice(index, 1);
      return updatedCars;
    });
  };
  return (
    <>
      <CarForm onNewCar={addNewCar} />
      <div className="car-list">{carsListElement}</div>
    </>
  );
}
export default CarsPage;
