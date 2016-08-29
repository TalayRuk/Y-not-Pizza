// Backend Logic
function User() {
  this.userName = "";
  this.address = [];
}

function Address(street, city, state){
  this.street = street;
  this.city = city;
  this.state = state
}

User.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Pizza(size, toppings, specialty, quantity) {
  this.size = size;
  this.toppings = toppings;
  this.specialty = specialty;
  this.quantity = quantity;
  this.price = 0;
}

Pizza.prototype.totalCost = function () {
  var price = 12
  var toppingCost= 1 * this.toppings;
  var specialtyCost= 5 * this.specialty;

  if(this.size === "medium") {
    var sizeCost = (price + 3);
  } else if(this.size === "large") {
    var sizeCost = (price + 6);
  }  else {
    var sizeCost = price;
  }

  var pizzaCost = sizeCost + toppingCost + specialtyCost;
  return pizzaCost * this.quantity;
};

  function resetFields() {
    $("#name")
  }

$(function() {

  $("#clickOrder").click(function() {
    $(".About").hide();
  });
});
