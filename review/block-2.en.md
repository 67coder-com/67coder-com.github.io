# Course: C++ Programming — Mission IRIS (67coder)
## Block 2: Block 2 · Decisions (EN)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 9 to 16.*

---


# Lesson 9 · Conditions: if / else
**Slug:** `if-else` | **Module:** Block 2 · Decisions

#### Step: why-autonomy [THEORY]
*Eyebrow:* Signal latency and autonomy
**Why the drone must decide on its own**

Scout drone Sigma lifts off from base IRIS and sets course for the distant Mawrth Vallis plateau. As the vehicle disappears behind a jagged mountain ridge, the radio signal latency between the craft and base dispatch begins to mount rapidly.

Across the vast distance between Earth and Mars, radio signals traveling at the speed of light take anywhere from 3 to 22 minutes each way. Even on a local orbital link, the latency makes manual joystick piloting physically impossible: if a rocky spire suddenly looms in Sigma's path and an operator had to react by hand, the drone would strike the obstacle long before the warning signal reached the habitat.

To operate safely in the unforgiving Martian environment, the flight computer must make autonomous choices on the fly using real-time sensor telemetry. Until now, all of our C++ programs executed strictly in a straight line — from the first statement to the last. With conditionals, we give code the ability to branch: selecting different execution paths depending on circumstances.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Inside the forward avionics observation bay of Mars base IRIS at dusk. Through a reinforced panoramic observation viewport, Scout drone Sigma with dark carbon-slate faceted hull and warm amber thruster vents glides autonomously over a rugged canyon on Mars. Standing at an illuminated tactical navigation console, monitoring telemetry and radio delay counters, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Distant Martian hills and canyons rendered in desaturated warm greys, strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the telemetry display and drone sensor beam.


##### [Archive Record] Why Mars exploration vehicles make autonomous decisions
Light and radio waves travel through vacuum at a fundamental cosmic speed limit — roughly 299,792 kilometers per second. Because Earth and Mars follow independent elliptical orbits around the Sun, the distance between the two worlds constantly shifts from 56 million kilometers at closest approach to 401 million kilometers when separated by the Sun.

This geographic reality means one-way radio latency ranges between 3.1 and 22.3 minutes. A complete round trip — dispatching a command from mission control, waiting for execution, and receiving downlink confirmation — takes anywhere from 6 to 44 minutes. Under these physical constraints, real-time remote driving is an impossibility.

In 1997, NASA's pioneering Sojourner microrover projected five laser stripes onto the terrain to measure surface contours, stopping automatically whenever an obstacle exceeded safety limits. Modern explorers, including Curiosity and Perseverance, rely on autonomous navigation (AutoNav): onboard stereo cameras capture terrain pairs, the flight computer detects hazards, and software calculates safe drive trajectories without waiting for human intervention on Earth.

Sources: NASA JPL Mars Exploration Rover Mission: Autonomous Navigation (AutoNav); NASA Mars Fact Sheet (Radio Travel Time).


---

#### Step: comparison-operators [THEORY]
*Eyebrow:* Relational logic
**Comparison operators**

Before making a decision, code must compare values: checking whether current altitude sits below a safety floor, whether battery charge remains adequate, or whether a sensor code matches operational norms.

In C++, comparisons rely on six relational operators. Every comparison expression evaluates to a boolean value `bool`: either true (`true`, printed to the terminal as 1) or false (`false`, printed as 0):

| Operator | Meaning | Code example | Evaluation |
| :--- | :--- | :--- | :--- |
| `==` | Equal to | `speed == 60` | `true` (1) if speed is exactly 60 |
| `!=` | Not equal to | `status != 0` | `true` (1) if status is not 0 |
| `<` | Less than | `altitude < 20` | `true` (1) if altitude is under 20 |
| `>` | Greater than | `battery > 90` | `true` (1) if battery exceeds 90 |
| `<=` | Less than or equal | `dist <= 10` | `true` (1) if distance is 10 or below |
| `>=` | Greater than or equal | `charge >= 25` | `true` (1) if charge is 25 or above |

!> **The most dangerous beginner trap: equality `==` versus assignment `=`.** A single equals sign `=` assigns a new value to a variable. A double equals sign `==` compares two values without modifying anything. If you accidentally write `speed = 60` inside a condition, C++ assigns 60 to the variable, and the condition evaluates as unconditionally true!

**Code Comparison:**
```cpp
int speed = 60;
if (speed == 60) {
    // valid equality comparison
}
```
[CORRECT] Valid comparison: the == operator checks equality without altering the variable

```cpp
int speed = 60;
if (speed = 60) {
    // bug: assigns 60, condition is always true
}
```
[INCORRECT / TRAP] Critical bug: the = operator reassigns the variable and corrupts the condition


---

#### Step: predict-comparison [PREDICT]
**Predict the comparison outcome**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude = 15;
    int ground_target = 15;
    cout << (altitude < 20) << endl;
    cout << (altitude != ground_target) << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `1
0`
**Explanation:** The first comparison `15 < 20` evaluates to true, so `cout` prints `1`. The second comparison `15 != 15` is false (15 is equal to 15), so `cout` prints `0` on a newline.


---

#### Step: if-syntax [EXPLAIN]
*Eyebrow:* Single-branch decisions
**The if statement**

The `if` statement executes a block of code if and only if a given condition evaluates to true.

syntax: if ({condition}) {
    {action}
}
- if: the C++ keyword initiating a conditional branch
- condition: an expression in parentheses evaluating to true or false
- action: statements inside curly braces executed only when the condition is true
- { }: curly braces enclosing statements into a scoped block

> Three rules of condition execution:
> 1. The computer evaluates the condition expression enclosed in parentheses `(condition)`.
> 2. If the expression evaluates to `true`, the program enters the brace block `{ action }` and executes every statement inside.
> 3. If the expression evaluates to `false`, the program bypasses the entire brace block and resumes execution immediately after the closing brace `}`.

!> **The stray semicolon trap.** Never place a semicolon immediately after the condition parentheses: `if (altitude < 20);`. A semicolon there creates an empty statement, causing the subsequent brace block to execute unconditionally every single time, regardless of the altitude!

> *Image Alt:* Diagram illustrating the single if branch execution flow: a true condition routes execution through the warning block, whereas a false condition bypasses it entirely.


---

#### Step: altitude-alert [EDITOR]
**Flight altitude safety check**

**Task:**
Write Sigma's first autonomous safety monitor:
1. Check whether variable `altitude` is strictly less than 20.
2. If true, print the warning message in the format shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude = 14;

    // 1. Check if altitude is less than 20
    // 2. If true, print WARNING: LOW ALTITUDE

    return 0;
}
```

**Expected Output:**
```
WARNING: LOW ALTITUDE
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude = 14;

    if (altitude < 20) {
        cout << "WARNING: LOW ALTITUDE" << endl;
    }

    return 0;
}
```

*Requires tokens:* `if, altitude < 20, WARNING: LOW ALTITUDE`
*Hint:* Use `if (altitude < 20) { cout << "WARNING: LOW ALTITUDE" << endl; }`.
*Solution Note:* Because altitude is 14 meters, the condition 14 < 20 evaluates to true and triggers the warning output.

---

#### Step: find-equality-bug [CLICKLINE]
**Locate the comparison bug**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int status_code = 0;
    cout << "CHECKING SENSOR..." << endl;
    if (status_code = 1) {
        cout << "SENSOR ERROR DETECTED" << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 reads `if (status_code = 1)`. A single equals sign `=` assigns the value 1 to the variable rather than comparing it. A relational equality test requires double equals signs: `if (status_code == 1)`.


---

#### Step: if-else-branches [THEORY]
*Eyebrow:* Two-way branching
**Branching with if ... else**

In flight operations, a vehicle frequently needs to choose between two mutually exclusive actions rather than merely raising an alert. If conditions are met, proceed with plan A; otherwise, execute plan B.

C++ provides the `if ... else` construct for this two-way choice. The keyword `else` (otherwise) defines the alternative branch and carries no condition parentheses of its own:

syntax: if ({condition}) {
    {action_true}
} else {
    {action_false}
}
- if: the primary conditional test
- condition: the boolean expression tested in parentheses
- action_true: statements executed when the condition evaluates to true
- else: the keyword defining the alternative branch — no condition attached
- action_false: statements executed when the condition evaluates to false

+ **The if branch.** Executes if and only if the condition evaluates to `true`. When it does, the `else` block is completely ignored.
+ **The else branch.** Executes if and only if the condition evaluates to `false`. Exactly one of the two blocks is guaranteed to execute.

**Code Comparison:**
```cpp
if (battery >= 20) {
    cout << "GO";
} else {
    cout << "STOP";
}
```
[CORRECT] Unified if / else: guarantees that exactly one branch executes with no redundant tests

```cpp
if (battery >= 20) {
    cout << "GO";
}
if (battery < 20) {
    cout << "STOP";
}
```
[INCORRECT / TRAP] Two independent ifs: redundant checks that run the risk of inverted condition errors


---

#### Step: battery-decision [EDITOR]
**Autonomous battery routing**

**Task:**
Program Sigma's power management controller:
1. Read the battery charge percentage from console `cin` into variable `battery`.
2. If `battery >= 25`, print permission to advance.
3. Otherwise (`else`), print the recharge directive as shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery;

    // 1. Read battery percentage from cin
    // 2. If battery >= 25, print SIGMA: ADVANCE
    // 3. Otherwise (else), print SIGMA: RECHARGE

    return 0;
}
```

**Expected Output:**
```
SIGMA: RECHARGE
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery;
    cin >> battery;

    if (battery >= 25) {
        cout << "SIGMA: ADVANCE" << endl;
    } else {
        cout << "SIGMA: RECHARGE" << endl;
    }

    return 0;
}
```

*Requires tokens:* `cin >>, if, else`
*Hint:* Read the value with `cin >> battery;`, then write `if (battery >= 25) { ... } else { ... }`.
*Solution Note:* Given input 18, the condition 18 >= 25 is false, so the else branch executes with the recharge message.

---

#### Step: multi-branch-else-if [THEORY]
*Eyebrow:* Multi-tier decisions
**Cascading with if ... else if ... else**

In real planetary flight, telemetry rarely falls into two neat categories. For example, obstacle distance can be critical, moderate, or completely clear. To test multiple conditions sequentially, C++ provides `else if`.

syntax: if ({cond1}) {
    {action1}
} else if ({cond2}) {
    {action2}
} else {
    {fallback}
}
- if: the first condition evaluated in the cascade
- cond1: primary boolean expression
- else if: additional test evaluated only if the preceding test was false
- cond2: secondary boolean expression
- else: ultimate safety branch if no preceding conditions matched
- fallback: default action handling all remaining outcomes

> Three golden rules of cascading execution:
> 1. **Sequential top-to-bottom testing.** The CPU starts at the initial `if` and descends to an `else if` only when the preceding check evaluates to `false`.
> 2. **First match wins.** The moment any condition evaluates to `true`, its associated block executes, and ALL remaining branches in the cascade are immediately skipped!
> 3. **The final else provides a safety net.** While optional, a concluding `else` ensures your software always takes a predictable, defined action if edge cases occur.


##### [Go Deeper] How CPUs predict branches under the hood
Modern microprocessors process instructions through deep pipelines. Rather than stalling execution while a comparison checks data in slow memory, an onboard hardware unit known as the Branch Predictor guesses which branch will execute before the condition finishes evaluating.

The processor speculatively begins executing instructions along the predicted path. If the prediction is accurate, the CPU loses zero cycles, and avionics control loops execute at maximum throughput.

If the guess was wrong (a branch misprediction), the processor must discard the speculative work, flush its entire pipeline, and restart down the correct branch. A misprediction costs roughly 10 to 20 clock cycles. For this reason, systems programmers place the most statistically common conditions at the very top of a cascade.


---

#### Step: assemble-terrain-check [PARSONS]
**Assemble the terrain safety cascade**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `if (dist <= 10) {`
2. `    cout << "HALT" << endl;`
3. `} else if (dist <= 50) {`
4. `    cout << "SLOW" << endl;`
5. `} else {`
6. `    cout << "CRUISE" << endl;`
7. `}`

**Explanation:** A valid cascade begins with `if (dist <= 10)`, continues with an action and closing brace leading into `} else if (dist <= 50)`, and finishes with the catch-all `} else {` branch.


---

#### Step: drone-obstacle-avoidance [EDITOR] (Optional)
**Bonus challenge: Autonomous obstacle evasion**

**Task:**
Program Scout drone Sigma's forward proximity resolver:
1. Read obstacle distance in meters from `cin` into variable `distance`.
2. If `distance <= 10`, issue an emergency stop command.
3. Else if `distance <= 50`, issue an obstacle evasion command.
4. In all other cases, report a clear flight corridor.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance;

    // 1. Read distance from cin
    // 2. If distance <= 10: ACTION: EMERGENCY STOP
    // 3. Else if distance <= 50: ACTION: EVADE OBSTACLE
    // 4. Else: ACTION: CLEAR PATH

    return 0;
}
```

**Expected Output:**
```
ACTION: EVADE OBSTACLE
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int distance;
    cin >> distance;

    if (distance <= 10) {
        cout << "ACTION: EMERGENCY STOP" << endl;
    } else if (distance <= 50) {
        cout << "ACTION: EVADE OBSTACLE" << endl;
    } else {
        cout << "ACTION: CLEAR PATH" << endl;
    }

    return 0;
}
```

*Requires tokens:* `cin >>, if, else if, else`
*Hint:* Use a cascade: `if (distance <= 10) { ... } else if (distance <= 50) { ... } else { ... }`.
*Solution Note:* With input 35 meters, 35 <= 10 is false, but 35 <= 50 is true, so ACTION: EVADE OBSTACLE is output.

---

#### Step: recap [SUMMARY]
**Mission 9 summary: Autonomous decisions unlocked**

Base IRIS confirms telemetry: Scout drone Sigma has successfully integrated sensor evaluations and can now navigate hazardous terrain without waiting for dispatch commands.

| Construct | Syntax pattern | Branch count | Mission application |
| :--- | :--- | :--- | :--- |
| Relational operators | `==`, `!=`, `<`, `>`, `<=`, `>=` | — | Checking sensor telemetry against safety thresholds |
| Single `if` | `if (cond) { ... }` | 1 | Raising immediate alarms or warnings |
| Branching `if/else` | `if (cond) { ... } else { ... }` | 2 | Choosing between two distinct maneuvers (advance vs recharge) |
| Cascading `else if` | `if ... else if ... else` | 3+ | Multi-tier navigation responses (halt, evade, cruise) |

In Chapter 10, «Logical operators», we will master `&&` (AND), `||` (OR), and `!` (NOT), allowing Sigma to combine multiple sensor readings into unified multi-criteria flight conditions.


---


# Lesson 10 · Logical operators
**Slug:** `logic` | **Module:** Block 2 · Decisions

#### Step: multi-sensor-flight [THEORY]
*Eyebrow:* Multi-criteria evaluation
**Why a single sensor is not enough**

Scout drone Sigma hovers over a rocky observation terrace overlooking the great Mawrth Vallis rift. Ahead lies a treacherous canyon transit where sudden gusts of thin Martian wind and localized dust turbulence threaten vehicle stability.

In the previous chapter, we made decisions using isolated checks: if altitude was low, we raised an alarm. But in real space missions, no single sensor tells the full story: liftoff must never occur merely because the battery is fully charged if a dust storm is simultaneously raging or the guidance computer reports a calibration fault.

To execute safe maneuvers, the flight computer must evaluate multiple sensor readings simultaneously inside a unified logical expression. In C++, three fundamental logical operators make this possible: `&&` (AND), `||` (OR), and `!` (NOT).

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On an elevated rocky observation ridge overlooking a massive Martian rift canyon at twilight. Scout drone Sigma with dark carbon-slate faceted hull rests ready on the launch pad, its engine nozzles glowing in warm amber. Projected in front of the drone is an illuminated holographic pre-flight checklist with green and amber status indicators. Standing nearby at a tactical telemetry terminal is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Distant Martian canyon walls in desaturated warm greys, strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the holographic display glow.


##### [Archive Record] George Boole, Claude Shannon, and binary logic
In 1854, English mathematician George Boole published 'An Investigation of the Laws of Thought', introducing a formal algebra to represent human logic using mathematical symbols. His system recognized only two states — true (1) and false (0) — governed by three core operations: AND, OR, and NOT.

For nearly a century, Boolean algebra remained an abstract branch of pure mathematics. That changed in 1937 when 21-year-old MIT graduate student Claude Shannon demonstrated in his master's thesis that electrical switches and relays could directly compute Boolean functions. Wiring two switches in series meant current flowed only when switch A AND switch B closed; wiring them in parallel meant current flowed if switch A OR switch B closed.

Shannon's insight established the foundation for all modern digital computing. From modest microcontrollers to interplanetary probe avionics, every processor consists of millions of microscopic logic gates that physically execute George Boole's algebra.

Sources: Claude Shannon, 'A Symbolic Analysis of Relay and Switching Circuits' (Transactions of the AIEE, 1938); George Boole, 'An Investigation of the Laws of Thought' (1854).


---

#### Step: logical-and [THEORY]
*Eyebrow:* Joint truth evaluation
**Logical AND (&&)**

The `&&` operator (double ampersand) combines two conditional expressions. The overall expression evaluates to true (`true`) if and only if **both** conditions evaluate to true simultaneously.

syntax: ({cond1}) && ({cond2})
- cond1: first condition enclosed in parentheses
- &&: logical AND operator — requires both sides to be true
- cond2: second condition enclosed in parentheses

| cond1 | cond2 | `cond1 && cond2` | Mission meaning |
| :--- | :--- | :--- | :--- |
| `true` (1) | `true` (1) | **`true` (1)** | Battery ready AND wind calm → LIFTOFF APPROVED |
| `true` (1) | `false` (0) | **`false` (0)** | Battery ready, but wind too high → HOLD |
| `false` (0) | `true` (1) | **`false` (0)** | Wind calm, but battery depleted → HOLD |
| `false` (0) | `false` (0) | **`false` (0)** | Both telemetry values out of bounds → HOLD |

> Parentheses for clarity:
> Although relational operators (`<`, `>=`, `==`) hold higher precedence than `&&`, always enclose each individual comparison in parentheses: `(battery >= 50) && (wind <= 15)`. This eliminates subtle precedence errors and makes flight software instantly readable to peer reviewers.

**Code Comparison:**
```cpp
if (battery >= 50 && wind <= 15) {
    cout << "LIFTOFF";
}
```
[CORRECT] Clean compound condition with &&: single expressive statement without nested bloat

```cpp
if (battery >= 50) {
    if (wind <= 15) {
        cout << "LIFTOFF";
    }
}
```
[INCORRECT / TRAP] Clumsy nested if: double curly braces and needless structural complexity


---

#### Step: predict-and [PREDICT]
**Predict liftoff clearance logic**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery = 70;
    int wind = 20;
    cout << (battery >= 50 && wind <= 15) << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `0`
**Explanation:** The first condition `70 >= 50` is true (1), but the second condition `20 <= 15` is false (0) because wind speed exceeds safety limits. Because the `&&` operator requires both operands to be true, the composite result is false, and `cout` prints `0`.


---

#### Step: liftoff-clearance [EDITOR]
**Sigma liftoff clearance module**

**Task:**
Program the flight dispatch safety check:
1. Check whether battery charge `battery >= 50` AND wind speed `wind <= 15`.
2. If both conditions evaluate to true, print the approval message in the format shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery = 85;
    int wind = 12;

    // 1. Check if battery is >= 50 AND wind is <= 15
    // 2. If true, print LIFTOFF: APPROVED

    return 0;
}
```

**Expected Output:**
```
LIFTOFF: APPROVED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery = 85;
    int wind = 12;

    if (battery >= 50 && wind <= 15) {
        cout << "LIFTOFF: APPROVED" << endl;
    }

    return 0;
}
```

*Requires tokens:* `if, battery >= 50, &&, wind <= 15`
*Hint:* Use `if (battery >= 50 && wind <= 15) { cout << "LIFTOFF: APPROVED" << endl; }`.
*Solution Note:* With battery at 85% and wind at 12 m/s, both requirements evaluate to true and trigger clearance approval.

---

#### Step: logical-or [THEORY]
*Eyebrow:* Alternative hazard detection
**Logical OR (||)**

The `||` operator (double vertical bar or pipe) evaluates to `true` whenever **at least one** operand evaluates to true. If the first condition is true OR the second is true (or both), the composite expression is true.

syntax: ({cond1}) || ({cond2})
- cond1: primary condition
- ||: logical OR operator (typed with Shift + backslash on standard keyboards)
- cond2: alternative condition

| cond1 | cond2 | `cond1 \|\| cond2` | Safety system meaning |
| :--- | :--- | :--- | :--- |
| `true` (1) | `true` (1) | **`true` (1)** | Hull breach AND core overheat → EMERGENCY ABORT |
| `true` (1) | `false` (0) | **`true` (1)** | Hull breach, core normal → EMERGENCY ABORT |
| `false` (0) | `true` (1) | **`true` (1)** | Hull intact, core overheat → EMERGENCY ABORT |
| `false` (0) | `false` (0) | **`false` (0)** | All telemetry nominal → FLIGHT CONTINUES |

!> **The natural language trap: `x == 1 || 2`.** In everyday speech, people say: «if the code is 1 or 2». If you write `if (code == 1 || 2)` in C++, the compiler parses two separate expressions: `code == 1` and a standalone literal `2`. In C++, any non-zero integer is truthy, so this condition evaluates to true EVERY SINGLE TIME! You must explicitly repeat the comparison: `if (code == 1 || code == 2)`.

**Code Comparison:**
```cpp
if (status == 1 || status == 2) {
    cout << "WARNING";
}
```
[CORRECT] Valid syntax: variable is fully compared on both sides of the || operator

```cpp
if (status == 1 || 2) {
    // bug: 2 is non-zero (true), condition is always true!
    cout << "WARNING";
}
```
[INCORRECT / TRAP] Critical logic trap: standalone number 2 evaluates to true, making the condition permanently true


---

#### Step: find-or-syntax-bug [CLICKLINE]
**Locate the incomplete comparison bug**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int error_code = 0;
    cout << "CHECKING GYROSCOPE..." << endl;
    if (error_code == 10 || 20) {
        cout << "GYRO FAULT DETECTED" << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 reads `if (error_code == 10 || 20)`. The literal `20` evaluates to boolean true on its own, so the alarm triggers even when error_code is 0! The condition must be written as `if (error_code == 10 || error_code == 20)`.


---

#### Step: logical-not [EXPLAIN]
*Eyebrow:* Truth inversion
**Logical NOT (!) and signal gates**

The `!` operator (exclamation mark) performs logical negation: converting true to false and false to true.

syntax: !({condition})
- !: unary logical negation operator — inverts the following truth value
- condition: the boolean expression or variable being inverted

+ **True becomes false.** `!true` evaluates to `false` (0). For instance, if `has_error = true`, then `!has_error` evaluates to `false`.
+ **False becomes true.** `!false` evaluates to `true` (1). When no fault is present (`has_error = false`), the check `if (!has_error)` successfully passes.
+ **Parentheses matter with !.** The `!` operator carries very high precedence. To invert an entire comparison, enclose it in parentheses: `!(altitude < 20)` means «altitude is NOT less than 20».

> *Image Alt:* Diagram illustrating the three core digital logic operations: AND (&&), OR (||), and NOT (!) with their respective signal gate flows.


---

#### Step: short-circuit-evaluation [THEORY]
*Eyebrow:* Speed and safety
**Short-circuit evaluation**

C++ evaluates logical expressions strictly from left to right. However, the compiler incorporates an essential optimization: it halts evaluation the precise instant the final outcome is guaranteed.

+ **Short-circuit with &&.** If the left-hand condition evaluates to `false`, the entire expression is guaranteed to be `false` regardless of what follows. The right-hand side is NEVER evaluated!
+ **Short-circuit with ||.** If the left-hand condition evaluates to `true`, the entire expression is guaranteed to be `true`. The right-hand side is bypassed completely.

> Defensive programming technique:
> Flight software relies on short-circuit evaluation to prevent fatal system crashes. For example, `if (count != 0 && total / count > 10)` will NEVER trigger a divide-by-zero error! When `count == 0`, the first test is `false`, and the hazardous division on the right is never executed.

**Code Comparison:**
```cpp
if (count != 0 && total / count > 10) {
    // safe: if count is 0, division never executes!
}
```
[CORRECT] Defensive order: count != 0 on the left prevents fatal division by zero on the right

```cpp
if (total / count > 10 && count != 0) {
    // crash: divides by 0 before checking count!
}
```
[INCORRECT / TRAP] Hazardous order: division executes first, crashing the application before zero is checked


##### [Go Deeper] How CPUs execute short-circuit evaluation in machine code
At the assembly language level, C++ logical expressions with `&&` and `||` are not calculated with bitwise math. Instead, the compiler emits conditional branch instructions (such as `je` — jump if equal or `jne` — jump if not equal).

For `if (A && B)`, the CPU tests A first. If A is zero (false), the processor immediately jumps over the entire if body without ever fetching B from memory into hardware registers.

Consequently, systems engineers place lightweight or most frequently failing tests on the far left. This conserves clock cycles and keeps real-time flight loops running at maximum frequency.


---

#### Step: predict-short-circuit [PREDICT]
**Predict short-circuit behavior**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sensors = 0;
    if (sensors != 0 && 100 / sensors > 5) {
        cout << "TELEMETRY OK" << endl;
    } else {
        cout << "SAFE FALLBACK" << endl;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `SAFE FALLBACK`
**Explanation:** Because `sensors` is 0, the test `sensors != 0` evaluates to false. Under short-circuit evaluation, C++ immediately abandons the `&&` check and never executes the dangerous division `100 / sensors`. Execution safely diverts to the `else` branch, outputting `SAFE FALLBACK`.


---

#### Step: emergency-abort-system [EDITOR]
**Emergency abort controller**

**Task:**
Program Scout drone Sigma's hazard monitor using the `||` operator:
1. Read processor temperature `core_temp` and hull integrity `hull_integrity` from `cin`.
2. If `core_temp > 80` OR `hull_integrity < 50`, issue an abort directive.
3. Otherwise (`else`), grant permission to proceed as shown below.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int core_temp, hull_integrity;

    // 1. Read core_temp and hull_integrity from cin
    // 2. If core_temp > 80 OR hull_integrity < 50: MISSION: ABORT
    // 3. Otherwise (else): MISSION: PROCEED

    return 0;
}
```

**Expected Output:**
```
MISSION: ABORT
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int core_temp, hull_integrity;
    cin >> core_temp >> hull_integrity;

    if (core_temp > 80 || hull_integrity < 50) {
        cout << "MISSION: ABORT" << endl;
    } else {
        cout << "MISSION: PROCEED" << endl;
    }

    return 0;
}
```

*Requires tokens:* `cin >>, core_temp > 80, ||, hull_integrity < 50, else`
*Hint:* Write `if (core_temp > 80 || hull_integrity < 50) { ... } else { ... }`.
*Solution Note:* Given input 85 and 90, the temperature 85 > 80 evaluates to true, so the abort directive is output.

---

#### Step: drone-flight-corridor [EDITOR] (Optional)
**Bonus challenge: Canyon flight corridor navigator**

**Task:**
Construct a multi-parameter flight mode controller using `||` and `&&`:
1. Read `battery`, `wind`, and `has_fault` (0 or 1) from `cin`.
2. If a fault is present `has_fault == 1` OR battery `battery < 20`, command an emergency landing.
3. Else if battery `battery >= 50` AND wind `wind <= 15`, authorize high speed cruise.
4. In all other cases, enforce cautious flight mode.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery, wind, has_fault;

    // 1. Read battery, wind, and has_fault from cin
    // 2. If has_fault == 1 OR battery < 20: ACTION: EMERGENCY LANDING
    // 3. Else if battery >= 50 AND wind <= 15: ACTION: CRUISE SPEED
    // 4. Else: ACTION: CAUTIOUS FLIGHT

    return 0;
}
```

**Expected Output:**
```
ACTION: CRUISE SPEED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery, wind, has_fault;
    cin >> battery >> wind >> has_fault;

    if (has_fault == 1 || battery < 20) {
        cout << "ACTION: EMERGENCY LANDING" << endl;
    } else if (battery >= 50 && wind <= 15) {
        cout << "ACTION: CRUISE SPEED" << endl;
    } else {
        cout << "ACTION: CAUTIOUS FLIGHT" << endl;
    }

    return 0;
}
```

*Requires tokens:* `cin >>, ||, &&, else if, else`
*Hint:* Use a cascade: `if (has_fault == 1 || battery < 20) { ... } else if (battery >= 50 && wind <= 15) { ... } else { ... }`.
*Solution Note:* With input 65 12 0, no fault exists and battery exceeds 20; in the second test, 65 >= 50 and 12 <= 15 are both true, outputting ACTION: CRUISE SPEED.

---

#### Step: recap [SUMMARY]
**Mission 10 summary: Logical navigation unlocked**

Base IRIS confirms telemetry: Scout drone Sigma has safely navigated the Mawrth Vallis canyon corridor by evaluating real-time multi-sensor criteria with boolean logic.

| Operator | Operation | Evaluates to true | Typical avionics application |
| :--- | :--- | :--- | :--- |
| `&&` | Logical AND | If and only if **both** conditions are true | Multi-criteria pre-flight safety checklists |
| `\|\|` | Logical OR | If **at least one** condition is true | Emergency abort alarms and threshold warnings |
| `!` | Logical NOT | If condition is **false** (inverts value) | Testing ready flags and verifying zero error codes |

In Chapter 11, «switch and the ternary operator», we will explore how to streamline multi-branch decision trees into compact command dispatchers and write concise inline condition expressions.


---


# Lesson 11 · switch and the ternary operator
**Slug:** `switch-ternary` | **Module:** Block 2 · Decisions

#### Step: command-dispatcher-prep [THEORY]
*Eyebrow:* Fleet expansion
**Meet Surveyor Delta**

Mission IRIS above the Mawrth Vallis plateau enters a major new phase. Joining light scout drone Sigma is the fleet's second specialized vehicle — heavy survey drone KARTOGRĀFS 'Delta'.

Delta is equipped with reinforced carbon armor, high-torque dual-rotor lifting shrouds, and a full suite of precision exploration hardware: a topography LiDAR scanner, multispectral cameras, and mineral spectrometers. To direct these scientific instruments, base IRIS transmits discrete single-character dispatch codes (`'S'`, `'L'`, `'C'`, `'H'`).

Evaluating such commands with a lengthy `if / else if` cascade quickly becomes cluttered: the expression `cmd ==` must be repeated on every single branch. C++ provides a specialized construct named `switch` — a fast and elegant command dispatcher designed to route execution based on discrete integer or character codes.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On an elevated industrial survey launch pad overlooking the Martian plateau Mawrth Vallis at sunrise. In the foreground, the heavy surveyor drone KARTOGRĀFS 'Delta' with dark carbon-slate armor, twin heavy-lift rotor shrouds, and an amber illuminated LiDAR aperture sits calibrated next to agile Scout drone Sigma. In the background, geometric modular structures of Mars base IRIS against a warm desaturated grey Martian horizon. Standing at an auxiliary tactical dispatch terminal, inputting telemetry mode codes, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the LiDAR aperture glow and terminal screen.


##### [Archive Record] Why switch compiles to jump tables in machine code
In an `if / else if` chain, the CPU must evaluate each condition sequentially. If a cascade contains 10 branches, reaching the final branch requires 10 distinct comparison operations — linear time complexity O(N).

In contrast, for a dense `switch` statement, modern C++ compilers frequently synthesize a jump table. This is an array-like table of machine code addresses stored directly in memory: the numeric value of the selector character or integer acts as an immediate index offset, allowing the CPU to execute a single branch instruction straight to the matching target.

Jump tables provide constant execution time O(1) regardless of branch count. In mission-critical avionics firmware where control loops operate at strict millisecond deadlines, `switch` delivers deterministic, low-latency command routing.

Sources: Bjarne Stroustrup, 'The C++ Programming Language' (4th Edition, Addison-Wesley); Agner Fog, 'Optimizing subroutines in assembly language'.


---

#### Step: switch-syntax-and-case [THEORY]
*Eyebrow:* Discrete selection
**The switch statement and case labels**

The `switch` statement evaluates a single selector variable and branches directly to the matching `case` label.

syntax: switch ({expr}) {
    case {val1}:
        {action1};
        break;
    default:
        {fallback};
        break;
}
- expr: an integer or character (char) being tested
- case: keyword marking an exact target value with a trailing colon
- val1: compile-time constant literal (such as 1 or 'S')
- break: statement terminating execution and exiting the switch block
- default: fallback branch executed if no case values matched

> Strict type constraint rule:
> The `switch` statement accepts ONLY integral types (`int`, `short`) and characters (`char`). In C++, it is strictly forbidden to use `switch` with floating-point numbers (`double`) or strings (`string`)!

Every `case` branch typically concludes with a `break;` statement. This signals to the compiler that the required actions are complete and execution should jump out of the `switch` block.

**Code Comparison:**
```cpp
switch (cmd) {
    case 'S': cout << "SURVEY"; break;
    case 'L': cout << "LIDAR"; break;
    default: cout << "UNKNOWN";
}
```
[CORRECT] Clean switch dispatcher: variable named once, discrete targets organized in a tidy column

```cpp
if (cmd == 'S') {
    cout << "SURVEY";
} else if (cmd == 'L') {
    cout << "LIDAR";
} else {
    cout << "UNKNOWN";
}
```
[INCORRECT / TRAP] Cluttered if/else cascade: repetitive syntax and redundant typing of variable cmd at every step


---

#### Step: fallthrough-and-break [EXPLAIN]
*Eyebrow:* Control flow
**The break statement and fall-through**

Unlike many other programming languages, C++ case labels do not implicitly terminate execution.

If you omit the `break;` statement at the conclusion of a case, execution does not halt: it simply 'falls through' into the subsequent `case` and executes its instructions as well! This behavior is known as fall-through.

!> **The missing break trap.** If you forget `break;`, the drone will execute the requested directive and continue cascading straight through all following cases until it hits a break or reaches the closing brace. In flight operations, this can accidentally trigger emergency subroutines!

> *Image Alt:* Diagram illustrating switch control flow: direct jump to matching case, execution, clean exit via break, and unintended fall-through when break is missing.


---

#### Step: predict-switch-fallthrough [PREDICT]
**Predict fall-through behavior**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char mode = 'B';
    switch (mode) {
        case 'A': cout << 1; break;
        case 'B': cout << 2;
        case 'C': cout << 3; break;
        default: cout << 4;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `23`
**Explanation:** Because `mode` equals `'B'`, execution jumps directly to `case 'B':` and prints `2`. Since no `break;` terminates this case, execution falls through into `case 'C':`, prints `3`, and only then encounters `break;`. The combined output is `23`.


---

#### Step: surveyor-command-dispatcher [EDITOR]
**Surveyor Delta command dispatcher**

**Task:**
Program drone Delta's instrument activator with `switch (command)`:
1. If `command == 'S'`, print `SURVEY: ACTIVE` and exit with `break;`.
2. If `command == 'L'`, print `LIDAR: ACTIVE` and exit with `break;`.
3. In all other cases (`default:`), print `COMMAND: UNKNOWN` and `break;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char command = 'S';

    // 1. Write switch (command)
    // 2. Handle 'S' -> SURVEY: ACTIVE
    // 3. Handle 'L' -> LIDAR: ACTIVE
    // 4. Handle default -> COMMAND: UNKNOWN

    return 0;
}
```

**Expected Output:**
```
SURVEY: ACTIVE
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char command = 'S';

    switch (command) {
        case 'S':
            cout << "SURVEY: ACTIVE" << endl;
            break;
        case 'L':
            cout << "LIDAR: ACTIVE" << endl;
            break;
        default:
            cout << "COMMAND: UNKNOWN" << endl;
            break;
    }

    return 0;
}
```

*Requires tokens:* `switch, case 'S':, case 'L':, break, default:`
*Hint:* Use `switch (command) { case 'S': cout << "SURVEY: ACTIVE" << endl; break; ... }`.
*Solution Note:* Because command holds 'S', the first case matches and prints SURVEY: ACTIVE.

---

#### Step: find-switch-bug [CLICKLINE]
**Locate the missing break bug**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int code = 1;
    cout << "DISPATCHING..." << endl;
    switch (code) {
        case 1:
            cout << "MODE: NORMAL" << endl;
        case 2:
            cout << "MODE: EMERGENCY" << endl;
            break;
        default:
            cout << "MODE: UNKNOWN" << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 8
**Explanation:** Line 8 is missing a `break;` after `cout << "MODE: NORMAL" << endl;`. Due to this omission, selecting mode 1 causes the program to print the normal message and immediately bleed into emergency mode!


---

#### Step: grouping-switch-cases [THEORY]
*Eyebrow:* Intentional fall-through
**Stacking multiple case labels**

Fall-through is not always a mistake. In fact, it provides a clean, idiomatic technique for binding multiple inputs to the exact same routine.

A classic aerospace telemetry example involves handling both uppercase and lowercase command characters. If an operator enters either `'M'` or `'m'`, both should initiate mapping mode:

+ **Label stacking.** Place `case 'M':` directly above `case 'm':` with no intervening statements and no `break`. If the first matches, execution falls directly into the shared body.
+ **Eliminating duplication.** This eliminates the need to copy-paste identical function calls and keeps the codebase concise and maintainable.

**Code Comparison:**
```cpp
switch (cmd) {
    case 'M':
    case 'm':
        cout << "MAPPING";
        break;
}
```
[CORRECT] Clean stacking: both case labels share a single implementation body and one break

```cpp
switch (cmd) {
    case 'M':
        cout << "MAPPING";
        break;
    case 'm':
        cout << "MAPPING";
        break;
}
```
[INCORRECT / TRAP] Redundant duplication: copy-pasting the same instructions and break across multiple cases


---

#### Step: dispatch-telemetry-mode [EDITOR]
**Interactive flight mode dispatcher**

**Task:**
Program Surveyor Delta's mission mode selector using console `cin`:
1. Read character `cmd` from `cin`.
2. Using `switch (cmd)` route execution:
   - `'R'`: print `MODE: RECON`
   - `'M'`: print `MODE: MAPPING`
   - `'H'`: print `MODE: RETURN HOME`
   - `default:`: print `MODE: INVALID`
3. Ensure every branch ends with `break;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char cmd;

    // 1. Read cmd from cin
    // 2. Using switch (cmd):
    //    'R' -> MODE: RECON
    //    'M' -> MODE: MAPPING
    //    'H' -> MODE: RETURN HOME
    //    default -> MODE: INVALID

    return 0;
}
```

**Expected Output:**
```
MODE: MAPPING
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char cmd;
    cin >> cmd;

    switch (cmd) {
        case 'R':
            cout << "MODE: RECON" << endl;
            break;
        case 'M':
            cout << "MODE: MAPPING" << endl;
            break;
        case 'H':
            cout << "MODE: RETURN HOME" << endl;
            break;
        default:
            cout << "MODE: INVALID" << endl;
            break;
    }

    return 0;
}
```

*Requires tokens:* `cin >>, switch, case 'R':, case 'M':, case 'H':, default:`
*Hint:* Read with `cin >> cmd;`, then write `switch (cmd) { case 'R': ... break; ... }`.
*Solution Note:* Given input 'M', the case 'M': branch executes and prints MODE: MAPPING.

---

#### Step: ternary-operator [THEORY]
*Eyebrow:* Compact inline expression
**The ternary operator (?:)**

Occasionally, flight code does not require an entire branching block with statements — it simply needs to select between two values based on a boolean condition.

syntax: {condition} ? {value_true} : {value_false}
- condition: boolean test yielding true or false
- ?: question mark separating condition from the truth value
- value_true: result returned if condition is true
- :: colon separating true result from false result
- value_false: result returned if condition is false

> Statement versus expression:
> The `if / else` construct is a **statement** — it directs control flow but does not evaluate to a value. The ternary operator `?:` is an **expression** — it computes and yields a concrete value that can be assigned directly to a variable or streamed into `cout`!

**Code Comparison:**
```cpp
string mode = (battery >= 20) ? "CRUISE" : "ECO";
```
[CORRECT] Concise single line: ternary operator initializes variable directly with the chosen value

```cpp
string mode;
if (battery >= 20) {
    mode = "CRUISE";
} else {
    mode = "ECO";
}
```
[INCORRECT / TRAP] Verbose 5 lines: traditional if/else requires separate declaration and split assignment blocks


##### [Go Deeper] The ternary operator as an expression in C++
Because the ternary operator yields an expression value, it allows developers to initialize immutable `const` variables: `const int limit = is_eco ? 50 : 100;`. With an `if / else` statement, this would be impossible without declaring a non-const variable and reassigning it later.

Ternary expressions can also be embedded directly in output streams: `cout << (battery >= 20 ? "OK" : "LOW");`. Notice that parentheses around the ternary expression are mandatory here because stream insertion `<<` has higher operator precedence than `?:`.

Engineering rule of thumb: reserve the ternary operator strictly for simple, binary value assignments. Never nest ternary operators inside each other — nested conditionals drastically impair readability and introduce subtle logic bugs.


---

#### Step: predict-ternary-output [PREDICT]
**Predict ternary evaluation**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery = 15;
    cout << (battery >= 20 ? "GREEN" : "RED") << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `RED`
**Explanation:** Because `battery` holds 15, the condition `15 >= 20` evaluates to false. The ternary operator selects the expression following the colon `:`, so the program outputs `RED`.


---

#### Step: delta-mission-controller [EDITOR] (Optional)
**Bonus challenge: Surveyor instrument controller**

**Task:**
Combine the ternary operator and `switch` inside Delta's instrument monitor:
1. Read tool selector `char tool` and battery charge `int battery` from `cin`.
2. Use the ternary operator to choose power mode: if `battery >= 40`, power is `"FULL"`, otherwise `"ECO"`.
3. Handle `'L'`: print `TOOL: LIDAR | POWER: ` followed by power mode and newline.
4. Handle `'C'`: print `TOOL: CAMERA | POWER: ` followed by power mode and newline.
5. In all other cases (`default:`): print `TOOL: STANDBY` and newline.

**Starter Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    char tool;
    int battery;

    // 1. Read tool and battery from cin
    // 2. Use ternary operator to set string power = ... ("FULL" if battery >= 40, else "ECO")
    // 3. Use switch (tool):
    //    'L' -> TOOL: LIDAR | POWER: <power>
    //    'C' -> TOOL: CAMERA | POWER: <power>
    //    default -> TOOL: STANDBY

    return 0;
}
```

**Expected Output:**
```
TOOL: LIDAR | POWER: FULL
```

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    char tool;
    int battery;
    cin >> tool >> battery;

    string power = (battery >= 40) ? "FULL" : "ECO";

    switch (tool) {
        case 'L':
            cout << "TOOL: LIDAR | POWER: " << power << endl;
            break;
        case 'C':
            cout << "TOOL: CAMERA | POWER: " << power << endl;
            break;
        default:
            cout << "TOOL: STANDBY" << endl;
            break;
    }

    return 0;
}
```

*Requires tokens:* `cin >>, ?, :, switch, case 'L':, case 'C':, default:`
*Hint:* Use `string power = (battery >= 40) ? "FULL" : "ECO";`, followed by `switch (tool)` with corresponding output lines.
*Solution Note:* With input 'L' and 60, battery 60 >= 40 sets power mode to FULL, and case 'L': prints TOOL: LIDAR | POWER: FULL.

---

#### Step: recap [SUMMARY]
**Mission 11 summary: Command dispatcher active**

Base IRIS confirms operational readiness: KARTOGRĀFS 'Delta' has joined the IRIS exploration squadron and processes incoming payload commands with high-speed dispatch logic.

| Construct | Syntax | Best aerospace application |
| :--- | :--- | :--- |
| `if / else if` | `if (x < 10) ...` | Continuous ranges, floating-point numbers, multi-criteria expressions |
| `switch / case` | `switch (cmd) ...` | Discrete constants (char, int), rapid command dispatchers |
| Ternary `?:` | `cond ? a : b` | Compact inline value selection in assignments or direct streaming |

Next, in Chapter 12, awaits Block 2's major PRACTICUM: «Safety system». We will synthesize every branching and logical concept learned so far (`if`, `else`, `&&`, `||`, `!`, `switch`, `?:`) into a unified, resilient flight safety controller protecting both drones Sigma and Delta.


---


# Lesson 12 · Practicum: Flight safety system
**Slug:** `practicum-safety` | **Module:** Block 2 · Decisions

#### Step: safety-architecture [THEORY]
*Eyebrow:* Practicum: Block 2 Synthesis
**Defense-in-depth: Squadron flight safety architecture**

A severe Martian dust storm front has been detected approaching Mawrth Vallis. Wind speeds are fluctuating violently, and ambient atmospheric dust density is climbing toward critical levels.

Both active drones of the IRIS exploration squadron are airborne: agile scout drone IZLŪKS «Sigma» and heavy surveyor KARTOGRĀFS «Delta». Each drone possesses distinct structural limits:

- **Scout drone Sigma:** Highly vulnerable to severe wind shear and rapid battery drain during turbulence, but unaffected by sensor dust.

- **Surveyor drone Delta:** Armored against wind, but highly vulnerable to fine electrostatic dust accumulation on its optical LiDAR aperture and camera lenses.

In this practicum, we integrate everything learned across Block 2 — `if / else`, compound logical operators (`&&`, `||`, `!`), multiway `switch` dispatching, and inline ternary operators (`?:`) — into a unified, layered flight safety controller.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On an elevated reinforced telemetry pylon at Mars base IRIS overlooking the vast crimson-grey Mawrth Vallis basin at twilight. An ominous, dense atmospheric dust storm front rolls across the distant horizon under an amber-tinted Martian sky. On the landing pads below, Scout drone Sigma (agile, dark carbon-slate faceted armor, glowing amber thrusters) and Surveyor drone Delta (heavy-lift twin rotor shrouds, prominent LiDAR aperture) stand anchored. Standing inside the observation post at a tactical safety console displaying radar vector grids is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and single accents of aged brass #B99A61 on the telemetry screens and muted sage #7FB3A3 on radar vectors.


---

#### Step: predict-storm-hazard [PREDICT]
*Eyebrow:* Pre-flight hazard prediction
**Composite storm threshold evaluation**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int wind = 22;
    int battery = 65;
    bool dust_alert = false;

    if ((wind > 20 || dust_alert) && battery < 50) {
        cout << "ABORT MISSION";
    } else if (wind > 20 && battery >= 50) {
        cout << "HOLD POSITION";
    } else {
        cout << "PROCEED";
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `HOLD POSITION`
**Explanation:** The first check evaluates `(22 > 20 || false) && 65 < 50`. While the left side is true, the right side (`65 < 50`) is false, so the composite `&&` expression evaluates to false. The execution advances to `else if (wind > 20 && battery >= 50)`. Here both `22 > 20` and `65 >= 50` are true, so `HOLD POSITION` is printed.


---

#### Step: sigma-wind-guard [EDITOR]
**Subsystem 1: Sigma environmental monitor**

**Task:**
Program Scout drone Sigma's weather safety validator using `cin`, `if`, `else if`, and `else`:
1. Read wind speed `int wind` and battery charge `int battery` from `cin`.
2. If `wind > 18` OR `battery < 20`, print `EMERGENCY LAND` and a newline.
3. Else if `battery >= 50` AND `wind <= 12`, print `FLIGHT NOMINAL` and a newline.
4. In all other cases (`else`), print `CAUTION: REDUCE SPEED` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int wind, battery;
    cin >> wind >> battery;

    // 1. If wind > 18 OR battery < 20 -> EMERGENCY LAND
    // 2. Else if battery >= 50 AND wind <= 12 -> FLIGHT NOMINAL
    // 3. Otherwise -> CAUTION: REDUCE SPEED

    return 0;
}
```

**Expected Output:**
```
EMERGENCY LAND
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int wind, battery;
    cin >> wind >> battery;

    if (wind > 18 || battery < 20) {
        cout << "EMERGENCY LAND" << endl;
    } else if (battery >= 50 && wind <= 12) {
        cout << "FLIGHT NOMINAL" << endl;
    } else {
        cout << "CAUTION: REDUCE SPEED" << endl;
    }

    return 0;
}
```

*Requires tokens:* `if, else, ||, &&`
*Hint:* Write `if (wind > 18 || battery < 20) { cout << "EMERGENCY LAND" << endl; } else if (battery >= 50 && wind <= 12) { cout << "FLIGHT NOMINAL" << endl; } else { cout << "CAUTION: REDUCE SPEED" << endl; }`.
*Solution Note:* With input 22 and 80, the wind condition 22 > 18 triggers the emergency land directive immediately.

---

#### Step: delta-sensor-dispatcher [EDITOR]
**Subsystem 2: Delta instrument router**

**Task:**
Program Surveyor drone Delta's sensor router using `switch (sensor)`:
1. Read sensor code `char sensor` from `cin`.
2. If `'L'`, print `SENSOR: LIDAR ONLINE` and exit with `break;`.
3. If `'C'`, print `SENSOR: CAMERA ONLINE` and exit with `break;`.
4. If `'R'`, print `SENSOR: RADAR ONLINE` and exit with `break;`.
5. In all other cases (`default:`), print `SENSOR: UNKNOWN` and exit with `break;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char sensor;
    cin >> sensor;

    // Switch on sensor:
    // 'L' -> SENSOR: LIDAR ONLINE
    // 'C' -> SENSOR: CAMERA ONLINE
    // 'R' -> SENSOR: RADAR ONLINE
    // default -> SENSOR: UNKNOWN

    return 0;
}
```

**Expected Output:**
```
SENSOR: LIDAR ONLINE
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char sensor;
    cin >> sensor;

    switch (sensor) {
        case 'L':
            cout << "SENSOR: LIDAR ONLINE" << endl;
            break;
        case 'C':
            cout << "SENSOR: CAMERA ONLINE" << endl;
            break;
        case 'R':
            cout << "SENSOR: RADAR ONLINE" << endl;
            break;
        default:
            cout << "SENSOR: UNKNOWN" << endl;
            break;
    }

    return 0;
}
```

*Requires tokens:* `switch, case 'L':, case 'C':, case 'R':, break, default:`
*Hint:* Use `switch (sensor) { case 'L': cout << "SENSOR: LIDAR ONLINE" << endl; break; ... default: ... }`.
*Solution Note:* Input 'L' matches the first case label and outputs SENSOR: LIDAR ONLINE.

---

#### Step: find-safety-bug [CLICKLINE]
**Subsystem audit: The false alarm trap**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int alert_code = 0;
    cout << "DIAGNOSTIC CHECK..." << endl;
    if (alert_code == 1 || 2) {
        cout << "ALARM: EVACUATE" << endl;
    } else {
        cout << "SYSTEM NOMINAL" << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 reads `if (alert_code == 1 || 2)`. Because `2` is a standalone non-zero integer, it evaluates to boolean `true` regardless of `alert_code`! This triggers the evacuation alarm even during diagnostic checks when `alert_code` is 0. The check must be written as `if (alert_code == 1 || alert_code == 2)`.


---

#### Step: assemble-sensor-packet [PARSONS]
**Subsystem 3: Telemetry packet pre-filter**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `int main() {`
4. `    char drone;`
5. `    bool ok;`
6. `    cin >> drone >> ok;`
7. `    if (!ok) {`
8. `        cout << "REJECTED: CORRUPTED DATA" << endl;`
9. `    } else if (drone == 'S') {`
10. `        cout << "ACCEPTED: SIGMA TELEMETRY" << endl;`
11. `    } else {`
12. `        cout << "ACCEPTED: DELTA TELEMETRY" << endl;`
13. `    }`
14. `    return 0;`
15. `}`

**Explanation:** The pre-filter first checks `if (!ok)` to reject corrupt packets. Only when data integrity is confirmed does execution proceed to distinguish between Sigma (`'S'`) and Delta.


---

#### Step: power-allocator-ternary [EDITOR]
**Subsystem 4: Dynamic LiDAR purge controller**

**Task:**
Use the ternary operator `?:` to assign Delta's LiDAR purge mode based on dust density:
1. Read dust concentration `int dust` from `cin`.
2. Use the ternary operator to choose power mode: if `dust > 60`, mode is `"PURGE"`, otherwise `"ACTIVE"`.
3. Print `LIDAR MODE: ` followed by the mode string and a newline.

**Starter Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int dust;
    cin >> dust;

    // 1. Determine mode with ternary operator: if dust > 60 -> "PURGE", else "ACTIVE"
    // 2. Print: LIDAR MODE: <mode>

    return 0;
}
```

**Expected Output:**
```
LIDAR MODE: PURGE
```

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int dust;
    cin >> dust;

    string mode = (dust > 60) ? "PURGE" : "ACTIVE";
    cout << "LIDAR MODE: " << mode << endl;

    return 0;
}
```

*Requires tokens:* `?, :`
*Hint:* Write `string mode = (dust > 60) ? "PURGE" : "ACTIVE";` followed by `cout << "LIDAR MODE: " << mode << endl;`.
*Solution Note:* With input 75, dust level 75 > 60 activates the high-pressure purge cleaning cycle.

---

#### Step: squadron-safety-controller [EDITOR]
**Capstone Project: Unified Squadron Safety Controller**

**Task:**
Construct the integrated mission safety controller combining `switch`, `if`, and `else`:
1. Read drone identifier `char drone` and flight metric `int metric` from `cin`.
2. Route on `switch (drone)`.
3. For case `'S'` (Sigma, where metric represents wind speed): if `metric > 20`, print `SIGMA: GROUNDED`; otherwise print `SIGMA: AIRBORNE`.
4. For case `'D'` (Delta, where metric represents dust level): if `metric > 50`, print `DELTA: SHELTERED`; otherwise print `DELTA: SCANNING`.
5. For `default:`: print `DRONE: UNRECOGNIZED` and exit with `break;`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char drone;
    int metric;
    cin >> drone >> metric;

    // 1. switch (drone)
    // 2. case 'S': metric is wind speed
    //    if metric > 20 -> SIGMA: GROUNDED, else -> SIGMA: AIRBORNE
    // 3. case 'D': metric is dust level
    //    if metric > 50 -> DELTA: SHELTERED, else -> DELTA: SCANNING
    // 4. default: DRONE: UNRECOGNIZED

    return 0;
}
```

**Expected Output:**
```
SIGMA: GROUNDED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char drone;
    int metric;
    cin >> drone >> metric;

    switch (drone) {
        case 'S':
            if (metric > 20) {
                cout << "SIGMA: GROUNDED" << endl;
            } else {
                cout << "SIGMA: AIRBORNE" << endl;
            }
            break;
        case 'D':
            if (metric > 50) {
                cout << "DELTA: SHELTERED" << endl;
            } else {
                cout << "DELTA: SCANNING" << endl;
            }
            break;
        default:
            cout << "DRONE: UNRECOGNIZED" << endl;
            break;
    }

    return 0;
}
```

*Requires tokens:* `switch, case 'S':, case 'D':, if, else, break, default:`
*Hint:* Inside each case of switch (drone), place an if / else statement checking metric against that drone's specific threshold.
*Solution Note:* With input 'S' 25, case 'S' executes, finds wind 25 > 20, and grounds Scout drone Sigma.

---

#### Step: predict-edge-cases [PREDICT]
*Eyebrow:* Edge case resilience
**Unregistered telemetry signal prediction**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    char drone = 'X';
    int metric = 10;

    switch (drone) {
        case 'S':
            cout << (metric > 20 ? "SIGMA: OFF" : "SIGMA: OK");
            break;
        case 'D':
            cout << (metric > 50 ? "DELTA: OFF" : "DELTA: OK");
            break;
        default:
            cout << "DRONE: UNRECOGNIZED";
            break;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `DRONE: UNRECOGNIZED`
**Explanation:** Because `'X'` does not match `'S'` or `'D'`, execution skips both branches and jumps directly to `default:`, outputting `DRONE: UNRECOGNIZED`. In mission software, every switch must contain a default branch to safely handle corrupted or unexpected input.


---

#### Step: storm-evacuation-override [EDITOR] (Optional)
**Bonus challenge: Planetary storm evacuation override**

**Task:**
Program the base-wide emergency evacuation override protocol:
1. Read storm severity index `int storm` and clearance flag `char clearance` from `cin`.
2. If `storm >= 90` OR `clearance == 'R'`, print `PROTOCOL: IMMEDIATE EVACUATION` and a newline.
3. Else if `storm >= 50` AND `clearance == 'Y'`, print `PROTOCOL: RETURN TO DOCK` and a newline.
4. In all other cases (`else`), print `PROTOCOL: STANDBY FOR UPDATES` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int storm;
    char clearance;
    cin >> storm >> clearance;

    // 1. If storm >= 90 OR clearance == 'R' -> PROTOCOL: IMMEDIATE EVACUATION
    // 2. Else if storm >= 50 AND clearance == 'Y' -> PROTOCOL: RETURN TO DOCK
    // 3. Otherwise -> PROTOCOL: STANDBY FOR UPDATES

    return 0;
}
```

**Expected Output:**
```
PROTOCOL: IMMEDIATE EVACUATION
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int storm;
    char clearance;
    cin >> storm >> clearance;

    if (storm >= 90 || clearance == 'R') {
        cout << "PROTOCOL: IMMEDIATE EVACUATION" << endl;
    } else if (storm >= 50 && clearance == 'Y') {
        cout << "PROTOCOL: RETURN TO DOCK" << endl;
    } else {
        cout << "PROTOCOL: STANDBY FOR UPDATES" << endl;
    }

    return 0;
}
```

*Requires tokens:* `if, else, ||, &&`
*Hint:* Use a cascading if-else structure with || for the highest priority emergency and && for the intermediate warning.
*Solution Note:* With storm index 95 and clearance 'G', the storm threshold 95 >= 90 triggers an immediate evacuation protocol.

---

#### Step: recap [THEORY]
**Block 2 summary: Autonomous decisions unlocked**

Congratulations! You have completed Block 2: «LĒMUMI» (Decisions) of the IRIS mission course. Scout drone Sigma and Surveyor drone Delta are now equipped with robust, deterministic decision-making logic.

| Control construct | Syntax | When to select in flight software |
| :--- | :--- | :--- |
| `if / else if / else` | `if (val > 10) ...` | Continuous numeric ranges, floating-point comparisons, multi-variable logic |
| Logical operators | `&&`, `\|\|`, `!` | Synthesizing telemetry flags and applying short-circuit safety guards |
| `switch / case` | `switch (code) ...` | Discrete integer or char commands; high-speed $O(1)$ jump table dispatching |
| Ternary `?:` | `cond ? a : b` | Compact inline value assignment or immediate stream formatting |

Notice a fundamental limitation in all programs written so far: each program runs once from top to bottom and terminates. In real aerospace flight computers, telemetry must be sampled and processed thousands of times every second without stopping.

In Chapter 13, we inaugurate **Block 3: DATI & CIKLI**, beginning with the `while` loop — unlocking continuous, iterative computation!


---


# Lesson 13 · The while loop
**Slug:** `while` | **Module:** Block 2 · Decisions

#### Step: why-while-loop [THEORY]
*Eyebrow:* Iterative computation
**Waiting for readiness: The need for repetition**

The dust storm over Mawrth Vallis has subsided, leaving the Martian sky clear at dawn. Scout drone Sigma sits on the exterior launch pad, initiating engine pre-flight calibration.

In aerospace engineering, hardware diagnostics never complete instantaneously. Hydraulic propellant lines must reach operating pressure, engine blocks must warm up, and sensor calibration sweeps must cycle repeatedly until all status flags register ready.

Until now, every C++ program we wrote executed strictly from top to bottom, making decisions once with `if / else` and terminating. If a pressure sensor read below the required threshold, the program simply halted.

To make flight software resilient, we need a mechanism to repeat an action until a specific condition is met. In C++, this foundation begins with the `while` loop.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Dawn after the Martian dust storm on the reinforced launch pad of Mars base IRIS. Scout drone Sigma with faceted dark carbon-slate hull and amber thruster ports sits in pre-flight diagnostics, with circular telemetry calibration rings projecting onto the tarmac. In the background, heavy surveyor drone Delta rests on an auxiliary maintenance platform beside base solar arrays under a crisp peach-amber Martian sunrise. Standing at a portable diagnostics terminal, observing a pulsing countdown loop bar, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the thrusters and diagnostic telemetry rings.


---

#### Step: while-syntax-and-rules [THEORY]
*Eyebrow:* Pre-test repetition
**The while loop: Syntax and mechanics**

syntax: while ({condition}) { {body} }
- condition: boolean expression evaluated BEFORE each iteration
- body: statement block executed repeatedly as long as condition evaluates to true

The `while` loop works in three sequential phases on every cycle:

1. **Evaluate condition:** The CPU tests the boolean expression inside parentheses.

2. **Execute or exit:** If the condition evaluates to `true`, the statements inside `{ ... }` run. If `false`, the loop immediately terminates and execution jumps to the statement following the closing brace.

3. **Repeat:** After the last statement in the loop body finishes, execution jumps back to step 1 to evaluate the condition again.

!> **The Infinite Loop Trap.** The code inside the loop body **must** eventually modify at least one variable involved in the condition! If the condition remains true indefinitely, the computer enters an infinite loop, freezing the controller until a hardware watchdog timer triggers an emergency reboot.

**Code Comparison:**
```cpp
int pressure = 20;
while (pressure < 50) {
    pressure += 10; // condition will eventually turn false
}
```
[CORRECT] Finite progressing loop: variable increments on each pass, eventually turning condition false

```cpp
int pressure = 20;
while (pressure < 50) {
    cout << "WAIT"; // pressure never updates -> infinite loop!
}
```
[INCORRECT / TRAP] Infinite loop bug: variable pressure is never modified, locking CPU in a perpetual loop


---

#### Step: predict-while-count [PREDICT]
*Eyebrow:* Loop tracing
**Tracing pressure accumulation**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int pressure = 70;
    while (pressure < 100) {
        pressure += 10;
    }
    cout << pressure;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `100`
**Explanation:** On the third iteration, `pressure` increments from 90 to 100. When execution returns to evaluate the condition, `100 < 100` evaluates to false. The loop terminates immediately, and `cout` prints the final accumulated value `100`.


---

#### Step: sensor-warmup-loop [EDITOR]
**Engine pre-heater warmup controller**

**Task:**
Program Scout drone Sigma's engine pre-heater using a `while` loop:
1. Read starting engine temperature `int temp` from `cin`.
2. While `temp < 50`, add `10` to `temp` and print `WARMING: ` followed by `temp` and a newline.
3. After the loop completes, print `READY FOR FLIGHT` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int temp;
    cin >> temp;

    // 1. while temp < 50
    // 2. add 10 to temp and print: WARMING: <temp>
    // 3. after loop print: READY FOR FLIGHT

    return 0;
}
```

**Expected Output:**
```
WARMING: 30
WARMING: 40
WARMING: 50
READY FOR FLIGHT
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int temp;
    cin >> temp;

    while (temp < 50) {
        temp += 10;
        cout << "WARMING: " << temp << endl;
    }
    cout << "READY FOR FLIGHT" << endl;

    return 0;
}
```

*Requires tokens:* `while, <, +=, cout`
*Hint:* Write `while (temp < 50) { temp += 10; cout << "WARMING: " << temp << endl; }` followed by the flight readiness message.
*Solution Note:* With input 20, temp becomes 30, 40, and 50, triggering three warmup status lines before exiting to READY FOR FLIGHT.

---

#### Step: predict-zero-iterations [PREDICT]
*Eyebrow:* Pre-condition evaluation
**When a while loop runs zero times**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int charge = 95;
    while (charge < 80) {
        cout << "CHARGING...";
        charge += 10;
    }
    cout << "BATTERY READY";
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `BATTERY READY`
**Explanation:** Because `charge` is 95, the initial check `95 < 80` is false right from the start! The loop body never executes, skipping directly to the output statement `BATTERY READY`. A `while` loop can execute zero times if the condition is already false.


---

#### Step: do-while-syntax [THEORY]
*Eyebrow:* Post-test repetition
**The do-while loop: Guaranteed first execution**

syntax: do { {body} } while ({condition});
- body: statement block guaranteed to execute AT LEAST ONCE
- condition: boolean check evaluated AFTER each iteration; requires a trailing semicolon

Sometimes in flight hardware, we **must** perform an action before we can even check whether to repeat it. For example, a drone cannot know if a sensor measurement is valid without taking at least one initial sample.

The `do-while` loop reverses the evaluation order: it executes the body **first**, and only checks the condition **afterwards**.

> **Syntax rule:** Notice the trailing semicolon `;` immediately following `while (condition);` in a `do-while` statement. Unlike a standard `while` loop, this semicolon is mandatory and omitting it causes a compilation error.

**Code Comparison:**
```cpp
int voltage = 10;
do {
    voltage += 25;
} while (voltage < 50);
```
[CORRECT] Valid do-while syntax: body executes first, condition terminates with mandatory trailing semicolon

```cpp
int voltage = 10;
do {
    voltage += 25;
} while (voltage < 50) // missing trailing semicolon!
```
[INCORRECT / TRAP] Syntax error: omitting trailing semicolon after while (condition) causes compilation failure


---

#### Step: predict-do-while [PREDICT]
*Eyebrow:* Post-condition evaluation
**Predicting post-test loop execution**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int attempt = 5;
    do {
        cout << attempt;
        attempt++;
    } while (attempt < 3);
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `5`
**Explanation:** In a `do-while` loop, the body always executes at least once. It outputs `5`, increments `attempt` to 6, and then tests `6 < 3`. Because the condition is false, the loop terminates immediately, having produced the output `5`.


---

#### Step: capacitor-pulse-charge [EDITOR]
**LiDAR capacitor charging cycle**

**Task:**
Program Surveyor drone Delta's LiDAR capacitor charger using a `do-while` loop:
1. Read initial voltage `int voltage` and target voltage `int target` from `cin`.
2. In a `do-while` loop while `voltage < target`: add `25` to `voltage` and print `PULSE: ` followed by `voltage` and a newline.
3. After the loop completes, print `LIDAR CHARGED` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int voltage, target;
    cin >> voltage >> target;

    // 1. do-while loop while voltage < target
    // 2. add 25 to voltage and print: PULSE: <voltage>
    // 3. after loop print: LIDAR CHARGED

    return 0;
}
```

**Expected Output:**
```
PULSE: 35
PULSE: 60
LIDAR CHARGED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int voltage, target;
    cin >> voltage >> target;

    do {
        voltage += 25;
        cout << "PULSE: " << voltage << endl;
    } while (voltage < target);

    cout << "LIDAR CHARGED" << endl;

    return 0;
}
```

*Requires tokens:* `do, while, ;`
*Hint:* Write `do { voltage += 25; cout << "PULSE: " << voltage << endl; } while (voltage < target);` followed by the completion message.
*Solution Note:* With voltage 10 and target 60, pulses charge the capacitor to 35 and 60, satisfying the target condition and printing LIDAR CHARGED.

---

#### Step: find-infinite-loop [CLICKLINE]
**Locate the frozen loop bug**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int countdown = 3;
    while (countdown > 0) {
        cout << "COUNTDOWN: " << countdown << endl;
        countdown--;
    }
    int pressure = 10;
    while (pressure < 50) {
        cout << "PRESSURE: LOW" << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 11
**Explanation:** Line 11 begins `while (pressure < 50)`. Inside this loop, `pressure` is never incremented or modified! The condition `10 < 50` remains true forever, locking the flight computer in an infinite loop.


---

#### Step: stream-input-accumulator [EDITOR] (Optional)
**Bonus challenge: Telemetry stream accumulator**

**Task:**
Accumulate incoming sensor telemetry until an end-of-stream sentinel value `-1` is encountered:
1. Read initial measurement `int val` from `cin`.
2. Declare accumulator `int sum = 0;`.
3. In a `while` loop while `val != -1`: add `val` to `sum`, then read the next `val` from `cin` with `cin >> val;`.
4. After the loop terminates, print `TOTAL TELEMETRY: ` followed by `sum` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int val;
    cin >> val;
    int sum = 0;

    // 1. while val != -1
    // 2. add val to sum and read next val from cin
    // 3. after loop print: TOTAL TELEMETRY: <sum>

    return 0;
}
```

**Expected Output:**
```
TOTAL TELEMETRY: 50
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int val;
    cin >> val;
    int sum = 0;

    while (val != -1) {
        sum += val;
        cin >> val;
    }

    cout << "TOTAL TELEMETRY: " << sum << endl;

    return 0;
}
```

*Requires tokens:* `while, !=, cin >> val;`
*Hint:* Use `while (val != -1) { sum += val; cin >> val; }` to process continuous stream values.
*Solution Note:* With input 10 25 15 -1, the loop sums 10 + 25 + 15 = 50 and terminates when sentinel -1 is read.

---

#### Step: recap [THEORY]
**Mission 13 summary: Iteration unlocked**

Congratulations! You have mastered iterative loops in C++. Drones Sigma and Delta can now autonomously poll sensors, cycle hardware diagnostics, and wait for environmental clearance.

| Loop type | Condition evaluated | Minimum iterations | Best aerospace application |
| :--- | :--- | :--- | :--- |
| `while (cond)` | Before loop body | 0 | Polling external sensor status, safe guarded loops |
| `do { ... } while (cond);` | After loop body | 1 | Sampling sensor before validation, retry requests |

Next, in Chapter 14, we explore the structured counter loop: `for`. When the drone knows exactly how many times to repeat an action — such as surveying 10 coordinate waypoints — the `for` loop provides a clean, self-contained iteration framework.


---


# Lesson 14 · The for loop
**Slug:** `for` | **Module:** Block 2 · Decisions

#### Step: why-for-loop [THEORY]
*Eyebrow:* Determined navigation
**Surveying coordinates: The need for a counter loop**

Diagnostics are complete and propulsion systems report nominal status. Scout drone Sigma lifts off into the Martian sky above Mawrth Vallis to execute an automated aerial survey.

The flight computer holds an ordered flight plan consisting of exact waypoint coordinates. The objective is not an open-ended wait; rather, Sigma must visit precisely 10 waypoints in strict sequence before returning to the dock.

While a `while` loop can simulate counters, it requires manual setup: declaring a variable before the loop, writing a condition in parentheses, and remembering to manually increment the counter inside the body.

If you forget to increment, the program freezes. If you declare variables outside, they clutter global memory. For situations where the number of repetitions is known in advance, C++ provides the counter loop: `for`.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. High above the Martian canyon Mawrth Vallis in mid-morning sunlight. Scout drone Sigma glides forward through a succession of holographic glowing waypoint rings suspended in the thin air, tracing a geometric flight corridor toward distant plateaus. Far below on the canyon floor, heavy surveyor drone Delta scans geological strata. Inside the forward avionics observation dome at Mars base IRIS, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, observes a tactical flight corridor path screen. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the holographic waypoint navigation rings and thruster trails.


---

#### Step: for-syntax-and-parts [THEORY]
*Eyebrow:* Counter loop anatomy
**The for loop: Syntax and mechanics**

syntax: for ({init}; {condition}; {update}) { {body} }
- init: creates and initializes counter variable; runs ONCE before first iteration
- condition: tested BEFORE every iteration; if false, loop terminates
- update: modifies counter variable AFTER every iteration
- body: statement block executed during each iteration

The `for` loop header packs three critical control expressions between its parentheses, separated by two semicolons `;`:

1. **Initialization (`int i = 0`):** Executed exactly once when entering the loop.

2. **Condition (`i < 5`):** Evaluated before each iteration. If true, the body runs; if false, the loop ends.

3. **Update (`i++`):** Automatically executed immediately after each loop pass, before re-checking the condition.

> **Variable scope rule:** When a variable is declared inside the `for` header (`int i = 0`), it exists **strictly inside** the loop body! The moment the loop finishes, `i` is destroyed and cannot accidentally corrupt subsequent code.

**Code Comparison:**
```cpp
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
```
[CORRECT] Self-contained for loop: initialization, condition, and increment packaged cleanly in one header

```cpp
int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
} // variable i leaks outside the loop!
```
[INCORRECT / TRAP] Scattered while loop: counter variable leaks into outer scope and update is separated from condition


---

#### Step: predict-for-output [PREDICT]
*Eyebrow:* Loop tracing
**Tracing counter multiplication**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 4; i++) {
        cout << i * 10 << " ";
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `10 20 30 40 `
**Explanation:** The loop executes 4 times: for `i = 1` it outputs `10 `, for `i = 2` it outputs `20 `, for `i = 3` it outputs `30 `, and for `i = 4` it outputs `40 `. When `i` increments to 5, the condition `5 <= 4` evaluates to false, terminating the loop.


---

#### Step: waypoint-surveyor [EDITOR]
**Waypoint navigation tracker**

**Task:**
Program Scout drone Sigma's waypoint logger using a `for` loop:
1. Read total number of waypoints `int n` from `cin`.
2. In a `for` loop from `int i = 1` up to and including `n` (`i <= n`), stepping by `i++`: print `WAYPOINT #` followed by `i` and a newline.
3. After the loop completes, print `ROUTE COMPLETE` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    // 1. for loop from i = 1 up to and including n (i <= n)
    // 2. print: WAYPOINT #<i>
    // 3. after loop print: ROUTE COMPLETE

    return 0;
}
```

**Expected Output:**
```
WAYPOINT #1
WAYPOINT #2
WAYPOINT #3
ROUTE COMPLETE
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    for (int i = 1; i <= n; i++) {
        cout << "WAYPOINT #" << i << endl;
    }
    cout << "ROUTE COMPLETE" << endl;

    return 0;
}
```

*Requires tokens:* `for, <=, ++`
*Hint:* Write `for (int i = 1; i <= n; i++) { cout << "WAYPOINT #" << i << endl; }` followed by the completion message.
*Solution Note:* With input 3, the loop iterates for i = 1, 2, and 3, outputting three waypoint milestones before logging ROUTE COMPLETE.

---

#### Step: counting-down-and-steps [THEORY]
*Eyebrow:* Custom increments
**Counting backwards and custom stepping**

The update expression in a `for` loop is not limited to `i++`. You can decrement or step by arbitrary increments:

- **Counting down:** `for (int i = 10; i > 0; i--)` decrements on each pass, ideal for launch countdowns.

- **Custom step (e.g. +20):** `for (int i = 0; i <= 100; i += 20)` advances by 20 on each iteration, ideal for stepped telemetry ladders.

!> **Assignment requirement.** The update expression must actually modify the counter variable! Writing `i + 2` simply computes a number without storing it, leaving `i` unchanged and locking the loop in an infinite freeze. Always use assignment operators like `i += 2` or `i -= 2`.

**Code Comparison:**
```cpp
for (int i = 10; i >= 0; i -= 2) {
    cout << i << " ";
}
```
[CORRECT] Valid descending assignment: compound assignment operator i -= 2 updates loop counter

```cpp
for (int i = 10; i >= 0; i - 2) {
    cout << i << " "; // bug: i - 2 does not reassign to i!
}
```
[INCORRECT / TRAP] No-op expression bug: i - 2 computes a value but never stores it back into i, causing infinite loop


---

#### Step: predict-countdown [PREDICT]
*Eyebrow:* Reverse iteration
**Launch countdown prediction**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int t = 3; t > 0; t--) {
        cout << t;
    }
    cout << "GO";
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `321GO`
**Explanation:** The counter produces 3, 2, and 1. When `t` decrements to 0, the test `0 > 0` evaluates to false. The loop terminates and execution immediately prints `GO`, producing the full string `321GO`.


---

#### Step: altitude-stepper [EDITOR]
**Stepped altitude ascent controller**

**Task:**
Program Sigma's stepped altitude ascent ladder:
1. Read initial altitude `int start` and maximum altitude `int max_alt` from `cin`.
2. In a `for` loop starting at `int alt = start`, while `alt <= max_alt`, stepping by `alt += 20`: print `ALTITUDE: ` followed by `alt` and a newline.
3. After the loop completes, print `LEVEL FLIGHT ESTABLISHED` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int start, max_alt;
    cin >> start >> max_alt;

    // 1. for loop: int alt = start; alt <= max_alt; alt += 20
    // 2. print: ALTITUDE: <alt>
    // 3. after loop print: LEVEL FLIGHT ESTABLISHED

    return 0;
}
```

**Expected Output:**
```
ALTITUDE: 20
ALTITUDE: 40
ALTITUDE: 60
LEVEL FLIGHT ESTABLISHED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int start, max_alt;
    cin >> start >> max_alt;

    for (int alt = start; alt <= max_alt; alt += 20) {
        cout << "ALTITUDE: " << alt << endl;
    }
    cout << "LEVEL FLIGHT ESTABLISHED" << endl;

    return 0;
}
```

*Requires tokens:* `for, <=, += 20`
*Hint:* Write `for (int alt = start; alt <= max_alt; alt += 20) { cout << "ALTITUDE: " << alt << endl; }`.
*Solution Note:* With input 20 and 60, altitude advances through 20, 40, and 60 before leveling off.

---

#### Step: find-fencepost-bug [CLICKLINE]
**The Fencepost trap: Off-by-one audit**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int waypoints = 5;
    cout << "STARTING PATROL..." << endl;
    for (int i = 1; i < waypoints; i++) {
        cout << "SECTOR " << i << " CLEAR" << endl;
    }
    cout << "PATROL FINISHED" << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 reads `for (int i = 1; i < waypoints; i++)`. Because `<` is used instead of `<=`, the loop terminates when `i` reaches 5, omitting sector 5 entirely! This classic bug is called the Fencepost or Off-by-one error. The condition should be `i <= waypoints`.


---

#### Step: predict-scope-leak [PREDICT]
*Eyebrow:* Scope isolation
**Accumulator variable scope**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int total = 0;
    for (int step = 1; step <= 3; step++) {
        total += step;
    }
    cout << total;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `6`
**Explanation:** The loop runs 3 times: `total` accumulates 0 + 1 + 2 + 3 = 6. Because `total` was declared outside the `for` loop, its accumulated value persists after the loop finishes and is output by `cout`.


---

#### Step: solar-radiation-sum [EDITOR] (Optional)
**Bonus challenge: Solar radiation accumulator**

**Task:**
Accumulate a fixed series of telemetry sensor samples:
1. Read sample count `int count` from `cin`.
2. Declare accumulator `int sum = 0;`.
3. In a `for` loop from `int i = 0` to `i < count`: read `int reading` from `cin` with `cin >> reading;` and add `reading` to `sum`.
4. After the loop terminates, print `TOTAL RADIATION: ` followed by `sum` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int count;
    cin >> count;
    int sum = 0;

    // 1. for loop from int i = 0 to i < count
    // 2. read int reading from cin, add reading to sum
    // 3. after loop print: TOTAL RADIATION: <sum>

    return 0;
}
```

**Expected Output:**
```
TOTAL RADIATION: 70
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int count;
    cin >> count;
    int sum = 0;

    for (int i = 0; i < count; i++) {
        int reading;
        cin >> reading;
        sum += reading;
    }
    cout << "TOTAL RADIATION: " << sum << endl;

    return 0;
}
```

*Requires tokens:* `for, cin >> reading;, sum +=`
*Hint:* Use `for (int i = 0; i < count; i++) { int reading; cin >> reading; sum += reading; }`.
*Solution Note:* With count 4 and values 15 20 25 10, the loop sums the 4 samples to 70 and prints TOTAL RADIATION: 70.

---

#### Step: recap [THEORY]
**Mission 14 summary: Counter loops mastered**

Congratulations! You have mastered the `for` loop in C++. Scout drone Sigma can now traverse multi-waypoint patrol corridors, execute stepped climb profiles, and batch-process fixed arrays of telemetry.

| Loop type | Best aerospace application | Syntax anatomy | Typical beginner trap |
| :--- | :--- | :--- | :--- |
| `for` | Known iteration count (waypoints, batches) | `(init; cond; update)` | Off-by-one (`<` vs `<=`) |
| `while` | Unknown count (waiting for sensor readiness) | `(condition)` | Forgetting update -> freeze |
| `do-while` | Guaranteed ≥ 1 execution (sampling before test) | `do { } while ();` | Omitting trailing semicolon `;` |

What happens if during a 10-waypoint flight, a proximity sensor suddenly detects a jagged rock wall directly ahead? We must immediately abort the remaining route without waiting for the counter to reach 10!

In Chapter 15, we unlock loop control statements: `break` and `continue` — granting total real-time control over executing loops.


---


# Lesson 15 · break and continue
**Slug:** `break-continue` | **Module:** Block 2 · Decisions

#### Step: obstacle-detection [THEORY]
*Eyebrow:* Dynamic flight control
**Obstacle avoidance: Controlling loop execution**

Scout drone Sigma is flying a low-altitude survey corridor inside the Mawrth Vallis gorge. Under nominal conditions, a counter loop `for` visits sectors 1 through 10 in automated succession.

However, real planetary terrain is unpredictable. A sudden canyon rockfall can obstruct the flight path, an unexpected dust vortex can blind optical navigation, or an overheating thruster can demand immediate landing.

When an emergency occurs, the drone cannot blindly continue to sectors 5, 6, and 7 waiting for the loop counter to expire. It must possess the ability to abort the remaining loop entirely.

Conversely, if one specific sector is merely shadowed by a cliff, the drone might skip scanning that single sector and immediately proceed to the next. In C++, these two real-time interventions are handled by `break` and `continue`.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Inside a deep winding Martian canyon gorge at midday. Scout drone Sigma with dark carbon-slate faceted hull hovers in front of a massive geological rockfall obstruction across the flight corridor, its forward LiDAR scanner casting a glowing amber conical barrier grid against the rock wall. The drone's thrusters tilt into reverse braking vector. In the distance, surveyor drone Delta monitors aerial telemetry. Inside the mobile field control bunker, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, punches an illuminated emergency abort route override on the tactical console. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the scanner beam and emergency override button.


---

#### Step: break-in-loops [THEORY]
*Eyebrow:* Immediate loop termination
**The break statement in loops**

You already encountered `break` in Chapter 11 inside `switch` statements to prevent fall-through. When placed inside a loop (`for`, `while`, or `do-while`), `break` performs an even more dramatic action:

**It immediately terminates the loop entirely!**

Execution instantly leaps past the loop's closing brace `}`, continuing with the very next statement in the program.

> **Innermost loop rule:** If loops are nested within one another, `break` only exits the **innermost** loop in which it resides. Outer enclosing loops will continue running.

**Code Comparison:**
```cpp
for (int s = 1; s <= 10; s++) {
    if (s == 4) break;
    cout << s << " ";
}
```
[CORRECT] Clean early exit: break immediately halts the loop upon meeting the trigger condition

```cpp
bool stop = false;
for (int s = 1; s <= 10 && !stop; s++) {
    if (s == 4) stop = true;
    else cout << s << " ";
} // cumbersome flag logic
```
[INCORRECT / TRAP] Clumsy flag logic: auxiliary boolean variable clutters condition and requires extra checks


---

#### Step: predict-break-output [PREDICT]
*Eyebrow:* Loop tracing
**Tracing early termination**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 6; i++) {
        if (i == 4) {
            break;
        }
        cout << i;
    }
    cout << "!";
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `123!`
**Explanation:** For `i = 1`, `2`, and `3`, the condition `i == 4` is false, so `123` is printed. When `i` becomes 4, the `if` condition succeeds and executes `break;`. The loop terminates immediately without printing 4, and the trailing exclamation mark `!` is output, producing `123!`.


---

#### Step: canyon-obstacle-abort [EDITOR]
**Canyon obstacle abort controller**

**Task:**
Program Scout drone Sigma's patrol route with an early obstacle abort:
1. Read the blocked sector number `int obstacle` from `cin`.
2. In a `for` loop for `int sector = 1` up to and including `5` (`sector <= 5`):
3. If `sector == obstacle`, print `OBSTACLE AT SECTOR ` followed by `sector`, a newline, and immediately exit the loop with `break;`.
4. Otherwise (`else`), print `SECTOR ` followed by `sector`, ` CLEARED`, and a newline.
5. After the loop completes, print `PATROL ENDED` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int obstacle;
    cin >> obstacle;

    // 1. for loop: int sector = 1; sector <= 5; sector++
    // 2. if sector == obstacle: print OBSTACLE AT SECTOR <sector> and break;
    // 3. else: print SECTOR <sector> CLEARED
    // 4. after loop: print PATROL ENDED

    return 0;
}
```

**Expected Output:**
```
SECTOR 1 CLEARED
SECTOR 2 CLEARED
OBSTACLE AT SECTOR 3
PATROL ENDED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int obstacle;
    cin >> obstacle;

    for (int sector = 1; sector <= 5; sector++) {
        if (sector == obstacle) {
            cout << "OBSTACLE AT SECTOR " << sector << endl;
            break;
        } else {
            cout << "SECTOR " << sector << " CLEARED" << endl;
        }
    }
    cout << "PATROL ENDED" << endl;

    return 0;
}
```

*Requires tokens:* `for, if, break;`
*Hint:* Use `if (sector == obstacle) { cout << "OBSTACLE AT SECTOR " << sector << endl; break; } else { ... }`.
*Solution Note:* With obstacle at 3, sectors 1 and 2 clear successfully, sector 3 prints the obstacle alert, and break terminates the loop.

---

#### Step: continue-skip-iteration [THEORY]
*Eyebrow:* Skipping an iteration
**The continue statement: Jump to next cycle**

While `break` completely abandons the entire loop, `continue` is much gentler:

**It skips only the remainder of the CURRENT iteration!**

When `continue` is reached, execution jumps immediately to the end of the loop body for that single pass:

- In a `for` loop: execution jumps straight to the **update expression** (`i++`), tests the condition, and proceeds with the next iteration.

- In a `while` loop: execution jumps straight to the **condition check**.

!> **The while-continue trap.** If you call `continue` in a `while` loop before incrementing your counter variable, the counter is never updated, creating an infinite loop! Always ensure the counter variable is updated before `continue` runs.

**Code Comparison:**
```cpp
for (int s = 1; s <= 5; s++) {
    if (s == 3) continue; // clean guard clause
    cout << s << " ";
}
```
[CORRECT] Clean guard clause: continue skips the remainder of iteration cleanly at the top

```cpp
for (int s = 1; s <= 5; s++) {
    if (s != 3) {
        cout << s << " ";
    }
} // unnecessary indentation level
```
[INCORRECT / TRAP] Inverted if nesting: wrapping the entire body inside an if statement creates unnecessary indentation


---

#### Step: predict-continue-output [PREDICT]
*Eyebrow:* Loop tracing
**Predicting filtered iteration output**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            continue;
        }
        cout << i;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `135`
**Explanation:** When `i` is 2 or 4, `i % 2 == 0` evaluates to true, triggering `continue;` and skipping the `cout` statement. Only odd numbers (1, 3, 5) reach the output line, producing `135`.


---

#### Step: shadow-sector-bypass [EDITOR]
**Shadow sector bypass filter**

**Task:**
Program Sigma's LiDAR scanner to skip shadowed sectors using `continue`:
1. Read shadowed sector number `int shadow` from `cin`.
2. In a `for` loop for `int sector = 1` up to and including `5` (`sector <= 5`):
3. If `sector == shadow`, print `SKIPPING SHADOW SECTOR ` followed by `sector`, a newline, and skip to the next iteration with `continue;`.
4. Print `SCANNING SECTOR ` followed by `sector` and a newline.
5. After the loop completes, print `SCAN COMPLETE` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int shadow;
    cin >> shadow;

    // 1. for loop: int sector = 1; sector <= 5; sector++
    // 2. if sector == shadow: print SKIPPING SHADOW SECTOR <sector> and continue;
    // 3. print: SCANNING SECTOR <sector>
    // 4. after loop: print SCAN COMPLETE

    return 0;
}
```

**Expected Output:**
```
SCANNING SECTOR 1
SKIPPING SHADOW SECTOR 2
SCANNING SECTOR 3
SCANNING SECTOR 4
SCANNING SECTOR 5
SCAN COMPLETE
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int shadow;
    cin >> shadow;

    for (int sector = 1; sector <= 5; sector++) {
        if (sector == shadow) {
            cout << "SKIPPING SHADOW SECTOR " << sector << endl;
            continue;
        }
        cout << "SCANNING SECTOR " << sector << endl;
    }
    cout << "SCAN COMPLETE" << endl;

    return 0;
}
```

*Requires tokens:* `for, if, continue;`
*Hint:* Write `if (sector == shadow) { cout << "SKIPPING SHADOW SECTOR " << sector << endl; continue; }` followed by the regular scanning print.
*Solution Note:* With shadow sector 2, sector 2 triggers the bypass and skips scanning, while sectors 1, 3, 4, and 5 are scanned.

---

#### Step: find-continue-while-trap [CLICKLINE]
**The while-continue infinite loop trap**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sector = 1;
    while (sector <= 5) {
        if (sector == 3) {
            continue;
        }
        cout << "SECTOR: " << sector << endl;
        sector++;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 8
**Explanation:** On line 8, `continue;` jumps immediately back to `while (sector <= 5)`. Because `sector++` on line 11 is skipped, `sector` remains 3 forever! The condition `3 <= 5` stays permanently true, freezing the program in an infinite loop.


---

#### Step: predict-break-vs-continue [PREDICT]
*Eyebrow:* Combined flow control
**Predicting combined break and continue**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int i = 1; i <= 6; i++) {
        if (i == 2) continue;
        if (i == 5) break;
        cout << i;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `134`
**Explanation:** For `i = 1`, prints 1. For `i = 2`, `continue` skips printing. For `i = 3`, prints 3. For `i = 4`, prints 4. For `i = 5`, `break` halts the loop before printing 5 or 6. The output is `134`.


---

#### Step: search-target-beacon [EDITOR] (Optional)
**Bonus challenge: Emergency beacon frequency scanner**

**Task:**
Search frequency channels until an emergency beacon signal is detected:
1. Read the target beacon frequency `int target` from `cin`.
2. In a `for` loop from `int freq = 100` up to and including `104` (`freq <= 104`):
3. If `freq == target`, print `BEACON FOUND AT ` followed by `freq`, a newline, and terminate search with `break;`.
4. Otherwise (`else`), print `SEARCHING ` followed by `freq` and a newline.
5. After the loop completes, print `SEARCH SEQUENCE FINISHED` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int target;
    cin >> target;

    // 1. for loop: int freq = 100; freq <= 104; freq++
    // 2. if freq == target: print BEACON FOUND AT <freq> and break;
    // 3. else: print SEARCHING <freq>
    // 4. after loop: print SEARCH SEQUENCE FINISHED

    return 0;
}
```

**Expected Output:**
```
SEARCHING 100
SEARCHING 101
BEACON FOUND AT 102
SEARCH SEQUENCE FINISHED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int target;
    cin >> target;

    for (int freq = 100; freq <= 104; freq++) {
        if (freq == target) {
            cout << "BEACON FOUND AT " << freq << endl;
            break;
        } else {
            cout << "SEARCHING " << freq << endl;
        }
    }
    cout << "SEARCH SEQUENCE FINISHED" << endl;

    return 0;
}
```

*Requires tokens:* `for, if, break;`
*Hint:* Use `if (freq == target) { cout << "BEACON FOUND AT " << freq << endl; break; } else { cout << "SEARCHING " << freq << endl; }`.
*Solution Note:* With target 102, frequencies 100 and 101 are searched, 102 triggers the match, and break concludes the search.

---

#### Step: recap [THEORY]
**Mission 15 summary: Loop control mastered**

Congratulations! You now possess full control over loops in C++. Drones Sigma and Delta can dynamically abort hazardous routes with `break` and skip unviable data sectors with `continue`.

| Statement | Effect on current loop | What executes next | Common beginner trap |
| :--- | :--- | :--- | :--- |
| `break;` | Immediately terminates the loop | First statement after loop closing brace `}` | Confusing with `break` in `switch` |
| `continue;` | Skips remainder of current iteration | Loop update (`for`) or condition test (`while`) | Skipping counter increment in `while` -> freeze |

Next, in Chapter 16, awaits Block 2's grand finale: **PRAKTIKUMS: skenēšanas cikls**! We will synthesize every looping construct (`while`, `do-while`, `for`, `break`, `continue`) into a complete autonomous sector mapping mission.


---


# Lesson 16 · PRACTICUM: Sector scanning loop
**Slug:** `practicum-scan` | **Module:** Block 2 · Decisions

#### Step: scan-architecture [THEORY]
*Eyebrow:* Practicum architecture
**Autonomous sector scanning loop**

Welcome to the **Block 2 Capstone Practicum**. Because Earth transmission latency ranges from 3 to 22 minutes, Scout drone Sigma and Surveyor drone Delta must survey the rugged Mawrth Vallis canyon corridor entirely autonomously.

An autonomous scanning cycle combines all three loop constructs and loop control statements learned across Block 2 into a robust multi-phase state machine:

- **Pre-flight calibration (`while` / `do-while`):** The drone stabilizes its inertial sensors and waits for telemetry handshake before takeoff.

- **Grid tier traversal (`for`):** The flight computer sweeps through predetermined altitude tiers and waypoint coordinates.

- **Stream noise rejection (`continue`):** Unreadable shadowed terrain readings or low-intensity noise packets are skipped without stalling the sweep.

- **Emergency hazard override (`break`):** Sensor faults, critical rockfalls, or thermal spikes immediately terminate the sweep and preserve flight telemetry.

Let us integrate these components step by step to build the complete autonomous canyon survey engine.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. High above the rugged rust-crimson Mawrth Vallis canyon corridor at solar noon. In the sky, Scout drone Sigma (sleek carbon-slate faceted fuselage, glowing amber maneuvering thrusters) and Surveyor drone Delta (heavy-lift twin ducted fan shrouds, prominent LiDAR dome) fly in synchronized formation along a flight path. Below them, glowing aged-brass sensor grid scanlines project across the stepped canyon terraces and red-orange rock outcrops, mapping terrain sectors. In the mobile field control bunker in the foreground, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, monitors telemetry grids across dual panoramic tactical screens. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and single accents of aged brass #B99A61 on sensor scanlines and muted sage #7FB3A3 on flight vector displays.


---

#### Step: predict-composite-scan [PREDICT]
*Eyebrow:* Loop tracing
**Predict composite loop output**

Trace the execution of this composite sector scan loop combining `continue` and `break`.

Determine the final value of `valid_points` printed by the program.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int valid_points = 0;
    for (int sector = 1; sector <= 6; sector++) {
        if (sector == 2) {
            continue;
        }
        if (sector == 5) {
            break;
        }
        valid_points++;
    }
    cout << "SECTORS SCANNED: " << valid_points << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `SECTORS SCANNED: 3`

---

#### Step: sensor-warmup-while [EDITOR]
**Inertial gyro calibration loop**

**Task:**
Program Sigma's gyro calibration routine using a `while` loop:
1. Read initial drift `int drift` and step decrease `int step` from `cin`.
2. While `drift > 5`: subtract `step` from `drift` using `drift -= step`, then print `CALIBRATING: ` followed by `drift` and a newline.
3. After the loop terminates, print `SENSOR STABILIZED` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int drift, step;
    cin >> drift >> step;

    // 1. While drift > 5:
    //    subtract step from drift
    //    print CALIBRATING: followed by drift and newline
    // 2. After loop: print SENSOR STABILIZED and newline

    return 0;
}
```

**Expected Output:**
```
CALIBRATING: 15
CALIBRATING: 10
CALIBRATING: 5
SENSOR STABILIZED
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int drift, step;
    cin >> drift >> step;

    while (drift > 5) {
        drift -= step;
        cout << "CALIBRATING: " << drift << endl;
    }
    cout << "SENSOR STABILIZED" << endl;

    return 0;
}
```

*Requires tokens:* `while, >, -=`
*Hint:* Write `while (drift > 5) { drift -= step; cout << "CALIBRATING: " << drift << endl; }` followed by the completion message.
*Solution Note:* With input 20 and 5, drift drops from 20 to 15, 10, and 5. At 5, the condition 5 > 5 is false, terminating calibration.

---

#### Step: elevation-sweep-for [EDITOR]
**Stepped altitude ladder survey**

**Task:**
Program Delta's stepped altitude ladder survey using a `for` loop:
1. Read minimum altitude `int min_alt` and maximum altitude `int max_alt` from `cin`.
2. Maintain an accumulator `int total_samples = 0` initialized to 0.
3. In a `for` loop starting at `int alt = min_alt`, continuing while `alt <= max_alt`, stepping by `alt += 25`: add 10 to `total_samples` using `total_samples += 10`, and print `TIER: ` followed by `alt` and a newline.
4. After the loop completes, print `TOTAL SAMPLES: ` followed by `total_samples` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int min_alt, max_alt;
    cin >> min_alt >> max_alt;

    int total_samples = 0;

    // In for loop from alt = min_alt to max_alt (inclusive), stepping by alt += 25:
    // 1. Add 10 to total_samples
    // 2. Print TIER: followed by alt and newline
    // After loop: print TOTAL SAMPLES: followed by total_samples and newline

    return 0;
}
```

**Expected Output:**
```
TIER: 50
TIER: 75
TIER: 100
TOTAL SAMPLES: 30
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int min_alt, max_alt;
    cin >> min_alt >> max_alt;

    int total_samples = 0;
    for (int alt = min_alt; alt <= max_alt; alt += 25) {
        total_samples += 10;
        cout << "TIER: " << alt << endl;
    }
    cout << "TOTAL SAMPLES: " << total_samples << endl;

    return 0;
}
```

*Requires tokens:* `for, <=, += 25`
*Hint:* Use `for (int alt = min_alt; alt <= max_alt; alt += 25) { total_samples += 10; cout << "TIER: " << alt << endl; }`.
*Solution Note:* For bounds 50 to 100, the loop runs for tiers 50, 75, and 100, accumulating 30 total samples.

---

#### Step: find-scanner-bug [CLICKLINE]
*Eyebrow:* Debugging
**Locate the freeze hazard**

The following while loop was intended to sample sectors 1 through 5 while skipping sector 3.

However, the flight computer enters an infinite freeze when executed. Click on the exact line responsible for the infinite loop.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sample = 1;

    while (sample <= 5) {
        if (sample == 3) {
            continue;
        }
        cout << "SAMPLE " << sample << endl;
        sample++;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 9

---

#### Step: telemetry-sample-dowhile [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble handshake sampling loop**

Surveyor Delta must perform at least one telemetry sampling attempt before checking if the signal lock threshold (>= 50) is reached.

Arrange the code blocks in the correct order to construct a valid `do-while` sampling routine.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `int main() {`
4. `    int attempts = 0;`
5. `    int signal = 10;`
6. `    do {`
7. `        signal += 15;`
8. `        attempts++;`
9. `        cout << "ATTEMPT #" << attempts << " SIGNAL: " << signal << endl;`
10. `    } while (signal < 50);`
11. `    cout << "LOCK ACQUIRED AFTER " << attempts << " TRIES" << endl;`
12. `    return 0;`
13. `}`

---

#### Step: shadow-filter-continue [EDITOR]
**Solar flux noise filter**

**Task:**
Program Sigma's solar panel flux scanner using a `for` loop with `continue`:
1. Read the number of sensor cells `int count` from `cin`.
2. Maintain an accumulator `int active_power = 0` initialized to 0.
3. In a `for` loop from `i = 1` up to and including `count` (`i <= count`): read an integer `reading` from `cin`.
4. If `reading < 20`, skip the rest of the current iteration using `continue`.
5. Otherwise, add `reading` to `active_power` using `active_power += reading` and print `CELL #` followed by `i` and `: VALID` on a new line.
6. After the loop finishes, print `ACTIVE POWER: ` followed by `active_power` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int count;
    cin >> count;

    int active_power = 0;

    // In for loop i = 1 to count:
    // 1. Read reading from cin
    // 2. If reading < 20 -> continue
    // 3. Otherwise: add reading to active_power, print CELL # followed by i and ": VALID"
    // After loop: print ACTIVE POWER: followed by active_power and newline

    return 0;
}
```

**Expected Output:**
```
CELL #2: VALID
CELL #4: VALID
ACTIVE POWER: 75
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int count;
    cin >> count;

    int active_power = 0;
    for (int i = 1; i <= count; i++) {
        int reading;
        cin >> reading;
        if (reading < 20) {
            continue;
        }
        active_power += reading;
        cout << "CELL #" << i << ": VALID" << endl;
    }
    cout << "ACTIVE POWER: " << active_power << endl;

    return 0;
}
```

*Requires tokens:* `for, continue, < 20`
*Hint:* Inside the loop: `cin >> reading; if (reading < 20) { continue; } active_power += reading; cout << "CELL #" << i << ": VALID" << endl;`.
*Solution Note:* Readings 10 and 15 are skipped by continue, while 45 and 30 are accumulated, yielding 75 total power.

---

#### Step: thermal-spike-break [EDITOR]
**Corridor thermal abort safeguard**

**Task:**
Program Sigma's thermal hazard safeguard using a `for` loop with `break`:
1. Read the maximum number of scan sectors `int max_sectors` from `cin`.
2. Maintain a counter `int completed = 0` initialized to 0.
3. In a `for` loop from sector `s = 1` up to and including `max_sectors` (`s <= max_sectors`): read integer temperature `temp` from `cin`.
4. If `temp >= 100`: print `THERMAL SPIKE AT SECTOR ` followed by `s` and a newline, then immediately terminate the loop with `break`.
5. Otherwise: increment `completed++` and print `SECTOR ` followed by `s` and `: NOMINAL` on a new line.
6. After the loop, print `COMPLETED SECTORS: ` followed by `completed` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int max_sectors;
    cin >> max_sectors;

    int completed = 0;

    // In for loop s = 1 to max_sectors:
    // 1. Read temp from cin
    // 2. If temp >= 100: print THERMAL SPIKE AT SECTOR followed by s and newline, then break
    // 3. Otherwise: completed++, print SECTOR followed by s and ": NOMINAL"
    // After loop: print COMPLETED SECTORS: followed by completed and newline

    return 0;
}
```

**Expected Output:**
```
SECTOR 1: NOMINAL
SECTOR 2: NOMINAL
THERMAL SPIKE AT SECTOR 3
COMPLETED SECTORS: 2
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int max_sectors;
    cin >> max_sectors;

    int completed = 0;
    for (int s = 1; s <= max_sectors; s++) {
        int temp;
        cin >> temp;
        if (temp >= 100) {
            cout << "THERMAL SPIKE AT SECTOR " << s << endl;
            break;
        }
        completed++;
        cout << "SECTOR " << s << ": NOMINAL" << endl;
    }
    cout << "COMPLETED SECTORS: " << completed << endl;

    return 0;
}
```

*Requires tokens:* `for, break, completed++`
*Hint:* Check `if (temp >= 100) { cout << "THERMAL SPIKE AT SECTOR " << s << endl; break; }` before incrementing `completed`.
*Solution Note:* When sector 3 registers 108 deg C, the loop logs the thermal spike and terminates immediately, logging 2 completed sectors.

---

#### Step: predict-sector-grid [PREDICT]
*Eyebrow:* Nested loop tracing
**Predict 2D grid scan trace**

Predict the output of this nested coordinate sweep simulating a two-dimensional canyon scan pass.

Pay careful attention to which coordinate points are skipped by the inner loop's `continue`.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    for (int zone = 1; zone <= 2; zone++) {
        for (int p = 1; p <= 3; p++) {
            if (p == 2) {
                continue;
            }
            cout << "Z" << zone << "-P" << p << " ";
        }
    }
    cout << "DONE" << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `Z1-P1 Z1-P3 Z2-P1 Z2-P3 DONE`

---

#### Step: capstone-sector-scanner [EDITOR]
**Autonomous sector scanner engine**

**Task:**
Program the complete autonomous canyon sector scanner for Sigma and Delta:
1. Read the total number of survey waypoints `int n` from `cin`.
2. Initialize three tracking variables: `int valid_points = 0`, `int total_telemetry = 0`, `int max_signal = 0`.
3. In a `for` loop from `i = 1` up to and including `n` (`i <= n`): read integer `signal` from `cin`.
4. If `signal < 0`: print `CRITICAL FAILURE AT POINT ` followed by `i` and a newline, then immediately abort the loop with `break`.
5. If `signal == 0`: print `POINT ` followed by `i` and `: SHADOW SKIPPED` on a new line, then skip to the next iteration with `continue`.
6. Otherwise (valid signal): increment `valid_points++`, add `signal` to `total_telemetry`, and if `signal > max_signal` update `max_signal = signal`; then print `POINT ` followed by `i` and `: SIGNAL ` followed by `signal` on a new line.
7. After the loop completes, print the three summary metrics on separate lines: `VALID POINTS: ` followed by `valid_points`, `TOTAL TELEMETRY: ` followed by `total_telemetry`, and `PEAK SIGNAL: ` followed by `max_signal`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int valid_points = 0;
    int total_telemetry = 0;
    int max_signal = 0;

    // Capstone Project: Autonomous Sector Scanner
    // 1. For each waypoint i from 1 to n:
    //    Read signal from cin
    //    If signal < 0 -> print CRITICAL FAILURE AT POINT i and break
    //    If signal == 0 -> print POINT i: SHADOW SKIPPED and continue
    //    Otherwise -> valid_points++, total_telemetry += signal,
    //                 if signal > max_signal then max_signal = signal,
    //                 print POINT i: SIGNAL followed by signal
    // 2. After loop, print the three mission summary lines:
    //    VALID POINTS: valid_points
    //    TOTAL TELEMETRY: total_telemetry
    //    PEAK SIGNAL: max_signal

    return 0;
}
```

**Expected Output:**
```
POINT 1: SIGNAL 12
POINT 2: SHADOW SKIPPED
POINT 3: SIGNAL 45
POINT 4: SIGNAL 28
POINT 5: SHADOW SKIPPED
VALID POINTS: 3
TOTAL TELEMETRY: 85
PEAK SIGNAL: 45
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int valid_points = 0;
    int total_telemetry = 0;
    int max_signal = 0;

    for (int i = 1; i <= n; i++) {
        int signal;
        cin >> signal;
        if (signal < 0) {
            cout << "CRITICAL FAILURE AT POINT " << i << endl;
            break;
        }
        if (signal == 0) {
            cout << "POINT " << i << ": SHADOW SKIPPED" << endl;
            continue;
        }
        valid_points++;
        total_telemetry += signal;
        if (signal > max_signal) {
            max_signal = signal;
        }
        cout << "POINT " << i << ": SIGNAL " << signal << endl;
    }

    cout << "VALID POINTS: " << valid_points << endl;
    cout << "TOTAL TELEMETRY: " << total_telemetry << endl;
    cout << "PEAK SIGNAL: " << max_signal << endl;

    return 0;
}
```

*Requires tokens:* `for, break, continue, total_telemetry +=, valid_points++`
*Hint:* Handle the `signal < 0` abort first, then `signal == 0` continue, then accumulate valid metrics.
*Solution Note:* This program combines counting, filtering, emergency exit, accumulation, and peak tracking in a single autonomous flight loop.

---

#### Step: recap [THEORY]
*Eyebrow:* Block 2 completion
**Block 2 summary: Decision architecture complete**

Congratulations! You have completed **Block 2: LĒMUMI (Decisions)**. With branching and loops mastered, your drones can now execute complex, autonomous mission protocols without human intervention.

Here is the complete navigation decision matrix of C++ control structures:

| Construct | Primary aerospace role | Header / Condition | Loop control tools |
| :--- | :--- | :--- | :--- |
| `if / else` | Range checks, telemetry safety gates | `if (wind > 20)` | `&&`, `\|\|`, `!` |
| `switch / case` | Discrete command code dispatching | `switch (command)` | `case 'L':`, `break;` |
| `while` | Indefinite wait (sensor warm-up, polling) | `while (drift > 5)` | Pre-check, caution with `continue` |
| `do-while` | Guaranteed >= 1 pass (handshake sampling) | `do { } while (retry)` | Post-check, trailing semicolon `;` |
| `for` | Deterministic bounds (waypoints, ladders) | `(init; cond; update)` | `break` aborts, `continue` advances |


> **Looking ahead to Block 3: DATI (Data).**

> Processing individual readings in a stream works well, but what happens when Delta must store 10,000 elevation samples, analyze past terrain contours, or sort sensor readings? In **Chapter 17: Masīvi (Arrays)**, we begin storing collections of data in memory.


---
