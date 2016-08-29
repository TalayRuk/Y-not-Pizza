// Backend Logic
function User(){
  this.userName = "";
  this.pizzas = [];
  this.howMany = 0;
  this.total = 0;
  this.address = [];
  this.allAddress= [];
}
function Pizza(size, toppings, id){
  this.pizzaSize = size;
  this.toppings = toppings;
  this.cost = 0;
  this.pizzaId = id;
}

function Address(street,city,state,zip){
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

User.prototype.checkUserInputName = function(){
  if(!this.userName) return false;
  else return true;
}

User.prototype.checkUserInputAmount = function(){
  if(this.howMany < 1) return false;
  else return true;
}
User.prototype.addTotal = function(){
  this.total += this.pizzas[this.pizzas.length-1].cost;
}

User.prototype.orderPizza = function(){
  if(this.pizzas.length === this.howMany) return true;
  else return false;
}
User.prototype.orderNow = function(){
  this.userName = "";
  this.howMany = 0;
  this.pizzas = [];
  this.total = 0;
  this.address = [];
  this.allAddress = [];
}

Pizza.prototype.addCost = function(){
  this.cost = 10;
  if(this.pizzaSize === "Medium"){
    this.cost+=2;
  }
  else if (this.pizzaSize === "Large"){
    this.cost+=4;
  }
  for (var i = 1; i < this.toppings.length; i++) {
    this.cost++;
  }
}

Address.prototype.checkUserInputAddress = function(){
  if(!this.street||!this.city||!this.state||!this.zip) return false;
  else return true;
}

//UI logic
Pizza.prototype.addToList = function(){
  if(!this.pizzaId){
    $("#main-column").removeClass("col-sm-12");
    $("#main-column").addClass("col-sm-7");
    $("#pizza-box").show();
  }
  if(!this.toppings.length)
  $("#pizza-list").append("<li class='temp-pizza' id='temp-pizza" + this.pizzaId + "'>" + this.pizzaSize +  " plain cheese " + " $" + this.cost + ".00" +"</li><br>");
  else{
    $("#pizza-list").append("<li class='temp-pizza' id='temp-pizza" + this.pizzaId + "'>" + this.pizzaSize +  " " + this.toppings.length + " topping " + " $" + this.cost + ".00" +"</li>");
    $("#temp-pizza"+ this.pizzaId).append("<br>Toppings:<ul id=toppings" + this.pizzaId + "></ul>");
    for (var i = 0; i < this.toppings.length; i++) {
      $("#toppings"+ this.pizzaId).append("<li>" + this.toppings[i] + "</li>");
    }
    $("#toppings"+ this.pizzaId).append("<br>");
  }
}

var clearFields = function(){
  $("#name").val("");
  $("#pizza-amount").val(1);
  $("#street").val("");
  $("#city").val("");
  $("#state").val("");
  $("#zip").val("");
}

$(document).ready(function() {
  var myuser = new user();
  $("form#user").submit(function(event){
    event.preventDefault();
    myuser.userName = $("#name").val();
    myuser.howMany = parseInt($("#pizza-amount").val());
    if(!myuser.checkUserInputName()){
      alert("Please enter your name");
      return;
    }
    if(!myuser.checkUserInputAmount()){
      alert("You can't order 0 or a negative number of pizzas");
      return;
    }
    $(this).hide();
    $("#pizza").show();
  });
  $("form#pizza").submit(function(event){
    event.preventDefault();
    var size = $("input:radio[name=size]:checked").val();
    var toppings = [];
    $("input[name=toppings]:checked").each(function() {
      toppings.push(this.value);
    });
    var myPizza = new Pizza(size,toppings,myuser.pizzas.length);
    myuser.pizzas.push(myPizza);
    myPizza.calculateCost();
    myPizza.addToList();
    myuser.calculatetotal();
    if(myuser.amIDoneOrdering()){
      $(this).hide();
      $("#total").text("Your total is $" + myuser.total + ".00");
      $("#order").show();
    }
  });
  $("form#order").submit(function(event){
    event.preventDefault();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    var myAddress = new Address(street,city,state,zip);
    if(!myAddress.checkUserInputAddress()){
      alert("Please enter all fields so we can find you!");
      return;
    }
    myuser.address[0] = myAddress;
    myuser.allAddress[0] = myuser.address[0].street + " " + myuser.address[0].city + ", " + myuser.address[0].state + ", " + myuser.address[0].zip;
    alert("Your pizza(s) wil arrive at "+ myuser.allAddress +" in 30 min. Thank you for your order " + myuser.userName + " we appreciate your business!");
    $(".temp-pizza").remove();
    $(this).hide();
    $("#user").show();
    $("#main-column").addClass("col-sm-12");
    $("#main-column").removeClass("col-sm-7");
    $("#pizza-box").hide();
    myuser.reOrder();
    clearFields();
  });
});


























$(function() {

  $("#clickOrder").click(function() {
    $(".About").hide();
  });
});
