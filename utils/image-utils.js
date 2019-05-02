const keys = require('../configs/keys');
const Image = require('../models/image-model');

let cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: keys.cloudinary.name,
	api_key: keys.cloudinary.apiKey,
	api_secret: keys.cloudinary.apiSecret
});

let uploadImage = (blob, fileName, channelName, type) => {
	let imagePromise = new Promise((resolve, reject) => {

		Image.findOne({name: fileName, channel: channelName}).then((existingImage) => {
			if(existingImage) {
				console.log('image already exists');
				//Image already exists in the DB
				resolve(existingImage);
			} else {
				//New image
				console.log('new image');
				cloudinary.uploader.upload(blob, (error, result) => {
					if(error) {
						console.log(error);
						reject({
							error: error
						});
					} else {
						console.log('image uploaded successfully')
						new Image({
							name: fileName,
							channel: channelName,
							cloudID: result.public_id,
							url: result.url,
							type: type || 'achievement'
						}).save().then((newImage) => {
							console.log('new image in DB');
							resolve(newImage);

						});		

					}
				});
			}
		});

	});

	return imagePromise;	
}

let destroyImage = (name) => {
	cloudinary.uploader.destroy(name, function(result) { console.log(result) });
}

module.exports = {
	uploadImage
}