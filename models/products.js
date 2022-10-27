class products {
  constructor(
    id,
    storeId,
    productTitle,
    productImages,
    productCategory,
    bodyMeasurementNeeded,
    productDescription,
    productPrice,
    //productRating,
    isActive,
  ) {
    this.id = id;
    this.storeId = storeId;
    this.productTitle = productTitle;
    this.productImages = productImages;
    this.productCategory = productCategory;
    this.bodyMeasurementNeeded = bodyMeasurementNeeded;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
    //this.productRating = productRating
    this.isActive = isActive;
  }
}

export default products;
