const mongoose = require('mongoose')
const initialObject = require('./index')

const schema = mongoose.Schema(
    {
        name: {
            type: Object,
            required: [true, 'NAME_IS_REQUIRED']
        },
        status: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: ''
        },
        ...initialObject
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
)

module.exports = mongoose.model('Brand', schema)