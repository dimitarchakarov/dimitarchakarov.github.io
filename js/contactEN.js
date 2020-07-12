const init = function () {
  document.getElementById("button-send").addEventListener("click", send);
};

let contactForm = document.querySelector("#contact-form");
let invalidMailError = document.createElement("p");

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

        h1.textContent = "Thank you for contacting me";
        formBody.className = "display-none";
        formContainer.appendChild(newP);
        newP.textContent = "I will get back to you as soon as possible.";
        newP.className = "newP";
        formContainer.appendChild(backButton);
        backButton.textContent = "To Home";
        backButton.className = "button newButton";
        backButton.href = "/en/";
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
  let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let message = document.getElementById("message");
  //.value, .defaultValue, length of value
  if (name.value === "") {
    failures.push({ input: "name", msg: "Please enter your name" });
  }
  if (email.value === "") {
    failures.push({ input: "email", msg: "Please enter an email" });
  } else {
    if (!email.value.match(pattern)) {
      failures.push({ input: "email", msg: "Invalid email" });
      let mailContainer = document.querySelector("#mail-container");
      // let invalidMailError = document.createElement("p");
      mailContainer.appendChild(invalidMailError);
      invalidMailError.textContent = "Invalid email";
      invalidMailError.className = "red";
    }
  }

  if (message.value === "") {
    failures.push({ input: "message", msg: "Please enter a message" });
  }

  //return a boolean || an object with details about the failures
  return failures;
};

const mailFocus = document.querySelector("#email");

mailFocus.addEventListener("focus", (event) => {
  invalidMailError.className = "display-none";
});

document.addEventListener("DOMContentLoaded", init);
