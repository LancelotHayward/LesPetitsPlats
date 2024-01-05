// function filterRecipesByTags() {
//     let filtered_recipes = []
//     filtered_recipes = filterType("Ingrédients", filtered_recipes)
//     if (filtered_recipes.length == 0) {
//         filtered_recipes = recipes
//     }
//     return filtered_recipes
// }
// function filterType(type, filtered_recipes) {
//     const holder = document.getElementById("tags-" + type)
//     let selected_tags_elements = holder.getElementsByClassName("selected")
//     let selected_tags = []
//     for (let selected_tag of selected_tags_elements) {
//         selected_tags.push(selected_tag.innerText)
//     }
//     for (let recipe of recipes) {
//         if (type == "Ingrédients") {
//             for (let element of recipe.ingredients) {
//                 if (selected_tags.includes(element.ingredient)) {
//                     filtered_recipes.push(recipe)
//                 }
//             }
//         }
//     }
//     return filtered_recipes
// }
function getSelectedTags() {
    return ["Ingrédients", "Ustensiles", "Appareils"].map(type =>
        Array.from(document.getElementById("tags-" + type).getElementsByClassName("tag"))
            .filter(tag => 
                tag.classList.contains("is_selected")
            )
    )
}
//Search tags
function filterRecipesByTags() {
    let selected_tags = getSelectedTags()
    let filtered_recipes = recipes.filter(recipe => {
        for (let type of selected_tags) {
            for (tag of type) {
                if (recipe.ingredients.some(element =>
                    compareTerms(element.ingredient, tag.textContent)
                )) {
                    return true
                }
                return false
            }
        }
    })
    if (filtered_recipes.length == 0) {
        return recipes
    }
    return filtered_recipes
}