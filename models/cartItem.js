class cartItem {
  constructor(
    id,
    productId,
    quantity,
    storeId,
    productCategory,
    productDescription,
    primaryImages,
    productPrice,
    productTitle,
    reqMeasurements,
    myMeasurements,
  ) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.storeId = storeId;
    this.productCategory = productCategory;
    this.productDescription = productDescription;
    this.primaryImages = primaryImages;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.reqMeasurements = reqMeasurements;
    this.myMeasurements = myMeasurements;
  }
}

export default cartItem;
