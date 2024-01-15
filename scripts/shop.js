const filterButton = document.querySelector('.filter-button');
const sidebar = document.querySelector('.sidebar');
const collapsibleHeader = document.querySelectorAll('.collapsible-header');
const filterCheckbox = document.querySelectorAll('.option');

filterButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

collapsibleHeader.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.toggle('open');
    });
});

filterCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        checkbox.classList.toggle('checked');
    });
});