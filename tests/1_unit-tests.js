const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const toBritishLocale = "american-to-british";
const toAmericanLocale = "british-to-american";

const translator = new Translator();

suite("Unit Tests", () => {
  suite("American English to British English unit tests", () => {
    test("#1 -- Translate, 'Mangoes are my favorite fruit.' to British English", done => {
      const result = translator.translate({
        text: "Mangoes are my favorite fruit.",
        locale: toBritishLocale
      });
      assert.equal(
        result.translation,
        'Mangoes are my <span class="highlight">favourite</span> fruit.'
      );
      done();
    });
    test("#2 -- Translate, 'I ate yogurt for breakfast.' to British English", done => {
      const result = translator.translate({
        text: "I ate yogurt for breakfast.",
        locale: toBritishLocale
      });
      assert.equal(
        result.translation,
        'I ate <span class="highlight">yoghurt</span> for breakfast.'
      );
      done();
    });
    test("#3 -- Translate, 'We had a party at my friend's condo.' to British English", done => {
      const result = translator.translate({
        text: "We had a party at my friend's condo.",
        locale: toBritishLocale
      });
      assert.equal(
        result.translation,
        'We had a party at my friend\'s <span class="highlight">flat</span>.'
      );
      done();
    });
    test("#4 -- Translate, 'Can you toss this in the trashcan for me?' to British English", done => {
      const result = translator.translate({
        text: "Can you toss this in the trashcan for me?",
        locale: toBritishLocale
      });
      assert.equal(
        result.translation,
        'Can you toss this in the <span class="highlight">bin</span> for me?'
      );
      done();
    });
    test("#5 -- Translate, 'The parking lot was full.' to British English", done => {
      const result = translator.translate({
        text: "The parking lot was full.",
        locale: toBritishLocale
      });
      assert.equal(result.translation, 'The <span class="highlight">car park</span> was full.');
      done();
    });
    test("#6 -- Translate, 'Like a high tech Rube Goldberg machine.' to British English", done => {
      const result = translator.translate({
        text: "Like a high tech Rube Goldberg machine.",
        locale: toBritishLocale
      });
      assert.equal(
        result.translation,
        'Like a high tech <span class="highlight">Heath Robinson device</span>.'
      );
      done();
    });
    test("#7 -- Translate, 'To play hooky means to skip class or work.' to British English", done => {
      const result = translator.translate({
        text: "To play hooky means to skip class or work.",
        locale: toBritishLocale
      });
      assert.equal(
        result.translation,
        'To <span class="highlight">bunk off</span> means to skip class or work.'
      );
      done();
    });
    test("#8 -- Translate, 'No Mr. Bond, I expect you to die.' to British English", done => {
      const result = translator.translate({
        text: "No Mr. Bond, I expect you to die.",
        locale: toBritishLocale
      });
      assert.equal(
        result.translation,
        'No <span class="highlight">Mr</span> Bond, I expect you to die.'
      );
      done();
    });
    test("#9 -- Translate, 'Dr. Grosh will see you now.' to British English", done => {
      const result = translator.translate({
        text: "Dr. Grosh will see you now.",
        locale: toBritishLocale
      });
      assert.equal(result.translation, '<span class="highlight">Dr</span> Grosh will see you now.');
      done();
    });
    test("#10 -- Translate, 'Lunch is at 12:15 today.' to British English", done => {
      const result = translator.translate({
        text: "Lunch is at 12:15 today.",
        locale: toBritishLocale
      });
      assert.equal(result.translation, 'Lunch is at <span class="highlight">12.15</span> today.');
      done();
    });
  });
  suite("British English to American English unit tests", () => {
    test("#1 -- Translate, 'We watched the footie match for a while.' to American English", done => {
      const result = translator.translate({
        text: "We watched the footie match for a while.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        'We watched the <span class="highlight">soccer</span> match for a while.'
      );
      done();
    });
    test("#2 -- Translate, 'Paracetamol takes up to an hour to work.' to American English", done => {
      const result = translator.translate({
        text: "Paracetamol takes up to an hour to work.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        '<span class="highlight">Tylenol</span> takes up to an hour to work.'
      );
      done();
    });
    test("#3 -- Translate, 'First, caramelise the onions.' to American English", done => {
      const result = translator.translate({
        text: "First, caramelise the onions.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        'First, <span class="highlight">caramelize</span> the onions.'
      );
      done();
    });
    test("#4 -- Translate, 'I spent the bank holiday at the funfair.' to American English", done => {
      const result = translator.translate({
        text: "I spent the bank holiday at the funfair.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
      );
      done();
    });
    test("#5 -- Translate, 'I had a bicky then went to the chippy.' to American English", done => {
      const result = translator.translate({
        text: "I had a bicky then went to the chippy.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
      );
      done();
    });
    test("#6 -- Translate, 'I've just got bits and bobs in my bum bag.' to American English", done => {
      const result = translator.translate({
        text: "I've just got bits and bobs in my bum bag.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.'
      );
      done();
    });
    test("#7 -- Translate, 'The car boot sale at Boxted Airfield was called off.' to American English", done => {
      const result = translator.translate({
        text: "The car boot sale at Boxted Airfield was called off.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.'
      );
      done();
    });
    test("#8 -- Translate, 'Have you met Mrs Kalyani?' to American English", done => {
      const result = translator.translate({
        text: "Have you met Mrs Kalyani?",
        locale: toAmericanLocale
      });
      assert.equal(result.translation, 'Have you met <span class="highlight">Mrs.</span> Kalyani?');
      done();
    });
    test("#9 -- Translate, 'Prof Joyner of King's College, London.' to American English", done => {
      const result = translator.translate({
        text: "Prof Joyner of King's College, London.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        '<span class="highlight">Prof.</span> Joyner of King\'s College, London.'
      );
      done();
    });
    test("#10 -- Translate, 'Tea time is usually around 4 or 4.30.' to American English", done => {
      const result = translator.translate({
        text: "Tea time is usually around 4 or 4.30.",
        locale: toAmericanLocale
      });
      assert.equal(
        result.translation,
        'Tea time is usually around 4 or <span class="highlight">4:30</span>.'
      );
      done();
    });
  });
});
