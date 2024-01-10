// Clear Searches
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
//Get tags
// function isNotDuplicate(tags, new_tag) {
//     const new_tag_name = new_tag.name.toLowerCase()
//     for (tag of tags) {
//         const tag_name = tag.name.toLowerCase()
//         if (tag_name == new_tag_name && tag.type == new_tag.type) {
//             return false
//         }
//     }
//     return true
// }
// function createNewTag(tags, type, name) {
//     let new_tag = {
//         "type": type,
//         "name": name,
//         "is_selected": false,
//         "is_visible": true
//     }
//     if (isNotDuplicate(tags, new_tag)) {
//         tags.push(new_tag)
//     }
//     return tags
// }
// function getTagsFromJSON(json) {
//     let tags = []
//     for (recipe of json) {
//         tags = createNewTag(tags, "Appareils", recipe.appliance)
//         for (ingredient of recipe.ingredients) {
//             tags = createNewTag(tags, "Ingrédients", ingredient.ingredient)
//         }
//         for (ustensils of recipe.ustensils) {
//             tags = createNewTag(tags, "Ustensiles", ustensils)
//         }
//     }
//     return tags
// }
// function getTagData(type, tag) {
//     let tagData = {
//         "type": type,
//         "name": tag.textContent
//     }
//     tagData.is_selected = tag.classList.contains("selected")
//     tagData.is_visible = tag.classList.contains("visible")
//     return tagData
// }
//Toggle tag: Selects tag then replaces all tags with the selected at the top.
// function toggleTag(type, tag) {
//     toggleTagOnNav(type, tag)
//     toggleTagOnSelected(type, tag)
// }
// function toggleTagOnNav(type, tagToToggle) {
//     const holder = document.getElementById("tags-" + type)
//     const tags = holder.getElementsByClassName("tag")
//     let tagList = []
//     for (tag of tags) {
//         if (tag.textContent == tagToToggle) {
//             tag.classList.toggle("selected")
//         }
//         tagList.push(getTagData(type, tag))
//     }
//     removeTags(tags)
//     tagList.sort((a,b) => b.is_selected - a.is_selected)
//     tagsFactory(holder, tagList, type)
// }
// function removeTags(tags) {
//     const length = tags.length
//     for (let i = 0; i < length; i++) {
//         tags[0].remove()
//     }
// }
// function toggleTagOnSelected(type, tagToToggle) {
//     const selected_holder = document.getElementById("selected-tag-holder")
//     let exists = false
//     for (tag of selected_holder.getElementsByClassName("selected-tag")) {
//         if (tag.textContent == tagToToggle) {
//             exists = true
//             tag.remove()
//             break
//         }
//     }
//     if (!exists) {
//         selected_holder.appendChild(selectedTagConstructor(type, tagToToggle))
//     }
// }
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
    const result = searchByLoop(user_input)
    displayRecipies(result)
    hideIrrelevantTags(result)
    // removeTags(document.getElementsByClassName("tag")) //bug: removes selected tags
    // document.getElementsByTagName("nav")[0].remove()
    // document.getElementsByTagName("main")[0].insertBefore(navConstructor(getTagsFromJSON(result)), document.getElementById("selected-tag-holder"))
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