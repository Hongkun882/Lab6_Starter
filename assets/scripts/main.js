// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. TODO - Complete the functionality as described in this function
  //           header. It is possible in only a single line, but should
  //           be no more than a few lines.

  return JSON.parse(window.localStorage.getItem('recipes'));

}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  if(!recipes){
    return;
  }
  // A10. TODO - Get a reference to the <main> element
  const ma = document.querySelector('main');

  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>

  for (let st of recipes) {
    let r = document.createElement('recipe-card');
    r.data = {
      "imgSrc": st["imgSrc"],
      "imgAlt": st["imgAlt"],
      "titleLnk": st["titleLnk"],
      "titleTxt": st["titleTxt"],
      "organization": st["organization"],
      "rating": st["rating"],
      "numRatings": st["numRatings"],
      "lengthTime": st["lengthTime"],
      "ingredients": st["ingredients"]
    };
    ma.appendChild(r);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.

  window.localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. TODO - Get a reference to the <form> element

  let form = document.querySelector('form');
  

  // B3. TODO - Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked

  form.addEventListener('submit', function () {


    // Steps B4-B9 will occur inside the event listener from step B3
    // B4. TODO - Create a new FormData object from the <form> element reference above

    const form_data = new FormData(form);

    // B5. TODO - Create an empty object (I'll refer to this object as recipeObject to
    //            make this easier to read), and then extract the keys and corresponding
    //            values from the FormData object and insert them into recipeObject
    let recipeObject = {};

    for (var item of form_data) {

      recipeObject[item[0]] = item[1];

    }
    recipeObject['rating'] = parseInt(recipeObject['rating']);
    recipeObject['numRatings'] = parseInt(recipeObject['numRatings']);
    // B6. TODO - Create a new <recipe-card> element

    var recipe_card = document.createElement('recipe-card');
    // B7. TODO - Add the recipeObject data to <recipe-card> using element.data

    console.log(recipeObject);
    recipe_card.data = recipeObject;

    // B8. TODO - Append this new <recipe-card> to <main>
    var main = document.querySelector('main');

    main.appendChild(recipe_card);
    // B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
    //            then save the recipes array back to localStorage

    var obj_arr = getRecipesFromStorage();
    if (obj_arr){
      obj_arr.push(recipeObject);
      saveRecipesToStorage(obj_arr);
    }

    else{
      var new_arr = [];
      new_arr.push(recipeObject);
      saveRecipesToStorage(new_arr);
    }
    
  })
  // B10. TODO - Get a reference to the "Clear Local Storage" button

  var clear_but = document.querySelector('.danger');
  // B11. TODO - Add a click event listener to clear local storage button
  clear_but.addEventListener('click', function () {

    // Steps B12 & B13 will occur inside the event listener from step B11
    // B12. TODO - Clear the local storage
    window.localStorage.clear();

    // B13. TODO - Delete the contents of <main>
    let main = document.querySelector('main');

    while (main.firstChild){
      main.removeChild(main.firstChild);
    }
    
  })
}
