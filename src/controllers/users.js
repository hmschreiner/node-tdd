class UsersController {
  constructor (User) {
    this.User = User
  }

  async findAll (req, res) {

    res.send([{
      id: '56cb91bdc3464f14678934ca',
      firstName: 'Default',
      lastName: 'User',
      email: 'user@mail.com'
    }])
  }
}

export default UsersController
