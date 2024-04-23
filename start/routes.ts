/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AppsController from '#controllers/apps_controller'
import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'

router.get('/', [AppsController, "index"])

router.group(() => {
  router.get("/:provider/redirect", [AuthController, "redirect"]).where("provider", /github/)
  router.get("/:provider/callback", [AuthController, "callback"]).where("provider", /github/)
}).prefix("/auth")
