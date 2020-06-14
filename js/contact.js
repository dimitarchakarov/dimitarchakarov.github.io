const init = function () {
  document.getElementById("button-send").addEventListener("click", send);
};

let contactForm = document.querySelector("#contact-form");

// contactForm.addEventListener("submit", (e) => {
//   e.preventDefault();

const send = function (ev) {
  ev.preventDefault();
  ev.stopPropagation();
  //or the click will travel to the form and the form will submit
  let fails = validate();
  //IF we wanted to do some async things then use a Promise with .then and .catch
  if (fails.length === 0) {
    //good to go
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
  } else {
    //there are some errors to display
    //bad user
    //let err = document.querySelector('.error');
    //let input = err.querySelector('input');
    //err.setAttribute('data-errormsg', ` ... Missing ${input.placeholder}`);
    fails.forEach(function (obj) {
      let field = document.getElementById(obj.input);
      field.setAttribute("placeholder", obj.msg);
    });
  }
};
// });

const validate = function (ev) {
  //let valid = true;
  let failures = [];

  //inputs for text, email, tel, color, number...
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("message");
  //.value, .defaultValue, length of value
  if (name.value === "") {
    failures.push({ input: "name", msg: "Моля, въведете име" });
  }
  if (email.value === "") {
    failures.push({ input: "email", msg: "Моля, въведете email" });
  }
  if (message.value === "") {
    failures.push({ input: "message", msg: "Моля, въведете съобщение" });
  }

  //return a boolean || an object with details about the failures
  return failures;
};
document.addEventListener("DOMContentLoaded", init);
