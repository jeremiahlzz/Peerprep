const { runCode } = require("../controllers/runCode");
const { allSupportedLanguages } = require("../controllers/dockerConfig");

exports.handleSocketConnection = async (socket) => {
  socket.on('get_available_languages', (callback) => {
    callback(allSupportedLanguages);
  });

  socket.on('run_code', (language, code, callback) => {
    (async () => {
      try {
        const output = await runCode(language, code);
        callback({
          status: "Accepted",
          output: output,
          error: null,
          executionTime: 0,
          memoryUsed: 0,
        });
      } catch (err) {
        console.error('Execution error:', err);
        callback({
          status: "error",
          error: err || "Code execution failed",
          output: "",
          executionTime: 0,
          memoryUsed: 0,
        });
      }
    })();
  });
};
