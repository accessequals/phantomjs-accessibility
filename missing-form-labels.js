var system = require('system');
var url = system.args[ 1 ];
var page = require( 'webpage' ).create();

page.open( url, function( status ) {

	if ( status === "success" ) {

		console.log( '---------------------------------------' );
		console.log( 'URL opened ' + url );

		/*
		* test for linked images
		*/
		var missingIds = page.evaluate( function() {

			// we don't want submits
			var inputs = document.querySelectorAll( 'select, textarea, input[type="text"], input[type="email"], input[type="number"], input[type="date"], input[type="tel"]' ),
				missingIds = 0,
				label,
				inputId,
				errMessages = [];

			if ( inputs.length > 0 ) {

				for ( var i = 0; i < inputs.length; i++ ) {

					if ( inputs[ i ].getAttribute( 'id' ) === null ) { // no id - therefore even if labelled, no programmatic link
		
						errMessages.push( inputs[ i ].getAttribute( 'name' ) );

					} else { // there is an id, remove the hash

						inputId = inputs[ i ].getAttribute( 'id' ).replace(/^#/, '');
					}
					
					if ( document.querySelector( 'label[for="' + inputId + '"]' ) === undefined ) { // no label

						errMessages.push( inputs[ i ].getAttribute( 'id' ) );
					}
					
				}

			} 
		
			return errMessages;

		});

	}	

	/* 
	* log results
	*/

	// output list of linked images
	if ( missingIds.length > 0) {

		console.log( '\nInputs with the following ids/names do not have labels associated with them:\n');

		for( var j = 0; j < missingIds.length; j++ ) {

		    console.log( ( j + 1 ) + ' | ' + missingIds[ j ] );
		 }
			
	} else {

		console.log( 'No issues with form input labelling' );
	}


	phantom.exit();
	
});