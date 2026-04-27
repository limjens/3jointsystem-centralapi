const router = require("express").Router();
const jwt = require("jsonwebtoken");
const store = require("../data/store");
const { auth, adminOnly, SECRET } = require("../middleware/auth");

router.post("/register", auth, adminOnly, (req, res) => {
  const { username, password, role } = req.body;

  // Check if username already exists
  const exists = store.users.find((u) => u.username === username);
  if (exists)
    return res.status(400).json({ message: "Username already exists" });

  // Check role is valid
  const validRoles = ["admin", "staff", "viewer"];
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: "Role must be admin, staff, or viewer" });
  }

  const user = {
    id: Date.now(),
    username,
    password,
    role,
  };

  store.users.push(user);
  res
    .status(201)
    .json({ message: "User created", user: { id: user.id, username, role } });
});

// POST - Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = store.users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user)
    return res.status(401).json({ message: "Invalid username or password" });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET,
    { expiresIn: "8h" },
  );

  res.json({ message: "Login successful", token, role: user.role });
});

// GET - All users (admin only)
router.get("/", auth, adminOnly, (req, res) => {
  const users = store.users.map((u) => ({
    id: u.id,
    username: u.username,
    role: u.role,
  }));
  res.json(users);
});

// PUT - Update a user (admin only)
router.put("/:id", auth, adminOnly, (req, res) => {
  const index = store.users.findIndex((u) => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  store.users[index] = { ...store.users[index], ...req.body };
  res.json({ message: "User updated" });
});

// DELETE - Delete a user (admin only)
router.delete("/:id", auth, adminOnly, (req, res) => {
  const index = store.users.findIndex((u) => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  store.users.splice(index, 1);
  res.json({ message: "User deleted" });
});

module.exports = router;
