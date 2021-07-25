const americanOnly = require("../components/american-only.js");
const americanToBritishSpelling = require("../components/american-to-british-spelling.js");
const americanToBritishTitles = require("../components/american-to-british-titles.js");
const britishOnly = require("../components/british-only.js");
const Helpers = require("../utils/helpers");
const americanTimeRegExp = /([0-1]?[0-9]|2[0-3]):[0-5][0-9]/g;
const britishTimeRegExp = /([0-1]?[0-9]|2[0-3])\.[0-5][0-9]/g;
const individualWordRegExp = /(\w+([-'])(\w+)?['-]?(\w+))|\w+/g;

class Translator {
  translate({ text, locale }) {
    const translation = this.findAndReplace({ text, locale });
    return { text, translation };
  }

  findAndReplace({ text, locale }) {
    const {
      titleDictionary,
      termsAndSpellingDictionary,
      timeRegex
    } = this.generateAdditionalFindAndReplaceParams(locale);
    const matchedItemsObject = this.matchItems({
      text,
      termsAndSpellingDictionary,
      titleDictionary,
      timeRegex,
      locale
    });
    return this.replaceAndHighlight({ text, matchedItemsObject });
  }

  generateAdditionalFindAndReplaceParams(locale) {
    const isTranslatingToBritish = locale === "american-to-british";
    const titleDictionary = isTranslatingToBritish
      ? americanToBritishTitles
      : Helpers.reverseKeyValuePairsInObject(americanToBritishTitles);
    const termsAndSpellingDictionary = isTranslatingToBritish
      ? { ...americanOnly, ...americanToBritishSpelling }
      : {
          ...britishOnly,
          ...Helpers.reverseKeyValuePairsInObject(americanToBritishSpelling)
        };
    const timeRegex = isTranslatingToBritish ? americanTimeRegExp : britishTimeRegExp;
    return { titleDictionary, termsAndSpellingDictionary, timeRegex };
  }

  matchItems({ text, termsAndSpellingDictionary, titleDictionary, timeRegex, locale }) {
    const lowerCaseText = text.toLowerCase();
    const matchedItemsObject = {};

    Object.entries(titleDictionary).map(([key, value]) => {
      if (lowerCaseText.includes(key)) {
        matchedItemsObject[key] = `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
      }
    });

    const termsWithMultipleWords = Object.fromEntries(
      Object.entries(termsAndSpellingDictionary).filter(([key, value]) => {
        return key.includes(" ");
      })
    );

    Object.entries(termsWithMultipleWords).map(([key, value]) => {
      if (lowerCaseText.includes(key)) {
        matchedItemsObject[key] = value;
      }
    });

    lowerCaseText.match(individualWordRegExp).forEach(word => {
      if (termsAndSpellingDictionary[word]) {
        matchedItemsObject[word] = termsAndSpellingDictionary[word];
      }
    });

    const matchedTimes = lowerCaseText.match(timeRegex);
    if (matchedTimes) {
      matchedTimes.map(timeCharacter => {
        if (locale === "american-to-british") {
          return (matchedItemsObject[timeCharacter] = timeCharacter.replace(":", "."));
        }
        return (matchedItemsObject[timeCharacter] = timeCharacter.replace(".", ":"));
      });
    }

    return matchedItemsObject;
  }

  validateTranslationFields({ text, locale }) {
    if (text === "") {
      return { error: "No text to translate" };
    } else if (!text || !locale) {
      return { error: "Required field(s) missing" };
    } else if (locale !== "american-to-british" && locale !== "british-to-american") {
      return { error: "Invalid value for locale field" };
    }
    return false;
  }

  replaceAndHighlight({ text, matchedItemsObject }) {
    if (Object.keys(matchedItemsObject).length) {
      const matchedItemRegExp = new RegExp(Object.keys(matchedItemsObject).join("|"), "gi");
      return text.replace(matchedItemRegExp, matchedItem => {
        return `<span class="highlight">${matchedItemsObject[matchedItem.toLowerCase()]}</span>`;
      });
    }
    return "Everything looks good to me!";
  }
}

module.exports = Translator;
