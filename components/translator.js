const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
let wordsAndTermsToHighlight = [];
const punctuationWhitespaceRegExp = /[,!.?\s]/;
const americanTimeRegExp = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g;
const britishTimeRegExp = /([0-1]?[0-9]|2[0-3])\.[0-5][0-9]/g;
const americanTitleRegExp = /(mr|mrs|ms|mx|dr|prof)\./gi;
const britishTitleRegExp = /(mr|mrs|ms|mx|dr|prof)/gi;

class Translator {
  translate({ text, locale }) {
    wordsAndTermsToHighlight = [];
    const updatedTermsAndSpellingString = this.updateTermsAndSpelling({
      text,
      locale
    });
    const updatedTimeFormatString = this.updateTimeFormat({
      string: updatedTermsAndSpellingString,
      locale
    });
    const updatedTitleString = this.updateTitle({
      text: updatedTimeFormatString,
      locale
    });
    const finalTranslation = this.addHighlightClass({
      text: updatedTitleString
    });
    if (finalTranslation !== text) {
      return { text, translation: finalTranslation };
    }
    return { translation: "Everything looks good to me!" };
  }
  updateTermsAndSpelling({ text, locale }) {
    let currentWord = "";
    let updatedText = text;
    for (let i = 0; i < text.length; i += 1) {
      if (punctuationWhitespaceRegExp.test(text[i])) {
        let replacementWord;
        replacementWord = this.findReplacementWordSpelling({
          currentWord,
          locale
        });
        if (!replacementWord) {
          replacementWord = this.translateRegionalTerms({
            currentWord,
            locale
          });
        }
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
        wordsAndTermsToHighlight.push(replacementWord);
      }
    } else {
      if (this.getKeyByValue(americanToBritishSpelling, currentWord)) {
        replacementWord = this.getKeyByValue(
          americanToBritishSpelling,
          currentWord
        );
        wordsAndTermsToHighlight.push(replacementWord);
      }
    }
    return replacementWord;
  }
  updateTimeFormat({ string, locale }) {
    let updatedTimeStringsArray = [];
    let updatedTranslationString = string;
    if (locale === "american-to-british") {
      const timeStringsArray = string.match(americanTimeRegExp) || [];
      timeStringsArray.forEach(timeString => {
        updatedTimeStringsArray.push(timeString.replace(":", "."));
        updatedTranslationString = updatedTranslationString.replace(":", ".");
      });
    } else {
      const timeStringsArray = string.match(britishTimeRegExp) || [];
      timeStringsArray.forEach(timeString => {
        updatedTimeStringsArray.push(timeString.replace(".", ":"));
        updatedTranslationString = updatedTranslationString.replace(".", ":");
      });
    }
    wordsAndTermsToHighlight = wordsAndTermsToHighlight.concat(
      updatedTimeStringsArray
    );
    return updatedTranslationString;
  }
  updateTitle({ text, locale }) {
    let updatedTitleText = text;
    let titleMatchedArray = [];
    if (locale === "american-to-british") {
      do {
        titleMatchedArray = updatedTitleText.match(americanTitleRegExp);
        if (titleMatchedArray) {
          const replacementTitle = titleMatchedArray[0].substring(
            0,
            titleMatchedArray[0].length - 1
          );
          wordsAndTermsToHighlight.push(replacementTitle);
          updatedTitleText = updatedTitleText.replace(
            titleMatchedArray[0],
            replacementTitle
          );
        }
      } while (titleMatchedArray);
    } else {
      titleMatchedArray = updatedTitleText.match(britishTitleRegExp) || [];
      do {
        if (titleMatchedArray.length) {
          const replacementTitle = `${titleMatchedArray[0]}.`;
          wordsAndTermsToHighlight.push(replacementTitle);
          updatedTitleText = updatedTitleText.replace(
            titleMatchedArray[0],
            replacementTitle
          );
          titleMatchedArray.shift();
        }
      } while (titleMatchedArray.length);
    }
    return updatedTitleText;
  }
  translateRegionalTerms({ currentWord, locale }) {
    let replacementWord = "";
    if (locale === "american-to-british") {
      if (americanOnly[currentWord]) {
        replacementWord = americanOnly[currentWord];
        wordsAndTermsToHighlight.push(replacementWord);
      }
    } else {
      if (britishOnly[currentWord]) {
        replacementWord = britishOnly[currentWord];
        wordsAndTermsToHighlight.push(replacementWord);
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
  addHighlightClass({ text }) {
    let highlightedText = text;
    wordsAndTermsToHighlight.forEach(word => {
      highlightedText = highlightedText.replace(
        word,
        `<span class="highlight">${word}</span>`
      );
    });
    return highlightedText;
  }
}

module.exports = Translator;
