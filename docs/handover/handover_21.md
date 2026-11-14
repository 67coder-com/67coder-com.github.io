# Глава 21 · Funkcijas: parametru nodošana / Functions: Passing Parameters

## Студент теперь знает (накопительно с главы 1)
- Фундамент C++: типы данных, ввод/вывод `cin`/`cout`, ветвления (`if/else`, `switch/case`, `?:`, логические операторы).
- Циклы: `while`, `do-while`, `for`, операторы `break` и `continue`.
- Массивы (1D и 2D) и динамические массивы (`std::vector`).
- Функции (базовые концепции и способы передачи параметров):
  - Передача по значению (`pass by value`): создание изолированной копии, безопасность для базовых примитивов (`int`, `double`, `bool`, `char`).
  - Передача по ссылке (`pass by reference`, синтаксис `T &param`):
    - Создание псевдонима (alias) к переменной вызывающей функции.
    - Изменение переменной вызывающего кода прямо в памяти (in-place modification).
    - Возврат нескольких значений из подпрограммы через ссылочные параметры.
    - Классический алгоритм обмена значений `swap(int &a, int &b)` с использованием временной переменной.
  - Передача по константной ссылке (`pass by const reference`, синтаксис `const T &param`):
    - Принцип zero-copy: передача вектора `std::vector` или строки без копирования байтов в памяти.
    - Защита от случайной модификации: любая попытка записи в константную ссылку вызывает ошибку компиляции.
    - Золотой стандарт C++ для передачи тяжелых контейнеров и структур данных.

## Карантин для следующей главы
- **Перегрузка функций (`overload`)**, область видимости (`scope`), локальные и глобальные переменные, ключевое слово `const` — открываются в следующей главе 22!
- Практикум: своя библиотека функций — глава 23.
- Контрольный пункт (аттестация ядра 1–24) — глава 24.
- Указатели, `new`/`delete`, структуры `struct` — закрыты.
- try/catch/throw, fstream — запрещены.

## Миссия
- **Активные аппараты:** флот IRIS: разведчик **IZLŪKS «Sigma»**, картограф **KARTOGRĀFS «Delta»** и грузовой дрон **KRAVAS «Omega»**.
- **Что произошло:** При полетах вдоль марсианского хребта Mawrth Vallis бортовые компьютеры дронов синхронизируют телеметрию тяги двигателей и перераспределяют энергопитание между контейнерами жизнеобеспечения. Студент запрограммировал модуль обмена координат `swap_coords`, функцию триммирования дросселя `adjust_throttle` и высокопроизводительный инспектор пиковых сигналов `scan_peak` без копирования векторов.
- **Что ведёт к следующей главе:** Разные дроны флота требуют разных параметров расчета (легкий Sigma против тяжелого Omega). В Главе 22 изучается **Перегрузка функций, область видимости и спецификатор const**.

## Новые термины
- pass by value / nodošana pēc vērtības / передача по значению / нужно проверить
- pass by reference / nodošana pēc norādes / передача по ссылке / нужно проверить
- reference / norāde / ссылка / нужно проверить
- const reference / const norāde / константная ссылка / нужно проверить
- alias / sinonīms / псевдоним / нужно проверить
- zero-copy / nulles kopēšana / без копирования / нужно проверить
- in-place modification / tieša atjaunināšana atmiņā / изменение на месте / нужно проверить

## Использовано
- **Концепт-иллюстрация (`assets/l21-why-references.jpg`, шаг `why-references`):** дроны Sigma и Omega над залитым солнцем марсианским хребтом Mawrth Vallis с голографическими потоками телеметрии, визуализирующими прямое обновление памяти дрона по ссылке.
- **SVG-схема («Parameter Passing Modes», шаг `pass-by-value-vs-ref`):** [l21-param-passing.en.svg](file:///c:/Data/67coder/67coder-com.github.io/content/cpp/assets/l21-param-passing.en.svg) и [l21-param-passing.lv.svg](file:///c:/Data/67coder/67coder-com.github.io/content/cpp/assets/l21-param-passing.lv.svg) — наглядное сравнение работы со стеком при передаче по значению, по ссылке и по const-ссылке.
- **Архивная справка (`archive`, шаг `why-references`):** «Atmiņas joslas platums un nulles kopēšana Marsa borta datoros» / «Memory bandwidth and zero-copy buffers in Mars flight computers» — процессор BAE RAD750 (133 MHz) на марсоходах Curiosity и Perseverance; регламент NASA JPL по запрету лишнего копирования буферов памяти.
- **Элементы эталонного формата:** интерактивный шаблон `compare` с `compareCaptions` (шаг `const-reference-for-containers`), одноуровневые списки 1..N в заданиях (шаги `write-swap-telemetry`, `drone-flight-trim-controller`), сборка `parsons` (шаг `assemble-multi-return-ref`), поиск ошибки `clickline` (шаг `find-value-copy-bug`), прогнозирование вывода `predict` (шаги `predict-ref-mutation`, `predict-const-ref-protection`), сводная таблица в `recap`.
