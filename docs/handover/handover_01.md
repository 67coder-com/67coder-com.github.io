# Глава 1 · Iepazīšanās ar C++ / Getting to know C++

## Студент теперь знает (накопительно с главы 1)
- Зачем нужен C++ и чем компилируемый язык отличается от интерпретируемых языков и языков со сборкой мусора (Python): исходный код до запуска целиком переводится компилятором в машинный код (исполняемый файл).
- Если в исходном коде есть хотя бы одна синтаксическая ошибка, компилятор останавливается и программа вообще не запускается (частичного вывода не будет).
- Каркас минимальной программы C++: `#include <iostream>`, `using namespace std;`, точка входа `int main() { ... }`, успешное завершение `return 0;`.
- Вывод текста (строковых литералов в двойных кавычках) на экран через `cout << "..."` и перевод строки манипулятором `endl`.
- `cout` сам по себе не вставляет пробелы и не переносит строку — пробелы нужны внутри кавычек, а новая строка начинается только после `endl`.
- Каждая законченная инструкция (statement) в C++ обязательно завершается точкой с запятой `;`.
- Пространство имён `std`: `cout` и `endl` принадлежат стандартной библиотеке (`std::cout`, `std::endl`), а строка `using namespace std;` позволяет писать их без префикса `std::`.
- Чтение базовых ошибок компилятора Clang: пропущенная `;` (`expected ';' after expression`, указатель `^`, проверка предыдущей строки) и обращение к `cout` без `using namespace std;`.

## Карантин для следующей главы
- Вывод чисел без кавычек, цепочки `<<` из нескольких элементов в одной команде, управляющие последовательности (`\n`, `\t`, `\"`, `\\`), комментарии `//` и `/* ... */` — с главы 2.
- Переменные, типы данных (`int`, `double`, `char`, `bool` и др.), оператор `sizeof` — с главы 3 (подробно по группам типов — главы 4–6).
- Арифметические операции (`+`, `-`, `*`, `/`, `%`), приоритет, инкремент — с главы 7.
- Ввод данных (`cin >>`, `getline`) — с главы 8.
- Условия (`if` / `else`, операторы сравнения, `&&`, `||`, `!`, `switch`, `?:`) — с блока 2 (главы 9–11).
- Циклы (`while`, `do-while`, `for`, `break`, `continue`) — с глав 13–15.
- Массивы, `vector`, функции, строки (методы `string`), форматирование `iomanip`, `struct`, файлы (`fstream`) — с блоков 3–4 (главы 17–29).
- Исключения (`try` / `catch` / `throw`) — запрещены в редакторе на всём курсе (`-fno-exceptions`).

## Миссия
- **Активный аппарат:** лёгкий разведчик IZLŪKS «Sigma» (SCOUT "Sigma").
- **Что произошло:** найден терминал исследовательской станции IRIS на Марсе; отправлен первый сигнал дрону Sigma (`IRIS: online`, `SIGMA: signal received`), освоен компилятор, собрана текстовая панель статуса (`=== SIGMA ===`, `FUEL: 87%`, `STATUS: READY`).
- **Что ведёт к следующей главе:** дрон Sigma проснулся и начинает присылать показания бортовых датчиков — нужно научиться выводить в одном потоке подписи и числовые значения, управлять переносами строк и оставлять комментарии в коде.

## Новые термины
- compiler / kompilators / проверено (`termini.gov.lv`, LZA)
- source code / pirmkods / проверено (`termini.gov.lv`, LZA ITTEA)
- executable file / izpildāmais fails / проверено (`termini.gov.lv`)
- standard output (`cout`) / standarta izvade / проверено (`termini.gov.lv`)
- stream insertion operator (`<<`) / plūsmas ievietošanas operators / проверено (`termini.gov.lv` / C++ Std)
- preprocessor directive (`#include`) / priekšprocesora direktīva / проверено (`termini.gov.lv`)
- header file (`<iostream>`) / galvenes fails / проверено (`termini.gov.lv`)
- entry point (`main`) / ieejas punkts / проверено (`termini.gov.lv`, LZA)
- statement / teikums, instrukcija / проверено (`termini.gov.lv`)
- namespace (`namespace std`) / vārdtelpa / проверено (`termini.gov.lv`)
- syntax error / sintakses kļūda / проверено (`termini.gov.lv`)
- manipulator (`endl`) / manipulators / проверено (`termini.gov.lv`)
- string literal / virknes literālis / проверено (`termini.gov.lv`)
- scope block (`{ }`) / bloks, figūriekavu apgabals / проверено (`termini.gov.lv`)
- scope resolution operator (`::`) / apgabala izšķiršanas operators / проверено (`termini.gov.lv`)

## Использовано
- **Архивная справка (`archive`, шаг `why-cpp`):** «Kā radās C++: no Bell Labs līdz kosmosam» / «Origins of C++: from Bell Labs to deep space» — Бьёрн Страуструп, Bell Labs (1979), «C with Classes» (Simula + C), переименование в C++ в 1983 г. (Рик Маситти, оператор инкремента `++`), принцип «не платишь за то, что не используешь». Источники: Bjarne Stroustrup — *A History of C++: 1979–1991* (`https://www.stroustrup.com/hopl2.pdf`), NASA NTRS — *FPP: A Modeling Language for F Prime* (`https://ntrs.nasa.gov/citations/20220012872`), GitHub ReadME Project — *Open Source on Mars* (`https://github.com/readme/featured/nasa-ingenuity-helicopter`).
- **Блок «Dziļāk» (шаг `why-cpp`):** «Paredzamība pret negaidītām pauzēm» / «Determinism versus unexpected pauses» — прямой машинный код C++ против пауз автоматической сборки мусора (Garbage Collection) в Python/Java; вращение винтов марсианского дрона на 2700 об/мин.
- **Блок «Dziļāk» (шаг `why-namespace`):** «Kāpēc lielos projektos izvairās no `using namespace`» / «Why large software systems avoid `using namespace`» — защита от конфликтов имён между библиотеками (`nav::log()` и `telemetry::log()`) и почему `using namespace std;` не пишут в заголовочных файлах больших проектов.
- **Факты в основном тексте:** задержка связи Земля–Марс 3–22 мин в одну сторону; вертолёт NASA Ingenuity опрашивал датчики 500 раз в секунду, бортовое ПО на C++, а Python на той же миссии применялся на Земле для моделирования и анализа данных; примеры использования C++ — Unreal Engine, Chromium.
- **Элементы эталонного формата:** интерактивные карточки `syntax:` (шаги `first-program`, `why-namespace`), карточки правил `+ **...**` (`tcard`, шаги `why-cpp`, `first-program`, `why-namespace`), блоки предостережений `!>` (шаги `first-program`, `why-namespace`), примеры `compare` с цветными подписями (шаги `first-program`, `why-namespace`), выноска `> Два правила компиляции` (шаг `how-it-runs`).
- **Визуалы:** иллюстрация `assets/l01-why-cpp.jpg` (шаг `why-cpp`); SVG-схема компиляции `assets/l01-compile-flow.lv.svg` и `.en.svg` (шаг `how-it-runs`).
