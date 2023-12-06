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
//Tag Holders
function toggleTagHolder(id) {
    document.getElementById(id).classList.toggle("tags-visible")
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
        // tags
        if (tags_content[i] == tag_text) {
            console.log(tags)
            console.log(i)
            tags[i].classList.toggle("selected")
        }
    }
}
function createTagSelectionners(holderIDs) {
    for (holderID of holderIDs) {
        let holder = document.getElementById(holderID)
        let tags = holder.getElementsByClassName("tag")
        for (tag of tags) {
            tag.addEventListener("click", function(){
                toggleTagSelection(holderID, tag.textContent) })
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
    createSearchClearers(["search-normal", "search-ingredients", "search-devices", "search-tools"], document.getElementsByClassName("button-clear"))
    const holderIDs = ["tags-ingredients", "tags-devices", "tags-tools"]
    createTagHolderTogglers(holderIDs, document.getElementsByClassName("tags-label"))
    updateNavLineSpace(holderIDs)
    createTagSelectionners(holderIDs)
    updateRecipeCount("03")
}
init()