class cartItem {
  constructor(
    id,
    productId,
    quantity,
    storeId,
    productCategory,
    productDescription,
    productImages,
    productPrice,
    productTitle,
  ) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.storeId = storeId;
    this.productCategory = productCategory;
    this.productDescription = productDescription;
    this.productImages = productImages;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
  }
}

export default cartItem;
