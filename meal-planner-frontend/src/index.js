const mealsIndex = "http://localhost:3000/meals"
const categoriesIndex = "http://localhost:3000/categories"
const main = document.querySelector("main")
const header = document.querySelector("header")
const newMeal = document.querySelector("new-meal-form")



document.addEventListener('DOMContentLoaded', ()=>{
    getMeals()
    
})

function getMeals(){
    fetch(mealsIndex)
    .then(result => result.json())
    .then(meals => {

        meals.data.map(meal => {

            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-id", `${meal.id}`);

            let h2 = document.createElement("h2");
            h2.innerText = `${meal.attributes.name}`;

            let h3 = document.createElement("h3")
            h3.innerText = `${meal.attributes.ingredients}`;
             
            let p = document.createElement("p");
            p.innerText = `${meal.attributes.category.name}`;

            square.append(h2, h3, p);
            main.appendChild(square);

        })
    })
}

function createMealbutton(){
    let button = document.createElement("button");
    button.innerText = "Add a New Meal!";
    button.addEventListener = ("click", (event) => addMeal(event));
    header.append(button);
}

function addMeal(event){ 
    event.preventDefault();
    console.log("Yay")
}

