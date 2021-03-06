const htmlBuilder = (names) =>{
    html = "<h3>Names</h3>"
    html += "<ul class='list'>"
    names.forEach(ele => {
        html += "<li>"+ ele.name + "</li>"
    });
    html += "</ul>"
     document.getElementById('result').innerHTML = html;
}

const ajaxCall = (url) =>{
    const XHR =new XMLHttpRequest();
    XHR.open('GET',url);
    XHR.onload = () =>{
        if (XHR.status === 200) {
            let names = JSON.parse(XHR.responseText);
            htmlBuilder(names);
        }
    }
    XHR.send();
}

const fetchCall = (url) =>{
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(names) {
        htmlBuilder(names);
    })
}

async function fetchAwait(url){
    const response =await fetch(url);
    const names = await response.json();
    htmlBuilder(names);
}


const load = (e) => {
    e.preventDefault();

    let region = document.querySelector('#country').value ; 
    let sex = document.querySelector('#genre').value ; 
    let amount = document.querySelector('#quantity').value ; 
    
    let url = 'https://uinames.com/api/?'
    if(region !== '')
        url +=`region=${region}&`
    
    if(sex !== '')
        url +=`gender=${sex}&`
    

    if(amount)
        url +=`amount=${amount}&`
    
//    ajaxCall(url);
//    fetchCall(url);
      fetchAwait(url)
}



document.querySelector('#generate-names').addEventListener('submit', load);
