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
let container = document.getElementById("container")


function addTask() {
  let taskDescription = document.getElementById("discriptionField").value;
  let input = document.getElementById("inputField").value;
  let priorityCheck = document.getElementById('priorityCheck').checked;
  let dateNow = Date.now();

  let taskElement = document.createElement("div");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
          <div class="main-task-container" data-set>
            <div class="svg" id="svg"></div>
            <h4>${input}</h4>
            <select name="status" id="status">
                <option value="done">Done</option>
                <option value="inProgress">In Progress</option>
                <option value="notDone">Not Done</option>
                
            </select>
            <button class="task-delete" id="taskDelete" onclick="this.closest('.task').remove()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.207 6.207a1 1 0 0 0-1.414-1.414L12 10.586 6.207 4.793a1 1 0 0 0-1.414 1.414L10.586 12l-5.793 5.793a1 1 0 1 0 1.414 1.414L12 13.414l5.793 5.793a1 1 0 0 0 1.414-1.414L13.414 12l5.793-5.793z" fill="currentColor"/>
              </svg>
            </button>
            
        </div>
        <div><h5 class="discripton">${taskDescription}</h5>`;
        /* addind an id for eachtask */
        taskElement.dataset.numberId = dateNow;

        let highPriority = taskElement.querySelector("#svg")

        if (priorityCheck){

          highPriority.innerHTML = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M16.1569 3.80211L16.8431 4.20846C18.8718 5.40987 19.8862 6.01057 20.4431 7C21 7.98943 21 9.19084 21 11.5937V12.4063C21 14.8092 21 16.0106 20.4431 17C19.8862 17.9894 18.8718 18.5901 16.8431 19.7915L16.1569 20.1979C14.1282 21.3993 13.1138 22 12 22C10.8862 22 9.8718 21.3993 7.84308 20.1979L7.15692 19.7915C5.1282 18.5901 4.11384 17.9894 3.55692 17C3 16.0106 3 14.8092 3 12.4063V11.5937C3 9.19084 3 7.98943 3.55692 7C4.11384 6.01057 5.1282 5.40987 7.15692 4.20846L7.84308 3.80211C9.8718 2.6007 10.8862 2 12 2C13.1138 2 14.1282 2.6007 16.1569 3.80211Z" fill="#ff0000"></path> <path d="M12 6.25C12.4142 6.25 12.75 6.58579 12.75 7V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V7C11.25 6.58579 11.5858 6.25 12 6.25Z" fill="#ff0000"></path> <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#ff0000"></path> </g></svg>`;
        }

        document.getElementById('priorityCheck').checked = false;

        taskDescription.value = ""
        
  container.appendChild(taskElement);
}

function ship() {
  checkInput();
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
  }
}