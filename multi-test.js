var fs = require('fs');
var system = require('system');
var url = system.args[ 1 ];
var page = require( 'webpage' ).create();

/**
 * Proper error handling
 */
phantom.onError = function( msg, trace ) {
  var msgStack = [ 'PHANTOM ERROR: ' + msg ];
  if ( trace && trace.length ) {
    msgStack.push( 'TRACE:' );
    trace.forEach( function( t ) {
      msgStack.push( ' -> ' + ( t.file || t.sourceURL ) + ': ' + t.line + ( t.function ? ' (in function ' + t.function + ')' : '' ) );
    } );
  }
  console.error( msgStack.join('\n') );
  phantom.exit( 1 );
};



page.open( url, function( status ) {

	if ( status === "success" ) {

		// build log
		var filepath = 'logs/log.txt';
		if ( fs.exists( filepath ) ) { // check for existence
			var out = fs.open( filepath, 'w' ); // OK open
		}
		// need to check for filr
		out.writeLine( 'URL opened ' + url + '\n' );

		console.log( '\n---------------------------------------' );
		console.log( '\nURL opened ' + url );

		/*
		* test for headings
		*/
		var listHeadings = page.evaluate( function() {

			var headings = document.querySelectorAll( 'h1, h2, h3, h4, h5, h6' );
			
			var headingList = [];
			
			for ( var i = 0; i < headings.length; i++ ) {

				headingList.push( headings[ i ].nodeName + ' - ' + headings[ i ].innerHTML );
				//headingList.push( headings[ i ].nodeName  );
				
			}

			return headingList;

		});

		/*
		* test for linked images
		*/
		var linkedImages = page.evaluate( function() {

			var linkedImg = document.querySelectorAll( 'a img' );

			var linkedImageAltText = [];

			for( var i = 0; i < linkedImg.length; i++ ){
      			linkedImageAltText.push( linkedImg[ i ].getAttribute( 'alt' ) );
    		}

			return linkedImageAltText;

		});

	}	

	/* 
	* log results to text file
	*/


	// output haedings
	if ( listHeadings.length > 0 ) {

		out.writeLine('This page has the following headings:\n');

		console.log( '\n-----------------------------------------------' );
		console.log( 'This page has the following ' + listHeadings.length + ' headings:\n' );
		for( var j = 0; j < listHeadings.length; j++ ) {
		    console.log( listHeadings[ j ] );

		    out.writeLine( JSON.stringify( listHeadings[ j ] ));
		 }
		
	} else {
		console.log( 'There are no headings marked up as h1 - h6\n' );
		out.writeLine('There are no headings marked up as h1 - h6\n');
	}

	// output list of linked images
	if ( linkedImages.length > 0 ) {
		console.log( '\n-----------------------------------------------' );
		console.log( 'There are linked images with alt attributes\n' );

		out.writeLine('\n\nThere are linked images with alt attributes\n');

		

			for( var j = 0; j < linkedImages.length; j++ ) {
				// output to console
			    console.log( ( j + 1 ) + ' | ' + linkedImages[ j ] );
			    	
			    out.writeLine( JSON.stringify( ( j + 1 ) + ' | ' + linkedImages[ j ] ));

			 }
			 out.close();
		 
	} else {
		out.writeLine('There are no linked images\n');

		console.log( 'There are no linked images' );
	}

	

	phantom.exit();
	
});