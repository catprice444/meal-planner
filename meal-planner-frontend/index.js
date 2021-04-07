const mealsIndex = "http://localhost:3000/meals"

document.addEventListener('DOMContentLoaded', ()=>{
    fetch(mealsIndex)
    .then(result => result.json())
    .then(meals => {
        console.log(meals);
    })
})