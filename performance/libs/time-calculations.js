// @file
// Timing utils to help calculating and outputing the measured times
//

function outputTimings(name, timings) {
	console.log('⏰ ' + name, calculateTimings(timings));
}

function calculateTimings(timings) {
	const lowest = timings.reduce((lowest, time) => Math.min(lowest, time), Infinity);
	const highest = timings.reduce((highest, time) => Math.max(highest, time), 0);
	const average = timings.reduce((sum, time) => sum + time, 0) / timings.length;
	const median = getMedian(timings);
	return { lowest, highest, average, median, timings };
}

function getMedian(args) {
	if (!args.length) {
		return 0;
	}
	const numbers = args.slice(0).sort((a, b) => a - b);
	const middle = Math.floor(numbers.length / 2);
	const isEven = numbers.length % 2 === 0;
	return isEven ? (numbers[middle] + numbers[middle - 1]) / 2 : numbers[middle];
}

module.exports = {
	outputTimings,
	calculateTimings,
};
