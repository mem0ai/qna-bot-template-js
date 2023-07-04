const { App } = require("embedchain");

export default async function handler(req, res) {
  const { queryText } = req.body;

  try {
    const app = await App();
    const result = await app.query(queryText);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
}
