import { Schema, model, Document } from 'mongoose'
const bcrypt = require('bcryptjs')

interface UserInterface extends Document {
    email?: string
    firstName?: string
    lastName?: string 
    fullname(): string
}

const UserSchema = new Schema ({
    email: {type: String, required: true},
    firstName: String,
    lastName: String,
    password: {type: String, required: true},
}, {
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    next()
})


export default model<UserInterface>('User', UserSchema)