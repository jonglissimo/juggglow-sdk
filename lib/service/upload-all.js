var RSVP = require('rsvp');

function uploadAll(options) {
  var props = options.props;
  
  var uploadPromises = props.getAll().map(function(prop) {
      return prop.upload({ 
        filePath: options.filePath, 
        filePaths: options.filePaths 
      });
  });

  return RSVP.all(uploadPromises);
}

module.exports = uploadAll;