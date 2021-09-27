let todoInput = document.querySelector('.todo-input');
let todoButton = document.querySelector('.todo-button');
let todoList = document.querySelector('.todo-list');
let todoContainer = document.querySelector('.todo-container');
let hideListButton = document.querySelector('.hide-list');
let archivedToDoButton = document.getElementById("archived-todos-button");
let archivedToDoContainer = document.querySelector(".archived-todo-container");
let archivedTodoList = document.querySelector('.archived-todo-list');

todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", performAction);
// retrieve all todos when our page has fully loaded
document.addEventListener("DOMContentLoaded", retrieveTodos);
hideListButton.addEventListener("click", toggleToDoList);
archivedToDoButton.addEventListener("click", retrieveArchivedTodos);
archivedTodoList.addEventListener("click", deleteArchivedToDo);


let shouldHideToDOList = false;
let archiveToDoDisplayCounts = 0;


function addToDo(event){
    // prevents the event submit from happening automatically
    event.preventDefault();

    //create todo div
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    //create li
    const newToDo = document.createElement("li");
    newToDo.innerText=  todoInput.value;
    newToDo.classList.add("todo-list");
    // append li inside the tododiv
    toDoDiv.appendChild(newToDo);
    // save todo in the localStorage
    saveTodo(todoInput.value);
    // create a completed task check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("completed-button");
    //append completed button insie the tododiv
    toDoDiv.appendChild(completedButton);
    // create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete-button");
    //append delete button insie the tododiv
    toDoDiv.appendChild(deleteButton);
    // finally append tododiv inside LIST ul
    todoList.appendChild(toDoDiv);
    // clear todoinput value
    todoInput.value = "";
    todoInput.focus();
}

function deleteArchivedToDo(e){
    const itemClickedOn  = e.target;
    // now delete the task
    if(itemClickedOn.classList[0] === "delete-button"){
       const itemToBeDeleted = itemClickedOn.parentElement;
       // remove todo task from archivedTodo-localstorage
       removeTodoFromArchivedToDoLocalStorage(itemToBeDeleted);
       itemToBeDeleted.remove();
    }
}


function performAction(e) {
    const itemClickedOn  = e.target;
    console.log("PERFORMACTION--->"+e.target.classList);
    // now delete the task
    if(itemClickedOn.classList[0] === "delete-button"){
       const itemToBeDeleted = itemClickedOn.parentElement;
       console.log("PARENT ELEMENT"+ itemToBeDeleted);
       // remove todo task from localstorage
       removeTodoFromLocalStorage(itemToBeDeleted);
       itemToBeDeleted.remove();
    }

    // mark task as completed
    if(itemClickedOn.classList[0] === "completed-button"){
        const completedItem = itemClickedOn.parentElement;
        // draw a line through the task as completed
        completedItem.classList.toggle("completed-task");
        // save the completed task in a different key in the localstorage
        archiveCompletedTodo(completedItem );
       // remove todo task from localstorage that has all the todos
       removeTodoFromLocalStorage(completedItem );
       // finally remove the completed task element from the UI
       completedItem.remove();
     }
}

function archiveCompletedTodo(todo){

    // check there is/are already todo in the localStorage
    let completedTodos;
    if(localStorage.getItem("completedtodos") === null){
        completedTodos = [];
    }else {
        completedTodos = JSON.parse(localStorage.getItem("completedtodos"));
    }
    const extractToDoValue = todo.children[0].innerText;
    completedTodos.push( extractToDoValue);
    localStorage.setItem("completedtodos", JSON.stringify(completedTodos));
}

function retrieveArchivedTodos(){
    archiveToDoDisplayCounts++;
    // first hide the user interface of the todo list
    shouldHideToDOList = true;
    hideToDoList();
    // check there is/are already todo in the localStorage
    let archivedTodos;
    if(localStorage.getItem("completedtodos") === null){
        archivedTodos = [];
    }else {
        archivedTodos = JSON.parse(localStorage.getItem("completedtodos"));
    }

    //get total number of elements with class .todo-archived
    let toDoArchivedElementLength = document.querySelectorAll('.todo-archived').length;
    // delete previous todoDiv before creating another if archiveToDoDisplayCounts greater then  1
    if (archiveToDoDisplayCounts > 1 && toDoArchivedElementLength > 0){
        let todoDiv;
        for(let i =0; i < toDoArchivedElementLength; i++){
            todoDiv = document.querySelector('.todo-archived');
            todoDiv.remove();  
         }
        }

    archivedTodos.forEach(archivedTodo => {
     //create todo div
    const archivedToDoDiv = document.createElement("div");
    archivedToDoDiv.classList.add("todo-archived");
    // create hs buttton to clear all archived todos
    //create li
    const newarchivedToDo = document.createElement("li");
    newarchivedToDo.innerText= archivedTodo;
    newarchivedToDo.classList.add("todo-list-archived");
    // append li inside the tododiv
    archivedToDoDiv.appendChild(newarchivedToDo);
    // create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete-button");
    //append delete button insie the tododiv
    archivedToDoDiv.appendChild(deleteButton);
    // finally append tododiv inside LIST ul
    archivedTodoList.appendChild(archivedToDoDiv);
    });

    //make archived todos container 
    archivedToDoContainer.style.visibility = "visible";
}

function saveTodo(todo){
    // check there is/are already todo in the localStorage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function retrieveTodos(){
    // check there is/are already todo in the localStorage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(todo => {
     //create todo div
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
    //create li
    const newToDo = document.createElement("li");
    newToDo.innerText=  todo;
    newToDo.classList.add("todo-list");
    // append li inside the tododiv
    toDoDiv.appendChild(newToDo);
    // create a completed task check button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("completed-button");
    //append completed button insie the tododiv
    toDoDiv.appendChild(completedButton);
    // create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
    deleteButton.classList.add("delete-button");
    //append delete button insie the tododiv
    toDoDiv.appendChild(deleteButton);
    // finally append tododiv inside LIST ul
    todoList.appendChild(toDoDiv);
    });
}

function removeTodoFromLocalStorage(todo){
     // check there is/are already todo in the localStorage
     let todos;
     if(localStorage.getItem("todos") === null){
         todos = [];
     }else {
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     const taskToBeRemovedFromLocalStorage = todo.children[0].innerText;
     const todoIndex = todos.indexOf(taskToBeRemovedFromLocalStorage);
     // now remove the task from the localStorage array
     todos.splice(todoIndex, 1);
     // set  the array todos back to the localstorage
     localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromArchivedToDoLocalStorage(completedTodo){
    // check there is/are already todo in the localStorage
    let completedToDos;
    if(localStorage.getItem("completedtodos") === null){
        completedToDos = [];
    }else {
        completedToDos = JSON.parse(localStorage.getItem("completedtodos"));
    }
    const taskToBeRemovedFromArchivedLocalStorage = completedTodo.children[0].innerText;
    const completedtodoIndex = completedToDos.indexOf(taskToBeRemovedFromArchivedLocalStorage);
    // now remove the task from the localStorage array
    completedToDos.splice(completedtodoIndex , 1);
    // set  the array todos back to the localstorage
    localStorage.setItem("completedtodos", JSON.stringify(completedToDos));
}

function toggleToDoList(){
    shouldHideToDOList = !shouldHideToDOList;
    // using ternary operator call hideToDOList function or showToDoList function
    shouldHideToDOList ? hideToDoList() : showToDoList() ;
}

function hideToDoList(){
    hideListButton.innerText = "show List";
    todoContainer.style.display= "none";
}

function showToDoList(){
    // first hide archivedTodolist
    hideArchivedToDoList();
    hideListButton.innerText = "hide List";
    todoContainer.style.display = "";
}

function hideArchivedToDoList(){
    archivedToDoContainer.style.visibility = "hidden";
}