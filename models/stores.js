class stores {
  constructor(
    storeId,
    activeProduct,
    email,
    inactiveProduct,
    location,
    phoneNumber,
    status,
    storeIcon,
    storeImage,
    storeName,
    storeOwner,
    userId,
  ) {
    this.storeId = storeId;
    this.activeProduct = activeProduct;
    this.email = email;
    this.inactiveProduct = inactiveProduct;
    this.location = location;
    this.phoneNumber = phoneNumber;
    this.status = status;
    this.storeIcon = storeIcon;
    this.storeImage = storeImage;
    this.storeName = storeName;
    this.storeOwner = storeOwner;
    this.userId = userId;
  }
}

export default stores;
