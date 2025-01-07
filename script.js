document.getElementById("menu-btn").addEventListener("click", function () {
    const navLinks = document.querySelector(".nav-links");
    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
        navLinks.style.position = "absolute"; // Ensures dropdown stays separate
    }
});
