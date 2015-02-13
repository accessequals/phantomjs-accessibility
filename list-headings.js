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
		* test for headings
		*/
		var listHeadings = page.evaluate( function() {

			var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

			var headingList = [];

			for ( var i = 0; i < headings.length; i++ ) {

				headingList.push( headings[i].nodeName + ' - ' + headings[i].innerHTML );
				
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