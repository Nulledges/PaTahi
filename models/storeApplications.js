class storeApplications {
  constructor(
    businessPermitImage,
    dateSubmitted,
    status,
    storeAddress,
    storeImage,
    storeName,
    userId,
    id,
  ) {
    this.businessPermitImage = businessPermitImage;
    this.dateSubmitted = dateSubmitted;
    this.status = status;
    this.storeAdress = storeAddress;
    this.storeImage = storeImage;
    this.storeName = storeName;
    this.userId = userId;
    this.id = id;
  }
}

export default storeApplications;
