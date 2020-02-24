const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cotacoes = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Cotações',
        author: 'Sendreto'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Anderson Sendreto'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Ajuda',
        author: 'Anderson Sendreto'
    })
})
app.get('/cotacoes', (req, res) => {

    if (!req.query.ativo) {

        return res.status(400).json({
            error: {
                message: 'O ativo eve ser informado como query parameter',
                code: 400
            }
        })
    }
    const symbol = req.query.ativo.toUpperCase()

    cotacoes(symbol, (err, body) => {
        if (err) {
            return res.status(err.code).json({
                error: {

                    message: err.message,
                    code: err.code
                }
            })
        }
        res.status(200).json(body)
    })
})
app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        errorMessage: 'Não existe página depois de /help',
        author: 'Anderson Sendreto'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Página não encontrada',
        author: 'Anderson Sendreto'
    })
})
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is up on port: ${port}`)
})