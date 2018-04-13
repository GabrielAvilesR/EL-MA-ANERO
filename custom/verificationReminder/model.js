import crypto from 'crypto'
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'
var randomstring = require("randomstring");

const roles = ['user', 'admin']

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    index: true,
    required:true,
    trim: true
  },
  role: {
    type: String,
    enum: roles,
    default: 'user'
  },
  picture: {
    type: String,
    trim: true
  },
  termsAccepted: {
    type: Boolean
  },
  verificationString: {
    type: String
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  newsletter: {
    type: Boolean,
    default: true
  },
  banned:{
    type:Boolean,
    default:false
  },
  apoyoCooldown:{
    type:Number,
    default:0
  },
  kintos:{
    type: Number,
    default: 10
  },
  referralCode:{
    type:String
  },
  card: {
    type: Schema.ObjectId,
    ref: 'Attachment'
  },
  cardStatus:{
    type:String,
    default:"noIdcard"
  },
  hasLoan:{
    type:Boolean,
    default:false
  },
  phone:{
    type: String,
    unique: true,
    minlength: 10
  }
}, {
  timestamps: true
})


userSchema.statics = {
  roles
}

const model = mongoose.model('User', userSchema)

export default model