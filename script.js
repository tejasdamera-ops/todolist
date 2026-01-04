document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const button = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let array = JSON.parse(localStorage.getItem("tasks")) || [];

  array.forEach((task) => {
    render(task);
  });

  button.addEventListener("click", () => {
    let input = todoInput.value.trim();
    if (input === "") return;

    const newTask = {
      id: Date.now(),
      completed: false,
      text: input,
    };
    array.push(newTask);
    saveToLocalStorage();
    render(newTask);
    todoInput.value = "";
  });

  function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(array));
  }

  function render(tasks) {
    const li = document.createElement("li");
    li.setAttribute("data-id", tasks.id);
    li.innerHTML = `
    <span>${tasks.text}</span>
    <button>delete</button>`;
    todoList.appendChild(li);

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        e.stopPropagation();
        li.remove();
        array = array.filter((item) => item.id !== tasks.id);
        saveToLocalStorage();
      } else {
        tasks.completed = !tasks.completed;
        li.classList.toggle("completed");
      }
    });
  }
});
