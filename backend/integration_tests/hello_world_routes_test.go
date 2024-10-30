package integration_tests

import (
	"backend/src/routes"
	"github.com/gorilla/mux"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHelloWorldRoutes(t *testing.T) {
	router := mux.NewRouter()
	routes.HelloWorldRoutes(router)

	// "/"
	request := httptest.NewRequest("GET", "/", nil)
	responseRecorder := httptest.NewRecorder()
	router.ServeHTTP(responseRecorder, request)
	expectedBody := "Hello, World!\n"
	if result := responseRecorder.Body.String(); result != expectedBody {
		t.Errorf(
			"[TestHelloWorldRoutes./]: Expected \"%s\", got \"%s\".",
			expectedBody,
			result,
		)
	}
	expectedStatusCode := http.StatusOK
	if statusCode := responseRecorder.Code; statusCode != expectedStatusCode {
		t.Errorf(
			"[TestHelloWorldRoutes./]: Expected HTTP status %d, got %d",
			expectedStatusCode,
			statusCode,
		)
	}
}
