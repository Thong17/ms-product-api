const mongoose = require('mongoose')

const main = async () => {
    return await mongoose.connect(process.env.DATABASE_URL)
}

main()
    .then(async () => {
        console.log(`Database connected to url ${process.env.DATABASE_URL}`)
    })
    .catch(console.error)