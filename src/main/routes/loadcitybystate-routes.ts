import { Router } from 'express'
import { makeLoadCityByStateController } from '../factories/loadcitybystate'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/loadcitybystate/:state', adaptRoute(makeLoadCityByStateController()))
}
