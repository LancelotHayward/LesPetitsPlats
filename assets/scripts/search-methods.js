function searchByMethods(user_input) {
    let tagged_recipes = filterRecipesByTags()
    return tagged_recipes.filter(recipe =>
        compareTerms(recipe.name, user_input) ||
        compareTerms(recipe.description, user_input) ||
        compareTerms(recipe.appliance, user_input) ||
        containsIngredient(recipe.ingredients, user_input) ||
        usesUstensil(recipe.ustensils, user_input)
    )
}
function compareTerms(first_term, second_term) {
    return first_term.toLowerCase().includes(second_term.toLowerCase())
}
function containsIngredient(ingredients, user_input) {
    return ingredients.filter(element =>
        compareTerms(element.ingredient, user_input)
    ).length
}
function usesUstensil(ustensils, user_input) {
    return ustensils.filter(ustensil =>
        compareTerms(ustensil, user_input)
    ).length
}