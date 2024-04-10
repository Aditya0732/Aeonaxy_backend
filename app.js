const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4001;
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const authenticate = require('./middleware/authMiddleware');

app.use(cors({ credentials: true, origin: 'https://aeonaxy-frontend.onrender.com' }));
app.use(express.json());

mongoose.connect('mongodb+srv://patiladitya7219:XkFwH86exzcY3xYH@cluster0.ptkllil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/Images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage
})

app.post('/upload', authenticate, upload.single('file'), (req, res, next) => {
    // Check for Multer errors
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }

    // Check if no file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // If everything is fine, send the filename in the response
    const filename = req.file.filename;
    res.json({ filename });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});


app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
