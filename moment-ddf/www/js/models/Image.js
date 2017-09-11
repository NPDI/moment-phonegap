class Image {
  constructor(id, name, description, latitude, longitude, userId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.UserId = userId;
    Object.freeze(this);
  }
}
