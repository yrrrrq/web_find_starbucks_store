const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const storeRoutes = require('./routes/stores');
const db = require('./config/db')

const app = express();
const port = 3000;

app.use(cors()); 

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', storeRoutes);

app.listen(port, () => {
    console.log('Server runiing at http://localhost:' + port);
})
