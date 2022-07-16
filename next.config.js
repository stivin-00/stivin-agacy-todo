const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        DB_URL:
          "mongodb+srv://stivin:vivian1234@eflix.xlz50.mongodb.net/todo?retryWrites=true&w=majority",
      },
    };
  }

  return {
    env: {
      DB_URL:
        "mongodb+srv://stivin:vivian1234@eflix.xlz50.mongodb.net/todo?retryWrites=true&w=majority",
    },
  };
};
