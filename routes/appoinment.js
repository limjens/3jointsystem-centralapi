const router = require("express").Router();
const store = require("../data/store");

router.get("/", (req, res) => {
  res.json(store.appointments);
});

router.get("/:person_id", (req, res) => {
  const appointments = store.appointments.filter(
    (a) => a.person_id == req.params.person_id,
  );
  if (appointments.length === 0)
    return res
      .status(404)
      .json({ message: "No appointments found for this person" });
  res.json(appointments);
});

router.post("/", (req, res) => {
  const person = store.persons.find((p) => p.id == req.body.person_id);
  if (!person)
    return res
      .status(404)
      .json({ message: "Person not found, create a person first" });

  const dentist = store.dentists.find((d) => d.id == req.body.dentist_id);
  if (!dentist)
    return res
      .status(404)
      .json({ message: "Dentist not found, create a dentist first" });

  const appointment = {
    id: Date.now(),
    status: "pending",
    ...req.body,
  };
  store.appointments.push(appointment);
  res.status(201).json(appointment);
});

router.put("/:id", (req, res) => {
  const index = store.appointments.findIndex((a) => a.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Appointment not found" });
  store.appointments[index] = { ...store.appointments[index], ...req.body };
  res.json(store.appointments[index]);
});

router.delete("/:id", (req, res) => {
  const index = store.appointments.findIndex((a) => a.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Appointment not found" });
  store.appointments.splice(index, 1);
  res.json({ message: "Appointment deleted" });
});

module.exports = router;
