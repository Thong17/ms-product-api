const mongoose = require('mongoose')
const initialObject = require('./index')
const ExchangeRate = require('./Currency')

const schema = new mongoose.Schema(
    {
        name: {
            type: Object,
            required: [true, 'NAME_IS_REQUIRED']
        },
        price: {
            type: Number,
            require: true
        },
        currency: {
            type: mongoose.Schema.ObjectId,
            ref: 'ExchangeRate',
            required: [true, 'EXCHANGE_RATE_IS_REQUIRED'],
            validate: {
                validator: (id) => {
                    return new Promise(async (resolve, reject) => {
                        try {
                            const exchangeRate = await ExchangeRate.findById(id)
                            resolve(!!exchangeRate)
                        } catch (error) {
                            reject(error)
                        }
                    })
                },
                message: 'EXCHANGE_RATE_DOES_NOT_EXIST'
            },
        },
        brand: {
            type: mongoose.Schema.ObjectId,
            ref: 'Brand'
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category'
        },
        groups: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Group'
        }],
        stocks: [{
            type: mongoose.Schema.ObjectId,
            ref: 'ProductStock'
        }],
        images: {
            type: Array,
            default: []
        },
        isStock: {
            type: Boolean,
            default: false
        },
        code: {
            type: String,
            default: ''
        },
        description: {
            type: String
        },
        ...initialObject
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
)

schema.pre('save', function (next) {
    const name = Object.keys(this.name || {}).map(key => this.name[key]?.toLowerCase()).filter(Boolean)
    const description = this.description?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    this.tags = [...name, ...description]
    next()
})

schema.pre('findOneAndUpdate', function (next) {
    if (!this._update.name && !this._update.description) return next()
    const name = Object.keys(this._update.name || {}).map(key => this._update.name[key]?.toLowerCase()).filter(Boolean)
    const description = this._update.description?.split(' ').map(key => key?.toLowerCase()).filter(Boolean) || []
    this._update.tags = [...name, ...description]
    next()
})

module.exports = mongoose.model('Product', schema)