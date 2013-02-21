
module.exports = {
    base: {
        desc: 'a base/utility library',
        defaultChoice: 0,
        choices: [{
            name: 'Mo',
            repo: 'dexteryy/mo',
            jsFiles: {
                './': 'mo/'
            }
        }, {
            name: 'underscore',
            repo: 'documentcloud/underscore',
            jsFiles: {
                'underscore.js': ''
            }
        }, {
            name: 'lodash',
            repo: 'bestiejs/lodash',
            jsFiles: {
                'lodash.js': ''
            }
        }, {
            name: 'es5-shim + es6-shim',
            repos: [{
                repo: 'kriskowal/es5-shim',
                jsFiles: {
                    'es5-shim.js': ''
                }
            }, {
                repo: 'paulmillr/es6-shim',
                jsFiles: {
                    'es6-shim.js': ''
                }
            }]
        }],
    },
    dom: {
        desc: 'a DOM manipulation module',
        defaultChoice: 0,
        choices: [{
            moduleId: 'dollar',
            name: 'DollarJS',
            repo: 'dexteryy/DollarJS',
            jsFiles: {
                'dollar.js': ''
            }
        }, {
            moduleId: 'bonzo',
            name: 'bonzo',
            repo: 'ded/bonzo',
            jsFiles: {
                'bonzo.js': ''
            }
        }, {
            moduleId: 'zepto',
            name: 'Zepto',
            repo: 'components/zepto',
            jsFiles: {
                'zepto.js': ''
            }
        }, {
            moduleId: 'jquery',
            name: 'jQuery',
            repo: 'components/jquery',
            jsFiles: {
                'jquery.js': ''
            }
        }]
    },
    messaging: {
        desc: 'messaging/async modules',
        defaultChoice: 0,
        choices: [{
            name: 'EventMaster',
            repo: 'dexteryy/EventMaster',
            jsFiles: {
                'eventmaster.js': ''
            }
        }, {
            name: 'EventEmitter2 + Q.js',
            repos: [{
                repo: 'hij1nx/EventEmitter2',
                jsFiles: {
                    'lib/eventemitter2.js': ''
                }
            }, {
                repo: 'kriskowal/q',
                jsFiles: {
                    'q.js': ''
                }
            }]
        }]
    },
    routing: {
        desc: 'a routing module',
        defaultChoice: -1,
        choices: [{
            name: 'URLKit',
            repo: 'dexteryy/URLKit',
            jsFiles: {
                'urlkit.js': ''
            }
        }, {
            name: 'Backbone.Router'
        }]
    },
    delegation: {
        desc: 'an event delegation module',
        defaultChoice: 0,
        choices: [{
            name: 'SovietJS',
            repo: 'dexteryy/SovietJS',
            jsFiles: {
                'soviet.js': ''
            }
        }]
    },
    animation: {
        desc: 'an animation module',
        defaultChoice: -1,
        choices: [{
            name: 'ChoreoJS',
            repo: 'dexteryy/ChoreoJS',
            jsFiles: {
                'choreo.js': ''
            }
        }]
    },
    mvb: {
        desc: 'a Model-View-Binder module',
        defaultChoice: -1,
        choices: [{
            name: 'CordJS'
        }]
    },
    ui: {
        desc: 'an UI library',
        defaultChoice: 0,
        choices: [{
            name: 'Moui',
            repo: 'dexteryy/moui',
            jsFiles: {
                './': 'moui/'
            }
        }, {
            name: 'ArkUI'
        }]
    }
};
