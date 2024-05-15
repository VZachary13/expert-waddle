const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
)

reactionSchema.virtual('formattedCreatedAt').get(function(){
    return this.createdAt.toLocaleString();
})

reactionSchema.set('_id', false)

module.exports = reactionSchema;