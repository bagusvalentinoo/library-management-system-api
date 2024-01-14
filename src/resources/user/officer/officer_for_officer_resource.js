class OfficerForOfficerResource {
  constructor(data) {
    this.id = data.id
    this.name = data.user.name
    this.username = data.user.username
    this.email = data.user.email
    this.gender = data.gender
    this.photo_profile_url = data.photo_profile_url
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

module.exports = OfficerForOfficerResource