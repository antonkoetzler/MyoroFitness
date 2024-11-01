package routes

import (
	"backend/src/controllers"
	"github.com/gorilla/mux"
)

func UserRoutes(router *mux.Router) {
	userController := controllers.NewUserController()
	router.HandleFunc("/users", userController.Create).Methods("POST")
	router.HandleFunc("/users", userController.Select).Methods("GET")
	router.HandleFunc("/users/{id}", userController.Get).Methods("GET")
	router.HandleFunc("/users/{id}", userController.Update).Methods("PUT")
	router.HandleFunc("/users/{id}", userController.Delete).Methods("DELETE")
}
