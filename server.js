const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/persons", require("./routes/persons"));
app.use("/api/patients", require("./routes/patients"));
//app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/burials", require("./routes/burials"));
//app.use("/api/dentists", require("./routes/dentists"));

app.listen(3000, () => {
  console.log("Server is running baby.");
});
