/*
* flags possible uses of paragraphs as lists
*/
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

		console.log( '---------------------------------------' );
		console.log( 'URL opened ' + url );

		/*
		* test for paragraphs used to create lists
		* this could be successive paragraphs starting with a bullet
		*/
		var suspectParagraphs = page.evaluate( function() {

			// get the paragraphs with more than one break tag
			var paragraphs = document.querySelectorAll('p');

			// create an
			var suspectParagraphList = [];

			for ( var i = 0; i < paragraphs.length; i++ ) {

				// if paragraph begins with a bullet or a bullet character entity

				// if paragraph has multiple break tags
				
			}

			return headingList;

		});

	}	

	/* 
	* log results
	*/

	// output haedings
	if ( listHeadings.length > 0 ) {
		console.log( 'This page has the following headings:' );
		for( var j = 0; j < listHeadings.length; j++ ) {
		    console.log( ( j + 1 ) + ' | ' + listHeadings[ j ] );
		 }
	} else {
		console.log( 'There are no headings marked up as h1 - h6' );
	}


	phantom.exit();
	
});