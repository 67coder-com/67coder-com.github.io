# Course: C++ Programming — Mission IRIS (67coder)
## Block 3: Block 3 · Data (EN)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 17 to 24.*

---


# Lesson 17 · Arrays
**Slug:** `arrays` | **Module:** Block 3 · Data

#### Step: why-arrays [THEORY]
*Eyebrow:* Data collection architecture
**Why flight computers need arrays**

Welcome to **Block 3: DATI (Data)**. Heavy cargo drone **KRAVAS 'Omega'** has touched down on the landing terrace of Base IRIS. Designed for transporting massive geological core samples and heavy life-support pods, Omega deploys sequential sensor arrays across the Martian terrain.

Consider logging temperature readings from 5 separate external sensors during a Martian sol. Without arrays, you would have to declare and read each sensor as an individual, isolated variable:

```cpp
int t0;
int t1;
int t2;
int t3;
int t4;

cin >> t0;
cin >> t1;
cin >> t2;
cin >> t3;
cin >> t4;
```

If the sensor grid expands to 24, 100, or 1,000 readings, separate variables become completely unmanageable. You cannot loop over distinct variable names `t0`, `t1`, `t2` with a `for` loop, because variable names cannot be calculated at runtime.

An **array** solves this fundamentally. An array is a data structure that groups a fixed sequence of elements of the same data type into one contiguous (unbroken) block of computer memory (RAM):

- All elements in an array share a **single common name**.

- Elements are placed strictly one after another in consecutive memory cells.

- Every element is instantly accessible in $O(1)$ constant time by its numerical position—its **index** (offset from the start).

The basic declaration syntax requires the element type, the array identifier, and the fixed capacity in square brackets:

```cpp
type name[SIZE];
```

For example, allocating storage for Omega's 5 temperature readings in one line:

```cpp
int temps[5]; // Allocates 5 consecutive integer cells in memory
```

Now the flight computer can process every measurement systematically using a single counter loop.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On the heavy reinforced landing terrace of Mars Base IRIS at dusk. The newly introduced heavy cargo drone KRAVAS 'Omega' (powerful industrial matte slate/graphite hexagonal airframe, reinforced landing skids, heavy ducted lift rotors, ventral container clamp holding a cylindrical geological sample pod with glowing amber status LEDs) rests on the pad. In the Martian sky above, scout drone Sigma hovers in holding pattern. Across the foreground landing pad surface, five glowing aged-brass linear sensor markers lie arranged in a neat sequential memory-strip row, logging surface temperatures. Inside the observation outpost, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, inspects a holographic 1D data array on the tactical terminal. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, amber LEDs / sensor marker beams aged brass #B99A61, and holographic array grid muted sage #7FB3A3.


---

#### Step: array-syntax-and-index [THEORY]
*Eyebrow:* Syntax and indexing
**Declaring and indexing arrays**

To declare an array in C++, specify the element type, array name, and number of elements in square brackets `[SIZE]`:

```cpp
int temps[5] = {-55, -40, -12, -30, -50};
```

Here, `int` is the type of every element, `temps` is the array name, and `[5]` specifies the fixed capacity. The curly braces `{...}` provide initial values for each cell.

C++ uses **zero-based indexing**. The first element is always located at index `0`:

- `temps[0]` is `-55` (first sample at offset 0)

- `temps[1]` is `-40` (second sample)

- `temps[4]` is `-50` (fifth and final sample)

!> **The off-by-one boundary rule.** In an array of size `N`, valid indices are strictly `0` through `N - 1`. `temps[5]` does NOT exist! Accessing `temps[5]` reads unallocated memory outside the array (undefined behavior). In aerospace flight software, boundary overruns can corrupt adjacent telemetry memory.

To traverse (visit every element of) an array, always use a `for` loop starting at index `0` with the strict inequality `< SIZE`:

```cpp
for (int i = 0; i < 5; i++) {
    cout << temps[i] << endl;
}
```

Because the condition is `i < 5`, the counter loop executes for `i = 0, 1, 2, 3, 4` and halts immediately when `i` reaches `5`, safely avoiding any out-of-bounds memory read.

**Code Comparison:**
```cpp
int temps[5] = {-55, -40, -12, -30, -50};

for (int i = 0; i < 5; i++) {
    cout << temps[i] << endl;
}
```
[CORRECT] Valid array indexing: indices run strictly from 0 to SIZE - 1

```cpp
int temps[5] = {-55, -40, -12, -30, -50};

// TRAP: index 5 is OUT OF BOUNDS!
for (int i = 0; i <= 5; i++) {
    cout << temps[i] << endl;
}
```
[CORRECT] Dangerous out-of-bounds trap: index 5 does not exist in a 5-element array


---

#### Step: predict-array-index [PREDICT]
*Eyebrow:* Memory tracing
**Trace array element modification**

Trace this array program where an element is updated by index.

Determine the final sum printed to the console.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int log[4] = {10, 25, 30, 45};
    log[1] = 90;
    cout << log[0] + log[1] << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `100`

---

#### Step: array-loop-traversal [EDITOR]
**Sensor array input and traversal**

**Task:**
Program Omega's 4-channel thermal logger using an array and `for` loops:
1. Declare an integer array of size 4: `int temps[4];`.
2. In a first `for` loop from `i = 0` to `i < 4`: read `temps[i]` from `cin`.
3. In a second `for` loop from `i = 0` to `i < 4`: print `SENSOR #` followed by `i`, `: `, `temps[i]`, and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int temps[4];

    // 1. In for loop from i = 0 to i < 4:
    //    read temps[i] from cin
    // 2. In second for loop from i = 0 to i < 4:
    //    print SENSOR # followed by i, ": " and temps[i] and newline

    return 0;
}
```

**Expected Output:**
```
SENSOR #0: -55
SENSOR #1: -40
SENSOR #2: -12
SENSOR #3: -30
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int temps[4];

    for (int i = 0; i < 4; i++) {
        cin >> temps[i];
    }

    for (int i = 0; i < 4; i++) {
        cout << "SENSOR #" << i << ": " << temps[i] << endl;
    }

    return 0;
}
```

*Requires tokens:* `temps[4], temps[i]`
*Hint:* Write `for (int i = 0; i < 4; i++) { cin >> temps[i]; }` followed by a second loop that outputs `"SENSOR #" << i << ": " << temps[i] << endl;`.
*Solution Note:* Looping with index i from 0 to 3 accesses all 4 elements in order.

---

#### Step: find-out-of-bounds-bug [CLICKLINE]
*Eyebrow:* Debugging
**Identify out-of-bounds access**

This telemetry loop attempts to print 4 values from an array.

However, it contains a critical boundary bug that reads memory outside the array. Click on the line containing the error.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int telemetry[4] = {100, 200, 300, 400};

    for (int i = 0; i <= 4; i++) {
        cout << telemetry[i] << " ";
    }
    cout << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7

---

#### Step: assemble-array-sum [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble array accumulator**

Heavy cargo drone Omega carries 3 sample containers. We need to calculate the total cargo mass.

Arrange the code blocks in correct order to traverse the array and sum all element values into `total_mass`.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `int main() {`
4. `    int cargo_weights[3] = {120, 250, 180};`
5. `    int total_mass = 0;`
6. `    for (int i = 0; i < 3; i++) {`
7. `        total_mass += cargo_weights[i];`
8. `    }`
9. `    cout << "TOTAL CARGO MASS: " << total_mass << " KG" << endl;`
10. `    return 0;`
11. `}`

---

#### Step: sol-temperature-average [EDITOR]
**Martian sol average temperature**

**Task:**
Program a sol temperature analyzer for Omega's meteorological pod:
1. Declare an array of 5 temperatures: `int sol_temps[5];`.
2. In a `for` loop from `i = 0` to `i < 5`: read `sol_temps[i]` from `cin` and add it to an accumulator `sum`.
3. Compute the integer average: `int avg = sum / 5;`.
4. Print `TOTAL SUM: ` followed by `sum` and a newline.
5. Print `AVERAGE TEMP: ` followed by `avg` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sol_temps[5];
    int sum = 0;

    // 1. In for loop i = 0 to 4: read sol_temps[i] from cin and add to sum
    // 2. Compute integer average: int avg = sum / 5;
    // 3. Print TOTAL SUM: followed by sum and newline
    // 4. Print AVERAGE TEMP: followed by avg and newline

    return 0;
}
```

**Expected Output:**
```
TOTAL SUM: -200
AVERAGE TEMP: -40
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sol_temps[5];
    int sum = 0;

    for (int i = 0; i < 5; i++) {
        cin >> sol_temps[i];
        sum += sol_temps[i];
    }

    int avg = sum / 5;
    cout << "TOTAL SUM: " << sum << endl;
    cout << "AVERAGE TEMP: " << avg << endl;

    return 0;
}
```

*Requires tokens:* `sol_temps[5], / 5`
*Hint:* Initialize `int sum = 0;` before the loop. Inside the loop: `cin >> sol_temps[i]; sum += sol_temps[i];`.
*Solution Note:* For inputs -60, -50, -20, -30, -40, the sum is -200 and integer division by 5 yields -40.

---

#### Step: find-extreme-sensor [EDITOR]
**Find peak sensor temperature**

**Task:**
Find the maximum temperature logged across 4 sensor channels:
1. Read 4 integers from `cin` into an array `int temps[4];`.
2. Initialize `max_temp` with the first element: `int max_temp = temps[0];`.
3. In a `for` loop from `i = 1` to `i < 4`: if `temps[i] > max_temp`, update `max_temp = temps[i]`.
4. Print `MAX TEMP: ` followed by `max_temp` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int temps[4];
    for (int i = 0; i < 4; i++) {
        cin >> temps[i];
    }

    // 1. Initialize max_temp with the first element: int max_temp = temps[0];
    // 2. In for loop i = 1 to i < 4:
    //    if temps[i] > max_temp -> max_temp = temps[i]
    // 3. Print MAX TEMP: followed by max_temp and newline

    return 0;
}
```

**Expected Output:**
```
MAX TEMP: -10
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int temps[4];
    for (int i = 0; i < 4; i++) {
        cin >> temps[i];
    }

    int max_temp = temps[0];
    for (int i = 1; i < 4; i++) {
        if (temps[i] > max_temp) {
            max_temp = temps[i];
        }
    }
    cout << "MAX TEMP: " << max_temp << endl;

    return 0;
}
```

*Requires tokens:* `temps[4], max_temp = temps[0], temps[i] > max_temp`
*Hint:* Always seed `max_temp` with `temps[0]` rather than 0, because Martian temperatures can all be negative!
*Solution Note:* By initializing with temps[0] (-45), values like -10 correctly become the maximum even when all readings are below zero.

---

#### Step: predict-array-search [PREDICT]
*Eyebrow:* Algorithm tracing
**Trace linear search in array**

Trace this linear search algorithm looking for error code `309` in an array of diagnostic codes.

Determine the final value of `found_index` printed by the program.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int codes[5] = {101, 204, 309, 404, 500};
    int found_index = -1;

    for (int i = 0; i < 5; i++) {
        if (codes[i] == 309) {
            found_index = i;
            break;
        }
    }
    cout << "FOUND AT INDEX: " << found_index << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `FOUND AT INDEX: 2`

---

#### Step: cargo-batch-analyzer [EDITOR]
**Cargo container health monitor**

**Task:**
Program Omega's container batch telemetry scanner:
1. Read 5 radiation readings from `cin` into an array `int rad[5];`.
2. In a `for` loop from `i = 0` to `i < 5`: count how many containers have `rad[i] > 50` in a counter `hazardous`.
3. Sum all radiation readings into an accumulator `total_rad`.
4. Find the lowest radiation value in `min_rad` (initialized with `rad[0]`).
5. Print the three metrics on separate lines:
   `HAZARDOUS CONTAINERS: ` followed by `hazardous`,
   `TOTAL RADIATION: ` followed by `total_rad`,
   `LOWEST RADIATION: ` followed by `min_rad`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int rad[5];
    for (int i = 0; i < 5; i++) {
        cin >> rad[i];
    }

    // 1. Maintain hazardous counter (rad[i] > 50)
    // 2. Accumulate total radiation sum
    // 3. Find lowest radiation value (initialize min_rad with rad[0])
    // 4. Print the three metrics:
    //    HAZARDOUS CONTAINERS: count
    //    TOTAL RADIATION: sum
    //    LOWEST RADIATION: min_rad

    return 0;
}
```

**Expected Output:**
```
HAZARDOUS CONTAINERS: 2
TOTAL RADIATION: 260
LOWEST RADIATION: 25
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int rad[5];
    for (int i = 0; i < 5; i++) {
        cin >> rad[i];
    }

    int hazardous = 0;
    int total_rad = 0;
    int min_rad = rad[0];

    for (int i = 0; i < 5; i++) {
        if (rad[i] > 50) {
            hazardous++;
        }
        total_rad += rad[i];
        if (rad[i] < min_rad) {
            min_rad = rad[i];
        }
    }

    cout << "HAZARDOUS CONTAINERS: " << hazardous << endl;
    cout << "TOTAL RADIATION: " << total_rad << endl;
    cout << "LOWEST RADIATION: " << min_rad << endl;

    return 0;
}
```

*Requires tokens:* `rad[5], min_rad = rad[0], rad[i] > 50`
*Hint:* Initialize `int hazardous = 0; int total_rad = 0; int min_rad = rad[0];` then process each element in a single loop.
*Solution Note:* This program combines filtering, accumulation, and extremum search in a single array pass.

---

#### Step: recap [THEORY]
*Eyebrow:* Summary
**Array fundamentals recap**

In this lesson, you learned how C++ stores and processes sequential datasets using **arrays**:

| Array feature | Syntax | Key rule |
| :--- | :--- | :--- |
| **Declaration** | `int temps[5];` | Size must be known at compile time; contiguous in memory |
| **Initialization** | `int data[3] = {10, 20, 30};` | Unspecified elements default to 0 with `{0}` |
| **Zero-based index** | `data[0]` to `data[SIZE - 1]` | First element is at index 0, last is at `SIZE - 1` |
| **Traversal idiom** | `for (int i = 0; i < SIZE; i++)` | Always use strict inequality `< SIZE` to avoid boundary overruns |
| **Boundary safety** | `data[SIZE]` is invalid! | Out-of-bounds access corrupts adjacent memory |


> **Next up: Chapter 18 — Divdimensiju masīvi (2D Arrays).**

> Now that Omega can process linear rows of cargo containers, Surveyor Delta needs two-dimensional grid tables (`int map[rows][cols]`) to map surface terrain and elevation contour matrices.


---


# Lesson 18 · 2D Arrays: Mars Surface Map
**Slug:** `arrays-2d` | **Module:** Block 3 · Data

#### Step: why-2d-arrays [THEORY]
*Eyebrow:* Planetary mapping architecture
**From linear logs to 2D elevation grids**

In Chapter 17, cargo drone Omega logged a 1D linear strip of temperature sensors. But planetary surfaces are two-dimensional expanses defined by latitude and longitude, rows and columns.

To scout landing zones in the Mawrth Vallis crater basin, Surveyor drone **Delta** projects a laser altimeter coordinate grid onto the crater floor. To store an elevation map with 3 rows and 3 columns, a 1D array is awkward.

C++ provides **two-dimensional arrays (2D arrays)**—an array of arrays structured as a table of rows and columns:

```cpp
int map[3][3]; // 3 rows, each containing 3 columns
```

The first dimension specifies the number of **rows** (vertical position), and the second dimension specifies the number of **columns** (horizontal position).

This allows the flight computer to map topological features directly to coordinate pairs `map[row][col]`.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Surveyor drone Delta (heavy-lift twin ducted fan shrouds, prominent forward LiDAR scanner aperture, matte carbon-slate faceted armor with amber thruster glow) flies high above the rugged rust-red Mawrth Vallis crater basin at midday. Delta casts a glowing muted sage-green 3x3 laser matrix grid projection directly onto the stepped rock floor of a prominent crater below, performing digital elevation terrain mapping. In the far distance, scout drone Sigma maneuvers near a canyon cliff. In the foreground inside the mobile observation outpost, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, inspects a holographic 3x3 topographic grid matrix on the tactical terminal. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural armor #151A22, warm sandstone terrain #B7B0A4, mascot and highlights #D8D0C2, amber LEDs / thruster glow #B99A61, and laser elevation grid #7FB3A3.


---

#### Step: matrix-syntax-and-coordinates [THEORY]
*Eyebrow:* Matrix syntax and indices
**Declaring and traversing matrices**

To declare a 2D array in C++, provide two sets of square brackets `[ROWS][COLS]`:

```cpp
int map[2][3] = {
    {10, 20, 30},
    {40, 50, 60}
};
```

Each cell is addressed by its row index `r` and column index `c`: `map[r][c]`.

Both indices are strictly zero-based:

- `map[0][0]` is top-left cell (`10`)

- `map[0][2]` is top-right cell (`30`)

- `map[1][0]` is bottom-left cell (`40`)

- `map[1][2]` is bottom-right cell (`60`)

!> **The nested loop traversal rule.** To traverse an entire matrix, use nested `for` loops. The outer loop controls the row `r` from `0` to `r < ROWS`, while the inner loop controls the column `c` from `0` to `c < COLS`.

> **Memory layout:** C++ stores 2D arrays in row-major order: row 0 is stored contiguously in memory, immediately followed by row 1.

**Code Comparison:**
```cpp
int map[2][3] = {
    {10, 20, 30},
    {40, 50, 60}
};

for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) {
        cout << map[r][c] << " ";
    }
    cout << endl;
}
```
[CORRECT] Correct row-major traversal: outer loop iterates through rows, inner through columns

```cpp
int map[2][3] = {
    {10, 20, 30},
    {40, 50, 60}
};

// TRAP: Row and column limits swapped!
for (int r = 0; r < 3; r++) {
    for (int c = 0; c < 2; c++) {
        cout << map[r][c] << " ";
    }
}
```
[CORRECT] Dangerous bound swapping trap: using column bounds for rows causes out-of-bounds corruption


---

#### Step: predict-matrix-cell [PREDICT]
*Eyebrow:* Memory tracing
**Trace 2D cell modification**

Trace this matrix program where an elevation cell is updated by its row and column coordinates.

Determine the final sum printed to the console.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[2][3] = {
        {10, 20, 30},
        {40, 50, 60}
    };
    grid[1][0] = 90;
    cout << grid[0][2] + grid[1][0] << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `120`

---

#### Step: matrix-nested-traversal [EDITOR]
**Input and print a 2D elevation grid**

**Task:**
Program Delta's elevation grid logger for a 2x3 sector:
1. Declare a 2D integer array with 2 rows and 3 columns: `int grid[2][3];`.
2. In nested `for` loops (outer `r = 0` to `r < 2`, inner `c = 0` to `c < 3`): read `grid[r][c]` from `cin`.
3. In a second pair of nested `for` loops: print `grid[r][c]` followed by a space, and after each row finishes, print a newline (`endl`).

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[2][3];

    // 1. In nested for loops (r = 0 to r < 2, c = 0 to c < 3):
    //    read grid[r][c] from cin
    // 2. In second nested loops:
    //    print grid[r][c] followed by a space
    //    after each row completes, print newline (endl)

    return 0;
}
```

**Expected Output:**
```
10 20 30 
40 50 60 
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[2][3];

    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            cin >> grid[r][c];
        }
    }

    for (int r = 0; r < 2; r++) {
        for (int c = 0; c < 3; c++) {
            cout << grid[r][c] << " ";
        }
        cout << endl;
    }

    return 0;
}
```

*Requires tokens:* `grid[2][3], grid[r][c]`
*Hint:* Put `cout << endl;` inside the outer loop, right after the inner loop finishes printing all columns of that row.
*Solution Note:* The outer loop steps through rows 0 and 1, while the inner loop prints columns 0, 1, and 2 on each line.

---

#### Step: find-matrix-bounds-bug [CLICKLINE]
*Eyebrow:* Debugging
**Spot the column boundary overflow**

This program attempts to print a 2x3 elevation grid.

However, one of the loop conditions contains an off-by-one boundary bug that attempts to access memory outside the matrix. Click on the line with the bug.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int elev[2][3] = {{10, 20, 30}, {40, 50, 60}};

    for (int r = 0; r < 2; r++) {
        for (int c = 0; c <= 3; c++) {
            cout << elev[r][c] << " ";
        }
        cout << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 8

---

#### Step: assemble-matrix-flat-sum [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble 2D grid accumulator**

Delta needs to calculate the total cumulative elevation of a 2x2 crater sector.

Arrange the code blocks in correct order to traverse both rows and columns and sum all cell values into `total`.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `int main() {`
4. `    int grid[2][2] = {{10, 25}, {30, 45}};`
5. `    int total = 0;`
6. `    for (int r = 0; r < 2; r++) {`
7. `        for (int c = 0; c < 2; c++) {`
8. `            total += grid[r][c];`
9. `        }`
10. `    }`
11. `    cout << "GRID SUM: " << total << endl;`
12. `    return 0;`
13. `}`

---

#### Step: crater-peak-search [EDITOR]
**Locate peak crater elevation**

**Task:**
Find the highest topographical peak and its exact coordinates in a 3x3 crater grid:
1. Read 9 integers into a 3x3 matrix `int elev[3][3];` from `cin`.
2. Initialize peak trackers with the top-left cell: `int max_elev = elev[0][0]; int peak_r = 0; int peak_c = 0;`.
3. In nested `for` loops (r from 0 to 2, c from 0 to 2): if `elev[r][c] > max_elev`, update `max_elev = elev[r][c]`, `peak_r = r`, and `peak_c = c`.
4. Print `PEAK ELEVATION: ` followed by `max_elev` and a newline.
5. Print `AT COORDINATES: (` followed by `peak_r`, `, `, `peak_c`, and `)` and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int elev[3][3];
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            cin >> elev[r][c];
        }
    }

    // 1. Initialize max_elev = elev[0][0], peak_r = 0, peak_c = 0
    // 2. In nested loops, if elev[r][c] > max_elev:
    //    update max_elev = elev[r][c], peak_r = r, peak_c = c
    // 3. Print PEAK ELEVATION: max_elev
    // 4. Print AT COORDINATES: (peak_r, peak_c)

    return 0;
}
```

**Expected Output:**
```
PEAK ELEVATION: 250
AT COORDINATES: (1, 1)
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int elev[3][3];
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            cin >> elev[r][c];
        }
    }

    int max_elev = elev[0][0];
    int peak_r = 0;
    int peak_c = 0;

    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            if (elev[r][c] > max_elev) {
                max_elev = elev[r][c];
                peak_r = r;
                peak_c = c;
            }
        }
    }

    cout << "PEAK ELEVATION: " << max_elev << endl;
    cout << "AT COORDINATES: (" << peak_r << ", " << peak_c << ")" << endl;

    return 0;
}
```

*Requires tokens:* `elev[3][3], max_elev = elev[0][0], elev[r][c] > max_elev`
*Hint:* Remember to update both coordinates `peak_r = r; peak_c = c;` whenever a new `max_elev` is discovered.
*Solution Note:* For cell (1, 1) with value 250, the algorithm updates peak trackers and reports the peak coordinates.

---

#### Step: row-hazard-audit [EDITOR]
**Sector row radiation audit**

**Task:**
Analyze radiation levels row by row across a 3x3 sector grid:
1. Read a 3x3 matrix `int rad[3][3];` from `cin`.
2. For each row `r` from 0 to 2: initialize an accumulator `int row_sum = 0;`.
3. In an inner loop from `c = 0` to `c < 3`: add `rad[r][c]` to `row_sum`.
4. After each row's inner loop finishes, print `ROW #` followed by `r`, `: SUM `, `row_sum`, and a newline.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int rad[3][3];
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            cin >> rad[r][c];
        }
    }

    // For each row r from 0 to 2:
    // 1. Initialize row_sum = 0
    // 2. Loop through columns c from 0 to 2 and add rad[r][c] to row_sum
    // 3. Print ROW # followed by r, ": SUM " and row_sum

    return 0;
}
```

**Expected Output:**
```
ROW #0: SUM 60
ROW #1: SUM 150
ROW #2: SUM 240
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int rad[3][3];
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            cin >> rad[r][c];
        }
    }

    for (int r = 0; r < 3; r++) {
        int row_sum = 0;
        for (int c = 0; c < 3; c++) {
            row_sum += rad[r][c];
        }
        cout << "ROW #" << r << ": SUM " << row_sum << endl;
    }

    return 0;
}
```

*Requires tokens:* `rad[3][3], row_sum = 0, row_sum +=`
*Hint:* Place `int row_sum = 0;` inside the outer loop so it resets to zero before processing each new row.
*Solution Note:* Resetting the accumulator per row calculates independent sums for each of the 3 terrain sectors.

---

#### Step: predict-matrix-diagonal [PREDICT]
*Eyebrow:* Matrix algorithms
**Trace diagonal transect slice**

Topographical transects across a crater often examine the diagonal profile where row equals column (`r == c`).

Trace this diagonal accumulator loop and predict the final printed value of `diag_sum`.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int map[3][3] = {
        {5, 1, 2},
        {3, 8, 4},
        {9, 6, 7}
    };
    int diag_sum = 0;
    for (int i = 0; i < 3; i++) {
        diag_sum += map[i][i];
    }
    cout << "DIAGONAL TRANSECT: " << diag_sum << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `DIAGONAL TRANSECT: 20`

---

#### Step: capstone-landing-grid [EDITOR]
**Landing site roughness evaluator**

**Task:**
Program Delta's landing site evaluator for a 3x3 roughness matrix:
1. Read a 3x3 matrix `int grid[3][3];` from `cin` representing terrain roughness values.
2. In nested loops, count how many cells have `grid[r][c] <= 15` in a counter `safe_count`.
3. In the same loops, count how many cells have `grid[r][c] > 50` in a counter `hazard_count`.
4. Track the minimum roughness value across the entire matrix in `min_rough` (initialized with `grid[0][0]`).
5. Print the three summary lines:
   `SAFE SECTORS: ` followed by `safe_count`,
   `HAZARD SECTORS: ` followed by `hazard_count`,
   `BEST LANDING ROUGHNESS: ` followed by `min_rough`.

**Starter Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[3][3];
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            cin >> grid[r][c];
        }
    }

    // 1. Maintain safe_count for cells <= 15
    // 2. Maintain hazard_count for cells > 50
    // 3. Find lowest roughness in min_rough (seed with grid[0][0])
    // 4. Output format:
    //    SAFE SECTORS: safe_count
    //    HAZARD SECTORS: hazard_count
    //    BEST LANDING ROUGHNESS: min_rough

    return 0;
}
```

**Expected Output:**
```
SAFE SECTORS: 4
HAZARD SECTORS: 3
BEST LANDING ROUGHNESS: 5
```

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[3][3];
    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            cin >> grid[r][c];
        }
    }

    int safe_count = 0;
    int hazard_count = 0;
    int min_rough = grid[0][0];

    for (int r = 0; r < 3; r++) {
        for (int c = 0; c < 3; c++) {
            if (grid[r][c] <= 15) {
                safe_count++;
            }
            if (grid[r][c] > 50) {
                hazard_count++;
            }
            if (grid[r][c] < min_rough) {
                min_rough = grid[r][c];
            }
        }
    }

    cout << "SAFE SECTORS: " << safe_count << endl;
    cout << "HAZARD SECTORS: " << hazard_count << endl;
    cout << "BEST LANDING ROUGHNESS: " << min_rough << endl;

    return 0;
}
```

*Requires tokens:* `grid[3][3], min_rough = grid[0][0], grid[r][c] <= 15`
*Hint:* Initialize counters before the loops: `int safe_count = 0; int hazard_count = 0; int min_rough = grid[0][0];`.
*Solution Note:* This program evaluates landing feasibility by scanning 9 sector zones in a single 2D matrix pass.

---

#### Step: recap [THEORY]
*Eyebrow:* Summary
**2D arrays summary: Coordinate matrices in C++**

In this chapter, you expanded your data modeling capabilities to two dimensions:

| Concept | Syntax | Aerospace application |
| :--- | :--- | :--- |
| **Declaration** | `int map[ROWS][COLS];` | Fixed topological grid tables |
| **Initialization** | `{ {1, 2}, {3, 4} }` | Predefined calibration matrices |
| **Coordinate access** | `map[r][c]` | Row `r` is vertical index, col `c` is horizontal index |
| **Nested traversal** | `for (r...) for (c...)` | Systematic surface scanning and rasterization |
| **Diagonal slice** | `map[i][i]` | Cross-sectional crater transects |


> **Next up: Chapter 19 — std::vector (Dynamic Arrays).**

> Fixed arrays require sizes to be known at compile time. But as Sigma and Delta explore unknown terrain, waypoint paths grow unpredictably. In Chapter 19, we unlock dynamic resizable arrays with `std::vector`.


---


# Lesson 19 · vector
**Slug:** `vector` | **Module:** Block 3 · Data

#### Step: why-vector [THEORY]
*Eyebrow:* Dynamic data architecture
**Why flight computers need dynamic arrays**

In previous missions, we stored telemetry in fixed arrays such as `int temps[5]` and `int map[3][3]`. Static arrays are fast and predictable, but they require knowing the exact element count at compile time.

Now Scout drone **IZLŪKS 'Sigma'** enters uncharted volcanic lava tubes beneath Mawrth Vallis. As Sigma navigates subterranean chasms, its lidar logs navigational beacon coordinates dynamically. Before entering the chasm, the flight computer cannot know whether the route will require 4 waypoints, 85 waypoints, or 300 waypoints.

If you declare a static array `int path[50];`, finding 51 waypoints will crash your program or corrupt critical memory. Conversely, reserving `int path[10000];` wastes valuable RAM if only 5 waypoints are detected.

C++ solves this with the dynamic array container: `std::vector` (provided by `#include <vector>`):

- **Dynamic capacity.** A vector starts empty and automatically expands in computer memory as new elements are added.

- **Contiguous storage.** Just like a traditional array, vector elements are stored in consecutive memory cells, granting instant $O(1)$ indexed access.

- **Self-tracking size.** A vector knows its own element count at all times via `.size()`.


---

#### Step: vector-syntax-and-push [THEORY]
*Eyebrow:* Syntax and operations
**Declaring vectors and appending with push_back**

To use vectors, include the `<vector>` library header. The declaration specifies the element type inside angle brackets `<type>`:

```cpp
#include <vector>
using namespace std;

vector<int> waypoints; // Creates an empty vector of integers (size is 0)
```

To append an element to the end of the vector, call the `.push_back(value)` member function:

```cpp
waypoints.push_back(120); // Adds 120 at index 0 (size becomes 1)
waypoints.push_back(180); // Adds 180 at index 1 (size becomes 2)
```

You can inspect the current count of elements using `.size()`, and access elements with familiar array brackets `[i]`:

```cpp
cout << waypoints.size(); // Prints: 2
cout << waypoints[0];      // Prints: 120
```

!> **The empty vector indexing trap.** When a vector is declared without an initial size (`vector<int> v;`), it contains **0 elements**. Writing `v[0] = 50;` is illegal out-of-bounds access! Always populate empty vectors using `.push_back()`, which allocates memory for the new element before writing to it.

**Code Comparison:**
```cpp
#include <vector>
using namespace std;

vector<int> v;
v.push_back(10);
v.push_back(20);
// v.size() is now 2
```
[CORRECT] Correct dynamic growth: push_back dynamically appends elements to vector

```cpp
#include <vector>
using namespace std;

vector<int> v;
v[0] = 10; // Crash!
// Empty vector has size 0,
// index 0 does not exist yet
```
[INCORRECT / TRAP] Undefined memory access: writing to index 0 of an empty vector crashes


---

#### Step: predict-vector-push [PREDICT]
*Eyebrow:* State tracing
**Trace vector growth and pop_back**

Trace the execution of this navigational waypoint logger.

Determine the final output printed to the terminal console.

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> waypoints;
    waypoints.push_back(100);
    waypoints.push_back(250);
    waypoints.push_back(400);
    waypoints.pop_back();
    waypoints.push_back(350);

    cout << waypoints.size() << " " << waypoints[1] << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `3 250
`
**Explanation:** Initially, `waypoints` receives 100, 250, and 400 (size 3). Then `pop_back()` removes the last element (400), reducing the size to 2. Next, `push_back(350)` adds 350 to the end. The vector now holds `[100, 250, 350]` with `size() == 3`. Index 1 holds `250`. Output is `3 250`.


---

#### Step: vector-input-loop [EDITOR]
**Lidar elevation stream logger**

**Task:**
Program Scout drone Sigma's dynamic elevation logger:
1. Read sample count `int n` from `cin`.
2. Declare an empty integer vector `vector<int> elevations;`.
3. In a `for` loop running `n` times: read `int val` from `cin` and append it to `elevations` using `elevations.push_back(val);`.
4. In a second `for` loop from `i = 0` to `i < elevations.size()`: print `ELEVATION #` followed by `i`, `: `, `elevations[i]`, and a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> elevations;
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        elevations.push_back(val);
    }

    for (int i = 0; i < elevations.size(); i++) {
        cout << "ELEVATION #" << i << ": " << elevations[i] << endl;
    }

    return 0;
}
```

*Hint:* Declare `vector<int> elevations;` before the input loop. In the second loop, use `elevations.size()` to iterate safely through all elements.
*Solution Note:* Using push_back allows the vector to accommodate any input size n dynamically.

---

#### Step: find-vector-size-bug [CLICKLINE]
*Eyebrow:* Boundary debugging
**Identify out-of-bounds vector loop**

This program initializes a 3-element coordinate vector and attempts to print each coordinate.

However, the loop condition causes a boundary crash on the final pass. Click on the line containing the bug.

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> coords = {12, 45, 78};
    for (int i = 0; i <= coords.size(); i++) {
        cout << coords[i] << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 uses `i <= coords.size()`. In a vector with 3 elements, `coords.size()` is 3, so valid indices are strictly 0, 1, and 2. When `i` reaches 3, `coords[3]` accesses out-of-bounds memory! The condition should use strict inequality `i < coords.size()`.


---

#### Step: assemble-vector-filter [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble telemetry threshold filter**

Sigma has recorded raw sensor measurements, including negative noise readings. We need to filter and store only positive samples in a new vector `valid_data`.

Arrange the code blocks in correct order to scan `raw`, append positive readings into `valid_data`, and output the count of valid samples.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <vector>`
3. `using namespace std;`
4. `int main() {`
5. `    vector<int> raw = {-15, 20, -5, 45, 80};`
6. `    vector<int> valid_data;`
7. `    for (int i = 0; i < raw.size(); i++) {`
8. `        if (raw[i] > 0) {`
9. `            valid_data.push_back(raw[i]);`
10. `        }`
11. `    }`
12. `    cout << "VALID SAMPLES: " << valid_data.size() << endl;`
13. `    return 0;`
14. `}`

---

#### Step: vector-sum-and-peak [EDITOR]
**Seismic signal peak and sum analyzer**

**Task:**
Program Sigma's acoustic echo processor:
1. Read total signal count `int count` from `cin`.
2. Read `count` integers into a `vector<int> signals;` using `.push_back()`.
3. In a `for` loop, compute the `sum` of all elements in `signals`.
4. In the same loop or a second pass, find the peak reading `max_signal` (initialized to `signals[0]`).
5. Print `TOTAL SIGNAL: ` followed by `sum` and a newline.
6. Print `PEAK SIGNAL: ` followed by `max_signal` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int count;
    cin >> count;

    vector<int> signals;
    for (int i = 0; i < count; i++) {
        int s;
        cin >> s;
        signals.push_back(s);
    }

    int sum = 0;
    int max_signal = signals[0];

    for (int i = 0; i < signals.size(); i++) {
        sum += signals[i];
        if (signals[i] > max_signal) {
            max_signal = signals[i];
        }
    }

    cout << "TOTAL SIGNAL: " << sum << endl;
    cout << "PEAK SIGNAL: " << max_signal << endl;

    return 0;
}
```

*Hint:* Initialize `int sum = 0;` and `int max_signal = signals[0];`. Iterate from `i = 0` to `i < signals.size()` updating both.
*Solution Note:* By initializing max_signal with signals[0], the peak detection works correctly even with negative readings.

---

#### Step: predict-vector-empty [PREDICT]
*Eyebrow:* Container inspection
**Vector empty status and stack operations**

Trace this program utilizing `.empty()` and `.pop_back()` on a sensor stack.

Determine the exact string output printed to the console.

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> stack;
    stack.push_back(5);
    stack.push_back(15);
    stack.pop_back();

    if (!stack.empty()) {
        cout << "ACTIVE " << stack.size() << " VAL " << stack[0] << endl;
    } else {
        cout << "EMPTY" << endl;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `ACTIVE 1 VAL 5
`
**Explanation:** The stack pushes 5 and 15, then `pop_back()` removes 15. The vector now holds only `[5]`. The condition `!stack.empty()` is true because the vector contains 1 element. It outputs `ACTIVE `, `stack.size()` (1), ` VAL `, and `stack[0]` (5), printing `ACTIVE 1 VAL 5`.


---

#### Step: drone-flight-path-logger [EDITOR]
**Sigma canyon trajectory audit**

**Task:**
Program an autonomous canyon flight path auditor for Scout drone Sigma:
1. Read number of waypoints `int n` from `cin`.
2. In a loop, read `n` altitude values into `vector<int> altitudes;` using `.push_back()`.
3. Initialize counter `int high_altitude_count = 0;` and accumulator `int total_alt = 0;`.
4. In a `for` loop over `altitudes`: add each altitude to `total_alt`, and if `altitudes[i] >= 100`, increment `high_altitude_count`.
5. Print `WAYPOINTS LOGGED: ` followed by `altitudes.size()` and a newline.
6. Print `TOTAL ALTITUDE: ` followed by `total_alt` and a newline.
7. Print `HIGH ALTITUDE FIXES: ` followed by `high_altitude_count` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;

    vector<int> altitudes;
    for (int i = 0; i < n; i++) {
        int alt;
        cin >> alt;
        altitudes.push_back(alt);
    }

    int high_altitude_count = 0;
    int total_alt = 0;

    for (int i = 0; i < altitudes.size(); i++) {
        total_alt += altitudes[i];
        if (altitudes[i] >= 100) {
            high_altitude_count++;
        }
    }

    cout << "WAYPOINTS LOGGED: " << altitudes.size() << endl;
    cout << "TOTAL ALTITUDE: " << total_alt << endl;
    cout << "HIGH ALTITUDE FIXES: " << high_altitude_count << endl;

    return 0;
}
```

*Hint:* Read all values with `altitudes.push_back(alt);` first, then run a traversal loop from `i = 0` to `i < altitudes.size()` to accumulate and count.
*Solution Note:* This capstone combines dynamic collection, statistical aggregation, and condition filtering into a single aerospace workflow.

---

#### Step: recap [THEORY]
*Eyebrow:* Summary
**Dynamic vectors recap**

In this mission, you unlocked dynamic memory collections in C++ using `std::vector`:

| Feature | Static array (`int a[N]`) | Dynamic vector (`vector<int> v`) |
| :--- | :--- | :--- |
| **Header** | Built-in | `#include <vector>` |
| **Capacity** | Fixed at compile time | Grows dynamically at runtime |
| **Appending** | Cannot expand | `v.push_back(value)` |
| **Removing** | Cannot shrink | `v.pop_back()` |
| **Size query** | Must track separately | `v.size()` |
| **Emptiness** | No built-in test | `v.empty()` returns `true`/`false` |
| **Index access** | `a[i]` | `v[i]` or safe `v.at(i)` |


> **Next up: Chapter 20 — Funkcijas: pamati (Functions: The Basics).**

> Now that our drones can store and process complex dynamic datasets, our programs are growing longer. In Chapter 20, we modularize our flight computer code into reusable, testable functions with parameters and return values.


---


# Lesson 20 · Functions: the basics
**Slug:** `functions-basics` | **Module:** Block 3 · Data

#### Step: why-functions [THEORY]
*Eyebrow:* Modular avionics
**Why flight computers require functions**

Welcome to **Functions**! As Fleet IRIS expands—with Scout drone Sigma surveying lava tubes, Cartographer Delta mapping ridges, and Cargo drone Omega moving heavy core containers—our flight programs are growing larger and more complex.

Consider computing thruster fuel consumption: `distance * burn_rate`. If you copy and paste this formula across 20 loops and conditionals, your codebase becomes brittle. If an engine engineer modifies the thruster calibration, you must find and edit all 20 locations. If you miss one, the drone miscalculates burn time and risks orbital deviation.

In software engineering, this is solved by **modular decomposition**: breaking large programs into small, independent, named subroutines called **functions**:

- **Write once, execute anywhere.** A function defines a calculation in one authoritative place. Every drone subsystem calls the same verified routine.

- **Information hiding and readability.** Instead of wading through dense math formulas inside `main()`, you read expressive command names: `calculate_fuel(dist, rate)`.

- **Independent testability.** You can test and verify an aerospace calculation in isolation before integrating it into autonomous navigation.


---

#### Step: function-anatomy [THEORY]
*Eyebrow:* Syntax and anatomy
**Anatomy of a C++ function**

A C++ function consists of a **header** (signature) and a **body** enclosed in curly braces `{}`:

```cpp
int calc_fuel(int dist, int rate) {
    return dist * rate;
}
```

Let us examine each structural component:

- **Return type (`int`):** Specifies the data type of the final result sent back to the caller. If the function calculates a number, this might be `int` or `double`. If it checks a condition, it returns `bool`.

- **Function identifier (`calc_fuel`):** The name used to invoke the subroutine.

- **Parameter list (`(int dist, int rate)`):** Input variables that receive data when the function is called. Each parameter must specify its type.

- **The `return` statement:** Evaluates the result expression, hands it back to the caller, and immediately terminates function execution.

> **Calling a function:** In `main()`, you invoke the function by name and pass values in parentheses: `int total = calc_fuel(100, 5);`. The values passed (`100` and `5`) are called **arguments**.

> *Image Alt:* Diagram illustrating C++ function anatomy: definition with return type, identifier, parameter list, body, and call site in main() passing arguments and capturing the returned value.


---

#### Step: predict-function-call [PREDICT]
*Eyebrow:* Execution flow
**Trace function calls and return values**

Trace this program containing two distinct mathematical functions.

Determine the final output printed to the terminal console.

**Code:**
```cpp
#include <iostream>
using namespace std;

int square(int x) {
    return x * x;
}

int calc_distance(int speed, int time) {
    return speed * time;
}

int main() {
    int d = calc_distance(10, 4);
    int area = square(5);
    cout << d << " " << area << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `40 25
`
**Explanation:** First, `calc_distance(10, 4)` is called with arguments 10 and 4. It computes `10 * 4 = 40` and returns 40, stored in `d`. Next, `square(5)` is called with argument 5, computing `5 * 5 = 25`, stored in `area`. The program outputs `40 25`.


---

#### Step: write-fuel-function [EDITOR]
**Thruster fuel consumption subroutine**

**Task:**
Program Sigma's modular fuel calculation subroutine:
1. Above `main()`, define a function `int calculate_fuel(int distance, int burn_rate)` that returns `distance * burn_rate`.
2. In `main()`, read `dist` and `rate` from `cin`.
3. Call `calculate_fuel(dist, rate)` and store the result in `fuel_needed`.
4. Print `FUEL REQUIRED: ` followed by `fuel_needed` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int calculate_fuel(int distance, int burn_rate) {
    return distance * burn_rate;
}

int main() {
    int dist, rate;
    cin >> dist >> rate;

    int fuel_needed = calculate_fuel(dist, rate);
    cout << "FUEL REQUIRED: " << fuel_needed << endl;

    return 0;
}
```

*Hint:* Write the function definition before `main()`: `int calculate_fuel(int distance, int burn_rate) { return distance * burn_rate; }`.
*Solution Note:* By isolating calculation logic into a function, fuel math can be reused across all drone flight stages.

---

#### Step: void-function-and-return [THEORY]
*Eyebrow:* Void return type
**Action subroutines with void**

Not all functions calculate and return a numerical answer. Subroutines often perform an action, such as displaying a mission banner, emitting an acoustic warning, or clearing a sensor log.

When a function does not return a value, its return type is declared as **`void`**:

```cpp
void sound_alarm(int code) {
    cout << "ALARM TRIGGERED: " << code << endl;
}
```

Inside a `void` function, you do not write `return <value>;`. You can exit early using a bare `return;` without any value:

```cpp
void test_sensor(int signal) {
    if (signal < 0) {
        return; // Early exit on invalid signal
    }
    cout << "SIGNAL OK: " << signal << endl;
}
```

!> **The void assignment trap.** A `void` function produces no return value. Writing `int x = sound_alarm(404);` will fail to compile because there is no data to assign to `x`!

**Code Comparison:**
```cpp
void log_alert(int code) {
    cout << "ALERT CODE: " << code << endl;
}

int main() {
    log_alert(404); // Correct statement call
}
```
[CORRECT] Valid void invocation: calling a void action subroutine as a standalone statement

```cpp
void log_alert(int code) {
    cout << "ALERT CODE: " << code << endl;
}

int main() {
    int status = log_alert(404); // Error!
    // void function returns no value
}
```
[INCORRECT / TRAP] Invalid assignment: cannot capture return value from a void subroutine


---

#### Step: find-missing-return-bug [CLICKLINE]
*Eyebrow:* Compiler audit
**Identify missing return statement**

This function is declared to return an integer thrust value.

However, the author forgot a critical statement before the function concludes. Click on the line where execution ends without returning a value.

**Code:**
```cpp
#include <iostream>
using namespace std;

int compute_thrust(int throttle) {
    int thrust = throttle * 15;
    cout << "THRUST COMPUTED" << endl;
}

int main() {
    int p = compute_thrust(10);
    cout << p << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7
**Explanation:** Line 7 concludes the function body `{}` of `compute_thrust`. Because the function's return type is declared as `int`, it must explicitly return an integer with `return thrust;`. Reaching the end of a non-void value-returning function without a return statement is undefined behavior and produces a compiler error!


---

#### Step: assemble-function-prototype [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble forward declaration prototype**

In C++, the compiler reads source code from top to bottom. If `main()` calls a function defined below it, the compiler needs a **function prototype** (forward declaration) at the top of the file.

Arrange the code blocks in correct order: prototype before `main()`, function call inside `main()`, and complete definition below `main()`.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `int to_kelvin(int celsius);`
4. `int main() {`
5. `    int k = to_kelvin(-50);`
6. `    cout << "KELVIN: " << k << endl;`
7. `    return 0;`
8. `}`
9. `int to_kelvin(int celsius) {`
10. `    return celsius + 273;`
11. `}`

---

#### Step: predict-return-early-exit [PREDICT]
*Eyebrow:* Control flow
**Trace early return branching**

Trace the execution of this sensor clamping function that utilizes an early `return`.

Determine the final output line printed to the console.

**Code:**
```cpp
#include <iostream>
using namespace std;

int clamp_sensor(int value, int limit) {
    if (value > limit) {
        return limit;
    }
    return value;
}

int main() {
    cout << clamp_sensor(150, 100) << " " << clamp_sensor(45, 100) << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `100 45
`
**Explanation:** In the first call `clamp_sensor(150, 100)`, `value > limit` (150 > 100) is true, so it immediately returns `limit` (100). In the second call `clamp_sensor(45, 100)`, the condition is false, so execution continues past the `if` and returns `value` (45). The output is `100 45`.


---

#### Step: drone-telemetry-toolkit [EDITOR]
**Sigma avionics safety toolkit**

**Task:**
Program Sigma's modular avionics safety toolkit:
1. Above `main()`, define `int battery_margin(int capacity, int reserved)` that returns `capacity - reserved`.
2. Above `main()`, define `bool is_safe_altitude(int alt)` that returns `true` if `alt >= 50 && alt <= 300`, otherwise `false`.
3. In `main()`, read `cap`, `res`, and `alt` from `cin`.
4. Call `battery_margin(cap, res)` and print `BATTERY MARGIN: ` followed by the margin and a newline.
5. If `is_safe_altitude(alt)` returns `true`, print `FLIGHT STATUS: NOMINAL` and a newline; otherwise print `FLIGHT STATUS: HAZARDOUS` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int battery_margin(int capacity, int reserved) {
    return capacity - reserved;
}

bool is_safe_altitude(int alt) {
    return alt >= 50 && alt <= 300;
}

int main() {
    int cap, res, alt;
    cin >> cap >> res >> alt;

    int margin = battery_margin(cap, res);
    cout << "BATTERY MARGIN: " << margin << endl;

    if (is_safe_altitude(alt)) {
        cout << "FLIGHT STATUS: NOMINAL" << endl;
    } else {
        cout << "FLIGHT STATUS: HAZARDOUS" << endl;
    }

    return 0;
}
```

*Hint:* Define both functions before `main()`. Use `if (is_safe_altitude(alt))` to branch cleanly on the boolean return value.
*Solution Note:* This capstone demonstrates combining numeric calculation functions with boolean validation predicates in autonomous flight control.

---

#### Step: recap [THEORY]
*Eyebrow:* Summary
**Function fundamentals recap**

In this mission, you introduced modular architecture into C++ using **functions**:

| Concept | Syntax / Example | Purpose |
| :--- | :--- | :--- |
| **Definition** | `int add(int a, int b) { return a + b; }` | Encapsulates logic and computation in one reusable place |
| **Void Subroutine** | `void log_event() { cout << "OK"; }` | Executes actions without returning a value |
| **Function Call** | `int res = add(10, 20);` | Passes arguments and receives returned result |
| **Prototype** | `int add(int a, int b);` | Informs compiler about function signature before `main()` |
| **Early Return** | `if (err) return;` | Halts function execution immediately on edge cases |


> **Next up: Chapter 21 — Funkcijas: parametru nodošana (Parameter Passing).**

> In this lesson, parameters were passed by value (copied). In Chapter 21, we unlock passing by reference (`int &x`) and `const &`, allowing functions to update telemetry variables directly in memory and process large datasets with zero copy overhead.


---


# Lesson 21 · Functions: passing parameters
**Slug:** `functions-params` | **Module:** Block 3 · Data

#### Step: why-references [THEORY]
*Eyebrow:* Memory synchronization
**Why flight computers need references**

In Chapter 20, we learned that C++ functions receive parameters by **value**. When you call `calc_fuel(dist, rate)`, the computer makes an isolated duplicate copy of each argument in memory.

Copying a single 4-byte `int` is fast. But consider Scout drone Sigma streaming 10,000 lidar coordinates stored in a `vector<int>`. If a function accepts `vector<int> v` by value, the computer must copy 40 kilobytes of memory on every single call! On an embedded Mars flight computer with limited bus bandwidth, this causes severe latency spikes and drains battery power.

Furthermore, what happens when an avionics function needs to **update** the drone's position or recalibrate two sensor channels simultaneously? A C++ function can only return a single value via `return`.

C++ solves both challenges with **references** (the `&` operator):

- **Direct in-place memory access.** A reference does not create a copy. It acts as an **alias** (another name) for the original variable in caller memory.

- **Zero-copy performance.** Large vectors and datasets are passed instantly without allocating a single extra byte of memory.

- **Multi-output subroutines.** A function can modify multiple variables directly, effectively returning multiple updated values.


---

#### Step: pass-by-value-vs-ref [THEORY]
*Eyebrow:* Syntax and mechanisms
**Pass by value vs pass by reference (&)**

To declare a parameter as a reference, place the ampersand **`&`** between the data type and the parameter name:

```cpp
void refuel(int &fuel_tank, int amount) {
    fuel_tank += amount; // Directly updates the caller's variable!
}
```

Let us contrast the two mechanisms:

- **By value (`int x`):** The function receives an independent copy. Any assignments (`x = 50;`) inside the function modify only the temporary copy. The caller's original variable remains unchanged.

- **By reference (`int &x`):** The function parameter `x` binds directly to the caller's memory address. Any modification to `x` immediately alters the caller's original variable.

> **Key rule:** When calling a reference function like `refuel(omega_fuel, 50);`, you pass the variable name normally without any extra symbols. The ampersand `&` is only written in the function's parameter declaration.

> *Image Alt:* Diagram comparing parameter passing mechanisms: pass by value creates an isolated copy, pass by reference (&) mutates original in place, and const reference guarantees zero-copy read-only access.


---

#### Step: predict-ref-mutation [PREDICT]
*Eyebrow:* Trace memory mutation
**Predict value vs reference parameter updates**

Trace this dual propulsion routine where one parameter is passed by value and the other by reference.

Determine the final output line printed to the console.

**Code:**
```cpp
#include <iostream>
using namespace std;

void consume_fuel(int regular, int &battery) {
    regular -= 10;
    battery -= 25;
}

int main() {
    int fuel = 100;
    int batt = 100;
    consume_fuel(fuel, batt);
    cout << fuel << " " << batt << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `100 75
`
**Explanation:** Inside `consume_fuel`, `regular` is passed by value, so `regular -= 10` only modifies the local copy; caller's `fuel` remains 100. Conversely, `battery` is passed by reference `int &battery`, so `battery -= 25` directly updates caller's `batt` from 100 to 75. The output is `100 75`.


---

#### Step: write-swap-telemetry [EDITOR]
**Swap coordinate channels subroutine**

**Task:**
Program Sigma's coordinate channel swapper using references:
1. Above `main()`, define a function `void swap_coords(int &a, int &b)` that swaps the values of `a` and `b` using a temporary variable `int temp`.
2. In `main()`, read two integers `x` and `y` from `cin`.
3. Call `swap_coords(x, y)` to exchange their values in place.
4. Print `COORDINATES: ` followed by `x`, a space, `y`, and a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

void swap_coords(int &a, int &b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x, y;
    cin >> x >> y;

    swap_coords(x, y);
    cout << "COORDINATES: " << x << " " << y << endl;

    return 0;
}
```

*Hint:* Both parameters must be references: `int &a, int &b`. In the body: `int temp = a; a = b; b = temp;`.
*Solution Note:* Because references bind directly to caller variables, swap_coords successfully mutates both x and y in main.

---

#### Step: const-reference-for-containers [THEORY]
*Eyebrow:* Zero-copy safety
**Const references for vectors and large data**

Passing by reference avoids memory duplication. However, what if a function only needs to **read** or inspect a vector (such as calculating the average temperature or printing waypoint count), and must NOT alter it?

If you pass by non-const reference `vector<int> &v`, a bug inside the function could accidentally modify or delete caller data.

C++ provides the gold standard for large data: **const reference** (`const T &`):

```cpp
void inspect_path(const vector<int> &path) {
    cout << "WAYPOINTS: " << path.size() << endl;
    // path.push_back(10); // COMPILE ERROR: path is read-only!
}
```

!> **The const reference best practice.** Always pass `std::vector`, `std::string`, and large objects by `const &` unless the function specifically exists to modify the original object. It delivers zero-copy speed with total read-only safety.

**Code Comparison:**
```cpp
#include <vector>
#include <iostream>
using namespace std;

void print_status(const vector<int> &v) {
    cout << "POINTS: " << v.size(); // Zero copy, fast!
}
```
[CORRECT] Optimal zero-copy inspection: const reference passes vector without copying while protecting data

```cpp
#include <vector>
using namespace std;

void print_status(const vector<int> &v) {
    v[0] = 99; // Error! const protects
    // from unintended modification
}
```
[INCORRECT / TRAP] Compile-time safety violation: attempting to mutate a const reference produces an immediate error


---

#### Step: find-value-copy-bug [CLICKLINE]
*Eyebrow:* Avionics audit
**Identify unintended pass-by-value bug**

This calibration function is intended to increase the drone's sensor reading by 15.

However, when `main()` prints `sensor`, the value is still 100! Click on the line that causes this bug.

**Code:**
```cpp
#include <iostream>
using namespace std;

void calibrate_sensor(int reading) {
    reading += 15;
}

int main() {
    int sensor = 100;
    calibrate_sensor(sensor);
    cout << sensor << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 4
**Explanation:** Line 4 defines `void calibrate_sensor(int reading)`. Because `reading` is passed by value (missing `&`), the function only modifies a local copy, leaving caller's `sensor` at 100! The parameter must be declared as `int &reading`.


---

#### Step: assemble-multi-return-ref [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble multi-output reference subroutine**

We need a subroutine `divide_power` that distributes total power among life-support pods, returning both the power per pod (quotient) and leftover reserve (remainder) via references.

Arrange the code blocks in correct order to implement and execute this multi-output subroutine.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `void divide_power(int total, int pods, int &per_pod, int &leftover) {`
4. `    per_pod = total / pods;`
5. `    leftover = total % pods;`
6. `}`
7. `int main() {`
8. `    int q, r;`
9. `    divide_power(100, 3, q, r);`
10. `    cout << "PER POD: " << q << " LEFTOVER: " << r << endl;`
11. `    return 0;`
12. `}`

---

#### Step: predict-const-ref-protection [PREDICT]
*Eyebrow:* Container inspection
**Trace const reference vector processing**

Trace this sensor analysis routine that inspects a vector passed by const reference.

Determine the final output line printed to the terminal.

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int count_valid(const vector<int> &v, int threshold) {
    int c = 0;
    for (int i = 0; i < v.size(); i++) {
        if (v[i] >= threshold) c++;
    }
    return c;
}

int main() {
    vector<int> sensors = {85, 120, 40, 150, 95};
    int res = count_valid(sensors, 100);
    cout << "ABOVE: " << res << " TOTAL: " << sensors.size() << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `ABOVE: 2 TOTAL: 5
`
**Explanation:** `count_valid` receives `sensors` by const reference and counts elements `>= 100`. The elements `>= 100` are 120 and 150 (count is 2). The vector size remains 5. Output is `ABOVE: 2 TOTAL: 5`.


---

#### Step: drone-flight-trim-controller [EDITOR]
**Sigma and Omega telemetry trim controller**

**Task:**
Program an autonomous flight trim controller for Fleet IRIS:
1. Above `main()`, define `void adjust_throttle(int &current, int target, int step)`: if `current < target`, increase `current += step`; else if `current > target`, decrease `current -= step`.
2. Above `main()`, define `int scan_peak(const vector<int> &signals)` that returns the maximum integer value in `signals`.
3. In `main()`, read `throttle`, `target`, `step`, and `count` from `cin`.
4. Read `count` integers into `vector<int> readings;` with `push_back`.
5. Call `adjust_throttle(throttle, target, step)`.
6. Call `scan_peak(readings)` and store the result in `peak`.
7. Print `TRIMMED THROTTLE: ` followed by `throttle` and a newline.
8. Print `PEAK TELEMETRY: ` followed by `peak` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

void adjust_throttle(int &current, int target, int step) {
    if (current < target) {
        current += step;
    } else if (current > target) {
        current -= step;
    }
}

int scan_peak(const vector<int> &signals) {
    int max_s = signals[0];
    for (int i = 1; i < signals.size(); i++) {
        if (signals[i] > max_s) {
            max_s = signals[i];
        }
    }
    return max_s;
}

int main() {
    int throttle, target, step, count;
    cin >> throttle >> target >> step >> count;

    vector<int> readings;
    for (int i = 0; i < count; i++) {
        int val;
        cin >> val;
        readings.push_back(val);
    }

    adjust_throttle(throttle, target, step);
    int peak = scan_peak(readings);

    cout << "TRIMMED THROTTLE: " << throttle << endl;
    cout << "PEAK TELEMETRY: " << peak << endl;

    return 0;
}
```

*Hint:* Pass throttle by reference `int &current` so it updates in main. Pass readings by const reference `const vector<int> &signals` for zero-copy efficiency.
*Solution Note:* This capstone combines mutating reference parameters for in-place control with const reference for efficient vector analysis.

---

#### Step: recap [THEORY]
*Eyebrow:* Summary
**Parameter passing recap**

In this mission, you mastered the three fundamental ways to pass data into C++ functions:

| Passing mode | Syntax | Memory behavior | Best use case |
| :--- | :--- | :--- | :--- |
| **By value** | `void fn(int x)` | Copies data; caller isolated | Small primitives (`int`, `double`, `bool`, `char`) |
| **By reference** | `void fn(int &x)` | Binds alias to caller memory; modifies in place | Updating caller variables, multiple return values |
| **By const reference** | `void fn(const vector<int> &v)` | Zero copy; read-only protection | Vectors, strings, large data structures |


> **Next up: Chapter 22 — Pārslodze, redzamība, const (Overloading, Scope, Const).**

> Now that our functions can accept and update parameters cleanly, we unlock function overloading: giving the same function name to different drone configurations (Sigma vs Omega), while managing variable scope across flight modules.


---


# Lesson 22 · Overloading, scope, and const
**Slug:** `overload-scope-const` | **Module:** Block 3 · Data

#### Step: why-overloading-and-scope [THEORY]
*Eyebrow:* Fleet adaptability
**Why flight computers need function overloading**

Fleet IRIS deploys diverse aerial vehicles across Mars. Scout drone **IZLŪKS 'Sigma'** is a lightweight, agile quad-drone requiring only distance to calculate flight thrust. In contrast, **KRAVAS 'Omega'** is a massive transport drone whose engine thrust calculation must account for both distance and the mass of heavy geological core containers.

In older programming languages like C, you had to invent cumbersome artificial names: `calculate_thrust_scout()` and `calculate_thrust_cargo()`. If you added a third drone, you needed `calculate_thrust_cartographer()`. This clutters the code and forces developers to remember dozens of arbitrary names for the exact same logical operation.

C++ introduces **function overloading**: defining multiple functions with the **exact same name**, distinguished solely by their parameter lists (number or types of parameters):

- **Clean intuitive interfaces.** The flight computer simply calls `calculate_thrust(...)`. The compiler inspects the arguments at compile time and automatically routes execution to the correct subroutine.

- **Compile-time resolution.** Function overloading incurs zero runtime performance penalty.

- **Scope isolation.** By bounding helper variables inside local code blocks and declaring fixed parameters with `const`, we prevent accidental variable corruption across complex avionics systems.


---

#### Step: function-overloading-syntax [THEORY]
*Eyebrow:* Overloading rules
**Rules of function overloading**

To overload a function in C++, provide two or more definitions sharing the same identifier, but possessing different **signatures**:

```cpp
int thrust(int dist) { return dist * 10; }             // Sigma: 1 parameter
int thrust(int dist, int mass) { return dist * 10 + mass * 2; } // Omega: 2 parameters
```

The compiler automatically matches function calls based on the argument count and types:

- `thrust(50)` calls the 1-parameter overload for Sigma.

- `thrust(50, 1200)` calls the 2-parameter overload for Omega.

!> **Return type limitation.** Functions CANNOT be overloaded by return type alone! Writing `int get_stat()` and `double get_stat()` with identical parameters causes a compile error. The compiler must be able to disambiguate calls solely from the argument list.

> *Image Alt:* Diagram showing function overloading where the same identifier 'thrust' resolves to different parameter lists at compile time, and variable block scope with lifetimes bounded by curly braces.


---

#### Step: predict-overload-dispatch [PREDICT]
*Eyebrow:* Compile-time dispatch
**Trace overloaded function selection**

Trace this program utilizing overloaded thrust computation routines.

Determine the final output line printed to the terminal console.

**Code:**
```cpp
#include <iostream>
using namespace std;

int compute_thrust(int dist) {
    return dist * 10;
}

int compute_thrust(int dist, int mass) {
    return dist * 10 + mass * 2;
}

int main() {
    int sigma = compute_thrust(20);
    int omega = compute_thrust(20, 50);
    cout << sigma << " " << omega << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `200 300
`
**Explanation:** The call `compute_thrust(20)` matches the single-parameter overload: `20 * 10 = 200`. The call `compute_thrust(20, 50)` matches the two-parameter overload: `20 * 10 + 50 * 2 = 200 + 100 = 300`. Output is `200 300`.


---

#### Step: write-overloaded-burn [EDITOR]
**Overloaded fuel burn calculator**

**Task:**
Program Fleet IRIS's dual fuel burn calculator using function overloading:
1. Above `main()`, define `int burn(int dist)` that returns `dist * 5`.
2. Above `main()`, define an overloaded `int burn(int dist, int cargo)` that returns `dist * 5 + cargo * 3`.
3. In `main()`, read `dist` and `cargo` from `cin`.
4. Print `SIGMA: ` followed by `burn(dist)` and a newline.
5. Print `OMEGA: ` followed by `burn(dist, cargo)` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int burn(int dist) {
    return dist * 5;
}

int burn(int dist, int cargo) {
    return dist * 5 + cargo * 3;
}

int main() {
    int dist, cargo;
    cin >> dist >> cargo;

    cout << "SIGMA: " << burn(dist) << endl;
    cout << "OMEGA: " << burn(dist, cargo) << endl;

    return 0;
}
```

*Hint:* Both functions share the exact name `burn`. The compiler differentiates them by whether you pass 1 or 2 arguments.
*Solution Note:* By overloading burn, callers use a single logical name for both scout and cargo operations.

---

#### Step: variable-scope-and-shadowing [THEORY]
*Eyebrow:* Scope architecture
**Variable lifetime and block scope**

Every variable in C++ has a **scope** (visibility region) bounded by the curly braces `{}` in which it was declared:

- **Local scope:** A variable declared inside a function or loop exists only within those braces. The moment execution hits the closing brace `}`, the variable is destroyed in memory.

- **Outer vs inner scope:** Inner blocks can read variables declared in enclosing outer blocks. However, outer blocks CANNOT read variables declared inside nested inner blocks.

!> **The variable shadowing trap.** If you declare a variable inside an inner block with the exact same name as an outer variable (`int battery = 10;`), the inner variable **shadows** (hides) the outer variable. This is a common source of bugs in aerospace telemetry code.

**Code Comparison:**
```cpp
int battery = 100;

void check() {
    if (battery > 20) {
        int boost = 5; // Clean local scope
        cout << battery + boost;
    }
}
```
[CORRECT] Clean block scope: inner variable lives only inside its conditional block

```cpp
int battery = 100;

void check() {
    int battery = 10; // Variable shadowing!
    // Inner battery hides outer battery,
    // creating subtle logic bugs
}
```
[INCORRECT / TRAP] Hazardous variable shadowing: inner variable accidentally masks outer variable


---

#### Step: find-scope-leak-bug [CLICKLINE]
*Eyebrow:* Scope audit
**Identify out-of-scope variable access**

This program activates a thrust boost flag inside an `if` block, then attempts to print the boost after the block concludes.

However, the compiler rejects the program. Click on the line attempting to access an out-of-scope variable.

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int mode = 1;
    if (mode == 1) {
        int thrust_boost = 50;
        cout << "BOOST ACTIVE" << endl;
    }
    cout << "FINAL THRUST: " << thrust_boost << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 10
**Explanation:** Line 10 attempts to use `thrust_boost`. But `thrust_boost` was declared inside the `if` block on line 6. Its lifetime ended at the closing brace `}` on line 8! Accessing a variable outside its enclosing scope is a compiler error.


---

#### Step: assemble-const-scope-guard [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble global const limit checker**

Global constants declared with `const` (such as `const int MAX_LIMIT = 500;`) are visible across all functions while being strictly protected from accidental runtime modification.

Arrange the code blocks in correct order: global const definition, validator function, and execution inside `main()`.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `const int MAX_LIMIT = 500;`
4. `bool is_valid(int val) {`
5. `    return val <= MAX_LIMIT;`
6. `}`
7. `int main() {`
8. `    int speed = 350;`
9. `    cout << "STATUS: " << is_valid(speed) << endl;`
10. `    return 0;`
11. `}`

---

#### Step: predict-scope-lifetimes [PREDICT]
*Eyebrow:* Shadowing analysis
**Trace nested scope shadowing**

Trace the value of `level` across nested block scopes.

Determine the number printed by `cout << level` in `main()`.

**Code:**
```cpp
#include <iostream>
using namespace std;

int level = 5;

int main() {
    int level = 20;
    {
        int level = 99;
    }
    cout << level << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `20
`
**Explanation:** In `main()`, `int level = 20;` shadows the global `level = 5`. Inside the nested block `{}`, `int level = 99;` shadows the outer 20, but that inner variable is destroyed when the block ends. Therefore, `cout << level` prints 20.


---

#### Step: drone-fleet-thrust-manager [EDITOR]
**Fleet IRIS multi-profile thrust controller**

**Task:**
Program a multi-profile thrust calculator with 3 overloaded variants:
1. Define global constant `const int SAFETY_CEILING = 1000;`.
2. Define `int profile(int distance)` that returns `distance * 2`.
3. Define overloaded `int profile(int distance, int payload)` that returns `distance * 2 + payload * 4`.
4. Define overloaded `int profile(int distance, int payload, int wind_penalty)` that returns `distance * 2 + payload * 4 + wind_penalty * 10`.
5. In `main()`, read `dist`, `load`, and `wind` from `cin`.
6. Print `SCOUT: ` followed by `profile(dist)` and a newline.
7. Print `CARGO: ` followed by `profile(dist, load)` and a newline.
8. Print `STORM: ` followed by `profile(dist, load, wind)` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

const int SAFETY_CEILING = 1000;

int profile(int distance) {
    return distance * 2;
}

int profile(int distance, int payload) {
    return distance * 2 + payload * 4;
}

int profile(int distance, int payload, int wind_penalty) {
    return distance * 2 + payload * 4 + wind_penalty * 10;
}

int main() {
    int dist, load, wind;
    cin >> dist >> load >> wind;

    cout << "SCOUT: " << profile(dist) << endl;
    cout << "CARGO: " << profile(dist, load) << endl;
    cout << "STORM: " << profile(dist, load, wind) << endl;

    return 0;
}
```

*Hint:* Implement three versions of `profile` with 1, 2, and 3 parameters. The compiler matches each call by argument count.
*Solution Note:* This capstone demonstrates unified aerospace function overloading across varying drone payloads and weather conditions.

---

#### Step: recap [THEORY]
*Eyebrow:* Summary
**Overloading, scope, and const recap**

In this mission, you unified flight APIs and mastered variable lifetimes:

| Concept | Definition | Rule |
| :--- | :--- | :--- |
| **Function Overloading** | Multiple functions with same name | Must differ by parameter count or parameter types |
| **Return Type Rule** | Functions cannot differ by return type alone | Compile error if only return type differs |
| **Block Scope** | Visibility bounded by `{}` | Variables vanish at closing brace `}` |
| **Variable Shadowing** | Re-declaring an outer name in inner block | Inner variable masks outer variable |
| **Global `const`** | Program-wide immutable values | Read-only across all functions; zero modification risk |


> **Next up: Chapter 23 — PRAKTIKUMS: funkciju bibliotēka (Function Library Practicum).**

> We now consolidate everything learned in Block 3 into an end-to-end aerospace utility library for Base IRIS: modular navigation, telemetry verification, and battery diagnostics.


---


# Lesson 23 · Practicum: a function library
**Slug:** `practicum-library` | **Module:** Block 3 · Data

#### Step: library-architecture [THEORY]
*Eyebrow:* Practicum mission
**Assembling the IRIS avionics function library**

Welcome to **Practicum 23**! All three drones of Fleet IRIS—Scout Sigma, Cartographer Delta, and Cargo Omega—are docked inside the central maintenance hangar of Base IRIS.

Over previous missions, we developed specialized functions for calculating fuel consumption, swapping navigation channels, and auditing telemetry. In safety-critical aerospace engineering, isolated functions scattered across independent scripts are dangerous. If Delta uses one definition of boundary clamping while Omega uses an older version, coordinate mismatches will occur during joint formation flights.

Today, we consolidate our code into the **Base IRIS Avionics Function Library (`libiris`)**:

- **Standardized subroutines.** A single shared suite of verified functions serving all three drone classes.

- **Three parameter passing patterns.** Pure mathematical checks by value, direct hardware calibration by reference (`&`), and zero-copy telemetry analysis by const reference (`const &`).

- **Overloaded flexibility.** Intuitive, unified function names that adapt seamlessly to varying telemetry parameters.


---

#### Step: library-modules-anatomy [THEORY]
*Eyebrow:* Architecture overview
**The three pillars of the IRIS library**

The IRIS library organizes functions into three core architectural modules:

- **Module 1: Safety Predicates (by value).** Pure functions that inspect inputs and return `bool` (`is_valid`, `in_range`). Because they take parameters by value, they are guaranteed to have zero side-effects on caller state.

- **Module 2: Hardware Calibration (by reference `&`).** Action procedures with `void` return that directly tune sensor offsets and exchange coordinate channels in caller memory.

- **Module 3: Telemetry Analytics (by `const &`).** High-throughput analytical functions that process vectors and telemetry streams without memory copying, protected against accidental modification.

> **Practicum goal:** In this practicum, you will implement, test, and integrate functions from all three modules into an end-to-end flight computer suite.

> *Image Alt:* Diagram showing the IRIS Avionics Function Library architecture: validation predicates by value, in-place calibration by reference, and vector analytics by const reference.


---

#### Step: predict-library-pipeline [PREDICT]
*Eyebrow:* Pipeline tracing
**Trace calibration and clamping pipeline**

Trace this integrated telemetry pipeline combining reference calibration and mathematical clamping.

Determine the final value printed to the console.

**Code:**
```cpp
#include <iostream>
using namespace std;

int clamp(int v, int hi) {
    if (v > hi) return hi;
    return v;
}

void calibrate(int &v, int off) {
    v += off;
}

int main() {
    int sensor = 85;
    calibrate(sensor, 25);
    sensor = clamp(sensor, 100);
    cout << sensor << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `100
`
**Explanation:** The initial sensor value is 85. Calling `calibrate(sensor, 25)` passes `sensor` by reference, updating it directly to `85 + 25 = 110`. Next, `clamp(110, 100)` detects that 110 exceeds 100 and returns 100, which is assigned back to `sensor`. The console prints `100`.


---

#### Step: write-math-helpers [EDITOR]
**Math utility toolkit: clamp and diff**

**Task:**
Program two essential mathematical utility functions for libiris:
1. Above `main()`, define `int clamp(int val, int lo, int hi)`: if `val < lo` return `lo`; if `val > hi` return `hi`; otherwise return `val`.
2. Above `main()`, define `int diff(int a, int b)`: return the positive difference between `a` and `b` (`a - b` if `a >= b`, otherwise `b - a`).
3. In `main()`, read `v`, `lo`, `hi`, `a`, and `b` from `cin`.
4. Print `CLAMPED: ` followed by `clamp(v, lo, hi)` and a newline.
5. Print `DIFF: ` followed by `diff(a, b)` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int clamp(int val, int lo, int hi) {
    if (val < lo) return lo;
    if (val > hi) return hi;
    return val;
}

int diff(int a, int b) {
    if (a >= b) return a - b;
    return b - a;
}

int main() {
    int v, lo, hi, a, b;
    cin >> v >> lo >> hi >> a >> b;

    cout << "CLAMPED: " << clamp(v, lo, hi) << endl;
    cout << "DIFF: " << diff(a, b) << endl;

    return 0;
}
```

*Hint:* Both functions return an integer and pass inputs by value. Ensure diff always returns a non-negative number.
*Solution Note:* These building blocks are used across altitude limiting and sensor deviation auditing.

---

#### Step: write-vector-statistics [EDITOR]
**Telemetry statistics: sum and minimum**

**Task:**
Program high-performance zero-copy vector statistics subroutines:
1. Above `main()`, define `int compute_sum(const vector<int> &v)` that sums all integers in `v`.
2. Above `main()`, define `int find_min(const vector<int> &v)` that returns the smallest integer in `v` (initialize min with `v[0]`).
3. In `main()`, read sample count `count` from `cin`.
4. Read `count` integers into a `vector<int> data;` with `push_back`.
5. Print `SUM: ` followed by `compute_sum(data)` and a newline.
6. Print `MIN: ` followed by `find_min(data)` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

int compute_sum(const vector<int> &v) {
    int total = 0;
    for (int i = 0; i < v.size(); i++) {
        total += v[i];
    }
    return total;
}

int find_min(const vector<int> &v) {
    int m = v[0];
    for (int i = 1; i < v.size(); i++) {
        if (v[i] < m) {
            m = v[i];
        }
    }
    return m;
}

int main() {
    int count;
    cin >> count;

    vector<int> data;
    for (int i = 0; i < count; i++) {
        int x;
        cin >> x;
        data.push_back(x);
    }

    cout << "SUM: " << compute_sum(data) << endl;
    cout << "MIN: " << find_min(data) << endl;

    return 0;
}
```

*Hint:* Pass the vector as `const vector<int> &v` in both functions for zero-copy efficiency.
*Solution Note:* Const reference parameters ensure large telemetry sets are analyzed without memory duplication.

---

#### Step: find-library-ref-bug [CLICKLINE]
*Eyebrow:* Code audit
**Identify missing reference parameter**

The flight engineer wrote `apply_trim` to adjust the drone's speed directly in memory.

However, tests show `drone_speed` in `main()` never changes! Click on the line causing the failure.

**Code:**
```cpp
#include <iostream>
using namespace std;

void apply_trim(int speed, int delta) {
    speed += delta;
}

int main() {
    int drone_speed = 50;
    apply_trim(drone_speed, 10);
    cout << drone_speed << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 4
**Explanation:** Line 4 defines `void apply_trim(int speed, int delta)`. Because `speed` is passed by value (lacking `&`), the function modifies only an isolated temporary copy. The caller's `drone_speed` is untouched! The signature must be `int &speed`.


---

#### Step: assemble-telemetry-pipeline [PARSONS]
*Eyebrow:* Parsons puzzle
**Assemble telemetry validation pipeline**

Construct an automated sensor intake pipeline: a boolean predicate function `is_valid` filters negative noise readings from a vector and counts nominal samples.

Arrange the code blocks in correct order to run this validation loop.

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <vector>`
3. `using namespace std;`
4. `bool is_valid(int v) {`
5. `    return v >= 0;`
6. `}`
7. `int main() {`
8. `    vector<int> raw = {10, -5, 20};`
9. `    int valid_count = 0;`
10. `    for (int i = 0; i < raw.size(); i++) {`
11. `        if (is_valid(raw[i])) valid_count++;`
12. `    }`
13. `    cout << "VALID: " << valid_count << endl;`
14. `    return 0;`
15. `}`

---

#### Step: write-overloaded-range-check [EDITOR]
**Overloaded range validation predicate**

**Task:**
Program overloaded boundary validation predicates:
1. Above `main()`, define `bool in_range(int v, int max_limit)`: return `true` if `v >= 0 && v <= max_limit`, otherwise `false`.
2. Above `main()`, define overloaded `bool in_range(int v, int min_limit, int max_limit)`: return `true` if `v >= min_limit && v <= max_limit`, otherwise `false`.
3. In `main()`, read `a`, `max_a`, `b`, `min_b`, and `max_b` from `cin`.
4. Print `CHECK 1: ` followed by `in_range(a, max_a)` and a newline.
5. Print `CHECK 2: ` followed by `in_range(b, min_b, max_b)` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

bool in_range(int v, int max_limit) {
    return v >= 0 && v <= max_limit;
}

bool in_range(int v, int min_limit, int max_limit) {
    return v >= min_limit && v <= max_limit;
}

int main() {
    int a, max_a, b, min_b, max_b;
    cin >> a >> max_a >> b >> min_b >> max_b;

    cout << "CHECK 1: " << in_range(a, max_a) << endl;
    cout << "CHECK 2: " << in_range(b, min_b, max_b) << endl;

    return 0;
}
```

*Hint:* Both functions share the identifier in_range. The first accepts 2 arguments, the second accepts 3.
*Solution Note:* Function overloading allows both single-bounded and double-bounded range audits under one unified API.

---

#### Step: capstone-avionics-suite [EDITOR]
**Base IRIS flight computer diagnostics suite**

**Task:**
Synthesize the complete Base IRIS avionics diagnostics suite:
1. Define `bool is_valid_signal(int signal)`: returns `true` if `signal >= 0`, otherwise `false`.
2. Define `void apply_calibration(int &sensor_val, int offset)`: adds `offset` directly to `sensor_val` in place.
3. Define `int fleet_energy_summary(const vector<int> &batteries, int &low_battery_count)`: sums all battery levels in `batteries`, and counts how many batteries have level `< 20` into `low_battery_count` (reset count to 0 first).
4. In `main()`, read `sensor`, `offset`, and battery count `n` from `cin`.
5. In a loop, read `n` battery levels into `vector<int> batteries;` with `push_back`.
6. Call `apply_calibration(sensor, offset)`.
7. Call `fleet_energy_summary(batteries, low_count)` and store total in `total`.
8. Print `CALIBRATED SENSOR: ` followed by `sensor` and a newline.
9. Print `TOTAL FLEET ENERGY: ` followed by `total` and a newline.
10. Print `CRITICAL PODS: ` followed by `low_count` and a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

bool is_valid_signal(int signal) {
    return signal >= 0;
}

void apply_calibration(int &sensor_val, int offset) {
    sensor_val += offset;
}

int fleet_energy_summary(const vector<int> &batteries, int &low_battery_count) {
    int total = 0;
    low_battery_count = 0;
    for (int i = 0; i < batteries.size(); i++) {
        total += batteries[i];
        if (batteries[i] < 20) {
            low_battery_count++;
        }
    }
    return total;
}

int main() {
    int sensor, offset, n;
    cin >> sensor >> offset >> n;

    vector<int> batteries;
    for (int i = 0; i < n; i++) {
        int b;
        cin >> b;
        batteries.push_back(b);
    }

    apply_calibration(sensor, offset);
    int low_count = 0;
    int total = fleet_energy_summary(batteries, low_count);

    cout << "CALIBRATED SENSOR: " << sensor << endl;
    cout << "TOTAL FLEET ENERGY: " << total << endl;
    cout << "CRITICAL PODS: " << low_count << endl;

    return 0;
}
```

*Hint:* Declare low_count before calling fleet_energy_summary so it can be updated by reference.
*Solution Note:* This capstone unifies value predicates, reference mutation, and const-reference vector analytics into a production-grade aerospace suite.

---

#### Step: recap [THEORY]
*Eyebrow:* Practicum summary
**Avionics library mastered**

Outstanding achievement! You have constructed the unified **IRIS Avionics Function Library**:

- **Three parameter passing modes.** Value for pure math, reference (`&`) for direct in-place mutation, and const reference (`const &`) for zero-copy vector analysis.

- **Function overloading.** Multi-profile aerospace subroutines unified under clean, intuitive names.

- **Modular software architecture.** Reusable, testable, decoupled components matching modern spacecraft standards.

> **Next up: Chapter 24 — KONTROLPUNKTS (Block 3 Checkpoint).**

> In the next chapter, you face the comprehensive **Operator Qualification Exam (Lectures 1–24)**. Passing Chapter 24 certifies you in the complete foundational core of C++!


---


# Lesson 24 · Checkpoint: Core Certification
**Slug:** `checkpoint` | **Module:** Block 3 · Data

#### Step: operator-qualification-brief [THEORY]
**Mission Status: Certification Exam**


---

#### Step: core-knowledge-roadmap [THEORY]
**Architectural Foundation Roadmap**


---

#### Step: exam-predict-composite-loop [PREDICT]
**Diagnostics: Loop Traversal & Control**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int sum = 0;
    for (int i = 1; i <= 6; i++) {
        if (i % 2 != 0) continue;
        if (i == 6) sum += 10;
        else sum += i;
    }
    cout << sum << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `16
`

---

#### Step: exam-audit-syntax-bug [CLICKLINE]
**Diagnostics: Reference Bug Audit**

**Code:**
```cpp
#include <iostream>
using namespace std;

void boost_power(int power) {
    power *= 2;
}

int main() {
    int battery = 50;
    boost_power(battery);
    cout << battery << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 4

---

#### Step: exam-core-challenge-1-filtering [EDITOR]
**Challenge 1: Telemetry Range Filter**

**Task:**
1. Write `bool is_stable(int reading)` returning `true` for `reading >= 20 && reading <= 80`.
2. In `main()`, read `n` and populate `vector<int> readings` using `push_back()`.
3. Count how many items satisfy `is_stable()`.
4. Print `STABLE COUNT: <count>` with a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

bool is_stable(int reading) {
    return reading >= 20 && reading <= 80;
}

int main() {
    int n;
    cin >> n;

    vector<int> readings;
    for (int i = 0; i < n; i++) {
        int val;
        cin >> val;
        readings.push_back(val);
    }

    int stable_count = 0;
    for (int i = 0; i < readings.size(); i++) {
        if (is_stable(readings[i])) {
            stable_count++;
        }
    }

    cout << "STABLE COUNT: " << stable_count << endl;
    return 0;
}
```


---

#### Step: exam-predict-matrix-traversal [PREDICT]
**Diagnostics: Matrix Diagonal**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int grid[2][2] = {{10, 20}, {30, 40}};
    int diag_sum = 0;
    for (int i = 0; i < 2; i++) {
        diag_sum += grid[i][i];
    }
    cout << diag_sum << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `50
`

---

#### Step: exam-parsons-modular-dispatch [PARSONS]
**Diagnostics: Function Overload Assembly**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `int thrust(int dist) {`
4. `    return dist * 3;`
5. `}`
6. `int thrust(int dist, int boost) {`
7. `    return dist * 3 + boost;`
8. `}`
9. `int main() {`
10. `    int s = thrust(10);`
11. `    int o = thrust(10, 25);`
12. `    cout << "TOTAL: " << s + o << endl;`
13. `    return 0;`
14. `}`

---

#### Step: exam-core-challenge-2-reference-trim [EDITOR]
**Challenge 2: Reference Trim Controller**

**Task:**
1. Define `void trim_channel(int &signal, int baseline, int max_cap)`.
2. Subtract `baseline` from `signal` and clamp within `[0, max_cap]`.
3. In `main()`, read `sig`, `base`, `cap`, call `trim_channel`, and print `TRIMMED SIGNAL: <sig>`.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

void trim_channel(int &signal, int baseline, int max_cap) {
    signal -= baseline;
    if (signal > max_cap) {
        signal = max_cap;
    }
    if (signal < 0) {
        signal = 0;
    }
}

int main() {
    int sig, base, cap;
    cin >> sig >> base >> cap;

    trim_channel(sig, base, cap);
    cout << "TRIMMED SIGNAL: " << sig << endl;

    return 0;
}
```


---

#### Step: capstone-fleet-mission-director [EDITOR]
**Grand Milestone: Fleet Mission Director**

**Task:**
1. Implement `is_sector_safe`, `apply_thrust_trim`, and `audit_telemetry`.
2. In `main()`, read telemetry inputs and populate `vector<int> samples`.
3. Execute the three functions on the input data.
4. Output `SECTOR SAFETY: <1 or 0>`.
5. Output `FINAL THRUST: <val>`.
6. Output `TELEMETRY SUM: <sum>`.
7. Output `HAZARD SAMPLES: <count>`.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

bool is_sector_safe(int roughness, int radiation) {
    return roughness <= 25 && radiation <= 50;
}

void apply_thrust_trim(int &thrust, int elevation) {
    if (elevation > 100) {
        thrust += 20;
    } else {
        thrust += 5;
    }
}

int audit_telemetry(const vector<int> &samples, int &hazardous_count) {
    int sum = 0;
    hazardous_count = 0;
    for (int i = 0; i < samples.size(); i++) {
        sum += samples[i];
        if (samples[i] > 80) {
            hazardous_count++;
        }
    }
    return sum;
}

int main() {
    int rough, rad, thrust, elev, n;
    cin >> rough >> rad >> thrust >> elev >> n;

    vector<int> samples;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        samples.push_back(x);
    }

    bool safe = is_sector_safe(rough, rad);
    apply_thrust_trim(thrust, elev);
    int hazards = 0;
    int total = audit_telemetry(samples, hazards);

    cout << "SECTOR SAFETY: " << (safe ? 1 : 0) << endl;
    cout << "FINAL THRUST: " << thrust << endl;
    cout << "TELEMETRY SUM: " << total << endl;
    cout << "HAZARD SAMPLES: " << hazards << endl;

    return 0;
}
```


---

#### Step: recap [THEORY]
**Certification Complete**


---
