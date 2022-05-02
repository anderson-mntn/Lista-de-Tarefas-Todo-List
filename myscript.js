//Selectors
const todoInput = document.querySelector('.todo-input') 
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')
const deleteAll = document.querySelector('#deleteAll')
const todoContainer = document.querySelector(".todo-container")

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteDiv)
//Onclick Select Options
filterOption[0].addEventListener('click', filterTodo)
filterOption[1].addEventListener('click', filterTodo)
filterOption[2].addEventListener('click', filterTodo)
//Load local storage itens on load page
window.addEventListener('load', loadTaskItems)
//Clear items from Local Storage, array, and html
deleteAll.addEventListener('click', deleteTasks)

//Main array
let arr = [] 

//Functions

//Clear placeholder on input focus
todoInput.onfocus = function (){
    if (this.placeholder === 'Type a task'){
        this.placeholder = ''
    }
}
//Button Add Task
function addTodo(event){
    event.preventDefault()
   
     if(todoInput.value === ''){
         window.alert('type a task')
        } else {  

            //Create Div and append input value text, and Checked/Delete button to it
            //Create Div 
            const todoDiv = document.createElement('div')
            todoDiv.classList.add('todo') // Add class into created Div

            //Create li
            const newLi = document.createElement("li")
            newLi.innerText = todoInput.value //Value from input
            newLi.classList.add('todo-item')
            todoDiv.appendChild(newLi)

            //Complete button
            const comBtn = document.createElement('button')
            comBtn.classList.add('comp-btn')
            comBtn.innerText = ` \u{2705}`
            todoDiv.appendChild(comBtn)

            //Delete button
            const delBtn = document.createElement('button')
            delBtn.innerHTML = " \u{26d4}"
            delBtn.classList.add('del-btn')
            todoDiv.appendChild(delBtn)

            //Append div to TodoList
            todoList.append(todoDiv)

            //Add to localStorage
                if(localStorage.length <= 0){
                    arr.push(todoInput.value)
                        localStorage.setItem('todoarray', JSON.stringify(arr))
                        } else {
                            //localStorage.getItem('todoarray', JSON.stringify(arr))
                            let arrString = localStorage.getItem('todoarray', (arr))
                            let newArr = JSON.parse(arrString);
                            newArr.push(todoInput.value);
                            localStorage.setItem('todoarray', JSON.stringify(newArr))
                        }

            //Clear input and focus 
            todoInput.value = ''
            todoInput.focus()
    }
}

// ----------------- LOAD LOCAL STORAGE ITEMS -----------------

function loadTaskItems(){

    localStorage.getItem('todoarray', JSON.stringify(arr))
    let arrString = localStorage.getItem('todoarray')
    let divArr = JSON.parse(arrString);
    //arr vai receber os itens 

    for (i = 0 ; i < divArr.length ; i++){
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo') // adiciona class nessa div que será criada

    //Create li
    const newLi = document.createElement('li')
    newLi.innerHTML = divArr[i] //Local storage saved string
    newLi.classList.add('todo-item')
    todoDiv.appendChild(newLi)

    //Complete button
    const comBtn = document.createElement('button')
    comBtn.classList.add('comp-btn')
    comBtn.innerText = ` \u{2705}`
    todoDiv.appendChild(comBtn)

    //Delete button
    const delBtn = document.createElement('button')
    delBtn.innerHTML = " \u{26d4}"
    delBtn.classList.add('del-btn')
    todoDiv.appendChild(delBtn)

    
    todoList.append(todoDiv)

    todoInput.value = ''
     todoInput.focus()
   }
    
}

//Delete and complete tasks marker
function deleteDiv(e){
    const item = e.target

     //Delete Task Button
     if(item.classList[0] === 'del-btn'){
        const todo = item.parentElement; //define button parent
        todo.remove();                   //Delete it
        
     //Remove task from array and local storage, finding it's index
     localStorage.getItem('todoarray', JSON.stringify(arr))
     let arrString = localStorage.getItem('todoarray', (arr))
     let newArr2 = JSON.parse(arrString);


     let tar = item.parentElement.firstChild.innerText
     newArr2.splice(newArr2.indexOf(tar), 1)
    
     localStorage.removeItem(newArr2.indexOf(tar), 1)
     localStorage.setItem('todoarray', JSON.stringify(newArr2))
    }

    //Completed task class change opacity
    if(item.classList[0] === 'comp-btn'){
        const todo =  item.parentElement
        todo.firstChild.classList.toggle('new-class'); 
        todo.classList.toggle('completed-task')
    }

    //Edit content
}

    //Change the Class and Display o All, completed and uncompleted tasks
    function filterTodo(e){
    const todos = todoList.childNodes
        todos.forEach(function(todo){
            switch(e.target.value){
                case "all":
                    todo.style.display = 'flex'
                break;
                case "completed": 
                if(todo.classList.contains('completed-task')){
                    todo.style.display = 'flex'
                } else{
                    todo.style.display = 'none'
                }
                break;
                case "uncompleted": 
                if(todo.classList.contains('completed-task')){
                    todo.style.display = 'none'
                } else{
                    todo.style.display = 'flex'
                }
                break;
            }
        })

}

//Delete all tasks from html, array, and local storage
function deleteTasks(e) {
    const item = e.target
    let text = "Delete all tasks?";
        if(item.classList[0] === 'filter-todo' && confirm(text) == true){
         todoList.innerText = ''
         arr = []
         localStorage.clear()   
        }
        
    }
 
//Display Hours

    function displayTime (){
    //get dates
     var dateTime = new Date();
     var hrs = dateTime.getHours()
     var min = dateTime.getMinutes()
     var sec = dateTime.getSeconds()
     var weekday = dateTime.getDay()
     var monthday = dateTime.getDate()
     var year = dateTime.getFullYear()
     var month = dateTime.getMonth()
     
    //Selectors
    var h = document.getElementById('hours')
    var m = document.getElementById('minutes')
    var s = document.getElementById('seconds')
    var wkday = document.querySelector('#weekday')
    var mday = document.getElementById('mday')
    var y = document.querySelector('#year')
    var mon = document.querySelector('#month')
    var ampm = document.querySelector('#am-pm')

   switch (weekday){
       case 0: wkday.innerText = 'Sunday'
       break;
       case 1: wkday.innerText = 'Monday'
       break;
       case 2: wkday.innerText = 'Tuesday'
       break;
       case 3: wkday.innerText = 'Wednesday'
       break;
       case 4: wkday.innerText = 'Thursday'
       break;
       case 5: wkday.innerText = 'Friday'
       break;
       case 6: wkday.innerText = 'Saturday'
       break;
    }

     switch (month){
         case 0: mon.innerText = 'January'
         break;
         case 1: mon.innerText = 'February'
         break;
         case 2: mon.innerText = 'March'
         break;
         case 3: mon.innerText = 'April'
         break;
         case 4: mon.innerText = 'May'
         break;
         case 5: mon.innerText = 'June'
         break;
         case 6: mon.innerText = 'July'
         break;
         case 7: mon.innerText = 'August'
         break;
         case 8: mon.innerText = 'September'
         break;
         case 9: mon.innerText = 'October'
         break;
         case 10: mon.innerText = 'November'
         break;
         case 11: mon.innerText = 'December'
         break;   
     }

    mday.innerText = monthday
    y.innerText = year
   
   
    if (hrs < 10){
    h.innerHTML = "0" + hrs
    } else {
        h.innerHTML = hrs
    }
    if (min < 10){
        m.innerHTML = "0" + min
    } else {
        m.innerHTML = min
    }
    if (sec < 10){
        s.innerHTML = "0" + sec
    } else {
        s.innerHTML = sec
    }

    //AM - PM Checker
    if(hrs <= 11){
        ampm.innerHTML = 'AM'
    } else {
        ampm.innerHTML = 'PM'
    }
}

    setInterval(displayTime, 1000);
