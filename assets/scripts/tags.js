//JSON
function createTagData(type, name, is_selected = false, is_visible = true) {
    return {
        "type": type,
        "name": name,
        "is_selected": is_selected,
        "is_visible": is_visible
    }
}
function getTagsFromJSON(json) {
    let tags = []
    for (recipe of json) {
        for (ingredient of recipe.ingredients) {
            tags.push(createTag("Ingrédients", ingredient.ingredient))
        }
        for (ustensils of recipe.ustensils) {
            tags.push(createTag("Ustensiles", ustensils))
        }
        tags.push(createTag("Appareils", recipe.appliance))
    }
    return Array.from(new Set(tags))
}
//HTML
    //Init
function tagsFactory(data) {
    for (tag of data) {
        let tag_holder = document.getElementById("tags-" + tag.type)
        let tag_element = tagConstructor(tag)
        tag_holder.appendChild(tag_element)
        if (tag.is_selected) {
            document.getElementById("selected-tag-holder").appendChild(tag_element)
        }
    }
}
function tagConstructor(data) {
    let tag = childConstructor("span", "tag", data.name)
    tag.setAttribute("data-type", data.type)
    if (data.is_selected) {
        tag.classList.add("is_selected")
    }
    if (data.is_visible) {
        tag.classList.add("is_visible")
    }
    tag.addEventListener("click", function(){
        toggleTag(data.type, data.name)
    })
    return tag
}
    //Toggle
function toggleTag(type, name) {
    let selected_display = document.getElementById("selected-tag-holder")
    let tag_holder = document.getElementById("tags-" + type)
    let sibling_tags = tag_holder.getElementsByClassName("tag")
    let tag_element = sibling_tags.filter(tag =>
        tag.name == name
    )
    if (tag_element.classList.contains("is_selected")) {
        tag_element.classList.remove("is_selected")
        selected_display.getElementsByClassName("tag").filter(tag =>
            tag.name == name
        ).remove()
    }
    else {
        tag_element.classList.add("is_selected")
        selected_display.appendChild(tag_element)
    }
}
    //Search
function hideIrrelevantTags(data) {
    let tags = document.getElementsByClassName("tag")
        //Show all
    tags.forEach(tag =>
        tag.classList.add("is_visible")
    )
        //Filter
    let irrelevant_tags = tags.filter(tag =>
        !tag.classList.contains("is_selected") &&
        !data.includes(tag)
    )
        //Hide
    irrelevant_tags.forEach(tag =>
        tag.classList.remove("is_visible")
    )
}
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