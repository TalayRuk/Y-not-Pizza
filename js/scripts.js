// The order is stored here
var order = [];
var max_pizzas = 5;
var orders = load_orders();
var delivery_price = 3.00;

var pizzas = [
  {name: 'Supermisso', price: 8.50, image: 'pizza-1.png'},
  {name: 'Supermisso', price: 8.50, image: 'pizza-2.png'},
  {name: 'Supermisso', price: 8.50, image: 'pizza-3.png'},
  {name: 'Supermisso', price: 8.50, image: 'pizza-4.png'},
  {name: 'Supermisso', price: 8.50, image: 'pizza-1.png'},
  {name: 'Supermisso', price: 8.50, image: 'pizza-2.png'},
  {name: 'Supermisso', price: 8.50, image: 'pizza-3.png'},
  {name: 'Supermisso', price: 13.50, image: 'pizza-4.png'},
  {name: 'Supermisso', price: 13.50, image: 'pizza-1.png'},
  {name: 'Supermisso', price: 13.50, image: 'pizza-2.png'},
  {name: 'Supermisso', price: 13.50, image: 'pizza-3.png'},
  {name: 'Supermisso', price: 13.50, image: 'pizza-4.png'}
];


// Try and load orders from localStorage
function load_orders(){
  try {
    return JSON.parse(window.localStorage["orders"]);
  }
  catch (e) {
    return [];
  }
}

function save_order() {
  orders.push({pizzas: order, form: $('form').serializeArray()});

  save_orders();
}

function save_orders() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

function get_order_html(pizzas, delivery, show_delete) {
    order_html = "";

    total = 0.0;

    // Add Pizzas to the order
    for (var i = 0; i < pizzas.length; ++i) {
      pizza = pizzas[i];
      total += pizza.price;

      order_html += '<tr id="' + i + '"><th>' + pizza.name + '</th><td>$' + pizza.price.toFixed(2) + '</td>';
      if (show_delete) {
        order_html += '<td><button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-remove"></span></button></td>';
      }
      order_html += '</tr>';
    }

    // Add Delivery to the order
    if (delivery) {
      total += delivery_price;
      order_html += '<tr><th>Delivery</th><td>$' + delivery_price.toFixed(2) + '</td></tr>';
    }

    // Add GST
    order_html += '<tr><th>GST</th><th>$' + (total * 3 / 23).toFixed(2) + '</th></tr>';

    // Add price total
    order_html += '<tr><th>Total</th><th>$' + total + '</th></tr>';

    return order_html;
}

// frontend logic
// Address auto-completion.
$(function() {
  var widget = new AddressFinder.Widget(document.getElementById("address"), "KVYHNX7CTUGWEQDBL4M6");
});

$(function() {
  // Draw Delivery Price
  $('form kbd').text('$' + delivery_price.toFixed(2));

  // Draw Pizzas
  for (i = 0; i < pizzas.length; ++i) {
    pizza = pizzas[i];
    $('#pizzas').append('<div class="col-xs-6 col-md-4 pizza"><a href="#" title="Add to Order" class="thumbnail"><img src="img/' + pizza.image + '" alt=""><div class="caption text-center"><span class="name">' +  (i + 1) + '. ' + pizza.name + '</span> <kbd class="price">$' + pizza.price.toFixed(2) + '</kbd></div></a></div>');
  }

  function draw_order(pizzas) {
    order_html = get_order_html(order, $('#method_delivery').is(':checked'), true);

    $('#order').html(order_html);

    // Remove button
    $('#order button').on('click', function(e){
      var i = parseFloat($(this).closest('tr').attr('id'));
      order.splice(i, 1);
      draw_order();
    });
  }

  // Update the order when a pizza is clicked
  $('.pizza').on('click', function(e) {
    e.preventDefault();
    if (order.length < max_pizzas) {
      order.push({
        name: $('.name', this).text(),
        price: parseFloat($('.price', this).text().substr(1))
      });
      draw_order();
    }
  });

  // Update the order when Pickup / Delivery are changed
  $('input[type=radio]').on('click', draw_order);

  $('.delivery-only').hide();
  $('input[type=radio').on('click', function(e) {
    if ($('#method_delivery').is(':checked')) {
      $('.delivery-only').slideDown('fast');
    }
    else {
      $('.delivery-only').slideUp('fast');
    }
  });

  draw_order();

  // Place the order
  $('form').on('submit', function(e){
    save_order();
  });
});

$(function() {
  // Draw orders
  for (i = 0; i < orders.length; ++i) {
    var order = orders[i];
    var delivery = order.form[0]['value'] == 'delivery';
    var name = order.form[1]['value'];
    var address = order.form[2]['value'];
    var number = order.form[3]['value'];

    var order_html = '<h2>' + name + '</h2>';

    if (delivery) {
      order_html += '<p>';
      order_html += '<strong>Address:</strong> ' + address + '<br/>';
      order_html += '<strong>Number:</strong> ' + number;
      order_html += '</p>';
    }

    order_html += get_order_html(order.pizzas, delivery, false);

    $('#orders').append('<div class="panel panel-default" id="' + i + '"><div class="panel-body"><div class="row"><div class="col-xs-10"><table class="table"><tr><th>Item</th><th>Cost</th></tr>' + order_html + '</table></div><div class="col-xs-2 text-right"><a href="orders.html" class="btn btn-default btn-lg">Cancel Order</button></div></div></div>');
    $('#orders a').on('click', function(e){
      var i = $(this).closest('.panel').attr('id');
      console.log(i);
      orders.splice(i, 1);
      save_orders();
    });
  }
});
