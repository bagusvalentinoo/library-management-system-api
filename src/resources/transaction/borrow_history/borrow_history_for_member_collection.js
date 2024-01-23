class BorrowHistoryForMemberCollection {
  constructor(data) {
    this.borrow = {
      id: data.borrow.id,
      borrow_date: data.borrow_date,
      is_returned: !!data.return_date,
      return_date: data.return_date,
      is_late: data.is_late
    }
    this.book = {
      id: data.book_id,
      book_code: data.book.code,
      book_title: data.book.title,
      book_author: data.book.author,
      book_photo_url: data.book.photo_url
    }
  }

  static collection(dataCollection) {
    return dataCollection.map(data => new BorrowHistoryForMemberCollection(data))
  }
}

module.exports = BorrowHistoryForMemberCollection