import { Router } from 'express'
import { makeChangeClientNameController } from '../factories/changeclientname'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.put('/changeclientname/:id', adaptRoute(makeChangeClientNameController()))
}
