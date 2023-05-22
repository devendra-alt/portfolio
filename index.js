const menuBtn = document.getElementById("menu-i");
const closeBtn = document.getElementById("menu-i-close");
const mobileMenu = document.querySelector("#mobile-nav");
const menuItems = document.querySelectorAll("#mobile-nav ul li");
const openMenu = () => mobileMenu.classList.add("open-side-menu");
const closeMenu = () => mobileMenu.classList.remove("open-side-menu");
menuItems.forEach((el) => {
  el.addEventListener("click", () => closeMenu());
});
menuBtn.addEventListener("click", () => openMenu());
closeBtn.addEventListener("click", () => closeMenu());
