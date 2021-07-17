const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const toBritishLocale = "american-to-british";
const toAmericanLocale = "british-to-american";

const translator = new Translator();

suite("Unit Tests", () => {
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
    assert.equal(
      result.translation,
      'The <span class="highlight">car park</span> was full.'
    );
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
    assert.equal(
      result.translation,
      '<span class="highlight">Dr</span> Grosh will see you now.'
    );
    done();
  });
  test("#10 -- Translate, 'Lunch is at 12:15 today.' to British English", done => {
    const result = translator.translate({
      text: "Lunch is at 12:15 today.",
      locale: toBritishLocale
    });
    assert.equal(
      result.translation,
      'Lunch is at <span class="highlight">12.15</span> today.'
    );
    done();
  });
});
