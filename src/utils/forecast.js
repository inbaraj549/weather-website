const request = require('request')


const forecast = (lat,lon,callback) =>{
	
	const url = 'http://api.weatherstack.com/current?access_key=232833eea8257ace27d411baebc7f5d0&query='+lat+','+lon+'&units=f'
	
	request({url,json:true},(error, {body})=>{
		
	if (error) {
		callback('Unable to connect to weater service!',undefined)
	} else if(body.error) {
		callback('Unable to find location',undefined)
	} else {
		const data = body.current
		
		callback(undefined,data.weather_descriptions[0]+' It is currently '+ data.temperature+' degrees out. There is a '+ data.precip+' chance of rain.Humidity is '+data.humidity +' percent')
	}
	})
}

module.exports = forecast