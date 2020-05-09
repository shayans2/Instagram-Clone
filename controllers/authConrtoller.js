const bcrypt = require("bcrypt");
const validationService = require("../services/validation");
const { User } = require("../models/user");

class authController {
  async userAuth(req, res) {
    const { error } = validationService("auth", req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    res.send(token);
  }
}

module.exports = new authController();
