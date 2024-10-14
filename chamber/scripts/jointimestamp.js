// Set timestamp
document.getElementById('timestamp').value = new Date().toLocaleString();
    
// Open and close modal functions
function openModal(modalId) {
  document.getElementById(modalId).showModal();
}

function closeModal(modalId) {
  document.getElementById(modalId).close();
}