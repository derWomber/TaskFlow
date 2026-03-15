let sidebar = document.getElementById('sidebar');
let sidebarButtonOpen = document.getElementById('sidebarButtonOpen');
let sidebarButtonClose = document.getElementById('sidebarButtonClose');

sidebarButtonOpen.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

sidebarButtonClose.addEventListener('click', () => {
  sidebar.classList.remove('show');
});