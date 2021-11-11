const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');


const port = 5000
connectToMongo();
const app = express()
app.use(cors());
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`INotebook app listening at http://localhost:${port}`)
});