import { Schema, model, Document, ObjectId } from 'mongoose'
import mongoose from 'mongoose'

interface CommentInterface extends Document {
    id_class: ObjectId
    date_created: Date
    lastName: string 
}

const CommentSchema = new Schema ({
    id_class: {type: mongoose.Schema.Types.ObjectId, required: true},
    date_created: Date,
    comment: { type: String, required: true}
}, {
    timestamps: true
})

export default model<CommentInterface>('Comment', CommentSchema)