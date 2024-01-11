class ExampleForExampleCollection {
  constructor(data) {
    this.example = data.example
  }

  static collection(dataCollection) {
    return dataCollection.map(data => new ExampleForExampleCollection(data))
  }
}

module.exports = ExampleForExampleCollection