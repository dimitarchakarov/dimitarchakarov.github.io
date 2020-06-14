let contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  fetch(contactForm.getAttribute("action"), {
    method: "POST",
    headers: {
      Accept: "application/x-www-form-urlencoded;charset=UTF-8",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(formData).toString(),
  }).then((res) => {
    if (res) {
      //do something visually
      let formContainer = document.querySelector("#contact-container");
      let h1 = document.querySelector("#contact-header");
      let newP = document.createElement("p");
      let backButton = document.createElement("a");
      let formBody = document.querySelector("#contact-form");

      h1.textContent = "Благодаря ви, че се свързахте с мен!";
      formBody.className = "display-none";
      formContainer.appendChild(newP);
      newP.textContent = "Ще Ви отговоря възможно най-скоро.";
      newP.className = "newP";
      formContainer.appendChild(backButton);
      backButton.textContent = "Начална Страница";
      backButton.className = "button newButton";
      backButton.href = "/";
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  });
});
