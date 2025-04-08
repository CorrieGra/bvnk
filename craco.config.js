const path = require('path');

module.exports = {
	webpack: {
		alias: {
			app: path.resolve(__dirname, 'src/app'),
			assets: path.resolve(__dirname, 'src/assets'),
			components: path.resolve(__dirname, 'src/components'),
			features: path.resolve(__dirname, 'src/features'),
			pages: path.resolve(__dirname, 'src/pages'),
			services: path.resolve(__dirname, 'src/services'),
			dto: path.resolve(__dirname, 'src/dto'),
			utils: path.resolve(__dirname, 'src/utils'),
			hooks: path.resolve(__dirname, 'src/hooks'),
		},
	},
};
