/*var xhr = new XMLHttpRequest();
xhr.open('GET', "http://www.sefaria.org/api/texts/Kohelet.5", true);
xhr.responseType = 'json';
xhr.onload = function() {

    var status = xhr.status;
    
    if (status == 200) {
        callback(null, xhr.response);
    } else {
        callback(status);
    }
};
xhr.send();
*/
function heyThere() {
    var getJSON = (url, callback) => {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';

        xhr.onload = () => {

            let status = xhr.status;

            if (status == 200) {
                callback(null, xhr.response);
            } else {
                callback(status);
            }
        };

        xhr.send();
    };

    var url = document.getElementById("url").value;
    getJSON(url, (err, data) => {

        if (err != null) {
            console.error(err);
        } else {
            var heb_title = `${data.heRef}`;
            var heb_text = `${data.he}`;
            document.getElementById("title").innerHTML=heb_title;
            document.getElementById("text").innerHTML=heb_text;
        }
    });
}