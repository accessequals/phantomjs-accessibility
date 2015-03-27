var fs = require('fs');
var system = require('system');
var url = system.args[1]; 
var webPage = require('webpage');



var page = webPage.create();

page.open(url, function(status) {
  if (status === "success") {
    
    

    

    page.includeJs('https://code.jquery.com/jquery-2.1.3.min.js', function() {
      if (page.injectJs('do.js')) {

        // build log
        var filepath = 'logs/log.html';
        if ( fs.exists( filepath ) ) { // check for existence of log file
          console.log('file exists');
          var out = fs.open( filepath, 'w' ); // OK open
        }

        var title = page.evaluate(function() {
          return getTitle();
        });
        
        var missingAlts = page.evaluate(function() {
          return missingAlts();
        });

        var paras = page.evaluate(function() {
          return paras();
        });


        console.log('The page is ' + url + '\n');
        console.log(title + '\n');
        console.log(missingAlts);
        console.log('------------------------------------');
        console.log('Page contains');
        console.log(paras + ' paragraph/s');
        // create top of HTML page
        out.writeLine('<!doctype html>\n<html class="no-js" lang="">\n\t<head>\n\t\t<meta charset="utf-8">\n\t\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t\t<title>Phantom Accessibility Test</title>\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1">\n\t\t<link rel="stylesheet" href="../css/screen.css">\n\t</head>\n\t<body>');
        out.writeLine('<h1>Page: ' + url + '</h1>');
        if (missingAlts > 0) {
          out.writeLine('<h2>Alternative text issue: </h2>\n<p>' + missingAlts + ' images have no alternative text.</p>');
        }
        
        out.writeLine('\n\t</body>\n</html>');
        out.close();
        phantom.exit();

      }
    });
    
  }
});