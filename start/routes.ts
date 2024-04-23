/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AppsController = () => import('#controllers/apps_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.group(() => {
  router.get('/', [AppsController, 'index'])
})

router
  .group(() => {
    router.get('/:provider/redirect', [AuthController, 'redirect']).where('provider', /github/)
    router.get('/:provider/callback', [AuthController, 'callback']).where('provider', /github/)
  })
  .prefix('/auth')
