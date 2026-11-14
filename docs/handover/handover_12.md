# Глава 12 · Praktikums: Drošības sistēma / Practicum: Flight safety system

## Студент теперь знает (накопительно с главы 1)
- Полный фундамент языка C++: компиляция, типы данных, арифметика, консольный потоковый ввод/вывод (`cin`, `cout`, `getline`).
- Полный инструментарий принятия решений Блока 2 («LĒMUMI»):
  - Базовое ветвление: `if`, `else`, каскад `if ... else if ... else`.
  - Все операторы сравнения: `==`, `!=`, `<`, `>`, `<=`, `>=`.
  - Логические операторы: `&&` (И), `||` (ИЛИ), `!` (НЕ), правила приоритетов со скобками.
  - Короткая схема вычислений (short-circuit evaluation) и её применение для безопасной обработки данных.
  - Многопутевой выбор: `switch`, метки `case`, обязательный `break;`, группировка меток, ветка по умолчанию `default:`.
  - Тернарный оператор `?:` для лаконичных выражений и присваивания.
  - Комплексный синтез: вложенные условия, комбинация `switch` с `if/else`, валидация и фильтрация входящей телеметрии.

## Карантин для следующей главы
- **Циклы** (`while`, `for`, `do-while`, `break` внутри циклов, `continue`) — начинаются со следующей главы 13 (Блок 3: «DATI & CIKLI»).
- **Массивы и 2D-массивы** — с глав 17–18.
- **Динамические массивы (`std::vector`) и собственные функции** — с глав 19–22.
- **Исключения (`try/catch/throw`) и работа с файлами (`fstream`)** — запрещены в браузере.

## Миссия
- **Активные аппараты:** лёгкий разведчик IZLŪKS «Sigma» и тяжёлый исследователь KARTOGRĀFS «Delta».
- **Что произошло:** К каньону Mawrth Vallis подошёл мощный фронт марсианской пылевой бури. Ситуация потребовала объединить оба дрона в единый периметр безопасности эскадры. Студент создал многоуровневый контроллер безопасности, учитывающий индивидуальные уязвимости каждого аппарата (ветер и высота для Sigma, запыление оптических апертур лидара для Delta), и реализовал аварийный протокол эвакуации базы.
- **Что ведёт к следующей главе:** Блок 2 завершён! Теперь аппараты умеют принимать сложные логические решения. Однако сейчас программа выполняется один раз и завершается. Чтобы дроны непрерывно контролировали параметры в реальном времени во время полёта, в главе 13 мы открываем Блок 3 и изучаем цикл `while`.

## Новые термины
- defense-in-depth / dziļā aizsardzība / нужно проверить
- multi-tier safety architecture / daudzlīmeņu drošības arhitektūra / нужно проверить
- telemetry pre-filtering / telemetrijas priekšfiltrēšana / нужно проверить
- mission clearance controller / misijas atļauju kontrolieris / нужно проверить
- emergency evacuation override / ārkārtas evakuācijas prioritārais protokols / нужно проверить

## Использовано
- **Архивная справка (`archive`, шаг `safety-architecture`):** «Dziļās aizsardzības (Defense-in-Depth) princips kosmonautikā» / «Defense-in-depth in aerospace flight computers» — многоуровневая архитектура безопасности в реальной авионике; обработка приоритетов задач бортовым компьютером AGC в миссии Apollo 11 при перегрузке процессора (ошибки 1201/1202); каскадная фильтрация телеметрии на марсоходе Perseverance (NASA Mars 2020). Источники: David A. Mindell, 'Digital Apollo: Human and Machine in Spaceflight', MIT Press; NASA JPL, 'Mars 2020 Avionics and Flight Software Architecture Overview'.
- **Элементы эталонного формата:** практические задания с одноуровневыми нумерованными списками от 1 до 5 (шаги `sigma-wind-guard`, `delta-sensor-dispatcher`, `power-allocator-ternary`, `squadron-safety-controller`, `storm-evacuation-override`), интерактивная сборка `parsons` (шаг `assemble-sensor-packet`), поиск логической ловушки `clickline` (шаг `find-safety-bug`), прогнозирование вывода `predict` (шаги `predict-storm-hazard`, `predict-edge-cases`), итоговая сравнительная таблица в `recap`.
- **Визуалы:** концепт-иллюстрация `assets/l12-safety-architecture.jpg` (шаг `safety-architecture`).
