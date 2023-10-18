import { useState } from "react";
import CarForm from "./CarForm";
import CarItem from "./CarItem";

function CarsPage() {
  const carsData = [];
  const [cars, setCars] = useState(carsData);
  const [editCarData, setEditCarData] = useState(null);

  const handleDeleteCar = (carId) => {
    setCars((prevState) => {
      prevState.filter((car) => car.id === carId);
    });
  };

  const carsUpdateHandler = (newCar) => {
    if (editCarData) {
      setCars((prevState) => {
        const editId = newCar.id;
        // const editIndex = cars.findIndex((car) => car.id === editId);
        const editIndex = prevState.findIndex((car) => car.id === editId);
        const newState = [...prevState];
        newState[editIndex] = newCar;
        return newState;
      });
      setEditCarData(null);
    } else {
      setCars((prevState) => [newCar, ...prevState]);
    }
  };

  const editCarHandler = (carId) => {
    const carToEdit = cars.find((car) => car.id === carId);
    setEditCarData(carToEdit);
  };

  const carsListElement = cars.map((car, index) => (
    <CarItem
      key={index}
      data={car}
      onDelete={handleDeleteCar}
      onEdit={editCarHandler}
    />
  ));

  return (
    <>
      <CarForm onNewCar={carsUpdateHandler} editCarData={editCarData} />
      <div className="car-list">{carsListElement}</div>
    </>
  );
}
export default CarsPage;
