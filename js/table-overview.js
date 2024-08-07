
const statusDiv = document.createElement('div');
statusDiv.id = 'status';


const statusHeader = document.createElement('h3');

statusHeader.textContent = 'Status';

// Step 5: Append the h3 to the div
statusDiv.appendChild(statusHeader);

// Step 6: Append the div to the main element
document.querySelector('main').appendChild(statusDiv);
