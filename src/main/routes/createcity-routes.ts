import { Router } from 'express'
import { makeCreateCityController } from '../factories/createcity'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/createcity', adaptRoute(makeCreateCityController()))
}
