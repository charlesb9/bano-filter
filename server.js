import express from 'express'
import fetch from 'node-fetch'

const app = express()

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
	res.setHeader('Access-Control-Allow-Methods', 'GET')
	next();
});

app.use('/filter/:filter/', async (req, res, next) => {
	let query = req.query.q
	let arg = query.split(' ').join('+')
	let filter = req.params.filter
	try {
		let getData = await fetch(`http://api-adresse.data.gouv.fr/search/?q=${filter}+${arg}`)
		let data = await getData.json()
		res.status(200).json(data)
	} catch (err) {
		console.log(err)
		return res.status(404).json(err)
	}
});

app.use('', (req, res) => {
	res.status(404).json({message : 'url format : /filter/<filter>?q=<arguments>'})
})

const normalizePort = val => {
	const port = parseInt(val, 10)
	if (isNaN(port)) {
		return val
	}
	if (port >= 0) {
		return port
	}
	return false
};

const port = normalizePort(process.env.PORT || '3000')
app.listen(port, () => {
	console.log('listen to port : ' + port)
})
