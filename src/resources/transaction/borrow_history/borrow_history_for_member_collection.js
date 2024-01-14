class BorrowHistoryForMemberCollection {
  constructor(data) {
    this.borrow_id = data.id
    this.book_id = data.book_id
    this.book_code = data.book.code
    this.book_title = data.book.title
    this.book_author = data.book.author
    this.book_photo_url = data.book.photo_url
    this.borrow_date = data.borrow_date
    this.return_date = data.return_date
    this.is_late = data.is_late
  }

  static collection(dataCollection) {
    return dataCollection.map(data => new BorrowHistoryForMemberCollection(data))
  }
}

module.exports = BorrowHistoryForMemberCollection