import { Router } from 'express'
import { makeDeleteClientController } from '../factories/deleteclient'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.delete('/client/delete/:id', adaptRoute(makeDeleteClientController()))
}
