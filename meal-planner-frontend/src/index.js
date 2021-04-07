const mealsIndex = "http://localhost:3000/meals";
const categoriesIndex = "http://localhost:3000/categories";
const main = document.querySelector("main");
const header = document.querySelector("header");
const newMeal = document.querySelector("#create-meals-form");



document.addEventListener('DOMContentLoaded', ()=>{
    getCategories()
    // getMeals()
    // createMealButton()
    newMeal.addEventListener("submit", (event) => addMeal(event))
})

function getCategories(){
    fetch(categoriesIndex)
    .then(result => result.json())
    .then(categories => {

        categories.data.map(cat =>{
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-id", `${cat.id}`);
            
            let h2 = document.createElement("h2");
            h2.innerText = `${cat.attributes.name}`;

            let button = document.createElement("button");
            button.innerText = "View this category";
            button.setAttribute("data-category-id", `${cat.id}`);
            button.addEventListener("click", (event) => getMealsInCategory(event));

            square.append(h2, button);
            main.appendChild(square);
        })
    })
}

function getMealsInCategory(event){
    let id = event.target.getAttribute("data-category-id");
    let h3 = event.target.nextElementSibling;
    let ul = document.createElement("ul")
    let li = document.createElement("li");
    let addData = function addData(data){
        ul.innerText = `${data.attributes.name}`;
        li.innerText = `${data.attributes.ingredients}`;
        ul.appendChild(li)
        h3.appendChild(ul)
    }

    fetch(mealsIndex, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify(
            category_id: `${id}`
        )
        .then(result => result.json())
        .then(data => addData(data))
    })
}

function getMeals(event){
    let id = event.target.getAttribute("data-category-id");
    fetch(mealsIndex)
    .then(result => result.json())
    .then(meals => {
        if (id === meals.data.attributes.category_id){
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
    }
    })
}

// function createMealButton(){
//     let button = document.createElement("button");
//     button.innerText = "Add a New Meal!";
//     button.addEventListener = ("click", (event) => addMeal(event));
//     header.append(button);
// }

function addMeal(event){ 
    event.preventDefault();
    const inputName = document.querySelector("#input-name").value
    const inputIngredients = document.querySelector("#input-ingredients").value
    const inputCategory = parseInt(document.querySelector("#input-category").value)
    createMeal(inputName, inputIngredients, inputCategory)
}

function createMeal(inputName, inputIngredients, inputCategory){
    fetch(mealsIndex, {
        method: "POST", 
        headers: {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        },
        body: JSON.stringify({
            name: inputName,
            ingredients: inputIngredients,
            category_id: inputCategory
        })
    })
    .then(result => result.json())
    .then(meal => {

            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("data-id", `${meal.id}`);

            let h2 = document.createElement("h2");
            h2.innerText = `${meal.data.attributes.name}`;

            let h3 = document.createElement("h3")
            h3.innerText = `${meal.data.attributes.ingredients}`;
             
            let p = document.createElement("p");
            p.innerText = `${meal.data.attributes.category.name}`;

            square.append(h2, h3, p);
            main.appendChild(square);
            document.getElementById('input-name').value="";
            document.getElementById('input-ingredients').value="";
            document.getElementById('input-category').value="";
    })
    
}

