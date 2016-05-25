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
// Как рах там будут запущены все тесты
testEnvironment.init( testEnvironment.testPage );

// Копируем объект приложения для тестов
//var testApp = canvasApp();

describe(
    '', function() {

        describe(
            '', function() {

                it(
                    'Canvas найден', function() {
                        assert.property( testApp.html, 'canvas' );
                    }
                );

                it(
                    'Контейнер для фоток тоже', function() {
                        assert.property( testApp.html, 'imgContainer' );
                    }
                );

                it(
                    'Кнопка для запуска кода есть', function() {
                        assert.property( testApp.html, 'runBtn' );
                    }
                );

                it(
                    'Консоль есть', function() {
                        assert.property( testApp.html, 'console' );
                    }
                );
            }
        );

        describe(
            '', function() {

                it(
                    'Canvas не NULL', function() {
                        assert.isNotNull( testApp.html, 'canvas' );
                    }
                );

                it(
                    'Контейнер для фоток тоже', function() {
                        assert.isNotNull( testApp.html, 'imgContainer' );
                    }
                );

                it(
                    'И кнопка для запуска не NULL', function() {
                        assert.isNotNull( testApp.html, 'runBtn' );
                    }
                );

                it(
                    'Консоль не NULL...', function() {
                        assert.isNotNull( testApp.html, 'console' );
                    }
                );
            }
        );
    }
);

var cmd = testApp.html.console;
