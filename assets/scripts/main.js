//Tag Holders
function toggleTagHolder(id) {
    document.getElementById(id).classList.toggle("tags-visible")
}
//Display recipes
function updateRecipeCount(count) {
    document.getElementsByTagName("nav")[0].getElementsByTagName("p")[0].textContent = count + " recettes"
}
function countSelectedTags(tag_holder) {
    return tag_holder.getElementsByClassName("selected").length
}
function displayRecipies(data) {
    const holder = document.getElementsByClassName("card-holder")[0]
    clearRecipes(holder)
    data.forEach(recipe => {
        holder.appendChild(cardConstructor(recipe))
    })
    updateRecipeCount(data.length.toString())
    if (data.length == 0) {
        document.getElementById("no-recipes").classList.remove("no-display")
    }
    else {
        document.getElementById("no-recipes").classList.add("no-display")
    }
}
function clearRecipes(holder) {
    const existing_recipes = holder.getElementsByTagName("article")
    const length = existing_recipes.length
    for (let i = 0; i < length; i++) {
        existing_recipes[0].remove()
    }
}
//Search
function searchRecipe() {
    const user_input = document.getElementById("search-normal").value
    const result = searchByLoops(user_input)
    displayRecipies(result)
    hideIrrelevantTags(result)
}
//Init
function init() {
    const tags = getTagsFromJSON(recipes)
    document.getElementsByTagName("main")[0].insertBefore(navConstructor(), document.getElementById("selected-tag-holder"))
    tagsFactory(tags)
    preventFormDefaults(document.getElementsByTagName("form"))
    createSearchClearers(["search-normal", "search-Ingrédients", "search-Appareils", "search-Ustensiles"], document.getElementsByClassName("button-clear"))
    displayRecipies(recipes)
    searchListener("search-normal")
}
init()