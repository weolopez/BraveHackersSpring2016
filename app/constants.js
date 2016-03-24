(function () {
    'use strict';

    angular.module('app.constants', [])
            .value('version', '0.1')
            .constant('RestConstants',
                    {
                        'playlist': '/rest/playlist',
                        'orderlist': 'test/mocks/orderlist.json',
                        'gamelist': 'test/mocks/gamelist.json',
                        'firebase': 'https://yourpicks.firebaseio.com'
                    })
            .constant('GitHubConstants',
                    {
                        'reponame': 'Recursive'
                    })
            .constant('FirebaseConstants',
                    {
                        'dbname': 'https://yourpicks.firebaseio.com'
                    });
})();
