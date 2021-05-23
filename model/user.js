const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    cpf: {type: Number, require: true, unique: true, lowercase: true},
    email: {type: String, require: true, unique: true, lowercase: true},
    password: {type: String, require: true, select: false},
    created: {type: Date, default: new Date()}
})

UserSchema.pre('save', function (next) {
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted
        return next();
    })
})

module.exports = mongoose.model('user', UserSchema)

