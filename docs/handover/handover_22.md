# Глава 22 · Pārslodze, redzamība, const / Overloading, Scope, and Const

## Студент теперь знает (накопительно с главы 1)
- Фундамент C++: типы данных, ввод/вывод `cin`/`cout`, ветвления (`if/else`, `switch/case`, `?:`, логические операторы).
- Циклы: `while`, `do-while`, `for`, операторы `break` и `continue`.
- Массивы (1D и 2D), динамические массивы (`std::vector`).
- Функции:
  - Определение, вызов, возвращаемый тип, прототипы, процедуры `void`.
  - Передача параметров: по значению, по ссылке `&`, по константной ссылке `const &`.
  - Перегрузка функций (`function overloading`):
    - Определение нескольких функций с одинаковым именем и различными сигнатурами параметров (разное число параметров или разные типы).
    - Разрешение перегрузки на этапе компиляции (compile-time dispatch / name mangling) без накладных расходов во время выполнения.
    - Ограничение: функции нельзя перегружать только по возвращаемому типу.
  - Область видимости (`scope`) и время жизни (`lifetime`):
    - Локальная видимость внутри блока фигурных скобок `{}`.
    - Уничтожение локальных переменных при выходе из блока закрывающей скобкой `}`.
    - Затенение переменных (`variable shadowing`) во вложенных областях видимости.
    - Глобальные неизменяемые константы `const`, доступные всем модулям программы.

## Карантин для следующей главы
- **Практикум: библиотека функций (модули, комплексная интеграция)** — глава 23!
- **Контрольный пункт (аттестация ядра 1–24)** — глава 24.
- Указатели, `new`/`delete`, структуры `struct` — закрыты.
- try/catch/throw, fstream — запрещены.

## Миссия
- **Активные аппараты:** флот IRIS: разведчик **IZLŪKS «Sigma»**, картограф **KARTOGRĀFS «Delta»** и грузовой дрон **KRAVAS «Omega»**.
- **Что произошло:** Флот работает в единой координатной сетке каньона Mawrth Vallis. Студент запрограммировал перегруженные функции расчета профиля полета `profile` и расхода топлива `burn`, автоматически адаптирующиеся под легкий разведывательный полет Sigma, тяжелую транспортировку контейнеров Omega и штормовые марсианские условия.
- **Что ведёт к следующей главе:** В Главе 23 проводится **Практикум (PRAKTIKUMS: funkciju bibliotēka)** — сборка собственной комплексной библиотеки функций для бортовой операционной системы базы IRIS.

## Новые термины
- function overloading / funkciju pārslogošana / перегрузка функций / нужно проверить
- function signature / funkcijas paraksts / сигнатура функции / нужно проверить
- name mangling / nosaukumu kodēšana / декорирование имен / нужно проверить
- scope / redzamības apgabals / область видимости / нужно проверить
- block scope / bloka redzamība / блочная область видимости / нужно проверить
- lifetime / dzīves cikls / время жизни переменной / нужно проверить
- variable shadowing / mainīgā aizēnošana / затенение переменной / нужно проверить

## Использовано
- **Концепт-иллюстрация (`assets/l22-why-overloading.jpg`, шаг `why-overloading-and-scope`):** дроны Sigma и Omega над залитым полуденным солнцем марсианским каньоном с двойным голографическим проектором профилей полета (легкий разведчик vs тяжелый транспортник).
- **SVG-схема («Function Overloading & Scope», шаг `function-overloading-syntax`):** [l22-overload-scope.en.svg](file:///c:/Data/67coder/67coder-com.github.io/content/cpp/assets/l22-overload-scope.en.svg) и [l22-overload-scope.lv.svg](file:///c:/Data/67coder/67coder-com.github.io/content/cpp/assets/l22-overload-scope.lv.svg) — схема разрешения перегрузки по сигнатуре и границы времени жизни локальных переменных внутри блоков `{}`.
- **Архивная справка (`archive`, шаг `why-overloading-and-scope`):** «Nosaukumu kodēšana (Name Mangling) un simbolu atpazīšana C++» / «Compile-time name mangling and symbol resolution in C++» — внутреннее декорирование имен компилятором C++ (`_Z6thrusti`) для обеспечения нулевых накладных расходов.
- **Элементы эталонного формата:** интерактивный шаблон `compare` с `compareCaptions` (шаг `variable-scope-and-shadowing`), одноуровневые списки 1..N в заданиях (шаги `write-overloaded-burn`, `drone-fleet-thrust-manager`), сборка `parsons` (шаг `assemble-const-scope-guard`), поиск ошибки выхода из области видимости `clickline` (шаг `find-scope-leak-bug`), прогнозирование вывода `predict` (шаги `predict-overload-dispatch`, `predict-scope-lifetimes`), сводная таблица в `recap`.
