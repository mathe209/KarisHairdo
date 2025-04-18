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

//make the list dissapear based on the radio buttons
document.getElementById('jumbo').addEventListener("change", () => {
  const jumboList = document.getElementById("jumboList");
  const knotlessList = document.getElementById("knotlessList");
    
  jumboList.hidden = false;
  jumboList.disabled = false;
    
  knotlessList.hidden = true;
  knotlessList.disabled = true;
});
    
document.getElementById('knotless').addEventListener("change", () => {
  const jumboList = document.getElementById("jumboList");
  const knotlessList = document.getElementById("knotlessList");
    
  knotlessList.hidden = false;
  knotlessList.disabled = false;
    
  jumboList.hidden = true;
  jumboList.disabled = true;
});