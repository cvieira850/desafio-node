import { Router } from 'express'
import { makeLoadClientByIdController } from '../factories/loadclientbyid'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/loadclient/:id', adaptRoute(makeLoadClientByIdController()))
}
