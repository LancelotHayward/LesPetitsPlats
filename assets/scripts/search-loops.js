function searchRecipe() {
    const user_input = document.getElementById("search-normal").value
    const result = searchByLoop(user_input)
    displayRecipies(result)
    removeTags(document.getElementsByClassName("tag")) //bug: removes selected tags
    document.getElementsByTagName("nav")[0].remove()
    document.getElementsByTagName("main")[0].insertBefore(navConstructor(getTagsFromJSON(result)), document.getElementById("selected-tags-holder"))
}
function searchByLoop(user_input) {
    let result = []
    for (recipe of recipes) {
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