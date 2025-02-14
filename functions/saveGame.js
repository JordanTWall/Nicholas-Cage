const connect = require('./dbConnectionManager');

async function saveGame(teamName, year, data) {
    const db = await connect(); // ✅ Fix: Get only db
    const collectionName = teamName.replace(/ /g, '_'); // Replace spaces with underscores
    const collection = db.collection(collectionName);

    const yearData = { year, games: data.response, parameters: data.parameters };
    const query = {
        'parameters.season': String(year),
        'parameters.team': String(data.parameters.team),
    };

    const existingData = await collection.findOne(query);

    if (!existingData) {
        await collection.updateOne(
            query,
            { $set: yearData },
            { upsert: true } // Insert document if it doesn't exist
        );
        console.log(`Stored data for team ${teamName} in year ${year}`);
    } else {
        console.log(`Data for team ${teamName} in year ${year} already exists`);
    }
}

module.exports = { saveGame };
