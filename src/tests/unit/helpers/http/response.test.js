const { success, throwNewError, failed, pagination, paginate } = require('../../../../helpers/http/response')

describe('~/helpers/http/response.js', () => {
  describe("Function 'success'", () => {
    it('should return a successful response', () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      const status_code = 200
      const message = 'Success'
      const data = { key: 'value' }

      success(res, status_code, message, data)

      expect(res.status).toHaveBeenCalledWith(status_code)
      expect(res.json).toHaveBeenCalledWith({ status_code, message, data: { key: 'value' } })
    })
  })

  describe("Function 'throwNewError'", () => {
    it('should throw a new error with the given status code and message', () => {
      const status_code = 400
      const message = 'Bad Request'

      expect(() => throwNewError(status_code, message)).toThrow(Error)
      expect(() => throwNewError(status_code, message)).toThrow('Bad Request')
    })
  })

  describe("Function 'failed'", () => {
    it('should return a failed response', () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      const status_code = 400
      const error = new Error('Bad Request')

      failed(res, status_code, error)

      expect(res.status).toHaveBeenCalledWith(status_code)
      expect(res.json).toHaveBeenCalledWith({ status_code, message: 'Bad Request' })
    })
  })

  describe("Function 'pagination'", () => {
    it('should return an object with limit and offset', () => {
      const limit = 10
      const offset = 0

      expect(pagination(1, limit)).toEqual({ limit, offset })
    })
  })

  describe("Function 'paginate'", () => {
    it('should return an object with data and pagination', () => {
      const model = { count: 100 }
      const page = 1
      const limit = 10
      const dataKey = 'results'
      const resource = [{ id: 1 }, { id: 2 }]

      expect(paginate(model, page, limit, dataKey, resource)).toEqual({
        results: [{ id: 1 }, { id: 2 }],
        pagination: {
          total_item: 100,
          total_page: 10,
          current_page: 1,
          next_page: 2,
          prev_page: 0,
          limit: 10
        }
      })
    })
  })
})