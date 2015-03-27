function getTitle() {
	var title = document.title,
		output = '';
	title = (title === '') ? 'The page has no title' : 'The page title is ' + title;
	return title;
}

function missingAlts() {
	var images = $('img'),
		missing = 0;
		imgLength = images.length;
	images.each(function(index) {
		if ( $(this).attr('alt') === null ) {
			missing++;
		} 
	});

	// missing = ( missing > 0 ) ? missing : 'There are no missing alt attributes'

	return missing;
}

function readMoreLinks() {
	var links = $('a'),
		msg = '';
	links.each(function() {

	});
}

function paras() {
	return $('p').length;
}