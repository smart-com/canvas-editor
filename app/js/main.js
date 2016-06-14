/**
 * @classdesc Экземпляр приложения
 * @class
 *
 */
var CanvasApp = function() {

    // Объявляем основные объекты приложения
    // Для упрощения доступа и установки обработчиков

    /**
     * @summary HTML-Элементы приложения
     * @type { Object }
     *
     * @property  { Object } canvas Поле для рисования
     * @property  { Object } console textarea для ввода кода
     * @property  { Object } runBtn Кнопка для запуска кода из консоли
     */
    var html                   = {},

        /**
         * @summary Canvas 2d Rendering Context
         * @type { object }
         */
        ctx                    = {},

        /**
         * @summary Объект с кнопками для рисования
         *
         * @description
         * Эта группа кнопок расположена отдельно в HTML
         * Для запуска они используют текст из консоли
         * Ключ - идентификатор кнопки
         * Значение - код, который должен выполниться
         * при нажатии пользователем на кнопку с этим идентификатором
         */
        canvasBtnVal           = {
            'begin-path'   : 'ctx.beginPath();\n',
            'close-path'   : 'ctx.closePath();\n',
            'move-canvas'  : 'ctx.translate( 100, 100 );\n',
            'rotate-canvas': 'ctx.rotate( 5 );\n',

            'move-to': 'ctx.moveTo( 100, 100 );\n',
            'line-to': 'ctx.lineTo( 200, 100 );\n',
            'stroke' : 'ctx.stroke();\n',

            'line-width': 'ctx.lineWidth = 10;\n',

            'line-cap-round': 'ctx.lineCap = "round";\n',
            'border-radius' : 'ctx.lineWidth = 20;\n' +
                              'ctx.lineJoin = "round";\n',

            'stroke-style': 'ctx.strokeStyle = "blue";\n',

            'bg-color'       : 'ctx.fillStyle = "green";\n' +
                               'ctx.fillRect( 10, 10, 100, 100 );\n',
            'shadow-color'   : 'ctx.shadowColor = "red";\n',
            'shadow-blur'    : 'ctx.shadowBlur = 10;\n',
            'shadow-position': 'ctx.shadowOffsetY = 10;\n' +
                               'ctx.shadowOffsetX = 10;\n',
            'opacity'        : 'ctx.globalAlpha = 0.5;\n',

            'fill-shape' : 'ctx.fill();\n',
            'fill-text'  : 'ctx.font = "48px serif";\n' +
                           'ctx.fillStyle = "gray";\n' +
                           'ctx.fillText( "Hello world", 20, 100 );\n',
            'stroke-text': 'ctx.font = "48px serif";\n' +
                           'ctx.fillStyle = "darkgray";\n' +
                           'ctx.strokeText( "Hello world", 20, 100 );\n',

            'straight-line': 'ctx.moveTo( 100, 100 );\n' +
                             'ctx.lineTo( 200, 100 );\n' +
                             'ctx.stroke();\n',
            'bezier'       : 'ctx.beginPath();\n' +
                             'ctx.bezierCurveTo( 50, 100, 180, 10, 20, 10 );\n' +
                             'ctx.stroke();\n',
            'arc'          : 'ctx.arc( 100, 30, 50, 0.2 * Math.PI, 1.1 * Math.PI );\n' +
                             'ctx.stroke();\n',

            'round'                 : 'ctx.arc( 50, 50, 50, 0, 2 * Math.PI, false );\n' +
                                      'ctx.stroke();\n',
            'fill-rectangle'        : 'ctx.fillRect( 10, 10, 100, 100 );\n',
            'empty-rectangle'       : 'ctx.strokeRect( 10, 10, 100, 100 );\n',
            'create-linear-gradient': 'gradient = ctx.createLinearGradient( 0, 0, 200, 0 );\n' +
                                      'gradient.addColorStop( 0, "green" );\n' +
                                      'gradient.addColorStop( 1, "white" );\n' +
                                      'ctx.fillStyle = gradient;\n' +
                                      'ctx.fillRect( 10, 10, 200, 100 );\n',
            'create-radial-gradient': 'gradient = ctx.createRadialGradient(100, 100, 100, 100, 100, 0);\n' +
                                      'gradient.addColorStop( 0, "green" );\n' +
                                      'gradient.addColorStop( 1, "white" );\n' +
                                      'ctx.fillStyle = gradient;\n' +
                                      'ctx.fillRect( 0, 0, 200, 100 );\n',
            'create-image'          : 'var image = new Image();\n' +
                                      'image.src="app/img/present.png";\n' +
                                      // Таймаут необходим, чтобы картинка успела подгрузиться за один клик
                                      // Его нужно увеличить, если требуется подгрузить картинку большего размера
                                      'setTimeout( function() { ctx.drawImage( image, 10, 50, 50, 50 ) }, 8 );\n',
            'tile-canvas'           : 'var image = new Image();\n' +
                                      'image.src="app/img/present.png";\n' +
                                      'image.onload = function() {\n' +
                                      'var pattern = ctx.createPattern( image, "repeat" );\n' +
                                      'ctx.fillStyle = pattern;\n' +
                                      'ctx.fillRect( 0, 0, 300, 300 );\n' +
                                      '}\n',
            ''                      : '' // Это бесполезная штука, чтобы легче копировать кнопки
        },

        /**
         * @summary Объект с кнопками для управления консолью
         *
         * @description
         * Эта группа кнопок расположена отдельно в HTML
         * Они запускают код, который не требует редактирования,
         * минуя консоль
         * Ключ - идентификатор кнопки
         * Значение - код, который должен выполниться
         * при нажатии пользователем на кнопку с этим идентификатором
         */
        ctrlBtnVal             = {
            'clear-console-btn'  : 'html.console.innerText = "";',
            'clear-canvas-btn'   : 'ctx.clearRect( 0, 0, html.canvas.width, html.canvas.height );',
            'clear-cheet-btn'    : 'html.cheetArea.innerHTML = "";',
            'restore-context-btn': 'ctx.restore();',
            ''                   : ''  // Это бесполезная штука, чтобы легче копировать кнопки
        },

        /**
         * NOT USE: @summary Объект с кнопками для запуска и в консоли и без
         */
        additionalBtnVal       = {
            'save-image': 'var imageCopy = html.imgCopy;\n' +
                          'var imageContainer = html.imgContainer;\n' +
                          'imageCopy.src = html.canvas.toDataURL();\n' +
                          'imageContainer.href = imageCopy.src;\n' +
                          'imageCopy.style.display = "inline-block";\n' +
                          'imageContainer.style.display = "block";\n',
            ''          : ''  // Это бесполезная штука, чтобы легче копировать кнопки
        },

        /**
         * @summary Массив с кругами
         * @type { Array.<Object> }
         */
        circles                = [],

        /**
         * @summary Массив с названиями цветов для выбора случайного цвета
         * @type { Array.<String> }
         */
        colors                 = [
            'red', 'green', 'blue', 'yellow', 'orange', 'rosybrown', 'magenta', 'brown', 'purple', 'pink',
            'coral', 'indianred', 'lime', 'seagreen', 'teal', 'cadetblue', 'steelblue', 'slategray',
            'blueviolet', 'crimson'
        ],

        previousSelectedCircle = {},
        clickSound             = new Audio( 'app/media/popup.mp3' ),
        isDragging             = false,
        timeout                = 10,
        timeoutIDForFallBalls,
        isDrawing              = false;

    function showCheet( event ) {
        var event = event || window.event;
        var cheet = event.target.nextElementSibling;
        cheet.style.display = 'block';
        html.cheetArea.appendChild( cheet );
    }

    function deleteCheet() {
        html.cheetArea.innerHTML = '';
    }

    /**
     * @summary Устанавливает строку для редактирования в консоль
     * @listens click:MouseEvents
     *
     * @param { object } event Клик на группе кнопок
     */
    var setConsoleValue = function( event ) {
        event = event || window.event;
        var parentParent = event.target.parentElement.parentElement;
        if( parentParent.classList.contains( 'animate-buttons' ) ) {
            return;
        }

        html.console.innerText += canvasBtnVal[ event.target.id ];

        var descriptionElem = event.target.nextElementSibling;
        if( descriptionElem && descriptionElem.classList.contains( 'desc' ) ) {
            showCheet( event );
        }
    };

    /**
     * @summary Получает объекты HTML-страницы
     *
     * @param canvasId Идентификатор Канваса
     * @param consoleId Идентификатор консоли
     * @param runBtnId Идентификатор кнопки запуска
     */
    function setHtml( id ) {
        html.canvas = document.getElementById( id.canvasId );
        html.console = document.getElementById( id.consoleId );
        html.cheetArea = document.getElementById( id.cheetArea );
        html.runBtn = document.getElementById( id.runBtnId );
        html.imgContainer = document.getElementById( id.imgContainer );
        html.imgCopy = document.getElementById( id.imgCopy );
        html.randomCircleBtn = document.getElementById( id.randomCircleBtn );
        html.idBallSize = id.ballSize;
        html.animateCirclesBtn = document.getElementById( id.animateCircle );
        html.resetCanvasBtn = document.getElementById( id.resetCanvasBtn );
    }

    /**
     * @summary Устанавливает контекст канваса
     */
    function setContext() {
        ctx = html.canvas.getContext( '2d' );
    }

    /**
     * @summary NOT USE Готовит строку из консолм к запуску
     * @description
     * 1. Удаляем все пробелы, так как понадобится удалить последнюю ;
     * Если в строке кода случайно окажутся пробелы, то точка с запятой останется
     * и будет заменена на вызов контекста ( будет ошибка )
     * 2. Удаляем последнюю точку с запятой, чтобы она не заменялась на вызов контекста
     * 3. Заменяем все оставшиеся ; вызоваом контекста канваса,
     * (его пришлось предварительно присвоить в событие,
     * так как из new Function() больше вообще ничего не было доступно,
     * а все переданные ей параметры она бессовестно превращает в строку,
     * с которой потом ничего нельзя сделать, так как это ни разу не JSON
     *
     * @param { string } str Строка из консоли для валидации
     * @param { string } contextPropertyWithDot Название свойства, которое нужно передать в new Function()
     *
     * @returns { string } Готовая строка для выполнения

     function validateStr( str, contextPropertyWithDot ) {
        var replacer             = contextPropertyWithDot,
            deletedSpaces        = str.replace( /^\s+|\s+$/g, '' ),
            deletedLastSemicolon = deletedSpaces.slice( 0, -1 ),
            insertContext        = deletedLastSemicolon.replace( /;/g, ';\n' + replacer );
        return replacer + insertContext;
    }*/

    /**
     * @summary Получает строку кода из консоли
     * @returns { string } Строка
     */
    function getConsoleValue() {
        var consoleValue = html.console.innerText;
        return consoleValue;
    }

    /**
     * @summary Берет код из консоли и запускает его на выполнение
     * @listens click:MouseEvents
     */
    function runConsoleCode() {
        var consoleCode = getConsoleValue( 'ctx.' );
        var runConsole = new Function( 'ctx', consoleCode );
        runConsole( ctx );
    }

    function resetCanvas() {
        clearTimeout( timeoutIDForFallBalls );
        circles = [];
        ctx.clearRect( 0, 0, html.canvas.width, html.canvas.height );
    }

    /**
     * @summary Запускает управляющий код без участия консоли
     * @listens click:MouseEvents
     *
     * @param { object } event click:MouseEvents
     */
    function runCode( event ) {
        event = event || window.event;
        var code = ctrlBtnVal[ event.target.id ] || additionalBtnVal[ event.target.id ];
        var run = new Function( 'html, ctx', code );
        run( html, ctx );
    }

    /**
     * @summary Возвращает случайное число из заданного диапахона
     * @param { number } [ from = 10 ] Начало диапазона
     * @param { number } [ to = 60 ] Конец диапазона
     * @returns { number }
     */
    function randomFromTo( startDiapazone, endDiapazone ) {
        var from = startDiapazone || 10;
        var to = endDiapazone || 60;
        return Math.floor(
            Math.random() * (
                to - from + 1
            ) + from
        );
    }

    /**
     * @classdesc Создает случайный круг
     * @class
     * @property  { Number } randomRadius Радиус окружности
     * @property  { Number } x Случайная Х-координата центра окружности
     * @property  { Number } y Случайная Y-координата центра окружности
     * @property  { Number } dx Случайный Коэффициент ускорения по горизонтали
     * @property  { Number } dy Случайный коэффициент ускорения по вертикали
     * @property  { Number } radius Радиус окружности ( Введенное в &lt;input&gt; пользовательское число )
     *                              Если в инпуте 0, то радиус будет случайным
     *                              в диапазоне от 10 до 60 {@link randomFromTo()}
     * @property { String } color Цвет круга. Выбирается случайным образом из массива {@link colors}
     * @property { String } borderColor Цвет рамки. Выбирается случайным образом из массива {@link colors}
     * @property { Boolean } isSelected Метка для круга, выбранного в текущий момент
     *
     */
    function Circle() {
        var currentRadius = parseFloat( document.getElementById( html.idBallSize ).value );
        var randomRadius = randomFromTo();
        this.x = randomFromTo( 0, html.canvas.width );
        this.y = randomFromTo( 0, html.canvas.height );
        this.dx = randomFromTo( 0.1, 0.9 );
        this.dy = randomFromTo( 0.1, 0.9 );
        this.radius = (
                          currentRadius === 0
                      ) ? randomRadius : currentRadius;
        this.color = colors[ randomFromTo( 0, colors.length ) ];
        this.borderColor = colors[ randomFromTo( 0, colors.length ) ];
        this.isSelected = false;
    }

    /**
     * @description Создает случайный круг и добавляет его в массив circles
     * @listens click:MouseEvent
     */
    function createRandomCircle() {
        var circle = new Circle();
        circles.push( circle );
    }

    /**
     * @description Проверяет, выбран ли текущий круг
     * @param { Circle } circle Текущий круг
     * @param { Number } [selectedBorder = 7] Рамка у выбранного круго чуть шире
     * @param { Number } [unselectedBorder = 3] Узкая рамка у остальных кругов
     */
    function checkSelectedCircle( circle, selectedBorder, unselectedBorder ) {
        if( circle.isSelected ) {
            ctx.lineWidth = selectedBorder || 7;
        } else {
            ctx.lineWidth = unselectedBorder || 3;
        }
    }

    /**
     * @summary Рисует круги из массива
     * @param { Number } opacity Прохрачность кругов
     */
    function drawCircle( opacity ) {

        var defaultOpacity = 0.65;

        ctx.clearRect( 0, 0, html.canvas.width, html.canvas.height );

        for( var i = 0; i < circles.length; i++ ) {

            var circle = circles[ i ];
            ctx.globalAlpha = opacity || defaultOpacity;
            ctx.beginPath();
            ctx.arc( circle.x, circle.y, circle.radius, 0, Math.PI * 2 );
            ctx.fillStyle = circle.color;
            checkSelectedCircle( circle );
            ctx.strokeStyle = circle.borderColor;
            ctx.fill();
            ctx.stroke();
        }
    }

    /**
     * @summary Проверяет, попал ли клик по кругу и разрешает перетаскивание
     * @listens click:MouseEvent
     * @param event
     */
    function checkCanvasClick( event ) {

        var clickX = event.clientX - html.canvas.getBoundingClientRect().left;
        var clickY = event.clientY - html.canvas.getBoundingClientRect().top;

        for( var i = circles.length - 1; i >= 0; i-- ) {
            var circle = circles[ i ];
            // Расстояние от клика до центра круга
            var distanceFromCenter = Math.sqrt( Math.pow( circle.x - clickX, 2 ) + Math.pow( circle.y - clickY, 2 ) );

            // Если расстояние меньше, то клик был внутри круга
            if( distanceFromCenter <= circle.radius ) {
                if( previousSelectedCircle != null ) {
                    previousSelectedCircle.isSelected = false;
                    clearTimeout( timeoutIDForFallBalls );
                }
                previousSelectedCircle = circle;
                circle.isSelected = true;
                drawCircle();
                isDragging = true;
                clickSound.play();
                clearTimeout( timeoutIDForFallBalls );
            }
        }
    }

    /**
     * @summary Тянет круг по канвасу
     * @listens click:MouseEvent
     * @listens mousemove:MouseEvent
     *
     * @param event
     */
    function startDragging( event ) {

        if( isDragging === true ) {
            clearTimeout( timeoutIDForFallBalls );
            if( previousSelectedCircle !== null ) {
                var x = event.clientX - html.canvas.getBoundingClientRect().left;
                var y = event.clientY - html.canvas.getBoundingClientRect().top;
                previousSelectedCircle.x = x;
                previousSelectedCircle.y = y;
                drawCircle();
            }
        }
    }

    /**
     * @summary Прекращает перетаскивание
     */
    function stopDragging() {
        isDragging = false;
    }

    function animateCircles() {

        ctx.clearRect( 0, 0, html.canvas.width, html.canvas.height );

        for( var i = 0; i < circles.length; i++ ) {
            var circle = circles[ i ];
            // Ускорение
            circle.x += circle.dx;
            circle.y += circle.dy;
            // Гравитация
            if( (
                    circle.y
                ) < html.canvas.height ) {
                circle.dy += 0.22;
            }
            // Трение
            circle.dx = circle.dx * 0.998;
            // Если мяч натолкнулся на край холста отбиваем его
            if( (
                circle.x + circle.radius > html.canvas.width
                ) || (
                circle.x - circle.radius < 0
                ) ) {
                circle.dx = -circle.dx;
            }
            // Если мяч упал вниз - отбиваем его, слегка уменьшив скорость
            if( (
                circle.y + circle.radius > html.canvas.height
                ) || (
                circle.y - circle.radius < 0
                ) ) {
                circle.dy = -circle.dy * 0.6;
            }
            // Рисуем текущий мячик
            drawCircle();
        }
        timeoutIDForFallBalls = setTimeout( animateCircles, timeout );
    }

    function startDrawing( event ) {
        isDrawing = true;
        ctx.beginPath();
        // Устанавливаем координаты куда рисовать
        ctx.moveTo(
            event.clientX - html.canvas.getBoundingClientRect().left,
            event.clientY - html.canvas.getBoundingClientRect().top
        );
    }

    function draw( event ) {
        if( isDrawing === true ) {
            var x = event.clientX - html.canvas.getBoundingClientRect().left;
            var y = event.clientY - html.canvas.getBoundingClientRect().top;
            ctx.lineTo( x, y );
            ctx.stroke();
        }
    }

    function stopDrawing() {
        isDrawing = false;
    }

    /**
     * @summary Устанавливает обработчики на HTML элементы
     *
     * @description
     * Обработчики в разных группах,
     * так как у них немного рахное поведение
     */
    function addListeners() {

        // Обработчик для всех сразу кнопок рисования на холсте
        var btnSection = document.getElementById( 'canvas-btn-field' );
        btnSection.addEventListener(
            'click', function() {
                setConsoleValue( event );
            }
        );

        // Обработчик для секции с управляющими кнопками
        var ctrlBtnSection = document.getElementById( 'control-btn-field' );
        ctrlBtnSection.addEventListener(
            'click', function() {
                runCode( event );
            }
        );

        /**
         * бработчик для секции с добавлением дополнительных объектов
         */
        var additionalObjSection = document.getElementById( 'additional-objects-field' );
        additionalObjSection.addEventListener(
            'click', function() {
                runCode( event );
            }
        );

        // Обработчики для осамостоятельных кнопок
        html.runBtn.addEventListener( 'click', runConsoleCode );
        html.resetCanvasBtn.addEventListener( 'click', resetCanvas );
        html.randomCircleBtn.addEventListener( 'click', createRandomCircle );
        html.randomCircleBtn.addEventListener( 'click', drawCircle );

        // Перетаскивание и анимация
        html.canvas.addEventListener( 'click', checkCanvasClick );
        html.canvas.addEventListener( 'click', startDragging );
        html.canvas.addEventListener( 'mousemove', startDragging );
        html.canvas.addEventListener( 'mousedown', stopDragging );
        html.animateCirclesBtn.addEventListener( 'click', animateCircles );

        // Рисование мышкой
        html.canvas.ondblclick = startDrawing;
        html.canvas.onmouseup = stopDrawing;
        html.canvas.onmousemove = draw;
    }

    /**
     * @summary Выполняет подготовку к запуску приложения
     * 1. Устанавливает обработчики в HTML
     */
    this.init = function( id ) {
        setHtml( id );
        setContext();
        addListeners();
    };
};

var id = {
    canvasId       : 'canvas-field',
    consoleId      : 'console',
    cheetArea      : 'cheet-area',
    runBtnId       : 'run-btn',
    imgContainer   : 'img-container',
    imgCopy        : 'img-copy',
    randomCircleBtn: 'random-circle',
    ballSize       : 'ball-size',
    animateCircle  : 'animate-circles',
    resetCanvasBtn : 'reset-canvas-btn'
};

// Создаем приложение
var app = new CanvasApp( id );
app.init( id );
