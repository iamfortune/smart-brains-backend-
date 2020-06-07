const Clarifai = require('clarifai');

// Clarifai API key
const app = new Clarifai.App({
  apiKey: "d8bc081eb66f488b9e44206d01dee76c",
});

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input);

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
    handleImage: handleImage
}