# MISIJA IRIS — PAMATDOKUMENTĀCIJA / REFERENCE MANUAL

---

## ЧАСТЬ 1. STORY BIBLE / РУКОВОДСТВО ПО СЮЖЕТУ МИССИИ IRIS

### 1.1. Контекст базы и миссии (Mission Context)

* **Русский обзор:** Человечество развернуло первую исследовательскую станцию на Марсе — базу «IRIS». Бортовые системы и исследовательские дроны работают под управлением встроенных микроконтроллеров на C++. Из-за задержки радиосигнала от Земли до Марса (примерно от 3 до 22 минут в один конец) прямое ручное управление дронами невозможно — аппараты обязаны принимать решения автономно на месте. В нашей миссии бортовой компьютер дрона ограничен ~1 МБ памяти и требует отклика в доли секунды. 1 МБ — учебное допущение курса, а не характеристика реального аппарата: у Ingenuity стоял процессор Snapdragon 801 с Linux. Аргумент против Python строим на предсказуемости, а не на объёме памяти. Языки с автоматической сборкой мусора (например, Python) создают непредсказуемые паузы в полете, поэтому базовым языком выбран C++.
* **English Version:**
  > **Setting & Mission IRIS:** Station IRIS is humanity's primary research habitat on Mars. The station's core flight computers, embedded telemetry systems, and autonomous survey drones run native C++ software. Because the Earth-Mars radio delay ranges from roughly 3 to 22 minutes each way, real-time manual control from Earth is impossible; flight routines, path corrections, and obstacle-avoidance logic must execute autonomously on the vehicle. In our mission, drones operate under strict flight-hardware constraints (~1 MB RAM, millisecond response requirements). The 1 MB limit is a teaching assumption of this course, not a property of a real vehicle. Languages relying on garbage collection (such as Python) introduce non-deterministic execution pauses, making native compiled C++ the baseline platform for Iris mission firmware.
* **Latviešu versija:**
  > **Misijas IRIS un bāzes konteksts:** Cilvēces pirmā pastāvīgā pētnieciskā stacija uz Marsa ir bāze «IRIS». Bāzes iekšējās sistēmas, lidojumu borta datori un izpētes droni darbojas ar iegulto programmatūru C++ valodā. Tā kā radiosakaru aizkave starp Zemi un Marsu svārstās aptuveni no 3 līdz 22 minūtēm katrā virzienā, tieša manuāla vadība no Zemes nav iespējama — aparātiem lēmumi un šķēršļu apiešana jāveic autonomi uz vietas. Mūsu misijā drona mikrokontrolierim ir stingri aparatūras ierobežojumi (~1 MB RAM, milisekunžu reakcijas laiks). 1 MB ir kursa mācību pieņēmums, nevis reāla aparāta raksturlielums. Valodas ar automātisko atmiņas savācēju (piemēram, Python) rada neparedzamas pauzes lidojumā, tādēļ borta programmatūrai izvēlēta C++ valoda.

---

### 1.2. Флот дронов (Drone Fleet Specs & Progression)

| Аппарат / Nosaukums / Unit | Роль / Role / Loma | Введение в курс | Назначение в 1-м семестре | Задел на 2-й семестр (ООП) |
| :--- | :--- | :--- | :--- | :--- |
| **IZLŪKS «Sigma»**<br>*(SCOUT "Sigma")* | Лёгкий скоростной дрон-разведчик. | **Блок 1, лекции 1–8** (Pamodināšana) | Первая консоль, базовые типы данных, линейный расчёт расхода топлива, операторы `cout`/`cin`. | Базовый класс `Drone` / Base class. |
| **KARTOGRĀFS «Delta»**<br>*(SURVEYOR "Delta")* | Тяжёлый дрон оптического и лазерного сканирования. | **Лекции 11–12** (Блок 2: Lēmumi) | Ветвления `if`/`switch`, автономные алгоритмы обхода преград, построение матриц рельефа (2D-массивы). | Производный класс `SurveyDrone` / Derived class. |
| **KRAVAS «Omega»**<br>*(CARGO "Omega")* | Тяжёлый транспортный дрон для доставки геологических проб. | **Лекции 17–18** (Блок 3: Dati) | Динамические списки (`vector`), перегрузка функций под другую грузоподъёмность и расход энергии. | Производный класс `CargoDrone` / Derived class. |
| **Eskadra IRIS**<br>*(IRIS Squadron)* | Объединённое звено всех трёх дронов. | **Лекция 28** (Блок 4: Autonomija) | Массивы структур (`struct`), файлы телеметрии (`fstream`), сквозной курсовой проект. | Полиморфизм, массивы указателей на базовый класс. |

---

### 1.3. Границы юмора и дидактические правила (Tone & Writing Rules)

* **Русский обзор:**
  1. **Юмор строго ситуативный и технический:** забытая точка с запятой привела к остановке двигателя; переполнение переменной показало 4 миллиарда литров топлива в баке; целочисленное деление `5 / 2 = 2` привело к зависанию дрона на высоте 2 метра вместо 2.5.
  2. **Никаких каламбуров, мемов и поп-культуры:** шутки должны легко и без потери смысла переводиться между языками.
  3. **Сюжет — это мотивирующая рамка, а не препятствие:** студент, пропустивший художественную часть, всё равно освоит все технические концепции программирования на 100%. Экзамен и тесты Moodle проверяют синтаксис, алгоритмы и архитектуру, а не сюжет миссии.

* **English Guidelines:**
  > * Tone is supportive, engineering-focused, and lightly ironic.
  > * Humor must derive exclusively from technical edge cases (e.g., missing semicolon halting the initialization sequence, integer overflow reporting 4 billion liters of reactant, truncation in `5 / 2 = 2` landing the drone into a ledge).
  > * No ephemeral memes, wordplay, slang, or pop-culture references.
  > * The story is scaffolding, not a prerequisite: skipping the narrative never deprives the learner of programming concepts.

* **Latviešu vadlīnijas:**
  > * Tonis ir lietišķs, atbalstošs, ar situatīvu tehnisku ironiju.
  > * Humors izriet tikai no reālām tehniskām kļūdām (aizmirsts semikols aptur dzinēju diagnostiku; skaitītāja pārpilde uzrāda 4 miljardus litru degvielas; veselo skaitļu dalīšana `5 / 2 = 2` nosēdina aparātu nepareizā augstumā).
  > * Aizliegti vārdu spēles kalambūri, mēmi un popkultūras atsauces.
  > * Sižets ir mācību ietvars, nevis obligāts šķērslis: izlaižot stāstu, students nezaudē nevienu programmēšanas prasību.

---

## ЧАСТЬ 2. МАРСИАНСКИЕ КОНСТАНТЫ И ФАКТЫ / MARS CONSTANTS

| Параметр / Constant / Parametrs | Значение / Value | Ед. изм. / Unit | Контекст применения в задачах | Верификация / Source |
| :--- | :--- | :--- | :--- | :--- |
| **Mars Gravity ($g_{Mars}$)** / *Marsa gravitācija* | `3.73` | $\text{m/s}^2$ | Расчёт тяги винтов, веса груза дрона Omega ($P = m \cdot g$). | NASA Mars Fact Sheet, среднее значение (экватор 3.69, полюс 3.73): https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html, проверено 2026-11-02 |
| **Martian Sol** / *Sola ilgums* | `88775` (24h 39m 35s) | s / h | Счётчики времени миссии, сброс логов, индексы массивов. | NASA Mars Exploration Program |
| **Radio Latency** / *Sakaru aizkave* | `3` to `22` | min | Задержка в одну сторону; обоснование автономности ветвлений `if`. | Расчёт: расстояние Земля–Марс 56–401 млн км ÷ скорость света 299 792 км/с = 3,1–22,3 мин |
| **Surface Atmospheric Density** / *Atmosfēras blīvums* | `0.020` | $\text{kg/m}^3$ | Физическое объяснение высоких оборотов лопастей дрона (~1% земной плотности). | NASA Planetary Data System |
| **Flight Controller RAM** / *Borta atmiņas limits* | `1024` | KB (1 MB) | Учебное ограничение для демонстрации `sizeof`, выбора `short` vs `int` и ссылок. | Учебное допущение курса. Не реальная характеристика: в архивных справках про Ingenuity не противоречить. |

---

## ЧАСТЬ 3. ГЛОССАРИЙ БАЗОВЫХ ТЕРМИНОВ (ТЕРМИНЫ 1–15 ДЛЯ СТАРТА)

| # | C++ Keyword / English Term | Latviešu termins | Определение на латышском (LV) | Definition in English (EN) | Пояснение на русском (RU) | Источник / Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **compiler** | **kompilators** | Programma, kas pārveido pirmkodu mašīnkodā pirms izpildes. | A software tool translating source code into machine code prior to execution. | Программа, переводящая исходный код в исполняемый машинный код до запуска. | termini.gov.lv (LZA) |
| 2 | **source code** | **pirmkods** | Cilvēkam lasāms programmas teksts programmēšanas valodā. | Human-readable program instructions written in a programming language. | Исходный текст программы на языке программирования, понятный человеку. | termini.gov.lv (LZA ITTEA) |
| 3 | **executable file** | **izpildāmais fails** | Fails, kas satur mašīnkodu un kuru operētājsistēma var tieši palaist. | A file containing binary machine code that the operating system can run directly. | Готовый исполняемый файл с машинным кодом, запускаемый системой. | termini.gov.lv |
| 4 | **standard output** (`cout`) | **standarta izvade** | Datu plūsma teksta un skaitļu izvadīšanai uz ekrāna (terminālī). | The default stream channel for printing text and numbers to the screen/terminal. | Стандартный поток вывода данных на экран или в консоль. | termini.gov.lv |
| 5 | **stream insertion operator** (`<<`) | **plūsmas ievietošanas operators** | Operators datu nosūtīšanai uz izvades plūsmu. | Operator directing values into an output stream. | Оператор направления/вставки данных в выходной поток. | termini.gov.lv / C++ Std |
| 6 | **preprocessor directive** (`#include`) | **priekšprocesora direktīva** | Instrukcija, kas tiek apstrādāta pirms koda kompilācijas. | An instruction processed before actual compilation begins. | Команда, выполняемая препроцессором до этапа компиляции. | termini.gov.lv |
| 7 | **header file** (`<iostream>`) | **galvenes fails** | Fails ar funkciju un objektu deklarācijām bibliotēku izmantošanai. | A file containing function/object declarations needed by libraries. | Заголовочный файл с объявлениями библиотечных функций и объектов. | termini.gov.lv |
| 8 | **entry point** (`main`) | **ieejas punkts** | Funkcija, ar kuru operētājsistēma sāk jebkuras C++ programmas izpildi. | The primary function where the operating system begins program execution. | Точка входа в программу: функция, с которой стартует выполнение. | termini.gov.lv (LZA) |
| 9 | **statement** | **teikums** / **instrukcija** | Pabeigta darbības komanda programmā, kas C++ beidzas ar semikolu `;`. | A complete unit of execution in code, terminated by a semicolon `;`. | Законченная инструкция или оператор, завершающийся точкой с запятой `;`. | termini.gov.lv |
| 10 | **namespace** (`namespace std`) | **vārdtelpa** | Loģisks apgabals identifikatoru nosaukumu konfliktu novēršanai. | An abstract container providing a scope to the identifiers inside it. | Пространство имён, исключающее конфликты одинаковых названий в коде. | termini.gov.lv |
| 11 | **syntax error** | **sintakses kļūda** | Koda gramatikas pārkāpums, ko atklāj kompilators pirms palaišanas. | A violation of programming grammar detected by the compiler before run. | Синтаксическая ошибка: нарушение правил языка, выявляемое при компиляции. | termini.gov.lv |
| 12 | **escape sequence** (`\n`) | **vadības rakstzīmju virkne** | Simbolu kombinācija, kas apzīmē īpašas darbības (piem., jaunu rindu). | A sequence of characters representing a special action like a newline. | Экранированная спецпоследовательность (переход на новую строку, табуляция). | termini.gov.lv |
| 13 | **manipulator** (`endl`) | **manipulators** | Plūsmas elements, kas pārceļ kursoru jaunā rindā un iztīra buferi. | A stream utility inserting a newline and flushing the output buffer. | Потоковый манипулятор, вставляющий перевод строки и сбрасывающий буфер. | termini.gov.lv |
| 14 | **string literal** | **virknes literālis** | Fiksēts teksts dubultpēdiņās (piem., `"Sveiki!"`). | A sequence of source characters enclosed in double quotation marks. | Строковый литерал: фиксированная текстовая константа в двойных кавычках. | termini.gov.lv |
| 15 | **scope block** (`{ }`) | **bloks** / **figūriekavu apgabals** | Koda apgabals, kas apvienots figūriekavās un nosaka darbības lauku. | A section of code wrapped inside curly braces delimiting scope. | Блок кода в фигурных скобках, определяющий границы области видимости. | termini.gov.lv |

---

## ЖУРНАЛ ПРАВОК (2026-11-02)

* Задержка связи исправлена с 4–24 на 3–22 минуты: прежний диапазон не сходился с указанными расстояниями 56–401 млн км.
* Гравитация 3.72 заменена на 3.73 — среднее значение из текущего NASA Mars Fact Sheet; 3.72 не соответствовало ни одному источнику.
* Ограничение 1 МБ явно помечено как учебное допущение, чтобы не противоречить фактам об Ingenuity.
* Флот: Sigma — весь блок 1 (лекции 1–8), а не только лекция 1; Delta — лекции 11–12, как в программе курса.
* Константы в коде берутся только отсюда. Если лекции нужно новое число — сначала сюда, с источником и датой проверки.
