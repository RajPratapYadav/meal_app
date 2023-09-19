// Function to get meal data from local storage
function getMealDataFromLocalStorage() {
    const mealData = localStorage.getItem('currentObj');
    return mealData ? JSON.parse(mealData) : null;
}

// Function to display meal details in the HTML template
function displayMealDetails(mealData) {
    if (mealData) {
        // Update meal details in the HTML
        document.querySelector('.meal-name').textContent = mealData.strMeal;
        document.querySelector('.meal-category').textContent = `Category: ${mealData.strCategory}`;
        document.querySelector('.meal-area').textContent = `Area: ${mealData.strArea}`;
        document.querySelector('.meal-instructions').textContent = mealData.strInstructions;
        document.querySelector('.meal-image img').src = mealData.strMealThumb;
       
        // Generate and display the list of ingredients
        const ingredientsList = document.querySelector('.ingredients-list');
        for (let i = 1; i <= 20; i++) {
            const ingredient = mealData[`strIngredient${i}`];
            const measure = mealData[`strMeasure${i}`];

            if (ingredient && measure) {
                const listItem = document.createElement('li');
                listItem.textContent = `${ingredient}: ${measure}`;
                ingredientsList.appendChild(listItem);
            }
        }
    } else {
        // Handle the case where no meal data is found
        document.querySelector('.meal-name').textContent = 'Meal Not Found';
        // You can provide a message or handle it as needed
    }
}

// Load meal data from local storage
const loadedMealData = getMealDataFromLocalStorage();

// Call the function to display meal details
displayMealDetails(loadedMealData);
