import { Schema, model, Document } from 'mongoose'

interface ClasseInterface extends Document {
    name?: string
    description?: string
    video?: string 
    data_init: string
    data_end: string
    data_created: string
    data_updated: string
    total_comments: [number]
}

const ClasseSchema = new Schema ({
    name: String,
    description: String,
    video: String,
    data_init: Date,
    data_end: Date,
    data_created: Date,
    data_updated: Date,
    total_comments: [
        Number,
    ]
}, {
    timestamps: true
})

ClasseSchema.methods.fullname = function (): string {
    return this.firstName + ' ' + this.lastName
}

export default model<ClasseInterface>('Classe', ClasseSchema)