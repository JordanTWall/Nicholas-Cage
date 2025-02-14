// functions/fetchGame.js
const axios = require('axios')

require('dotenv').config()

const rapidApiKey = process.env.RAPID_API_KEY

async function fetchData(teamId, year) {
  const options = {
    method: 'GET',
    url: 'https://api-american-football.p.rapidapi.com/games',
    params: {
      season: year,
      team: teamId,
    },
    headers: {
      'x-rapidapi-key': rapidApiKey,
      'x-rapidapi-host': 'api-american-football.p.rapidapi.com',
    },
  }

  try {
    const response = await axios.request(options)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}



module.exports = { fetchData}
