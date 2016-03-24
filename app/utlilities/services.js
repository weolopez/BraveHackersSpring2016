(function () {
    'use strict';

    angular.module('services', [])
        .service('Services', Services);

    Services.$inject = ['$log'];

    function Services($log) {
        var services = this;

        services.getGame = function (game) {
            return tobase64url(game.name);
        }
        services.getTeamImage = function(team) {
            if (!vm.fb.teams[services.tobase64url(team)]) return; 
            return vm.fb.teams[services.tobase64url(team)].imageurl;
        }
        
        services.tobase64url = function(s) {
            return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        }
        services.frombase64url = function(s) {
            return atob(s.replace(/-/g, '+').replace(/_/g, '/'));
        }
        return services;
    };
})(); 