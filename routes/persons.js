const router = require("express").Router();
const store = require("../data/store");
const { auth, adminOnly } = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.json(store.persons);
});

router.get("/:id", auth, (req, res) => {
  const person = store.persons.find((p) => p.id == req.params.id);
  if (!person) return res.status(404).json({ message: "Person not found" });
  res.json(person);
});

router.post("/", auth, (req, res) => {
  const person = {
    id: Date.now(),
    ...req.body,
  };
  store.persons.push(person);
  res.status(201).json(person);
});

router.put("/:id", auth, (req, res) => {
  const index = store.persons.findIndex((p) => p.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Person not found" });
  store.persons[index] = { ...store.persons[index], ...req.body };
  res.json(store.persons[index]);
});

router.delete("/:id", auth, adminOnly, (req, res) => {
  const index = store.persons.findIndex((p) => p.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Person not found" });
  store.persons.splice(index, 1);
  res.json({ message: "Person deleted" });
});

module.exports = router;
