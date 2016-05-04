var request = require('request');
var async = require("async");
var fs = require('fs');

// http://support.averta.net/envato/knowledgebase/find-facebook-album-id/
var fbAlbumId = '';
// Get access_token from https://developers.facebook.com/tools/explorer
var fbAccessToken = '';

var fbGraphUrl = 'https://graph.facebook.com/v2.3/'
  + fbAlbumId + '/photos?access_token='
  + fbAccessToken + '&format=json&limit=100';

request(fbGraphUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var json = JSON.parse(body);
    async.each(json.data, function(item, err){
        var imageUrl = item.images[0].source.replace("https", "http");
        request(imageUrl).pipe(fs.createWriteStream(Date.now() + '.jpg'));
    });
  }
});
