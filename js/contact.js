document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const toast = document.querySelector(".toast");

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.querySelector("#name").value.trim();
    const email = form.querySelector("#email").value.trim();
    const message = form.querySelector("#message").value.trim();

    if(!name || !email || !message){
      showToast("Please fill all fields!");
      return;
    }

    // For demo, just show success toast
    showToast("Message sent successfully!");

    // Clear form
    form.reset();
  });

  function showToast(msg){
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(()=> toast.classList.remove("show"),2000);
  }
});
