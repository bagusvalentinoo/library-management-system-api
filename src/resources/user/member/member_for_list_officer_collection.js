class MemberForListOfficerCollection {
  constructor(data) {
    this.id = data.id
    this.code = data.code
    this.name = data.user.name
    this.username = data.user.username
    this.email = data.user.email
    this.gender = data.gender
    this.phone_number = data.phone_number
    this.address = data.address
    this.photo_url = data.photo_url
    this.is_blocked = data.is_blocked
    this.is_penalized = data.is_penalized
    this.penalty_end_date = data.penalty_end_date
    this.borrowed_books_count = data.dataValues.borrowed_books_count
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }

  static collection(dataCollection) {
    return dataCollection.map(data => new MemberForListOfficerCollection(data))
  }
}

module.exports = MemberForListOfficerCollection