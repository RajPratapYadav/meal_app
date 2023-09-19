const itemContainer = document.querySelector('.item-list');
const searchInput = document.getElementById('search-input');
const favoriteMealsButton = document.getElementById('favorite-meals-button');

// Function to fetch data from the API and render it
async function fetchAndRenderItems(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        // Clear the previous content in the container
        itemContainer.innerHTML = '';

        if (data.meals && data.meals.length > 0) {
            data.meals.forEach((meal) => {
                const itemElement = document.createElement('li');
                itemElement.className = 'item';
                itemElement.addEventListener('click', () => {
                    // Save the clicked object in localStorage
                    localStorage.setItem('currentObj', JSON.stringify(meal));
                
                    // Navigate to home.html
                    window.location.href = `home.html`;
                });
                const itemInfo = document.createElement('div');
                itemInfo.className = 'item-info';

                const itemTitle = document.createElement('h2');
                itemTitle.className = 'item-title';
                itemTitle.textContent = meal.strMeal;

                const itemDescription = document.createElement('p');
                itemDescription.className = 'item-description';
                itemDescription.textContent = meal.strArea;

                const favoriteButton = document.createElement('button');
                favoriteButton.className = 'favorite-button';
                favoriteButton.textContent = 'Favorite';

                // Check if the meal is already in local storage
                if (isMealInLocalStorage(meal.idMeal)) { // Use the meal ID as the key
                    favoriteButton.style.display = 'none';
                } else {
                    favoriteButton.addEventListener('click', () => {
                        addToLocalStorage(meal);
                        favoriteButton.style.display = 'none';
                    });
                }

                itemInfo.appendChild(itemTitle);
                itemInfo.appendChild(itemDescription);
                itemElement.appendChild(itemInfo);
                itemElement.appendChild(favoriteButton);

                itemContainer.appendChild(itemElement);
            });
        } else {
            // Handle the case where no items were found
            itemContainer.innerHTML = '<p>No items found.</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

// Function to add a meal to local storage
function addToLocalStorage(meal) {
    const favorites = getFavoritesFromLocalStorage();
    favorites.push(meal);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to retrieve favorite meals from local storage
function getFavoritesFromLocalStorage() {
    const favoritesJSON = localStorage.getItem('favorites');
    return favoritesJSON ? JSON.parse(favoritesJSON) : [];
}

// Function to check if a meal is in local storage
function isMealInLocalStorage(mealId) {
    const favorites = getFavoritesFromLocalStorage();
    return favorites.some((meal) => meal.idMeal === mealId);
}

// Event listener for the "My Favorite Meals" button
favoriteMealsButton.addEventListener('click', () => {
    const favorites = getFavoritesFromLocalStorage();
    console.log('Favorite Meals:', favorites);
});

// Event listener for the search input
searchInput.addEventListener('input', function () {
    const userInput = this.value.trim();
    fetchAndRenderItems(userInput);
});
