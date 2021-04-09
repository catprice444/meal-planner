const mealsIndex = "http://localhost:3000/meals";
const categoriesIndex = "http://localhost:3000/categories";
const main = document.querySelector("main");
const header = document.querySelector("header");
const newMeal = document.querySelector("#create-meals-form");
const mealView = document.createElement("button");
mealView.innerText = "Meals";
const categoryView = document.createElement("button");
categoryView.innerText = "Categories";



document.addEventListener('DOMContentLoaded', ()=>{
    getCategories()
    // getMeals()
    createMealButton()
    newMeal.addEventListener("submit", (event) => addMeal(event))
    // viewButtons()
})

function viewButtons(){
    header.appendChild(mealView)
    header.appendChild(categoryView)
    mealView.addEventListener("click", () => getMeals())
    categoryView.addEventListener("click", () => getCategories())
}



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
    event.preventDefault()
    let id = event.target.getAttribute("data-category-id");
    let mealId = event.target.getAttribute("data-category")
    let p = event.target.nextElementSibling;
    let h3 = document.createElement("h3")
    // let h4 = document.createElement("h4");
    // if (id === "1"){
        console.log(`${id}`);
        // h4.innerText = `${data.attributes.ingredients}`;
        // p.appendChild(h3)
    // }
    // if (id === "2"){
    //     console.log("Lunch");
    //     // h4.innerText = `${data.attributes.ingredients}`;
    //     // p.appendChild(h3)
    // }
        

}

function getMeals(){
    // let id = event.target.getAttribute("data-category-id");
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

function createMealButton(){
    let button = document.createElement("button");
    button.innerText = "Add a New Meal!";
    const form = document.querySelector('#form-container')
    button.addEventListener("click", function(){
        if (form.style.visibility = 'hidden'){
            form.style.visibility = 'visible';
            button.innerText = "Close Form";
        // } else if (form.style.visibility = 'visible'){ 
        //     form.style.visibility = 'hidden';
        //     button.innerText = "Add a New Meal!";
        } 
    });
    header.append(button);
}

function addMeal(event){ 
    event.preventDefault();
    const inputName = document.querySelector("#input-name").value
    const inputIngredients = document.querySelector("#input-ingredients").value
    const inputCategory = parseInt(document.querySelector("#input-category").value)
    submitForm(inputName, inputIngredients, inputCategory)
}

function submitForm(inputName, inputIngredients, inputCategory){
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
    .then(meal => createNewMeal(meal))
}

function createNewMeal(meal){
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
}

