# TEMNOTA II: SIXXXSEVEN

Статический лендинг для GitHub Pages без сборки.

## Публикация через GitHub Pages

1. Создай новый публичный репозиторий на GitHub.
2. Загрузи файлы проекта в корень репозитория.
3. Открой `Settings` -> `Pages`.
4. В `Build and deployment` выбери `Deploy from a branch`.
5. Выбери ветку `main` и папку `/root`.
6. Через пару минут сайт будет доступен по адресу вида `https://username.github.io/repository-name/`.

## Свой домен

1. В `Settings` -> `Pages` укажи домен в поле `Custom domain`.
2. У регистратора домена добавь DNS-записи, которые покажет GitHub.
3. После проверки включи `Enforce HTTPS`.

Файл `.nojekyll` нужен, чтобы GitHub Pages раздавал проект как обычный статический сайт.
