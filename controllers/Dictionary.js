const FortyTwoWordsService = require("./forty-two-words-service.js");

class Dictionary {
  fortyTwoWords;

  constructor() {
    this.fortyTwoWords = new FortyTwoWordsService();
  }

  async wordExists(word) {
    let { data: res } = await this.fortyTwoWords.definition(word);
    console.log(res);
    if (res.error) {
      console.log(res.error);
      return false;
    } else {
      return true;
    }
  }

  async definitions(word) {
    let { data: res } = await this.fortyTwoWords.definition(word);
    if (res.error) {
      console.log(res.error);
      return undefined;
    } else {
      return res.map((x) => x.text);
    }
  }

  async synonyms(word) {
    let { data: res } = await this.fortyTwoWords.relatedWords(word);
    if (res.error) {
      console.log(res.error);
      return undefined;
    } else {
      let synonyms = res.filter((x) => x.relationshipType == "synonym")[0];
      if (synonyms) {
        return synonyms.words;
      } else {
        return undefined;
      }
    }
  }

  async antonyms(word) {
    let { data: res } = await this.fortyTwoWords.relatedWords(word);
    if (res.error) {
      console.log(res.error);
      return undefined;
    } else {
      let antonyms = res.find((x) => x.relationshipType == "antonym");
      if (antonyms) {
        return antonyms.words;
      } else {
        console.log(`No antonyms available for the word ${word}.\n`);
        return undefined;
      }
    }
  }

  async synonymsAndAntonyms(word) {
    let { data: res } = await this.fortyTwoWords.relatedWords(word);

    let synonyms = res.find((x) => x.relationshipType == "synonym");
    let antonyms = res.filter((x) => x["relationshipType"] == "antonym")[0];
    return {
      synonyms: synonyms ? synonyms.words : undefined,
      antonyms: antonyms ? antonyms.words : undefined,
    };
  }

  async examples(word) {
    let { data: res } = await this.fortyTwoWords.examples(word);
    if (res.error) {
      console.log(res.error);
      return undefined;
    } else {
      return res.examples.map((x) => x.text);
    }
  }

  async randomWord() {
    let { data: res } = await this.fortyTwoWords.randomWord();
    return res.word;
  }
}

module.exports = Dictionary;
