(function () {
    'use strict';

    angular.module('storage', [
        'firebase',
        'storage.user'
    ])
            .factory('persistance', function ($window, $cacheFactory, $http, $firebaseObject) {
                var persistance = this;

                persistance.cache = $cacheFactory('persistanceCache');
                if ((persistance.pages = $window.localStorage['/wiki/pages']) === undefined)
                    persistance.pages = "{}";
                persistance.pages = JSON.parse(persistance.pages);

                persistance.sources = {};
                persistance.types = {};
                persistance.sources.local = {
                    name: 'local',
                    note: ': stored in the current browser, volitile, should be saved to permanant storage.',
                    imgurl: 'http://www.lewebmonster.com/wp-content/uploads/2012/12/html5-localstorage.jpg',
                    color: 'pink',
                    type: 'local',
                    loadPages: true
                };
                persistance.sources.site = {
                    name: 'site',
                    note: ': can not be used for storage(YET). Default settings defined in web server.',
                    imgurl: 'http://www.catonmat.net/blog/wp-content/uploads/2009/12/github-social-coding.gif',
                    color: 'none',
                    src: '',
                    type: 'site',
                    loadPages: false
                };
                persistance.sources.home = {
                    name: 'home',
                    note: ': Firebase backend. Original implementation backend',
                    imgurl: 'http://i0.wp.com/juku.it/wp-content/uploads/2013/06/firebase-logo-blog.png?resize=80%2C80',
                    color: 'green',
                    src: 'https://weo.firebaseio.com',
                    type: 'firebase',
                    loadPages: false
                };
                persistance.sources.root = {
                    name: 'root',
                    note: ': Firebase backend. New implementation backend',
                    imgurl: 'http://i0.wp.com/juku.it/wp-content/uploads/2013/06/firebase-logo-blog.png?resize=80%2C80',
                    color: 'grey',
                    src: 'https://weo-wiki.firebaseio.com',
                    type: 'firebase',
                    loadPages: true
                };
                persistance.types.local = {};
                persistance.types.local.getPages = function (source, callback) {
                    var pages = [];
                    angular.forEach(persistance.pages, function (value, key) {
                        var page = {source: source, pageName: key};
                        pages.push(page);
                    });
                    callback(pages);
                };
                persistance.types.local.get = function (pageName, source, callback) {
                    var page = persistance.pages[pageName];
                    if (page !== undefined) {
                        callback(page, source);
                        return true;
                    }
                };
                persistance.types.local.set = function (page, source, callback, path) {
                    path = typeof path !== 'undefined' ? path : '/wiki/pages';
                    var updatedObject = {};
                    if ($window.localStorage[path] === undefined)
                        updatedObject = {};
                    else
                        updatedObject = JSON.parse($window.localStorage[path]);
                    updatedObject[page.title] = page;

                    var cache = [];
                    $window.localStorage[path] = JSON.stringify(updatedObject, function (key, value) {
                        if (typeof value === 'object' && value !== null) {
                            if (cache.indexOf(value) !== -1) {
                                // Circular reference found, discard key
                                return;
                            }
                            cache.push(value);
                        }
                        return value;
                    });
                    cache = null;

                    callback(true);
                    return true;
                };
                persistance.types.firebase = {};
                persistance.types.firebase.getPages = function (source, callback, path) {
                    path = typeof path !== 'undefined' ? path : '/wiki/pages';
                    var pages = [];
                    $firebaseObject(new Firebase(source.src + path)).$loaded(function (page) {
                        angular.forEach(Object.keys(page), function (value, key) {
                            if (value.charAt(0) !== '$') {
                                var page = {source: source, pageName: value};
                                pages.push(page);
                            }
                        });
                        callback(pages);
                    },
                            function (error) {
                                console.error("Error:", error);
                            });
                }
                persistance.types.firebase.get = function (pageName, source, callback, path) {
                    path = typeof path !== 'undefined' ? path : '/wiki/pages';
                    $firebaseObject(new Firebase(source.src + path + '/' + pageName)).$loaded(function (page) {
                        if (page.title !== undefined) {
                            //persistance.types.local.set(page, persistance.sources.local, function(result){})
                            callback(page, source);
                        }
                    })
                };
                persistance.types.firebase.set = function (page, source, callback, path) {
                    path = typeof path !== 'undefined' ? path : '/wiki/pages';
                    $firebaseObject(new Firebase(source.src + path + '/' + page.title)).$loaded(function (remotePage) {
                        for (var k in page)
                            remotePage[k] = page[k];
                        remotePage.$save();
                        callback(true);
                    });
                    // }
                    return false;
                };
                persistance.types.site = {};
                persistance.types.site.getPages = function (source, callback) {
                    var pages = [];
                    callback();
                }
                persistance.types.site.get = function (pageName, source, callback, path) {
                    path = typeof path !== 'undefined' ? path : '/wiki/pages';
                    $http.get(path + '/' + pageName).then(
                            function (data, status, headers, config) {
                                var p = data.data;
                                if (p !== undefined) {
                                    p = JSON.parse('{' + p + '}');
                                    callback(p, source);
                                    return true;
                                }
                            }
                    )
                };
                persistance.types.site.set = function (page, source, callback) {
                    callback(false);
                    return false;
                }
                return persistance;
            })
            .factory('$storage', function ($window, persistance) {
                var storage = this;
                storage.persistance = persistance;
                storage.pages = [];
                storage.cachedPages = {};
                storage.init = function () {
                    storage.preferedSources = 'local';
                    storage.loadPages();
                };
                storage.copy = function (updatedObject) {
                    $window.localStorage['copy'] = JSON.stringify(updatedObject);
                };
                storage.paste = function () {
                    return JSON.parse($window.localStorage['copy']);
                };
                /**
                 * saves Object to local storage
                 * @param {type} key
                 * @param {type} value
                 * @returns {undefined}
                 */
                storage.setPage = function (p) {
                    //cleanPage: 'remove all $'  TODO make configurable fixed Page Attributes
                    var page = {
                        title: p.title,
                        story: p.story,
                        header: getHeader(p)
                    }

                    var source = persistance.sources[p.source.name];
                    persistance.types[source.type].set(page, source, function (result) {
                        if (!result) {
                            page.source = persistance.sources.local;
                            storage.setPage(page);
                        }
                        ;
                        page.source = source;
                    });
                    page.source = source;
                }
                function getHeader(p) {
                    var header = p.header || {};
                    header.time = Date.now();
                    header.id = header.createTime || header.time;
                    header.origin = header.origin || p.source.name;
                    header.author = header.author || 'MauricioLopez';
                    return header;
                }

                /**
                 * getPage in order checks local > configured user->general firebase > home user->general firebase > webserver
                 * @param {string} name
                 * @param {function} callback
                 * @returns {Page}
                 */
                storage.getPageFromSource = function (pageName, sourceName) {
                    var p = storage.cachedPages[sourceName][pageName];
                    return
                }
                storage.getPage = function (pageName) {
                    angular.forEach(Object.keys(persistance.sources), function (sourceName, key) {
                        var source = persistance.sources[sourceName];
                        persistance.types[source.type].get(pageName, source, function (p, source) {
                            if (p === undefined)
                                return;
                            if (storage.cachedPages[source.name] === undefined)
                                storage.cachedPages[source.name] = {};
                            p.source = persistance.sources[sourceName];
                            storage.cachedPages[source.name][p.title] = p;
                        });
                    });
                };
                storage.addToSourceList = function (source) {
                    persistance.sources[source.name] = source;
                };
                /**
                 * storage.loadPages populates storage.pages with structure of...
                 * [
                 *    {sourceName,pageName}
                 * ]
                 *  
                 * @returns {undefined}
                 */
                storage.loadPages = function () {
                    angular.forEach(persistance.sources, function (source, key) {
                        if (source.loadPages) {
                            storage.loadPagesBySource(source);
                        }
                    });
                }
                storage.loadPagesBySource = function (source) {
                    if (!source.pagesLoaded) {
                        persistance.types[source.type].getPages(source, function (pages) {
                            storage.pages = storage.pages.concat(pages);
                        })
                        source.pagesLoaded = true;
                    }
                }
                storage.getProfile = function () {

                }
                storage.init();
                return storage;
            })
            ;
})();