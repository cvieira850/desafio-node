import { Router } from 'express'
import { makeCreateClientController } from '../factories/createclient'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/createclient', adaptRoute(makeCreateClientController()))
}
