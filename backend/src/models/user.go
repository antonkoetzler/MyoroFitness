package models

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func NewUser(id int, name string, email string, password string) User {
	return User{
		ID:       id,
		Name:     name,
		Email:    email,
		Password: password,
	}
}
