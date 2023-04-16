const express = require("express");
const app = express();
const PORT = 8081;
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

require("dotenv").config();

app.use(bodyParser.json());
app.post("/", (req, res) => {
  const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
    organization: "org-828HokD1QbccDMb1mOa1FVJ8",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const response = openai.listEngines();

  const client = axios.create({
    headers: {
      Authorization: "Bearer " + process.env.OPENAI_API_KEY,
    },
  });
  const params = {
    prompt: req.body.text,
    n: 1,
    size: "256x256",
  };

  client
    .post("https://api.openai.com/v1/images/generations", params)
    .then((result) => {
      res.json(result.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
