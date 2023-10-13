const CarItem = (props) => {
  const {
    brand,
    model,
    engineType,
    basePrice,
    mileage,
    color,
    image,
    additionalEngineCost,
    additionalColorCost,
    mileageDiscount,
    discount,
  } = props.data;

  if (!brand || !model || !basePrice) {
    return null;
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

  const carEngineInfo = `Engine type: ${engineType
    .at(0)
    .toUpperCase()}${engineType.slice(1)} - ${additionalEngineCost} Eur.`;
  const carMileageInfo = `Mileage: ${mileage} km.`;
  const carColor = `Color: ${color} - ${additionalColorCost} Eur.`;

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
      <p>Final price: {priceAfterMileageDiscount.toFixed(2)}</p>
      <p>PVM: {pvmTaxes.toFixed(2)} Eur.</p>
      <p>Final price including PVM: {finalPriceWithTaxes.toFixed(2)} Eur.</p>
    </div>
  );
};
export default CarItem;
