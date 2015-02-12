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
		var suspectHeadings = page.evaluate( function() {

			function getStyle( element, cssProperty ) {

				return window.getComputedStyle( element, null ).getPropertyCSSValue( cssProperty ).cssText;
			}

			var paras = document.querySelectorAll('p');

			var shortBold = 0;

			for ( var i = 0; i < paras.length; i++ ) {

				// check that paragraph length < 50 and paragraph paragraph css is 'bold'
				if ( paras[ i ].innerHTML.length < 50 && getStyle( paras[ i ], 'font-weight' ) === 'bold'  ) {

					shortBold = shortBold + 1;
				}
			}

			return shortBold;

		});

	}	

	/* 
	* log results
	*/

	// first suspect headings
	if ( suspectHeadings > 0 ) {
		console.log('Warning WCAG2 Level A, 1.3.1 - page contains short, bold paragraphs which might be acting as headings');
	} else {
		console.log('WCAG2 Level A, 1.3.1 - page contains no short, bold paragraphs which might be acting as headings');
	}


	phantom.exit();
	
});