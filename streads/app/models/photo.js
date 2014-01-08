var Photo = function () {
	var me = this;

	me.defineProperties({
		title: {
			type: 'string' 
		},
		description: {
			type: 'text'
		},
		location: {
			type: 'string'
		},
		takenAt: {
			type: 'datetime'
		}
	});

	me.adapter = 'mongo';
};

exports.Photo = Photo;

