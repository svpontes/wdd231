// Set timestamp
document.getElementById('timestamp').value = new Date().toLocaleString();
    
// Open and close modal functions
function openModal(modalId) {
  document.getElementById(modalId).showModal();
}

function closeModal(modalId) {
  document.getElementById(modalId).close();
}

//timestamp

function gTime(){
  const date = new Date();
  const formattedDate = date.toLocaleString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
  })
  return formattedDate;
}

const timestamp = document.querySelector("#timestamp")
timestamp.value = gTime();