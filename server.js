const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/persons", require("./routes/persons"));
app.use("/api/patients", require("./routes/patients"));
app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/burials", require("./routes/burials"));
app.use("/api/dentists", require("./routes/dentists"));

const store = require("./data/store");
store.users.push({
  id: 1,
  username: "admin",
  password: "admin123",
  role: "admin",
});
console.log("Default admin created → username: admin, password: admin123");

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000.");
});
