//JSON
function isNotDuplicate(tags, new_tag) {
    return tags.filter(tag => tag.name.toLowerCase() == new_tag.toLowerCase()).length == 0
}
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
        for (element of recipe.ingredients) {
            if (isNotDuplicate(tags, element.ingredient)) {
                tags.push(createTagData("Ingrédients", element.ingredient))
            }
        }
        for (ustensil of recipe.ustensils) {
            if (isNotDuplicate(tags, ustensil)) {
                tags.push(createTagData("Ustensiles", ustensil))
            }
        }
        if (isNotDuplicate(tags, recipe.appliance)) {
            tags.push(createTagData("Appareils", recipe.appliance))
        }
    }
    return tags
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
    let tag_element
    for (sibling of sibling_tags) {
        if (sibling.textContent == name) {
            tag_element = sibling
        }
    }
    if (tag_element.classList.contains("is_selected")) {
        tag_element.classList.remove("is_selected")
        // selected_display.getElementsByClassName("tag").filter(tag =>
        //     tag.name == name
        // ).remove()
        for (tag of selected_display.getElementsByClassName("tag")) {
            if (tag.innerText == name) {
                tag.remove()
            }
        }
    }
    else {
        tag_element.classList.add("is_selected")
        const tag_type = tag_element.getAttribute("data-type")
        const tag_name = tag_element.innerText
        let cloned_node = tag_element.cloneNode(true)
        cloned_node.addEventListener("click", function(){
            toggleTag(tag_type, tag_name)
        })
        selected_display.appendChild(cloned_node)
    }
    searchRecipe()
}
    //Search
function hideIrrelevantTags(data) {
    let visible_tags = getTagsFromJSON(data)
    let tags = document.getElementsByClassName("tag")
    let irrelevant_tags = []
    for (tag of tags) {
        //Show all
        tag.classList.add("is_visible")
        //Filter
        if (!tag.classList.contains("is_selected") &&
            !visible_tags.some(visible_tag => {
                return compareTerms(visible_tag.name, tag.innerText)
            })) {
            irrelevant_tags.push(tag)
        }
    }
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
                if (recipe.ustensils.some(ustensil =>
                    compareTerms(ustensil, tag.textContent)
                )) {
                    return true
                }
                if (compareTerms(recipe.appliance, tag.textContent)) {
                    return true
                }
            }
        }
        return false
    })
    if (filtered_recipes.length == 0) {
        return recipes
    }
    return filtered_recipes
}