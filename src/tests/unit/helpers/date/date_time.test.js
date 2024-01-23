const jwt = require('jsonwebtoken')
const { getDateTimeExpiredToken } = require('../../../../helpers/date/date_time')

describe('~/helpers/date/date_time.js', () => {
  describe("Function 'getDateTimeExpiredToken'", () => {
    const generateValidToken = () => {
      const payload = { exp: Math.floor(Date.now() / 1000) + 60 } // expires in 60 seconds
      return jwt.sign(payload, 'secret')
    }

    it('should return a date and time when passed a valid token', () => {
      const validToken = generateValidToken()
      const expected = new Date(Math.floor(jwt.decode(validToken).exp) * 1000)
      const actual = getDateTimeExpiredToken(`Bearer ${validToken}`)

      expect(actual).toBeInstanceOf(Date)
      expect(actual.getTime()).toBeCloseTo(expected.getTime(), -3) // -3 because getTime returns milliseconds and Date constructor takes seconds
    })

    it('should return null when passed an invalid token', () => {
      const actual = getDateTimeExpiredToken('Bearer invalidToken')
      expect(actual).toBeNull()
    })

    it('should return null when the token does not have an expiration', () => {
      const payload = { sub: 'user123' }
      const token = jwt.sign(payload, 'secret')
      const actual = getDateTimeExpiredToken(`Bearer ${token}`)

      expect(actual).toBeNull()
    })
  })
})