const router = require("express").Router();
const store = require("../data/store");

router.get("/", (req, res) => {
  res.json(store.burials);
});

router.get("/:person_id", (req, res) => {
  const burial = store.burials.find((b) => b.person_id == req.params.person_id);
  if (!burial)
    return res.status(404).json({ message: "Burial record not found" });
  res.json(burial);
});

router.post("/", (req, res) => {
  const person = store.persons.find((p) => p.id == req.body.person_id);
  if (!person)
    return res
      .status(404)
      .json({ message: "Person not found, create a person first" });

  const exists = store.burials.find((b) => b.person_id == req.body.person_id);
  if (exists)
    return res
      .status(400)
      .json({ message: "Burial record already exists for this person" });

  const burial = {
    id: Date.now(),
    ...req.body,
  };
  store.burials.push(burial);
  res.status(201).json(burial);
});

router.put("/:person_id", (req, res) => {
  const index = store.burials.findIndex(
    (b) => b.person_id == req.params.person_id,
  );
  if (index === -1)
    return res.status(404).json({ message: "Burial record not found" });
  store.burials[index] = { ...store.burials[index], ...req.body };
  res.json(store.burials[index]);
});

// DELETE a burial record
router.delete("/:person_id", (req, res) => {
  const index = store.burials.findIndex(
    (b) => b.person_id == req.params.person_id,
  );
  if (index === -1)
    return res.status(404).json({ message: "Burial record not found" });
  store.burials.splice(index, 1);
  res.json({ message: "Burial record deleted" });
});

module.exports = router;
