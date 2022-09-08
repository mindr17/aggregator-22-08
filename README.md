### Install Postgres database, стандартный порт 5432
Установка https://www.postgresql.org/download/
Подключиться `sudo -u postgres psql aggregator`
Смотреть порт, пути и тд `pg_lsclusters`
Список баз данных `\l`
Список таблиц `\dt`
### Start scrapers in dev mode
```bash
cd prices-scraper && npm i && npm run dev
```
### Start backend in dev mode, порты 3030, 3031, 5000
```bash
cd backend && npm i && npm run dev
```
### Start frontend in dev mode, порт 3000
```bash
cd frontend && npm i && npm run dev
```

# В работе использованы следующие библиотеки и технологии:
## Скрейпер
axios - Запросы скрейпера к ресурсам
tradingview-ws - Запросы к api Tradingview.com
rss-parser - Обработка новостей
fast-xml-parser - Обработка новостей
pg - Сохранение в бд
esbuild - Сборка для деплоя
dotenv - Возможность удобного использования различных настроек на локалке и деплое
typescript - Типизация, компиляция
## Основной бекенд
typescript - Частичная типизация, компиляция. Модуль авторизации написан на js, переписать не успели
body-parser - Middleware для обработки тела запроса к бекенду, преобразование из json в объект
cors - Middleware для кроссдоменных запросов
express - http сервер и взаимодействие с middleware
ws - Вебсокет сервер
pg - Выборки из бд
bcrypt - Шифрование паролей для авторизации
ts-node-dev - Livereload для ts
nodemon - Livereload для js
mongoose - Работа с mongodb
esbuild - Сборка для деплоя
dotenv - Возможность удобного использования различных настроек на локалке и деплое
typescript - Типизация, компиляция
## Фронтенд
Nextjs - Фреймворк поверх React, сборка, scss, роутинг, фронтенд сервер, выполнена частичная подготовка для серверного рендеринга
chart.js - Графики
react-toastify - Уведомления
formik - Валидация форм
eslint, prettier - Структурирование кода
