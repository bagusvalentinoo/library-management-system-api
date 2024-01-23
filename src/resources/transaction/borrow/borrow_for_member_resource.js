class BorrowForMemberResource {
  constructor(data) {
    this.id = data.id
    this.borrow_date = data.borrow_date
    this.book = {
      id: data.book.id,
      code: data.book.code,
      title: data.book.title,
      author: data.book.author
    }
    this.member = {
      id: data.member.id,
      name: data.member.user.name,
      email: data.member.user.email,
      gender: data.member.gender,
      phone_number: data.member.phone_number,
      address: data.member.address
    }
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

module.exports = BorrowForMemberResource