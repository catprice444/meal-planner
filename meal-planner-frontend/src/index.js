const mealsIndex = "http://localhost:3000/meals";
const categoriesIndex = "http://localhost:3000/categories";
const categoryDiv = document.querySelector("#category-view");
const mealDiv = document.querySelector("#meal-view")
const header = document.querySelector("header");
const newMeal = document.querySelector("#create-meals-form");
const mealView = document.querySelector("#meal-list");
const categoryView = document.querySelector("#category-list");
const buttonSection = document.querySelector("#button-section")


document.addEventListener('DOMContentLoaded', ()=>{
    getCategories()
    categoryDiv.style.display = "none"

    getMeals()
    mealDiv.style.display = "none"
    
    createMealButton()
    newMeal.addEventListener("submit", (event) => addMeal(event))
    viewButtons()
})

function viewButtons(){
    buttonSection.appendChild(mealView)
    buttonSection.appendChild(categoryView)
    
    mealView.addEventListener("click", () => {
        if(mealDiv.style.display === "none"){
            mealDiv.style.display = "grid"
        } else {
            mealDiv.style.display = "none"
        } 
        categoryDiv.style.display = "none"
    })

    categoryView.addEventListener("click", () => {
        if(categoryDiv.style.display === "none"){
            categoryDiv.style.display = "grid"
        } else{
            categoryDiv.style.display = "none"
        } 
        mealDiv.style.display = "none"
    })
}

function getCategories(){
    fetch(categoriesIndex)
    .then(result => result.json())
    .then(categories => {

        categories.data.map(cat =>{
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", `${cat.id}`);
            
            let h2 = document.createElement("h2");
            h2.innerText = `${cat.attributes.name}:`;

            let button = document.createElement("button");
            button.innerText = "View Meals";
            button.setAttribute("data-category-id", `${cat.id}`);
            
            let section = document.createElement("div")
            section.style.visibility = "hidden";

            square.append(h2, button, section);
            categoryDiv.appendChild(square);

            cat.attributes.meals.forEach(meal => {
                
                let mealsInCategory = document.createElement("p");
                mealsInCategory.classList = "category-meals";
                mealsInCategory.id = `${meal.category_id}`;
            
                let mealNameInCategory = document.createElement("h4");
                mealNameInCategory.innerText = `${meal.name}`;

                let mealIngredientsInCategory = document.createElement("li");
                mealIngredientsInCategory.innerText = `${meal.ingredients}`;

                mealsInCategory.append(mealNameInCategory, mealIngredientsInCategory);
                section.append(mealsInCategory)

                button.addEventListener("click", () => {
                    if(section.style.visibility === "hidden"){
                        section.style.visibility = "visible"
                    } else {
                        section.style.visibility = "hidden"
                    }
                });
            })
        })
    })
}

function getMeals(){
    fetch(mealsIndex)
    .then(result => result.json())
    .then(meals => {
        
        meals.data.map(meal => {
            let list = document.createElement("div");
            list.classList.add("list");
            list.setAttribute("id", `${meal.id}`);

            let h2 = document.createElement("h2");
            h2.innerText = `${meal.attributes.name}`;

            let h3 = document.createElement("h3")
            h3.innerText = `${meal.attributes.ingredients}`;
             
            let p = document.createElement("p");
            p.innerText = `${meal.attributes.category.name}`;

            list.append(h2, h3, p);
            mealDiv.appendChild(list);
        
        })
    })
}

function createMealButton(){
    let button = document.createElement("button");
    button.innerText = "Add a New Meal!";
    const form = document.querySelector('#form-container')
    form.style.visibility = "hidden"
    button.addEventListener("click", () => {
        if (form.style.visibility === "hidden"){
            form.style.visibility = "visible";
            button.innerText = "Close Form";
        } else { 
            form.style.visibility = "hidden";
            button.innerText = "Add a New Meal!";
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
    document.getElementById('input-name').value="";
    document.getElementById('input-ingredients').value="";
    document.getElementById('input-category').value="";
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
    let list = document.createElement("div");
    list.classList.add("list");
    list.setAttribute("id", `${meal.id}`);

    let h2 = document.createElement("h2");
    h2.innerText = `${meal.data.attributes.name}`;

    let h3 = document.createElement("h3")
    h3.innerText = `${meal.data.attributes.ingredients}`;
             
    let p = document.createElement("p");
    p.innerText = `${meal.data.attributes.category.name}`;

    list.append(h2, h3, p);
    mealDiv.appendChild(list);

    let categoryP = document.createElement("p");
    categoryP.classList = "category-meals";
    categoryP.id = `${meal.data.attributes.category_id}`;
    categoryP.style.visibility = "hidden";

    let h4 = document.createElement("h4");
    h4.innerText = `${meal.data.attributes.name}`;

    let li = document.createElement("li");
    li.innerText = `${meal.data.attributes.ingredients}`;

    categoryP.append(h4, li);

    let divSquares = document.querySelectorAll("div.square");

    let breakfast = divSquares[0];
    let lunch = divSquares[1];
    let dinner = divSquares[2];
    let snacks = divSquares[3];
    let drinks = divSquares[4];

    if(p.innerText === "Breakfast"){
        breakfast.appendChild(categoryP);
            // if(breakfast.children[2].style.visibility === "visible"){
            //     categoryP.style.visibility = "visible";
            // }

    } else if(p.innerText === "Lunch"){
        lunch.appendChild(categoryP);
        // if (lunch.children[2].style.visibility === "visible"){
        //     categoryP.style.visibility = "visible";
        // }

    } else if(p.innerText === "Dinner"){
        dinner.appendChild(categoryP);
        // if(dinner.children[2].style.visibility === "visible"){
        //     categoryP.style.visibility = "visible";
        // }

    } else if(p.innerText === "Snacks"){
        snacks.appendChild(categoryP);
        // if(snacks.children[2].style.visibility === "visible"){
        //     categoryP.style.visibility = "visible";
        // }

    } else {
        drinks.appendChild(categoryP);
        // if(drinks.children[2].style.visibility === "visible"){
        //     categoryP.style.visibility = "visible";
        // }
    }
    

    
}




