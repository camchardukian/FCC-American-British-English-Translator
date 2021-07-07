const Translator = require("../components/translator.js");
const translator = new Translator();

const translateController = {
  translateString: (req, res) => {
    const { text, locale } = req.body;
    const validationError = translateController.validateTranslationFields({
      text,
      locale
    });
    if (validationError) {
      return res.json(validationError);
    }
    // change the below line to a real value in the next feature.
    return res.json({ ok: "ok" });
  },
  validateTranslationFields: ({ text, locale }) => {
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
};

module.exports = translateController;
