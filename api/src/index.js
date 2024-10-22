//------------------------------REQUIRE------------------------------
const express = require('express');
const dotenv = require('dotenv')
const app = express();
const { connectDB } = require('./db/db');
const authRoute = require('./routes/auth');
const bookRoute = require('./routes/book');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//------------------------------CONFIG------------------------------

dotenv.config();

app.set('port', process.env.PORT || 4000);

//------------------------------MIDDLEWARES------------------------------

app.use(cors());

app.use(express.json());

app.use(cookieParser());

//------------------------------DB------------------------------

connectDB();

//------------------------------ROUTES------------------------------

app.use("/api/book", bookRoute);

app.use('/auth/', authRoute);

//------------------------------SERVER------------------------------

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})