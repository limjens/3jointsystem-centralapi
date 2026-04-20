const router = require("express").Router();
const store = require("../data/store");

router.get("/", (req, res) => {
  res.json(store.dentists);
});

router.get("/:id", (req, res) => {
  const dentist = store.dentists.find((d) => d.id == req.params.id);
  if (!dentist) return res.status(404).json({ message: "Dentist not found" });
  res.json(dentist);
});

router.post("/", (req, res) => {
  const dentist = {
    id: Date.now(),
    ...req.body,
  };
  store.dentists.push(dentist);
  res.status(201).json(dentist);
});

router.put("/:id", (req, res) => {
  const index = store.dentists.findIndex((d) => d.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Dentist not found" });
  store.dentists[index] = { ...store.dentists[index], ...req.body };
  res.json(store.dentists[index]);
});

router.delete("/:id", (req, res) => {
  const index = store.dentists.findIndex((d) => d.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Dentist not found" });
  store.dentists.splice(index, 1);
  res.json({ message: "Dentist deleted" });
});

module.exports = router;
