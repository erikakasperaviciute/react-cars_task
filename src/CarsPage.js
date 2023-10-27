import { useEffect, useState } from "react";
import CarForm from "./CarForm";
import CarItem from "./CarItem";
import axios from "axios";
import { API_URL } from "./config";

function CarsPage() {
  const [cars, setCars] = useState([]);
  const [editCarData, setEditCarData] = useState(null);

  useEffect(() => {
    const getCars = async () => {
      const { data } = await axios(
        `${API_URL}/cars?_sort=id&_order=desc&_expand=engineType&_expand=color`
      );
      setCars(data);
    };
    getCars();
  }, []);

  const carsUpdateHandler = async (newCar) => {
    if (editCarData) {
      await axios.put(`${API_URL}/cars/${editCarData.id}`, newCar);
      const { data } = await axios(
        `${API_URL}/cars/${editCarData.id}?_expand=engineType&_expand=color`
      );

      setCars((prevState) => {
        const editId = editCarData.id;
        const editIndex = prevState.findIndex((car) => car.id === editId);
        const newState = [...prevState];
        newState[editIndex] = data;
        return newState;
      });
      setEditCarData(null);
    } else {
      const { data } = await axios.post(`${API_URL}/cars`, newCar);
      const carRes = await axios(
        `${API_URL}/cars/${data.id}?_expand=engineType&_expand=color`
      );
      setCars((prevState) => [carRes.data, ...prevState]);
    }
  };

  const handleDeleteCar = (carId) => {
    axios.delete(`${API_URL}/cars/${carId}`);
    setCars((prevState) => {
      return prevState.filter((car) => car.id !== carId);
    });
  };

  const editCarHandler = (carId) => {
    const carToEdit = cars.find((car) => car.id === carId);
    console.log(carId);
    setEditCarData(carToEdit);
  };

  const carsListElement = cars.map((car) => (
    <CarItem
      key={car.id}
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
