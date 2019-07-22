class UsersController {
  constructor (User) {
    this.User = User
  }

  async findAll (req, res) {
    try {
      const users = await this.User.find({})
      res.send(users)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async getById (req, res) {
    const { params: { id } } = req

    try {
      const user = await this.User.find({ _id: id })
      res.send(user)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async create (req, res) {
    try {
      const user = new this.User(req.body)
      await user.save()

      res.status(201).send(user)
    } catch (error) {
      res.status(422).send(error.message)
    }
  }

  async update (req, res) {
    const body = req.body

    try {
      const user = await this.User.findById(req.params.id)

      user.firstName = body.firstName
      user.lastName = body.lastName
      user.email = body.email

      await user.save()

      res.sendStatus(200)
    } catch (error) {
      res.status(422).send(error.message)
    }
  }

  async delete (req, res) {
    try {
      await this.User.deleteOne({ _id: req.params.id })
      res.sendStatus(204)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

export default UsersController
