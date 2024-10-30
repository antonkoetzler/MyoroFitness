package controllers

import (
	"backend/src/services"
	"fmt"
	"net/http"
)

type HelloWorldController struct {
	userService *services.HelloWorldService
}

func NewHelloWorldController() *HelloWorldController {
	return &HelloWorldController{
		userService: services.NewHelloWorldService(),
	}
}

func (controller *HelloWorldController) Get(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, controller.userService.Get())
}
