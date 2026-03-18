function darkModus() {
  document.body.classList.toggle("dark");
    let darkModusButton = document.getElementById("theme");
    if (darkModusButton) {
        darkModusButton.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    }
}

let sidebar = document.getElementById("sidebar");
let sidebarButtonOpen = document.getElementById("sidebarButtonOpen");
let sidebarButtonClose = document.getElementById("sidebarButtonClose");
let advancedSettings = document.getElementById("advancedSettings")
let advancedSettingsButton = document.getElementById("advancedSettingsButton")


sidebarButtonOpen.addEventListener("click", () => {
  sidebar.classList.toggle("show");
});

sidebarButtonClose.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

advancedSettingsButton.addEventListener("click", () => {
  advancedSettings.classList.toggle("show");
});





function addTask() {
    let input = document.getElementById("inputField").value;
    console.log(input)
}