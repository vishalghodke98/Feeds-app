"use strict";

function includeAllRoutes(app, connection) {
	require('./user-api')(app, connection);
	require('./image-galarry-api')(app, connection);
	require('./post-api')(app, connection);
	require('./create-post-api')(app, connection);
}
module.exports = (app, connection) => {
	includeAllRoutes(app, connection);
};
