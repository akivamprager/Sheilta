const express = require("express");
const v1ApiRouter = require("./api/v1");

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use("/api/v1", v1ApiRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})