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
    for (recipe of filteredRecipes) {
        if (compareTerms(recipe.name, user_input) || compareTerms(recipe.description, user_input)) {
            result.push(recipe)
            continue
        }
        for (element of recipe.ingredients) {
            if (compareTerms(element.ingredient, user_input)) {
                result.push(recipe)
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
    return filtered_recipes
}
function filterType(type, filtered_recipes) {
    const holder = document.getElementById("tags-" + type)
    let selected_tags_elements = holder.getElementsByClassName("selected")
    let selected_tags = []
    for (selected_tag of selected_tags_elements) {
        selected_tags.push(selected_tag.innerText)
    }
    console.log(selected_tags)
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