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

    it('should return 400 when an error occurs', async () => {
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }

      response.status.withArgs(400).returns(response)

      User.find = sinon.stub()
      User.find.withArgs({}).rejects({ message: 'Error' })

      const usersController = new UsersController(User)

      await usersController.findAll(defaultRequest, response)

      sinon.assert.calledWith(response.send, 'Error')
    })
  })

  describe('getById()', () => {
    it('should call send with one user', async () => {
      const fakeId = 'a-fake-id'
      const request = {
        params: {
          id: fakeId
        }
      }
      const response = {
        send: sinon.spy()
      }

      User.find = sinon.stub()
      User.find.withArgs({ _id: fakeId }).resolves(defaultUser)

      const usersController = new UsersController(User)

      await usersController.getById(request, response)

      sinon.assert.calledWith(response.send, defaultUser)
    })
  })

  describe('create() user', () => {
    it('should call send with a new user', async () => {
      const requestWithBody = {
        body: defaultUser[0],
        ...defaultRequest
      }
      const response = {
        send: sinon.spy(),
        status: sinon.stub()
      }

      class fakeUser {
        save () { }
      }

      response.status.withArgs(201).returns(response)

      sinon.stub(fakeUser.prototype, 'save').withArgs().resolves()

      const usersController = new UsersController(fakeUser)

      await usersController.create(requestWithBody, response)

      sinon.assert.calledWith(response.send)
    })

    context('when an error occurs', () => {
      it('should return 422', async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }

        class fakeUser {
          save () { }
        }

        response.status.withArgs(422).returns(response)

        sinon.stub(fakeUser.prototype, 'save').withArgs().rejects({ message: 'Error' })

        const usersController = new UsersController(fakeUser)

        await usersController.create(defaultRequest, response)

        sinon.assert.calledWith(response.status, 422)
      })
    })
  })

  describe('update() user', () => {
    const fakeId = 'a-fake-id'
    const updatedUser = {
      _id: fakeId,
      firstName: 'Updated',
      lastName: 'User',
      email: 'user@mail.com'
    }

    it('should respond with 200 when the user has been updated', async () => {
      const request = {
        params: {
          id: fakeId
        },
        body: updatedUser
      }
      const response = {
        sendStatus: sinon.spy()
      }

      class FakeUser {
        static findById () { }

        save () { }
      }

      const fakeUserInstance = new FakeUser()

      const saveSpy = sinon.spy(FakeUser.prototype, 'save')

      const findByIdStub = sinon.stub(FakeUser, 'findById')
      findByIdStub.withArgs(fakeId).resolves(fakeUserInstance)

      const usersController = new UsersController(FakeUser)

      await usersController.update(request, response)

      sinon.assert.calledWith(response.sendStatus, 200)
      sinon.assert.calledOnce(saveSpy)
    })

    context('when an error occurs', () => {
      it('should return 422', async () => {
        const request = {
          params: {
            id: fakeId
          },
          body: updatedUser
        }
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }

        class fakeUser {
          static findById () { }
        }

        const findByIdStub = sinon.stub(fakeUser, 'findById')
        findByIdStub.withArgs(fakeId).rejects({ message: 'Error' })

        response.status.withArgs(422).returns(response)

        const usersController = new UsersController(fakeUser)

        await usersController.update(request, response)

        sinon.assert.calledWith(response.send, 'Error')
      })
    })
  })

  describe('delete() user', () => {
    const fakeId = 'a-fake-id'
    const request = {
      params: {
        id: fakeId
      }
    }

    it('should respond with 204 when the user has been deleted', async () => {
      const response = {
        sendStatus: sinon.spy()
      }

      class fakeUser {
        static deleteOne () { }
      }

      const removeStub = sinon.stub(fakeUser, 'deleteOne')

      removeStub.withArgs({ _id: fakeId }).resolves([1])

      const usersController = new UsersController(fakeUser)

      await usersController.delete(request, response)

      sinon.assert.calledWith(response.sendStatus, 204)
    })

    context('when an error occurs', () => {
      it('should return 400', async () => {
        const response = {
          send: sinon.spy(),
          status: sinon.stub()
        }

        class fakeUser {
          static deleteOne () { }
        }

        const removeStub = sinon.stub(fakeUser, 'deleteOne')

        removeStub.withArgs({ _id: fakeId }).rejects({ message: 'Error' })

        response.status.withArgs(400).returns(response)

        const usersController = new UsersController(fakeUser)

        await usersController.delete(request, response)

        sinon.assert.calledWith(response.send, 'Error')
      })
    })
  })
})
