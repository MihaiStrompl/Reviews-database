import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsements-database-f735a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const endListEl = document.getElementById("end-list")

onValue(endorsementListInDB, function(snapshot){
    let reviewsArray =  Object.values(snapshot.val())
    clearList()
    
    for (let i = 0; i < reviewsArray.length; i++){
        let currentReview = reviewsArray[i]
        addItemToList(currentReview)
    }
    
})

publishBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(endorsementListInDB, inputValue)
    
    clearInputFieldEl()
    
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearList(){
    endListEl.innerHTML = ""
}

function addItemToList(itemValue) {
    endListEl.innerHTML += `<li>${itemValue}</li>`
}