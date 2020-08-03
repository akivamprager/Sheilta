const express = require("express");
const v1ApiRouter = require("./api/v1");

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use("/api/v1", v1ApiRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})