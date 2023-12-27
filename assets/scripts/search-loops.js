function searchRecipe() {
    const user_input = document.getElementById("search-normal").value
    const result = searchByLoop(user_input)
    displayRecipies(result)
}
function searchByLoop(user_input) {
    let result = []
    for (recipe of recipes) {
        if (compareTerms(recipe.name, user_input)) {
            result.push(recipe)
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
    if (first_term.toLowerCase() == second_term.toLowerCase()) {
        return true
    }
    return false
}