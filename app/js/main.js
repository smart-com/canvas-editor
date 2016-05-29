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
     * @property  { Object } context CanvasRenderingContext2D
     * @property  { Object } console textarea для ввода кода
     * @property  { Object } runBtn Кнопка для запуска кода из консоли
     */
    var html   = {
        canvas  : {},
        context : {},
        console : {},
        runBtn  : {},
        clearConsoleBtn: {},
        clearCanvasBtn: {},
        restoreContextBtn: {}
    },

        /**
         * @summary Объект с кнопками
         *
         * @description
         * Ключ - event.target.id - идентификатор кнопки
         * Значение - код, который должен выполниться
         * при нажатии пользователем на кнопку с этим идентификатором
         */
        btnVal = {
            'begin-path' : '\nbeginPath();\n',
            'close-path' : '\nclosePath();\n',
            'move-canvas' : '\ntranslate( 100, 100 );\n',
            'rotate-canvas' : '\nrotate( 5 );\n',
            'move-to' : '\nmoveTo( 300, 100 );\n',
            'line-to' : '\nlineTo( 500, 100 );\n',
            'stroke' : '\nstroke();\n',
            'line-width' : '\nlineWidth = 10;\n',
            'stroke-style' : '\nstrokeStyle = "red";\n',
            'line-cap-round' : '\nlineCap = "round";\n"',
            '': '' // Это бесполезная штука, чтобы легче копировать кнопки
        };

    /**
     * @summary Устанавливает строку в консоль
     * @listens click:MouseEvents
     * @param value { object } event Клик на группе кнопок
     *
     * @description
     * Кнопки для рисования работают одинаково
     * поэтому они в общем HTML контейнере
     * на котором и висит один обработчик
     * общий для всех кнопок
     */
    var setConsoleValue = function( event ) {
        var event = window.event;
        // Берем то, что должно выполниться
        // при нажатии на эту кнопку
        // в объекте btnVal
        html.console.value += btnVal[ event.target.id ];
    };

    /**
     * @description
     * 1. Удаляем все пробелы
     * (понадобится удалить последнюю ; нужно убедиться, что это не пробел
     * 2. Удаляем последнюю точку с запятой, чтобы она не заменялась на вызов контекста
     * 3. Заменяем все оставшиеся ; вызоваом контекста канваса,
     * (его пришлось предварительно присвоить в событие,
     * так как из new Functions больше вообще ничего не было доступно,
     * а все переданные ей параметры она бессовестно превращает в строку,
     * с которой потом ничего нельзя сделать, так как это ни разу не JSON
     * @param { string } Строка из консоли для валидации
     * @returns { string } Строку для выполнения
     */
    function validateStr( str ) {
        var deleteSpaces = str.replace( /\s+/g, '' );
        var deleteLastSemicolon = deleteSpaces.slice( 0, -1 );
        var insertContext = deleteLastSemicolon.replace( /;/g,";event.ctx." );
        return insertContext;
    }

    /**
     * @summary Получает строку кода из консоли
     * @returns { string } Исправленная строка
     */
    function getConsoleValue() {
        // Создаю новое свойство у объекта события
        // и запихиваю туда контекст канваса,
        // чтобы он был доступен из new Function()
        event.ctx = html.context;
        var consoleValue = 'event.ctx.' + html.console.value;
        return validateStr( consoleValue );

    }

    /**
     * @summary Берет код из консоли и запускает его на выполнение
     * @listens click:MouseEvents
     */
    function runCode() {
        // Не понимаю почему html никак не определяется в новой функции
        // Не понимаю, что здесь в arguments[0] делает клик
        // и как он туда попал, если я не передавала вообще никаких аргументов...
        // Но таки нашла относительно несложный способ
        // Передать в новую функцию context канваса,
        // создала у объекта события новое свойство
        // и запихнула его туда. Жизнь стала налаживаться...
        var code = getConsoleValue();
        var run = new Function( code );
        run();
    }

    /**
     * @summary Очищает содержимое консоли
     * @listens click:MouseEvents
     */
    function clearConsole() {
        html.console.value = '';
    }

    /**
     * @summary Очищает пространство холста без изменения настроек
     */
    function clearCanvas() {
        html.canvas.width = html.canvas.width;
    }

    /**
     * @summary Восстанавливает последний сохраненный контекст
     */
    function restoreContext() {
        html.context.restore();
    }

    /**
     * @summary Получает объекты HTML-страницы
     *
     * @description
     * Здесь инициализируем только компоненты,
     * поведение которых отличается от кнопок для рисования.
     * Они будут искаться динамически
     *
     * @param canvasId Идентификатор Канваса
     * @param consoleId Идентификатор консоли
     * @param runBtnId Идентификатор кнопки запуска
     * @param clearConsoleBtnId Идентификатор кнопки очистки консоли
     * @param clearCanvasBtnId Идентификатор кнопки очистки холста
     * @param restoreContextBtnId Восстанавливает последний сохраненный контекст
     */
    this.setHtml = function( canvasId, consoleId, runBtnId, clearConsoleBtnId, clearCanvasBtnId, restoreContextBtnId ) {
        html.canvas = document.getElementById( canvasId );
        html.context = html.canvas.getContext( '2d' );
        html.console = document.getElementById( consoleId );
        html.runBtn = document.getElementById( runBtnId );
        html.clearConsoleBtn = document.getElementById( clearConsoleBtnId );
        html.clearCanvasBtn = document.getElementById( clearCanvasBtnId );
        html.restoreContextBtn = document.getElementById( restoreContextBtnId );
    };

    /**
     * @summary Устанавливает обработчики на HTML элементы
     *
     * @description
     * Обработчики в разных группах,
     * так как у них немного рахное поведение
     */
    function addListeners( event ) {

        // Обработчик для всех сразу кнопок рисования на холсте
        var btnSection = document.getElementById( 'canvas-btn-field' );
        btnSection.addEventListener(
            'click', function() {
                setConsoleValue( event );
            }
        );

        // Обработчики для кнопок управления холстом
        html.runBtn.addEventListener( 'click', runCode );
        html.clearConsoleBtn.addEventListener( 'click', clearConsole );
        html.clearCanvasBtn.addEventListener( 'click', clearCanvas );
        html.restoreContextBtn.addEventListener( 'click', restoreContext );
    }

    /**
     * @summary Выполняет подготовку к запуску приложения
     * 1. Устанавливает обработчики в HTML
     */
    this.init = function() {
        addListeners();
    };
};

// 1 - Создаем приложение
var app = new CanvasApp();
app.setHtml( 'canvas-field', 'console', 'run-btn', 'clear-console-btn', 'clear-canvas-btn', 'restore-context-btn' );
app.init();


