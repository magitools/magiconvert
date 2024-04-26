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

router.get("/", ({ view }) => {
  return view.render("pages/home")
})

router.group(() => {
  router.get('/', [AppsController, 'index']).as('app_index')

}).prefix("/app").middleware(middleware.auth())

router.group(() => {
  router.get("/login", [AuthController, 'login']).as("login")
  router
    .group(() => {
      router.get('/:provider/redirect', [AuthController, 'redirect']).where('provider', /github/).as("auth_redirect")
      router.get('/:provider/callback', [AuthController, 'callback']).where('provider', /github/).as("auth_callback")
    })
    .prefix('/auth')

})


