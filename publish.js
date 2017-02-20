var ghpages = require('gh-pages');

ghpages.publish(path.join(__dirname, 'public'), function(err) {
  if (err) {
    console.log(err);
  }
});