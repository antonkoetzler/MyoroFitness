package services

type UserService struct{}

func NewUserService() *UserService {
	return &UserService{}
}

func (service *UserService) Create() string {
	return "Create"
}

func (service *UserService) Select() string {
	return "Select"
}

func (service *UserService) Get() string {
	return "Get"
}

func (service *UserService) Update() string {
	return "Update"
}

func (service *UserService) Delete() string {
	return "Delete"
}
