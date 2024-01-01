import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en";

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs", { searchedWord: req.body.word }); // Initialize it with an empty string
});


app.post("/request", async (req, res) => {
  const wordDefinition = req.body.word;
  try {
    const result = await axios.get(API_URL + "/" + wordDefinition);
    const javascriptObject = result.data; // No need for JSON.parse

    // Render the EJS template with the data
    res.render("index.ejs", { content: javascriptObject, searchedWord: req.body.word });
    // Pass the content variable here
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
