/* Открыть боковую навигацию */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("openButton").hidden = true;
}

/* закрыть/скрыть боковую навигацию */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("openButton").hidden = false;
}
