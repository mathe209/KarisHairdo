const bookedDates = [];

async function fetchBookedDates() {
  const res = await fetch("http://127.0.0.1:8000/booked-dates");
  const dates = await res.json();
    bookedDates.push(...dates.map(d => d.date.split("T")[0]));
}

async function setupDatePicker() {
  await fetchBookedDates();
  flatpickr("#bookingDate", {
    dateFormat: "Y-m-d",
    disable: bookedDates,
    minDate: "today",
    allowInput: false
  });
}
window.addEventListener('DOMContentLoaded', setupDatePicker);
console.log(bookedDates)

document.getElementById("bookingForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target; //gets the submitted form
  const formData = new FormData(form); //turn that form into a key-value pair, like a dictionary
  const data = Object.fromEntries(formData); //turns the key value-pair into a js object
  console.log(data)
  const res = await fetch("http://127.0.0.1:8000/book", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  console.log(result);

  if (res.ok) {
    alert("Booking successful!");
    form.reset();
    setupDatePicker(); // refresh booked dates
  }else{
    alert("Booking failed.");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const radios = {
    "knotless": "knotlessList",
    "criss-cross-marley-twist": "criss-cross-list",
    "butterfly-locs": "butterfly-list",
    "french-curls": "french-curls-list",
    "invisible-locs": "invisible-locs-list",
    "mermaid-braids": "mermaids-list",
    "goddess-twists": "goddess-twist-list",
    "soft-locs-curls": "soft-locs-list",
    "goddess-knotless": "goddess-knotless-list",
    "small-curly-pops": "small-curly-pops-list",
    "river-locs": "river-locs-list"
  };

  Object.keys(radios).forEach((radioId) => {
    const radioButton = document.getElementById(radioId);
    if (!radioButton) {
      console.warn(`Radio button with ID '${radioId}' not found.`);
      return;
    }

    radioButton.addEventListener("change", () => {
      // Hide all other select lists
      Object.values(radios).forEach((listId) => {
        const list = document.getElementById(listId);
        if (list) {
          list.hidden = true;
          list.disabled = true;
        }
      });

      // Show the selected one
      const listId = radios[radioId];
      const selectedList = document.getElementById(listId);
      if (selectedList) {
        selectedList.hidden = false;
        selectedList.disabled = false;
      }
    });
  });
});
