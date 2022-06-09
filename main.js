function getCalendar(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function(){
        if(this.readyState !== 4) return;
        if(this.status == 200){
            console.log(xhr.responseText)
        } 
    }
    xhr.open("GET", "reader.php", true);
    xhr.send();
}

window.onload = function(){
    getCalendar();
}