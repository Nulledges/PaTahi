class user {
  constructor(
    userId,
    email,
    isTailor,
    name,
    phoneNumber,
    profileBanner,
    profileIcon,
    username,
  ) {
    this.userId = userId;
    this.email = email;

    this.isTailor = isTailor;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.profileBanner = profileBanner;
    this.profileIcon = profileIcon;
    this.username = username;
  }
}

export default user;
