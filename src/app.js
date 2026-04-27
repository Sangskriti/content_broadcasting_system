const express = require('express');
const sequelize = require('./config/db');
const apiRoutes = require('./routes/api');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', apiRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "URL bhul hoyeche, /api/login ba /api/upload try koro" });
});

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.log("DB Connection Error: ", err));