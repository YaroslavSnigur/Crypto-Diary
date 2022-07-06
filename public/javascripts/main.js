let li_items = document.querySelectorAll(".sidebar ul li");
let hamburger = document.querySelector(".hamburger");
let wrapper = document.querySelector(".wrapper");

li_items.forEach((li_item) => {
  li_item.addEventListener("mouseenter", () => {
    li_item.closest(".wrapper").classList.remove("hover_collapse");
  });
});

li_items.forEach((li_item) => {
  li_item.addEventListener("mouseleave", () => {
    li_item.closest(".wrapper").classList.add("hover_collapse");
  });
});

hamburger.addEventListener("click", () => {
  hamburger.closest(".wrapper").classList.toggle("hover_collapse");
});
