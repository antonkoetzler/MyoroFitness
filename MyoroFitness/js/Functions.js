// Either API usage functions or file-wide functions
import { API_KEY } from "./API_KEY.js";

export function searchFoods(query) {
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}&query=${query}`

  return new Promise((resolve, reject) => {
    fetch(url).then(response => response.json()).then((data) => {
      const foods   = data.foods;
      const results = [];

      for(let i = 0; i < foods.length; i++) {
        const json = {
          id:          i,
          name:        foods[i].description,
          brand:       foods[i].brandName ? foods[i].brandName : foods[i].brandOwner,
          serving:     null,
          calories:    null,
          water:       null,
          ingredients: foods[i].ingredients,
          macronutrients: {
            carbohydrate: null,
            fiber:        null,
            protein:      null,
            cholesterol:  null,
            sugars: {
              sugar:        null,
              asparticAcid: null
            },
            fats: {
              fat:      null,
              transFat: null
            }
          },
          vitamins: {
            a:   null,
            b6:  null,
            b12: null,
            c:   null,
            d:   null,
            k:   null
          },
          minerals: {
            calcium:   null,
            iron:      null,
            potassium: null,
            magnesium: null,
            sodium:    null,
            zinc:      null,
            selenium:  null
          }
        };

        // Gathering serving size if there is one
        if(foods[i].servingSize)
          json.serving = Math.floor(foods[i].servingSize) + foods[i].servingSizeUnit.toLowerCase();
        else if(foods[i].finalFoodInputFoods.length > 0)
          json.serving = Math.floor(foods[i].finalFoodInputFoods[0].gramWeight) + 'g';

        // Getting food specifics
        const nutrients = foods[i].foodNutrients;
        for(let o = 0; o < nutrients.length; o++) {
          switch(nutrients[o].nutrientName) {
            case "Energy":
              json.calories                           = nutrients[o].value.toString();
              break;
            case "Water":
              json.water                              = nutrients[o].value + nutrients[o].unitName.toLowerCase();
            case "Carbohydrate, by difference":
              json.macronutrients.carbohydrate        = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Fiber, total dietary":
              json.macronutrients.fiber               = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Protein":
              json.macronutrients.protein             = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Cholesterol":
              json.macronutrients.cholesterol         = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Aspartic acid":
              json.macronutrients.sugars.asparticAcid = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Total lipid (fat)":
              json.macronutrients.fats.fat            = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Fatty acids, total trans":
              json.macronutrients.fats.transFat       = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Vitamin A, IU":
              json.vitamins.a                         = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Vitamin B-6":
              json.vitamins.b6                        = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Vitamin B-12":
              json.vitamins.b12                       = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Vitamin B12, added":
              if(json.vitamins.b12 === null)
                json.vitamins.b12                     = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              else
                json.vitamins.b12                     = Number(json.vitamins.b12) + nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Vitamin C, total ascorbic acid":
              json.vitamins.c                         = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Vitamin D (D2 + D3), International Units":
              json.vitamins.d                         = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Vitamin K (phylloquinone)":
              json.vitamins.k                         = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Calcium, Ca":
              json.minerals.calcium                   = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Iron, Fe":
              json.minerals.iron                      = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Potassium, K":
              json.minerals.potassium                 = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Magnesium, Mg":
              json.minerals.magnesium                 = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Sodium, Na":
              json.minerals.sodium                    = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Zinc, Zn":
              json.minerals.zinc                      = nutrients[o].value + nutrients[o].unitName.toLowerCase();
              break;
            case "Selenium, Se":
              json.minerals.selenium                  = nutrients[o].value + nutrients[o].unitName.toLowerCase();
            default: break;
          }
        }

        results.push(json);
      }

      resolve(results);
    }).catch((error) => { reject(false); });
  });
}

export function getDate() {
  const date  = new Date();
  const year  = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day   = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}
