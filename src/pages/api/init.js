const { App } = require("embedchain");

export default async function handler(req, res) {
  try {
    const chat_bot_app = await App();

    //Embedding Online Resources
    await chat_bot_app.add("web_page", "https://nav.al/feedback");
    await chat_bot_app.add("web_page", "https://nav.al/agi");
    await chat_bot_app.add(
      "pdf_file",
      "https://navalmanack.s3.amazonaws.com/Eric-Jorgenson_The-Almanack-of-Naval-Ravikant_Final.pdf"
    );

    //Embedding Local QNA Pair
    await chat_bot_app.add_local("qna_pair", [
      "Who is Naval Ravikant?",
      "Naval Ravikant is an Indian-American entrepreneur and investor.",
    ]);

    res.status(200).send("Data added successfully!");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
}
