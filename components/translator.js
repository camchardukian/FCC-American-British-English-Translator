const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
const punctuationWhitespaceRegex = /[,!.?\s]/;

class Translator {
  translate({ text, locale }) {
    let updatedSpellingString = this.updateSpelling({ text, locale });
    return { text, translation: updatedSpellingString };
  }
  updateSpelling({ text, locale }) {
    let currentWord = "";
    let updatedText = text;
    for (let i = 0; i < text.length; i += 1) {
      if (punctuationWhitespaceRegex.test(text[i])) {
        const replacementWord = this.findReplacementWordSpelling({
          currentWord,
          locale
        });
        if (replacementWord) {
          updatedText = updatedText.replace(currentWord, replacementWord);
        }
        currentWord = "";
      } else {
        currentWord = currentWord + text[i];
      }
    }
    return updatedText;
  }
  findReplacementWordSpelling({ currentWord, locale }) {
    let replacementWord = "";
    if (locale === "american-to-british") {
      if (americanToBritishSpelling[currentWord]) {
        replacementWord = americanToBritishSpelling[currentWord];
      }
    } else {
      if (this.getKeyByValue(americanToBritishSpelling, currentWord)) {
        replacementWord = this.getKeyByValue(
          americanToBritishSpelling,
          currentWord
        );
      }
    }
    return replacementWord;
  }
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  validateTranslationFields({ text, locale }) {
    if (text === "") {
      return { error: "No text to translate" };
    } else if (!text || !locale) {
      return { error: "Required field(s) missing" };
    } else if (
      locale !== "american-to-british" &&
      locale !== "british-to-american"
    ) {
      return { error: "Invalid value for locale field" };
    }
    return false;
  }
}

module.exports = Translator;
