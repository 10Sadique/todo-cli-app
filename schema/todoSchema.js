import {nanoid} from 'nanoid';
import mongoose, {Schema} from 'mongoose';

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['completed', 'pending'],
        default: 'pending',
        trim: true
    },
    code: {
        type: String,
        required: true,
        default: 'code',
        trim: true
    }
}, {timestamps: true});

TodoSchema.pre('save', function(next){
    this.code = nanoid(10)
    next()
});

const Todos = mongoose.model('Todos', TodoSchema);
export default Todos;