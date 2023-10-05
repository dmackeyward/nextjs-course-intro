import Head from 'next/head'
import { Fragment } from "react"
import { MongoClient } from "mongodb"
import MeetupList from "../components/meetups/MeetupList"


function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetup Application</title>
                <meta
                    name="description"
                    content="Browse a huge list of highly active React meetups!"
                />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    //fetch data from API
    const MONGODB_URI = process.env.MONGODB_URI;
    const client = await MongoClient.connect(MONGODB_URI)
    const db = client.db()
    const meetupsCollection = db.collection('meetups')
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}

export default HomePage