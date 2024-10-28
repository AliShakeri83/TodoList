let inputElem = document.querySelector('#itemInput')
let btnAdd = document.querySelector('#addButton')
let btnDel = document.querySelector('#clearButton')
let ulElemm = document.querySelector('#todoList')

let todosArrey = []

function addNewTodo() {
    
    let newTodoTitle = inputElem.value
    
    let newTodoObj = {
        id: todosArrey.length + 1, 
        title: newTodoTitle , 
        complete : false
    }

    inputElem.value = ''
    
    todosArrey.push(newTodoObj)
    
    setlocalstorage(todosArrey)
    todosGeneraitor(todosArrey)

    inputElem.focus()
    
}


function setlocalstorage(todosArrey) {
    localStorage.setItem('todos', JSON.stringify(todosArrey))
}

function todosGeneraitor(todosArrey) {
    ulElemm.innerHTML = ''

    let newTodoLiElem, newTodoLableElem, newTodoCompletebtn, newTodoDeletBtn;

    todosArrey.forEach(todo => {
        newTodoLiElem = document.createElement('li')
        newTodoLiElem.className = 'completed well'

        newTodoLableElem = document.createElement('lable')
        newTodoLableElem.innerHTML = todo.title

        newTodoCompletebtn = document.createElement('button')
        newTodoCompletebtn.className = 'btn btn-success'
        newTodoCompletebtn.innerHTML = 'Complete'
        
        newTodoCompletebtn.setAttribute('onclick', 'editTodo(' + todo.id + ')')
        
        
        newTodoDeletBtn = document.createElement('button')
        newTodoDeletBtn.className = 'btn btn-danger'
        newTodoDeletBtn.innerHTML = 'Delete'
        
        newTodoDeletBtn.setAttribute('onclick', 'removeTodo(' + todo.id + ')')
        
        
        newTodoLiElem.append(newTodoLableElem,newTodoCompletebtn,newTodoDeletBtn)
        ulElemm.append(newTodoLiElem)
        
        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoLiElem.style.backgroundColor = 'green'
            newTodoCompletebtn.innerHTML = 'UnComplete'
        }
        
    });   
}

function editTodo(todoiId) {
    
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArrey = localStorageTodos

    todosArrey.forEach(function (todo) {
        if (todo.id === todoiId) {
            todo.complete = !todo.complete
        }
    })
    setlocalstorage(todosArrey)
    todosGeneraitor(todosArrey)
}

function removeTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArrey = localStorageTodos

    let maintodoindex = todosArrey.findIndex(function (todo) {
        return todo.id === todoId
    })
    
    todosArrey.splice(maintodoindex , 1)

    console.log(todosArrey);
    
    setlocalstorage(todosArrey)

    todosGeneraitor(todosArrey)
    
}

function getLocalStorage() {
    let localStorageTodo = JSON.parse(localStorage.getItem('todos'))
    
    if (localStorageTodo) {
        todosArrey = localStorageTodo
        console.log(todosArrey);
    } else {
        todosArrey = []
    }
    
    todosGeneraitor(todosArrey)
}

function clearTodos() {
    todosArrey = [] 
    ulElemm.innerHTML = ''
    todosGeneraitor(todosArrey)
    // localStorage.clear()
    localStorage.removeItem('todos')
}

function keyborardEnter(event) {
    if (event.keyCode === 13) {
        addNewTodo()
    }
    
}

window.addEventListener('load', getLocalStorage)
btnAdd.addEventListener('click', addNewTodo)
btnDel.addEventListener('click', clearTodos)
inputElem.addEventListener('keydown', keyborardEnter)