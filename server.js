const app = require("./app");
const config = require("./app/config");
const MongoDB = requite("./app/utils/mongodb.util.js")

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");

        const PORT = config.app.port;
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}.`);
        });
    } catch (erorr) {
        console.log("Cannot connect to the database!", erorr);
        process.exit();
    }
}

startServer();