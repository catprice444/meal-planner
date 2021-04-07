const mealsIndex = "http://localhost:3000/meals"
const categoriesIndex = "http://localhost:3000/categories"
const main = document.querySelector("main")


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