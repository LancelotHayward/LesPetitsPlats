function searchRecipe() {
    const user_input = document.getElementById("search-normal").value
    const result = searchByLoop(user_input)
    displayRecipies(result)
    removeTags(document.getElementsByClassName("tag")) //bug: removes selected tags
    document.getElementsByTagName("nav")[0].remove()
    document.getElementsByTagName("main")[0].insertBefore(navConstructor(getTagsFromJSON(result)), document.getElementById("selected-tags-holder"))
}
function searchByLoop(user_input) {
    const filteredRecipes = filterRecipes()
    let result = []
    for (let recipe of filteredRecipes) {
        if (compareTerms(recipe.name, user_input) || compareTerms(recipe.description, user_input)) {
            result.push(recipe)
            continue
        }
        let found_ingredient = false
        for (let element of recipe.ingredients) {
            if (compareTerms(element.ingredient, user_input)) {
                result.push(recipe)
                found_ingredient = true
                break
            }
        }
        if (!found_ingredient) {
            for (let ustensil of recipe.ustensils) {
                if (compareTerms(ustensil, user_input)) {
                    result.push(recipe)
                    break
                }
            }
        }
    }
    return result
}
function compareTerms(first_term, second_term) {
    return first_term.toLowerCase().includes(second_term.toLowerCase())
}
function filterRecipes() {
    let filtered_recipes = []
    filtered_recipes = filterType("Ingrédients", filtered_recipes)
    if (filtered_recipes.length == 0) {
        filtered_recipes = recipes
    }
    return filtered_recipes
}
function filterType(type, filtered_recipes) {
    const holder = document.getElementById("tags-" + type)
    let selected_tags_elements = holder.getElementsByClassName("selected")
    let selected_tags = []
    for (selected_tag of selected_tags_elements) {
        selected_tags.push(selected_tag.innerText)
    }
    for (recipe of recipes) {
        if (type == "Ingrédients") {
            for (element of recipe.ingredients) {
                if (selected_tags.includes(element.ingredient)) {
                    filtered_recipes.push(recipe)
                }
            }
        }
    }
    return filtered_recipes
}