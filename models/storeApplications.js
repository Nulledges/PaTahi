class storeApplications {
  constructor(
    businessPermitImage,
    dateSubmitted,
    status,
    storeAdress,
    storeImage,
    storeName,
    userId,
    storeId,
  ) {
    this.businessPermitImage = businessPermitImage;
    this.dateSubmitted = dateSubmitted;
    this.status = status;
    this.storeAdress = storeAdress;
    this.storeImage = storeImage;
    this.storeName = storeName;
    this.userId = userId;
    this.storeId = storeId;
  }
}

export default storeApplications;
