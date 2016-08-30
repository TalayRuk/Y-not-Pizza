// Backend Logic
function Customer(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.address = [];
}

function Address(street, city, state,zip){
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

User.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Pizza(specialty, size, toppings, veggiesToppings, quantity) {
  this.specialty = specialty;
  this.size = size;
  this.toppings = toppings;
  this.veggiesToppings = veggiesToppings;
  this.quantity = quantity;
  this.price = 0;
}

Pizza.prototype.totalCost = function () {
  var price = 12
  var toppingCost= 1 * this.toppings;
  var veggiesCost= 1 * this.veggiesToppings;
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
    $("input#new-specialty").attr("checked", false);
    $("input#new-size").attr("checked", false);
    $("input#new-sauce").attr("checked", false);
    $("input#new-toppings").attr("checked", false);

  }

$(function() {
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
  $("#clickOrder").click(function() {
    $(".About").hide();
  });
});
