const Helpers = {
  reverseKeyValuePairsInObject: obj => {
    return Object.assign(
      {},
      ...Object.entries(obj).map(([key, value]) => ({ [value]: key }))
    );
  }
};
module.exports = Helpers;
