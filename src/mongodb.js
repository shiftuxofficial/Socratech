const { MongoClient} = require('mongodb');

const url = 'mongodb+srv://manjeet0796:manjeet0796@cluster0.irnuxnb.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(url);
const dbName = "Socratech";              
const collectionName = "signup";   

const displayAll = () => {
    return client.connect()             
    .then(() => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        console.log("============FOUND AND CONNECTED=============");

        return collection.find().toArray();
    })
    .then((documents) => {
        console.log(documents);
    })
    .catch((err) =>  {
        console.log(err, "error happened");
    }).finally(() => {
        return client.close();
    })
}

// const insertUser = (user) => {
//     return client.connect()
//     .then(() => {
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);        
    
//         return collection.insertOne(user);
//     })
//     .then((result)=> {
//         console.log('User inserted successfully:', result);
//     })
// };

// module.exports={insertUser}
displayAll()