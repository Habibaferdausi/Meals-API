const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerText = "";
  meals.slice(0, 6).forEach((meal) => {
    console.log(meal);

    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");

    mealDiv.innerHTML = `
      <div class="card h-100">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
             <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <button onclick="loadMealDetail2(${meal.idMeal})"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                  Details
              </button>
          </div>
          
      </div>


      `;

    // step-4: appendChild
    mealsContainer.appendChild(mealDiv);
  });
};

const loadMealDetail = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]))
    .catch((error) => {
      console.log(error);
    });
};

// async await
const loadMealDetail2 = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayMealDetails(data.meals[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayMealDetails = (meal) => {
  document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
  const mealsDetails = document.getElementById("mealDetailsBody");
  mealsDetails.innerHTML = `
      <img class="img-fluid" src="${meal.strMealThumb}"> `;

  const category = document.getElementById("mealDetails2");
  category.innerHTML = `<p class="card-text"> <span class = "fw-bold">Category : </span> ${meal.strCategory}</p> `;

  const area = document.getElementById("area");
  area.innerHTML = `<p class="card-text"> <span class = "fw-bold">Area : </span> ${meal.strArea}</p> `;

  const ins = document.getElementById("ins");
  ins.innerHTML = `<p class="card-text"> <span class = "fw-bold">Instructions : </span> ${meal.strInstructions}</p> `;

  const youtube = document.getElementById("youtube");
  youtube.innerHTML = `<p class="card-text"> <span class = "fw-bold">Youtube : </span>  <a href="${meal.strYoutube}" class="stretched-link text-danger">Click to go Youtube</a></p> `;
};

loadMeals("chicken");
