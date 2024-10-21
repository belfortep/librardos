//------------------------------REQUIRE------------------------------
const express = require('express');
const dotenv = require('dotenv')
const app = express();
const { connectDB } = require('./db/db');
const solidRoute = require('./routes/solid');
const liquidRoute = require('./routes/liquid');
const psychoRoute = require('./routes/psycho');
const authRoute = require('./routes/auth');
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

app.use('/api/solid', solidRoute);

app.use('/api/liquid', liquidRoute);

app.use('/api/psycho', psychoRoute);

app.use('/auth/', authRoute);

//------------------------------SERVER------------------------------

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
})