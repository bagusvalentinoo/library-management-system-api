class BookForPublicResource {
  constructor(data) {
    this.id = data.id
    this.code = data.code
    this.title = data.title
    this.author = data.author
    this.quantity = data.quantity
    this.photo_url = data.photo_url
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}

module.exports = BookForPublicResource