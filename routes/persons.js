// routes/persons.js

const router = require('express').Router()
const store  = require('../data/store')
const { auth } = require('../middleware/auth')

// SEARCH persons by name ← must be BEFORE /:id
router.get('/search', auth, (req, res) => {
  const query = req.query.name?.toLowerCase()
  if (!query) return res.json([])

  const results = store.persons.filter(p =>
    p.name && p.name.toLowerCase().includes(query)
  )
  res.json(results)
})

// GET all persons
router.get('/', auth, (req, res) => {
  res.json(store.persons)
})

// GET one person by id
router.get('/:id', auth, (req, res) => {
  const person = store.persons.find(p => p.id == req.params.id)
  if (!person) return res.status(404).json({ message: 'Person not found' })
  res.json(person)
})

// POST create a person
router.post('/', auth, (req, res) => {
  const person = {
    id: Date.now(),
    ...req.body
  }
  store.persons.push(person)
  res.status(201).json(person)
})

// PUT update a person
router.put('/:id', auth, (req, res) => {
  const index = store.persons.findIndex(p => p.id == req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Person not found' })
  store.persons[index] = { ...store.persons[index], ...req.body }
  res.json(store.persons[index])
})

// DELETE a person
router.delete('/:id', auth, (req, res) => {
  const index = store.persons.findIndex(p => p.id == req.params.id)
  if (index === -1) return res.status(404).json({ message: 'Person not found' })
  store.persons.splice(index, 1)
  res.json({ message: 'Person deleted' })
})

module.exports = router