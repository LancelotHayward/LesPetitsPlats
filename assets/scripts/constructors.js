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
function navConstructor(tags) {
    let nav = document.createElement("nav")

    //Card holders
    let navDiv = document.createElement("div")
    navDiv.appendChild(tagHolderConstructor("Ingrédients", tags))
    navDiv.appendChild(tagHolderConstructor("Appareils", tags))
    navDiv.appendChild(tagHolderConstructor("Ustensiles", tags))
    nav.appendChild(navDiv)

    //Recipe count
    nav.appendChild(childConstructor("p", false))

    return nav
}
function tagHolderConstructor(type, tags) {
    let tag_holder = childConstructor("div", "tag-holder")
    tag_holder.appendChild(childConstructor("label", "tags-label", type))
    tag_holder.appendChild(tagSearchConstructor(type))
    tags.forEach(tag => {
        tag_holder.appendChild(tagConstructor(tag))
    })
    return tag_holder
}
function tagSearchConstructor(type) {
    let form = document.createElement("form")
    form.appendChild(searchBoxConstructor(type))
    form.appendChild(searchButtonConstructor("clear"))
    form.appendChild(searchButtonConstructor("search"))
}
function searchBoxConstructor(type) {
    let searchBox = document.createElement("input")
    searchBox.setAttribute("id", "search-" + type)
    searchBox.setAttribute("type", "search")
    searchBox.setAttribute("placeholder", "")
    return searchBox
}
function searchButtonConstructor(type) {
    let button = childConstructor("button", "button-" + type)
    button.appendChild(imageConstructor(type + ".png", type))
}
function tagConstructor(data) {
    let tag = childConstructor("span", "tag", data.name)
    tag.classList.add(data.selection)
    return tag
}

//Recipes
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
    card_ingredients.appendChild(childConstructor("h3","Ingrédients"))
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