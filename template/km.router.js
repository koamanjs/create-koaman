module.exports = function ({ router, controller, upload }) {
  router.get('/', controller.Home.hello)
}
