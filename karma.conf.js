// Karma configuration
// Generated on Sat May 14 2016 21:28:30 GMT+0200 (Центральная Европа (лето))

module.exports = function ( config ) {
    config.set(
        {
            // Базовый путь используется для все папок, файлов, модулей
            basePath: '',

            // Используемые фреймворки
            // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: [ 'mocha', 'chai' ],
            // Плагины для фреймворков, браузеров и препроцессоров
            plugins: [
                'karma-mocha',
                'karma-html2js-preprocessor',
                'karma-chai',
                "karma-coverage",
                "karma-chrome-launcher",
                "karma-phantomjs-launcher",
                "phantomjs-prebuilt"
            ],

            // Эти файлы должны быть загружены в браузер
            files: [
                'tests/*.html',
                'app/js/*.js',
                'tests/*.js',
                //'index.html',
                'app/css/main.css'
                //'tests/*.html'
            ],

            client: {
                mocha: {
                    // change Karma's debug.html to the mocha web reporter
                    reporter: 'html',
                    ui: 'bdd'
                },
                client: {
                    contextFile: 'tests/test-runner.html'
                }
            },

            // Исключенные файлы
            exclude: [
                'out/**/*'
            ],

            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
                // source files, that you wanna generate coverage for
                // do not include tests or libraries
                // (these files will be instrumented by Istanbul)
                'app/*.js': [ 'coverage' ],
                'tests/*.html': ['html2js']
            },

            // test results reporter to use
            // possible values: 'dots', 'progress'

            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: [ 'progress', 'coverage' ],

            // web server port
            port: 9876,

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO ||
            // config.LOG_DEBUG
            logLevel: config.LOG_INFO,

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            browsers: [ 'Chrome', 'PhantomJS', 'PhantomJS_custom' ],

            // you can define custom flags
            customLaunchers: {
                'PhantomJS_custom': {
                    base: 'PhantomJS',
                    options: {
                        windowName: 'Canvas Editor',
                        settings: {
                            webSecurityEnabled: false
                        }
                    },
                    flags: [ '--load-images=true' ],
                    debug: true
                }
            },

                /*coverageReporter: {
                    dir: 'coverage',
                    // Force the use of the Istanbul instrumenter to cover files
                    instrumenter: {
                        type : 'html',
                        'js/*.js': [ 'istanbul' ]
                    },
                    reporters: [
                        // reporters not supporting the `file` property
                        { type: 'html', subdir: 'report-html' },
                        { type: 'lcov', subdir: 'report-lcov' },
                        // reporters supporting the `file` property, use `subdir` to directly
                        // output them in the `dir` directory
                        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
                    ]
                },*/
                // Continuous Integration mode
                // if true, Karma captures browsers, runs the tests and exits
                singleRun: false,

                // Concurrency level
                // how many browser should be started simultaneous
                concurrency: Infinity
        }
    )
}
