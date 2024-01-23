const { orderBy } = require('../../../../helpers/model/query')

describe('~/helpers/model/query.js', () => {
  describe("Function 'orderBy'", () => {
    it('should return the default sort order when no sort_by and sort_dir are provided', () => {
      const query = {}
      const expected = [['created_at', 'DESC'], ['updated_at', 'DESC']]

      expect(orderBy(query)).toEqual(expected)
    })

    it('should return the correct sort order when sort_by is provided', () => {
      const query = { sort_by: 'name' }
      const expected = [['name', 'DESC']]

      expect(orderBy(query)).toEqual(expected)
    })

    it('should return the correct sort order when sort_dir is provided', () => {
      const query = { sort_dir: 'ASC' }
      const expected = [['created_at', 'ASC'], ['updated_at', 'ASC']]

      expect(orderBy(query)).toEqual(expected)
    })

    it('should return the correct sort order when sort_by and sort_dir are provided', () => {
      const query = { sort_by: 'name', sort_dir: 'ASC' }
      const expected = [['name', 'ASC']]

      expect(orderBy(query)).toEqual(expected)
    })

    it('should convert sort_by and sort_dir to lowercase and uppercase respectively', () => {
      const query = { sort_by: 'NaMe', sort_dir: 'aSC' }
      const expected = [['name', 'ASC']]

      expect(orderBy(query)).toEqual(expected)
    })

    it('should return the default sort order when sort_dir is not valid', () => {
      const query = { sort_dir: 'Invalid' }
      const expected = [['created_at', 'DESC'], ['updated_at', 'DESC']]

      expect(orderBy(query)).toEqual(expected)
    })
  })
})