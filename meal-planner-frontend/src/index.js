const mealsIndex = "http://localhost:3000/meals"
const categoriesIndex = "http://localhost:3000/categories"
const main = document.querySelector("main")
const header = document.querySelector("header")

document.addEventListener('DOMContentLoaded', ()=>{
    getMeals()
    createMealbutton()
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
    let inputName = document.createElement("text")
    inputName.value
    header.append(inputName)
}

{/* <form id="create-meals-form">
            <h3>Create a New Meal!</h3>

            <input id="input-name" type="text" name="name" value="" placeholder="Enter your meal name" class="input-name">
            <textarea id="input-ingredients" name="ingredients" value="" placeholder="Enter the ingredients needed to make the meal"></textarea>
            <select id="input-category" name="categories">
                <option value="category1">Breakfast</option>
                <option value="category2">Lunch</option>
                <option value="category3">Dinner</option>
                <option value="category4">Snacks</option>
                <option value="category5">Drinks</option>
            </select>
            <input id= "create-button" type="submit" name="submit" value="Create New Meal" class="submit">

        </form> */}