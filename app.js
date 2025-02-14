const { saveGame } = require('./functions/saveGame');
const { fetchData } = require('./functions/fetchGame'); // ✅ Fix: Import fetchData
const connect = require('./functions/dbConnectionManager'); // ✅ Fix: Import connect
const teamsData = require('./data/teams.json');

async function main() {
    const startYear = 2024;
    const endYear = 2024;

    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
    const db = await connect(); // ✅ Fix: Use only db (client is handled in dbConnectionManager.js)

    try {
        for (const team of teamsData.response) {
            for (const year of years) {
                const data = await fetchData(team.id, year);
                if (data) {
                    await saveGame(team.name, year, data);
                }
                await new Promise((r) => setTimeout(r, 6500)); // Wait 6.5 seconds for API rate limit
            }
        }
        console.log('Data fetching and storing completed.');
    } finally {
        console.log('MongoDB connection closed.');
        process.exit(0);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main };
