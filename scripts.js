// Retrieve favorite meals from local storage or initialize an empty array
const favoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];

// Function to update the favorite meals list in the DOM
function updateFavoriteMealsList() {
    const favoriteMealsList = document.getElementById('favorite-meals');
    favoriteMealsList.innerHTML = ''; // Clear the list

    favoriteMeals.forEach((meal, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'item';

        const mealInfo = document.createElement('div');
        mealInfo.className = 'item-info';

        const mealTitle = document.createElement('h2');
        mealTitle.className = 'item-title';
        mealTitle.textContent = meal.strMeal;

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = 'Remove from Favorites';

        // Attach a click event to the remove button to remove the meal
        removeButton.addEventListener('click', () => {
            favoriteMeals.splice(index, 1); // Remove the meal from the array
            updateFavoriteMealsList(); // Update the list in the DOM
            saveFavoriteMealsToLocalStorage(); // Save the updated list to local storage
        });

        mealInfo.appendChild(mealTitle);
        listItem.appendChild(mealInfo);
        listItem.appendChild(removeButton);

        favoriteMealsList.appendChild(listItem);
    });
}

// Function to save favorite meals to local storage
function saveFavoriteMealsToLocalStorage() {
    localStorage.setItem('favoriteMeals', JSON.stringify(favoriteMeals));
}

// Initial setup of the favorite meals list
updateFavoriteMealsList();

// You can add your favorite meals to the array like this:
// favoriteMeals.push({ strMeal: 'Your Meal Name' });
// Make sure to call saveFavoriteMealsToLocalStorage() after adding meals to save them.
// ... your existing JavaScript ...

// Function to fetch and display meal items from the API
async function fetchAndDisplayMeals(query) {
    try {
        const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        const meals = data.meals;

        // Clear the previous list of favorite meals
        favoriteMeals.length = 0;
        saveFavoriteMealsToLocalStorage();

        const favoriteMealsList = document.getElementById('favorite-meals');
        favoriteMealsList.innerHTML = ''; // Clear the list

        if (meals) {
            meals.forEach((meal) => {
                // ... Create list items and add them to favoriteMealsList ...
            });
        } else {
            // Handle the case where no meals were found
            favoriteMealsList.innerHTML = '<p>No meals found.</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

// Add a click event listener to the "Search" button
document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    if (query) {
        fetchAndDisplayMeals(query);
    }
});

// ... your existing JavaScript ...
