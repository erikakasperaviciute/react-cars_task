import { firstLetterUpperCase } from "./utils";

const CarItem = (props) => {
  const {
    id,
    brand,
    model,
    engineType,
    basePrice,
    mileage,
    color,
    image,
    // additionalColorCost,
    mileageDiscount,
    discount,
  } = props.data;
  const { onDelete, onEdit } = props;

  if (!brand || !model || !basePrice) {
    return null;
  }

  let additionalEngineCost = 0;
  if (engineType.title === "electric") {
    additionalEngineCost = 10000;
  } else if (engineType.title === "hybrid") {
    additionalEngineCost = 7500;
  } else if (engineType.title === "diesel") {
    additionalEngineCost = 5000;
  }

  let additionalColorCost = 0;
  if (color.name === "special blue") {
    additionalColorCost = 500;
  } else if (color.name === "other") {
    additionalColorCost = 3000;
  }

  let finalPrice = basePrice + additionalEngineCost + additionalColorCost;

  if (discount) {
    finalPrice -= discount;
  }
  const calculatedMileageDiscount = finalPrice * mileageDiscount;
  const priceAfterMileageDiscount = finalPrice - calculatedMileageDiscount;
  const pvmTaxes = priceAfterMileageDiscount * 0.21;

  const finalPriceWithTaxes = priceAfterMileageDiscount + pvmTaxes;

  const carTitle = `${brand} ${model}`;
  const basePriceElement = `Base price: ${basePrice} eur.`;
  const imageElement = image && <img src={image} alt="car" />;

  const carEngineInfo = `Engine type: ${engineType.title} - ${additionalEngineCost} Eur.`;
  const carMileageInfo = `Mileage: ${mileage} km.`;
  const carColor = `Color: ${color.name} - ${additionalColorCost} Eur.`;

  const discountsElement = (mileageDiscount || discount) && (
    <div>
      <h4>Discounts:</h4>
      {mileage > 0 && (
        <p>Discount for mileage: {calculatedMileageDiscount.toFixed(2)} Eur.</p>
      )}
      {discount && <p>Other discount: {discount} Eur.</p>}
    </div>
  );

  return (
    <div className="car-item">
      <h2>{carTitle}</h2>
      {imageElement}
      <p>{carMileageInfo}</p>
      <h4>{basePriceElement}</h4>
      <h4>Additional services:</h4>
      <p>{carEngineInfo}</p>
      <p>{carColor}</p>
      {discountsElement}
      <h4>Total:</h4>
      <p>Final price: {priceAfterMileageDiscount.toFixed(2)} Eur.</p>
      <p>PVM: {pvmTaxes.toFixed(2)} Eur.</p>
      <p>Final price including PVM: {finalPriceWithTaxes.toFixed(2)} Eur.</p>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={() => onEdit(id)}>Edit</button>
    </div>
  );
};
export default CarItem;
