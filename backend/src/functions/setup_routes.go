package functions

import (
	"backend/src/routes"
	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()
	routes.HelloWorldRoutes(router)
	return router
}
