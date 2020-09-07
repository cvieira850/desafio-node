import createConnection from '../infra/bd/postgresql/typeorm/index'
import env from './config/env'

createConnection().then(async () => {
  const app = (await import ('./config/app')).default
  app.listen(5050, () => console.log(`Server running at http://localhost:${env.port}`))
})
  .catch(console.error)
