const { ipcRenderer } = require('electron');
const form = document.getElementById('form');
const units = document.getElementById('units');
const days = document.getElementById('days');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Validate input is true by default, if value cannot be converted to number or is 0, will return false.
    if (validateInput()) {
       ipcRenderer.send(
          'send:data',
          JSON.stringify({ days: days.value, units: units.value })
       );
    } else {
       // display error message
       displayError();
    }
    // clear input fields
    clearFields();
 });

