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
  var specialtyCost= 8 * this.specialty;

  if(this.size === "medium") {
    var sizeCost = (price + 3);
  } else if(this.size === "large") {
    var sizeCost = (price + 6);
  }  else {
    var sizeCost = price;
  }

  var pizzaTotal = specialtyCost + sizeCost + toppingCost + veggiesCost;
  return pizzaTotal * this.quantity;

};

  function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("input.new-zip").val("");
    $("input[name=specialty]").attr("checked", false);
    $("input[name=size]").attr("checked", false);
    $("input[name=sauce]").attr("checked", false);
    $("input[name=topping]").attr("checked", false);
    $("input[name=veggieToppings]").attr("checked", false);
    $("input.quantity").val("");
    $("input[name=carry/deliver]").attr("checked", false);
  }

$(function() {
  $(".form-group").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val().toUpperCase();
    var inputtedLastName = $("input#new-last-name").val().toUpperCase();

    var newContact = new Customer(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedZip = $(this).find("input.new-zip").val();
      var newAddress = new Address (inputtedStreet, inputtedCity, inputtedStreet);
      newContact.addresses.push(newAddress);
    });

    var inputSpecialty = $("input[name=specialty]:checked").length;
    var inputSize = $("input[name=size]:checked").val();
    var inputToppings = $("input[name=toppings]:checked").length;
    var inputVeggieToppings = $("input[name=veggieToppings]:checked").length;
    var inputQuantity = $("input.quantity").val();





  $("#clickOrder").click(function() {
    $(".About").hide();
    resetFields();
  });
});
