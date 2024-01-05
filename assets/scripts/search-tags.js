function filterRecipesByTags() {
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