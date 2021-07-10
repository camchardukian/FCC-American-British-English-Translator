const Translator = require("../components/translator.js");
const translator = new Translator();

const translateController = {
  translateString: (req, res) => {
    const { text, locale } = req.body;
    const validationError = translator.validateTranslationFields({
      text,
      locale
    });
    if (validationError) {
      return res.json(validationError);
    }
    const translation = translator.translate({ text, locale });
    return res.json(translation);
  }
};

module.exports = translateController;
