$(document).ready(function() {


var userContainer = document.getElementById("user-info");

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://challenge-dev.starmarkcloud.com/users');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var ourData = JSON.parse(ourRequest.responseText);
    renderHTML(ourData);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
  
};


ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();

function renderHTML(data) {

  var htmlString = "";

  for (i = 0; i < data.length; i++) {
htmlString += "<div class='col-md-6'><div class='user-card'><div class='col-md-3'>" +
              "<img class='avatar clip-circle ' src='" + data[i].avatar + "'>" +
              "</div><div class='col-md-9'>" +
              "<h3>" + 
                data[i].firstName + " " + data[i].lastName + 
              "</h3>" + 
              "<li>"; 

              if (data[i].phone !== "") {
                htmlString += data[i].phone;
              } else {
                htmlString += "Phone number unavailable";
              };
                              
              htmlString += "</li><li>";
              if (data[i].email !== "") {
                htmlString += data[i].email;
              } else {
                htmlString += "Email address unavailable";
              };
                              
              htmlString += "</li>";
              
              htmlString += '</div></div></div>';
              
              }

  
  userContainer.insertAdjacentHTML('beforeend', htmlString);
}




$("#filterForm").submit(function(e) {
    
    e.preventDefault();
    var ourData = JSON.parse(ourRequest.responseText);
    var city = document.getElementById("city").value;
    console.log(city);
    filter(ourData);



function filter(data) {

  var htmlString = "";

  for (i = 0; i < data.length; i++) {
    var currentCity = data[i].address.city;
    console.log(currentCity);
    if (currentCity == city) {
                htmlString += "<div class='col-md-6'><div class='user-card'><div class='col-md-3'>" +
              "<img class='avatar clip-circle ' src='" + data[i].avatar + "'>" +
              "</div><div class='col-md-9'>" +
              "<h3>" + 
                data[i].firstName + " " + data[i].lastName + 
              "</h3>" + 
              "<li>"; 

              if (data[i].phone !== "") {
                htmlString += data[i].phone;
              } else {
                htmlString += "Phone number unavailable";
              };
                              
              htmlString += "</li><li>";
              if (data[i].email !== "") {
                htmlString += data[i].email;
              } else {
                htmlString += "Email address unavailable";
              };
                              
              htmlString += "</li>";
              
              htmlString += '</div></div></div>';
    } else {
      console.log("Not in that city");
    };
              
              }
 
  userContainer.insertAdjacentHTML('beforeend', htmlString);
}
});


});
 
