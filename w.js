document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const btnText = document.getElementById("btnText");
  const spinner = document.getElementById("spinner");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  const alertBox = document.getElementById("alertBox");

  function showAlert(message, type = "success") {
    alertBox.textContent = message;
    alertBox.className = `alert alert-${type} mt-3`;
    alertBox.classList.remove("d-none");

    setTimeout(() => {
      alertBox.classList.add("d-none");
    }, 20000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset errors
    nameInput.classList.remove("is-invalid");
    emailInput.classList.remove("is-invalid");
    messageInput.classList.remove("is-invalid");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    if (name === "") {
      nameError.textContent = "Please enter your name.";
      nameInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!validateEmail(email)) {
      emailError.textContent = "Enter a valid email address.";
      emailInput.classList.add("is-invalid");
      isValid = false;
    }

    if (message === "") {
      messageError.textContent = "Please enter your message.";
      messageInput.classList.add("is-invalid");
      isValid = false;
    }

    if (!isValid) return;

    // Show spinner
    submitBtn.disabled = true;
    btnText.classList.add("d-none");
    spinner.classList.remove("d-none");

    const params = {
      name: name,
      email_id: email,
      message: message,
    };

    emailjs
      .send("service_brnntdq", "template_4lbsidk", params)
      .then(() => {
        showAlert("Message sent successfully!", "success");
        form.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        showAlert("Failed to send message. Try again.", "danger");
      })
      .finally(() => {
        submitBtn.disabled = false;
        btnText.classList.remove("d-none");
        spinner.classList.add("d-none");
      });
  });
});