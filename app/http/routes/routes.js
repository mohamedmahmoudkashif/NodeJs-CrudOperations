'use strict';

const authRoutes = require('@http/routes/auth');


module.exports = (restify, server) => {
	authRoutes.applyRoutes(server);

	// ======= Heartbeat route ==========
	/**
	 * @author Mohamed Kashif
	 * @description API endpoint to check the health of the service
	 */
	server.get('/heartbeat', (req, res) => {
		var status = {
			success: true,
			address: server.address().address,
			port: server.address().port,
			statusCode: res.statusCode
		}
		if (res.statusCode != 200) return res.json(503, "Service is unavialable");
		res.send(status);
	});
	// ======= End of heartbeat =========
}
