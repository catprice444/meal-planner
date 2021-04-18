class Meal {
    constructor(meal, mealAttributes){
        this.id = meal.id
        this.name = mealAttributes.name 
        this.ingredients = mealAttributes.ingredients
        this.category = mealAttributes.category
        Meal.all.push(this);
    }  

    renderMeals(){
        return `
           <div class= "list" id= ${this.id}>
                <h2 class= "meal name"> ${this.name} </h2>
                <h3 class= "meal ingredients"> ${this.ingredients} </h3>
                <p class= "category"> ${this.category.name} </p>
           </div>
        `
    }
    
}
Meal.all = []; 