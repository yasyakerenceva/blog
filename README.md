Области хранения данных:

-   база данных на json-server
-   BFF
-   redux store

Сущности приложения:

-   пользователь: БД (список пользователей), BFF (сессия текущего), store (отображение в
    браузере)
-   роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), store
    (использование на клиенте)
-   статья: БД (список статей), store (отображение в браузере)
-   комментарий: БД (список комментариев), store (отображение в браузере)

Таблицы БД:

-   пользователи - users: id / login / password / registed_id / role_id
-   роли - roles: id / name
-   статьи - posts: id / title / image_url / content / published_at
-   комментарии - comments: id / author_id / post_id / content / published_at

Схема состояния на BBF:

-   сессия текущего пользователя: login / password / role

Схема для redux store (клиент):

-   user: id / login / roleId / session
-   posts: array post: id / title / imageUrl / publishedAt / commentsCount
-   post: id / title / imageUrl / content / publishedAt / comments : array comment:
    id / author / content / publishedAt
-   users: array user: id / login / registeredAt / role
