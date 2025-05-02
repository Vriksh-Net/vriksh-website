import express from 'express';  
import cors from 'cors';
import { connectDB } from './config/db.js';



// App config
const app = express();
const port = 4000;


// Middleware
app.use(express.json());
app.use(cors());

// Database config
connectDB();


// API Endpoints 
app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})