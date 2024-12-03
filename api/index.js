//------------------------------REQUIRE------------------------------
const express = require('express');
const dotenv = require('dotenv')
const app = express();
const { connectDB } = require("./src/db/db.js");
const authRoute = require('./src/routes/auth.js');
const bookRoute = require('./src/routes/book.js');
const communityRoute = require("./src/routes/community.js");
const messageRoute = require("./src/routes/message.js")
const cookieParser = require('cookie-parser');
const cors = require('cors');

//------------------------------CONFIG------------------------------

dotenv.config();

app.set('port', process.env.PORT || 4000);

//------------------------------MIDDLEWARES------------------------------

let corsOptions = {
    origin: ["https://librardos-client.vercel.app"]
}

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

//------------------------------DB------------------------------

connectDB();

//------------------------------ROUTES------------------------------

app.use("/api/book", bookRoute);

app.use('/auth/', authRoute);

app.use("/api/community", communityRoute);

app.use("/api/message", messageRoute);

//------------------------------SERVER------------------------------

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})