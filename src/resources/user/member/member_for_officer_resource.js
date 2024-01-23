class MemberForOfficerResource {
  constructor(data) {
    this.id = data.id
    this.code = data.code
    this.name = data.user.name
    this.username = data.user.username
    this.email = data.user.email
    this.gender = data.gender
    this.phone_number = data.phone_number
    this.address = data.address
    this.is_blocked = data.is_blocked
    this.is_penalized = data.is_penalized
    this.penalty_end_date = data.penalty_end_date
    this.photo_profile_url = data.photo_profile_url
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

module.exports = MemberForOfficerResource