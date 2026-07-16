import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};
export const updateUserAvatar = async (req, res) => {
  const { file, user } = req;
  if (!file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(file.buffer, user._id);

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { avatar: result.secure_url },
    { returnDocument: 'after' },
  );

  res.status(200).json({ url: updatedUser.avatar });
};
export const updateCurrentUser = async (req, res) => {
  const { username } = req.body;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { username },
    { new: true },
  ).select('-password');

  res.status(200).json(user);
};
