class ReturnForMemberResource {
  constructor(data) {
    this.is_late = data.is_late
    this.borrow = {
      id: data.id,
      borrow_date: data.borrow_date,
      return_date: data.return_date
    }
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
      address: data.member.address,
      is_penalized: data.member.is_penalized,
      penalty_end_date: data.member.penalty_end_date ?? null
    }
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

module.exports = ReturnForMemberResource