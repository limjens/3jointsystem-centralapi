# Central API

A central REST API server that connects three systems:
- Patient Information System
- Funeral System
- Dentist Appointment System

---

## Requirements

- Node.js v18 or higher
- npm v8 or higher
- Postman (for testing)

---

## Installation

1. Clone the repository
   git clone https://github.com/YOUR_USERNAME/central-api.git

2. Go into the folder
   cd central-api

3. Install dependencies
   npm install

---

## Running the Server

   node server.js

Server will run on:
   http://localhost:3000

---

central-api/
      data/
         store.js         - in-memory data storage
      routes/
         persons.js       - shared across all systems
         patients.js      - patient information system
         burials.js       - funeral system
         appointments.js  - dentist appointment system
         dentists.js      - dentist management
      package.json
      server.js           - entry point
---

## API Endpoints

### Persons (Shared)
   POST   /api/persons           - Create a person
   GET    /api/persons           - Get all persons
   GET    /api/persons/:id       - Get one person
   PUT    /api/persons/:id       - Update a person
   DELETE /api/persons/:id       - Delete a person

### Patients
   POST   /api/patients          - Add patient record
   GET    /api/patients          - Get all patients
   GET    /api/patients/:person_id - Get patient by person
   PUT    /api/patients/:person_id - Update patient
   DELETE /api/patients/:person_id - Delete patient

### Burials
   POST   /api/burials           - Add burial record
   GET    /api/burials           - Get all burials
   GET    /api/burials/:person_id - Get burial by person
   PUT    /api/burials/:person_id - Update burial
   DELETE /api/burials/:person_id - Delete burial

### Dentists
   POST   /api/dentists          - Add a dentist
   GET    /api/dentists          - Get all dentists
   GET    /api/dentists/:id      - Get one dentist
   PUT    /api/dentists/:id      - Update dentist
   DELETE /api/dentists/:id      - Delete dentist

### Appointments
   POST   /api/appointments           - Book appointment
   GET    /api/appointments           - Get all appointments
   GET    /api/appointments/:person_id - Get by person
   PUT    /api/appointments/:id       - Update appointment
   DELETE /api/appointments/:id       - Cancel appointment

---

## Important Notes

- No database used — all data is stored in memory
- Data is lost when the server restarts
- Always create a person first before creating
  a patient, burial, or appointment record
- person_id is the link between all systems

---

## Testing Order in Postman

   1. POST /api/persons        → get PERSON_ID
   2. POST /api/dentists       → get DENTIST_ID
   3. POST /api/patients       → use PERSON_ID
   4. POST /api/burials        → use PERSON_ID
   5. POST /api/appointments   → use PERSON_ID + DENTIST_ID
