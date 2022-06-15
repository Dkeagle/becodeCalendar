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
    dates.forEach(date => {
        let splitted = date.split("@@@");
        let box = document.createElement("div");
        let todayFlag = false;
        for(let i = 0; i < splitted.length; i++){
            let element = document.createElement("p");
            switch(i){
                case 0:
                    splitted[i] = splitted[i].split("-").reverse().join("/");
                    if(splitted[i] == today){
                        box.classList = "today";
                        element.innerHTML = "Today";
                        todayFlag = true;
                    }else{
                        element.innerHTML = splitted[i];
                    }
                    break;
                case 1:
                    if(!todayFlag){
                        if(splitted[i] == "Remote"){
                            box.classList = "remote";
                        }else if(splitted[i] == "On site"){
                            box.classList = "onsite";
                        }
                    }
                    element.innerHTML = splitted[i];
                    break;
                default:
                    let scrollBox = document.createElement("span");
                    scrollBox.innerHTML = splitted[i];
                    element.appendChild(scrollBox);
                    if(splitted[i].length > 30) element.classList = "scrollBox";
                    break;
            }
            box.appendChild(element);
            div.appendChild(box);
        }
    });
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