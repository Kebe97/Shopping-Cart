import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://realtime-database-4004c-default-rtdb.europe-west1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputField = document.getElementById("input-field")
const addButton = document.getElementById("add-button")
const myShoppingList = document.getElementById("shopping-list")


const booksInDB = ref(database, "books")
onValue(shoppingListInDB, function(snapshot){
    if (snapshot.exists()){
        let cartArray = Object.entries(snapshot.val())
        console.log(snapshot.val())
        clearList(myShoppingList)
        for (let i = 0;i < cartArray.length;i++){
            let currentItem = cartArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            // console.log(currentItemID)
            // console.log(currentItemValue)
            appendItemToList(myShoppingList, currentItem)
        }
    }
    else{
        console.log("No items here.... yet")
        myShoppingList.innerHTML = '<h2>No items here.... yet<h2>'
    }
})


addButton.addEventListener("click", function(){
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    clearInput(inputField)    
})


function clearInput(input){
    input.value = ""
}


function clearList(list){
    list.innerHTML = ""
}


function appendItemToList(list, item){
    // list.innerHTML += `<li>${value}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    list.append(newEl)
    newEl.addEventListener("click", function(){
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)
        remove (exactLocationInDB)
    })
}
