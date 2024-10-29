package routes

import (
	"backend/controllers"
	"github.com/gorilla/mux"
)

func HelloWorldRoutes(router *mux.Router) {
	helloWorldController := controllers.NewHelloWorldController()
	router.HandleFunc("/", helloWorldController.Get).Methods("GET")
}
