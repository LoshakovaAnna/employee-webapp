'use strict';

angular
    .module('appClient')
        .directive( 'tableEmployees', function(){
            return{
                    templateUrl:"./templates/directives-tpl/table-employees.html",
                    replace: false,
                    controller : 'emloyeeListCtrl'            
                }
            }    
        );