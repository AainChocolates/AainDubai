document.addEventListener("DOMContentLoaded", () => {
  const titleCard = document.getElementById("title-card");
  const modal = document.getElementById("about-modal");
  const modalImg = document.querySelector(".modal-img");
  const modalH3 = document.querySelector(".modal-content h3");
  const modalP = document.querySelector(".modal-content p");
  const modalClose = document.querySelector(".modal-close");
  const body = document.body;

  // Hide title card after delay
  setTimeout(() => { titleCard.style.display = "none"; }, 4500);

  // About Cards Expand
  const aboutCards = document.querySelectorAll(".about-card");
  aboutCards.forEach(card => {
    card.addEventListener("click", () => {
      const imgSrc = card.querySelector("img").src;
      const title = card.querySelector("h3").innerText;
      const fullText = card.dataset.full;

      modalImg.src = imgSrc;
      modalH3.textContent = title;
      modalP.textContent = fullText;

      modal.classList.remove("hidden");
      body.classList.add("modal-open"); // blur background
      setTimeout(() => modal.querySelector(".modal-card").style.transform = "scale(1)", 10);
    });
  });

  // Close modal
  function closeModal() {
    modal.querySelector(".modal-card").style.transform = "scale(0.8)";
    setTimeout(() => {
      modal.classList.add("hidden");
      body.classList.remove("modal-open"); // remove background blur
    }, 200);
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
});
