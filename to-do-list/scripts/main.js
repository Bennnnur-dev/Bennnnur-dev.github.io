const LSData = JSON.parse(localStorage.getItem("data"));
const dataArray = LSData || []

const dataObject = {
    content: "",
    date: "",
    position: ""
}

renderObject()
addDate()

const addButton = document.querySelector(".js-add-button")
const inputBar = document.querySelector(".js-input-bar")

addButton.addEventListener("click", () => {
    getInput();
    inputBar.value = ""
})

inputBar.addEventListener("keydown", (e) => {
    if (e.key === 'Enter'){
        getInput();
        inputBar.value = ""
    }
})

function getInput(){
    if (inputBar.value === ""){
        return;
    }
    const newObject = JSON.parse(JSON.stringify(dataObject))
    newObject.content = inputBar.value
    newObject.position = 1
    dataArray.forEach((v, i) => {
        if (i + 1 === dataArray.length) {
            newObject.position = i+2
        }
    })

    const d = new Date()
    newObject.date = `${d.getFullYear()}/${d.getMonth()}/${d.getDay()}` 


    dataArray.push(newObject)
    console.log(dataArray)
    renderObject(newObject)
    addDate()
    localStorage.setItem("data", JSON.stringify(dataArray))
}

function renderObject(){

    let result = "";

    const mainContainer = document.querySelector(".to-do-section")
    let content;

    dataArray.forEach((value, index) => {
        content = value.content
        let truncateContent;
        if (content.length >= 20 ){
            truncateContent = content.substring(0, 20)
        } else truncateContent = content

        const html =
        `<div data-id="${index + 1}" class="to-do-container js-to-do-container">
        <div class="index">${index+1}</div>
        <div data-text="${content}" class="input">${truncateContent}</div>
        <div class="date-input">
        <p class="date-p">${value.date}</p>

        <div class="calendar js-calendar">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16px"
            viewBox="0 -960 960 960"
            width="16px"
            fill="lightgray"
            >
            <path
                d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
            />
            </svg>
        </div>

        <input class="css-input js-input" type="date" />
        </div>

        <div class="gradient">
        <div class="arrow-right js-arrow-right">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="white"
            >
            <path
                d="M507-480 384-357l56 57 180-180-180-180-56 57 123 123ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"
            />
            </svg>
        </div>

        <div class="checkmark js-checkmark">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="white"
            >
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
        </div>
        </div>
        </div>
        `
        result += html
    })

    mainContainer.innerHTML = result

    document.querySelectorAll(".js-checkmark")
    .forEach((button, index) => {
        button.addEventListener("click", () => {
            deleteToDo(index)
            localStorage.setItem("data", JSON.stringify(dataArray))
        })
    })
    
    document.querySelectorAll(".js-arrow-right")
    .forEach((button, index) => {
        button.addEventListener("click", () => {
            expandText(index)
        })
    })

    document.querySelectorAll(".js-to-do-container")
    .forEach((button, index) => {
        button.addEventListener("click", () => {
            expandText(index)
        })
    })
}

function deleteToDo(index){
    const container = document.querySelectorAll(".to-do-container")
    container.forEach((value) => {
        const dataIndex = value.dataset.id
        if (Number(dataIndex) === index + 1){
            value.classList.add("remove-anim")
        }
    })
    dataArray.splice(index, 1)

    dataArray.forEach((object) => {
        object.position = index++
    })

    setTimeout(() => renderObject(), 200)
}

function addDate(){ //too fucking tired to explain this nested hell
    document.querySelectorAll(".js-input")
    .forEach((button, index) => {
        dataArray.forEach((object) => {
            if (object.position === index + 1) {
                button.addEventListener("click", () => {
                    const dateInput = document.querySelectorAll(".date-p")
                    dateInput.forEach((p, i) => {
                        if (i === index) {
                            p.innerText = `${button.value}`
                            object.date = button.value
                            localStorage.setItem("data", JSON.stringify(dataArray))
                        }
                    })
                })
            }
        })
    })
}

document.querySelector(".js-exit-button")
    .addEventListener("click", () => {
        shrinkText()
})
document.querySelector(".popup-div")
    .addEventListener("click", () => {
        shrinkText()
    })

function shrinkText(){
    document.querySelector(".popup-div").classList.add("popup-anim-1")
    document.querySelector(".popup-div").classList.remove("popup-anim-2")

    setTimeout(() => {
        document.querySelector(".popup-div").classList.remove("popup-anim-1")

    }, 300)
}

function expandText(index){
    document.querySelector(".popup-div").classList.add("popup-anim-2")
    const textContainer = document.querySelector(".text-container")

    document.querySelectorAll(".js-to-do-container")
    .forEach((container, i) => {
        container.querySelectorAll(".input").forEach((element) => {
            if (i === index){
                textContainer.innerText = element.dataset.text
            }
        })
    })
}

document.addEventListener("keydown", (e) => {
    if (e.key === "x"){
        localStorage.clear("data")
    }
})