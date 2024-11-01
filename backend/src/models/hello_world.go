package models

type HelloWorld struct {
	Text string
}

func NewHelloWorld() HelloWorld {
	return HelloWorld{
		Text: "Hello, World!\n",
	}
}
