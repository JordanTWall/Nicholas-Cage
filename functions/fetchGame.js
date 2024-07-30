// functions/fetchGame.js
const axios = require('axios')
const { saveGame } = require('./saveGame')
const teamsData = require('../data/teams.json')
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

async function main() {
  const years = []
  for (let year = 2010; year <= 2023; year++) {
    years.push(year)
  }

  for (const team of teamsData.response) {
    for (const year of years) {
      const data = await fetchData(team.id, year)
      if (data) {
        await saveGame(team.name, year, data)
      }
      await new Promise((r) => setTimeout(r, 6500)) // Wait 6.5 seconds to respect rate limit
    }
  }

  console.log('Data fetching and storing completed.')
}

if (require.main === module) {
  main().catch(console.error)
}

module.exports = { fetchData, main }
