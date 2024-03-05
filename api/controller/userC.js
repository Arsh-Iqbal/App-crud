import User from "../model/userM.js";

//create user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (!user) {
      return res.status(404).json({ msg: "User data not found" });
    }

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//getalluser
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).json({ msg: "User dose not found" });
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//get one User
export const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user)

  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//update user
export const updateUser = async (req, res) => {
  try {
    
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
