package services

import "backend/src/models"

type HelloWorldService struct{}

func NewHelloWorldService() *HelloWorldService {
	return &HelloWorldService{}
}

func (service *HelloWorldService) Get() string {
	return models.NewHelloWorld().Text
}
