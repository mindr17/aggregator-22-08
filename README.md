### Install Postgres database, стандартный порт 5432
Установка https://www.postgresql.org/download/  
Смотреть порт, пути и тд `pg_lsclusters`  
Подключиться `sudo -u postgres psql aggregator`  
Список баз данных `\l`  
Список таблиц `\dt`  
Выход `\q`
Инструкция по созданию таблиц в db/ReadMe.txt 
### Install RabbitMQ
https://www.rabbitmq.com/install-debian.html#apt-quick-start-cloudsmith
### Start RabbitMQ producer
```bash
cd rabbitmq-producer && npm i && npm run dev
```
### Start news and prices scrapers in dev mode
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
pg - Сохранение в бд  
esbuild - Сборка для деплоя  
dotenv - Переменные окружения  
typescript - Типизация, компиляция  
amqplib - RabbitMQ
## Основной бекенд
typescript - Частичная типизация, компиляция. Модуль авторизации написан на js, переписать не успели  
body-parser - Middleware для обработки тела запроса к бекенду, преобразование из json в объект  
cors - Middleware для кроссдоменных запросов  
express - http сервер и взаимодействие с middleware  
ws - Вебсокет сервер  
pg - Выборки из бд  
bcryptjs - Шифрование паролей для авторизации  
ts-node-dev - Livereload  
mongoose - Работа с mongodb  
esbuild - Сборка для деплоя  
dotenv - Переменные окружения  
typescript - Типизация, компиляция  
## Фронтенд
Nextjs - Фреймворк поверх React, сборка, scss, роутинг, фронтенд сервер, выполнена частичная подготовка для серверного рендеринга  
chart.js - Графики  
react-toastify - Уведомления  
formik - Валидация форм  
eslint, prettier - Структурирование кода  
swr - Stale While Revalidate - Рендеринг даты при SSG

## Интересные нюансы
- Обязательно каждому члену команды тестить не только сборку билда, но и его запуск локально  
- bcrypt выдает ошибки при билде, перешли на bcryptjs, спасибо за идею ThorsAngelVadzim  
- Файлы json не включаются в билд esbuild, нужно использовать только при необходимости, а если ты их не гитигноришь, то они имеют мало смысла, можно писать сразу в ts и тем самым включать в билд.  
- Чтобы выкладывать в папку, нужно настроить префиксы в конфиге и отдельно настроить префиксы для ссылок  
- Чтобы работали подпапки для api, достаточно добавить в конце пути прямой слеш  
- Серверный рендеринг поднял Google Page Speed на мобильном устройстве до 99 из 100  
- Даты при SSG нужно оборачивать в swr.  
- Стало в 2 раза больше знаний по деплою).  
- Для билда на продакшене 1гб оперативы недостаточно  
- Научились использовать переменные окружения для фронта.  
