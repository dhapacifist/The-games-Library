
const statusDiv = document.createElement('div');
statusDiv.id = 'status';


const statusHeader = document.createElement('h3');

statusHeader.textContent = 'Status';

statusDiv.appendChild(statusHeader);

document.querySelector('main').appendChild(statusDiv);
