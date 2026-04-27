const express = require('express');
const sequelize = require('./config/db'); 
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "wrong URL, try /api/login or /api/upload" });
});


const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        
        await sequelize.sync(); 
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.error("DB Connection Error: ", err);
        
        process.exit(1); 
    }
};

startServer();