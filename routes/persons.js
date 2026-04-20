const router = require("express").Router();
const store = require("../data/store");

router.get("/", (req, res) => {
  res.json(store.persons);
});

router.get("/:id", (req, res) => {
  const person = store.persons.find((p) => p.id == req.params.id);
  if (!person) return res.status(404).json({ message: "Person not found" });
  res.json(person);
});

router.post("/", (req, res) => {
  const person = {
    id: Date.now(),
    ...req.body,
  };
  store.persons.push(person);
  res.status(201).json(person);
});

router.put("/:id", (req, res) => {
  const index = store.persons.findIndex((p) => p.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Person not found" });
  store.persons[index] = { ...store.persons[index], ...req.body };
  res.json(store.persons[index]);
});

router.delete("/:id", (req, res) => {
  const index = store.persons.findIndex((p) => p.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Person not found" });
  store.persons.splice(index, 1);
  res.json({ message: "Person deleted" });
});

module.exports = router;
