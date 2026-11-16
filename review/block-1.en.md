# Course: C++ Programming — Mission IRIS (67coder)
## Block 1: Block 1 · Awakening (EN)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 1 to 8.*

---


# Lesson 1 · Getting to know C++
**Slug:** `intro` | **Module:** Block 1 · Awakening

#### Step: why-cpp [THEORY]
*Eyebrow:* Mission briefing
**Python on Earth, C++ in the air**

The IRIS station terminal has been located. Your first objective is to transmit an initialization ping to the scout drone «Sigma». Radio signals between Earth and Mars take between 3 and 22 minutes one way, so the craft cannot wait for instructions from mission control — it must respond autonomously and immediately.

This is not a hypothetical challenge. NASA's Ingenuity Mars helicopter sampled its navigation sensors 500 times per second to stay stable in the thin Martian air. Its core flight-control software was implemented in C++.

Python served on the same mission on Earth — for orbital trajectory modeling, ground operations, and data analytics. On flight hardware, C++ dominates where determinism and direct memory control are critical:

+ **Predictable speed.** C++ compiles straight to native CPU machine instructions with no interpreter overhead and no sudden garbage-collection pauses.
+ **Direct hardware control.** You control exact bytes and memory layout with zero hidden background overhead.
+ **Aerospace standard.** C++ powers real-time robotics, high-performance engines, and flight avionics across the solar system.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. A small, light scout drone hovers above the surface of Mars at dusk, next to a low research station with one lit terminal window. On the terminal screen is the course mascot: two square brackets [ ] facing each other with two round cream eyes between them, looking up at the drone. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the terminal glow. Render the Martian ground in desaturated warm greys, not red.


##### [Archive Record] Origins of C++: from Bell Labs to deep space
In 1979 at Bell Labs, Danish computer scientist Bjarne Stroustrup began developing what was originally called «C with Classes». His goal was to merge the clean abstractions and organization of Simula with the raw computational performance and hardware-level control of C.

In 1983, the language was officially renamed C++. The name was coined by Rick Mascitti, utilizing C's post-increment operator `++`, which increases an integer by one. It signified an evolutionary step forward from C.

The foundational philosophy of C++ remains intact: «you don't pay for what you don't use». The language introduces no hidden background overhead behind the programmer's back, making it the bedrock of real-time robotics and flight systems.

*Sources:*
- [Bjarne Stroustrup — A History of C++: 1979—1991 (ACM HOPL-II)](https://www.stroustrup.com/hopl2.pdf)
- [NASA NTRS — FPP: A Modeling Language for F Prime](https://ntrs.nasa.gov/citations/20220012872)
- [GitHub ReadME Project — Open Source on Mars](https://github.com/readme/featured/nasa-ingenuity-helicopter)

##### [Go Deeper] Determinism versus unexpected pauses
A compiled C++ program is transformed into native CPU machine instructions before execution. The processor does not interpret text at runtime, delivering predictable sub-millisecond response loops.

Languages relying on automated garbage collection (such as Python or Java) occasionally pause active execution to clean up unreferenced memory. In a desktop application, that micro-pause goes unnoticed. On an aerial drone spinning its twin carbon rotors at 2,700 RPM, an unexpected latency spike results in a crash.


---

#### Step: first-program [EXAMPLE]
**Your first program, line by line**

This is a complete, working C++ program. Every line serves an explicit engineering role in making the executable run.

syntax: cout << {text} << endl;
- cout: character output stream connected to the terminal
- <<: stream insertion operator pointing data toward the stream
- text: characters in double quotes ("...")
- endl: manipulator ending the line and flushing the stream
- ;: statement terminator — mandatory in C++

Four core structural elements of the listing:
+ **#include <iostream>.** Attaches standard input and output stream tools. Without it, the compiler has no knowledge of `cout`.
+ **using namespace std;.** Tells the compiler to look in the standard library namespace by default so you don't have to write `std::` every time.
+ **int main() { ... }.** The required entry point. Execution of every C++ program strictly begins inside `main()`, and all operational instructions reside between the curly braces.
+ **return 0;.** Signals to the operating system that the application executed and exited successfully.

!> **Python habit to unlearn.** In Python, code executes top-to-bottom as a loose script without an entry function or semicolons. In C++, every statement must reside inside a function (entry point `main()`), and every statement must terminate with a semicolon `;`.

**Code Comparison:**
```cpp
cout << "IRIS: online" << endl;
```
[CORRECT] semicolon present → compiles cleanly

```cpp
cout << "IRIS: online" << endl
```
[INCORRECT / TRAP] missing semicolon → compile error

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "IRIS: online" << endl;
    return 0;
}
```


---

#### Step: predict-output [PREDICT]
**What will appear on the terminal?**

Examine the three sequential output commands below. Predict the exact text that will appear in the terminal window.

This is a prediction, not a graded test: you are not expected to know the answer in advance. Observe how the stream pushes data, make your guess, and compare it with the actual behavior.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA";
    cout << " ONLINE" << endl;
    cout << "STATUS: READY";
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `SIGMA ONLINE
STATUS: READY`
**Explanation:** `cout` never injects automatic spaces. The space only exists because it was placed inside the quotes before `ONLINE`. A line break occurs only when prompted by `endl`.


---

#### Step: run-it [EDITOR]
**Retype and send the first signal**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "IRIS: online" << endl;
    return 0;
}
```

**Task:**
Retype the complete starter program into the editor manually rather than copying and pasting to build muscle memory:
1. Open `main()` with `#include <iostream>` and `using namespace std;`.
2. Print `"IRIS: online"` with `cout` and `endl`.
3. Return `0` and click «Run» to verify the output in the terminal.

**Expected Output:**
```
IRIS: online
```

*Hint:* Pay close attention to every detail: curly braces `{ }`, quotation marks around strings, and the terminating semicolon `;`.

---

#### Step: break-and-see [EDITOR]
**Break it and inspect the compiler**

**Task:**
Deliberately break the program to observe how the compiler flags syntax errors:
1. Delete the semicolon `;` at the end of line 5 after `endl`.
2. Click «Run» and inspect the diagnostic message printed in the terminal.
3. Restore the semicolon `;` and click «Run» to confirm that the build succeeds.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA: signal received" << endl;
    return 0;
}
```

**Expected Output:**
```
SIGMA: signal received
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA: signal received" << endl;
    return 0;
}
```

*Hint:* Look for the message «expected ';' after expression». The caret symbol `^` points directly to where the compiler discovered the missing token.
*Solution Note:* With the semicolon restored, compilation succeeds and the program outputs the message cleanly.

---

#### Step: how-it-runs [EXPLAIN]
**Behind the «Run» button**

A C++ program cannot run straight from source code text. First, the compiler parses your code against language grammar rules and translates it into native machine code, building an executable binary.

> Two strict rules of ahead-of-time compilation:
> 1. **No binary on syntax error.** If even a single semicolon or brace is missing, the compiler halts immediately. No executable file is generated, and nothing runs.
> 2. **Native machine speed.** Once compiled, machine code executes directly on the CPU without translation overhead or runtime interpretation.

> *Image Alt:* Diagram: source code enters compiler, producing an executable that yields output. A syntax error halts compilation before execution.


---

#### Step: drop-namespace [EDITOR]
**Code without the namespace**

**Task:**
This program has had the line `using namespace std;` removed:
1. Click «Run» to see the compiler report `cout` as undeclared and ask: «did you mean 'std::cout'?».
2. Fix the program by adding the prefix `std::` before both `cout` and `endl`.
3. Run the code without re-adding the using directive.

**Starter Code:**
```cpp
#include <iostream>

int main() {
    cout << "IRIS: online" << endl;
    return 0;
}
```

**Expected Output:**
```
IRIS: online
```

**Reference Solution:**
```cpp
#include <iostream>

int main() {
    std::cout << "IRIS: online" << std::endl;
    return 0;
}
```

*Requires tokens:* `std::cout`
*Hint:* Prefix both names: `std::cout` and `std::endl`. The double colon `::` is the scope resolution operator.
*Solution Note:* `std::cout` and `std::endl` explicitly identify the standard namespace, eliminating ambiguity.

---

#### Step: why-namespace [THEORY]
*Eyebrow:* Architecture
**The `std` namespace**

syntax: {namespace}::{name};
- namespace: scope identifier — `std` for standard library
- ::: scope resolution operator connecting name to namespace
- name: library tool — `cout`, `endl`

`cout` and `endl` are not C++ keywords like `int` or `return`. They are standard library utilities residing inside a dedicated scope known as the `std` namespace. Their canonical identity is `std::cout` — «`cout` inside `std`».

Why namespaces matter in engineering:
+ **Collision prevention.** If two separate navigation libraries both implement a `log()` function, prefixes resolve the ambiguity: `telemetry::log()` versus `sensor::log()`.
+ **The using shortcut.** The directive `using namespace std;` tells the compiler: if an identifier is not found locally, look inside `std` automatically.
+ **Course convention.** We use `using namespace std;` throughout introductory lessons to keep listings clear, while recognizing `std::` when inspecting production codebases.

!> **Namespace rule.** In real projects, never place `using namespace std;` inside header files (`.h` / `.hpp`). It injects thousands of names into every source file that includes that header, triggering silent naming conflicts.

**Code Comparison:**
```cpp
std::cout << "SIGMA";
```
[CORRECT] explicit prefix → always unambiguous

```cpp
cout << "SIGMA"; // without using namespace std
```
[INCORRECT / TRAP] no prefix and no using → compiler error


##### [Go Deeper] Why large software systems avoid `using namespace`
Namespaces protect codebases from naming collisions. If two separate navigation libraries implement a `log()` function, prefixes resolve the ambiguity: `nav::log()` versus `telemetry::log()`.

Placing `using namespace std;` inside header files pollutes the global scope for any file that includes them. In self-contained educational files, `using namespace std;` is standard, clean, and safe.


---

#### Step: find-bug-line [CLICKLINE]
**Which line contains the defect?**

Sigma's diagnostic telemetry fails to compile. Locate and click directly on the line containing the syntax error.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA: DIAG" << endl
    cout << "ENGINE: OK" << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 5
**Explanation:** Line 5 is missing a semicolon `;` after `endl`. Notice that some compilers flag line 6, because the missing semicolon causes the compiler to keep parsing into the next command before realizing the statement was never closed.


---

#### Step: fill-gaps [BLANKS]
**Restore the missing tokens**

Three critical components have been stripped from this program skeleton. Fill in the blanks to restore valid C++.

**Code:**
```cpp
#include <[[1]]>
using namespace [[2]];

int main() {
    [[3]] << "SIGMA REPORT" << endl;
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `iostream`
- [[2]]: `std`
- [[3]]: `cout`

**Explanation:** `iostream` provides input/output facilities, `std` is the standard library namespace, and `cout` is the standard character output stream.


---

#### Step: status-panel [EDITOR] (Optional)
**Build the Sigma status panel**

**Task:**
Write a complete C++ program to output Sigma's three-line telemetry panel in the format shown below:
1. Include the `<iostream>` header and enable `using namespace std;`.
2. In `main()`, print the header `=== SIGMA ===`.
3. Print `FUEL: 87%` on the second line and `STATUS: READY` on the third line.
4. End each line with `endl` and terminate each statement with a semicolon `;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Expected Output:**
```
=== SIGMA ===
FUEL: 87%
STATUS: READY
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "=== SIGMA ===" << endl;
    cout << "FUEL: 87%" << endl;
    cout << "STATUS: READY" << endl;
    return 0;
}
```

*Hint:* Write three separate `cout << ... << endl;` statements inside `main()`.

---

#### Step: recap [SUMMARY]
**Mission 1 recap**

**Recap / Key Points:**
- C++ is an ahead-of-time compiled language: source code is converted to machine code prior to execution. Syntax errors prevent the program from running entirely.
- Program execution always starts at the `int main()` entry point and executes statements sequentially inside curly braces `{ }`.
- `cout` directs characters into the standard output stream without injecting automatic spaces; line breaks require the `endl` manipulator.
- Every complete C++ statement must terminate with a semicolon `;`.
- `cout` and `endl` belong to the `std` namespace; `using namespace std;` enables writing concise shorthand in introductory code.
- Mission status: Scout drone Sigma has responded to our initialization signal. In Chapter 2, we will stream sensor numbers and format telemetry output.


---


# Lesson 2 · Output with cout
**Slug:** `cout` | **Module:** Block 1 · Awakening

#### Step: telemetry-stream [THEORY]
*Eyebrow:* Telemetry stream
**Numbers and text in a single stream**

Scout Sigma is awake and transmitting its first sensor readings. The flight computer measures battery charge, altitude, and core system temperature. However, raw data arrives on the console as an unreadable continuous line.

To build a clear instrument dashboard, your code needs to combine two elements: explanatory labels in quotes and physical measurement values as numbers. C++ lets you combine them within a single statement.

Three core output principles at a glance:
+ **Text in quotes.** Character strings (`"BATTERY: "`) are treated as literal text.
+ **Numbers without quotes.** Numeric literals (`98`, `-12`) are treated as pure numbers that the computer can compute with.
+ **Chaining with <<.** The `<<` operator connects multiple pieces in a single statement from left to right.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. A sleek light scout drone hovers near a rocky Martian ridge at sunset. In the foreground, an illuminated outdoor rugged telemetry console displays streaming telemetry data. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — stands by the console, inspecting the readout. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the console display glow. Render the Martian ground in desaturated warm greys, not red.


##### [Archive Record] Why `cout` is called `cout` and where streams came from
In early C, terminal output was performed by the `printf` function. Programmers had to manually specify type codes in a format string, such as `%d` for integers or `%s` for strings. If a format specifier failed to match the actual variable type, the program either crashed or corrupted memory.

When creating C++, Bjarne Stroustrup and Dave Presotto at AT&T Bell Labs introduced a fundamentally safer approach: type-safe I/O streams. The stream paradigm means that the compiler automatically inspects the type of whatever you pass to the stream and invokes the appropriate conversion routine.

The name `cout` stands for «character output» or «console output». The prefix `c` signifies its place in the C++ standard stream family (alongside `cin` for character input and `cerr` for error reporting). The `<<` operator originally served only as a bitwise left-shift in C; in C++, it was overloaded to denote the physical direction of streaming data.

*Sources:*
- [Bjarne Stroustrup — The Design and Evolution of C++ (Addison-Wesley)](https://www.stroustrup.com/dne.html)
- [Bjarne Stroustrup — A History of C++: 1979—1991 (ACM HOPL-II)](https://www.stroustrup.com/hopl2.pdf)

---

#### Step: numbers-and-chaining [EXAMPLE]
**Numbers and output chaining**

syntax: cout << {label} << {number} << {unit} << endl;
- label: text description in double quotes
- number: numeric literal without quotes (98, 15, -12)
- unit: text suffix ("%", " M")
- endl: manipulator ending the line and flushing the stream

In C++, numbers are written directly without quotes. Text inside quotes like `"98"` is treated as a string of characters, whereas `98` without quotes is a numeric value.

The stream insertion operator `<<` can be called repeatedly in a single statement. This is known as **chaining**. Data flows into `cout` sequentially from left to right, converting each element into characters on the fly.

!> **Python habit to unlearn.** In Python, `print("BATTERY:", 98)` uses commas to separate items and inserts spaces automatically. In C++, items are chained using `<<`, and `cout` never inserts spaces between chained parts unless you explicitly write them inside your string literals.

**Code Comparison:**
```cpp
cout << "ALT: " << 15 << " M" << endl;
```
[CORRECT] chained stream with << → prints seamlessly

```cpp
cout << "ALT: ", 15, " M";
```
[INCORRECT / TRAP] comma instead of << → comma operator trap

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "BATTERY: " << 98 << "%" << endl;
    cout << "ALTITUDE: " << 15 << " M" << endl;
    return 0;
}
```


---

#### Step: predict-output [PREDICT]
**Predict the telemetry line**

Examine the two lines of code below. Pay close attention to spaces inside quotation marks and where `endl` is placed.

This is an exercise in spotting stream details, not a graded test: trace how the pieces enter `cout`, predict the exact terminal output, and compare it with the result.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SOL:" << 14 << " | " << "STATUS:" << 0 << endl;
    cout << "TEMP:" << -18 << "C";
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `SOL:14 | STATUS:0
TEMP:-18C`
**Explanation:** On the first line, there is no space between `SOL:` and `14` because none was written inside quotes. On the second line, `C` directly follows `-18` without a space and without a trailing newline.


---

#### Step: first-chain [EDITOR]
**Combine separate outputs into a chain**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA SPEED: ";
    cout << 12;
    cout << " M/S" << endl;
    return 0;
}
```

**Task:**
Rewrite the three separate `cout` statements into a single statement using the `<<` chaining operator in the format shown below:
1. Open with `cout << "SIGMA SPEED: "`.
2. Chain the numeric literal `12`.
3. Chain the text `" M/S"` and finish with `<< endl;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Expected Output:**
```
SIGMA SPEED: 12 M/S
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA SPEED: " << 12 << " M/S" << endl;
    return 0;
}
```

*Requires tokens:* `<< 12 <<`
*Hint:* Write a single `cout` command: `cout << "SIGMA SPEED: " << 12 << " M/S" << endl;`.

---

#### Step: stream-flow [EXPLAIN]
**How data travels to the screen**

The `<<` operator acts like a conveyor belt. Each element is placed onto the stream and travels toward its destination: the terminal display.

> Two principles of the output stream:
> 1. **Left-to-right order.** Data enters `cout` strictly in the order `<<` operators appear.
> 2. **Automatic type conversion.** The stream automatically converts numeric values into text characters without requiring manual format specifiers.

> *Image Alt:* Diagram: a text literal, a numeric literal, and a manipulator pass sequentially through << operators into cout and appear on the terminal.


---

#### Step: newline-and-escape [THEORY]
*Eyebrow:* Line formatting
**The `\n` escape sequence and the `endl` manipulator**

syntax: cout << "{text1}\n{text2}\n";
- text1: first line of text
- \n: escape sequence that moves the cursor to a new line
- text2: second line of text

Until now we have used `endl` to advance lines. You can also trigger line breaks using the escape sequence `\n` (newline) embedded directly inside string literals.

Common escape sequences in C++:
+ **\n (newline).** Moves the cursor to the beginning of the next line.
+ **\t (tab).** Inserts a horizontal tab stop for column alignment.
+ **\" (escaped quote).** Prints a double quotation mark inside a string literal without ending it.
+ **\\ (escaped backslash).** Prints a single literal backslash character.


##### [Go Deeper] Buffering: why real-time systems prefer `\n`
The `endl` manipulator performs two distinct operations: it inserts a newline character and immediately flushes the output buffer (`flush`).

Operating systems avoid sending output to screens or disks one character at a time because hardware I/O operations are slow. Data accumulates inside an internal memory buffer before being flushed in large blocks. If a flight loop calls `endl` thousands of times, the system is forced into continuous synchronous hardware writes, dropping throughput dramatically.

In high-performance flight systems, `\n` is the default choice for newlines. The `endl` manipulator is reserved for situations where output must appear on screen immediately before a potentially critical failure.


---

#### Step: escape-practice [EDITOR]
**Two lines in one statement**

**Task:**
Write a complete program that outputs two lines of telemetry in the format shown below using ONLY ONE `cout` statement and `\n` escape characters:
1. Print `SIGMA SENSORS: OK` on the first line.
2. Print `DRIFT: 0` on the second line.
3. Terminate the statement with `;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Expected Output:**
```
SIGMA SENSORS: OK
DRIFT: 0
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA SENSORS: OK\nDRIFT: 0\n";
    return 0;
}
```

*Requires tokens:* `\n`
*Hint:* Embed `\n` between the status and `DRIFT`, and also at the very end: `cout << "SIGMA SENSORS: OK\nDRIFT: 0\n";`
*Solution Note:* A single `cout` statement with embedded `\n` produces two distinct lines in the console without `endl`.

---

#### Step: comments-guide [THEORY]
*Eyebrow:* Code documentation
**Mission log notes: comments**

syntax: // {note}
/* {block} */
- note: single-line comment ignored until the end of the line
- block: multi-line comment spanning multiple lines

Comments are explanatory notes for human engineers. The compiler discards them entirely during the build — comments consume zero memory in the executable and have zero effect on execution speed.

Two styles of comments in C++:
+ **Single-line comments // .** Starts with two forward slashes. Everything following them on that line is ignored by the compiler.
+ **Multi-line comments /* ... */ .** Starts with `/*` and ends with `*/`. Everything between these markers is ignored across any number of lines.

!> **Comment trap.** Multi-line comments `/* ... */` cannot be nested. The very first `*/` encountered terminates the comment immediately, leaving any remaining closing tags or text to trigger syntax errors.

**Code Comparison:**
```cpp
// RAM test
cout << "RAM: OK";
```
[CORRECT] single-line comment // → clean and safe

```cpp
/* RAM test
cout << "RAM: OK";
```
[INCORRECT / TRAP] unclosed /* → unterminated comment compile error


---

#### Step: find-comment-bug [CLICKLINE]
**Find the defective comment**

A syntax error in Sigma's telemetry code caused compilation to fail. Locate and click directly on the line containing the mistake.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Drona atmiņas tests
    cout << "RAM: " << 1024 << " KB" << endl;
    /* Diagnostikas beigas
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 opens a multi-line comment `/*` that is never closed with `*/`. Consequently, the compiler absorbed the `return` statement and reported «unterminated /* comment».


---

#### Step: fill-telemetry [BLANKS]
**Restore the pressure telemetry**

Three connection elements were lost from the telemetry output line. Fill in the missing blanks so the program prints atmospheric pressure correctly.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout [[1]] "PRESSURE: " << 610 [[2]] " PA" << [[3]];
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `<<`
- [[2]]: `<<`
- [[3]]: `endl` OR `'\n'`

**Explanation:** Operators `<<` join text and numbers, while `endl` or `'\n'` terminates the line.


---

#### Step: telemetry-dashboard [EDITOR] (Optional)
**Build Sigma's telemetry dashboard**

**Task:**
Write a complete program that outputs a clean 5-line telemetry dashboard in the format shown below:
1. Print numeric values without quotes using `<<` chaining.
2. Output lines for header, `ALTITUDE: 24 M`, `BATTERY: 91%`, `CORE TEMP: -12 C`, and `STATUS: OPERATIONAL`.
3. Include at least two single-line comments `//` explaining what the code does.
4. End each line with `endl` or `\n` and terminate every statement with `;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Expected Output:**
```
--- TELEMETRY: SIGMA ---
ALTITUDE: 24 M
BATTERY: 91%
CORE TEMP: -12 C
STATUS: OPERATIONAL
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Telemetrijas paneļa virsraksts
    cout << "--- TELEMETRY: SIGMA ---" << endl;
    // Parametru izvade, apvienojot tekstu un skaitļus
    cout << "ALTITUDE: " << 24 << " M" << endl;
    cout << "BATTERY: " << 91 << "%" << endl;
    cout << "CORE TEMP: " << -12 << " C" << endl;
    cout << "STATUS: OPERATIONAL" << endl;
    return 0;
}
```

*Hint:* Use a separate `cout` for each line, for example: `cout << "BATTERY: " << 91 << "%" << endl;`.

---

#### Step: recap [SUMMARY]
**Second mission recap**

**Recap / Key Points:**
- Numbers are written in C++ without quotation marks — the compiler recognizes them as numeric values and converts them for display automatically.
- The `<<` operator chains text, numbers, and formatting commands into a single stream from left to right.
- The `\n` escape sequence breaks lines inside strings without triggering a forced buffer flush, unlike `endl`.
- Comments (`//` and `/* ... */`) document software logic and are completely stripped during compilation, taking zero bytes in memory.
- Currently, all metrics in our dashboard are hardcoded constants. To store and update live values during flight, Chapter 3 introduces variables and data types.


---


# Lesson 3 · Data types: the big picture
**Slug:** `data-types` | **Module:** Block 1 · Awakening

#### Step: why-types [THEORY]
*Eyebrow:* Onboard memory
**Why variables need a type**

In the previous chapter, every number in Sigma's telemetry was hardcoded directly into the source file. During an actual flight, telemetry values change every second — a program needs variables to store and update them in memory.

This chapter is a broad overview of fundamental data types; their detailed mechanics will be explored in subsequent chapters.

In Python, the same variable can hold a whole number (15) on one line and text ("OK") on the next (dynamic typing), which adds memory overhead and unexpected runtime checks. On Sigma's flight computer (constrained to ~1 MB of RAM), C++ uses static typing: you declare each variable's type up front so the compiler reserves exact bytes and catches mismatches before launch.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside a dimly lit Mars research base, a small light scout drone hovers beside a vertical diagnostic console displaying segmented memory blocks of different sizes. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — inspects the illuminated memory segments. Outside a narrow viewport, the Martian ground stretches out. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the memory segments glow. Render the Martian ground in desaturated warm greys, not red.


---

#### Step: declare-variables [THEORY]
**Declaring a variable**

syntax: {type} {name} = {value};
- type: what kind of data — `int`, `double`
- name: how you will refer to it later
- value: the starting value — 14, 91.5
- ;: ends the statement — required

Declaring a variable reserves a named slot in memory. You specify its type once at creation (`int sol = 14;`). When updating its value later (`sol = 15;`), write only the variable name — never repeat the type.

Four fundamental types at a glance:
+ **int for whole numbers.** Stores integers (1, 14, -40) without fractional parts.
+ **double for decimals.** Stores fractional numbers (2.5, 91.5) written with a decimal point.
+ **char for single characters.** Stores a single character ('A') enclosed in single quotes.
+ **bool for logic.** Stores truth values (true, false), printed by cout as 1 or 0.

!> **Python habit to unlearn.** In Python, variables have no type declarations. In C++, repeating `int` on an existing variable attempts to declare a second variable with the same name, which immediately halts compilation.

**Code Comparison:**
```cpp
int sol = 14;
sol = 15;
```
[CORRECT] type once → works

```cpp
int sol = 14;
int sol = 15;
```
[INCORRECT / TRAP] type twice → compile error


---

#### Step: predict-sizeof [PREDICT]
**How many bytes does each type take?**

C++ provides the built-in `sizeof(...)` operator, which returns how many bytes a type or variable occupies on the current platform.

Predict the exact output this program prints to the terminal. This is an initial guess, not a graded test: enter your prediction and compare it with the actual result.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "char: " << sizeof(char) << endl;
    cout << "int: " << sizeof(int) << endl;
    cout << "double: " << sizeof(double) << endl;
    cout << "long: " << sizeof(long) << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `char: 1
int: 4
double: 8
long: 4`
**Explanation:** On our 32-bit browser platform, `char` takes 1 byte, `int` takes 4 bytes, `double` takes 8 bytes, and `long` takes 4 bytes. On 64-bit Linux and macOS, `sizeof(long)` is 8, whereas on 64-bit Windows it is also 4.


---

#### Step: memory-map [EXPLAIN]
*Eyebrow:* Memory layout
**The big picture and typing rules**

In memory, a variable is a named slot of fixed size. For whole numbers (such as 0, 15, -300), C++ provides an integer family (`short`, `int`, `long`, `long long`), with `int` as the everyday choice. For fractional numbers (such as 3.73, -12.5), it provides `float` and `double`, with `double` as the standard default.

The `sizeof` operator accepts either a type name (`sizeof(int)`) or a variable name (`sizeof(sol)`).

> Two strict rules of static typing:
> 1. **No incompatible values.** You cannot assign an incompatible value to a variable — such as storing text ("FAST") inside an `int`.
> 2. **No duplicate declarations.** You cannot declare the same variable name with a type twice in the same scope.

Notice how `sizeof(long)` varies across systems: it is 8 bytes on 64-bit Linux and macOS, 4 bytes on 64-bit Windows, and 4 bytes on our 32-bit platform. See the archive entry below for the engineering reason behind this.

> *Image Alt:* Diagram: char takes 1 byte, bool takes 1 byte, int takes 4 bytes, and double takes 8 bytes on a 32-bit platform.


##### [Archive Record] Why type sizes depend on the platform
When C (the direct ancestor of C++) was designed in the 1970s, computers varied wildly — from 16-bit PDP-11 minicomputers to mainframes. To let compiled code run fast on any CPU, the standard avoided locking fundamental types to a single universal byte count.

Instead, the C and C++ standards guarantee minimum widths and a size ordering: `1 == sizeof(char) <= sizeof(short) <= sizeof(int) <= sizeof(long) <= sizeof(long long)`. Each operating system and compiler vendor picks a data model that fits its hardware best.

When the industry moved to 64-bit CPUs, platforms split. Linux and macOS adopted the LP64 model, expanding `long` to 8 bytes. Microsoft Windows chose the LLP64 model and kept `long` at 4 bytes to preserve compatibility with millions of lines of 32-bit Windows software. Meanwhile, our browser compiler targets 32-bit WebAssembly (ILP32), where `long` is also 4 bytes.

*Sources:*
- [cppreference — Fundamental types (Data models)](https://en.cppreference.com/w/cpp/language/types)
- [cppreference — sizeof operator](https://en.cppreference.com/w/cpp/language/sizeof)

##### [Go Deeper] What is 1 byte and how much fits in 1 MB?
One byte consists of 8 bits — eight tiny cells that each hold 0 or 1. That gives 2⁸ = 256 distinct bit patterns in a single byte.

In our course, Sigma's flight controller has 1 MB, or 1,048,576 bytes, of RAM. Storing a single `int` (4 bytes) costs almost nothing. Storing one million `int` sensor readings, however, would require 4 MB — four times Sigma's entire memory budget.


---

#### Step: first-variables [EDITOR]
**Your first telemetry variables**

**Task:**
The starter code already declares `altitude` (`int`) and `temp` (`double`). Complete two steps:
1. Update `altitude` to 24 without writing `int` again.
2. Print both variables in the format shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude = 15;
    double temp = -12.5;
    
    return 0;
}
```

**Expected Output:**
```
ALTITUDE: 24 M
TEMP: -12.5 C
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude = 15;
    double temp = -12.5;
    altitude = 24;

    cout << "ALTITUDE: " << altitude << " M" << endl;
    cout << "TEMP: " << temp << " C" << endl;
    return 0;
}
```

*Requires tokens:* `int, double, cout`
*Hint:* Write `altitude = 24;` and use two `cout` statements inserting the variable names without quotes.
*Solution Note:* The variable is updated without repeating its type, and `cout` formats both numeric types automatically.

---

#### Step: break-type-safety [EDITOR]
**Break and fix type safety**

**Task:**
This program attempts to store text in an `int` variable — valid in Python, but illegal in C++:
1. Click «Run» to inspect the compiler error.
2. Fix line 6 by assigning the integer 18 so the program compiles and gives the expected output.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int speed = 12;
    speed = "FAST";
    cout << "SPEED: " << speed << endl;
    return 0;
}
```

**Expected Output:**
```
SPEED: 18
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int speed = 12;
    speed = 18;
    cout << "SPEED: " << speed << endl;
    return 0;
}
```

*Requires tokens:* `int speed`
*Hint:* The compiler reports an incompatible type error. Replace `"FAST"` on line 6 with the unquoted integer `18`.
*Solution Note:* With a compatible integer `18` assigned, the code compiles cleanly and prints the speed.

---

#### Step: measure-sizeof [EDITOR]
**Measure core types with `sizeof`**

**Task:**
Use the `sizeof(...)` operator to print the byte sizes of `int` and `double` in the format shown below:
1. Insert `sizeof(int)` into the first `cout` statement.
2. Insert `sizeof(double)` into the second `cout` statement.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "INT BYTES: " <<  << endl;
    cout << "DOUBLE BYTES: " <<  << endl;
    return 0;
}
```

**Expected Output:**
```
INT BYTES: 4
DOUBLE BYTES: 8
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "INT BYTES: " << sizeof(int) << endl;
    cout << "DOUBLE BYTES: " << sizeof(double) << endl;
    return 0;
}
```

*Requires tokens:* `sizeof(int), sizeof(double)`
*Hint:* Insert `sizeof(int)` in the first gap before `<< endl` and `sizeof(double)` in the second.
*Solution Note:* `sizeof(int)` evaluates to 4 and `sizeof(double)` evaluates to 8.

---

#### Step: find-type-bug [CLICKLINE]
**Find the variable declaration error**

Sigma's fuel monitor fails to compile. Locate and click on the line containing a classic variable mistake.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int fuel = 80;
    double gravity = 3.73;
    int fuel = 60;
    cout << "FUEL: " << fuel << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 writes `int fuel = 60;`, attempting to declare a second variable named `fuel`. To update an existing variable's value, write `fuel = 60;` without repeating `int`.


---

#### Step: fill-types [BLANKS]
**Restore types and size check**

Fill in the three missing tokens so the program declares an integer variable and a decimal variable, updates a value, and prints the byte size of `double`.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    [[1]] sol = 14;
    [[2]] altitude = 12.5;
    sol = 15;
    cout << "BYTES: " << [[3]](double) << endl;
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `int` OR `short` OR `long` OR `long long`
- [[2]]: `double` OR `float`
- [[3]]: `sizeof`

**Explanation:** Whole numbers (1, 14, -40) can use `int` (or `short`, `long`, `long long`), fractional numbers (2.5, 91.5) can use `double` (or `float`), and byte size is queried with `sizeof`.


---

#### Step: check-typing [QUIZ]
**What happens when you compile this code?**

Examine these two lines of C++ and choose how the compiler responds.

**Code:**
```cpp
int altitude = 15;
altitude = "HIGH";
```

**Quiz Question:**
- [x] **compile-error**: Compilation stops with an error — an `int` variable cannot store text. *(CORRECT ANSWER)*
- [ ] **auto-switch**: Like in Python, `altitude` automatically switches its type to text.
- [ ] **prints-zero**: The program compiles cleanly and `altitude` silently becomes 0.

**Explanation:** C++ is statically typed. Once `altitude` is created as an `int`, it cannot hold text — the compiler rejects the mismatch before any executable is built.


---

#### Step: drone-memory-audit [EDITOR] (Optional)
**Sigma memory audit**

**Task:**
Write a complete program by following two steps:
1. Declare four variables: an `int` for mission sol (14), a `double` for Mars gravity (3.73), a `char` for sector code ('A'), and a `bool` for active status (`true`).
2. Print each variable along with its byte size using `sizeof` in the format shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Expected Output:**
```
SOL: 14 (4 B)
GRAVITY: 3.73 (8 B)
SECTOR: A (1 B)
ACTIVE: 1 (1 B)
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sol = 14;
    double gravity = 3.73;
    char sector = 'A';
    bool active = true;

    cout << "SOL: " << sol << " (" << sizeof(sol) << " B)" << endl;
    cout << "GRAVITY: " << gravity << " (" << sizeof(gravity) << " B)" << endl;
    cout << "SECTOR: " << sector << " (" << sizeof(sector) << " B)" << endl;
    cout << "ACTIVE: " << active << " (" << sizeof(active) << " B)" << endl;
    return 0;
}
```

*Requires tokens:* `int, double, char, bool, sizeof(`
*Hint:* Remember that `char` uses single quotes `'A'`, and `bool` prints `true` as 1 through `cout`. Example: `cout << "SOL: " << sol << " (" << sizeof(sol) << " B)" << endl;`.

---

#### Step: recap [SUMMARY]
**Third mission recap**

**Recap / Key Points:**
- Variables let a program store and update changing flight values. C++ is statically typed: each variable gets a fixed type at declaration.
- The four fundamental types: whole numbers use `int` (1, 14, -40), decimals use `double` (2.5, 91.5), single characters use `char` in single quotes ('A'), and logic uses `bool` (printed as 1 or 0).
- Two typing rules: you cannot assign an incompatible type to a variable, nor declare the same variable name with a type twice in the same scope.
- The `sizeof(...)` operator reports size in bytes (`char` is 1, `int` is 4, `double` is 8; `long` is 4 on our 32-bit platform and Windows, but 8 on 64-bit Linux and macOS).
- In the next chapter, we explore what happens when a whole number grows too large for its allocated bytes — Sigma's fuel counter suddenly jumps to four billion liters.


---


# Lesson 4 · Integers and overflow
**Slug:** `integers` | **Module:** 1. bloks · Pamodināšana

#### Step: fuel-anomaly [THEORY]
*Eyebrow:* Flight telemetry
**The four billion liter anomaly**

During a pre-flight fueling test in the IRIS hangar, Scout Sigma's telemetry console reported an alarming figure: fuel tank capacity `4,294,967,295 liters`. Sigma is a compact scout drone whose real titanium tank holds only 40 liters.

In Python, integers can grow indefinitely until the operating system runs out of RAM. In C++, integers are stored directly in CPU registers and fixed-size memory slots (16, 32, or 64 bits). When a value exceeds what those bits can hold, the calculation does not halt or warn you — it wraps around.

This hardware behavior is called **integer overflow**. In this chapter, we master the C++ integer family, learn how bits govern numerical ranges, and configure reliable types for space telemetry.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside a technical fueling hangar of Mars base IRIS, scout drone Sigma hovers connected by a corrugated fuel hose to a sleek vertical diagnostic terminal. The terminal's holographic screen shows an alarming readout: '4,294,967,295 L' with a warning pulse. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — looks up at the screen with an inquisitive tilt. Martian terrain and dusty horizon visible through an angled panoramic window. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the terminal screen glow. Render the Martian ground in desaturated warm greys, not red.


---

#### Step: integer-family [THEORY]
**The integer family**

syntax: {type} {name} = {value};
- type: integer type — short, int, long long
- name: variable identifier
- value: integer value, with LL suffix for long long
- ;: ends the statement — required

C++ provides four primary integer sizes to balance memory conservation and numerical capacity on embedded flight hardware:

+ **short for compact ranges.** Takes 2 bytes (16 bits). Holds whole numbers (-32768 to 32767). Ideal for sensor angles, pin IDs, and small counters.
+ **int for everyday work.** Takes 4 bytes (32 bits). Holds whole numbers (-2147483648 to 2147483647). The standard default across C++ programs.
+ **long for system scale.** Takes 4 bytes on 32-bit systems and Windows, but 8 bytes on 64-bit Linux/macOS. We rely on int or long long for predictable sizing.
+ **long long for astronomical counts.** Takes 8 bytes (64 bits). Holds up to ~9 quintillion (about 9 × 10¹⁸). Used for nanosecond timestamps and mission clocks.

!> **The 32-bit literal trap.** In C++, literal numbers written in code (such as 9000000000) default to `int` (32 bits). If a number exceeds 2.1 billion, you must append the `LL` suffix (`9000000000LL`), otherwise the compiler flags an integer constant overflow before assigning it to a `long long`.

**Code Comparison:**
```cpp
long long ticks = 9000000000LL;
cout << ticks;
```
[CORRECT] LL suffix → compiler treats constant as 64-bit

```cpp
long long ticks = 9000000000;
cout << ticks;
```
[INCORRECT / TRAP] no suffix → integer constant overflow warning


---

#### Step: binary-ranges [EXPLAIN]
*Eyebrow:* Binary representation
**Bits, signs, and ranges**

Every integer type occupies a fixed number of bits: 16 bits provide 65,536 distinct values (2¹⁶), while 32 bits provide over 4.29 billion (2³²).

> Two fundamental integer modes:
> 1. **signed (default).** Reserves the highest bit for the algebraic sign (+/-). A 16-bit `short` ranges from -32,768 to 32,767.
> 2. **unsigned.** Discards negative numbers to double the positive ceiling. An `unsigned short` ranges from 0 to 65,535, while `unsigned int` reaches 4,294,967,295.

Notice that `unsigned` does not increase memory usage — it shifts the window of possible values to start at zero. For quantities that cannot physically be negative (such as drone fuel volume, array lengths, or byte counts), `unsigned` guarantees valid non-negative states.

> *Image Alt:* Diagram comparing signed and unsigned ranges for 16-bit short and 32-bit int.


##### [Archive Record] Why the Ariane 5 rocket exploded at second 37
On June 4, 1996, the European Space Agency launched the maiden flight of the Ariane 5 rocket (flight 501). Just 37 seconds after liftoff, the launcher veered sharply off path, broke up under aerodynamic stress, and triggered its autonomous self-destruct.

The official inquiry board headed by Prof. Jacques-Louis Lions revealed the cause: a software module reused from the older Ariane 4 attempted to convert a 64-bit floating-point horizontal velocity value into a 16-bit signed integer (`short`).

Ariane 5's higher horizontal velocity produced a value greater than 32,767. The hardware conversion triggered an unhandled overflow exception. Both primary and backup flight computers shut down simultaneously, leaving the guidance nozzles locked in an extreme angle.

The total payload loss exceeded 370 million dollars. The catastrophe became computing history's most famous lesson in data type bounds and unchecked numerical conversions.

Source: ESA Ariane 5 Flight 501 Failure Report by the Inquiry Board (1996, https://www.esa.int/esapub/bulletin/bullet89/lions89.htm).


##### [Go Deeper] How computers store negative numbers (two's complement)
Modern processors store negative numbers using two's complement. In an 8-bit byte, the number 1 is `00000001`, while -1 is represented by flipping all bits and adding 1: `11111111`.

If you interpret `11111111` as an unsigned number, it equals 255 (2⁸ − 1). In 32 bits, all ones (`11111111...`) represent -1 in signed arithmetic, but exactly 4,294,967,295 in unsigned arithmetic.

When Sigma's fuel sensor subtracted a small reading from zero in an unsigned variable, the value wrapped under zero and became `4,294,967,295`.


---

#### Step: predict-overflow [PREDICT]
**What happens after the maximum?**

In this program, an `unsigned short` variable reaches its upper limit of 65,535 and then adds 1.

Predict what this program prints to the terminal. This is a guess to build intuition, not a test: enter your prediction and compare it with the actual result.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    unsigned short fuel = 65535;
    fuel = fuel + 1;
    cout << "FUEL: " << fuel << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `FUEL: 0`
**Explanation:** When an `unsigned short` exceeds its maximum value (65,535), the extra 17th bit is discarded by hardware, wrapping the value back to 0. Unsigned arithmetic in C++ is strictly guaranteed by the language standard to wrap modulo 2ⁿ.


---

#### Step: fix-short-overflow [EDITOR]
**Choosing the right range**

**Task:**
The program tracks Sigma's patrol distance in meters. Currently `distance` uses `short` (maximum 32,767), causing an overflow at 45,000 meters. Complete two steps:
1. Change the type of `distance` to `int` so it safely accommodates 45,000.
2. Run the program to print the result in the format shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    short distance = 45000;
    cout << "DISTANCE: " << distance << " M" << endl;
    return 0;
}
```

**Expected Output:**
```
DISTANCE: 45000 M
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance = 45000;
    cout << "DISTANCE: " << distance << " M" << endl;
    return 0;
}
```

*Requires tokens:* `int distance`
*Hint:* Replace `short` on line 4 with `int`. Do not change the number 45000.
*Solution Note:* `int` comfortably holds up to ~2.1 billion, completely resolving the 45,000-meter overflow.

---

#### Step: find-overflow-bug [CLICKLINE]
**Spot the overflowing variable**

Sigma's telemetry module has a variable declaration that exceeds its type capacity and produces corrupt data. Click on the line with the bug.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sensor_id = 104;
    short altitude = 70000;
    long long timestamp = 1700000000LL;
    cout << "ID: " << sensor_id << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 6
**Explanation:** On line 6, `short altitude = 70000;` assigns 70,000 to a signed 16-bit `short`. Since `short` tops out at 32,767, this value overflows into negative numbers.


---

#### Step: fill-integer-types [BLANKS]
**Match types to Mars mission metrics**

Select the appropriate integer type for each of the three variables according to their required range.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    [[1]] sector = 14;
    [[2]] sol_seconds = 88775;
    [[3]] base_clock = 9000000000LL;
    cout << "SECTOR: " << sector << endl;
    cout << "SECONDS: " << sol_seconds << endl;
    cout << "CLOCK: " << base_clock << endl;
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `short` OR `int`
- [[2]]: `int` OR `unsigned int`
- [[3]]: `long long`

**Explanation:** Small numbers (sector 14) fit in `short` or `int`. Mars sol duration (88,775 seconds) exceeds 32,767 and requires `int` (or `unsigned int`). Central clock ticks (9 billion) exceed 32-bit `int` (2.1 billion) and require `long long`.


---

#### Step: quiz-unsigned [QUIZ]
**What happens on underflow?**

Look at these two lines of code and choose what happens after subtracting 50 from 40 in an `unsigned int` variable.

**Code:**
```cpp
unsigned int fuel = 40;
fuel = fuel - 50;
```

**Quiz Question:**
- [x] **wraps-to-billions**: The value wraps around modulo 2^32, producing approximately 4.29 billion. *(CORRECT ANSWER)*
- [ ] **compile-error**: The compiler stops compilation with an incompatible sign error.
- [ ] **becomes-negative**: The variable changes its type to signed int and stores -10.

**Explanation:** Because `unsigned int` cannot store negative numbers, subtracting 50 from 40 wraps under zero back from the maximum 32-bit value (2³² − 10 = 4,294,967,286). This is exactly how Sigma's tank reading became 4 billion.


---

#### Step: calibrate-fuel [EDITOR]
**Calibrate Sigma's fuel telemetry**

**Task:**
Write a telemetry calibration routine for Scout Sigma completing two steps:
1. Declare two variables: `short tank_id` with value 3, and `unsigned int fuel_ml` with value 40000 (representing 40 liters in milliliters).
2. Print the telemetry lines in the format shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
```

**Expected Output:**
```
TANK: 3
FUEL: 40000 ML
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    short tank_id = 3;
    unsigned int fuel_ml = 40000;

    cout << "TANK: " << tank_id << endl;
    cout << "FUEL: " << fuel_ml << " ML" << endl;
    return 0;
}
```

*Requires tokens:* `short, unsigned int, cout`
*Hint:* Declare `short tank_id = 3;` and `unsigned int fuel_ml = 40000;`, then print each with `cout` and `endl`.
*Solution Note:* Both types fit their respective telemetry domains without waste or overflow.

---

#### Step: mission-clock [EDITOR] (Optional)
**Planetary mission clock**

**Task:**
Write a program for the Mars base central clock completing two steps:
1. Declare a `long long` variable named `base_micros` initialized to 15000000000LL (15 billion microseconds, exceeding 32-bit range).
2. Print the clock telemetry with its byte size via `sizeof` in the format shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
```

**Expected Output:**
```
CLOCK: 15000000000 US
BYTES: 8
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    long long base_micros = 15000000000LL;

    cout << "CLOCK: " << base_micros << " US" << endl;
    cout << "BYTES: " << sizeof(base_micros) << endl;
    return 0;
}
```

*Requires tokens:* `long long, LL, sizeof`
*Hint:* Remember to append the `LL` suffix: `long long base_micros = 15000000000LL;` and use `sizeof(base_micros)`.
*Solution Note:* The 64-bit `long long` holds the 15-billion microsecond timestamp without overflow and occupies 8 bytes.

---

#### Step: recap [SUMMARY]
**Integer mission debrief**

**Recap / Key Points:**
- Whole numbers in C++ are bound to physical hardware registers: `short` (2 bytes), `int` (4 bytes), and `long long` (8 bytes).
- The `unsigned` modifier doubles the maximum positive range by discarding negative numbers, but underflowing below 0 wraps back to the maximum ceiling (such as 4.29 billion in `unsigned int`).
- Literal constants larger than 2.1 billion must be written with the `LL` suffix (`9000000000LL`) to prevent 32-bit constant overflow warnings.
- Integer overflow is silent in production: exceeding signed limits leads to undefined behavior, while unsigned types wrap modulo 2ⁿ.
- In the next chapter, we will see what happens when numbers need fractional precision — and why calculating `5 / 2` in C++ can land a drone in a crater instead of the landing pad.


---


# Lesson 5 · Floating-point numbers and precision
**Slug:** `floating-point` | **Module:** Block 1 · Awakening

#### Step: crater-landing [THEORY]
*Eyebrow:* Flight anomaly
**The crater landing**

Scout drone Sigma was scheduled to touch down on the elevated landing platform of base IRIS. Instead, telemetry confirmed the drone landed 500 meters short, coming to rest on the rocky floor of a shallow Martian crater.

A post-flight log inspection revealed the cause. To calculate the final approach step, the onboard navigation routine divided 5 meters across 2 seconds using the expression `5 / 2`. In C++, dividing two whole numbers results in an integer: the fractional part was discarded, producing `2` meters instead of `2.5`.

Whole numbers and fractional numbers live under different mathematical rules in computing hardware:
+ **Whole numbers (integers).** Quantities like 0, 14, and -300 stored in `int` or `long long`. Division between integers always truncates toward zero.
+ **Fractional numbers (floating-point).** Continuous physical quantities like 3.73, -12.5, and 2.5 stored in `float` or `double`.
+ **Promotion to decimals.** To obtain a decimal result from division, at least one number in the expression must have a decimal point (`5.0 / 2`).

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside a dusty Martian crater, scout drone Sigma rests tilted on a rocky slope with carbon rotors stopped, just 500 meters away from the elevated concrete landing platform of base IRIS visible in the background. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — stands on a rocky ledge looking down at the drone with an analytical gaze. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the drone navigation sensor glow. Render the Martian ground in desaturated warm greys, not red.


##### [Archive Record] Why the Mars Climate Orbiter burned up in 1999
On September 23, 1999, NASA's Mars Climate Orbiter approached the Red Planet to establish orbit after a nine-month interplanetary cruise. Instead of entering orbit at an intended safe altitude between 140 and 150 km, the spacecraft dipped down to just 57 km into the Martian atmosphere, where atmospheric friction ripped it apart.

The NASA mishap investigation board discovered an engineering unit mismatch between two software modules. Ground control software built by the spacecraft contractor (Lockheed Martin) calculated thruster impulse data in English imperial units (pound-force-seconds). The trajectory guidance system at NASA's Jet Propulsion Laboratory expected metric standard units (Newton-seconds).

One pound-force equals approximately 4.45 Newtons. Because the data transfer lacked explicit unit conversions and precision scaling, each small thruster maneuver accumulated an uncorrected navigation drift over 286 days.

The 327-million-dollar spacecraft was lost entirely. The disaster remains computing and aerospace history's most celebrated case study on unit contracts, numerical precision, and dimensional validation.

Source: Mars Climate Orbiter Mishap Investigation Board Phase I Report (NASA, November 1999, https://llis.nasa.gov/lesson/639).


##### [Go Deeper] Why 0.1 cannot be stored exactly in binary
In decimal notation (base 10), fractions like 1/10 are written simply as 0.1 because 10 is divisible by 2 and 5. A fraction like 1/3, however, becomes an infinite repeating decimal: 0.333333…

Computers store fractional numbers in binary (base 2), which can only represent fractions whose denominators are powers of two (such as 1/2 = 0.5, 1/4 = 0.25, 1/8 = 0.125).

In base 2, the decimal fraction 0.1 becomes an infinite repeating binary fraction: 0.0001100110011… Because memory registers hold a finite number of bits, the processor cuts off the sequence. This tiny rounding discrepancy explains why adding 0.1 ten times in code may yield 0.9999999999999999 instead of exactly 1.0.


---

#### Step: float-vs-double [THEORY]
**Float and double**

syntax: {type} {name} = {value};
- type: floating-point type — float, double
- name: variable identifier
- value: decimal number with point, optional f suffix for float
- ;: ends the statement — required

C++ provides two primary floating-point types according to the IEEE 754 standard:

+ **float for compact storage.** Takes 4 bytes (32 bits) in memory. Delivers about 7 decimal digits of precision. Written in source code with an `f` suffix (`3.73f`, `12.5f`). Used when conserving RAM on embedded sensors.
+ **double for scientific accuracy.** Takes 8 bytes (64 bits) in memory. Delivers about 15 to 17 decimal digits of precision. This is the default choice for decimals across modern C++ programs.

!> **Literal suffix rule.** Any decimal number written without a suffix (such as `4.2` or `0.05`) defaults to `double`. If you assign `4.2` to a `float`, compilers issue a warning about potential loss of precision when truncating 64 bits to 32 bits.

**Code Comparison:**
```cpp
double speed = 12.5;
float alt = 4.2f;
```
[CORRECT] float literal with f suffix → 4-byte float

```cpp
float alt = 4.2;
// warning: conversion from double to float
```
[INCORRECT / TRAP] no suffix → compiler treats decimal as 8-byte double


---

#### Step: predict-division [PREDICT]
**What does C++ division produce?**

Examine the four division operations below. Predict the exact output printed by each command.

This is an exercise in spotting integer truncation, not a graded test: think through how C++ treats whole numbers versus decimals, write down your prediction, and compare it with the result.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "5 / 2 = " << 5 / 2 << endl;
    cout << "5.0 / 2 = " << 5.0 / 2 << endl;
    cout << "5 / 2.0 = " << 5 / 2.0 << endl;
    cout << "1 / 4 = " << 1 / 4 << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `5 / 2 = 2
5.0 / 2 = 2.5
5 / 2.0 = 2.5
1 / 4 = 0`
**Explanation:** When both operands are integers (`5 / 2`), C++ performs integer division and truncates the fractional part, yielding `2`. When either operand has a decimal point (`5.0 / 2` or `5 / 2.0`), C++ promotes the operation to floating-point division, yielding `2.5`. In `1 / 4`, integer truncation yields `0`.


---

#### Step: integer-division-trap [THEORY]
*Eyebrow:* Arithmetic mechanics
**The integer division trap**

A common pitfall for programmers is storing the result of an integer division inside a `double` variable.

> Two fundamental rules of C++ division:
> 1. **Integer division truncates without rounding.** If both operands are whole numbers (`int`), the expression evaluates to an `int`. Any remainder is discarded immediately: `7 / 4` is `1`, `1 / 4` is `0`.
> 2. **One decimal promotes the entire operation.** If at least one operand is floating-point (`5.0 / 2` or `5 / 2.0`), C++ promotes the other operand and computes a floating-point result.

Writing `double d = 5 / 2;` does not prevent truncation: the division `5 / 2` finishes first as integer `2`, and only then is the integer `2` converted into `2.0` and stored in `d`.

!> **Python habit to unlearn.** In Python 3, the single slash `/` always produces a float (`5 / 2` evaluates to `2.5`), while integer division requires `//`. In C++, the single slash `/` means integer division when given integers, and floating-point division when given decimals!

**Code Comparison:**
```cpp
double d = 5.0 / 2;
// d is 2.5
```
[CORRECT] decimal operand → accurate 2.5

```cpp
double d = 5 / 2;
// 5 / 2 evaluates to 2, then stored as 2.0
```
[INCORRECT / TRAP] integer division → truncates to 2 before storing in double


---

#### Step: fix-crater-math [EDITOR]
**Fix Sigma's descent calculation**

**Task:**
Sigma's landing routine calculated `dist` using integer division, causing the drone to touch down in a crater. Fix the calculation so `dist` evaluates accurately to 2.5 meters in the format shown below:
1. Change the integer literal `5` to `5.0` (or `2` to `2.0`).
2. Click «Run» and verify that the descent step prints `2.5 M`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int target = 5;
    int step = 2;
    double dist = 5 / 2;
    cout << "DESCENT STEP: " << dist << " M" << endl;
    return 0;
}
```

**Expected Output:**
```
DESCENT STEP: 2.5 M
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int target = 5;
    int step = 2;
    double dist = 5.0 / 2;
    cout << "DESCENT STEP: " << dist << " M" << endl;
    return 0;
}
```

*Requires tokens:* `.0`
*Hint:* Change line 6 to: `double dist = 5.0 / 2;`.
*Solution Note:* With `5.0` as a double operand, C++ executes floating-point division and stores `2.5` in `dist`.

---

#### Step: precision-map [EXPLAIN]
*Eyebrow:* Binary representation
**Floating-point precision in memory**

Under the IEEE 754 standard, floating-point numbers are partitioned into three binary components: a sign bit, an exponent that scales the value, and a mantissa (fraction) that stores the significant digits.

> Precision rule in space avionics:
> 1. **float (23-bit mantissa).** Can distinguish values up to approximately 7 decimal digits. Accumulates visible drift over thousands of flight calculations.
> 2. **double (52-bit mantissa).** Can distinguish values up to 15—17 decimal digits. The aerospace standard for autonomous navigation, orbital trajectories, and sensor integration.

Because memory is finite, floating-point values are approximations of continuous real numbers. In Sigma's navigation system, flight coordinates and landing vectors strictly rely on `double`.

> *Image Alt:* Diagram comparing IEEE 754 binary layouts: float (32 bits, 23-bit mantissa, 7 digits) versus double (64 bits, 52-bit mantissa, 15 to 17 digits).


---

#### Step: measure-float [EDITOR]
**Measure precision types and burn time**

**Task:**
Complete Sigma's thruster burn calculation in the format shown below:
1. Print `sizeof(float)` and `sizeof(double)`.
2. Compute `burn_time` by dividing `fuel` (7.5) by `rate` (2.0).
3. Output the burn time in seconds.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    double fuel = 7.5;
    double rate = 2.0;
    
    return 0;
}
```

**Expected Output:**
```
FLOAT BYTES: 4
DOUBLE BYTES: 8
BURN TIME: 3.75 S
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    double fuel = 7.5;
    double rate = 2.0;
    double burn_time = fuel / rate;

    cout << "FLOAT BYTES: " << sizeof(float) << endl;
    cout << "DOUBLE BYTES: " << sizeof(double) << endl;
    cout << "BURN TIME: " << burn_time << " S" << endl;
    return 0;
}
```

*Requires tokens:* `sizeof(float), sizeof(double), fuel / rate`
*Hint:* Write `double burn_time = fuel / rate;` and print the three values with `cout`.
*Solution Note:* `float` occupies 4 bytes, `double` occupies 8 bytes, and dividing `7.5 / 2.0` yields `3.75 S` without rounding.

---

#### Step: find-division-bug [CLICKLINE]
**Find the hidden integer division**

Sigma's telemetry module reports a travel speed of `2 M/S` instead of the expected `2.5 M/S`. Locate and click on the line containing the truncation bug.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance = 10;
    int seconds = 4;
    double speed = distance / seconds;
    cout << "SPEED: " << speed << " M/S" << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 executes `distance / seconds`. Because both `distance` and `seconds` are declared as `int`, integer division discards the remainder before the value is assigned to `speed`. To fix it, at least one variable must be cast or declared as `double`.


---

#### Step: fill-float-types [BLANKS]
**Restore telemetry types and literals**

Three critical tokens are missing from Sigma's telemetry calibration listing. Fill in the blanks so all calculations retain exact decimal precision.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    [[1]] gravity = 3.73;
    double descent_step = 5[[2]] / 2;
    [[3]] rotor_thrust = 4.5f;
    cout << "GRAVITY: " << gravity << endl;
    cout << "STEP: " << descent_step << endl;
    cout << "THRUST: " << rotor_thrust << endl;
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `double` OR `float`
- [[2]]: `.0` OR `.0f`
- [[3]]: `float` OR `double`

**Explanation:** `double` stores gravity accurately, `.0` prevents integer division on the descent step, and `float` matches the `4.5f` literal suffix.


---

#### Step: descent-trajectory [EDITOR] (Optional)
**Calibrate the descent profile**

**Task:**
Write a complete program to calculate Sigma's final descent trajectory in the format shown below:
1. Declare `altitude` (`double`) with value `12.5`.
2. Declare `speed` (`double`) with value `2.5`.
3. Compute descent time by dividing `altitude` by `speed`.
4. Print `ALTITUDE: 12.5 M` and `DESCENT TIME: 5 S`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
```

**Expected Output:**
```
ALTITUDE: 12.5 M
DESCENT TIME: 5 S
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    double altitude = 12.5;
    double speed = 2.5;
    double time = altitude / speed;

    cout << "ALTITUDE: " << altitude << " M" << endl;
    cout << "DESCENT TIME: " << time << " S" << endl;
    return 0;
}
```

*Requires tokens:* `double, cout`
*Hint:* Compute `double time = altitude / speed;` and stream both outputs with `cout` and `endl`.

---

#### Step: recap [SUMMARY]
**Mission 5 recap**

**Recap / Key Points:**
- C++ provides `float` (4 bytes, ~7 decimal digits) and `double` (8 bytes, ~15—17 decimal digits) for real numbers, with `double` as the standard default.
- Dividing two integers (`5 / 2`) always performs integer division, discarding the remainder without rounding.
- To perform floating-point division, at least one operand must be a decimal literal (`5.0 / 2` or `5 / 2.0`) or a floating-point variable.
- Storing the result of an integer division into a `double` does not preserve decimals: the truncation occurs before the assignment.
- Floating-point numbers in IEEE 754 are binary approximations with finite mantissa bits. In Chapter 6, we introduce logic and text types: `bool`, `char`, and `string`.


---


# Lesson 6 · bool, char, and string
**Slug:** `bool-char-string` | **Module:** Block 1 · Awakening

#### Step: system-diagnostics [THEORY]
*Eyebrow:* Diagnostics bay
**Rebooting the system flags**

Drone Sigma has been brought into the IRIS maintenance bay after its crater touchdown. Physical components are intact, but the flight computer is rebooting its internal state registers.

To prepare for full operational recovery, the diagnostic console needs more than just numerical data like integer counters and floating-point distances. The telemetry stream requires logical flags to indicate subsystem readiness, single-character codes to designate sensor operating modes, and textual labels to track component names.

C++ provides three distinct data types for logic and text:
+ **bool for logical states.** Holds either true or false. Takes 1 byte of memory.
+ **char for single characters.** Holds one ASCII symbol enclosed in single quotes like 'A' or '8'. Takes 1 byte of memory.
+ **std::string for text sequences.** Holds words, sentences, or structured identifiers enclosed in double quotes like "IRIS-01". Dynamic size provided by the standard library header <string>.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside the high-tech technical maintenance bay of Mars base IRIS. A faceted geometric scout drone Sigma in dark slate #151A22 and warm grey #B7B0A4 hovers docked at an illuminated diagnostic console terminal. The console terminal has a glowing rectangular monitor showing abstract digital diagnostic readouts composed purely of flat rectangular binary status blocks, horizontal progress/level bars, and segmented matrix grids in aged brass #B99A61. Standing on the floor near the console, observing the diagnostic readout, is the course mascot: refer directly to mascot-reference.png. The mascot consists strictly of two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, exactly as in the reference image. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Background shows minimal geometric maintenance bay architecture (#151A22, #090B0F) and an observation window revealing flat Martian terrain in desaturated warm grey (#B7B0A4), strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical and calm. Color palette strictly: #090B0F, #151A22, #B7B0A4, #D8D0C2, with aged brass #B99A61 only on the console display glow.


##### [Archive Record] How ASCII standardized computing communication in 1963
In the early days of computing, every hardware vendor invented their own character encoding. IBM used BCD and later EBCDIC, while others used proprietary 5-bit or 6-bit telegraphic codes. A magnetic tape written by one computer could not be read by another because the number 1 might mean the letter 'A' on one machine and the character 'J' on another.

In May 1963, the American Standards Association (now ANSI) published ASCII (American Standard Code for Information Interchange). It established a 7-bit standard mapping 128 codes: numbers 0 to 31 for control characters (such as newline, carriage return, and bell), 48 to 57 for digits '0' through '9', 65 to 90 for uppercase Latin letters 'A' to 'Z', and 97 to 122 for lowercase letters 'a' to 'z'.

C++ inherited this standard through the char type, which on modern platforms maps directly to 8-bit bytes containing ASCII codes.

Source: American Standard Code for Information Interchange, ASA X3.4-1963; Computer History Museum (https://www.computerhistory.org).


##### [Go Deeper] Why bool takes a whole byte instead of a single bit
A boolean value represents a binary decision: 1 (true) or 0 (false). Mathematically, a single bit is sufficient to store this state.

However, modern CPU architectures (x86-64, ARM) are byte-addressable. The memory controller cannot directly address an individual bit on the RAM bus; the smallest addressable unit of memory is an 8-bit byte.

If C++ packed standard bool variables into individual bits, reading or writing a flag would require the processor to fetch an entire byte, execute bitwise masking operations (AND/OR), and write it back, introducing CPU overhead. By giving bool 1 byte (8 bits), C++ ensures fast, direct memory access at the cost of 7 unused bits per standalone flag.


---

#### Step: bool-flags [THEORY]
**Logical states: bool**

The bool type (named after British mathematician George Boole) stores boolean truth values.

syntax: bool {name} = {value};
- bool: logical type keyword (1 byte)
- name: variable identifier
- value: boolean literal — `true` or `false`
- ;: statement terminator — mandatory in C++

> Rules for boolean variables:
> 1. **Only two valid literals.** In C++ source code, boolean values are written strictly in lowercase: `true` and `false`.
> 2. **cout prints numeric 1 or 0 by default.** When you send a bool to cout, the stream prints `1` for true and `0` for false. It does not print the English word "true" unless explicitly configured with std::boolalpha.
> 3. **Non-zero is true.** In C++, any non-zero integer converts to true, while 0 converts to false.

!> **Python habit to unlearn.** In Python, boolean literals are capitalized (`True`, `False`). In C++, writing `True` or `False` causes a compilation error ('True' was not declared in this scope). Always write `true` and `false` in lowercase!

**Code Comparison:**
```cpp
bool radar_ready = true;
bool sensor_fault = false;
```
[CORRECT] C++ keywords: true and false (lowercase)

```cpp
bool radar_ready = True;
// error: 'True' was not declared (C++ uses lowercase)
```
[INCORRECT / TRAP] syntax error: True is not recognized in C++


---

#### Step: predict-bool-char [PREDICT]
**Predict boolean and character output**

Review the variable declarations and stream output below. Predict the exact line that prints to the console.

Notice how `active` is `true`, `error` is `false`, and `mode` is the character `'S'`.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    bool active = true;
    bool error = false;
    char mode = 'S';
    cout << active << " " << error << " " << mode << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `1 0 S`
**Explanation:** The stream prints '1' for true, '0' for false, and the literal symbol 'S' for the char variable. Values separated by space literals produce "1 0 S". In C++, cout does not wrap characters in quotes or print textual "true"/"false".


---

#### Step: char-and-ascii [THEORY]
**Single characters: char and ASCII**

The char type stores a single symbol: a letter, digit, punctuation mark, or whitespace. It occupies exactly 1 byte (8 bits) in memory.

syntax: char {name} = '{symbol}';
- char: character type keyword (1 byte)
- name: variable identifier
- symbol: single ASCII symbol in single quotes
- ;: statement terminator — mandatory in C++

> Character literal rules:
> 1. **Strictly single quotes.** A single character literal must be wrapped in single quotes: `'A'`, `'7'`, `'$'`, `'\n'`.
> 2. **Double quotes are strings.** Enclosing a character in double quotes (`"A"`) creates a string literal, not a char. Assigning `"A"` to a char causes a compilation error.
> 3. **Integers under the hood.** Every char stores an integer ASCII code. The symbol `'A'` is stored as number 65, `'B'` is 66, and `'0'` is 48. Because char is an integer type, you can even perform arithmetic on it.

!> **Python habit to unlearn.** In Python, single and double quotes are completely interchangeable (`'hello'` == `"hello"`). In C++, quotes have strict type meaning: single quotes `''` mean exactly one char, and double quotes `""` mean a string literal!

**Code Comparison:**
```cpp
char tier = 'A';
// 1 byte, single quotes
```
[CORRECT] single quotes enclose 1-byte char literal

```cpp
char tier = "A";
// error: invalid conversion from 'const char*' to 'char'
```
[INCORRECT / TRAP] double quotes create a string literal (cannot assign to char)


---

#### Step: configure-status-flags [EDITOR]
**Configure diagnostic status flags**

**Task:**
Initialize Sigma's primary diagnostic telemetry flags:
1. Declare a boolean variable `online` initialized to `true`.
2. Declare a character variable `sector` initialized to `'D'` (Diagnostic bay).
3. Print `online`, a space `" "`, and `sector` to `cout`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // 1. Declare bool online initialized to true
    // 2. Declare char sector initialized to 'D'
    // 3. Print online, space, and sector on one line
    
    return 0;
}
```

**Expected Output:**
```
1 D
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    bool online = true;
    char sector = 'D';
    cout << online << " " << sector << endl;
    return 0;
}
```

*Requires tokens:* `bool, char, 'D', online`
*Hint:* Write `bool online = true;` and `char sector = 'D';`, then stream them with `cout << online << " " << sector << endl;`.
*Solution Note:* The program outputs `1 D`. The boolean `online` evaluates to `1`, followed by space and character `'D'`.

---

#### Step: string-basics [THEORY]
**Text sequences: std::string**

A single char holds only one symbol. To represent names, commands, and communication messages, C++ provides the std::string type.

syntax: string {name} = "{text}";
- string: text sequence type from `<string>`
- name: variable identifier
- text: sequence of characters in double quotes
- ;: statement terminator — mandatory in C++

> Working with std::string:
> 1. **Include header <string>.** To use std::string, you must include the header file at the top of your program: `#include <string>`.
> 2. **Double quotes are mandatory.** Strings are always wrapped in double quotes: `"IRIS-BASE"`. Using single quotes triggers a compiler error.
> 3. **Concatenation with + operator.** You can glue strings together using the plus operator (`+`), provided at least one of the items is already a string: `string full = tag + "/" + code;`.
> 4. **Finding length with .length().** Calling `.length()` on any string returns the exact number of characters it contains.

!> **Literal addition trap.** You cannot add two raw string literals directly with plus (`"IRIS" + "-01"` is invalid because neither side is yet a `std::string` object). At least one operand must be a `std::string` variable!

**Code Comparison:**
```cpp
#include <string>
using namespace std;
string callsign = "IRIS-1";
```
[CORRECT] std::string with double quotes for text sequences

```cpp
string callsign = 'IRIS-1';
// error: character constant too long for its type
```
[INCORRECT / TRAP] error: single quotes cannot hold text sequences


---

#### Step: string-operations-map [EXPLAIN]
*Eyebrow:* Memory architecture
**Memory layout of bool, char, and string**

The three non-numeric types fulfill distinct architectural roles in memory.

> Architectural comparison:
> 1. **bool (1 byte).** Holds a single binary flag (0 or 1). Direct byte access without bit-masking.
> 2. **char (1 byte).** Stores an 8-bit integer corresponding to an ASCII character code.
> 3. **std::string (dynamic sequence).** Manages a dynamic buffer of char elements in memory, automatically tracking its size and terminating characters.

When drone Sigma transmits a packet, its header combines a single-byte operational flag, a single-byte protocol tier, and a variable-length mission payload string.

> *Image Alt:* Memory diagram comparing 1-byte bool, 1-byte char, and dynamic std::string sequence.


---

#### Step: format-mission-log [EDITOR]
**Construct a formatted telemetry channel**

**Task:**
Format the communication channel path for drone Sigma:
1. Combine `station`, `"/"`, and `channel` using the `+` operator, storing the result in a new `string` named `full_channel`.
2. Print `full_channel` on the first line.
3. Print `full_channel.length()` on the second line.

**Starter Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string station = "LUNAR-BASE";
    string channel = "ALPHA";
    
    // 1. Combine station, "/", and channel into full_channel
    // 2. Print full_channel
    // 3. Print full_channel.length()
    
    return 0;
}
```

**Expected Output:**
```
LUNAR-BASE/ALPHA
16
```

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string station = "LUNAR-BASE";
    string channel = "ALPHA";
    string full_channel = station + "/" + channel;

    cout << full_channel << endl;
    cout << full_channel.length() << endl;
    return 0;
}
```

*Requires tokens:* `string, station + "/" + channel, .length()`
*Hint:* Declare `string full_channel = station + "/" + channel;`, then output `full_channel` and `full_channel.length()` on separate lines using `endl`.
*Solution Note:* The combined string is `LUNAR-BASE/ALPHA`, which contains exactly 16 characters.

---

#### Step: find-quote-bug [CLICKLINE]
**Find the quote error**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char sector = 'A';
    char mode = "D";
    cout << sector << " " << mode << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 6
**Explanation:** Line 6 declares `char mode = "D";` with double quotes. In C++, double quotes signify a string literal (`const char*`), which cannot be assigned to a `char`. The correct syntax is `char mode = 'D';`.


---

#### Step: fill-type-tokens [BLANKS]
**Assign types to mission variables**

**Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    [[1]] ready = true;
    [[2]] tier = 'S';
    [[3]] callsign = "IRIS-01";
    cout << ready << " " << tier << " " << callsign << endl;
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `bool` OR `char`
- [[2]]: `char` OR `bool`
- [[3]]: `string` OR `char`

**Explanation:** `ready = true` is a boolean flag (`bool`), `'S'` is a single ASCII character (`char`), and `"IRIS-01"` is a multi-character sequence (`string`).


---

#### Step: recap [SUMMARY]
**Mission 6 recap: Logic, symbols, and text**

Base IRIS has verified Sigma's diagnostics telemetry. The flight computer's state flags, operational modes, and channel labels are properly registered in memory.

| Type | Size | Literals / Format | Typical Space Role |
| :--- | :--- | :--- | :--- |
| `bool` | 1 byte | `true`, `false` | Subsystem status flags (docked, engine online) |
| `char` | 1 byte | `'A'`, `'D'`, `'Z'` | Protocol modes, sensor tiers, telemetry keys |
| `std::string` | Dynamic | `"LUNAR-BASE/ALPHA"` | Call signs, diagnostic logs, target identifiers |

Next in Chapter 7, we will unlock arithmetic expressions and compound operators to calculate drone velocity, orbital timing, and sensor thresholds.


---


# Lesson 7 · Arithmetic and operations
**Slug:** `arithmetic` | **Module:** Block 1 · Awakening

#### Step: flight-trajectory-prep [THEORY]
*Eyebrow:* Flight calculations
**Plotting the Mawrth Vallis route**

Scout drone Sigma is stationed on the launch runway outside base IRIS, preparing for an autonomous 120-kilometer survey over the Mawrth Vallis plateau.

Before liftoff, the navigation coprocessor must compute vital physical metrics: cruising velocity ($v = s / t$), flight duration in hours and minutes, fuel burn rate, and sensor telemetry cycles.

C++ provides a full suite of arithmetic and assignment operators to handle flight mathematics directly in hardware:
+ **Basic operators (+ - * / %).** Fundamental arithmetic operations matching algebraic rules, plus the integer modulo operator `%`.
+ **Compound assignments (+= -= *= /= %=).** Shorthand operations that modify an existing variable in place without repeating its name.
+ **Increment and decrement (++ --).** High-speed single-unit counters designed for telemetry loops and sequence tracking.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On the launch runway outside Mars base IRIS at night. Positioned on the runway launch threshold ready for liftoff is Scout drone Sigma with faceted dark carbon-slate surfaces, with subtle navigation lights and engine vents glowing in aged brass. Standing nearby at a mobile runway telemetry terminal, observing the drone and monitor, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. In the background, geometric modular structures of base IRIS and flat Martian terrain in desaturated warm grey (#B7B0A4), strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the telemetry display and drone engine vent glow.


##### [Archive Record] How the Apollo 11 Lunar Module avoided computer overload in 1969
On July 20, 1969, as Apollo 11's Lunar Module "Eagle" descended toward the Moon's Sea of Tranquility, the Apollo Guidance Computer (AGC) suddenly flashed alarm codes 1202 and 1201.

The rendezvous radar had been left in the wrong hardware mode, flooding the computer with hundreds of extraneous cycle-stealing interrupts every second. The processor was in danger of running out of memory and execution cycles.

Margaret Hamilton and her team at MIT had designed an asynchronous executive operating system with strict priority scheduling. The computer dropped lower-priority radar calculations and prioritized critical descent thruster arithmetic and landing equations. Because arithmetic routines executed deterministically according to strict priority rules, the lunar module touched down safely with just seconds of fuel remaining.

Source: NASA Apollo 11 Mission Report; MIT Museum Hamilton Archives (https://airandspace.si.edu).


##### [Go Deeper] Why modulo % is mathematically undefined with negative divisors in older C
In elementary arithmetic, division with remainder is defined as a = b * q + r, where the remainder r is strictly non-negative: 0 <= r < |b|.

In older C standards (C89/C90), the sign of the result for integer division with negative numbers was implementation-defined: some compilers rounded toward zero (truncating division), while others rounded toward negative infinity (flooring division).

Since C99 and C++11, the standard strictly mandates truncation toward zero: the quotient a / b always discards the fractional part, and the remainder a % b always preserves the algebraic sign of the numerator a (so -7 % 3 is -1, while 7 % -3 is 1).


---

#### Step: basic-arithmetic-and-modulo [THEORY]
**Basic arithmetic and the modulo operator**

C++ features five binary arithmetic operators: addition (`+`), subtraction (`-`), multiplication (`*`), division (`/`), and modulo (`%`).

syntax: int {remainder} = {total} % {divisor};
- int: integer type keyword
- remainder: variable storing the leftover integer
- total: dividend integer value
- divisor: non-zero integer divisor
- ;: statement terminator — mandatory in C++

> Rules for the modulo operator (%):
> 1. **Integers only.** The `%` operator computes the integer remainder of division. It operates strictly on integers (`int`, `short`, `long long`) and char. It cannot be used with `double` or `float`.
> 2. **Cyclic range.** For any positive divisor `N`, the expression `x % N` always produces a value between `0` and `N - 1`. This makes modulo ideal for clocks, buffer cycles, and telemetry slots.
> 3. **Division by zero is undefined.** Just like regular division (`/`), dividing or computing modulo by zero (`x % 0`) causes an immediate crash (hardware fault / undefined behavior).

!> **Python habit to unlearn.** In Python, modulo works on floating-point numbers (`5.5 % 2` evaluates to `1.5`). In C++, compiling `5.5 % 2` causes an immediate compilation error (`invalid operands to binary expression`). In C++, `%` is strictly for integer types!

**Code Comparison:**
```cpp
int rem = 125 % 60;
// remainder is 5 (valid for integer types)
```
[CORRECT] integer modulo: evaluates to remaining integer 5

```cpp
double rem = 125.5 % 60;
// error: invalid operands to binary expression ('double' and 'int')
```
[INCORRECT / TRAP] error: modulo operator % does not accept floating-point types


---

#### Step: predict-modulo-cycles [PREDICT]
**Predict time unit conversion**

Examine how integer division and the modulo operator separate a total number of seconds into whole minutes and remaining seconds.

Calculate what `125 / 60` produces versus `125 % 60`, then predict the exact output line.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int total_seconds = 125;
    int minutes = total_seconds / 60;
    int seconds = total_seconds % 60;
    cout << minutes << "M " << seconds << "S" << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `2M 5S`
**Explanation:** `125 / 60` performs integer division, producing `2` whole minutes (the fractional remainder is discarded). Meanwhile, `125 % 60` computes the remaining seconds (`125 - 60 * 2 = 5`). Together with text labels, the program prints `2M 5S`.


---

#### Step: operator-precedence [EXPLAIN]
*Eyebrow:* Evaluation hierarchy
**Operator precedence and grouping**

In mathematical expressions with multiple operators, C++ evaluates operations according to strict precedence tiers rather than simple left-to-right reading order.

> Operator precedence hierarchy:
> 1. **Parentheses ( )** — Highest precedence. Expressions inside parentheses always evaluate first.
> 2. **Multiplication, division, modulo (* / %)** — Second tier. Evaluated from left to right.
> 3. **Addition and subtraction (+ -)** — Third tier. Evaluated only after higher-tier operations complete.

Relying on memorized precedence rules can lead to subtle aerospace bugs. In mission-critical navigation code, always use explicit parentheses to document and enforce your intended calculation order.

> *Image Alt:* Diagram comparing default operator precedence (10 + 5 * 2 = 20) with explicit parentheses ((10 + 5) * 2 = 30).


---

#### Step: calculate-flight-telemetry [EDITOR]
**Calculate flight time and unassigned samples**

**Task:**
Complete Sigma's pre-flight navigation calculations in the format shown below:
1. Compute `flight_hours` by dividing `distance` (120) by `speed` (40).
2. Compute `unassigned` samples by calculating `total_samples` (47) modulo `sensors` (4).
3. Print `HOURS: ` followed by `flight_hours` on line 1.
4. Print `UNASSIGNED: ` followed by `unassigned` on line 2.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance = 120;
    int speed = 40;
    int total_samples = 47;
    int sensors = 4;

    // 1. Calculate flight_hours = distance / speed
    // 2. Calculate unassigned = total_samples % sensors
    // 3. Print HOURS: <flight_hours> and UNASSIGNED: <unassigned>
    
    return 0;
}
```

**Expected Output:**
```
HOURS: 3
UNASSIGNED: 3
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance = 120;
    int speed = 40;
    int total_samples = 47;
    int sensors = 4;

    int flight_hours = distance / speed;
    int unassigned = total_samples % sensors;

    cout << "HOURS: " << flight_hours << endl;
    cout << "UNASSIGNED: " << unassigned << endl;
    return 0;
}
```

*Requires tokens:* `distance / speed, total_samples % sensors`
*Hint:* Declare `int flight_hours = distance / speed;` and `int unassigned = total_samples % sensors;`, then stream them with `cout` and `endl`.
*Solution Note:* 120 / 40 equals exactly 3 hours, and 47 % 4 leaves 3 unassigned telemetry samples (since 4 * 11 = 44, remainder 3).

---

#### Step: compound-assignment [THEORY]
**Compound assignment operators**

Programs frequently update an existing variable by adding, subtracting, or multiplying its current value by a delta. To avoid writing the variable name twice, C++ provides compound assignment operators: `+=`, `-=`, `*=`, `/=`, and `%=`.

syntax: {variable} += {delta};
- variable: existing identifier to modify
- +=: compound addition operator
- delta: value or expression added to variable
- ;: statement terminator — mandatory in C++

> Five fundamental compound operators:
> 1. **+= (add and assign).** `fuel += 50;` increases `fuel` by 50.
> 2. **-= (subtract and assign).** `battery -= 15;` decreases `battery` by 15.
> 3. **`*=` (multiply and assign).** `thrust *= 2;` doubles the current thrust.
> 4. **/= (divide and assign).** `altitude /= 2;` halves the altitude.
> 5. **%= (modulo and assign).** `slot %= 10;` wraps `slot` into the range 0—9.

The compound form is not only shorter to type — it also makes code safer by eliminating accidental typos when modifying long variable names like `telemetry_buffer_sequence_index`.

**Code Comparison:**
```cpp
battery -= 10;
// compact compound subtraction
```
[CORRECT] compound subtraction: clean and concise

```cpp
battery = battery - 10;
// verbose repetition of variable name
```
[CORRECT] repeated identifier: valid, but verbose and error-prone


---

#### Step: increment-decrement [THEORY]
**Increment and decrement: ++ and --**

The most frequent arithmetic operation in computing is increasing or decreasing a counter by exactly 1. C++ provides dedicated unary operators for this: `++` (increment) and `--` (decrement).

syntax: {counter}++;
- counter: integer or numeric variable
- ++: increment operator adding 1
- ;: statement terminator — mandatory in C++

> Increment mechanics:
> 1. **Compact step.** Writing `waypoints++;` is equivalent to `waypoints += 1;` or `waypoints = waypoints + 1;`.
> 2. **Prefix vs postfix.** In standalone statements (`x++;` or `++x;`), both forms increase `x` by 1. In complex expressions, prefix (`++x`) increments before reading, while postfix (`x++`) increments after reading.
> 3. **Idiomatic C++.** As standalone statements, both are widely used; in modern C++, `counter++;` is the classic choice for updating counters and waypoints.

!> **Python habit to unlearn.** Python does NOT have `++` or `--` (`x++` is a syntax error in Python, and `++x` in Python is just double positive sign `+(+x)`). In C++, `++` is the standard, native way to step through counters!

**Code Comparison:**
```cpp
waypoints++;
// increments variable value by 1
```
[CORRECT] increment operator: adds 1 directly to variable

```cpp
waypoints =+ 1;
// bug: assigns positive 1 instead of incrementing
```
[INCORRECT / TRAP] syntax bug: assigns positive 1 instead of incrementing


---

#### Step: predict-increment-flow [PREDICT]
**Trace increment and compound updates**

Track the value of `waypoints` through the consecutive operations below. Predict the final output printed to the terminal.

Notice that `waypoints` starts at `3`, then encounters `waypoints++;`, and then `waypoints += 4;`.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int waypoints = 3;
    waypoints++;
    waypoints += 4;
    cout << "WAYPOINTS: " << waypoints << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `WAYPOINTS: 8`
**Explanation:** `waypoints` starts at 3. The `waypoints++;` statement increases it by 1, making it 4. Next, `waypoints += 4;` adds 4 to 4, resulting in 8. The program outputs `WAYPOINTS: 8`.


---

#### Step: find-modulo-float-bug [CLICKLINE]
**Find the invalid modulo operand**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude = 500;
    double fuel = 14.5;
    int fuel_rem = fuel % 2;
    cout << altitude << " " << fuel_rem << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 attempts `int fuel_rem = fuel % 2;`, but `fuel` is declared as a `double` (`14.5`). In C++, the modulo operator `%` strictly requires integer operands. Using `%` with `float` or `double` produces a compile-time error.


---

#### Step: fill-operator-tokens [BLANKS]
**Assign operators to telemetry metrics**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int minutes = 140;
    int hours = minutes [[1]] 60;
    int rem_min = minutes [[2]] 60;
    int total_dist = 100;
    total_dist [[3]] 25;
    cout << hours << " " << rem_min << " " << total_dist << endl;
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `/`
- [[2]]: `%`
- [[3]]: `+=`

**Explanation:** `minutes / 60` computes full hours (2), `minutes % 60` calculates remaining minutes (20), and `total_dist += 25` accumulates distance (125).


---

#### Step: recap [SUMMARY]
**Mission 7 recap: Arithmetic and compound operators**

Scout drone Sigma's pre-flight flight trajectory calculations are complete. All navigation metrics, fuel burn projections, and sensor cycles have been computed using standard C++ operators.

| Operator Category | Syntax / Symbols | Behavior | Typical Mission Role |
| :--- | :--- | :--- | :--- |
| Basic arithmetic | `+`, `-`, `*`, `/` | Standard algebraic math | Distance, speed, and fuel totals |
| Integer remainder | `%` | Remainder of integer division | Cyclic counters, clock minutes, slots |
| Compound update | `+=`, `-=`, `*=`, `/=`, `%=` | Updates variable in place | Battery drain, fuel burn, leg distance |
| Step counters | `++`, `--` | Adds or subtracts 1 | Waypoint index, sample iteration |

Next in Chapter 8, we will unlock terminal input (`cin >>` and `getline`) so base operators can enter flight coordinates and mission parameters interactively.


---


# Lesson 8 · Input with cin
**Slug:** `cin` | **Module:** Block 1 · Awakening

#### Step: operator-console-prep [THEORY]
*Eyebrow:* Flight dispatch terminal
**Connecting the operator console**

Scout drone Sigma is staged on the launch pad at base IRIS, ready for its primary reconnaissance flight over the Mawrth Vallis plateau. In previous missions, all flight parameters were hardcoded directly into the C++ source code as constants.

In real aerospace operations, hardcoding flight targets is dangerous: mission waypoints, flight velocities, and atmospheric conditions change with every dispatch. To make programs flexible, the flight computer must receive input values directly from the human operator during runtime.

C++ provides interactive stream input through the standard input console:
+ **The cin stream.** Included automatically in `<iostream>`. Connects your program directly to the operator's keyboard input.
+ **The extraction operator (>>).** Points inward toward the receiving variable: `cin >> speed;`. Direction mnemonic mirrors data flow.
+ **Automatic type parsing.** Unlike Python's `input()` which always returns text, `cin` reads directly into typed variables: integers, doubles, or strings.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Inside the flight telemetry and dispatch room of Mars base IRIS at dawn. In the foreground, an industrial tactical console terminal with illuminated displays showing telemetry parameters and an active prompt. Sitting attentively at the console terminal, holding a data stylus, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Through a large reinforced panoramic observation window in the background, Scout drone Sigma rests ready on the launch pad under a starry space sky and soft amber Martian horizon. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the telemetry display and drone vent glow.


##### [Archive Record] How Unix standard streams transformed computing in 1972
In early mainframe computing, every peripheral device had its own proprietary assembly commands. Reading from a punched card reader, magnetic tape drive, or teletype required completely different low-level instructions, making programs impossible to move between machines.

In 1972, Ken Thompson and Dennis Ritchie revolutionized operating system design at Bell Labs by introducing standard streams in Unix: standard input (stdin), standard output (stdout), and standard error (stderr). Any program could read from a uniform stream of bytes, regardless of whether the source was a keyboard, an automated script, or a disk file.

In 1985, Bjarne Stroustrup adapted this stream philosophy for C++ by overloading the bitshift operators << and >>. The chevrons were chosen as intuitive flow arrows: << pushes data out to the display, while >> extracts data inward into program memory.

Source: Dennis Ritchie, 'The Evolution of the Unix Time-sharing System'; Bjarne Stroustrup, 'The Design and Evolution of C++' (Addison-Wesley, 1994).


##### [Go Deeper] How cin parses stream buffers under the hood
When you type in the terminal, characters accumulate in an operating system buffer until you press Enter. When your C++ program runs `cin >> value;`, the stream inspects the buffer character by character.

First, `cin` automatically skips any leading whitespace characters (spaces, tabs, and newlines). Next, it reads all consecutive characters that match the target variable's type. For an integer, it consumes digits until it encounters a non-digit character like a space or letter.

The unconsumed characters remain in the input buffer, waiting for the next input statement. This allows multiple variables to be extracted from a single input line smoothly.


---

#### Step: cin-stream-basics [THEORY]
*Eyebrow:* Console extraction
**Reading values with cin**

To read data from the operator, declare a variable in memory and extract the stream contents into it using `cin >>`.

syntax: cin >> {variable};
- cin: standard console input stream from `<iostream>`
- >>: extraction operator — directs stream data into variable
- variable: declared memory location where data is stored
- ;: statement terminator — mandatory in C++

> Rules for console input:
> 1. **Variable must be declared first.** You cannot read into a non-existent variable. Always declare its type beforehand: `int speed; cin >> speed;`.
> 2. **Chevron direction points inward.** `cout <<` pushes data OUT to the terminal screen. `cin >>` pulls data IN to your program variables.
> 3. **Multiple extractions in one line.** You can chain extractions: `cin >> distance >> speed;`. The stream automatically uses spaces or enters to separate values.

!> **Python habit to unlearn.** In Python, input always arrives as a string: `speed = int(input())`. In C++, you never convert input manually! The type of your variable dictates how `cin` interprets the incoming characters.

> *Image Alt:* Diagram comparing stream directions: cout << pushing outward to screen vs cin >> pulling inward to variable in memory.

**Code Comparison:**
```cpp
int speed;
cin >> speed;
// valid: extraction operator >> pulls input into variable
```
[CORRECT] Valid extraction operator >> pulls data into variable

```cpp
int speed;
cin << speed;
// syntax error: invalid operands to binary expression ('istream' and 'int')
```
[INCORRECT / TRAP] Syntax error: insertion operator << cannot read into variable


---

#### Step: predict-cin-math [PREDICT]
**Predict stream calculation**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a * b + 2 << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `14`
**Explanation:** The extraction `cin >> a >> b` assigns `a = 3` and `b = 4`. The arithmetic expression `3 * 4 + 2` evaluates `3 * 4 = 12` first, then `12 + 2 = 14`.


---

#### Step: read-flight-params [EDITOR]
**Read mission flight parameters**

**Task:**
Configure Sigma's dispatch computer:
1. Read `distance` and `speed` from `cin`.
2. Calculate flight duration: `int hours = distance / speed;`.
3. Output `DURATION: ` followed by `hours` and ` H` on a new line.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance;
    int speed;

    // 1. Read distance and speed from cin
    // 2. Calculate flight duration: int hours = distance / speed;
    // 3. Print DURATION: <hours> H

    return 0;
}
```

**Expected Output:**
```
DURATION: 3 H
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance;
    int speed;

    cin >> distance >> speed;
    int hours = distance / speed;

    cout << "DURATION: " << hours << " H" << endl;
    return 0;
}
```

*Requires tokens:* `cin >>, distance / speed`
*Hint:* Use `cin >> distance >> speed;`, then print `"DURATION: " << hours << " H" << endl;`.
*Solution Note:* With input 120 and 40, 120 / 40 yields 3 hours.

---

#### Step: cin-strings-and-whitespace [THEORY]
*Eyebrow:* String extraction
**How cin handles whitespace and words**

You can read textual identifiers directly into a `std::string` variable using `cin >>`.

> Whitespace delimiter rule:
> When reading text with `cin >> text;`, the stream stops reading at the very first whitespace character (space, tab, or newline). Any subsequent words remain in the input buffer!

If an operator enters `MAWRTH VALLIS`, the statement `cin >> sector;` reads only `MAWRTH`. To capture the second word into another variable, you chain extractions: `cin >> word1 >> word2;`.

**Code Comparison:**
```cpp
string sector;
cin >> sector;
// input: "MAWRTH VALLIS"
// sector becomes "MAWRTH" (stops at first space)
```
[CORRECT] Single string variable reads only first word before space

```cpp
string word1, word2;
cin >> word1 >> word2;
// input: "MAWRTH VALLIS"
// word1 = "MAWRTH", word2 = "VALLIS"
```
[CORRECT] Chained extractions read two words separated by space into distinct variables


---

#### Step: reading-full-lines-getline [THEORY]
*Eyebrow:* Full-line input
**Reading lines with spaces using getline**

Mission logs, target designations, and telemetry descriptions often contain spaces. To read an entire line of text until the user presses Enter, C++ provides `getline()`.

syntax: getline(cin, {target});
- getline: standard library function that reads a full line
- cin: input stream to read from
- target: `std::string` variable that receives the full line
- ;: statement terminator — mandatory in C++

> When to use which input tool:
> 1. **Numbers (int, double).** Use `cin >> num;` — it automatically ignores leading whitespace and parses numerical digits.
> 2. **Single words or command tags.** Use `cin >> word;` — ideal for single-token codes like `SIGMA` or `RUNWAY-1`.
> 3. **Full names or sentences with spaces.** Use `getline(cin, text);` — reads all characters including spaces until the Enter key.

**Code Comparison:**
```cpp
string mission_name;
getline(cin, mission_name);
// input: "Mawrth Vallis Recon"
// mission_name = "Mawrth Vallis Recon" (reads full line)
```
[CORRECT] getline reads the complete line including spaces

```cpp
string mission_name;
cin >> mission_name;
// input: "Mawrth Vallis Recon"
// mission_name = "Mawrth" (cuts off at space)
```
[INCORRECT / TRAP] cin >> cuts off at the first space character


---

#### Step: find-chevron-bug [CLICKLINE]
**Find the input direction bug**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance;
    int speed;
    cout << "Enter parameters:" << endl;
    cin << distance;
    cin >> speed;
    cout << "MISSION: " << distance << " KM" << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 8
**Explanation:** Line 8 uses `cin << distance;`. The chevrons `<<` are for output with `cout`. Reading input requires the extraction operator `cin >> distance;`.


---

#### Step: fill-cin-sequence [BLANKS]
**Complete the console conversation**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude;
    cout << "ALTITUDE:" << endl;
    cin [[1]] altitude;
    int target = altitude + 100;
    cout [[2]] "TARGET: " << target << endl;
    return 0;
}
```

**Task:** Fill in the blanks in the code.
**Blanks solutions:**
- [[1]]: `>>`
- [[2]]: `<<`

**Explanation:** `cin >> altitude;` pulls input from the console into the variable, and `cout << ...` pushes text to the display.


---

#### Step: drone-dispatch-console [EDITOR]
**Drone dispatch console**

**Task:**
Write the launch dispatch program for Scout drone Sigma:
1. Read the target sector name on the first line using `getline(cin, target);`.
2. Read distance and speed from the second line using `cin >> distance >> speed;`.
3. Compute flight duration: `int time = distance / speed;`.
4. Output `TARGET: ` followed by `target`.
5. Output `TIME: ` followed by `time` and ` H`.

**Starter Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string target;
    int distance;
    int speed;

    // 1. Read the target sector line using getline(cin, target)
    // 2. Read distance and speed using cin
    // 3. Calculate int time = distance / speed;
    // 4. Print TARGET: <target> and TIME: <time> H

    return 0;
}
```

**Expected Output:**
```
TARGET: Mawrth Vallis
TIME: 3 H
```

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string target;
    int distance;
    int speed;

    getline(cin, target);
    cin >> distance >> speed;

    int time = distance / speed;

    cout << "TARGET: " << target << endl;
    cout << "TIME: " << time << " H" << endl;
    return 0;
}
```

*Requires tokens:* `getline(cin, distance / speed`
*Hint:* Call `getline(cin, target);`, then `cin >> distance >> speed;`, calculate `time = distance / speed;`, and print both lines with `endl`.
*Solution Note:* With sector 'Mawrth Vallis' and flight metrics 180 km at 60 km/h, the program outputs 3 hours.

---

#### Step: recap [SUMMARY]
**Mission 8 recap: Interactive console unlocked**

Base IRIS has verified the dispatch console. Scout drone Sigma is now ready to receive operational coordinates and parameters interactively from mission control.

| Input Method | Syntax | Whitespace Behavior | Typical Space Role |
| :--- | :--- | :--- | :--- |
| `cin >> int/double` | `cin >> val;` | Skips leading whitespace, parses digits | Flight altitude, speed, coordinates |
| `cin >> string` | `cin >> word;` | Stops at first space / newline | Call signs, status codes, protocol tags |
| `getline()` | `getline(cin, str);` | Reads entire line including spaces | Target sectors, mission logs, names |

Congratulations on completing Block 1: Awakening (Pamodināšana)! You have mastered C++ program structure, primitive types, memory size, arithmetic operators, and console input/output. Next in Block 2 (Decisions / Lēmumi), we will unlock autonomous branching with `if` and `else` so drones can navigate unpredictable Martian terrain independently.


---
