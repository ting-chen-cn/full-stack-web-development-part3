const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    uniqueCaseInsensitive: true,
  },
  number: {
    type: String,
    required: true,
    minlength: 8,
    match: [
      new RegExp('^[0-9-*#+]+$', 'i'),
      '{PATH} {VALUE} is not valid. Use only numbers or *.',
    ],
  },
})
personSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.',
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
