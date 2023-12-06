startTest.addEventListener('click', startTypingTest);

document.addEventListener("copy", function (e) {
    e.preventDefault();
});

document.addEventListener("paste", function (e) {
    e.preventDefault();
});

document.querySelector("input").spellcheck = false;



