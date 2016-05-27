/**
 * @classdesc Экземпляр приложения
 * @class
 */
var CanvasApp = function() {

    /**
     * @summary HTML-Элементы приложения
     * @type { Object }
     *
     * @property  { Object } canvas Поле для рисования
     * @property  { Object } console textarea для ввода кода
     * @property  { Object } runBtn Кнопка для запуска кода из консоли
     */
    var html = {
        canvas : {},
        console: {},
        runBtn : {}
    };

    /**
     * @summary Устанавливает строку в консоль
     * @param value {string } Строка кода для консоли
     */
    function setConsoleValue( value ) {
        html.console.value = value;
    }

    /**
     * @summary Получает строку кода из консоли
     * @returns { string } Строка кода
     */
    function getConsoleValue() {
        return html.console.value;
    }

    /**
     * @summary Берет код из консоли и запускает его на выполнение
     */
    function runCode() {
        var code = getConsoleValue();
        var run = new Function( code );
        run();
    }

    /**
     * @summary Получает объекты HTML-страницы
     * @param canvasId Идентификатор Канваса
     * @param consoleId Идентификатор консоли
     * @param runBtnId Идентификатор кнопки запуска
     */
    this.setHtml = function( canvasId, consoleId, runBtnId ) {
        html.canvas = document.getElementById( canvasId );
        html.console = document.getElementById( consoleId );
        html.runBtn = document.getElementById( runBtnId );
    };

    /**
     * @summary Устанавливает обработчики на HTML элементы
     */
    function addListeners() {
        html.runBtn.addEventListener( 'click', runCode );
    }

    /**
     * @summary Устанавливает обработчики в HTML
     */
    this.init = function( ) {
        addListeners();
    };
};

// 1 - Создаем приложение
var app = new CanvasApp();
app.setHtml( 'canvas-field', 'console', 'run-btn' );
app.init();


