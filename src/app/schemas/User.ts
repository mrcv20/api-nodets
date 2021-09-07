import { Schema, model, Document } from 'mongoose'
import * as bcrypt from 'bcryptjs'

interface UserInterface extends Document {
    email?: string
    firstName?: string
    lastName?: string 
    password: String
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