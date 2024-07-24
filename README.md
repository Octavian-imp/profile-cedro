# `Сборка Gulp`

В сборке есть:
- TailwindCss (нужно включить в gulpfile)
- gulp-scss (для работы с scss)
- gulp-avif (конвертер картинок в avif)
- gulp-webp (конвертер картинок в webp)
- gulp-imagemin (сжатие картинок)
- gulp-fonter (для конвертирования локальных шрифтов)

перед началом работы выполнить

```bash
    npm install
```

### `Структура сборки`

```bash
├───app
│   ├───assets
│   │   ├───fonts
│   │   │   ├───dist
│   │   │   └───src
│   │   └───images
│   │       ├───dist
│   │       │   └───stack
│   │       └───src
│   ├───components
│   ├───js
│   ├───minify -- минифицированные версии файлов из папок js и scss
│   │   ├───css
│   │   └───js
│   ├───pages
│   ├───scss
│   └───*.html -- страницы сгенерированные gulp-includoм
└───build
    ├───assets
    │   ├───fonts
    │   │   └───dist
    │   └───images
    │       └───dist
    ├───minify
    │    ├───css
    │    └───js
    └───*.html -- конечные страницы проекта
```
