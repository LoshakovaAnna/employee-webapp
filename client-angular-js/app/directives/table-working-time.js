'use strict';

angular
    .module('appClient')
        .directive( 'tableWorkingTime', function(){
            return{
                    templateUrl:"./templates/directives-tpl/table-working-time.html",
                    replace: false,
                    controller : 'workingTimeCtrl'
                }
            }            
        );