/*dark mode*/
function darkModus() {
  document.body.classList.toggle("dark");
  let darkModusButton = document.getElementById("theme");
  if (darkModusButton) {
    darkModusButton.textContent = document.body.classList.contains("dark")
      ? "☀️"
      : "🌙";
  }
}

/* buttons event listener */

let sidebar = document.getElementById("sidebar");
let sidebarButtonOpen = document.getElementById("sidebarButtonOpen");
let sidebarButtonClose = document.getElementById("sidebarButtonClose");
let advancedSettings = document.getElementById("advancedSettings");
let advancedSettingsButton = document.getElementById("advancedSettingsButton");

sidebarButtonOpen.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

sidebarButtonClose.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

advancedSettingsButton.addEventListener("click", () => {
  advancedSettings.classList.toggle("show");
});

/* adding tasks */
let container = document.getElementById("container");
let tasks = [];

function addTask() {
  let taskDescription = document.getElementById("discriptionField").value;
  let input = document.getElementById("inputField").value;
  let priorityCheck = document.getElementById("priorityCheck").checked;
  let dateNow = Date.now();

  let taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
          <div class="main-task-container" data-set>
            <div class="svg" id="svg"></div>
            <h4>${input}</h4>
            <select name="status" id="taskStatus">
                <option value="done" ${tasks.status === "done" ? "selected" : ""}>Done</option>
                <option value="inProgress" ${tasks.status === "inProgress" ? "selected" : ""}>In Progress</option>
                <option value="notDone" ${tasks.status === "notDone" ? "selected" : ""} selected >Not Done</option>
                
            </select>
            <button class="task-delete" id="taskDelete" onclick="deleteTask(this)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="currentColor"/>
              </svg>
            </button>
            
        </div>
        <div><h5 class="discripton">${taskDescription}</h5>`;

  let select = taskElement.querySelector("select");
  let h4 = taskElement.querySelector("h4");
  select.addEventListener("change", function () {
  let status = select.value;
  h4.classList.remove("done", "inprogress", "not-done");
  if (status === "done") {
    h4.classList.add("done");
  } else if (status === "inProgress") {
    h4.classList.add("inprogress");
  } else if (status === "notDone") {
    h4.classList.add("not-done");
  }

  let task = tasks.find((t) => t.id === dateNow);
    task.status = select.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCounters()
});

  /* addind an id for eachtask */
  taskElement.dataset.numberId = dateNow;

  let highPriority = taskElement.querySelector("#svg");

  if (priorityCheck) {
    highPriority.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211Z" fill="#ff0000"></path> <path d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z" fill="#ff0000"></path> <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#ff0000"></path> </g></svg>`;
  }

  tasks.push({
    id: dateNow,
    title: input,
    priority: priorityCheck,
    discription: taskDescription,
    status: select.value,
  });

  select.addEventListener("change", function () {
    let task = tasks.find((t) => t.id === dateNow);
    task.status = select.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCounters()
  });

  localStorage.setItem("tasks", JSON.stringify(tasks))

  container.appendChild(taskElement);
  updateCounters()
}

/* RenderingTasks */

function renderTask(task) {
  let taskDescription = task.discription;
  let input = task.title;
  let priorityCheck = task.priority;
  let dateNow = task.id;
  let status = task.status
  console.log("renderTask fired!");

  let taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
          <div class="main-task-container" data-set>
            <div class="svg" id="svg"></div>
            <h4>${input}</h4>
            <select name="status" id="status">
                <option value="done" ${task.status === "done" ? "selected" : ""}>Done</option>
                <option value="inProgress" ${task.status === "inProgress" ? "selected" : ""}>In Progress</option>
                <option value="notDone" ${task.status === "notDone" ? "selected" : ""}>Not Done</option>
                
            </select>
            <button class="task-delete" id="taskDelete" onclick="deleteTask(this)">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="currentColor"/>
              </svg>
            </button>
            
        </div>
        <div><h5 class="discripton">${taskDescription}</h5>`;

  let select = taskElement.querySelector("select");
  let h4 = taskElement.querySelector("h4");

  /* addind an id for eachtask */
  taskElement.dataset.numberId = dateNow;

  let highPriority = taskElement.querySelector("#svg");

  if (priorityCheck) {
    highPriority.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211Z" fill="#ff0000"></path> <path d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z" fill="#ff0000"></path> <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#ff0000"></path> </g></svg>`;
  }

h4.classList.remove("done", "inprogress", "not-done");
if (status === "done") h4.classList.add("done");
else if (status === "inProgress") h4.classList.add("inprogress");
else if (status === "notDone") h4.classList.add("not-done");

  select.addEventListener("change", function () {
  let status = select.value;
  h4.classList.remove("done", "inprogress", "not-done");
  if (status === "done") {
    h4.classList.add("done");
  } else if (status === "inProgress") {
    h4.classList.add("inprogress");
  } else if (status === "notDone") {
    h4.classList.add("not-done");
  }

  let task = tasks.find((t) => t.id === dateNow);
    task.status = select.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCounters()
});

  container.appendChild(taskElement);
  updateCounters()
}

function deleteTask(button) {
  let taskElement = button.closest('.task');
  let id = Number(taskElement.dataset.numberId);
  tasks = tasks.filter(t => t.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  taskElement.remove();
  updateCounters()
}

function updateCounters() {
  document.getElementById('totalNumber').textContent = tasks.length;
  document.getElementById('inProgressNumber').textContent = tasks.filter(t => t.status === 'inProgress').length;
  document.getElementById('doneNumber').textContent = tasks.filter(t => t.status === 'done').length;
}

function checkInput() {
  let input = document.getElementById("inputField").value;
  if (input === "") {
    Swal.fire({
      title: " Something is missing !",
      text: "No task name added",
      icon: "error",
    });
  } else {
    addTask(input);
    document.getElementById("inputField").value = "";
    document.getElementById("discriptionField").value = "";
    advancedSettings.classList.remove("show");
    document.getElementById("priorityCheck").checked = false;
  }
}

function filterTasks(status) {
  let filtered = tasks.filter(task => task.status === status);
  container.innerHTML = '';
  filtered.forEach(task => renderTask(task));
}

function highPriorityTasks() {
  let filtered = tasks.filter(task => task.priority === true);
  container.innerHTML = '';
  filtered.forEach(task => renderTask(task));
}

function showAll() {
  container.innerHTML = '';
  tasks.forEach(task => renderTask(task));
}

function setActiveFilter(btn) {
  document.querySelectorAll('.sidebar-nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

let completedTasksButton = document.getElementById("completedTasks")
let TasksInProgress = document.getElementById("TasksInProgress")
let notCompletedTasks = document.getElementById("notCompletedTasks")
let allTasks = document.getElementById("allTasks")
let highPriorityfilter = document.getElementById("highPriorityfilter")

completedTasksButton.addEventListener("click", function(){
  setActiveFilter(this);
  filterTasks("done");
  sidebar.classList.remove("show");
})

TasksInProgress.addEventListener("click", function(){
  setActiveFilter(this);
  filterTasks("inProgress");
  sidebar.classList.remove("show");
})

notCompletedTasks.addEventListener("click", function(){
  setActiveFilter(this);
  filterTasks("notDone");
  sidebar.classList.remove("show");
})
allTasks.addEventListener("click", function(){
  setActiveFilter(this);
  showAll();
  sidebar.classList.remove("show");
})

highPriorityfilter.addEventListener("click", function(){
  setActiveFilter(this);
  highPriorityTasks();
  sidebar.classList.remove("show");
})

document.getElementById("inputField").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    checkInput();
  }
});

let deleteAllButton = document.getElementById("deleteAllButton")

deleteAllButton.addEventListener("click", function () {
  localStorage.clear();
  let elements = document.querySelectorAll(".task");
  elements.forEach(function (element) {
    element.remove();
  });
  location.reload();
});

function onPageLoad() {
  let saved = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = saved;
  saved.forEach((task) => renderTask(task));
  updateCounters()
}



window.onload = onPageLoad;



