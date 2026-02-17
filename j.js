const RecipeApp = (function () {

    console.log("RecipeApp initializing...");

    // ===============================
    // Recipe Data (Enhanced)
    // ===============================

    const recipes = [
        {
            id: 1,
            title: "Spaghetti Carbonara",
            difficulty: "medium",
            time: 25,
            ingredients: ["Spaghetti", "Eggs", "Parmesan", "Pancetta", "Black Pepper"],
            steps: [
                "Boil water",
                "Cook spaghetti",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Beat eggs",
                        "Add cheese",
                        "Mix well"
                    ]
                },
                "Combine pasta and sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Grilled Cheese Sandwich",
            difficulty: "easy",
            time: 10,
            ingredients: ["Bread", "Cheese", "Butter"],
            steps: [
                "Butter bread",
                "Place cheese between slices",
                "Grill until golden",
                "Serve warm"
            ]
        },
        {
            id: 3,
            title: "Chicken Biryani",
            difficulty: "hard",
            time: 60,
            ingredients: ["Rice", "Chicken", "Spices", "Onion", "Yogurt"],
            steps: [
                "Marinate chicken",
                {
                    text: "Prepare rice",
                    substeps: [
                        "Boil water",
                        "Add spices",
                        "Cook rice halfway"
                    ]
                },
                "Layer rice and chicken",
                "Cook on low heat",
                "Serve hot"
            ]
        },
        {
            id: 4,
            title: "Pancakes",
            difficulty: "easy",
            time: 20,
            ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Butter"],
            steps: [
                "Mix ingredients",
                "Heat pan",
                "Pour batter",
                "Flip pancake",
                "Serve with syrup"
            ]
        },
        {
            id: 5,
            title: "Caesar Salad",
            difficulty: "easy",
            time: 15,
            ingredients: ["Lettuce", "Croutons", "Parmesan", "Caesar dressing"],
            steps: [
                "Chop lettuce",
                "Add croutons",
                "Add dressing",
                "Mix well",
                "Serve fresh"
            ]
        },
        {
            id: 6,
            title: "Beef Wellington",
            difficulty: "hard",
            time: 90,
            ingredients: ["Beef fillet", "Mushrooms", "Puff pastry", "Egg yolk"],
            steps: [
                "Sear beef",
                {
                    text: "Prepare mushroom duxelles",
                    substeps: [
                        "Chop mushrooms",
                        "Cook until dry",
                        {
                            text: "Season mixture",
                            substeps: [
                                "Add salt",
                                "Add pepper"
                            ]
                        }
                    ]
                },
                "Wrap in pastry",
                "Bake until golden",
                "Rest before slicing"
            ]
        },
        {
            id: 7,
            title: "Tomato Soup",
            difficulty: "medium",
            time: 35,
            ingredients: ["Tomatoes", "Onion", "Garlic", "Cream"],
            steps: [
                "Chop vegetables",
                "Cook vegetables",
                "Blend mixture",
                "Simmer",
                "Add cream and serve"
            ]
        },
        {
            id: 8,
            title: "Stir Fry Vegetables",
            difficulty: "medium",
            time: 30,
            ingredients: ["Mixed vegetables", "Soy sauce", "Garlic", "Oil"],
            steps: [
                "Heat oil",
                "Add garlic",
                "Add vegetables",
                "Stir fry",
                "Add soy sauce and serve"
            ]
        }
    ];

    // ===============================
    // State
    // ===============================

    let currentFilter = "all";
    let currentSort = "none";

    const recipeContainer = document.getElementById("recipe-container");
    const filterButtons = document.querySelectorAll("[data-filter]");
    const sortButtons = document.querySelectorAll("[data-sort]");

    // ===============================
    // Recursive Step Renderer
    // ===============================

    const renderSteps = (steps, level = 0) => {
        let html
