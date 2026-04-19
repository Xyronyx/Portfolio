const texts = ["CS Student", "DSA Explorer", "Universe Enthusiast", "Future Engineer"];
let textIndex = 0;
let charIndex = 0;
const typing = document.querySelector(".typing");

function type() {
    if (charIndex < texts[textIndex].length) {
        typing.textContent += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 1500);
    }
}

function erase() {
    if (charIndex > 0) {
        typing.textContent = texts[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", type);

const sections = document.querySelectorAll(".section");
const progresses = document.querySelectorAll(".progress");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });

    progresses.forEach(bar => {
        if (bar.getBoundingClientRect().top < window.innerHeight - 100) {
            bar.style.width = bar.dataset.width;
        }
    });
});

const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});