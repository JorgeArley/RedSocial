const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  user: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
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

UsuarioSchema.method('toJSON', function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object
})

module.exports = model('Usuario', UsuarioSchema);

// ● User
// o FullName
// o Age
// o Email
// o Password
// o posts (relación con los posts del usuario)
// o createdAt
// o updatedAt
// o deletedAt