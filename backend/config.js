module.exports = {
  'secret': 'supersecret00010001',
  'secretCust': 'supersecret1000001',
};
module.exports.NewGuid = function () { 
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
};

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}