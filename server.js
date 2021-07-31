const express = require('express'); 
const connectDB = require('./config/db');
const app = express(); 

// connect DATABASE 
connectDB();


// bodyParser
app.use(express.json({extended:false}));


// bring the routes 
app.use('/api/users', require('./routes/app/users'));
app.use('/api/profile', require('./routes/app/profile'));
app.use('/api/auth', require('./routes/app/auth'));
app.use('/api/poste', require('./routes/app/poste'));

// init the server
app.get('/', (req,res)=> res.send('server runing'))
const PORT = process.env.PORT  || 5000; 

app.listen(PORT,()=>console.log(`server  started on ${PORT}`)); 