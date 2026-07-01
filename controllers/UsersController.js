import User from '../models/User';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Missing email' });
    } else if (!password) {
      res.status(400).json({ error: 'Missing password' });
    } else if (await User.findByEmail(email)) {
      res.status(400).json({ error: 'Already exist' });
    } else {
      const newUser = await User.create(email, password);
      res.status(201).json({ id: newUser.id, email: newUser.email });
      newUser.save();
    }
  }
}
export default UsersController;
