const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

let todos = [];

document.addEventListener("DOMContentLoaded", getTodosFromMemory);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

function saveTodoToMemory(todo) {
  const newTodo = { id: Date.now(), title: todo, completed: false };
  todos.push(newTodo);
  console.log("Todo saved to memory:", newTodo);
}

function getTodosFromMemory() {
  todos.forEach((todo) => {
    const todoDiv = createTodoElement(todo.id, todo.title, todo.completed);
    todoList.appendChild(todoDiv);
  });
}

function removeTodoFromMemory(todoId) {
  todos = todos.filter((todo) => todo.id !== todoId);
  console.log("Todo deleted from memory:", todoId);
}

function updateTodoInMemory(todoId, completed) {
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.completed = completed;
    console.log("Todo updated in memory:", todo);
  }
}

function addTodo(event) {
  event.preventDefault();

  const todoText = todoInput.value.trim();

  if (todoText === "") return;

  saveTodoToMemory(todoText);

  const todoDiv = createTodoElement(Date.now(), todoText, false);
  todoList.appendChild(todoDiv);

  todoInput.value = "";
}

function createTodoElement(id, todoText, completed) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.dataset.id = id;

  const newTodo = document.createElement("li");
  newTodo.innerText = todoText;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  if (completed) {
    todoDiv.classList.add("completed");
  }

  return todoDiv;
}

function deleteCheck(e) {
  const item = e.target;

  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    const todoId = parseInt(todo.dataset.id, 10);

    todo.classList.add("fall");
    removeTodoFromMemory(todoId);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    const todoId = parseInt(todo.dataset.id, 10);

    todo.classList.toggle("completed");
    updateTodoInMemory(todoId, todo.classList.contains("completed"));
  }
}
