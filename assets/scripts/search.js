//HTML
function clearSearch(id) {
    document.getElementById(id).value = ""
    searchRecipe()
}
function preventFormDefaults(forms) {
    for (form of forms) {
        form.addEventListener("click", function(event){
            event.preventDefault()
          });
    }
}
function createSearchClearers(searchIDs, buttons) {
    for (let i = 0; i < searchIDs.length; i++) {
        buttons[i].addEventListener("click", function(){
            clearSearch(searchIDs[i]) })
    }
}
function searchListener(id) {
    let search_bar = document.getElementById(id)
    search_bar.addEventListener('input', function(e){
        if (search_bar.value.length > 2 || search_bar.value.length == 0) {
            searchRecipe()
        }
    })
}
//Tags
function getSelectedTags() {
    return ["Ingrédients", "Ustensiles", "Appareils"].map(type =>
        Array.from(document.getElementById("tags-" + type).getElementsByClassName("tag"))
            .filter(tag => 
                tag.classList.contains("is_selected")
            )
    )
}
function filterRecipesByTags() {
    let selected_tags = getSelectedTags()
    let filtered_recipes = recipes
    for (let type of selected_tags) {
        for (tag of type) {
            filtered_recipes = filtered_recipes.filter(recipe => {
                if (recipe.ingredients.some(element => compareTerms(element.ingredient, tag.textContent))) {
                    return true
                }
                if (recipe.ustensils.some(ustensil => compareTerms(ustensil, tag.textContent))) {
                    return true
                }
                if (compareTerms(recipe.appliance, tag.textContent)) {
                    return true
                }
                return false
            })
        }
    }
    if (filtered_recipes.length == 0) {
        return recipes
    }
    return filtered_recipes
}