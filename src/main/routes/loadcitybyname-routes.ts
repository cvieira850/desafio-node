import { Router } from 'express'
import { makeLoadCityByNameController } from '../factories/loadcitybyname'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.get('/loadcitybyname/:name', adaptRoute(makeLoadCityByNameController()))
}
