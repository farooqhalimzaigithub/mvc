const express = require("express");
const app = express();
const lovRoutes = require("./routes/NrspIbftRoutes");
const bvsRoutes = require("./routes/BvsRoutes");
const { body, query, header, validationResult } = require("express-validator");

app.use(express.json());

app.use("/nrsp", lovRoutes);
app.use("/bvs", bvsRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
