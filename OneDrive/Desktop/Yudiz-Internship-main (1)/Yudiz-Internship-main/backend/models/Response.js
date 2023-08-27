const mongoose = require('mongoose')
const { Schema } = mongoose;

const FormSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type:String,
        required: true
    },
    response: [{ question: String, answer: String, question_type: String, list: Array }],

})

module.exports = mongoose.model('response', FormSchema)