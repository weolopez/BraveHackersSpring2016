(function () {
    'use strict';

    angular
        .module('app.exceptions', [
            'ngToast'
        ])
        .config(exceptions);

    exceptions.$inject = ['$provide'];
    function exceptions($provide) {
        $provide.decorator('$exceptionHandler', extendExceptionHandler);

    }
    // Extend the $exceptionHandler service to also display a toast.
    extendExceptionHandler.inject = ['$delegate', 'ngToast', '$window']
    function extendExceptionHandler($delegate, ngToast, $window) {
        var appErrorPrefix = 'myPrefix';
        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }

            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix + exception.message;
            ngToast.create({
                className: 'danger',
                content: msg
            });
            console.log(appErrorPrefix, errorData)
        };
    }
})();