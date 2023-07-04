const dotenv = require("dotenv");
dotenv.config();
import { useEffect, useState } from "react";

export default function Home() {
  const [loadingStatus, setLoadingStatus] = useState("");
  const [queryStatus, setQueryStatus] = useState("");
  const [botName, setBotName] = useState("");

  const initializeApp = async () => {
    setLoadingStatus("loading");
    try {
      await fetch("/api/init");
      setLoadingStatus("loaded");
    } catch (error) {
      setLoadingStatus("error");
    }
  };

  useEffect(() => {
    setBotName(process.env.NEXT_PUBLIC_BOT_NAME);
    initializeApp();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setQueryStatus("searching");
    const queryInput = document.getElementById("query");
    const resultTextarea = document.getElementById("result");
    const queryText = queryInput.value;

    try {
      const result = await fetch("/api/query", {
        method: "POST",
        body: JSON.stringify({ queryText }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.text());
      resultTextarea.value = result;
      setQueryStatus("found");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQueryChange = async (e) => {
    e.preventDefault();
    const resultTextarea = document.getElementById("result");
    resultTextarea.value = "";
  };
  return (
    <div className="w-full bg-gray-100 overflow-hidden">
      <div className="flex flex-col min-h-screen justify-center">
        <div className="w-full mx-auto p-4 space-y-4">
          <div className="text-center space-y-3">
            {loadingStatus === "loading" && (
              <div
                href="https://github.com/embedchain/embedchainjs"
                className="text-yellow-600 text-md font-bold pb-2"
              >
                Please wait while we load your data!
              </div>
            )}
            {loadingStatus === "loaded" && (
              <div
                href="https://github.com/embedchain/embedchainjs"
                className="text-green-600 text-md font-bold pb-2"
              >
                Your data has been successfully loaded!
              </div>
            )}
            {loadingStatus === "error" && (
              <div
                href="https://github.com/embedchain/embedchainjs"
                className="text-red-600 text-md font-bold pb-2"
              >
                There was an error while loading your data!
              </div>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black">
              {botName}
            </h2>
          </div>
          <div className="flex flex-col mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%] space-y-4">
            <form onSubmit={handleSubmit} method="POST" className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-center sm:space-x-2 space-y-4 sm:space-y-0">
                <input
                  id="query"
                  name="query"
                  type="text"
                  required=""
                  placeholder="Enter your query"
                  className="block w-full px-5 py-3 text-base text-black placeholder-gray-400 transition duration-500 ease-in-out transform border-2 border-black rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300"
                  onChange={handleQueryChange}
                />

                <button
                  type="submit"
                  className="flex items-center justify-center w-full sm:w-28 md:w-40 px-10 py-4 text-base font-medium text-center text-white transition duration-300 ease-in-out transform bg-black rounded-lg hover:bg-blue-700 focus:outline-none "
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="flex flex-col justify-center">
              {queryStatus === "searching" && (
                <button
                  type="button"
                  disabled=""
                  className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-2 rounded-lg border border-black bg-black px-3 py-2 text-base font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-black disabled:pointer-events-none disabled:opacity-75"
                >
                  <svg className="h-4 w-4 animate-spin" viewBox="3 3 18 18">
                    <path
                      className="fill-gray-600"
                      d="M12 5C8.13401 5 5 8.13401 5 12c0 3.866 3.13401 7 7 7 3.866.0 7-3.134 7-7 0-3.86599-3.134-7-7-7zM3 12c0-4.97056 4.02944-9 9-9 4.9706.0 9 4.02944 9 9 0 4.9706-4.0294 9-9 9-4.97056.0-9-4.0294-9-9z"
                    ></path>
                    <path
                      className="fill-blue-100"
                      d="M16.9497 7.05015c-2.7336-2.73367-7.16578-2.73367-9.89945.0-.39052.39052-1.02369.39052-1.41421.0-.39053-.39053-.39053-1.02369.0-1.41422 3.51472-3.51472 9.21316-3.51472 12.72796.0C18.7545 6.02646 18.7545 6.65962 18.364 7.05015c-.390599999999999.39052-1.0237.39052-1.4143.0z"
                    ></path>
                  </svg>
                  <span>Loading...</span>
                </button>
              )}
              <textarea
                className="block w-full px-5 py-3 mt-2 text-base text-black placeholder-gray-400 transition duration-500 ease-in-out transform border-2 border-black rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300 apearance-none autoexpand"
                id="result"
                type="text"
                name="result"
                placeholder="Result will be displayed here..."
                spellCheck="false"
                rows="10"
              ></textarea>
            </div>
          </div>
        </div>
        <footer className="h-full text-right pr-8 pt-12 sm:pt-28">
          <a
            href="https://embedchain.ai"
            className="text-indigo-400 text-lg font-semibold"
          >
            Powered by embedchain
          </a>
        </footer>
      </div>
    </div>
  );
}
