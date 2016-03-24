(function () {
    'use strict';

    angular.module('storage.github', ['github'])
        .factory('$github', function ($log, GitHubConstants, $window) {
            var github = this;
            
        github.filePath = '';
        var gitid = $window.localStorage['gitid'];
        var gitpwd = $window.localStorage['gitpwd'];
            
            function loginGitHub() {
                github.github = new Github({
                    username: gitid,
                    password: gitpwd,
                    auth: "basic"
                });
                github.repo = github.github.getRepo('weolopez', GitHubConstants.reponame);
                github.filePath = 'src/test/mocks/teamlist.json';
            };
            function openFile() {
                if (github.filePath.length > 5) {
                    github.repo.read('master', github.filePath, function (err, data) {
                        github.teams = JSON.stringify(data, null, "    ");
                    });
                }
                if (github.pickFile === false)
                    github.pickFile = false;
                else github.pickFile = true;
            }
            function saveFile() {
                var options = {
                    author: { name: 'Picks App', email: 'weolopez@gmail.com' },
                    committer: { name: 'Picks App', email: 'weolopez@gmail.com' },
                    encode: true // Whether to base64 encode the file. (default: true)
                }

                github.repo.write('master', github.filePath, github.teams, 'Updated from Picks App', options, function (err) {
                    if (err)
                        alert(JSON.stringify(err, null, "    "));
                });
            }
            return github;
        });
})();