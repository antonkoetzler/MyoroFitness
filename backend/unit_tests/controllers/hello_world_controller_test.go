package tests

import (
	"backend/controllers"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestHelloWorldController_Get(t *testing.T) {
	request := httptest.NewRequest("GET", "/", nil)
	responseRecorder := httptest.NewRecorder()

	controllers.NewHelloWorldController().Get(responseRecorder, request)

	expectedBody := "Hello, World!\n"
	if result := responseRecorder.Body.String(); result != expectedBody {
		t.Errorf(
			"[TestHelloWorldController_Get]: Expected\"%s\", got \"%s\".",
			expectedBody,
			result,
		)
	}
	expectedStatusCode := http.StatusOK
	if statusCode := responseRecorder.Code; statusCode != expectedStatusCode {
		t.Errorf(
			"[TestHelloWorldController_Get]: Expected HTTP status %d, got %d.",
			expectedStatusCode,
			statusCode,
		)
	}
}
