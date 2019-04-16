const mongoose = require("mongoose");
const app = require("../../utils/app");

const ModelSchema = require("../../models/Model");

app.get("*", async (req, res) => {
  try {
    const conn = await mongoose.createConnection(
      process.env.MONGODB_ATLAS_URI,
      {
        bufferCommands: false,
        bufferMaxEntries: 0
      }
    );
    const Model = conn.model("Model", ModelSchema);
    Model.find({}, (error, docs) => {
      if (error) res.status(500).json({ error });
      res.json({ docs });
      conn.close();
    });
  } catch (e) {
    res.status(500).json({ error: e.message || "uh oh " });
  }
});

module.exports = app;
