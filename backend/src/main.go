package main

import (
	"backend/src/functions"
	"log"
	"net/http"
)

func main() {
	port := ":8080"
	router := functions.SetupRoutes()
	log.Println("Server is running on port \"" + port + "\".")
	log.Fatal(http.ListenAndServe(port, router))
}
