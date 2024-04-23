import Alpine from 'alpinejs'
window.Alpine = Alpine
Alpine.start()
document.addEventListener("alpine:init", () => {
  console.log("alpine init finished")
})
