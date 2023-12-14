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
function notDuplicate(list, addition) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].toLowerCase() === addition.toLowerCase()) {
            return false
        }
    }
    return true
}
function getIngredients(recipes) {
    let ingredients = []
    recipes.forEach(recipe => 
        recipe.ingredients.forEach(
            element => {
                if (notDuplicate(ingredients, element.ingredient)) {
                    ingredients.push(element.ingredient)
                }
            }
        )
    )
    return ingredients
}
function getAppliances(recipes) {
    let appliances = []
    recipes.forEach(
        recipe =>  {
            if (notDuplicate(appliances, recipe.appliance)) {
                appliances.push(recipe.appliance)
            }
        }
    )
    return appliances
}
function getTools(recipes) {
    let tools = []
    recipes.forEach(recipe => 
        recipe.ustensils.forEach(
            tool => {
                if (notDuplicate(tools, tool)) {
                    tools.push(tool)
                }
            }
        )
    )
    return tools
}
function getTags(recipes) {
    let tags = {
        "ingredients": getIngredients(recipes),
        "appliances": getAppliances(recipes),
        "tools": getTools(recipes)
    }
    return tags
}
//Tag Holders
function toggleTagHolder(id) {
    document.getElementById(id).classList.toggle("tags-visible")
}
function createTagElement(tag_name, selected) {
    let tag = document.createElement("span")
    tag.classList.add("tag")
    if (selected !== "unselected") {
        tag.classList.add(selected)
    }
    tag.textContent = tag_name
    return tag
}
function updateTagHolders(tags) {
    //Selected tags
    for (let i = 0; i < 3; i++) {//tag_type of tags.selected) {
        let holder = document.getElementById("tags-" + Object.keys(tags.selected)[i])
        for (let tag_selected of tag_type) {
            holder.appendChild(createTagElement(tag_selected, "selected"))
        }
    }
    for (let i = 0; i < 3; i++) {
        let holder = document.getElementById("tags-" + Object.keys(tags.unselected)[i])
        for (let j = 0; j < 7; j++) {
            if (j == 0) {
                holder.appendChild(createTagElement(tags.unselected[i][j], "first-unselected"))
            }
            else {
                holder.appendChild(createTagElement(tags.unselected[i][j], "unselected"))
            }
        }
    }
}
function createTagHolderTogglers(holderIDs, labels) {
    for (let i = 0; i < holderIDs.length; i++) {
        labels[i].addEventListener("click", function(){
            toggleTagHolder(holderIDs[i]) })
    }
}
//Tags
function getTagsContent(tags) {
    let tag_contents = []
    for (tag of tags) {
        tag_contents.push(tag.textContent)
    }
    return tag_contents
}
function toggleTagSelection(tag_holder_id, tag_text) {
    let tag_holder = document.getElementById(tag_holder_id)
    let tags = tag_holder.getElementsByClassName("tag")
    let tags_content = getTagsContent(tags)
    for (let i = 0; i < tags.length; i++) {
        if (tags_content[i] == tag_text) {
            tags[i].classList.toggle("selected")
        }
    }
}
function createTagSelectionners(holderIDs) {
    for (let i = 0; i < holderIDs.length; i++) {
        let holder = document.getElementById(holderIDs[i])
        let tags = holder.getElementsByClassName("tag")
        for (let j = 0; j < tags.length; j++) {
            tags[j].addEventListener("click", function(){
                console.log(tags[j].textContent)
                toggleTagSelection(holderIDs[i], tags[j].textContent) })
        }
    }
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
//Init
function init() {
    preventFormDefaults(document.getElementsByTagName("form"))
    createSearchClearers(["search-normal", "search-ingredients", "search-appliances", "search-tools"], document.getElementsByClassName("button-clear"))
    const holderIDs = ["tags-ingredients", "tags-appliances", "tags-tools"]
    createTagHolderTogglers(holderIDs, document.getElementsByClassName("tags-label"))
    updateNavLineSpace(holderIDs)
    createTagSelectionners(holderIDs)
    updateRecipeCount("03")
    getTags(recipes)
}
init()