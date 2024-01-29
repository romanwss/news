const PORT = 9001 
const URLDB = 'mongodb://127.0.0.1:27017'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {secret} = require('./config') 
const User = require('./models/User')
const Product = require('./models/Product')

const app = express()

app.use(cors())
app.use(express.json())

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: '24'})
}

app.post('/registration', async (req, res) => {
    console.log(req.body)
    const {login, password, email} = req.body
    const user = new User({login, password, email})
    await user.save()
    res.json({
        message: 'Вы успешно зарегестрировались'
    })
})

app.post('/login', async (req, res) => {
    console.log(req.body)
    const {login, password} = req.body
    const user = await User.findOne({login})
    if (!user){
        return res.status(400).json({message: 'Пользователь не найден'})
    }
    if (user.password !== password){
        return res.status(400).json({message: 'Неверный пароль'})
    }
    const token = generateAccessToken(user._id)
    res.json({
        message: 'Вы успешно авторизованы',
        token: token
    })
})

app.get('/products', async (req, res) => {

    /*const products = [
        {id: 1, header: `Товар 1`, price: 120 },
        {id: 2, header: `Товар 2`, price: 150 },
        {id: 3, header: `Товар 3`, price: 770 },
        {id: 4, header: `Товар 4`, price: 1270 },
        {id: 5, header: `Товар 5`, price: 1200 },
        {id: 6, header: `Товар 6`, price: 10 }
      ]*/

    const products = await Product.find()  

    console.log(req.body)
    res.json({
        data: products
    })
})

const start = async () => {
    try {
        await mongoose.connect(URLDB, { authSource: "admin" });
        app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`))
    } catch (e) {
        console.log(e)
    }
}

start()