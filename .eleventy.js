const { DateTime } = require('luxon')
const util = require('util')
const { EleventyHtmlBasePlugin } = require('@11ty/eleventy')

module.exports = function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin)

	eleventyConfig.addPassthroughCopy({ 'src/images': 'images' })

	eleventyConfig.addFilter('formatDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
	})

	eleventyConfig.addFilter('console', function (value, level = 2) {
		return util.inspect(value, { depth: level })
	})

	global.filters = eleventyConfig.javascriptFunctions
	eleventyConfig.setPugOptions({
		globals: ['filters', 'console'],
	})

	return {
		dir: {
			input: 'src/pages',
			layouts: '../layouts',
		},
	}
}
