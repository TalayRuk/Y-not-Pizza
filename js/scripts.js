// Backend Logic
function Customer(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(street, city, state,zip){
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}

Customer.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.street + ", "+ this.city + " " + this.state + " "+ this.zip;
}

Customer.prototype.checkCustomerName = function() {
  if(!this.firstName||!this.lastName) return false;
  else return true;
}

Address.prototype.checkCustomerAddress = function() {
  if(!this.street||!this.city||!this.state||!this.zip) return false;
  else return true;
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
    $("input[name=carry-deliver]").attr("checked", false);
  }
// user logic
$(function() {
  $("#hungry").click(function(){
    $(".page1").hide();
    $(".page2").show();
  });

  $("form#order").submit(function(event) {
    event.preventDefault();
    console.log("o my god");
    var inputtedFirstName = $("input#new-first-name").val().toUpperCase();
    var inputtedLastName = $("input#new-last-name").val().toUpperCase();

    var newCustomer = new Customer(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedZip = $(this).find("input.new-zip").val();
      var newAddress = new Address (inputtedStreet, inputtedCity, inputtedStreet);
      newCustomer.addresses.push(newAddress);
    });
    if(!newCustomer.checkCustomerName()) {
      $("p .warning").text("DON'T FORGET TO ENTER YOUR NAME");
    }
console.log(yes);
    if(!newAddress.checkCustomerAddress()) {
      $("p #warning").text("PLEASE ENTER CORRECT INFORMATION");
    }
console.log(what);
    var inputSpecialty = $("input[name=specialty]:checked").length;
    var inputSize = $("input[name=size]:checked").val();
    var inputToppings = $("input[name=toppings]:checked").length;
    var inputVeggieToppings = $("input[name=veggieToppings]:checked").length;
    var inputQuantity = parseInt($("input.quantity").val());
    var addPizza = new Pizza(inputSpecialty, inputSize, inputToppings, inputVeggieToppings, inputQuantity);

    $("ul#customer").append("<li><span class='customer'>" + newCustomer.fullName() + "</span></li>");
    
      $(".customer").last().click(function() {
        // $("#customer").empty();
        $("#show-info").show();
        $("#show-info h2").text(newCustomer.fullName());
        $(".first-name").text(newContact.firstName);
        $(".last-name").text(newContact.lastName);
        $("ul#addresses").text("");
        $(".total").text(addPizza.totalcost());
        $("h4").show();
      });
      resetFields();
  // });
});
