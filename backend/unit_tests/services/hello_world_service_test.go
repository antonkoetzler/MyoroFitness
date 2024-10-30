package tests

import (
	"backend/src/services"
	"testing"
)

func TestHelloWorldService_Get(t *testing.T) {
	service := services.NewHelloWorldService()
	expected := "Hello, World!\n"
	if result := service.Get(); result != expected {
		t.Errorf(
			"[TestHelloWorldService_Get]: Expected \"%s\", got \"%s\".",
			expected,
			result,
		)
	}
}
