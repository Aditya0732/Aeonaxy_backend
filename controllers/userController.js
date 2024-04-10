const User = require('../models/user');
const { sendVerificationMail } = require('../utils/sendVerificationMail');

exports.updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { avatar, location, selectedRoles } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate fields to update
        const allowedFields = ['avatar', 'location', 'selectedRoles'];
        const fieldsToUpdate = Object.keys(req.body);
        const isValidOperation = fieldsToUpdate.every(field => allowedFields.includes(field));
        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid fields for update' });
        }

        // Update user details
        user.avatar = avatar || user.avatar;
        user.location = location || user.location;
        user.selectedRoles = selectedRoles || user.selectedRoles;

        // Save updated user
        await user.save();

        sendVerificationMail(user);

        res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.changeEmail = async (req, res) => {
    const { newEmail } = req.body;

  try {
    const existingUser = await User.findOne({ email: newEmail });

    if (existingUser) {
      return res.status(409).json({ error: 'Email address already in use' });
    }
    const userId = req.userId;
    const user = await User.findById(userId);

    user.email = newEmail;

    await user.save();
    console.log("mailoptions0",user);
    sendVerificationMail(user);

    res.status(200).json({ message: 'Email address updated successfully', user });
  } catch (error) {
    // Handle any errors
    console.error('Error updating email address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.resendConfirmationEmail = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    sendVerificationMail(user);
    res.status(200).json({ message: 'Email sent successfully', user });
  } catch (error) {
    // Handle any errors
    console.error('Error updating email address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};