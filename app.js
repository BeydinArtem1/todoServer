const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const apiRoutes = require('./src/modules/routes/routes');

const uri = 'mongodb+srv://ArtemBeydin:Restart987@cluster0.cm9vp.mongodb.net/ToDoDB?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/', apiRoutes)

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});