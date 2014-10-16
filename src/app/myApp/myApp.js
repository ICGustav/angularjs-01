angular.module( 'ngBoilerplate.myApp', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'my-app', {
    url: '/my-app',
    views: {
      "main": {
        controller: 'MyAppCtrl',
        templateUrl: 'myApp/myApp.tpl.html'
      }
    },
    data:{ pageTitle: 'My App' }
  });
})

.service('orderService', function () {
  var orders = [{
                  id: 1,
                  name: "Ponozky",
                  cost: "Zadarmo",
                  note: "Seconhand od Jozka"
                }, {
                  id: 2,
                  name: "Tricko",
                  cost: "1 Cent",
                  note: "First Class z Ameriky"
                }, {
                  id: 3,
                  name: "Tenisky",
                  cost: "35 Eur",
                  note: "-"
               }];
  this.getOrders = function () {
    return orders;
  };

  this.addOrder = function (name, cost, note) {
    var topID = orders.length + 1;
    
    orders.push({
      id: topID,
      name: name,
      cost: cost,
      note: note
    }); 
    return orders;
  };

  this.deleteOrder = function (id) {
    for (var i = orders.length; i >= 0; i-- ){
      if (orders[i].id === id) {
        orders[i].splice(i, 1);
        break;
      }
    }
  }

  this.getOrder = function (id) {
   for (var i = orders.length -1; i >= 0; i-- ){
      if (orders[i].id === id) {
        return orders[i];
      }
    } 
  }
})

.controller( 'MyAppCtrl', function MyAppCtrl( $scope, orderService ) {
  // This is simple a demo for UI Boostrap.
  init();

  function init () {
    $scope.orders = orderService.getOrders();
  }

  $scope.addNewOrder = function () {
      var newOrder = $scope.newOrder;
      orderService.addOrder(newOrder.name, newOrder.cost, newOrder.note);
      $scope.newOrder.name = '';
      $scope.newOrder.cost = '';
      $scope.newOrder.note = '';
  }

  $scope.delOrder = function (order) {
    var delOrder = $scope.orders.indexOf(order);
    if (delOrder != -1) {
        $scope.orders.splice(delOrder, 1);
    }
  }
})
;
