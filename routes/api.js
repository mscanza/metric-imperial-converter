/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      if (!input) {
        return res.send('invalid number and unit')
      }
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
        if (!initNum && !initUnit) {
          return res.send('invalid number and unit')
        } else if (!initNum) {
          return res.send('invalid number')
        } else if (!initUnit) {
          return res.send('invalid unit')
        }
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: toString})
    });
    
};
