//Selectors  
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")



//Function 
const addTodo = (event)=>{
    console.log(event)
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    saveLocalStorageTodo(todoInput.value);

    todoDiv.innerHTML = 
    `<li class="todo-item"> ${todoInput.value} </li>
            <button class="complete-btn"><i class="fas fa-check-square"></i></button>
            <button class="complete-trash"><i class="fas fa-trash-alt"></i></button>
   `
    todoList.appendChild(todoDiv);
    todoInput.value = " ";
}

//Function 
const getTodo = ()=>{
    console.log("element");
    let todos;

    if(localStorage.getItem === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    todos.forEach(element => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        todoDiv.innerHTML = 
            `<li class="todo-item"> ${element} </li>
                    <button class="complete-btn"><i class="fas fa-check-square"></i></button>
                    <button class="complete-trash"><i class="fas fa-trash-alt"></i></button>
            `
        todoList.appendChild(todoDiv);
    });

    console.log(event)
    saveLocalStorageTodo(todoInput.value);   
}


const removeLocalTodo = (todo)=>{
    console.log("element");
    let todos;

    if(localStorage.getItem === null){
        todos =[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    const todoIndex = todo.children[0].innerText// innerText permet de récupérer le text entré dans l'enfant sélectionné 
    todos.splice( todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}



const deleteCheck = (e) =>{
    const item = e.target;
    if(item.classList[0] == 'complete-trash') {
       const todo =  item.parentElement;
       removeLocalTodo(todo);
       todo.classList.add('fall');
       todo.addEventListener("transitionend", ()=>todo.remove());
    }
    
    if(item.classList[0] == 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle("complete")
    }
}

const filterTodo = (e)=>{
    const todos = todoList.childNodes;
    console.log(todos);

    for(let i=1; i<todos.length; i++){
    // todos.forEach(function(todo){
        switch(e.target.value){
            case 'all' : 
                todos[i].style.display = "flex";
                break;
            case 'complete' :
                if(todos[i].classList.contains("complete")){
                    todos[i].style.display = "flex";
                }else{
                    todos[i].style.display = "none";
                }
                break;
            case 'uncomplete' :                 
                if(!todos[i].classList.contains("complete")){
                    todos[i].style.display = "flex";
                }else{
                    todos[i].style.display = "none";
                }
                break;
            default : break;

        }
    }    
}



function saveLocalStorageTodo(todo){

    //check do i already have things in there ? 
    let todos; 
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //ajouter les taches à la base de donnée 
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

}

//Event Listners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)
document.addEventListener('DOMContentLoaded', getTodo)
