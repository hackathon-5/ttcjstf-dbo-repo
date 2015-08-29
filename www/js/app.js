angular.module('ionicApp', ['ionic'])

  .factory('PetService', function ($http) {

  var pets = [];

    $http.get("http://congress.api.sunlightfoundation.com/legislators?state=SC&apikey=9ea0289c113840c3a50a541f99733862")
  .success(function (response)
    {
        for (var i=0; i<200; i++) {
            pets[i] = response;
        }
    });

  return {
    all: function () {
      return pets;
    },
    get: function (petId) {

      return pets[petId];
    }
  };

})

  .config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('tabs', {
    url: "/tabs",
    abstract: true,
    templateUrl: "tabs.html"
  })


    .state('tabs.master', {
    url: "/master",
    views: {
      'main': {
        controller:'MasterCtrl',
        templateUrl: "master.html"
      }
    }
  })

    .state('tabs.detail', {
    url: "/detail/:petsId",
    views: {
      'main': {
        controller:'DetailCtrl',
        templateUrl: "detail.html"
      }
    }
  });


  $urlRouterProvider.otherwise("tabs/master");
})




  .controller('MasterCtrl', function($scope, PetService, $ionicScrollDelegate, $ionicHistory) {

  $scope.$on('$ionicView.afterLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeEnter', function(){
    //$ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.afterEnter', function(){
    $ionicHistory.clearCache();
  });

  $scope.pets = PetService.all();

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };


})

  .controller('DetailCtrl', function($scope, $stateParams, PetService) {

  $scope.pet = PetService.get($stateParams.petsId);

});