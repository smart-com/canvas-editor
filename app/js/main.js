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
            'begin-path'    : 'ctx.beginPath();',
            'close-path'    : 'ctx.closePath();',
            'move-canvas'   : 'ctx.translate( 100, 100 );',
            'rotate-canvas' : 'ctx.rotate( 5 );',
            'set-transform' : 'ctx.setTransform( 1, 0, 0, 1, 0, 0 );',
            'scale-canvas'  : 'ctx.scale( 0.33, 0.33 );',
            'clear-rect'    : 'ctx.clearRect( 100, 70, 50, 50 );',
            'clear-shape'   : 'ctx.clip();',
            'move-to'       : 'ctx.moveTo( 100, 100 );',
            'line-to'       : 'ctx.lineTo( 200, 100 );',
            'stroke'        : 'ctx.stroke();',
            'line-width'    : 'ctx.lineWidth = 10;',
            'line-cap-round': 'ctx.lineCap = "round";',
            'line-join'     : 'ctx.lineJoin = "round";',
            'miter-limit'   : 'ctx.miterLimin = 5.2',
            'border-radius' : 'ctx.lineJoin = "round";',
            'stroke-style'  : 'ctx.strokeStyle = "rgb( 105, 96, 236 )";',

            'straight-line': 'ctx.moveTo( 100, 100 );\n' +
                             'ctx.lineTo( 200, 100 );\n' +
                             'ctx.stroke();',

            'arc'         : 'ctx.arc( 100, 30, 50, 0.2 * Math.PI, 1.1 * Math.PI );',
            'bezier'      : 'ctx.bezierCurveTo( 110, 102, 130, 80, 130, 62.5 );',
            'shadow-color': 'ctx.shadowColor = "red";',

            'shadow-offset': 'ctx.shadowOffsetX = 4;\n' +
                             'ctx.shadowOffsetY = 4;',
            'shadow-blur'  : 'ctx.shadowBlur = 10;\n',

            'bg-color': 'ctx.fillStyle = "green";' +
                        'ctx.fillRect( 10, 10, 100, 100 );',
            'opacity' : 'ctx.globalAlpha = 0.5;',

            'create-linear-gradient': 'gradient = ctx.createLinearGradient( 50, 50, 300, 0 );\n' +
                                      'gradient.addColorStop( 0, "green" );\n' +
                                      'gradient.addColorStop( 0.5, "yellow" );\n' +
                                      'gradient.addColorStop( 1, "white" );\n' +
                                      'ctx.fillStyle = gradient;\n' +
                                      'ctx.fillRect( 50, 50, 300, 150 );',

            'create-radial-gradient': 'gradient = ctx.createRadialGradient( 105, 105, 20, 112, 120, 50); \n' +
                                      'gradient.addColorStop( 0, "#FF66B6" );\n' +
                                      'gradient.addColorStop( 0.75, "#FA16D8" );\n' +
                                      'gradient.addColorStop( 1, "#8416FA" );\n' +
                                      'ctx.fillStyle = gradient;\n' +
                                      'ctx.fillRect( 50, 50, 300, 300 );',

            'add-color-stop': 'gradient.addColorStop( 0.3, "orange" );',

            'fill-shape'    : 'ctx.fill();\n',
            'fill-rectangle': 'ctx.fillRect( 10, 10, 100, 100 );',

            'round': 'ctx.arc( 50, 50, 50, 0, 2 * Math.PI, false );' +
                     'ctx.stroke();\n',

            'empty-rectangle'           : 'ctx.strokeRect( 50, 50, 100, 100 );',
            'global-composite-operation': 'ctx.globalCompositeOperation="destination-over";',
            'font'                      : 'ctx.font = "italic bold 32px Tahoma";',
            'fill-text'                 : 'ctx.fillText( "Hello world", 20, 100 );',
            'stroke-text'               : 'ctx.strokeText( "Учим canvas", 300, 200 );',
            'text-align'                : 'ctx.textAlign = "center";',
            'text-baseline'             : 'ctx.textBaseline = "Top";',

            'create-image': 'var image = new Image();\n' +
                            'image.src="app/img/present.png";',

            'create-image-data': '// Черный квадрат 50 x 50 полностью прозрачный\n' +
                                 'var pixelSet = ctx.createImageData( 150, 150 );\n' +
                                 'var pixelSetLen = 4 * 150 * 150,\n' +
                                 '    i;\n\n' +
                                 'for( i = 3; i < pixelSetLen; i += 4 ) {\n' +
                                 '    // Делаем его непрозрачным\n' +
                                 '    pixelSet.data[i] = 255;\n\n' +
                                 '    // каждый 3-й пиксель делаем красным\n' +
                                 '    if( (i - 3 ) % 20 == 0 ) {\n' +
                                 '        pixelSet.data[ i - 3 ] = 255;\n' +
                                 '    }\n' +
                                 '}\n\n' +
                                 '// выводим изображение\n' +
                                 'ctx.putImageData( pixelSet, 20, 20 );',

            'get-image-data': 'ctx.fillStyle = "red";\n' +
                              'ctx.fillRect( 10, 10, 100, 40 );\n' +
                              'ctx.fillStyle = "green";\n' +
                              'ctx.globalAlpha = "0.5";\n' +
                              'ctx.fillRect( 90, 30, 50, 50 );\n\n' +
                              'var Pixel = ctx.getImageData( 10, 10, 1, 1 );\n' +

                              'alert(\n' +
                              '  "Pixel 1:" + +Pixel.data[ 0 ]+ ","\n' +
                              '     +Pixel.data[ 1 ]+ ","\n' +
                              '     +Pixel.data[ 2 ]+ ","\n' +
                              '     +Pixel.data[ 3 ]\n);\n\n' +

                              'var Pixel = ctx.getImageData( 90, 30, 1, 1 );\n\n' +

                              'alert(\n' +
                              '  "Pixel 1:" + +Pixel.data[ 0 ]+ ","\n' +
                              '     +Pixel.data[ 1 ]+ ","\n' +
                              '     +Pixel.data[ 2 ]+ ","\n' +
                              '     +Pixel.data[ 3 ]\n);\n\n',

            'put-image-data': 'ctx.fillRect( 0, 0, 100, 100);\n' +
                              'var imagedata = ctx.getImageData( 0, 0, 100, 100 );\n' +
                              'ctx.putImageData( imagedata, 150, 0, 50, 50, 25, 25 );\n\n',

            'tile-canvas': 'var tileImage = new Image();\n' +
                           'tileImage.src="app/img/present.png";\n\n' +
                           'tileImage.onload = function() {\n' +
                           '  var pattern = ctx.createPattern( tileImage, "repeat" );\n' +
                           '  ctx.fillStyle = pattern;\n' +
                           '  ctx.fillRect( 0, 0, 300, 300 );\n' +
                           '}',

            'to-data-url': 'ctx.fillRect( 10, 10, 20, 20 );\n' +
                           'ctx.fillStyle = "green";\n' +
                           'ctx.fillRect( 40, 40, 20, 20 );\n' +
                           'var scrImg = html.canvas.toDataURL();\n' +
                           'alert( scrImg )\n\n',
            ''           : '' // Это бесполезная штука, чтобы легче копировать кнопки
        },

        /**
         * @summary Объект с кнопками для управления консолью
         *
         * @description
         * Эта группа кнопок расположена отдельно в HTML
         * Они запускают код, который не требует редактирования,
         * Ключ - идентификатор кнопки,
         * Значение - код, который должен выполниться
         * при нажатии пользователем на кнопку с этим идентификатором
         */
        ctrlBtnVal             = {
            'clear-console-btn'  : 'html.console.innerText = "";',
            'clear-canvas-btn'   : 'ctx.clearRect( 0, 0, html.canvas.width, html.canvas.height );',
            'clear-cheet-btn'    : 'html.cheetArea.innerText = "";',
            'save-context-btn'   : 'ctx.save();',
            'restore-context-btn': 'ctx.restore();',
            ''                   : ''  // Это бесполезная штука, чтобы легче копировать кнопки
        },

        /**
         * @summary Объект с кнопками код которых выполняется
         * частично в консоли, частично без нее ( там правки не нужны...)
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

        // Вспомогательные переменные

        // Предыдущий выбранный круг
        previousSelectedCircle = {},
        // Звук проигрывается во время клика по кругу
        clickSound             = new Audio( 'app/media/popup.mp3' ),
        // Флаг показывает возможность перетаскивания
        isDragging             = false,
        // Таймаут для анимации надо подбирать
        // Эта зараза зависит еще и от количества
        // созданных кругов - если их слишком много,
        // то эффект замедленной съемки...
        timeout                = 10,
        timeoutIDForFallBalls,
        isDrawing              = false,
        gradient;

    /**
     * @summary Показывает подсказку для используемых в консоли функций
     * @param event
     */
    function showCheet( event ) {
        var event = event || window.event;
        // Клики срабатывают только на кнопках
        if( event.srcElement.classList.contains( 'widget-container' ) ) {
            return;
        }

        // Подсказка - следующий элемент после родителя источника события
        var cheet = event.target.parentElement.nextElementSibling;
        // Если подсказка есть, и это точно она
        if( cheet && cheet.classList.contains( 'desc' ) ) {
            // Показываем подсказку
            cheet.style.display = 'block';
            html.cheetArea.appendChild( cheet );
        } else {
            return;
        }
    }

    /**
     * @summary При нажатии кнопки устанавливает код в консоль
     */
    var setConsoleValue = function() {

        event = event || window.event;
        console.log( event );

        // Это все касается исключительно кнопок
        if( !event.path[ 2 ].classList.contains( 'animate-buttons' ) &&
            event.srcElement.parentElement.classList.contains( 'btn' ) ) {

            if( window.getSelection ) {
                // Где курсор
                var caret = window.getSelection().anchorOffset;
                // Объект Selection
                var selObj = window.getSelection();

                // Удаляет выделенный участок из дома
                // если закомментировать эту строку,
                // то текст будет вставлен после выделенного
                selObj.deleteFromDocument();
                // Считываем HTML из консоли
                var text = html.console.innerHTML;
                // Вставляем код из нажатой кнопки
                text =
                    text.substring( 0, caret ) + '\n' +
                    canvasBtnVal[ event.target.id ] +
                    text.substring( caret );
                // Выводим результат в консоль
                html.console.innerHTML = text;

                html.console.focus();
                // Создаем объект Range для управления положением курсора
                var range = document.createRange();
                // Он целиком в консоли
                var start = html.console.childNodes[ 0 ];
                var end = html.console.childNodes[ 0 ];
                // Задаем верхнюю границу, передав контейнер и смещение
                range.setStart( start, caret );
                // Устанавливаем нижнюю границу выделения
                range.setEnd( end, caret + canvasBtnVal[ event.target.id ].length + 1 );
                // Совмещаем начало и конец на старте.
                // В примере должно было быть true
                // Передав false мне каким-то чудом удалось
                // установить курсор в конец выделенного текста
                range.collapse( false );
                // Создаем новое выделение
                var sel = window.getSelection();
                // Удаляем все предыдущие
                sel.removeAllRanges();
                // Добавляем новое выделение
                // С курсором все хорошо
                sel.addRange( range );
            }
        }

        // После всего этого, показываем подсказку
        var descriptionElem = event.target.parentElement.nextElementSibling;
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
        var consoleCode = getConsoleValue();
        var runConsole = new Function( 'html', 'ctx', consoleCode );
        runConsole( html, ctx );
    }

    /**
     * @summary В отличие от обычной очистки холста
     * Это полный сброс канваса вместе с анимацией
     */
    function resetCanvas() {
        clearTimeout( timeoutIDForFallBalls );
        circles = [];
        ctx.clearRect( 0, 0, html.canvas.width, html.canvas.height );
        ctx.beginPath();
    }

    /**
     * @summary Запускает управляющий код без участия консоли
     * @listens click:MouseEvents
     *
     * @param { object } event click:MouseEvents
     */
    function runCode( event ) {
        event = event || window.event;
        /** TODO: Я уже не помню, зачем я разделила эти кнопки на два объекта... */
        var code = ctrlBtnVal[ event.target.id ] || additionalBtnVal[ event.target.id ];
        // Запускаем код, показываем подсказку
        var run = new Function( 'html, ctx', code );
        run( html, ctx );
        showCheet();
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
     * @param { Number } [ opacity = 0.65 ] Прозрачность кругов
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

    /**
     * @summary Анимирует все круги из массива
     */
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

    /**
     * @summary Рисуем мышкой
     * @listens click:MouseEvent
     * @param event:MouseEvent - двойной клик по канвасу
     */
    function startDrawing( event ) {
        // Говорим всем, что мы рисуем
        isDrawing = true;
        ctx.beginPath();
        // Устанавливаем координаты куда рисовать
        ctx.moveTo(
            event.clientX - html.canvas.getBoundingClientRect().left,
            event.clientY - html.canvas.getBoundingClientRect().top
        );
    }

    /**
     * @summary Пока мышка двигается, рисуем по канвасу
     * Останавливаемся после одинарного клика.
     * @listens click:MouseEvent
     * @param event:MouseMove - одинарный клик по канвасу
     */
    function draw( event ) {
        if( isDrawing === true ) {
            var x = event.clientX - html.canvas.getBoundingClientRect().left;
            var y = event.clientY - html.canvas.getBoundingClientRect().top;
            ctx.lineTo( x, y );
            ctx.stroke();
        }
    }

    /**
     * @summary Больше не рисуем по канвасу
     */
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
    function addListeners( event ) {

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

