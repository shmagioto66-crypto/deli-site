const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(express.static("public"));

let users = [];
let bookings = [];

if (fs.existsSync("./data/users.json")) {
    users = JSON.parse(fs.readFileSync("./data/users.json"));
}
if (fs.existsSync("./data/bookings.json")) {
    bookings = JSON.parse(fs.readFileSync("./data/bookings.json"));
}

// REGISTER
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);
    users.push({ email, password: hash });

    fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
    res.json({ message: "Registered ✅" });
});

// LOGIN
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Wrong password" });

    res.json({ message: "Login success 🔐" });
});

// BOOK
app.post("/book", (req, res) => {
    const { name, date, time } = req.body;

    const booking = { id: Date.now(), name, date, time };
    bookings.push(booking);

    fs.writeFileSync("./data/bookings.json", JSON.stringify(bookings, null, 2));
    res.json({ message: "Booked 💅" });
});

// GET BOOKINGS
app.get("/bookings", (req, res) => {
    res.json(bookings);
});

// DELETE BOOKING
app.delete("/booking/:id", (req, res) => {
    const id = Number(req.params.id);
    bookings = bookings.filter(b => b.id !== id);

    fs.writeFileSync("./data/bookings.json", JSON.stringify(bookings, null, 2));
    res.json({ message: "Deleted ❌" });
});

app.listen(3000, () => console.log("http://localhost:3000"));
app.use(express.static('public'));
const express = require('express');
express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});


