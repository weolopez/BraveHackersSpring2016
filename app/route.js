(function () {
    'use strict';

    angular
        .module('app.routes', [
            'ui.router.router'
         ])
        .config(function ($urlRouterProvider) {
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/picks/pick');
        });
})();
