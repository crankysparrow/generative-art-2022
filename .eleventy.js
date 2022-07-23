const { DateTime } = require('luxon')

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({ 'src/images': 'images' })

	eleventyConfig.addFilter('formatDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
	})

	global.filters = eleventyConfig.javascriptFunctions
	eleventyConfig.setPugOptions({
		globals: ['filters'],
	})

	return {
		dir: {
			input: 'src/pages',
			layouts: '../layouts',
		},
	}
}
