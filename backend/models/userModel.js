const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

//static signup method
userSchema.statics.signup = async function(email, password){ //regular function not arrow because of this

    if (!email || !password) {
        throw Error("All fields must be filled.")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email is not valid.")
    }

    /*if (!validator.isStrongPassword(password)) {
        throw Error("Password is too weak")
    }*/

    const exists = await this.findOne({ email})

    if (exists) {
        throw Error("Email already registered.")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash})

    return user
}

//static login method
userSchema.statics.login = async function(email, password){
    if (!email || !password) {
        throw Error("All fields must be filled.")
    }

    const user = await this.findOne({ email})

    if (!user) {
        throw Error("Account with this email doesn not exist.")
    }

    const match = await bcrypt.compare(password, user.password) //user.password je hashed one

    if (!match) {
        throw Error("Password incorrect.")
    }

    return user
}


module.exports = mongoose.model("User", userSchema) //Model sa volá User