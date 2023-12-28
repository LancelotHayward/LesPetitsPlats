// Clear Searches
function clearSearch(id) {
    document.getElementById(id).value = ""
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
//Get tags
function isNotDuplicate(tags, new_tag) {
    const new_tag_name = new_tag.name.toLowerCase()
    for (tag of tags) {
        const tag_name = tag.name.toLowerCase()
        if (tag_name == new_tag_name && tag.type == new_tag.type) {
            return false
        }
    }
    return true
}
function createNewTag(tags, type, name) {
    let new_tag = {
        "type": type,
        "name": name,
        "is_selected": false,
        "is_visible": true
    }
    if (isNotDuplicate(tags, new_tag)) {
        tags.push(new_tag)
    }
    return tags
}
function getTagsFromJSON(json) {
    let tags = []
    for (recipe of json) {
        tags = createNewTag(tags, "Appareils", recipe.appliance)
        for (ingredient of recipe.ingredients) {
            tags = createNewTag(tags, "Ingrédients", ingredient.ingredient)
        }
        for (ustensils of recipe.ustensils) {
            tags = createNewTag(tags, "Ustensiles", ustensils)
        }
    }
    return tags
}
function getTagData(type, tag) {
    let tagData = {
        "type": type,
        "name": tag.textContent
    }
    tagData.is_selected = tag.classList.contains("selected")
    tagData.is_visible = tag.classList.contains("visible")
    return tagData
}
function toggleTag(type, tagToToggle) {
    const holder = document.getElementById("tags-" + type)
    const tags = holder.getElementsByClassName("tag")
    let tagList = []
    for (tag of tags) {
        if (tag.textContent == tagToToggle) {
            tag.classList.toggle("selected")
        }
        tagList.push(getTagData(type, tag))
    }
    removeTags(tags)
    tagList.sort((a,b) => b.is_selected - a.is_selected)
    let has_selected_tags = 0
    for (tag of tagList) {
        new_tag = tagConstructor(tag, type)
        if (tag.is_selected) {
            new_tag.setAttribute("data-left", has_selected_tags)
            has_selected_tags++
        }
        else if (has_selected_tags) {
            has_selected_tags = false
            new_tag.classList.add("first-unselected")
        }
        holder.appendChild(new_tag)
    }
}
function removeTags(tags) {
    const length = tags.length
    for (let i = 0; i < length; i++) {
        tags[0].remove()
    }
}
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
function getRecipes(data, filter) {
    return data
}
function displayRecipies(data) {
    const holder = document.getElementsByClassName("card-holder")[0]
    clearRecipes(holder)
    data.forEach(recipe => {
        holder.appendChild(cardConstructor(recipe))
    })
    updateRecipeCount(data.length.toString())
}
function clearRecipes(holder) {
    const existing_recipes = holder.getElementsByTagName("article")
    const length = existing_recipes.length
    for (let i = 0; i < length; i++) {
        existing_recipes[0].remove()
    }
}
//Init
function init() {
    const tags = getTagsFromJSON(recipes)
    document.getElementsByTagName("main")[0].insertBefore(navConstructor(tags), document.getElementById("selected-tags-holder"))
    preventFormDefaults(document.getElementsByTagName("form"))
    createSearchClearers(["search-normal", "search-Ingrédients", "search-Appareils", "search-Ustensiles"], document.getElementsByClassName("button-clear"))
    displayRecipies(recipes)
}
init()