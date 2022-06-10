/**
 * Return today's date formated to DD/MM/YYYY format
 */
function getTodayDate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    return "" + day + "/" + month + "/" + year;
}

/**
 * Create divs with elements gathered by the XHR request and append them to the main div
 * @param {array} dates 
 * @param {string} lastUpdate 
 * @param {objectHTMLelement} div
 */
function generateHTML(dates, lastUpdate, div){
    let today = getTodayDate();
    // Append the last update date to the div in the header
    let updateDiv = document.getElementById("lastUpdate");
    updateDiv.innerHTML = lastUpdate;
    // Create div element with each date
    for(let i = 0; i < dates.length; i++){
        // Create the elements
        let box = document.createElement("div");
        let date = document.createElement("p");
        let text = document.createElement("p");
        // Add text and date to elements
        date.innerHTML = dates[i].substring(0, dates[i].indexOf(" "));
        text.innerHTML = dates[i].substring(dates[i].indexOf(" ") + 1);
        // Replace dashes in date with spaces and format date
        date.innerHTML = date.innerHTML.split("-").reverse().join("/");
        // Add classes depending to the content
        if (text.innerHTML == "On site") box.classList = "onsite";
        if (text.innerHTML == "Remote") box.classList = "remote";
        if (date.innerHTML == today){
            box.classList = "today";
            date.innerHTML = "Today";
        } 
        // Appends the elements to the main div
        box.appendChild(date);
        box.appendChild(text);
        div.appendChild(box);
    }
}

/**
 * Convert XHR response to array, more easy to generate HTML with
 * @param {string} dates 
 * @param {objectHTMLelement} div
 */
function handleResponse(dates, div){
    dates = dates.split("\n");
    // Remove last element from array as it's an empty line
    dates.pop();
    // Pop lastUpdate date to a variable
    let lastUpdate = dates.pop();
    
    generateHTML(dates, lastUpdate, div);
}

/**
 * XHR request to get dates and send them to response handler
 * @param {objectHTMLelement} div 
 */
function getCalendar(div){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState !== 4) return;
        if(this.status == 200){
            handleResponse(xhr.responseText, div);
        } 
    };
    xhr.open("GET", "reader.php", true);
    xhr.send();
}

/**
 * Main function, starting when the window is loaded
 */
window.onload = function(){
    let mainDiv = document.getElementById("main");
    
    getCalendar(mainDiv);
}