// Function to get favorites from local storage
function getFavoritesFromLocalStorage() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Function to remove a meal from local storage and the list
function removeFromLocalStorageAndList(mealId) {
    // Remove the meal from local storage
    const favorites = getFavoritesFromLocalStorage();
    const updatedFavorites = favorites.filter((favorite) => favorite.idMeal !== mealId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Remove the meal from the list
    const favoriteMealsList = document.getElementById('favorite-meals');
    const mealElement = document.getElementById(mealId);
    if (mealElement) {
        favoriteMealsList.removeChild(mealElement);
    }
}

// Function to create and append a list item for a favorite meal
function appendFavoriteMealToList(meal) {
    const favoriteMealsList = document.getElementById('favorite-meals');

    // Create a list item for the meal
    const listItem = document.createElement('li');
    listItem.id = meal.idMeal; // Set the ID to meal.idMeal for easy removal
    listItem.className = 'item';

    // Create a button to remove the meal
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';

    // Add a click event listener to remove the meal
    removeButton.addEventListener('click', () => {
        removeFromLocalStorageAndList(meal.idMeal);
    });

    // Create a link to navigate to home.html
    const itemLink = document.createElement('a');
    itemLink.textContent = meal.strMeal;
    itemLink.className = 'item-link';
// ... (previous code)

// Inside the loop that creates list items
listItem.addEventListener('click', () => {
    // Save the clicked object in localStorage
    localStorage.setItem('currentObj', JSON.stringify(meal));

    // Navigate to home.html
    window.location.href = `home.html`;
});

// ... (rest of the code)

    // Append the link and remove button to the list item
    listItem.appendChild(itemLink);
    listItem.appendChild(removeButton);

    // Append the list item to the favorite meals list
    favoriteMealsList.appendChild(listItem);
}

// Load and display favorite meals from local storage
function loadAndDisplayFavoriteMeals() {
    const favorites = getFavoritesFromLocalStorage();
    const favoriteMealsList = document.getElementById('favorite-meals');

    favorites.forEach((meal) => {
        appendFavoriteMealToList(meal);
    });
}

// Call the function to load and display favorite meals
loadAndDisplayFavoriteMeals();
