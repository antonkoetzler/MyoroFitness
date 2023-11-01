import { createStore } from "redux";

const initialState = {
  darkMode:                 true,
  //
  showFoodSelectionModal:   false,
  showFoodInformationModal: false,
  mealModification:         false, // True: Editing meal, False: Creating meal
  selectedFood:             null,
  meal: { name: null, foods: [], finished: false }, // Meal that is being changed
  //
  showWorkoutEditorModal:   false,
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
    //
    case "SET_SHOW_FOOD_SELECTION_MODAL":
      return { ...state, showFoodSelectionModal: action.payload };
    case "SET_SHOW_FOOD_INFORMATION_MODAL":
      return { ...state, showFoodInformationModal: action.payload };
    case "SET_MEAL_MODIFICATION":
      return { ...state, mealModification: action.payload };
    case "SET_SELECTED_FOOD":
      return { ...state, selectedFood: action.payload };
    case "SET_MEAL_NAME":
      return { ...state, meal: { ...state.meal, name: action.payload } };
    case "ADD_MEAL_FOOD":
      return { ...state, meal: { ...state.meal, foods: [ ...state.meal.foods, action.payload ] } };
    case "SET_MEAL_FOOD":
      return { ...state, meal: { ...state.meal, foods: action.payload } };
    case "SET_MEAL_FINISHED":
      return { ...state, meal: { ...state.meal, finished: action.payload } };
    case "RESET_MEAL":
      return { ...state, meal: { name: null, foods: [], finished: false } };
    //
    case "SET_SHOW_WORKOUT_EDITOR_MODAL":
      return { ...state, showWorkoutEditorModal: action.payload };
    //
    default:
      return state;
  }
}

const Store = createStore(reducer);
export default Store;
