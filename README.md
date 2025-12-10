<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/npm-v11.6.2-gren.svg?logo=npm"/>
    <img src="https://img.shields.io/badge/Node-v24.11.1-gren.svg?logo=nodedotjs"/>
    <img src="https://img.shields.io/badge/NestJS-v11.1.8-gren.svg?logo=NestJS"/>
    <img src="https://img.shields.io/badge/Docker-v3.8-blue.svg?logo=Docker"/>
    <img src="https://img.shields.io/badge/PostgresSQL-v14-blue.svg?logo=postgreSQL"/>
</p>

# TEST NEWS

    Репозиторий с CRUD API для управления категориями с подкатегориями

---------------------

## Содержание

* #### [Описание](#description)
* #### [Наименование коммитов](#commits)
* #### [Конфигурация](#config)
* #### [Запуск проекта](#start)

---------------------

## <a name="description">Описание</a>

Приложение написано на TS, используя NestJS, TypeORM, swagger (доступен по [/swagger]())

* #### Запросы
    * `GET` `/categories` - Список категорий
    * `POST` `/categories` - Создание категории
    * `DELETE` `/categories/{id}` - Удаление категории
    * `PUT` `/categories/{id}` - Изменение категории
    * `GET` `/categories/{id_or_slug}` - Получение категории
    * `GET` `/categories/{id_or_slug}/hierarchy` - Получение иерархии категории
    * #### Алгоритм формирования slug
      Берётся наименование категории и переводится на лаиницу (если требуется), все спецсимволы заменяются на '-'.
      В случае, если категория является дочерней, то все родительские категории так-же отобразятся в slug.
      В случае, если (по какой-то непонятной причине) в одной и той-же дочерней категории будет две категории с
      одинаковыми названиями, то в конце slug добавится -1, -2, -3 и т.д.

      #### Пример:
        * Яблоки `yabloki`
            * Зелёные `yabloki-zelenye`
                * Вкусные `yabloki-zelenye-vkusnye`
                * Вкусные `yabloki-zelenye-vkusnye-1`
                * Вкусные `yabloki-zelenye-vkusnye-2`
            * Жёлтые `yabloki-zheltye`
        * Апельсины `apelsiny`

---------------------

## <a name="commits">Наименование коммитов</a>

* #### Каждый создаваемый коммит должен иметь следующий вид:
      {FIX_OR_FEAT}: {DESCRIPTION}
      Closes {ISSUE_NUMBER}
  #### где:
    * #### FIX_OR_FEAT:
        * `fix` (исправил), если исправление
        * `feat`(добавил), если новый функционал
    * #### DESCRIPTION - описание, что было слеоано (например: `Добавил ендпоинт для получения хлебный крошек`)
    * #### ISSUE_NUMBER - код задачи в YandexTracker (например, `APPNEWS-391`)

---------------------

## <a name="config">Конфигурация</a>

* #### Настраиваем конфигурацию проекта в файле .env:

  | Переменная        | Дефолтное значение | Описание                      |
  |-------------------|--------------------|-------------------------------|
  | PORT              | 8000               | Порт, для запуска приложения  |
  | POSTGRES_HOST     | postgres           | Хост подключения к Postgres   |
  | POSTGRES_PORT     | 5432               | Порт подключения к Postgres   |
  | POSTGRES_USER     | postgres           | Юзер подключения к Postgres   |
  | POSTGRES_PASSWORD | root               | Пароль подключения к Postgres |
  | POSTGRES_DB       | test_news          | База подключения к Postgres   |

---------------------

## <a name="start">Запуск проекта</a>

* #### Билд:

      docker compose build

* #### Запуск:

      docker compose up -d

###### docker compose up -d --build (для запуска с ребилдом)