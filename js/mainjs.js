const searchbtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const mealDetails = document.querySelector(".meal-details");

// event listener
searchbtn.addEventListener("click", getMeallist);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetails.style.display = "none";
});
fetch("https://foodish-api.herokuapp.com/api/")
  .then((res) => res.json())
  .then((data) => console.log(data));
// get meal list that matches the ingredient
function getMeallist() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((responce) => responce.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
          <div class="meal-item" data-id = "${meal.idMeal}">
            <div class="meal-img">
              <img src="${meal.strMealThumb}" alt="food" srcset="" />
            </div>
            <div class="meal-name">
              <h3>${meal.strMeal}</h3>
              <a href="#" class="recipe-btn">Get recipe</a>
            </div>
          </div>`;
        });
      } else {
        html =
          "Sorry, We didn't find any recipe for you! please try another keyword";
      }
      mealList.innerHTML = html;
    });
}

// getMealRecipe
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((responce) => responce.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// modal

function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `<h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="category">meal.strCategory</p>
    <div class="recipe-intruct">
        <h3>Instructions</h3>
         <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="food" srcset="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Watch video</a>
    </div>`;

  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.style.display = "block";
}
