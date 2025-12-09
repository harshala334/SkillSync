const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Ensure name field
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skills: { type: [String], default: [] },
  bio: { type: String, default: '' },
  portfolio: { type: String, default: '' }, // Single URL for simplicity based on prompt, or [String] if needed later
  score: { type: Number, default: 0 },
  isMentor: { type: Boolean, default: false },
  jobTitle: { type: String, default: '' },
  company: { type: String, default: '' }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);