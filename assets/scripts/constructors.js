function childConstructor(element, style, text = false) {
    let child = document.createElement(element)
    if (style) {
        child.classList.add(style)
    }
    if (text) {
        child.textContent = text
    }
    return child
}
function imageConstructor(file_name, title) {
    let image = document.createElement("img")
    image.setAttribute("src", "assets/images/" + file_name)
    image.setAttribute("alt", title)
    return image
}

//Nav
function navConstructor() {
    let nav = document.createElement("nav")

    //Card holders
    let navDiv = document.createElement("div")
    navDiv.appendChild(tagHolderConstructor("Ingrédients"))
    navDiv.appendChild(tagHolderConstructor("Appareils"))
    navDiv.appendChild(tagHolderConstructor("Ustensiles"))
    nav.appendChild(navDiv)
    //Recipe count
    nav.appendChild(childConstructor("p", false))

    return nav
}
function tagHolderConstructor(type) {
    let tag_holder = childConstructor("div", "tag-holder")
    let tag_holder_id = "tags-" + type
    tag_holder.setAttribute("id", tag_holder_id)
    tag_holder.appendChild(tagLabelConstructor(type, tag_holder_id))
    tag_holder.appendChild(tagSearchConstructor(type))
    // tag_holder = tagsFactory(tag_holder, tags, type)
    return tag_holder
}
function tagLabelConstructor(type, tag_holder_id) {
    let label = childConstructor("label", "tags-label", type)
    label.addEventListener("click", function(){
        toggleTagHolder(tag_holder_id)
    })
    return label
}
function tagSearchConstructor(type) {
    let form = document.createElement("form")
    form.appendChild(searchBoxConstructor(type))
    form.appendChild(searchButtonConstructor("clear"))
    form.appendChild(searchButtonConstructor("search", type))
    return form
}
function searchBoxConstructor(type) {
    let searchBox = document.createElement("input")
    searchBox.setAttribute("id", "search-" + type)
    searchBox.setAttribute("type", "search")
    searchBox.setAttribute("placeholder", "")
    return searchBox
}
function searchButtonConstructor(button_type, tag_type = false) {
    let button = childConstructor("button", "button-" + button_type)
    button.appendChild(imageConstructor(button_type + ".png", button_type))
    if (tag_type) {
        button.addEventListener('click', function(e){
            searchTags(tag_type)
        })
    }
    return button
}
function cardConstructor(recipe) {
    let card = childConstructor("article", "card")
    card.appendChild(childConstructor("p", "preptime", recipe.time.toString() + "min"))
    card.appendChild(imageConstructor("recettes/" + recipe.image, "Image de " + recipe.name))
    card.appendChild(bodyConstructor(recipe.name, recipe.description, recipe.ingredients))
    return card
}
function bodyConstructor(name, description, ingredients) {
    let body = childConstructor("div", "card-body")
    body.appendChild(childConstructor("h2", false, name))
    body.appendChild(recipeConstructor(description))
    body.appendChild(ingredientsConstructor(ingredients))
    return body
}
function recipeConstructor(description) {
    let recipe = childConstructor("div", "card-recipe")
    recipe.appendChild(childConstructor("h3", false, "Recette"))
    recipe.appendChild(childConstructor("p", false, description))
    return recipe
}
function ingredientsConstructor(ingredients) {
    let card_ingredients = childConstructor("div", "card-ingredients")
    card_ingredients.appendChild(childConstructor("h3",false,"Ingrédients"))
    card_ingredients.appendChild(listConstructor(ingredients))
    return card_ingredients
}
function listConstructor(ingredients) {
    let list = document.createElement("ul")
    ingredients.forEach(ingredient => {
        let listitem = document.createElement("li")
        listitem.appendChild(childConstructor("p", "card-ingredient", ingredient.ingredient))
        let dosage = ingredient.quantity?.toString()
        if (ingredient.unit) {
            dosage += " " + ingredient.unit
        }
        listitem.appendChild(childConstructor("p", "card-dose", dosage))
        list.appendChild(listitem)
    })
    return list
}