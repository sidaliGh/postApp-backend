const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, required: false, ref: 'Post'}]
})

//hash the password
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//login
userSchema.statics.findByCredentials = async (email, password, res) => {
    const user = await User.findOne({email})
    if(!user){
        res.status(400).send({message: 'invalid you can not login'})
        throw new Error('invalid you can not login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        res.status(400).send({message: 'invalid you can not login'})
        throw new Error('invalid you can not login')
    }

    return user

}

const User = mongoose.model('User', userSchema)
module.exports = User