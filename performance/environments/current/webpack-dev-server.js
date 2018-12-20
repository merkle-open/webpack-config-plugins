// @file
// A small wrapper around the webpack-dev-server which will generate
// CPU profiles
//
const inspector = require('inspector');
const fs = require('fs');

const session = new inspector.Session();
session.connect();

session.post('Profiler.enable', () => {
	session.post('Profiler.start', () => {
		require('./node_modules/.bin/webpack-dev-server');
	});
});

process.on('SIGTERM', () => {
	session.post('Profiler.stop', (err, { profile }) => {
		session.disconnect();

		try {
			fs.mkdirSync('profiles');
		} catch (e) {}

		if (!err) {
			fs.writeFileSync('./profiles/profile-' + new Date().getTime() + '.cpuprofile', JSON.stringify(profile));
			process.exit(0);
		}
		process.exit(1);
	});
});
