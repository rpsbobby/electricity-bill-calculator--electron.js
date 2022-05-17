const { ipcRenderer } = require('electron');
const form = document.getElementById('form');
const units = document.getElementById('units');
const days = document.getElementById('days');
const beforeField = document.getElementById('beforeVAT');
const afterField = document.getElementById('afterVAT');

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

 ipcRenderer.on('send:calculations', (e, args) => {
    const { beforeVAT, afterVAT } = JSON.parse(args);
    updateFields(beforeVAT, afterVAT);
 });

 const clearFields = () => {
    units.value = '';
    days.value = '';
 };
 
 const updateFields = (before, after) => {
    beforeField.innerHTML = `€${before.toFixed(2)}`;
    afterField.innerHTML = `€${after.toFixed(2)}`;
 };
 
 

