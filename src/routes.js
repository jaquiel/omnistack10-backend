const express = require('express')
const DeveloperController = require('./controllers/DeveloperController')
const SearchController = require('./controllers/SearchController')
const routes = express.Router()

/**
 * Developers Routes
 */
routes.get('/developers', DeveloperController.index )
routes.post('/developers', DeveloperController.store )
routes.put('/developers/:id', DeveloperController.update)
routes.delete('/developers/:id', DeveloperController.destroy)

/**
 * Search Route
 */

routes.get('/search', SearchController.index )

module.exports = routes