const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// In-memory storage for users
let users = [];
let currentId = 1;

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

// CREATE user
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;

    // Validate required fields
    if (!name || !email || !age) {
        return res.status(400).json({ message: "Name, email and age are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate age
    if (typeof age !== 'number' || age < 0) {
        return res.status(400).json({ message: "Age must be a positive number" });
    }

    // Check for duplicate email
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = {
        id: currentId++,
        name,
        email,
        age
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// UPDATE user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age } = req.body;

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Validate required fields
    if (!name || !email || !age) {
        return res.status(400).json({ message: "Name, email and age are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate age
    if (typeof age !== 'number' || age < 0) {
        return res.status(400).json({ message: "Age must be a positive number" });
    }

    // Check for duplicate email (excluding current user)
    if (users.some(u => u.email === email && u.id !== id)) {
        return res.status(400).json({ message: "Email already exists" });
    }

    users[userIndex] = {
        id,
        name,
        email,
        age
    };

    res.json(users[userIndex]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
