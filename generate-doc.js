var resolve = require('json-refs').resolveRefs;
var YAML = require('yaml-js');
var fs = require('fs');
var targetApiFile='generated-api.json'
var sourceApiFile='test.yaml'
var path = require('path')





var root = YAML.load(fs.readFileSync(sourceApiFile).toString());
var options = {
  includeInvalid : true,
  refPostProcessor: function (refDetails, path) {
      console.info(path);
      return refDetails;
  },
//  relativeBase: ".",
  loaderOptions : {
    processContent : function (res, callback) {
      callback(null, YAML.load(res.text));
    }
  }
};
resolve(root, options).then(function (results) {
  fs.writeFileSync(targetApiFile,JSON.stringify(results.resolved, null, 2));
    
});
