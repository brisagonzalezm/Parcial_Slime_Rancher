require('dotenv').config();
const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const path    = require('path');

const connectDB = require('./config/db');

const app  = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/parcial_slimerancher';

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));

connectDB(MONGODB_URI);

// Home
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));

// API
app.use('/api', require('./routes'));

app.use((req,res)=> res.status(404).json({ success:false, message:'Ruta no encontrada' }));

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
