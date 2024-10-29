package controllers

import (
	"backend/services"
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
	fmt.Fprintf(w, controller.userService.Get())
}
