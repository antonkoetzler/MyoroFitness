package controllers

import (
	"backend/src/services"
	"fmt"
	"net/http"
)

type UserController struct {
	userService *services.UserService
}

func NewUserController() *UserController {
	return &UserController{
		userService: services.NewUserService(),
	}
}

func (controller *UserController) Create(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, controller.userService.Get())
}

func (controller *UserController) Select(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, controller.userService.Get())
}

func (controller *UserController) Get(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, controller.userService.Get())
}

func (controller *UserController) Update(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, controller.userService.Get())
}

func (controller *UserController) Delete(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, controller.userService.Delete())
}
