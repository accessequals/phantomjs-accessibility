var system = require('system');
var url = system.args[ 1 ];
var page = require( 'webpage' ).create();

page.open( url, function( status ) {

	if ( status === "success" ) {

		console.log( '---------------------------------------' );
		console.log( 'URL opened ' + url );

		/*
		* test paragraphs which might be acting as headings
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
	* log results
	*/

	// first suspect headings
	if ( linkedImages.length > 0 ) {
		console.log( 'There are linked images with alt attributes' );
		for( var j = 0; j < linkedImages.length; j++ ) {
		    console.log( ( j + 1 ) + ' | ' + linkedImages[ j ] );
		 }
	} else {
		console.log( 'There are no linked images' );
	}


	phantom.exit();
	
});