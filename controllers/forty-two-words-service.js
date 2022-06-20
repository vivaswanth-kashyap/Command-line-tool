const config = require("../config");
const axios = require("axios");

class FortyTwoWordsService {
  async randomWord() {
    return await this.get(`/words/randomWord`);
  }

  async definition(word) {
    return await this.get(`/word/${word}/definitions`);
  }

  async examples(word) {
    return await this.get(`/word/${word}/examples`);
  }

  async relatedWords(word) {
    return await this.get(`/word/${word}/relatedWords`);
  }

  async get(apiPath) {
    console.log(config.apiHost + apiPath);
    return axios
      .get(config.apiHost + apiPath, {
        params: {
          api_key: config.apiKey,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

module.exports = FortyTwoWordsService;
