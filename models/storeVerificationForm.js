class storeVerificationForm {
  constructor(
    businessPermitImage,
    dateSubmitted,
    dateVerified,
    status,
    storeAddress,
    storeId,
    storeName,
    storeOwner,
    id,
  ) {
    this.businessPermitImage = businessPermitImage;
    this.dateSubmitted = dateSubmitted;
    this.dateVerified = dateVerified;
    this.status = status;
    this.storeAdress = storeAddress;
    this.storeId = storeId;
    this.storeName = storeName;
    this.storeOwner = storeOwner;
    this.id = id;
  }
}

export default storeVerificationForm;
