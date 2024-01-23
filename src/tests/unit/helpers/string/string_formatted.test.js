const { v4: uuid4 } = require('uuid')
const crypto = require('crypto')
const {
  convertToUpperCase,
  convertToLowerCase,
  generateUuidV4,
  generateRandomCharacter,
  generateUsernameFromName,
  generateRandomCode,
  getCurrentDateFormatted
} = require('../../../../helpers/string/string_formatted')

describe('~/helpers/string/string_formatted.js', () => {
  describe("Function 'convertToUpperCase'", () => {
    it('should convert string to uppercase', () => {
      const str = 'heLlO WOrlD'
      const expected = 'HELLO WORLD'

      expect(convertToUpperCase(str)).toEqual(expected)
    })

    it('should return empty string when string is empty', () => {
      const str = ''
      const expected = ''

      expect(convertToUpperCase(str)).toEqual(expected)
    })
  })

  describe("Function 'convertToLowerCase'", () => {
    it('should convert string to lowercase', () => {
      const str = 'heLlO WOrlD'
      const expected = 'hello world'

      expect(convertToLowerCase(str)).toEqual(expected)
    })

    it('should return empty string when string is empty', () => {
      const str = ''
      const expected = ''

      expect(convertToLowerCase(str)).toEqual(expected)
    })
  })

  describe("Function 'generateUuidV4'", () => {
    it('should generate a uuid v4', () => {
      const uuid = generateUuidV4()

      expect(uuid).toMatch(/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/)
    })

    it('should generate a unique uuid v4', () => {
      const uuid1 = generateUuidV4()
      const uuid2 = generateUuidV4()

      expect(uuid1).not.toEqual(uuid2)
    })
  })

  describe("Function 'generateRandomCharacter'", () => {
    it('should generate a random character', () => {
      const length = 1
      const randomCharacter = generateRandomCharacter(length)

      expect(randomCharacter).toMatch(/^[a-zA-Z0-9]{1}$/)
    })

    it('should generate a random character with the correct length', () => {
      const length = 10
      const randomCharacter = generateRandomCharacter(length)

      expect(randomCharacter.length).toEqual(length)
    })
  })

  describe("Function 'generateUsernameFromName'", () => {
    it('should generate a username from name', () => {
      const name = 'John Doe'
      const username = generateUsernameFromName(name)
      const expected = 'john_doe'

      expect(username).toEqual(expected)
    })

    it('should generate a username from name with multiple spaces', () => {
      const name = 'John   Doe'
      const username = generateUsernameFromName(name)
      const expected = 'john_doe'

      expect(username).toEqual(expected)
    })

    it('should generate a username from name with leading and trailing spaces', () => {
      const name = ' John Doe '
      const username = generateUsernameFromName(name)
      const expected = 'john_doe'

      expect(username).toEqual(expected)
    })
  })

  describe("Function 'generateRandomCode'", () => {
    it('should generate a random code', () => {
      const length = 10
      const code = generateRandomCode(length)

      expect(code).toMatch(/^[A-Z0-9]{10}$/)
    })

    it('should generate a random code with the correct length', () => {
      const length = 10
      const code = generateRandomCode(length)

      expect(code.length).toEqual(length)
    })
  })

  describe("Function 'getCurrentDateFormatted'", () => {
    it('should generate a date with the correct format', () => {
      const date = getCurrentDateFormatted()
      const expected = /^\d{2}\d{2}\d{4}\d{2}\d{2}\d{2}$/

      expect(date).toMatch(expected)
    })
  })
})