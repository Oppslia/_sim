// Function to toggle dropdown visibility

window.onclick = function(event) {
    if (!event.target.matches('.menu-btn')) {
        document.querySelectorAll('.dropdown-content').forEach(dropdown => {
            dropdown.style.display = 'none'
        })
    }
}

async function toggleDropdown(dropdownId) {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        if (dropdown.id === dropdownId) {
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block'
            //toggles on and off if you click based on if its open or not.
        } else {
            dropdown.style.display = 'none'
        }
    
    })
    const dropdown = document.getElementById(dropdownId)
    dropdown.innerHTML = ''
    try {
        const types = await (dropdownId === 'hydrateDropdown' ? fetchDrinkTypes() : fetchFoodTypes()) // Assuming fetchFoodTypes is defined and returns an array
        console.log(types)
        
        types.forEach(type => {
            const button = document.createElement('button')
            button.textContent = type
            button.onclick = () => (dropdownId === 'hydrateDropdown' ? fetchDrinks(type) : fetchFoods(type)) // Assuming feedBaby is defined
            dropdown.appendChild(button)
        })
    } catch (error) {
        console.error('Error fetching consumable types:', error)
    }
}

async function fetchFoodTypes(){
    const URL = 'http://localhost:3000/food/get-types'
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
async function fetchFoods(type){
    const URL = `http://localhost:3000/food/get-foods/${type}`
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
async function fetchDrinkTypes(){
    const URL = 'http://localhost:3000/drink/get-types'
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
async function fetchDrinks(type){
    const URL = `http://localhost:3000/drink/get-drinks/${type}`
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}   







































// Functions for handling feed and hydrate actions
// function feedBaby(food) {
//     console.log(`Feeding baby: ${food}`)
//     document.getElementById("feedDropdown").style.display = "none"
// }

// function hydrateBaby(drink) {
//     console.log(`Hydrating baby with: ${drink}`)
//     document.getElementById("hydrateDropdown").style.display = "none"
// }

// Close dropdown if clicked outside

