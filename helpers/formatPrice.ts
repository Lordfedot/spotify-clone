import { Price } from "@/types";

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currency,
      minimumFractionDigits: 0,
    }).format((price?.unit_amount || 0) / 100);
  
    return priceString;
  };

  export default formatPrice