### Задача
Разработать `http` сервис Книга заявок ( OrderBook ). 

АПИ взаимодействия:
- добавление
- удаление
- получение текущего состояния OrderBook

### Размышления о задаче
В качестве БД была выбрана PostgreSql. На ней просто делать блокировки доступа к ресурсам.

Для лучшей производительности разделил `ask` и `bid` на отдельные таблицы.

Тестов нет.


### Сборка проекта

Сборка
`docker-compose build`

Создание файла переменных окружения `.env`
`cp .env.dist .env`

Установка зависимостей
`npm i`

Запуск докера
`docker-compose up -d`

Применение миграций
`npm run migration:run`

Запуск приложения
`npm run migration:run`


### АПИ

##### Стакан заявок 
```
GET http://127.1:3000/order-books/snapshot`
```

##### Добавление в стакан предложения
```
POST http://127.1:3000/order-books/bid
Content-Type: application/json

{
  "price": 8800, "volume": 10
}
```

##### Добавление в стакан спрос
```
POST http://127.1:3000/order-books/ask
Content-Type: application/json

{
  "price": 8800, "volume": 10
}
```

##### Удаление из стакана спроса 
```
DELETE http://127.1:3000/order-books/ask/1
Accept: application/json
```

##### Удаление из стакана предложения
```
DELETE http://127.1:3000/order-books/bid/1
Accept: application/json
```
