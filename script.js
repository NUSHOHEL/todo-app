document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todoForm");
  const input = document.getElementById("input");
  const todoContainer = document.getElementById("todoContainer");

  function generateUniqueId() {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  function renderTasks() {
    const todos = JSON.parse(localStorage.getItem("todo")) || [];
    for (let i = 0; i < todos.length; i++) {
      const todoList = document.createElement("div");
      todoList.className = "todoList";

      const taskList = document.createElement("input");
      taskList.type = "checkbox";
      taskList.className = "inputField";
      taskList.id = `${todos[i].id}`;
      taskList.checked = todos[i].completed;

      taskList.addEventListener("change", () => {
        todos[i].completed = !todos[i].completed;
        localStorage.setItem("todo", JSON.stringify(todos));
        taskLabel.classList.toggle("complete", todos[i].completed);
      });

      const taskLabel = document.createElement("label");
      taskLabel.className = "label";
      taskLabel.htmlFor = `${todos[i].id}`;
      taskLabel.textContent = todos[i].task;
      taskLabel.classList.toggle("complete", todos[i].completed);
      const button = document.createElement("button");
      button.className = "deleteIcon";

      button.addEventListener("click", () => {
        todos.splice(i, 1);
        localStorage.setItem("todo", JSON.stringify(todos));
        todoList.remove();
      });

      todoList.append(taskList, taskLabel, button);
      todoContainer.append(todoList);
    }
  }

  form.addEventListener("submit", function (e) {
    const todo = {
      id: generateUniqueId(),
      task: input.value,
      completed: false,
    };
    e.preventDefault();

    let data = JSON.parse(localStorage.getItem("todo")) || [];
    data.push(todo);
    localStorage.setItem("todo", JSON.stringify(data));

    todoContainer.innerHTML = "";

    renderTasks();
  });

  renderTasks();
});
