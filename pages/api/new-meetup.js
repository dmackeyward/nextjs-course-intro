import { MongoClient } from "mongodb"

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {

    if (req.method === 'POST') {

        const data = req.body;
        const { MONGODB_URI } = process.env;
        const client = await MongoClient.connect(MONGODB_URI)
        const db = client.db()
        const meetupsCollection = db.collection('meetups')
        const result = await meetupsCollection.insertOne(data);
        console.log(result)
        client.close();
        res.status(201).json({message: 'Meetup inserted'})

    } 
}

export default handler;