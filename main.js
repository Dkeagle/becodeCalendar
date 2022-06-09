function getCalendar(){
    let promise = new Promise(function(success, error){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange=function(){
            if(this.readyState !== 4) return;
            if(this.status == 200) return console.log(xhr.responseText)
        }
        xhr.open("GET", "reader.php", true);
        xhr.send();
    }.bind(this));
}

window.onload = function(){
    getCalendar();
}