const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
	res.render('index',{
		title:'Weather',
		name: 'Inbaraj'
	})
})

app.get('/about', (req,res) => {
	res.render('about',{
		title:'About me',
		name:'Inbaraj'
	})
})
app.get('/help',(req, res)=>{
	res.render('help',{
		helpText:'This is some helpful text',
		title:'Help',
		name:'Inbaraj'
	})
})

/*app.get('/about',(req, res) => {
	res.send('<h1>About page</h1>')
})*/

app.get('/weather',(req, res)=>{
	if(!req.query.address) {
		return res.send({
			error:'You must provide a address'
		})
	}
	const address = req.query.address;
	geocode(address, (error, {latitude,longitude,location} = {})=>{
	
	if (error) {
		return res.send({error})
	} 
	forecast(latitude,longitude,(error, forecastData) => {
		if (error) {
			return res.send({error})
		}
		res.send({
			forecast:forecastData,
			location,
			address:req.query.address
		})
		
		
		})
	
	})
	
})

app.get('/products', (req,res) => {
	if(!req.query.search) {
		return res.send({
			error:'You must provide a search item'
		})
	}
	console.log(req.query.search)
	res.send({
		products:[]
	})
})

app.get('/help/*',(req,res) => {
	res.render('404',{
		title:'404',
		name:'Andrew Mead',
		errorMeassge:'Help article not found'
	})
})

app.get('*',(req,res) => {
	res.render('404',{
		title:'404',
		name:'Andrew Mead',
		errorMessage:'Page NOt found.'
	})
})
app.listen(port,()=>{
	console.log('Server is up on port 3000')
})