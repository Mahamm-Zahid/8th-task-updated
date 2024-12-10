let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addButton = document.querySelector(".add-task");
const taskList = document.getElementById("task-list");

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    if (!task) return;

    const row = document.createElement("tr");

    if (task.completed) {
      row.classList.add("completed");
    }

    row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>
        <button class="update" onclick="updateTask(${task.id})">Update</button>
        <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
        <button class="complete" onclick="markAsCompleted(${task.id})">Completed</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

function addOrUpdateTask() {
  const title = titleInput.value;
  const description = descriptionInput.value;

  if (!title || !description) {
    alert("Title and Description are required");
    return;
  }

  if (addButton.textContent === "Update Task") {
    const taskId = addButton.getAttribute("data-id");
    tasks = tasks.map((task) => {
      if (task.id === Number(taskId)) {
        task.title = title;
        task.description = description;
      }
      return task;
    });
  } else {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    tasks.push(newTask);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();

  titleInput.value = "";
  descriptionInput.value = "";
  addButton.textContent = "Add Task";
  addButton.removeAttribute("data-id");
}

function updateTask(id) {
  const task = tasks.find((task) => task.id === id);
  if (!task) return;
  titleInput.value = task.title;
  descriptionInput.value = task.description;

  addButton.textContent = "Update Task";
  addButton.setAttribute("data-id", id);
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function markAsCompleted(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = true;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function clearInputs() {
  titleInput.value = "";
  descriptionInput.value = "";
}

addButton.addEventListener("click", addOrUpdateTask);
document.querySelector(".clear").addEventListener("click", clearInputs);

displayTasks();
