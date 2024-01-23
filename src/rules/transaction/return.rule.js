const isBookReturnDurationMoreThanSevenDays = (borrow_date) => {
  const borrowDate = new Date(borrow_date)
  const returnDate = new Date()

  return (returnDate - borrowDate) / (1000 * 60 * 60 * 24) > 7
}

module.exports = { isBookReturnDurationMoreThanSevenDays }