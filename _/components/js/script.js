$(document).ready(function() {

// Define container

var userContainer = document.getElementById("user-info");

// Get data on all users

var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://challenge-dev.starmarkcloud.com/users');
ourRequest.onload = function() {
  var ourData = JSON.parse(ourRequest.responseText);
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    renderHTML(ourData);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
  
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();


// Create HTML for all user cards

function renderHTML(data) {

  userContainer.innerHTML = ""
  var htmlString = "";

  for (i = 0; i < data.length; i++) {
htmlString += "<div class='col-md-6'><div id='" + data[i].id + "' class='user-card'><div class='col-md-4'>" +
              "<img class='avatar clip-circle ' src='" + data[i].avatar + "'>" +
              "</div><div class='col-md-8'>" +
              "<h4>" + 
                data[i].firstName + " " + data[i].lastName + 
              "</h4>" + 
              "<ul><li>"; 

              if (data[i].phone !== "") {
                htmlString += "Phone: " + data[i].phone;
              } else {
                htmlString += "Phone number unavailable";
              };
                              
              htmlString += "</li><li>";
              if (data[i].email !== "") {
                htmlString += "Email: " + data[i].email;
              } else {
                htmlString += "Email address unavailable";
              };

              htmlString += "</li><li>";
              if (data[i].address.city !== "") {
                htmlString += "City: " + data[i].address.city;
              } else {
                htmlString += "Location address unavailable";
              };
                                       
              htmlString += "</li><li> <a href='#' id='" + data[i].id + "' >View User</a></li> </ul>";
              
              htmlString += "</div></div></div>";
              
              }

  
  userContainer.insertAdjacentHTML('beforeend', htmlString);
};


// Filter results

$("#filterForm").submit(function(e) {
    
    e.preventDefault();
    var ourData = JSON.parse(ourRequest.responseText);
    var city = document.getElementById("city").value;
    filter(ourData);


function filter(data) {

  userContainer.innerHTML = "";
  var htmlString = "";

  for (i = 0; i < data.length; i++) {
    var currentCity = data[i].address.city;
    if (currentCity == city) {
htmlString += "<div class='col-md-6'><div id='" + data[i].id + "' class='user-card'><div class='col-md-4'>" +
              "<img class='avatar clip-circle ' src='" + data[i].avatar + "'>" +
              "</div><div class='col-md-8'>" +
              "<h4>" + 
                data[i].firstName + " " + data[i].lastName + 
              "</h4>" + 
              "<ul><li>"; 

              if (data[i].phone !== "") {
                htmlString += "Phone: " + data[i].phone;
              } else {
                htmlString += "Phone number unavailable";
              };
                              
              htmlString += "</li><li>";
              if (data[i].email !== "") {
                htmlString += "Email: " + data[i].email;
              } else {
                htmlString += "Email address unavailable";
              };

              htmlString += "</li><li>";
              if (data[i].address.city !== "") {
                htmlString += "City: " + data[i].address.city;
              } else {
                htmlString += "Location address unavailable";
              };
                                       
              htmlString += "</li><li> <a href='#' id='" + data[i].id + "' >View User</a></li> </ul>";
              
              htmlString += "</div></div></div>";
              
              
    } else {
      
    };
              
              }
 
  userContainer.insertAdjacentHTML('beforeend', htmlString);
}
});


// Open specific card

var expandCard = function(e, f) {

    userContainer.innerHTML = "";

    var myGuy = e[f];

    var myGuyHTML = "";

    var htmlString = "";

    var tags = "";


    var userTags = function() {
      for (i = 0; i < myGuy.tags.length; i++) {
        if (i < myGuy.tags.length - 1) {
        tags += myGuy.tags[i] + ", "
        } else {
        tags += myGuy.tags[i]
        };
      };
    };

    userTags();

    htmlString += "<div class='col-md-12'><a href='#' id='back-btn'>Back to list</a><div id='my-guy' class='main-card'><div class='col-md-4'>" +
              "<img class='avatar clip-circle ' src='" + myGuy.avatar + "'>" +
              "</div><div class='col-md-8'>" +
              "<h3>" + 
                myGuy.firstName + " " + myGuy.lastName + 
              "</h3>" + 
              "<ul><li>"; 

              if (myGuy.phone !== "") {
                htmlString += "Phone: " + myGuy.phone;
              } else {
                htmlString += "Phone number unavailable";
              };
                              
              htmlString += "</li><li>";
              if (myGuy.email !== "") {
                htmlString += "Email: " + myGuy.email;
              } else {
                htmlString += "Email address unavailable";
              };

              htmlString += "</li><li>";
              if (myGuy.address.city !== "") {
                htmlString += "City: " + myGuy.address.city;
              } else {
                htmlString += "Location unavailable";
              };

              htmlString += "</li><li>";
              if (myGuy.dob !== "") {
                htmlString += "Date of Birth: " + myGuy.dob;
              } else {
                htmlString += "Date of birth unavailable";
              };

              htmlString += "</li><li>";
              if (tags !== "") {
                htmlString += "Tags: " + tags;
              } else {
                htmlString += "Tags unavailable";
              };
                                       
              htmlString += "</li></ul>";
              
              htmlString += "</div></div></div>";



    userContainer.insertAdjacentHTML('beforeend', htmlString);


var backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", refresher);

    }

var iii = 0;

function cardFunction(e) {
  
  if (e.target !== e.currentTarget && iii == 0 && e.target.id !== "") {
    if (e.target.id == "back-btn") { } else {
  iii++;
  var clickedCard = e.target.id;
  var specUser = "http://challenge-dev.starmarkcloud.com/users/" + clickedCard;         // HOW DOES THIS NOT WORK!!!!!!!!!!!!!!!!!!!!!!!!
  var specRequest = new XMLHttpRequest();
  specRequest.open("GET", "http://challenge-dev.starmarkcloud.com/users/1");
  specRequest.onload = function() {
    var userData = JSON.parse(ourRequest.responseText);
    if (specRequest.status >= 200 && specRequest.status < 400) {
      expandCard(userData, clickedCard);
    } else {
      console.log("We connected to the server, but it returned an error.");
    } 
  };
  };
  
  ourRequest.onerror = function() {
    console.log("Connection error");


  };

if (e.target.id !== "back-btn") { specRequest.send(); } else {}

    };
  }


userContainer.addEventListener("click", cardFunction);


// Refresh all user cards



var refresher = function() {
  var ourData = JSON.parse(ourRequest.responseText);
  iii = 0;
  renderHTML(ourData);
}

var refresh = document.getElementById("refresh");
refresh.addEventListener("click", refresher, false);







});
 
