const BASE_URL = 'http://localhost:3000'
document.addEventListener('DOMContentLoaded', async () => {
    let drinks;
    await (async () =>{                // I could just type drink.... or.....
        drinks = await getAll('drink')// hmmm..... Object.keys({drinks})[0].split("s")[0]
        await buildDrinkMenu(drinks) // nah im not that stupid...
        console.log(`${Object.keys({drinks})} Menu Loading Done`)})(); // lol
        let foods;
    await (async () =>{
        foods = await getAll('food')
        await buildFoodMenu(foods)
        console.log(`${Object.keys({foods})} Menu Loading Completed`)})() // lol
    })
async function buildDrinkMenu(drinks){
    await buildDropDown(drinks = {drinks}) //sends in object so i can reference name
}
async function buildFoodMenu(foods){
    await buildDropDown(foods = {foods}) //sends in object so i can reference name
}  
async function buildDropDown(consumableType){
    const consumableMenu = document.getElementById(`${Object.keys(consumableType)[0]}-head`)
    const consumable = consumableType[Object.keys(consumableType)[0]]
    const subMenu01 = document.createElement('ul')
    subMenu01.className = "second-level-menu"
    consumableMenu.appendChild(subMenu01)
    Object.keys(consumable).forEach(consumableCategory =>{
        const list = document.createElement("li")
        const category = document.createElement("a")
        category.id = consumableCategory
        category.textContent = consumableCategory
        const subMenu02 = document.createElement('ul')
        subMenu02.className = "third-level-menu"
        list.appendChild(category)
        list.appendChild(subMenu02)
        Object.keys(consumable[consumableCategory]).forEach(foodType => {
            const subList = document.createElement("li")
            const subCategory = document.createElement("a")
            subCategory.id = `${foodType}btn`
            subCategory.textContent = foodType
            subList.appendChild(subCategory)
            subMenu02.appendChild(subList)
            list.appendChild(subMenu02)
            subMenu01.appendChild(list)
        })
    })
}
async function getAll(type){
    const URL = `${BASE_URL}/${type}/get-all`
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}


(form = document.getElementById('babyForm')).addEventListener('submit', async (event) => {
    event.preventDefault()
    formSubmit(form)
    ;})
function formScraper(form){
    const data = {}
    for(let element of form.querySelectorAll('input')){
            data[element.id] = element.value ? element.value : ''
    }
    console.log(data)
    return data 
}

async function formSubmit(form){
    // MESSAGE ELEMENT IS GOING TO BE THE SPEC MENU
    try {
        const data = formScraper(form);
        const fetchResponse = await fetch(`${BASE_URL}/baby/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await fetchResponse.json();

        if (fetchResponse.ok) {
            messageElement.innerText = `Success: ${result.message}`;
            console.log(result); // Log the result
        } else {
            messageElement.innerText = `Error: ${result.message}`;
            console.log(result);
        }
    } catch (error) {
        messageElement.innerText = `Network error: ${error.message}`;
        console.log(error);
    }

};









































// old button logic
async function fetchFoodCategories(){
    const URL = 'http://localhost:3000/food/get-categories'
    try {
        return await(await fetch(URL)).json()
        // food.forEach(item =>{
        //     document.createElement
        // })
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
async function fetchFoods(category){
    const URL = `http://localhost:3000/food/get-foods/${category}`
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
async function fetchDrinkCategories(){
    const URL = 'http://localhost:3000/drink/get-categories'
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}
async function fetchDrinks(category){
    const URL = `http://localhost:3000/drink/get-drinks/${category}`
    try {
        return await(await fetch(URL)).json()
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error)
    }
}   

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
        const category = await (dropdownId === 'hydrateDropdown' ? fetchDrinkCategories() : fetchFoodCategories()) // Assuming fetchFoodTypes is defined and returns an array
        console.log(category)
        
        category.forEach(type => {
            const button = document.createElement('button')
            button.textContent = type
            button.onclick = async () => (dropdownId === 'hydrateDropdown' ? console.log(await fetchDrinks(type)) : console.log(await fetchFoods(type))) // Assuming feedBaby is defined
            dropdown.appendChild(button)
        })

    } catch (error) {
        console.error('Error fetching consumable category:', error)
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

