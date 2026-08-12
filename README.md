[README.md](https://github.com/user-attachments/files/30992289/README.md)
# Lunex CS2 Upgrader — обновлённая demo-версия

## Что изменено

- Реальные изображения CS2-предметов из Steam CDN.
- Полностью рабочий Upgrade.
- Выбор source/target.
- Расчёт multiplier и win chance.
- Анимация roll.
- WIN/LOSS modal.
- Кейсы.
- Инвентарь.
- История.
- LocalStorage.
- Адаптивный интерфейс для телефона.

## Важно

Это **демо без реальных денег, Steam-авторизации и реальных сделок**.

Изображения предметов загружаются по внешним URL Steam CDN, поэтому при открытии GitHub Pages нужен интернет.

## GitHub Pages

1. Загрузите `index.html`, `style.css`, `script.js`.
2. Commit changes.
3. Settings → Pages.
4. Deploy from branch → `main` → `/root`.
5. Откройте выданный GitHub Pages URL.

Для реального проекта понадобятся backend, авторизация Steam, безопасная серверная логика, база данных и отдельная система цен.


FIX: renamed the upgrade page and upgrade button IDs so the JavaScript no longer selects the wrong element.
