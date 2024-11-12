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
            Object.keys(consumableType)[0] == "foods" ? subList.onclick = () => action('feed',{[foodType] : consumable[consumableCategory][foodType]}) : subList.onclick = () => action('hydrate',{[foodType] : consumable[consumableCategory][foodType]}) 
            const subCategory = document.createElement("a")
            subCategory.id = `${foodType}btn`
            //subCategory.textContent = calculateSpaces(foodType, Object.values(consumable[consumableCategory][foodType]))
            subCategory.className = 'wide-link'
            const spanL = document.createElement('span')
            const spanR = document.createElement('span')
            spanL.className = 'left'
            spanR.className = 'right'
            spanL.textContent = foodType
            spanR.textContent = `${Object.values(consumable[consumableCategory][foodType])} oz`
            subCategory.appendChild(spanL)
            subCategory.appendChild(spanR)
            
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
((form = document.getElementById('babyForm')).addEventListener('submit', async (event) => {
    event.preventDefault()
    formSubmit(form)
    ;})
)
function formScraper(form){
    const data = {}
    for(let element of form.querySelectorAll('input')){
        if (element.value){
            data[element.id] = element.value 
        }       
    }
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
        const result = await fetchResponse.json()
        if (fetchResponse.ok) {
            specUpdate(result)

            createConsole()
            console.log(result); // Log the result
        } else {
            console.log(result);
        }
    } catch (error) {
        console.log(error);
    }

};

function specUpdate(result){
    let specDiv = document.getElementById("specs")
    const specs = specDiv.querySelectorAll('span')
    const messageBox = document.getElementById("MessageBox")
    const messages = result['message'].map(obj => {
        return Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" ")
    })
    messageBox.innerHTML = messages.join('<br>') // Each message on a new line
    for([attr, value] of Object.entries(result)){
        for (span of specs){
            if ((span.id).toLowerCase() == `baby${attr}`.toLowerCase()){
                span.innerText = value
                break
            }

        }
    }
}

function createConsole() {
    const foodModal = document.getElementById("foodModal");
    foodModal.style.left = `${.5 * window.innerWidth - 200}px`;
    foodModal.style.top = `${.5 * window.innerHeight - 150}px`;
    foodModal.style.display == "flex" ? foodModal.style.display = "none" : foodModal.style.display = "flex" 
}

async function action(actionName, ...args){
    const actions = {
        feed: async (...args) => await feedBaby(...args),
        hydrate: async (...args) => await hydrateBaby(...args),
        hug: async () => await console.log("hug"),
        punt: async () => await console.log("kick"),
        throw: async () => await console.log("smash"),
        throw: async () => await console.log("smash")
    };
    if (actions[actionName] && typeof actions[actionName] === 'function') {
        await actions[actionName](...args) // Call the specified action
    } else {
        console.log(`Action "${actionName}" not found`);
    }
}
async function verifyBaby(){
    const name = document.getElementById("babyname").textContent
    const fetchResponse = await fetch(`${BASE_URL}/baby/verify-living-state`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name}),
    });
    const result = await fetchResponse.json()
    return result
    
    
}
async function feedBaby(food){
    try{
        if(verifyBaby()){
            const messageBox = document.getElementById("MessageBox")
            messageBox.innerText = 'Create a new baby, your baby Died.'
            return
        }
        const fetchResponse = await fetch(`${BASE_URL}/baby/feed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(food),
        });
        const result = await fetchResponse.json()
        if (fetchResponse.ok) {
            specUpdate(result)
    }
}catch(error){
    console.error(error)
}
}
async function hydrateBaby(drink){
    try{
        if(verifyBaby()){
            console.log("im dead!")
            const messageBox = document.getElementById("MessageBox")
            messageBox.innerHTML = 'Create a new baby, your baby Died.'
            return
        }
        const fetchResponse = await fetch(`${BASE_URL}/baby/hydrate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(drink),
        });
        const result = await fetchResponse.json()
        if (fetchResponse.ok) {
            specUpdate(result)
        }
    }catch(error){
        console.error(error)
    }
}


























function calculateSpaces(consumable, weight) {
    const maxTextWidth = 80;
    
    // Convert weight to string to handle numeric values
    const consumableStr = consumable.toString();
    const weightStr = weight.toString();
    
    // Calculate how many spaces are needed to fit within max width
    const spacesNeeded = maxTextWidth - consumableStr.length - weightStr.length;

    // Ensure spaces are non-negative (in case input lengths exceed max width)
    const quantitySpaces = spacesNeeded > 0 ? ' '.repeat(spacesNeeded) : '';
    
    // Construct and return the formatted string
    const formattedString = `${consumableStr}${quantitySpaces}${weightStr}`;
    console.log(formattedString)
    return formattedString;
}




































// old button logic
async function fetchFoodCategories(){
    const URL = 'http://localhost:3000/food/get-categories'
    try {
        return await(await fetch(URL)).json()
        // food.forEach(consumable =>{
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

