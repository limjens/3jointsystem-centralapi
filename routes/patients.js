const router = require("express").Router();
const store = require("../data/store");
const { auth, adminOnly } = require("../middleware/auth");

router.get("/", auth, (req, res) => {
  res.json(store.patients);
});

router.get("/:person_id", auth, (req, res) => {
  const patient = store.patients.find(
    (p) => p.person_id == req.params.person_id,
  );
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  res.json(patient);
});

router.post("/", auth, (req, res) => {
  const person = store.persons.find((p) => p.id == req.body.person_id);
  if (!person)
    return res
      .status(404)
      .json({ message: "Person not found, create a person first" });

  const exists = store.patients.find((p) => p.person_id == req.body.person_id);
  if (exists)
    return res
      .status(400)
      .json({ message: "Patient record already exists for this person" });

  const patient = {
    id: Date.now(),
    ...req.body,
  };
  store.patients.push(patient);
  res.status(201).json(patient);
});

router.put("/:person_id", auth, (req, res) => {
  const index = store.patients.findIndex(
    (p) => p.person_id == req.params.person_id,
  );
  if (index === -1)
    return res.status(404).json({ message: "Patient not found" });
  store.patients[index] = { ...store.patients[index], ...req.body };
  res.json(store.patients[index]);
});

router.delete("/:person_id", auth, adminOnly, (req, res) => {
  const index = store.patients.findIndex(
    (p) => p.person_id == req.params.person_id,
  );
  if (index === -1)
    return res.status(404).json({ message: "Patient not found" });
  store.patients.splice(index, 1);
  res.json({ message: "Patient record deleted" });
});

module.exports = router;
