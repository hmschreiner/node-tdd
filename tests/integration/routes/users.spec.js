import User from '../../../src/models/users'

describe('Routes: Users', () => {
  const defaultId = '56cb91bdc3464f14678934ca'
  const defaultUser = {
    firstName: 'Jon',
    lastName: 'Doe',
    email: 'jon.doe@mail.com',
    createdAt: '2019-01-01T00:00:00.000Z',
    updatedAt: '2019-01-01T00:00:00.000Z'
  }

  const expectedUser = {
    id: defaultId,
    firstName: defaultUser.firstName,
    lastName: defaultUser.lastName,
    email: defaultUser.email,
    createdAt: defaultUser.createdAt,
    updatedAt: defaultUser.updatedAt
  }

  beforeEach(async () => {
    const user = new User(defaultUser)
    user._id = defaultId

    await User.deleteMany({})
    await user.save()
  })

  afterEach(() => User.deleteMany({}))

  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const response = await request.get('/users')

      expect(response.body).to.eql([expectedUser])
    })

    context('when an id is specified', () => {
      it('should return 200 with one user', async () => {
        const response = await request.get(`/users/${defaultId}`)

        expect(response.statusCode).to.eql(200)
        expect(response.body).to.eql([expectedUser])
      })
    })
  })

  describe('POST /users', () => {
    context('when posting an user', () => {
      it('should return a new user with status code 201', async () => {
        const customId = '56cb91bdc3464f14678934ba'
        const newUser = {
          ...expectedUser,
          _id: customId,
          firstName: 'Foo',
          lastName: 'Bar',
          email: 'foo.bar@mail.com'
        }
        const expectedSavedUser = {
          id: customId,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          createdAt: defaultUser.createdAt,
          updatedAt: defaultUser.updatedAt
        }

        const response = await request.post('/users').send(newUser)

        expect(response.statusCode).to.eql(201)
        expect(response.body).to.eql(expectedSavedUser)
      })
    })
  })

  describe('PUT /users/:id', () => {
    context('when editing an user', () => {
      it('should update the user and return 200 as status code', async () => {
        const customUser = {
          firstName: 'James'
        }
        const updatedUser = {
          ...defaultUser,
          customUser
        }

        const response = await request.put(`/users/${defaultId}`).send(updatedUser)

        expect(response.status).to.eql(200)
      })
    })
  })

  describe('DELETE /users/:id', () => {
    context('when deleting an user', () => {
      it('should delete an user and return 204 as status code', async () => {
        const response = await request.delete(`/users/${defaultId}`)

        expect(response.status).to.eql(204)
      })
    })
  })
})
