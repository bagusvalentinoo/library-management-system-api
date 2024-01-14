class BorrowForMemberResource {
  constructor(data) {
    this.id = data.id
    this.book_code = data.book.code
    this.book_title = data.book.title
    this.book_author = data.book.author
    this.member_name = data.member.user.name
    this.member_email = data.member.user.email
    this.member_gender = data.member.gender
    this.member_phone_number = data.member.phone_number
    this.member_address = data.member.address
    this.borrow_date = data.borrow_date
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

module.exports = BorrowForMemberResource