module.exports = (temp, product) => {
  let output = temp.replace(/{%PRODUCT!NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT!IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT!PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT!LOCATION%}/g, product.from);
  output = output.replace(/{%PRODUCT!NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT!QTY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT!DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRODUCT!ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT!ORGANIC%}/g, "not-organic");
  return output;
}