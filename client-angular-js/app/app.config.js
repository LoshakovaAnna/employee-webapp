'use strict';

angular
    .module('appClient')
        .config(['$routeProvider', 
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        controller : 'emloyeeListCtrl',
                        templateUrl:'/templates/pages/Employees.html'
                    })
                    .when('/employee/:id',{
                        controller: 'workingTimeCtrl',
                        templateUrl: '/templates/pages/Workingtime.html'
                    }) 
                    .otherwise({template:'404  <a href="#!/">Home</a>'}) ;  
    }])