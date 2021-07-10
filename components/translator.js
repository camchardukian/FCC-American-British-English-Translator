const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
  translate({ text, locale }) {
    const punctuationWhitespaceRegex = /[,!.?\s]/;
    let punctuationToAddBackArray = [];
    for (let i = 0; i < text.length; i += 1) {
      if (
        text[i] &&
        text[i].trim() &&
        punctuationWhitespaceRegex.test(text[i])
      ) {
        punctuationToAddBackArray.push(text[i]);
      }
    }
    const textArray = text.split(punctuationWhitespaceRegex);
    let updatedSpellingArray = this.updateSpelling({ textArray, locale });
    let translationArray = punctuationToAddBackArray.length
      ? this.addBackPunctuation({
          textArray: updatedSpellingArray,
          punctuationToAddBackArray
        })
      : updatedSpellingArray;
    const result = translationArray.join(" ");
    // In the next PR simplify the entire translate feature and figure out how to solve the extra spacing around punctuation mark bug.
    return { text, translation: result };
  }
  updateSpelling({ textArray, locale }) {
    let updatedSpellingArray = textArray;
    if (locale === "american-to-british") {
      textArray.forEach((word, index) => {
        if (americanToBritishSpelling[word]) {
          updatedSpellingArray[index] = americanToBritishSpelling[word];
        }
      });
    } else if (locale === "british-to-american") {
      textArray.forEach((word, index) => {
        if (this.getKeyByValue(americanToBritishSpelling, word)) {
          updatedSpellingArray[index] = this.getKeyByValue(
            americanToBritishSpelling,
            word
          );
        }
      });
    }
    return updatedSpellingArray;
  }
  addBackPunctuation({ textArray, punctuationToAddBackArray }) {
    let itemIndexToInsertIntoTranslationArray = 0;
    let updatedTextArray = textArray;
    while (
      itemIndexToInsertIntoTranslationArray < punctuationToAddBackArray.length
    ) {
      for (let i = 0; i < textArray.length; i += 1) {
        if (!textArray[i]) {
          updatedTextArray[i] =
            punctuationToAddBackArray[itemIndexToInsertIntoTranslationArray];
          itemIndexToInsertIntoTranslationArray += 1;
        }
      }
    }
    return updatedTextArray;
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
