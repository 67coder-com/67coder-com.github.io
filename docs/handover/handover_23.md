# Глава 23 · PRAKTIKUMS: funkciju bibliotēka / Practicum: A Function Library

## Студент теперь знает (накопительно с главы 1)
- Фундамент C++: типы данных, ввод/вывод `cin`/`cout`, ветвления (`if/else`, `switch/case`, `?:`, логические операторы).
- Циклы: `while`, `do-while`, `for`, операторы `break` и `continue`.
- Массивы (1D и 2D), динамические массивы (`std::vector`).
- Полный комплекс концепций функций и модульного проектирования:
  - Выделение логических подсистем в библиотечные модули (`libiris`).
  - Три фундаментальных способа передачи параметров:
    - По значению (by value): математические предикаты (`is_valid`, `clamp`, `diff`) с гарантией отсутствия побочных эффектов.
    - По ссылке (by reference `&`): подпрограммы калибровки (`calibrate`, `apply_trim`, `swap`) с прямым изменением переменных вызывающего кода в памяти и возвратом нескольких значений.
    - По константной ссылке (by const reference `const &`): потоковая аналитика векторов (`compute_sum`, `find_min`, `fleet_energy_summary`) без затрат на копирование памяти.
  - Перегрузка функций (`function overloading`): создание одноименных валидаторов диапазона (`in_range(v, max)` и `in_range(v, min, max)`).
  - Сборка сквозного конвейера бортовой диагностики авионики флота IRIS.

## Карантин для следующей главы
- **Контрольный пункт (аттестация ядра 1–24)** — глава 24!
- Расширение курса (Блок 4: Автономия, главы 25–32: строки, struct, fstream) — закрыто до аттестации.
- Указатели, `new`/`delete` — закрыты.
- try/catch/throw — запрещены.

## Миссия
- **Активные аппараты:** весь флот IRIS: разведчик **IZLŪKS «Sigma»**, картограф **KARTOGRĀFS «Delta»** и грузовой дрон **KRAVAS «Omega»**.
- **Что произошло:** Все три дрона собраны в центральном ангаре базы IRIS для масштабной предполетной подготовки. Студент объединил все разрозненные подпрограммы в единую библиотеку авионики `libiris`: предикаты валидации сигналов, калибраторы датчиков и высокопроизводительный анализатор общего энергобаланса флота с отслеживанием критических контейнеров.
- **Что ведёт к следующей главе:** В Главе 24 наступает решающий рубеж: **KONTROLPUNKTS** — квалификационный экзамен оператора флота, подводящий итог изучению всего фундаментального ядра C++ (главы 1–24).

## Новые термины
- function library / funkciju bibliotēka / библиотека функций / нужно проверить
- predicate function / predikāta funkcija / предикатная функция / нужно проверить
- clamping / ierobežošana / ограничение диапазона / нужно проверить
- diagnostic pipeline / diagnostikas plūsma / диагностический конвейер / нужно проверить
- component framework / komponentu ietvars / компонентный каркас / нужно проверить

## Использовано
- **Концепт-иллюстрация (`assets/l23-why-library.jpg`, шаг `library-architecture`):** центральный ангар базы IRIS на Марсе, залитый солнечным светом; все три дрона флота (Sigma, Delta, Omega) вокруг светящейся 3D-голографической матрицы модульной библиотеки `libiris`.
- **SVG-схема («IRIS Avionics Function Library Architecture», шаг `library-modules-anatomy`):** [l23-library-architecture.en.svg](file:///c:/Data/67coder/67coder-com.github.io/content/cpp/assets/l23-library-architecture.en.svg) и [l23-library-architecture.lv.svg](file:///c:/Data/67coder/67coder-com.github.io/content/cpp/assets/l23-library-architecture.lv.svg) — три архитектурных столпа библиотеки: предикаты (by value), калибровка (by reference) и аналитика векторов (const &).
- **Архивная справка (`archive`, шаг `library-architecture`):** «Modulārās lidojumu programmatūras ietvars: NASA JPL F Prime (F')» / «Modular flight software frameworks: NASA JPL F Prime (F')» — архитектура марсианского вертолета Ingenuity на открытом компонентном фреймворке F Prime.
- **Элементы эталонного формата:** практические задачи кодирования (шаги `write-math-helpers`, `write-vector-statistics`, `write-overloaded-range-check`, `capstone-avionics-suite`), сборка `parsons` (шаг `assemble-telemetry-pipeline`), поиск ошибки `clickline` (шаг `find-library-ref-bug`), прогнозирование вывода `predict` (шаг `predict-library-pipeline`), сводная таблица в `recap`.
