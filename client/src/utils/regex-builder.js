

let legend = {
	'{user}': /([a-zA-Z0-9_]+)/,
	'{target}': /([a-zA-Z0-9_]+)/,
	'{value}': /([0-9]+)/,
	space: /\s/
};

let build = (data) => {
	let regex = [];

	let split = data.split(' ');

	split.forEach((piece, idx) => {
	    if(idx > 0) {
	       regex.push(legend.space.source);
	    }
	    if(legend[piece]) {
	       regex.push(legend[piece].source);
	    } else {
	       regex.push(escape(piece));
	    }
	});

	return new RegExp(regex.join(''))
};

let escape = (s) => {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export {
	build
}

/*
	- Username of achievement earner
	- Username of target
	- Value
	- Count
*/