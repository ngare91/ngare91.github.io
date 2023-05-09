//npm install -g http-server
//cd /Users/nicholasgare/Documents/hwebs
//http-server
//inspect, network, disable cache
//http://localhost:8080/
/*
Csv file, list of weapons (all due to scope varients), endless columns of traits 

drop down list of weapons
must select option
displays traits on right as word (sort A->z)
in future, type in weapon, shows remaining options
in future word and image of trait on right
in future image of weapon on left
in future, right side, option to sort by trait cost

nodeJS, import as little as possible
typescript
*/

const weaponCardTemplate = document.querySelector("[data-weapon-template]")
const weaponCardTcontainer = document.querySelector("[data-weapon-cards-container]")
const searchInput = document.querySelector("[data-search]")
let weapons_list = []
searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase()
        weapons_list.forEach(weapon => { 
                const isVisible = weapon.weapon_name.toLowerCase().includes(value)
                weapon.element.classList.toggle("hide", !isVisible)
        })
})

fetch("weapons.json")
.then(res => res.json())
.then (data => {
        weapons_list = data.map(weapon => {
                const card = weaponCardTemplate.content.cloneNode(true).children[0]
                const weapon_name = card.querySelector("[data-weapon-name]")
                const traits = card.querySelector("[data-traits]")
                weapon_name.textContent = weapon.weapon_name
                traits.textContent = weapon.traits
                weaponCardTcontainer.append(card)
        return { weapon_name: weapon.weapon_name, traits: weapon.traits, element: card}
        })
})