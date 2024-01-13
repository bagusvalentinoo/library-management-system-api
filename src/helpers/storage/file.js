const getFilePathFromUrl = (url) => {
  const path = new URL(url).pathname
  return path.split('/').slice(2).join('/')
}

module.exports = {
  getFilePathFromUrl
}