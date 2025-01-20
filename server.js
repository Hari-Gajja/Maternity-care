const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database(':memory:');

app.use(cors());
app.use(bodyParser.json());

// Create Users table
db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)');

// Signup route
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (row) {
            res.status(400).json({ message: 'An account with this email already exists.' });
        } else {
            db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
                if (err) {
                    res.status(500).json({ message: 'Internal server error.' });
                } else {
                    res.status(200).json({ message: `Signup successful! Welcome, ${name}` });
                }
            });
        }
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
        if (row) {
            res.status(200).json({ message: `Welcome back, ${row.name}!` });
        } else {
            res.status(400).json({ message: 'Invalid email or password.' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



// Emergency route
app.post('/emergency', (req, res) => {
    const { name, email, location } = req.body;
    const { latitude, longitude } = location;

    // Implement the logic to alert nearest hospitals and ambulance services
    // For demonstration, we'll just log the details and send a response
    console.log(`Emergency alert for ${name} (${email}) at [${latitude}, ${longitude}]`);
    
    // Simulate sending alerts
    setTimeout(() => {
        res.status(200).json({ message: 'Emergency alert sent to the nearest hospitals and ambulance services.' });
    }, 1000);
});
