const {model,Schema} = require('mongoose');

const userSchema = new Schema({
username: { type: String, Required: true, Unique: true, Trimmed: true },
email: { type: String, Required: true, Unique: true,  match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] },
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
    id: false,
}
)

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;