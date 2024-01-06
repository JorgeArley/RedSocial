const { Schema, model } = require('mongoose');

const PostSchema = Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  },
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  },
  deletedAt: {
    type: String
  }
});

PostSchema.method('toJSON', function () {
  const { __v, ...object } = this.toObject();
  return object
})

module.exports = model('Post', PostSchema);
