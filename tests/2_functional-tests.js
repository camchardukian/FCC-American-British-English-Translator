const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

const toBritishLocale = "american-to-british";
const toAmericanLocale = "british-to-american";

suite("Functional Tests", () => {
  test("#1 -- Translation with text and locale fields: POST request to /api/translate", done => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "The parking lot was full.", locale: toBritishLocale })
      .end((err, res) => {
        assert.deepEqual(res.body, {
          text: "The parking lot was full.",
          translation: 'The <span class="highlight">car park</span> was full.'
        });
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("#2 -- Translation with text and invalid locale field: POST request to /api/translate", done => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "The parking lot was full.", locale: "invalid localeeeee" })
      .end((err, res) => {
        assert.deepEqual(res.body, {
          error: "Invalid value for locale field"
        });
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("#3 -- Translation with missing text field: POST request to /api/translate", done => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ locale: toBritishLocale })
      .end((err, res) => {
        assert.deepEqual(res.body, {
          error: "Required field(s) missing"
        });
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("#4 -- Translation with missing locale field: POST request to /api/translate", done => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "The parking lot was full." })
      .end((err, res) => {
        assert.deepEqual(res.body, {
          error: "Required field(s) missing"
        });
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("#5 -- Translation with empty text: POST request to /api/translate", done => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "", locale: toAmericanLocale })
      .end((err, res) => {
        assert.deepEqual(res.body, {
          error: "No text to translate"
        });
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  test("#6 -- Translation with text that needs no translation: POST request to /api/translate", done => {
    chai
      .request(server)
      .post("/api/translate")
      .send({ text: "Hello", locale: toAmericanLocale })
      .end((err, res) => {
        assert.deepEqual(res.body, {
          text: "Hello",
          translation: "Everything looks good to me!"
        });
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
