/* JS datant de la démo de Jkantner https://codepen.io/jkantner/pen/KQPdXK */
/* je ne comprend (presque) RIEN au javascript */

window.addEventListener("scroll", scrollGrid);

if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
  window.addEventListener("wheel", noShakeScroll);}

else if (/Edge/.test(navigator.userAgent)) {
  window.addEventListener("wheel", noShakeScroll);
}
else {
window.addEventListener("scroll", noShakeScroll); }

function scrollGrid() {
  let transY = window.pageYOffset,
    cards = document.querySelector(".cards");

  cards.style.setProperty("--scroll", transY + "px");

}
scrollGrid();
/* Without this, the `items` div erratically shakes while scrolling with wheel or touchpad. The issue still persists in Safari though… */
function noShakeScroll(e) {
  this.scrollBy(0, e.deltaY);
  e.preventDefault();
}
//fin js démo

let evtLocker = 0;

/* permet de fermer spécifiquement la fenetre de présentation qui utilise un ancien système moins optimisé que les autres fenêtres de projets */
document.querySelector("#nom").onclick = (evt) => {
  evtLocker = evt.timeStamp // Has priority over other evt handlers
  document.querySelector("#quisuisje").classList.add("appearqsj")
}

document.querySelector(".closingX13").onclick = (evt) => {
  evtLocker = evt.timeStamp
  document.querySelector("#quisuisje").classList.remove("appearqsj")
}

//je sais vraiment pas
var $stickyBlock = document.querySelector('.cards');
var origOffsetY = $stickyBlock.offsetTop - 15; // 15 is your top margin

//gère aussi le scroll mais date pas de la démo...
function onScroll() {
  window.scrollY >= origOffsetY ? $stickyBlock.classList.add('sticky') :
    $stickyBlock.classList.remove('sticky');
}

document.addEventListener('scroll', onScroll);

// système optimisé pour associer chaque fenêtre détaillée a sa vignette 
function showZoom(zoomId) {
	document.querySelector(`#${zoomId}`).classList.add("appear");
}

function hideZoom(zoomId) {
	document.querySelector(`#${zoomId}`).classList.remove("appear");
}
//gère les diaporamas
function showSlide(slideNumber, slideWrapper) {
	const possibleSlideClasses = ["slide1", "slide2", "slide3", "slide4"];
	possibleSlideClasses.forEach(className => slideWrapper.classList.remove(className));
	
	slideWrapper.classList.add(`slide${slideNumber}`);

}

document.querySelectorAll(".zoom-trigger").forEach((trigger) => {
	const zoomId = trigger.dataset.id;
	trigger.addEventListener("click", showZoom.bind(this, zoomId));
});
//gère la fermeture des fenêtres
document.querySelectorAll(".close-button").forEach((button) => {
	const zoomId = button.closest(".zoom").id;
	button.addEventListener("click", hideZoom.bind(this, zoomId));
	
});
//gère les boutons des diapos ?
document.querySelectorAll(".slide-show-button").forEach((button) => {
	const slideNumber = button.dataset.type;
	const slideWrapper = button.closest("#projets").querySelector(".slide-wrapper");
	
	button.addEventListener("click", showSlide.bind(this, slideNumber, slideWrapper));
});