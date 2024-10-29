package services

type HelloWorldService struct{}

func NewHelloWorldService() *HelloWorldService {
	return &HelloWorldService{}
}

func (service *HelloWorldService) Get() string {
	return "Hello, World!\n"
}
