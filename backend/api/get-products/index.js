const mongoose = require("mongoose");
const app = require("../../utils/app");

const ModelSchema = require("../../models/Model");

app.get("*", async (req, res) => {
  try {
    // create new mongoose connection to mongodb atlas w/ connection string
    // which we will close after sending a response back to client
    const connection = await mongoose.createConnection(
      process.env.MONGODB_ATLAS_URI,
      {
        // Buffering means mongoose will queue up operations if it gets
        // disconnected from MongoDB and send them when it reconnects.
        // With serverless, better to fail fast if not connected.

        bufferCommands: false,
        bufferMaxEntries: 0
      }
    );
    const Model = connection.model("Model", ModelSchema);
    Model.find({}, (error, docs) => {
      if (error) {
        res.status(500).json({ error });
        connection.close();
        return;
      }
      res.set("cache-control", "s-maxage=1, maxage=0, stale-while-revalidate");
      res.json({ docs });
      connection.close();
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = app;
