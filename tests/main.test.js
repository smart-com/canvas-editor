// Тестовое окружение
var testEnvironment = {
    // Локальный адрес копии index.html
    // для запуска тестов
    testPage: 'tests/test-runner.html',

    // Синхронизируем браузерное и тестовое окружения
    init: function( testPage ) {

        /**
         * Копируем HTML из Кармы в текущий документ.
         * В него нужно внести настройки для Кармы
         * и спрятать стили, так как дебаг Кармы
         * будет запускаться именно в нем
         *
         * index.html -> test.runner.html -> window.document
         */
        document.body.innerHTML = window.__html__[ testPage ];
    }
};

// Добавили контент их браузера на страницу дебага Кармы
// Как раз там будут запущены все тесты
testEnvironment.init( testEnvironment.testPage );

var fakeApp = new CanvasApp();

describe(
    'C HTML все в порядке...', function() {

        describe(
            'Canvas', function() {

                it(
                    'Canvas найден', function() {
                        assert.isObject( fakeApp, 'canvas' );
                        console.log( fakeApp );
                    }
                );
            }
        );
    }
);

//var cmd = testApp.console;
