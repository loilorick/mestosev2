# Настройка проекта

Установка зависимостей

    npm install

Создать файл .env в корневом каталоге и добавить конфигурацию БД

    DATABASE_URL="mysql://root:secret@localhost:3306/nature2"

Выполнить миграцию БД из конфигурации ORM Prisma

    npx prisma migrate dev

Запуск веб-сервера

    npm run dev

Конфигурационный файл отладки VSCode

    {
        "type": "node",
        "request": "launch",
        "name": "Debug TS",
        "skipFiles": [
            "<node_internals>/**"
        ],
        "runtimeArgs": [
            "--nolazy"
        ],
        "sourceMaps": true,
        "program": "${workspaceFolder}/index.ts",
        "outFiles": [
            "${workspaceFolder}/**/*.js"
        ]
    }

    <!-- Админский аккаунт -->

    insert into users(username, password, type) values("Admin", "13422431", "A" );