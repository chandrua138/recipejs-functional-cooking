// ===============================
// Recipe Data
// ===============================

const recipes = [
    { title: "Spaghetti Carbonara", difficulty: "medium", time: 25 },
    { title: "Grilled Cheese Sandwich", difficulty: "easy", time: 10 },
    { title: "Chicken Biryani", difficulty: "hard", time: 60 },
    { title: "Pancakes", difficulty: "easy", time: 20 },
    { title: "Caesar Salad", difficulty: "easy", time: 15 },
    { title: "Beef Wellington", difficulty: "hard", time: 90 },
    { title: "Tomato Soup", difficulty: "medium", time: 35 },
    { title: "Stir Fry Vegetables", difficulty: "medium", time: 30 }
];

// ===============================
// State Management
// ===============================

let currentFilter = "all";
let currentSort = "none";

// ===============================
// DOM References
// ===============================

const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// ===============================
// Render Function
// ===============================

const renderRecipes = (recipesArray) => {
    recipeContainer.innerHTML = "";

    recipesArray.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Time:</strong> ${recipe.time} mins</p>
        `;

        recipeContainer.appendChild(card);
    });
};

// ===============================
// Pure Filter Functions
// ===============================

const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time < maxTime);
};

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return filterByDifficulty(recipes, filterType);
        case "quick":
            return filterByTime(recipes, 30);
        default:
            return recipes;
    }
};

// ===============================
// Pure Sort Functions
// ===============================

const sortByName = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.time - b.time
    );
};

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes;
    }
};

// ===============================
// Update Display (Main Controller)
// ===============================

const updateDisplay = () => {
    let recipesToDisplay = recipes;

    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    recipesToDisplay = applySort(recipesToDisplay, currentSort);

    renderRecipes(recipesToDisplay);

    console.log(
        `Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};

// ===============================
// Active Button UI Update
// ===============================

const updateActiveButtons = () => {
    filterButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add("active");
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.sort === currentSort) {
            btn.classList.add("active");
        }
    });
};

// ===============================
// Event Handlers
// ===============================

const handleFilterClick = (event) => {
    currentFilter = event.target.dataset.filter;
    updateActiveButtons();
    updateDisplay();
};

const handleSortClick = (event) => {
    currentSort = event.target.dataset.sort;
    updateActiveButtons();
    updateDisplay();
};

// ===============================
// Setup Event Listeners
// ===============================

const setupEventListeners = () => {
    filterButtons.forEach(button =>
        button.addEventListener("click", handleFilterClick)
    );

    sortButtons.forEach(button =>
        button.addEventListener("click", handleSortClick)
    );
};

// ===============================
// Initialization
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    updateDisplay();
});
