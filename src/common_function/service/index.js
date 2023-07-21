export const formattedSalePriceService = (price, discount) => {
  return (price - (discount / 100) * price).toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const formattedPriceService = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
