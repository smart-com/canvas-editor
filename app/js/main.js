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
        clearBtn: {}
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
            //'clear-console' : 'html.console.value = ""'
        };

    /**
     * @summary Устанавливает строку в консоль
     * @listens click
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
        var value = btnVal[ event.target.id ];
        html.console.value = value;
    };

    /**
     * @summary Получает строку кода из консоли
     * @returns { string } Строка кода
     */
    function getConsoleValue() {
        return html.console.value;
    }

    /**
     * @summary Берет код из консоли и запускает его на выполнение
     * @listens click
     */
    function runCode() {
        var code = getConsoleValue();
        var run = new Function( code );
        run();
    }

    /**
     * @summary Очищает содержимое консоли
     * @listens click
     */
    function clearCode() {
        html.console.value = '';
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
     */
    this.setHtml = function( canvasId, consoleId, runBtnId, clearBtnId ) {
        html.canvas = document.getElementById( canvasId );
        html.context = html.canvas.getContext( '2d' );
        html.console = document.getElementById( consoleId );
        html.runBtn = document.getElementById( runBtnId );
        html.clearBtn = document.getElementById( clearBtnId );
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
        html.clearBtn.addEventListener( 'click', clearCode );
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
app.setHtml( 'canvas-field', 'console', 'run-btn', 'clear-btn' );
app.init();


