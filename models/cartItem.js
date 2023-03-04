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
  }
}

export default cartItem;
