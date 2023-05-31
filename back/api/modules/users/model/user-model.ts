import mongoose, { Schema } from 'mongoose';

const connection =  mongoose
const MODEL_NAME = 'users'
const schema = new Schema({
  id: String,
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    unique: true,
    required: true,
    min: 9,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
}, {
  collection: MODEL_NAME,
  timestamps: true
})

schema.index({ id: 1, cpf: 1 }, { unique: true })

export default connection.model(MODEL_NAME,schema)
