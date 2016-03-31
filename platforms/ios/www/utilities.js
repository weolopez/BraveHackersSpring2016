/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    function o2afilter(o, filter) {
        var k = Object.keys(o);
        k.forEach();
        return k;
    };
    function SelectText(element) {
        var doc = document
            , text = doc.getElementById(element)
            , range, selection
            ;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    function isEmpty(o) {
        var i, v;
        if (typeOf(o) === 'object') {
            for (i in o) {
                v = o[i];
                if (v !== undefined && typeOf(v) !== 'function') {
                    return false;
                }
            }
        }
        return true;
    }
    if (!String.prototype.tobase64url) {
        String.prototype.tobase64url = function () {
            return btoa(this).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        };
    }
    if (!String.prototype.frombase64url) {
        String.prototype.frombase64url = function () {
            return atob(this.replace(/-/g, '+').replace(/_/g, '/'));
        };
    }
    if (!String.prototype.hashCode) {
        String.prototype.hashCode = function () {
            var hash = 0, i, chr, len;
            if (this.length === 0) return hash;
            for (i = 0, len = this.length; i < len; i++) {
                chr = this.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };
    }
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }

    if (!String.prototype.entityify) {
        String.prototype.entityify = function () {
            return this.replace(/&/g, "&amp;").replace(/</g,
                "&lt;").replace(/>/g, "&gt;");
        };
    }

    if (!String.prototype.quote) {
        String.prototype.quote = function () {
            var c, i, l = this.length, o = '"';
            for (i = 0; i < l; i += 1) {
                c = this.charAt(i);
                if (c >= ' ') {
                    if (c === '\\' || c === '"') {
                        o += '\\';
                    }
                    o += c;
                } else {
                    switch (c) {
                        case '\b':
                            o += '\\b';
                            break;
                        case '\f':
                            o += '\\f';
                            break;
                        case '\n':
                            o += '\\n';
                            break;
                        case '\r':
                            o += '\\r';
                            break;
                        case '\t':
                            o += '\\t';
                            break;
                        default:
                            c = c.charCodeAt();
                            o += '\\u00' + Math.floor(c / 16).toString(16) +
                            (c % 16).toString(16);
                    }
                }
            }
            return o + '"';
        };
    }

    if (!String.prototype.supplant) {
        String.prototype.supplant = function (o) {
            return this.replace(
                /\{([^{}]*)\}/g,
                function (a, b) {
                    var r = o[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
                );
        };
    }

    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1");
        };
    }
    // END API

    // publish external API by extending myLibrary
    function publishExternalAPI(myLibrary) {
        angular.extend(myLibrary, {
            'helloWorld': helloWorld,
            'utilityMethod1': utilityMethod1,
            'utilityMethod2': utilityMethod2
        });
    }
} ());
    