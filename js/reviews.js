document.addEventListener("DOMContentLoaded", () => {
  const leaveBtn = document.querySelector(".leave-review-btn");
  const popup = document.querySelector(".review-popup");
  const closeBtn = document.querySelector(".review-close");
  const submitBtn = document.querySelector(".submit-review-btn");
  const reviewsGrid = document.querySelector(".reviews-grid");
  const toast = document.querySelector(".toast");

  // Show popup
  leaveBtn.addEventListener("click", () => popup.classList.remove("hidden"));
  closeBtn.addEventListener("click", () => popup.classList.add("hidden"));

  // Submit review
  submitBtn.addEventListener("click", () => {
    const name = document.getElementById("reviewer-name").value.trim();
    const rating = document.getElementById("review-rating").value;
    const text = document.getElementById("review-text").value.trim();
    const fileInput = document.getElementById("review-file");
    const fileName = fileInput.files[0] ? fileInput.files[0].name : null;

    if(!name || !rating || !text){
      showToast("Please fill all fields");
      return;
    }

    // Create review card
    const card = document.createElement("div");
    card.classList.add("review-card");
    card.innerHTML = `
      <div class="review-stars">${rating}</div>
      <h4 class="reviewer-name">${name}</h4>
      <p class="review-text">${text}</p>
      ${fileName ? `<p style="font-size:.85rem; color:#999;">File: ${fileName}</p>` : ""}
    `;
    reviewsGrid.prepend(card);

    // Clear inputs
    document.getElementById("reviewer-name").value = "";
    document.getElementById("review-rating").value = "";
    document.getElementById("review-text").value = "";
    fileInput.value = "";

    popup.classList.add("hidden");
    showToast("Review added successfully!");
  });

  function showToast(msg){
    toast.innerText = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  }
});
