# PKG_Lab_1

**Color Converter** — это приложение для конвертации цветов между различными цветовыми моделями: RGB, CMYK и Lab. С его помощью вы сможете конвертировать цвета между этими моделями, а также выбрать нужный цвет из палитры.

## Основные функции

### RGB (Red, Green, Blue)
- Модель RGB описывает цвет как комбинацию трех основных цветов: красного (Red), зеленого (Green) и синего (Blue).
- Интерфейс включает:
  - Ползунки для изменения значений каждого цвета.
  - Поля ввода для ручного ввода числовых значений (от 0 до 255).
  - Изменение любого параметра RGB автоматически обновляет значения в моделях CMYK и Lab.
![RGB](https://raw.githubusercontent.com/hinnero/PKG_Lab_1/6f2c74d6cae1378e7f8e9f05c42857602323c5ff/roll.png)

### CMYK (Cyan, Magenta, Yellow, Key (Black))
- Эта модель описывает цвета через синий (Cyan), пурпурный (Magenta), желтый (Yellow) и черный (Key).
- Интерфейс включает:
  - Ползунки для изменения значений CMYK.
  - Поля для ввода чисел вручную (от 0 до 1).
  - При изменении CMYK соответствующие цвета в RGB и Lab обновляются автоматически.
![CMYK](https://raw.githubusercontent.com/hinnero/PKG_Lab_1/6f2c74d6cae1378e7f8e9f05c42857602323c5ff/cmyk.png)

### Lab (Lightness, A (green-red), B (blue-yellow))
- Модель Lab включает яркость (Lightness) и двухкомпонентное цветовое пространство: A (зелено-красное) и B (сине-желтое).
- Интерфейс:
  - Ползунки и поля для изменения значений яркости (от 0 до 100) и компонентов A и B (от -128 до 127).
  - Значения обновляются в других моделях автоматически.
![LAB](https://raw.githubusercontent.com/hinnero/PKG_Lab_1/6f2c74d6cae1378e7f8e9f05c42857602323c5ff/lab.png)

## Палитра цветов
- Приложение содержит палитру предустановленных цветов.
- Нажмите на цвет в палитре, чтобы автоматически выбрать его, и соответствующие значения RGB, CMYK и Lab будут обновлены.
![Palette](https://raw.githubusercontent.com/hinnero/PKG_Lab_1/6f2c74d6cae1378e7f8e9f05c42857602323c5ff/palette.png)
![Colours](https://raw.githubusercontent.com/hinnero/PKG_Lab_1/6f2c74d6cae1378e7f8e9f05c42857602323c5ff/colours.png)

## Инструкции по работе

1. **Изменение цвета с помощью RGB, CMYK или Lab**:
   - Используйте ползунки или числовые поля для изменения цвета. Все изменения отображаются в блоке "Selected Color".
   - Изменения в одной модели автоматически пересчитываются для других.

2. **Выбор цвета из палитры**:
   - Нажмите на любой цвет в палитре, чтобы его выбрать. Значения всех моделей (RGB, CMYK и Lab) обновятся автоматически.

## Дополнительные возможности
- **Отображение цвета**: Блок "Selected Color" отображает выбранный цвет в реальном времени.
- **Синхронизация полей**: Все поля и ползунки синхронизированы, что позволяет изменять значения без несоответствий.
- **Валидация ввода**: Приложение автоматически исправляет некорректные значения, ограничивая их в допустимых пределах. В случае некорректного ввода под полем отображения цвета будет показана ошибка на 3 секунды.

## Руководство для программиста
- **Установка и запуск**: Для начала скачайте репозиторий используя git clone <url> и запустите файл index.html
- **Внесение изменений**: При добавлении какого-либо функционала вы можете отправить их в свою ветку и сделать pull request, после одобрения с нашей стороны, ваш функционал попадет в приложение.

## Руководство пользователя ##
- **Запуск приложения**: Запустите программу, дважды щелкнув на исполняемый файл или запустив команду через терминал/консоль.
- **Выбор цветовой модели**: Вы можете работать с любой моделью (RGB, CMYK, Lab) с помощью ползунков или полей для ввода значений.
- **Работа с палитрой**: Для выбора предустановленного цвета нажмите на соответствующий цвет в палитре.
- **Просмотр результата**: Измененные значения автоматически обновят отображаемый цвет в блоке "Selected Color".
- **Исправление ошибок**: Если введено неверное значение, оно автоматически будет скорректировано, а уведомление об ошибке появится под цветом.
