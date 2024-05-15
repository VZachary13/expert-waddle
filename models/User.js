const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
username: { type: String, Required: true, Unique: true, Trimmed: true },
email: { type: String, Required: true, Unique: true,  match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address'] },
thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
},
{
    toJSON: {
        virtuals: true,
    },
    toObject: {
      virtuals: true,
    }
}
)

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})

const User = mongoose.model('User', userSchema);

module.exports = User;