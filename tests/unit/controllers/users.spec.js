import sinon from 'sinon'

import UsersController from '../../../src/controllers/users'
import User from '../../../src/models/users'

describe('Controller: Users', () => {

  const defaultUser = [{
    id: '56cb91bdc3464f14678934ca',
    firstName: 'Default',
    lastName: 'User',
    email: 'user@mail.com'
  }]

  const defaultRequest = {
    params: {}
  }

  describe('findAll() users', () => {
    it('should call send with a list of users', async () => {
      const response = {
        send: sinon.spy()
      }

      User.find = sinon.stub()
      User.find.withArgs({}).resolves(defaultUser)

      const usersController = new UsersController(User)
      await usersController.findAll(defaultRequest, response)

      sinon.assert.calledWith(response.send, defaultUser)
    })
  })
})
