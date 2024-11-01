package controllers

import (
	"backend/src/services"
	"fmt"
	"net/http"
)

type HelloWorldController struct {
	helloWorldService *services.HelloWorldService
}

func NewHelloWorldController() *HelloWorldController {
	return &HelloWorldController{
		helloWorldService: services.NewHelloWorldService(),
	}
}

func (controller *HelloWorldController) Get(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, controller.helloWorldService.Get())
}
