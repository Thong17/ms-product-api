const mongoose = require('mongoose')
const initialObject = require('./index')

const schema = new mongoose.Schema(
    {
        fullName: {
            type: String,
        },
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE'],
            default: 'MALE'
        },
        email: {
            type: String,
        },
        contact: {
            type: String,
        },
        dateOfBirth: {
            type: Date
        },
        description: {
            type: String
        },
        point: {
            type: Number,
            default: 0
        },
        ...initialObject
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
)

schema.pre('save', function (next) {
    const fullName = this.fullName?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    const description = this.description?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    const gender = this.gender?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    this.tags = [...fullName, ...description, ...gender]
    next()
})

schema.pre('findOneAndUpdate', function (next) {
    const fullName = this._update.fullName?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    const description = this._update.description?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    const gender = this._update.gender?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    this._update.tags = [...fullName, ...description, ...gender]
    next()
})

module.exports = mongoose.model('Customer', schema)