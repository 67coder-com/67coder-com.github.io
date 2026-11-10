Формат Moodle-пакета. Сами пакеты сохраняются только в папку `moodle/`, которая исключена из git: вопросы экзамена не должны попасть в публичный репозиторий. Правила формата открыты — секретны только сами вопросы.

# Moodle-пакет главы

Сайт про Moodle не знает, поэтому всё для Moodle сдаётся отдельным блоком. Это для автора — в JSON урока ничего из этого не попадает.

**Язык пакета — латышский, всегда и полностью:** описание, оба набора вопросов GIFT, задание. Английский пакет — только по прямой просьбе автора. Если ответ получается длинным — сокращай что угодно, но не латышский пакет.

### Что в пакете

На латышском (английский — только по просьбе):

1. **Название подраздела:** `N. Nosaukums` — как в программе курса.
2. **Описание подраздела** — HTML по шаблону ниже, целиком, со ссылками.
3. **Задание** — только если программа курса требует сдачу кода.
4. **Один блок GIFT** — внутри две категории: самопроверка и экзамен.

В подразделе лекции в Moodle только описание и тест «Pašpārbaude» (плюс задание, если оно есть). Ссылки на интерактивную главу и на PDF стоят в описании, отдельных элементов для них нет.

**Адрес сайта:** `https://67coder.com`. Ссылки:
- интерактивная глава — `https://67coder.com/#/course/cpp/lv/lesson/N`
- PDF-версия — `https://67coder.com/#/course/cpp/lv/print/N`

для EN — `/en/` вместо `/lv/`. N — номер главы без ведущего нуля.

### Шаблон описания подраздела

Обращение — на «jūs», как во всём курсе Moodle (на сайте — «tu», это нормальное различие). Латунь одна — на скобке и метке внизу. Между карточками кружок «VAI»: пути — выбор, а не два обязательных шага. Внизу «jebkurš ceļš», не «abi ceļi».

```html
<p style="margin:0 0 8px;">Pēc šīs nodaļas jūs varēsiet:</p>
<ul style="margin:0; padding-left:22px; line-height:1.65;">
  <li>[результат 1 — с глагола];</li>
  <li>[результат 2];</li>
  <li>[результат 3].</li>
</ul>
<p style="margin:12px 0 0; color:#5A5F68;"><strong>Laiks:</strong> ap [X] minūtēm · [N] ekrāni, no tiem [M] praktiski.</p>

<p style="margin:28px 0 10px; font-family:monospace; font-size:12px; letter-spacing:1.6px; color:#656A72;">IZVĒLIETIES VIENU CEĻU</p>
<div style="display:flex; flex-wrap:wrap; gap:16px;">
  <div style="flex:1 1 240px; border:1px solid #DFDAD1; border-radius:8px; padding:18px 20px;">
    <p style="margin:0; font-family:monospace; font-size:12px; letter-spacing:1.6px; color:#656A72;">INTERAKTĪVI</p>
    <p style="margin:6px 0 0; line-height:1.6;">Īsi ekrāni, piemēri un koda redaktors tieši pārlūkā.</p>
    <p style="margin:14px 0 0;"><a href="https://67coder.com/#/course/cpp/lv/lesson/N" target="_blank" style="display:inline-block; padding:8px 16px; border:1px solid #8C8578; border-radius:6px; color:#16181D; text-decoration:none;">Atvērt nodaļu 67coder →</a></p>
  </div>
  <div style="flex:0 0 auto; align-self:center; margin:0 auto; width:48px; height:48px; border-radius:999px; border:1px solid #DFDAD1; background:#FFFFFF; text-align:center; line-height:46px; font-family:monospace; font-size:12px; letter-spacing:1.4px; color:#656A72;">VAI</div>
  <div style="flex:1 1 240px; border:1px solid #DFDAD1; border-radius:8px; padding:18px 20px;">
    <p style="margin:0; font-family:monospace; font-size:12px; letter-spacing:1.6px; color:#656A72;">PDF</p>
    <p style="margin:6px 0 0; line-height:1.6;">Visa nodaļa vienā lapā — lasīt, izdrukāt vai saglabāt. Atbildes ir beigās.</p>
    <p style="margin:14px 0 0;"><a href="https://67coder.com/#/course/cpp/lv/print/N" target="_blank" style="display:inline-block; padding:8px 16px; border:1px solid #8C8578; border-radius:6px; color:#16181D; text-decoration:none;">Atvērt PDF versiju →</a></p>
  </div>
</div>
<div style="margin:0 25%; height:18px; border:2px solid #B99A61; border-top:none; border-radius:0 0 12px 12px;"></div>
<div style="width:2px; height:18px; background:#B99A61; margin:0 auto;"></div>
<p style="text-align:center; margin:0;"><span style="display:inline-block; padding:6px 14px; border-radius:999px; background:#F0E5CC; color:#7A5F2A; font-family:monospace; font-size:12px; letter-spacing:1.6px;">JEBKURŠ CEĻŠ VED UZ PAŠPĀRBAUDI ↓</span></p>
```

EN — та же разметка: `After this chapter you will be able to:`, `Time:`, `CHOOSE ONE PATH`, `INTERACTIVE` / `Short screens, examples and a code editor right in the browser.` / `Open the chapter on 67coder →`, `PDF` / `The whole chapter on one page — read, print or save. Answers are at the end.` / `Open the PDF version →`, `EITHER PATH LEADS TO THE SELF-CHECK ↓`, между карточками кружок `OR`.

Результаты обучения — 3–5 пунктов, каждый начинается с глагола и проверяем: «uzrakstīt», «atrast», «izskaidrot», а не «iepazīties» и «saprast». Время — честная оценка по экранам. Миссию в описание не вставляем.

### Задание на сдачу кода

```html
<p><strong>Uzdevums.</strong> [что должна делать программа, 2–3 предложения]</p>
<p><strong>Ievade:</strong> [что вводится] · <strong>Izvade:</strong> [что выводится, с примером]</p>
<p><strong>Iesniedz:</strong> failu <code>main.cpp</code>. Kodu var lejupielādēt redaktorā 67coder ar pogu «Lejupielādēt».</p>
<p><strong>Vērtēšana:</strong></p>
<ul>
  <li>[критерий]</li>
  <li>[критерий]</li>
  <li>[критерий]</li>
</ul>
```

Задание проверяет только пройденное. Критерии — 3–4, проверяемые глазами: «программа компилируется», «вывод совпадает с примером», «каждая строка — отдельной командой».

### Вопросы GIFT

```
$CATEGORY: $course$/top/L01 Iepazīšanās ar C++

::L01-Q1:: Kur sākas C++ programmas izpilde?{
=funkcijā main#Pareizi: main ir ieejas punkts.
~faila pirmajā rindā#Pirmā rinda bieži ir \#include, un tā nav izpildāma komanda.
~rindā \#include#\#include apstrādā vēl pirms kompilācijas.
}
```

Правила:
- **Один блок на язык, две категории внутри.** Сначала строка категории самопроверки и 5 вопросов, затем строка категории экзамена и 5 вопросов. Пути вложенные: так Moodle может брать случайные вопросы сразу из всех глав части.
  - самопроверка, LV: `$CATEGORY: $course$/top/Pašpārbaudes/I daļa/LNN Nosaukums` — для глав 1–24, `II daļa` — для 25–32;
  - экзамен, LV: `$CATEGORY: $course$/top/Eksāmens/I daļa/LNN Nosaukums`, для 25–32 — `II daļa`;
  - EN: `Self-checks/Part I`, `Self-checks/Part II`, `Exam/Part I`, `Exam/Part II`.
  Номер главы с ведущим нулём.
- Имена вопросов: самопроверка `::LNN-Q1::` … `::LNN-Q5::`, экзамен `::LNN-E1::` … `::LNN-E5::`.
- **Символы `~ = # { } :` экранируются обратной косой** везде, включая обычное двоеточие в тексте вопроса. В C++ они на каждом шагу: `\#include`, `std\:\:cout`, `\{ \}`.
- Код в вопросе — через `[markdown]` и обратные кавычки: `` [markdown]Ko dara `cout`? ``. Пустых строк внутри вопроса нет — пустая строка в GIFT заканчивает вопрос.
- У каждого неверного варианта — пояснение после `#`: почему это не так.
- Смесь типов: выбор из 3–4, верно/неверно `{T}` / `{F}`, короткий ответ `{=точный ответ}` для «что выведет программа».
- Только пройденное — в этой лекции или раньше. Вопросы не копируют квиз с сайта: проверяют те же знания другими словами.

### Вопросы для экзамена — на понимание

Экзамен открытый: заочник пишет его дома, запретить материалы невозможно, поэтому они разрешены. Значит, вопрос не должен находиться поиском по тексту главы. Отсюда правила:

- **Новый код.** Каждый вопрос — на коде, которого нет ни в главе, ни в самопроверке. Ответ нельзя найти, его нужно вывести.
- **Рассуждение, а не определение.** Хорошие типы: что выведет программа; что изменится, если поменять строки или значение; какое одно исправление починит код; какой вариант даёт нужный вывод; почему этот код не компилируется. Плохие: «как называется…», «кто создал…», «в каком году…».
- **Неверные варианты — настоящие ошибки новичка**, а пояснение объясняет, где именно рассуждение сломалось.
- Ни блоки «Dziļāk», ни «Arhīva ieraksts» в экзамене не проверяются.
- Каждый код в вопросе проверен компилятором: вывод и «не компилируется» — фактические, а не предполагаемые.

