const isBookReturnDurationMoreThanSevenDays = async (borrow) => {
  const borrowDate = new Date(borrow.borrow_date)
  const returnDate = new Date()

  console.log("Duration: ",  (returnDate - borrowDate) / (1000 * 60 * 60 * 24))

  return (returnDate - borrowDate) / (1000 * 60 * 60 * 24) > 7
}

module.exports = {
  isBookReturnDurationMoreThanSevenDays
}