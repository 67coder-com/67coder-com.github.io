# Course: C++ Programming — Mission IRIS (67coder)
## Block 4: Block 4 · Autonomy (EN)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 25 to 32.*

---


# Lesson 25 · Working with Text and Strings
**Slug:** `text` | **Module:** Block 4 · Autonomy

#### Step: why-text-protocols [THEORY]
**Deep Space Telemetry Streams**


---

#### Step: string-anatomy-and-methods [THEORY]
**std::string Architecture & Methods**


---

#### Step: inspect-string-indexing [PREDICT]
**Diagnostics: Character Indexing**

**Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string tag = "SIGMA";
    cout << tag.length() << " " << tag[0] << tag[4] << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `5 SA
`

---

#### Step: audit-find-npos-check [CLICKLINE]
**Diagnostics: String Search Sentinel Audit**

**Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string log = "TARGET_ACQUIRED";
    size_t pos = log.find("LOST");
    if (pos > 0) {
        cout << "Target was lost!" << endl;
    } else {
        cout << "Target intact." << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 8

---

#### Step: write-command-extractor [EDITOR]
**Mission Parsing: Command & Payload**

**Task:**
1. Use `raw.find(' ')` to locate the space delimiter.
2. Extract the verb using `raw.substr(0, pos)`.
3. Extract the argument string and convert to `int` with `stoi()`.
4. Print `VERB: <verb>` and `PAYLOAD: <val>` on separate lines.

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string raw;
    getline(cin, raw);

    size_t pos = raw.find(' ');
    if (pos != string::npos) {
        string verb = raw.substr(0, pos);
        string arg = raw.substr(pos + 1);
        int payload = stoi(arg);

        cout << "VERB: " << verb << endl;
        cout << "PAYLOAD: " << payload << endl;
    }
    return 0;
}
```


---

#### Step: predict-substr-slicing [PREDICT]
**Diagnostics: Substring Extraction**

**Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string beacon = "IRIS-MARS-2026";
    string mission = beacon.substr(0, 4);
    string planet = beacon.substr(5, 4);
    cout << mission << "_" << planet << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `IRIS_MARS
`

---

#### Step: parsons-command-parser [PARSONS]
**Avionics Assembly: Packet ID Extractor**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <string>`
3. `using namespace std;`
4. `int parse_id(const string &packet) {`
5. `    size_t hash_pos = packet.find('#');`
6. `    if (hash_pos == string::npos) return -1;`
7. `    string num_str = packet.substr(hash_pos + 1);`
8. `    return stoi(num_str);`
9. `}`
10. `int main() {`
11. `    string msg = "DRONE#87";`
12. `    int id = parse_id(msg);`
13. `    cout << "PARSED ID: " << id << endl;`
14. `    return 0;`
15. `}`

---

#### Step: write-telemetry-scrubber [EDITOR]
**Telemetry Analysis: Delimiter Counter**

**Task:**
1. Implement `int count_delimiters(const string &data, char delimiter)` using a loop over `data.length()`.
2. In `main()`, read `line` from `cin`.
3. Call `count_delimiters(line, ',')`.
4. Print `DELIMITER COUNT: <count>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int count_delimiters(const string &data, char delimiter) {
    int count = 0;
    for (size_t i = 0; i < data.length(); i++) {
        if (data[i] == delimiter) {
            count++;
        }
    }
    return count;
}

int main() {
    string line;
    cin >> line;

    int c = count_delimiters(line, ',');
    cout << "DELIMITER COUNT: " << c << endl;
    return 0;
}
```


---

#### Step: capstone-flight-packet-decoder [EDITOR]
**Autonomous Flight Packet Decoder**

**Task:**
1. Read integer `n` from `cin`.
2. Loop `n` times reading each `<ACTION>:<VALUE>` string.
3. Parse each packet using `.find(':')`, `.substr()`, and `stoi()`.
4. Update `speed`, `altitude`, and `heading` according to the action verb.
5. Print `FINAL SPEED: <speed>`.
6. Print `FINAL ALTITUDE: <altitude>`.
7. Print `FINAL HEADING: <heading>`.

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;

    int speed = 0;
    int altitude = 0;
    int heading = 0;

    for (int i = 0; i < n; i++) {
        string packet;
        cin >> packet;
        size_t sep = packet.find(':');
        if (sep != string::npos) {
            string verb = packet.substr(0, sep);
            int val = stoi(packet.substr(sep + 1));
            if (verb == "THRUST") {
                speed += val;
            } else if (verb == "ELEVATION") {
                altitude = val;
            } else if (verb == "YAW") {
                heading += val;
            }
        }
    }

    cout << "FINAL SPEED: " << speed << endl;
    cout << "FINAL ALTITUDE: " << altitude << endl;
    cout << "FINAL HEADING: " << heading << endl;
    return 0;
}
```


---

#### Step: recap [THEORY]
**Summary: Text Processing in C++**


---


# Lesson 26 · Output Formatting with <iomanip>
**Slug:** `iomanip` | **Module:** Block 4 · Autonomy

#### Step: why-output-formatting [THEORY]
**Avionics Dashboard Engineering**


---

#### Step: iomanip-architecture [THEORY]
**Stream Manipulator Architecture**


---

#### Step: inspect-setw-alignment [PREDICT]
**Diagnostics: Single-Shot Field Width**

**Code:**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << setw(6) << 42 << 100 << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `    42100
`

---

#### Step: audit-floating-precision-bug [CLICKLINE]
**Diagnostics: Significant Digits Audit**

**Code:**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double battery_voltage = 12.3456;
    cout << setprecision(2) << battery_voltage << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7

---

#### Step: write-fixed-precision-telemetry [EDITOR]
**Telemetry Calibration: Fixed Decimals**

**Task:**
1. In `main()`, read `volt` and `temp` from `cin`.
2. Configure `cout` with `fixed` and `setprecision(2)`.
3. Output `VOLT: <volt>` followed by a newline.
4. Output `TEMP: <temp>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double volt, temp;
    cin >> volt >> temp;

    cout << fixed << setprecision(2);
    cout << "VOLT: " << volt << endl;
    cout << "TEMP: " << temp << endl;

    return 0;
}
```


---

#### Step: predict-left-right-formatting [PREDICT]
**Diagnostics: Column Alignment**

**Code:**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << left << setw(5) << "ALT" << right << setw(5) << 90 << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `ALT     90
`

---

#### Step: parsons-table-generator [PARSONS]
**Avionics Assembly: Channel Formatter**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <iomanip>`
3. `#include <string>`
4. `using namespace std;`
5. `void print_row(const string &sensor, double val) {`
6. `    cout << left << setw(8) << sensor;`
7. `    cout << right << fixed << setprecision(1) << setw(6) << val << endl;`
8. `}`
9. `int main() {`
10. `    print_row("RADAR", 42.5);`
11. `    print_row("LIDAR", 108.2);`
12. `    return 0;`
13. `}`

---

#### Step: write-aligned-column-table [EDITOR]
**Flight Manifest: Two-Column Table**

**Task:**
1. Read integer `n` from `cin`.
2. Loop `n` times reading string `name` and integer `code`.
3. Format each row using `left << setw(10) << name << right << setw(6) << code`.
4. Output each formatted row followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;

    for (int i = 0; i < n; i++) {
        string name;
        int code;
        cin >> name >> code;
        cout << left << setw(10) << name << right << setw(6) << code << endl;
    }

    return 0;
}
```


---

#### Step: capstone-flight-telemetry-dashboard [EDITOR]
**Autonomous Avionics Telemetry Dashboard**

**Task:**
1. Read integer `n` from `cin`.
2. Print the formatted header line with widths 10, 10, and 9.
3. Loop `n` times reading `name`, `reading`, and `threshold`.
4. Print each row using `left` for name and `right` with `fixed << setprecision(2)` for the numeric columns.
5. Compute the arithmetic mean of all readings.
6. Print `AVERAGE: <avg>` formatted to 2 decimal places.

**Reference Solution:**
```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;

    cout << left << setw(10) << "SENSOR" << right << setw(10) << "READING" << setw(9) << "THRESH" << endl;

    double sum = 0.0;
    for (int i = 0; i < n; i++) {
        string name;
        double reading, thresh;
        cin >> name >> reading >> thresh;
        sum += reading;
        cout << left << setw(10) << name;
        cout << right << fixed << setprecision(2) << setw(10) << reading << setw(9) << thresh << endl;
    }

    double avg = (n > 0) ? (sum / n) : 0.0;
    cout << "AVERAGE: " << fixed << setprecision(2) << avg << endl;

    return 0;
}
```


---

#### Step: recap [THEORY]
**Summary: I/O Formatting Mastery**


---


# Lesson 27 · Structures: struct
**Slug:** `struct` | **Module:** Block 4 · Autonomy

#### Step: why-structs [THEORY]
**One Drone = One Data Model**


---

#### Step: struct-anatomy-and-lifecycle [THEORY]
**struct Anatomy & Member Access**


---

#### Step: inspect-member-access [PREDICT]
**Diagnostics: Member Access**

**Code:**
```cpp
#include <iostream>
using namespace std;

struct Drone {
    int id;
    int battery;
};

int main() {
    Drone sigma = {1, 80};
    sigma.battery -= 15;
    cout << sigma.id << " " << sigma.battery << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `1 65
`

---

#### Step: audit-missing-semicolon-bug [CLICKLINE]
**Diagnostics: Struct Syntax Audit**

**Code:**
```cpp
#include <iostream>
using namespace std;

struct Beacon {
    int frequency;
    int power;
}

int main() {
    Beacon b = {433, 100};
    cout << b.frequency << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 7

---

#### Step: write-struct-recharge-modifier [EDITOR]
**Avionics Engineering: In-Place Recharge**

**Task:**
1. Define `struct Drone` with fields `int id` and `int battery`.
2. Implement `void recharge(Drone &d, int amount)` modifying `d.battery` in-place and clamping at `100`.
3. In `main()`, read `id`, `battery`, `amount`, and initialize `Drone d`.
4. Call `recharge(d, amount)` and print `DRONE <id> BATTERY: <battery>`.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

struct Drone {
    int id;
    int battery;
};

void recharge(Drone &d, int amount) {
    d.battery += amount;
    if (d.battery > 100) {
        d.battery = 100;
    }
}

int main() {
    int id, battery, amount;
    cin >> id >> battery >> amount;

    Drone d = {id, battery};
    recharge(d, amount);
    cout << "DRONE " << d.id << " BATTERY: " << d.battery << endl;
    return 0;
}
```


---

#### Step: predict-struct-copy-semantics [PREDICT]
**Diagnostics: Value Copy Semantics**

**Code:**
```cpp
#include <iostream>
using namespace std;

struct Pod {
    int cargo;
};

void consume(Pod p) {
    p.cargo -= 10;
}

int main() {
    Pod omega = {50};
    consume(omega);
    cout << omega.cargo << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `50
`

---

#### Step: parsons-struct-telemetry-printer [PARSONS]
**Avionics Assembly: Const Reference Display**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `struct Drone {`
4. `    int id;`
5. `    int battery;`
6. `};`
7. `void print_drone(const Drone &d) {`
8. `    cout << "DRONE#" << d.id << ": " << d.battery << "%" << endl;`
9. `}`
10. `int main() {`
11. `    Drone sigma = {1, 95};`
12. `    print_drone(sigma);`
13. `    return 0;`
14. `}`

---

#### Step: write-distance-calculator-struct [EDITOR]
**Navigation Geometry: Manhattan Distance**

**Task:**
1. Define `struct Point { int x; int y; };`.
2. Implement `int manhattan_dist(const Point &a, const Point &b)` using `abs()` from `<cmath>`.
3. In `main()`, read coordinates and construct two `Point` objects.
4. Compute distance and print `DISTANCE: <dist>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

struct Point {
    int x;
    int y;
};

int manhattan_dist(const Point &a, const Point &b) {
    return abs(a.x - b.x) + abs(a.y - b.y);
}

int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;

    Point a = {x1, y1};
    Point b = {x2, y2};
    int dist = manhattan_dist(a, b);
    cout << "DISTANCE: " << dist << endl;
    return 0;
}
```


---

#### Step: capstone-drone-flight-controller [EDITOR]
**Autonomous Flight State Machine**

**Task:**
1. Define `struct FlightState` with fields `id`, `battery`, `altitude`, and `safe`.
2. Implement `update_flight(FlightState &s, int alt_delta, int power_drain)`.
3. Implement `print_report(const FlightState &s)`.
4. In `main()`, read inputs, initialize `FlightState`, update flight, and print report.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

struct FlightState {
    int id;
    int battery;
    int altitude;
    bool safe;
};

void update_flight(FlightState &s, int alt_delta, int power_drain) {
    s.altitude += alt_delta;
    s.battery -= power_drain;
    if (s.battery < 20 || s.altitude < 0) {
        s.safe = false;
    }
}

void print_report(const FlightState &s) {
    cout << "ID: " << s.id << endl;
    cout << "BATTERY: " << s.battery << endl;
    cout << "ALTITUDE: " << s.altitude << endl;
    cout << "SAFE: " << (s.safe ? 1 : 0) << endl;
}

int main() {
    int id, battery, altitude, alt_delta, power_drain;
    cin >> id >> battery >> altitude >> alt_delta >> power_drain;

    FlightState st = {id, battery, altitude, true};
    update_flight(st, alt_delta, power_drain);
    print_report(st);
    return 0;
}
```


---

#### Step: recap [THEORY]
**Summary: Custom Structures**


---


# Lesson 28 · Arrays of Structures: The Squadron
**Slug:** `struct-arrays` | **Module:** Block 4 · Autonomy

#### Step: why-squadrons [THEORY]
**The IRIS Fleet Squadron**


---

#### Step: squadron-memory-and-access [THEORY]
**Squadron Memory & Index-Dot Syntax**


---

#### Step: inspect-squadron-traversal [PREDICT]
**Diagnostics: Fleet Energy Aggregation**

**Code:**
```cpp
#include <iostream>
using namespace std;

struct Drone {
    int id;
    int battery;
};

int main() {
    Drone fleet[3] = {{1, 80}, {2, 60}, {3, 90}};
    int total = 0;
    for (int i = 0; i < 3; i++) {
        total += fleet[i].battery;
    }
    cout << total << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `230
`

---

#### Step: audit-struct-array-index-bug [CLICKLINE]
**Diagnostics: Syntax Ordering Trap**

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Drone {
    int id;
    int battery;
};

int main() {
    vector<Drone> fleet = {{1, 85}, {2, 40}};
    cout << fleet.battery[0] << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 12

---

#### Step: write-fleet-battery-audit [EDITOR]
**Fleet Health Audit: Critical Energy Count**

**Task:**
1. Define `struct Drone` with fields `int id` and `int battery`.
2. In `main()`, read `n` and populate `vector<Drone> fleet`.
3. Iterate over `fleet` and count how many have `battery < 30`.
4. Print `CRITICAL COUNT: <count>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Drone {
    int id;
    int battery;
};

int main() {
    int n;
    cin >> n;

    vector<Drone> fleet;
    for (int i = 0; i < n; i++) {
        int id, bat;
        cin >> id >> bat;
        fleet.push_back({id, bat});
    }

    int critical = 0;
    for (size_t i = 0; i < fleet.size(); i++) {
        if (fleet[i].battery < 30) {
            critical++;
        }
    }

    cout << "CRITICAL COUNT: " << critical << endl;
    return 0;
}
```


---

#### Step: predict-vector-push-back-struct [PREDICT]
**Diagnostics: Dynamic Fleet Growth**

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Drone {
    int id;
};

int main() {
    vector<Drone> fleet;
    fleet.push_back({10});
    fleet.push_back({20});
    cout << fleet.size() << " " << fleet[1].id << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `2 20
`

---

#### Step: parsons-fleet-search-minimum [PARSONS]
**Avionics Assembly: Lowest Battery Search**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <vector>`
3. `using namespace std;`
4. `struct Drone {`
5. `    int id;`
6. `    int battery;`
7. `};`
8. `int find_lowest_battery_id(const vector<Drone> &fleet) {`
9. `    int min_idx = 0;`
10. `    for (size_t i = 1; i < fleet.size(); i++) {`
11. `        if (fleet[i].battery < fleet[min_idx].battery) {`
12. `            min_idx = i;`
13. `        }`
14. `    }`
15. `    return fleet[min_idx].id;`
16. `}`
17. `int main() {`
18. `    vector<Drone> fleet = {{1, 75}, {2, 30}, {3, 90}};`
19. `    int low_id = find_lowest_battery_id(fleet);`
20. `    cout << "LOWEST BATTERY DRONE: " << low_id << endl;`
21. `    return 0;`
22. `}`

---

#### Step: write-fleet-dispatch-coordinator [EDITOR]
**Fleet Dispatch: Emergency In-Place Boost**

**Task:**
1. Implement `void boost_squadron(vector<Drone> &fleet, int boost_val)` modifying elements in-place.
2. Clamp every battery at `100`.
3. In `main()`, read `n`, `boost`, and populate `fleet`.
4. Call `boost_squadron` and print each drone's updated battery: `DRONE <id>: <battery>`.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Drone {
    int id;
    int battery;
};

void boost_squadron(vector<Drone> &fleet, int boost_val) {
    for (size_t i = 0; i < fleet.size(); i++) {
        fleet[i].battery += boost_val;
        if (fleet[i].battery > 100) {
            fleet[i].battery = 100;
        }
    }
}

int main() {
    int n, boost;
    cin >> n >> boost;

    vector<Drone> fleet;
    for (int i = 0; i < n; i++) {
        int id, bat;
        cin >> id >> bat;
        fleet.push_back({id, bat});
    }

    boost_squadron(fleet, boost);
    for (size_t i = 0; i < fleet.size(); i++) {
        cout << "DRONE " << fleet[i].id << ": " << fleet[i].battery << endl;
    }
    return 0;
}
```


---

#### Step: capstone-iris-squadron-commander [EDITOR]
**Autonomous IRIS Squadron Commander**

**Task:**
1. Define `struct Drone` with `id`, `battery`, and `altitude`.
2. In `main()`, read `n` and populate `vector<Drone> fleet`.
3. Calculate total battery energy across the squadron.
4. Find the drone ID with maximum altitude.
5. Count how many drones have `battery >= 50` and `altitude >= 0`.
6. Output `TOTAL ENERGY: <sum>`.
7. Output `HIGHEST DRONE: <id>`.
8. Output `MISSION READY: <count>`.

**Reference Solution:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Drone {
    int id;
    int battery;
    int altitude;
};

int main() {
    int n;
    cin >> n;

    vector<Drone> fleet;
    for (int i = 0; i < n; i++) {
        int id, bat, alt;
        cin >> id >> bat >> alt;
        fleet.push_back({id, bat, alt});
    }

    int total_energy = 0;
    int highest_id = (n > 0) ? fleet[0].id : 0;
    int max_alt = (n > 0) ? fleet[0].altitude : -1;
    int ready_count = 0;

    for (size_t i = 0; i < fleet.size(); i++) {
        total_energy += fleet[i].battery;
        if (fleet[i].altitude > max_alt) {
            max_alt = fleet[i].altitude;
            highest_id = fleet[i].id;
        }
        if (fleet[i].battery >= 50 && fleet[i].altitude >= 0) {
            ready_count++;
        }
    }

    cout << "TOTAL ENERGY: " << total_energy << endl;
    cout << "HIGHEST DRONE: " << highest_id << endl;
    cout << "MISSION READY: " << ready_count << endl;
    return 0;
}
```


---

#### Step: recap [THEORY]
**Summary: Fleet Collections in C++**


---


# Lesson 29 · File Operations: <fstream>
**Slug:** `files` | **Module:** Block 4 · Autonomy

#### Step: why-files [THEORY]
**Persistent Mission Logging**


---

#### Step: fstream-architecture [THEORY]
**File Stream Architecture & Lifecycle**


---

#### Step: inspect-file-modes [PREDICT]
**Diagnostics: File Open Validation**

**Code:**
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("non_existent.txt");
    if (fin.is_open()) {
        cout << "OPEN" << endl;
    } else {
        cout << "NOT OPEN" << endl;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `NOT OPEN
`

---

#### Step: audit-missing-close-bug [CLICKLINE]
**Diagnostics: Missing Open Check Audit**

**Code:**
```cpp
#include <iostream>
#include <fstream>
using namespace std;

int main() {
    ifstream fin("route.txt");
    int x;
    fin >> x;
    cout << "COORD: " << x << endl;
    fin.close();
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 8

---

#### Step: write-file-stream-validator [EDITOR]
**Avionics Safety: File Validator**

**Task:**
1. Implement `bool verify_log_file(const string &filename)`.
2. Safely close the stream if open and return boolean result.
3. In `main()`, read `filename` from `cin`.
4. Output `FILE READY: <filename>` if true, or `FILE OFFLINE: <filename>` if false.

**Reference Solution:**
```cpp
#include <iostream>
#include <fstream>
#include <string>
using namespace std;

bool verify_log_file(const string &filename) {
    ifstream fin(filename);
    bool ready = fin.is_open();
    if (ready) {
        fin.close();
    }
    return ready;
}

int main() {
    string filename;
    cin >> filename;

    if (verify_log_file(filename)) {
        cout << "FILE READY: " << filename << endl;
    } else {
        cout << "FILE OFFLINE: " << filename << endl;
    }
    return 0;
}
```


---

#### Step: predict-ifstream-loop [PREDICT]
**Diagnostics: Stream Extraction Loop**

**Code:**
```cpp
#include <iostream>
#include <sstream>
using namespace std;

int main() {
    stringstream ss("10 20 30 40");
    int val, sum = 0, count = 0;
    while (ss >> val) {
        sum += val;
        count++;
    }
    cout << count << " " << sum << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `4 100
`

---

#### Step: parsons-file-writer-pipeline [PARSONS]
**Avionics Assembly: Telemetry Archiver**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <fstream>`
3. `#include <string>`
4. `using namespace std;`
5. `void save_telemetry(const string &filename, int sol, int battery) {`
6. `    ofstream fout(filename);`
7. `    if (fout.is_open()) {`
8. `        fout << "SOL " << sol << " BATTERY " << battery << endl;`
9. `        fout.close();`
10. `    }`
11. `}`
12. `int main() {`
13. `    save_telemetry("mission.log", 42, 95);`
14. `    cout << "TELEMETRY ARCHIVED" << endl;`
15. `    return 0;`
16. `}`

---

#### Step: write-telemetry-log-formatter [EDITOR]
**Log Formatting: Structured Entry**

**Task:**
1. Read `sol`, `id`, and `status` from `cin`.
2. Output the line formatted strictly as `[SOL <sol>] DRONE#<id> STATUS:<status>`.
3. End with a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int sol, id;
    string status;
    cin >> sol >> id >> status;

    cout << "[SOL " << sol << "] DRONE#" << id << " STATUS:" << status << endl;
    return 0;
}
```


---

#### Step: capstone-flight-blackbox-recorder [EDITOR]
**Autonomous Blackbox Flight Recorder**

**Task:**
1. In `main()`, read integer `n`.
2. Traverse waypoints, tracking current position and accumulating total distance.
3. Test `ofstream fout("blackbox.log")` with `.is_open()`.
4. Output `LOG STATUS: <LOGGED TO DISK or BUFFERED IN RAM>`.
5. Output `WAYPOINTS RECORDED: <n>`.
6. Output `TOTAL DISTANCE: <dist>`.

**Reference Solution:**
```cpp
#include <iostream>
#include <fstream>
#include <cmath>
using namespace std;

int main() {
    int n;
    cin >> n;

    int cur_x = 0, cur_y = 0;
    int total_dist = 0;

    for (int i = 0; i < n; i++) {
        int tx, ty;
        cin >> tx >> ty;
        total_dist += abs(tx - cur_x) + abs(ty - cur_y);
        cur_x = tx;
        cur_y = ty;
    }

    ofstream fout("blackbox.log");
    bool disk_ready = fout.is_open();
    if (disk_ready) {
        fout << "DISTANCE " << total_dist << endl;
        fout.close();
    }

    cout << "LOG STATUS: " << (disk_ready ? "LOGGED TO DISK" : "BUFFERED IN RAM") << endl;
    cout << "WAYPOINTS RECORDED: " << n << endl;
    cout << "TOTAL DISTANCE: " << total_dist << endl;
    return 0;
}
```


---

#### Step: recap [THEORY]
**Summary: File Operations Mastery**


---


# Lesson 30 · Error Handling: Input Defense
**Slug:** `errors` | **Module:** Block 4 · Autonomy

#### Step: why-defensive-input [THEORY]
**Avionics Fault Tolerance**


---

#### Step: stream-failure-and-recovery [THEORY]
**Stream Recovery Protocol**


---

#### Step: inspect-cin-fail-flag [PREDICT]
**Diagnostics: Stream Fail State**

**Code:**
```cpp
#include <iostream>
#include <sstream>
using namespace std;

int main() {
    stringstream ss("42 ERROR 99");
    int a, b;
    ss >> a >> b;
    if (ss.fail()) {
        cout << "FAILED" << endl;
    } else {
        cout << "OK" << endl;
    }
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `FAILED
`

---

#### Step: audit-infinite-fail-loop [CLICKLINE]
**Diagnostics: Stream Lockout Audit**

**Code:**
```cpp
#include <iostream>
#include <sstream>
using namespace std;

int main() {
    stringstream ss("BAD 42");
    int val = 0;
    ss >> val;
    if (ss.fail()) {
        string junk;
        ss >> junk;
        ss >> val;
    }
    cout << val << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 11

---

#### Step: write-safe-integer-reader [EDITOR]
**Sensor Calibration: Range Sanitizer**

**Task:**
1. In `main()`, read `reading` from `cin`.
2. If `reading < 0 || reading > 100`, assign `reading = 50`.
3. Output `VALIDATED READING: <reading>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int reading;
    cin >> reading;

    if (reading < 0 || reading > 100) {
        reading = 50;
    }

    cout << "VALIDATED READING: " << reading << endl;
    return 0;
}
```


---

#### Step: predict-cin-clear-recovery [PREDICT]
**Diagnostics: Successful Stream Reboot**

**Code:**
```cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    stringstream ss("CORRUPTED 75");
    int val = 0;
    ss >> val;
    if (ss.fail()) {
        ss.clear();
        string junk;
        ss >> junk;
        ss >> val;
    }
    cout << val << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `75
`

---

#### Step: parsons-stream-recovery-pipeline [PARSONS]
**Avionics Assembly: Robust Token Reader**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <sstream>`
3. `#include <string>`
4. `using namespace std;`
5. `int read_safe_int(istream &in, int fallback) {`
6. `    int val;`
7. `    in >> val;`
8. `    if (in.fail()) {`
9. `        in.clear();`
10. `        string junk;`
11. `        in >> junk;`
12. `        return fallback;`
13. `    }`
14. `    return val;`
15. `}`
16. `int main() {`
17. `    stringstream ss("FAIL 80");`
18. `    int a = read_safe_int(ss, -1);`
19. `    int b = read_safe_int(ss, -1);`
20. `    cout << a << " " << b << endl;`
21. `    return 0;`
22. `}`

---

#### Step: write-telemetry-sanitizer [EDITOR]
**Telemetry Cleaning: Filtering Corrupted Data**

**Task:**
1. In `main()`, read integer `n`.
2. Loop `n` times reading each integer `sample`.
3. Count valid samples (`sample >= 0 && sample <= 100`) and accumulate their sum.
4. Output `VALID SAMPLES: <count>`.
5. Output `TOTAL VALID SUM: <sum>`.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int count = 0;
    int sum = 0;
    for (int i = 0; i < n; i++) {
        int sample;
        cin >> sample;
        if (sample >= 0 && sample <= 100) {
            count++;
            sum += sample;
        }
    }

    cout << "VALID SAMPLES: " << count << endl;
    cout << "TOTAL VALID SUM: " << sum << endl;
    return 0;
}
```


---

#### Step: capstone-avionics-fault-tolerant-controller [EDITOR]
**Autonomous Fault-Tolerant Controller**

**Task:**
1. Read integer `n` from `cin`.
2. Loop `n` times reading `id`, `reading`, and `fallback_val`.
3. Validate range `[0, 100]` and substitute fallback upon fault.
4. Output `SENSOR <id>: <final_reading>` for each channel.
5. Output `FAULT COUNT: <fault_count>`.
6. Output `TOTAL TELEMETRY: <total_sum>`.

**Reference Solution:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int faults = 0;
    int total_sum = 0;

    for (int i = 0; i < n; i++) {
        int id, reading, fallback_val;
        cin >> id >> reading >> fallback_val;

        int final_val = reading;
        if (reading < 0 || reading > 100) {
            final_val = fallback_val;
            faults++;
        }

        total_sum += final_val;
        cout << "SENSOR " << id << ": " << final_val << endl;
    }

    cout << "FAULT COUNT: " << faults << endl;
    cout << "TOTAL TELEMETRY: " << total_sum << endl;
    return 0;
}
```


---

#### Step: recap [THEORY]
**Summary: Error Handling & Defense**


---


# Lesson 31 · Capstone Project I: Architecture & Fleet Dispatch
**Slug:** `final-1` | **Module:** Block 4 · Autonomy

#### Step: why-capstone-architecture [THEORY]
**The Martian Capstone Mission**


---

#### Step: capstone-system-architecture [THEORY]
**Modular Avionics Architecture**


---

#### Step: inspect-capstone-data-model [PREDICT]
**Diagnostics: Drone Data Model**

**Code:**
```cpp
#include <iostream>
#include <string>
using namespace std;

struct DroneModel {
    int id;
    string name;
    int battery;
};

int main() {
    DroneModel sigma = {1, "SIGMA", 95};
    cout << sigma.name << " BAT:" << sigma.battery << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `SIGMA BAT:95
`

---

#### Step: audit-capstone-modular-bug [CLICKLINE]
**Code Audit: Pass-by-Value Mutability Bug**

**Code:**
```cpp
#include <iostream>
using namespace std;

struct Drone {
    int id;
    int altitude;
};

void ascend(Drone d, int delta) {
    d.altitude += delta;
}

int main() {
    Drone d = {1, 100};
    ascend(d, 50);
    cout << d.altitude << endl;
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 9

---

#### Step: write-capstone-drone-model [EDITOR]
**Avionics Logic: Launch Readiness Gate**

**Task:**
1. Define function `bool is_launch_ready(const Drone &d)` that returns `true` if `battery >= 50 && altitude >= 0`, and `false` otherwise.
2. In `main()`, call `is_launch_ready(d)`.
3. Output `LAUNCH READY: <1 or 0>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <string>
using namespace std;

struct Drone {
    int id;
    string name;
    int battery;
    int altitude;
};

bool is_launch_ready(const Drone &d) {
    return d.battery >= 50 && d.altitude >= 0;
}

int main() {
    int id, bat, alt;
    string name;
    cin >> id >> name >> bat >> alt;

    Drone d = {id, name, bat, alt};
    bool ready = is_launch_ready(d);
    cout << "LAUNCH READY: " << (ready ? 1 : 0) << endl;
    return 0;
}
```


---

#### Step: predict-capstone-pipeline-trace [PREDICT]
**Diagnostics: Route Energy Accumulator**

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Node {
    int cost;
};

int main() {
    vector<Node> route = {{10}, {25}, {15}};
    int total = 0;
    for (size_t i = 0; i < route.size(); i++) {
        total += route[i].cost;
    }
    cout << "ROUTE COST: " << total << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `ROUTE COST: 50
`

---

#### Step: parsons-capstone-architecture-assembly [PARSONS]
**Modular Assembly: Waypoint Cost Function**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `#include <cmath>`
3. `using namespace std;`
4. `struct Waypoint {`
5. `    int x;`
6. `    int y;`
7. `};`
8. `int step_cost(const Waypoint &from, const Waypoint &to) {`
9. `    return abs(to.x - from.x) + abs(to.y - from.y);`
10. `}`
11. `int main() {`
12. `    Waypoint a = {0, 0};`
13. `    Waypoint b = {30, 40};`
14. `    cout << "COST: " << step_cost(a, b) << endl;`
15. `    return 0;`
16. `}`

---

#### Step: write-capstone-waypoint-dispatcher [EDITOR]
**Navigation Engine: Waypoint Battery Dispatcher**

**Task:**
1. In `main()`, read `battery` and `n`.
2. Initialize `cur_x = 0` and `cur_y = 0`.
3. Loop `n` times reading `x` and `y`.
4. Subtract Manhattan distance `abs(x - cur_x) + abs(y - cur_y)` from `battery`.
5. If `battery < 0`, set `battery = 0`.
6. Output `FINAL BATTERY: <battery>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int battery, n;
    cin >> battery >> n;

    int cur_x = 0, cur_y = 0;
    for (int i = 0; i < n; i++) {
        int x, y;
        cin >> x >> y;
        int dist = abs(x - cur_x) + abs(y - cur_y);
        battery -= dist;
        if (battery < 0) {
            battery = 0;
        }
        cur_x = x;
        cur_y = y;
    }

    cout << "FINAL BATTERY: " << battery << endl;
    return 0;
}
```


---

#### Step: capstone-stage1-fleet-director [EDITOR]
**Capstone Phase I: Fleet Readiness Director**

**Task:**
1. Read integer `n` and populate `vector<Drone> fleet`.
2. Print the table header using `left << setw(8) << "DRONE" << right << setw(10) << "BATTERY" << setw(10) << "ALTITUDE"`.
3. Loop over `fleet` and print each drone row using identical widths.
4. Count drones satisfying `battery >= 50 && altitude >= 0` and print `FLEET READY: <count>`.
5. Calculate average battery and print `AVG BATTERY: <fixed << setprecision(1) << avg>`.

**Reference Solution:**
```cpp
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
using namespace std;

struct Drone {
    int id;
    string name;
    int battery;
    int altitude;
};

int main() {
    int n;
    cin >> n;

    vector<Drone> fleet;
    for (int i = 0; i < n; i++) {
        int id, bat, alt;
        string name;
        cin >> id >> name >> bat >> alt;
        fleet.push_back({id, name, bat, alt});
    }

    cout << left << setw(8) << "DRONE" << right << setw(10) << "BATTERY" << setw(10) << "ALTITUDE" << endl;

    int ready_count = 0;
    double total_battery = 0;

    for (size_t i = 0; i < fleet.size(); i++) {
        cout << left << setw(8) << fleet[i].name << right << setw(10) << fleet[i].battery << setw(10) << fleet[i].altitude << endl;
        if (fleet[i].battery >= 50 && fleet[i].altitude >= 0) {
            ready_count++;
        }
        total_battery += fleet[i].battery;
    }

    double avg = (n > 0) ? (total_battery / n) : 0.0;
    cout << "FLEET READY: " << ready_count << endl;
    cout << "AVG BATTERY: " << fixed << setprecision(1) << avg << endl;
    return 0;
}
```


---

#### Step: recap [THEORY]
**Summary: Capstone Phase I Accomplished**


---


# Lesson 32 · Capstone Project II: Autonomous Mission & Course Finale
**Slug:** `final-2` | **Module:** Block 4 · Autonomy

#### Step: why-autonomous-mission [THEORY]
**The Canyon Expedition Launches**


---

#### Step: mission-pipeline-architecture [THEORY]
**Full Flight Simulation Architecture**


---

#### Step: inspect-flight-state-evolution [PREDICT]
**Diagnostics: Positional Telemetry Step**

**Code:**
```cpp
#include <iostream>
using namespace std;

struct Drone {
    int x, y;
    int battery;
};

int main() {
    Drone d = {0, 0, 100};
    d.x += 15;
    d.y += 20;
    d.battery -= 35;
    cout << "POS:(" << d.x << "," << d.y << ") BAT:" << d.battery << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `POS:(15,20) BAT:65
`

---

#### Step: audit-mission-loop-condition [CLICKLINE]
**Code Audit: Out-of-Bounds Iteration Bug**

**Code:**
```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Waypoint { int x, y; };

int main() {
    vector<Waypoint> path = {{10, 10}, {20, 20}, {30, 30}};
    for (size_t i = 0; i <= path.size(); i++) {
        cout << "WAYPOINT " << path[i].x << endl;
    }
    return 0;
}
```

**Task:** Find the line with the bug/error.
**Bug is on line:** 9

---

#### Step: write-hazard-obstacle-detector [EDITOR]
**Flight Navigation: Hazard Proximity Sensor**

**Task:**
1. Define function `bool is_hazard(int x, int y, int hx, int hy, int safe_dist)` returning `true` if `(abs(x - hx) + abs(y - hy)) < safe_dist`, and `false` otherwise.
2. In `main()`, read `x`, `y`, `hx`, `hy`, and `safe_dist` from `cin`.
3. Call `is_hazard` and output `HAZARD: <1 or 0>` followed by a newline.

**Reference Solution:**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

bool is_hazard(int x, int y, int hx, int hy, int safe_dist) {
    return (abs(x - hx) + abs(y - hy)) < safe_dist;
}

int main() {
    int x, y, hx, hy, safe_dist;
    cin >> x >> y >> hx >> hy >> safe_dist;

    bool haz = is_hazard(x, y, hx, hy, safe_dist);
    cout << "HAZARD: " << (haz ? 1 : 0) << endl;
    return 0;
}
```


---

#### Step: predict-fleet-mission-summary [PREDICT]
**Diagnostics: Energy Depletion Tracing**

**Code:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery = 100;
    int steps = 3;
    int drain_per_step = 25;
    for (int i = 0; i < steps; i++) {
        battery -= drain_per_step;
    }
    cout << "SURVIVING BATTERY: " << battery << endl;
    return 0;
}
```

**Task:** Predict what this program outputs.
**Expected Output:** `SURVIVING BATTERY: 25
`

---

#### Step: parsons-mission-simulation-loop [PARSONS]
**Modular Assembly: Safe Flight Loop**

**Task:** Put the lines in the correct order.
**Lines (Correct Order):**
1. `#include <iostream>`
2. `using namespace std;`
3. `int main() {`
4. `    int battery = 80;`
5. `    int waypoints = 3;`
6. `    for (int i = 0; i < waypoints; i++) {`
7. `        battery -= 20;`
8. `        if (battery <= 0) {`
9. `            cout << "ABORT" << endl;`
10. `            return 0;`
11. `        }`
12. `    }`
13. `    cout << "SURVIVED: " << battery << endl;`
14. `    return 0;`
15. `}`

---

#### Step: write-drone-flight-simulator [EDITOR]
**Avionics Core: Multi-Waypoint Flight Simulator**

**Task:**
1. In `main()`, read `battery` and `n` from `cin`.
2. Initialize `cur_x = 0`, `cur_y = 0`, and `bool aborted = false`.
3. Loop `n` times reading `x` and `y`.
4. If `abs(x - cur_x) + abs(y - cur_y) > battery`, output `MISSION ABORTED`, set `aborted = true`, and break.
5. Otherwise deduct movement cost from `battery` and update coordinates.
6. If not aborted, output `MISSION SUCCESS`, `REMAINING BATTERY: <battery>`, and `FINAL POS: (<cur_x>, <cur_y>)`.

**Reference Solution:**
```cpp
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    int battery, n;
    cin >> battery >> n;

    int cur_x = 0, cur_y = 0;
    bool aborted = false;

    for (int i = 0; i < n; i++) {
        int x, y;
        cin >> x >> y;
        int cost = abs(x - cur_x) + abs(y - cur_y);
        if (cost > battery) {
            cout << "MISSION ABORTED" << endl;
            aborted = true;
            break;
        }
        battery -= cost;
        cur_x = x;
        cur_y = y;
    }

    if (!aborted) {
        cout << "MISSION SUCCESS" << endl;
        cout << "REMAINING BATTERY: " << battery << endl;
        cout << "FINAL POS: (" << cur_x << ", " << cur_y << ")" << endl;
    }

    return 0;
}
```


---

#### Step: capstone-stage2-grand-finale [EDITOR]
**Capstone Phase II: Grand Squadron Mission Director**

**Task:**
1. Read integer `n` and store drone reports into `vector<DroneReport> fleet`.
2. Output the table header using `left << setw(8) << "DRONE" << right << setw(10) << "BATTERY" << setw(12) << "DISTANCE" << setw(12) << "STATUS"`.
3. Loop over `fleet` and print each drone row with identical column widths.
4. Calculate total distance and output `TOTAL DISTANCE: <total_dist> KM`.
5. Output `FLEET STATUS: <n> DRONES OPERATIONAL`.

**Reference Solution:**
```cpp
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
using namespace std;

struct DroneReport {
    int id;
    string name;
    int battery;
    int distance;
    string status;
};

int main() {
    int n;
    cin >> n;

    vector<DroneReport> fleet;
    for (int i = 0; i < n; i++) {
        int id, bat, dist;
        string name, status;
        cin >> id >> name >> bat >> dist >> status;
        fleet.push_back({id, name, bat, dist, status});
    }

    cout << left << setw(8) << "DRONE" << right << setw(10) << "BATTERY" << setw(12) << "DISTANCE" << setw(12) << "STATUS" << endl;

    int total_dist = 0;
    for (size_t i = 0; i < fleet.size(); i++) {
        cout << left << setw(8) << fleet[i].name << right << setw(10) << fleet[i].battery << setw(12) << fleet[i].distance << setw(12) << fleet[i].status << endl;
        total_dist += fleet[i].distance;
    }

    cout << "TOTAL DISTANCE: " << total_dist << " KM" << endl;
    cout << "FLEET STATUS: " << n << " DRONES OPERATIONAL" << endl;
    return 0;
}
```


---

#### Step: recap [THEORY]
**Mission Accomplished: Course Graduation!**


---
