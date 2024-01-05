function searchByLoop(user_input) {
    const filteredRecipes = filterRecipesByTags()
    let result = []
    for (let recipe of filteredRecipes) {
        if (compareTerms(recipe.name, user_input) || compareTerms(recipe.description, user_input) || compareTerms(recipe.appliance, user_input)) {
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