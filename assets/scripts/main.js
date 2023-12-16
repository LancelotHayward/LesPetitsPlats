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
function getTagsFromJSON(json) {
    let tags = []
    for (recipe of json) {
        if (recipe.ingredients) {
            for (ingredient of recipe.ingredients) {
                let new_tag = {
                    "type": "Ingrédients",
                    "name": ingredient.ingredient,
                    "is_selected": false,
                    "is_visible": true
                }
                if (notDuplicate(tags, new_tag)) {
                    tags.push(new_tag)
                }
            }
        }
        if (recipe.appliance) {
            let new_tag = {
                "type": "Appareils",
                "name": recipe.appliance,
                "is_selected": false,
                "is_visible": true
            }
            if (notDuplicate(tags, new_tag)) {
                tags.push(new_tag)
            }
        }
        if (recipe.ustensils) {
            for (ustensils of recipe.ustensils) {
                let new_tag = {
                    "type": "Ustensiles",
                    "name": ustensils,
                    "is_selected": false,
                    "is_visible": true
                }
                if (notDuplicate(tags, new_tag)) {
                    tags.push(new_tag)
                }
            }
        }
    }
    return tags
}
function notDuplicate(tags, new_tag) {
    const new_tag_name = new_tag.name.toLowerCase()
    for (tag of tags) {
        const tag_name = tag.name.toLowerCase()
        if (tag_name == new_tag_name && tag.type == new_tag.type) {
            return false
        }
    }
    return true
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
    //Remove existing DOM elements (using traditional for loop because removing inside for (x of y) loops is cursed)
    const length = tags.length
    for (let i = 0; i < length; i++) {
        tags[0].remove()
    }
    tagList.sort((a,b) => b.is_selected - a.is_selected)
    for (tag of tagList) {
        holder.appendChild(tagConstructor(type, tag))
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
function updateNavLineSpace(holderIDs) {
    let requiredSpace = 0
    for (holder of holderIDs) {
        let count = countSelectedTags(document.getElementById(holder))
        if (count > requiredSpace) {
            requiredSpace = count
        }
    }
    document.getElementsByTagName("nav")[0].setAttribute("data-selected-lines", requiredSpace)
}
function getRecipes(data, filter) {
    return data
}
function displayRecipies(data) {
    const holder = document.getElementsByClassName("card-holder")[0]
    data.forEach(recipe => {
        holder.appendChild(cardConstructor(recipe))
    })
    updateRecipeCount(data.length.toString())
}
//Init
function init() {
    preventFormDefaults(document.getElementsByTagName("form"))
    createSearchClearers(["search-normal", "search-ingredients", "search-appliances", "search-tools"], document.getElementsByClassName("button-clear"))
    const holderIDs = ["tags-ingredients", "tags-appliances", "tags-tools"]
    // createTagHolderTogglers(holderIDs, document.getElementsByClassName("tags-label"))
    // updateNavLineSpace(holderIDs)
    // createTagSelectionners(holderIDs)
    displayRecipies(recipes)
    getTagsFromJSON(recipes)
}
init()