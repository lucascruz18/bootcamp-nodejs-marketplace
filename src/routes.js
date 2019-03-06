const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const UserController = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionControler')
const AdController = require('./app/controllers/AdController')
const PurchaseController = require('./app/controllers/PurchaseController')
const ApproveController = require('./app/controllers/ApproveController')

const validators = require('./app/validators')

routes.post('/users', validate(validators.User), handle(UserController.store))
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(SessionController.store)
)

routes.use(authMiddleware)

//
// Ads
//
routes.get('/ads', handle(AdController.index))
routes.get('/ads/:id', handle(AdController.show))
routes.post('/ads', validate(validators.Ad), handle(AdController.store))
routes.put('/ads/:id', validate(validators.Ad), handle(AdController.update))
routes.delete('/ads/:id', handle(AdController.destroy))

//
// Purchases
//
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(PurchaseController.store)
)

//
// Approve
//

routes.put('/purchases/:id', handle(ApproveController.update))

module.exports = routes
