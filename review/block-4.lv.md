# Course: C++ Programming — Mission IRIS (67coder)
## Block 4: 4. bloks · Autonomija (LV)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 25 to 32.*

---


# Lesson 25 · Darbs ar tekstu un simbolu virknēm
**Slug:** `text` | **Module:** 4. bloks · Autonomija

#### Step: why-text-protocols [THEORY]
**Dziļā kosmosa telemetrijas plūsmas**


---

#### Step: string-anatomy-and-methods [THEORY]
**std::string uzbūve un metodes**


---

#### Step: inspect-string-indexing [PREDICT]
**Diagnostika: Simbolu indeksācija**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `5 SA
`

---

#### Step: audit-find-npos-check [CLICKLINE]
**Diagnostika: Virknes meklēšanas robežvērtības audits**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 8

---

#### Step: write-command-extractor [EDITOR]
**Misijas parsēšana: Komanda un vērtība**

**Task:**
1. Izmanto `raw.find(' ')`, lai atrastu atstarpes pozīciju.
2. Izdali komandas nosaukumu ar `raw.substr(0, pos)`.
3. Izdali skaitlisko argumentu un pārvērt par `int` ar `stoi()`.
4. Izvadi `VERB: <komanda>` un `PAYLOAD: <skaitlis>` atsevišķās rindās.

**Etalona risinājums:**
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
**Diagnostika: Apakšvirkņu izdalīšana**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `IRIS_MARS
`

---

#### Step: parsons-command-parser [PARSONS]
**Avionikas montāža: Paketes ID parsētājs**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Telemetrijas analīze: Atdalītāju skaitītājs**

**Task:**
1. Izveido `int count_delimiters(const string &data, char delimiter)` ar ciklu pār `data.length()`.
2. Funkcijā `main()` nolasi `line` no `cin`.
3. Izsauc `count_delimiters(line, ',')`.
4. Izvadi `DELIMITER COUNT: <skaits>` un jaunu rindu.

**Etalona risinājums:**
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
**Autonomais lidojumu pakešu dekodētājs**

**Task:**
1. Nolasi veselu skaitli `n` no `cin`.
2. Ciklā `n` reizes nolasi katru virkni `<DARBĪBA>:<VĒRTĪBA>`.
3. Parsē paketi, izmantojot `.find(':')`, `.substr()` un `stoi()`.
4. Atjaunini `speed`, `altitude` un `heading` atbilstoši komandas darbībai.
5. Izvadi `FINAL SPEED: <speed>`.
6. Izvadi `FINAL ALTITUDE: <altitude>`.
7. Izvadi `FINAL HEADING: <heading>`.

**Etalona risinājums:**
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
**Kopsavilkums: Darbs ar tekstu C++**


---


# Lesson 26 · Izvades formatēšana ar <iomanip>
**Slug:** `iomanip` | **Module:** 4. bloks · Autonomija

#### Step: why-output-formatting [THEORY]
**Avionikas vadības paneļa inženierija**


---

#### Step: iomanip-architecture [THEORY]
**Plūsmas manipulatoru arhitektūra**


---

#### Step: inspect-setw-alignment [PREDICT]
**Diagnostika: Vienreizējais lauka platums**

**Kods:**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << setw(6) << 42 << 100 << endl;
    return 0;
}
```

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `    42100
`

---

#### Step: audit-floating-precision-bug [CLICKLINE]
**Diagnostika: Zīmīgo ciparu audits**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7

---

#### Step: write-fixed-precision-telemetry [EDITOR]
**Telemetrijas kalibrēšana: Fiksēta precizitāte**

**Task:**
1. Funkcijā `main()` nolasi `volt` un `temp` no `cin`.
2. Konfigurē `cout` ar `fixed` un `setprecision(2)`.
3. Izvadi `VOLT: <volt>` un jaunu rindu.
4. Izvadi `TEMP: <temp>` un jaunu rindu.

**Etalona risinājums:**
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
**Diagnostika: Kolonnu izlīdzināšana**

**Kods:**
```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    cout << left << setw(5) << "ALT" << right << setw(5) << 90 << endl;
    return 0;
}
```

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `ALT     90
`

---

#### Step: parsons-table-generator [PARSONS]
**Avionikas montāža: Kanālu formatētājs**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Lidojuma manifests: Divu kolonnu tabula**

**Task:**
1. Nolasi veselu skaitli `n` no `cin`.
2. Ciklā `n` reizes nolasi `name` un `code`.
3. Formatē katru rindu ar `left << setw(10) << name << right << setw(6) << code`.
4. Izvadi katru noformatēto rindu jaunā rindā.

**Etalona risinājums:**
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
**Autonomais avionikas telemetrijas panelis**

**Task:**
1. Nolasi veselu skaitli `n` no `cin`.
2. Izvadi formatēto galvenes rindu ar platumiem 10, 10 un 9.
3. Ciklā `n` reizes nolasi `name`, `reading` un `threshold`.
4. Izvadi katru rindu ar nosaukumu pa kreisi un skaitļiem pa labi (`fixed << setprecision(2)`).
5. Aprēķini rādījumu vidējo aritmētisko vērtību.
6. Izvadi `AVERAGE: <avg>` ar 2 zīmēm aiz komata.

**Etalona risinājums:**
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
**Kopsavilkums: I/O formatēšanas meistarība**


---


# Lesson 27 · Struktūras: struct
**Slug:** `struct` | **Module:** 4. bloks · Autonomija

#### Step: why-structs [THEORY]
**Viens drons = Viens datu modelis**


---

#### Step: struct-anatomy-and-lifecycle [THEORY]
**struct uzbūve un piekļuve laukiem**


---

#### Step: inspect-member-access [PREDICT]
**Diagnostika: Lauka piekļuve**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `1 65
`

---

#### Step: audit-missing-semicolon-bug [CLICKLINE]
**Diagnostika: Struktūras sintakses audits**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7

---

#### Step: write-struct-recharge-modifier [EDITOR]
**Avionikas inženierija: Uzlāde uz vietas**

**Task:**
1. Definē `struct Drone` ar laukiem `int id` un `int battery`.
2. Izveido `void recharge(Drone &d, int amount)`, kas maina `d.battery` uz vietas un ierobežo pie `100`.
3. Funkcijā `main()` nolasi vērtības un inicializē `Drone d`.
4. Izsauc `recharge(d, amount)` un izvadi `DRONE <id> BATTERY: <battery>`.

**Etalona risinājums:**
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
**Diagnostika: Vērtību kopēšanas semantika**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `50
`

---

#### Step: parsons-struct-telemetry-printer [PARSONS]
**Avionikas montāža: Const norādes izvade**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Navigācijas ģeometrija: Manhatanas attālums**

**Task:**
1. Definē `struct Point { int x; int y; };`.
2. Izveido `int manhattan_dist(const Point &a, const Point &b)`, izmantojot `abs()` no `<cmath>`.
3. Funkcijā `main()` nolasi koordinātas un inicializē abus `Point` objektus.
4. Aprēķini attālumu un izvadi `DISTANCE: <dist>` jaunā rindā.

**Etalona risinājums:**
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
**Autonomais lidojuma stāvokļa kontrolieris**

**Task:**
1. Definē `struct FlightState` ar laukiem `id`, `battery`, `altitude` un `safe`.
2. Izveido `update_flight(FlightState &s, int alt_delta, int power_drain)`.
3. Izveido `print_report(const FlightState &s)`.
4. Funkcijā `main()` nolasi datus, inicializē `FlightState`, atjaunini lidojuma datus un izvadi atskaiti.

**Etalona risinājums:**
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
**Kopsavilkums: Struktūras C++**


---


# Lesson 28 · Struktūru masīvi — eskadra
**Slug:** `struct-arrays` | **Module:** 4. bloks · Autonomija

#### Step: why-squadrons [THEORY]
**IRIS flotes eskadra**


---

#### Step: squadron-memory-and-access [THEORY]
**Eskadras atmiņa un piekļuves sintakse**


---

#### Step: inspect-squadron-traversal [PREDICT]
**Diagnostika: Flotes enerģijas aprēķins**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `230
`

---

#### Step: audit-struct-array-index-bug [CLICKLINE]
**Diagnostika: Sintakses secības lamatas**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 12

---

#### Step: write-fleet-battery-audit [EDITOR]
**Flotes veselības audits: Kritisko dronu skaits**

**Task:**
1. Definē `struct Drone` ar laukiem `int id` un `int battery`.
2. Funkcijā `main()` nolasi `n` un aizpildi `vector<Drone> fleet`.
3. Pārlūko `fleet` un saskaiti dronus ar `battery < 30`.
4. Izvadi `CRITICAL COUNT: <skaits>` ar jaunu rindu.

**Etalona risinājums:**
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
**Diagnostika: Dinamiska flotes papildināšana**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `2 20
`

---

#### Step: parsons-fleet-search-minimum [PARSONS]
**Avionikas montāža: Minimālās baterijas meklēšana**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Flotes dispečers: Ārkārtas uzlāde uz vietas**

**Task:**
1. Izveido `void boost_squadron(vector<Drone> &fleet, int boost_val)`, modificējot elementus uz vietas.
2. Ierobežo katru akumulatoru pie `100`.
3. Funkcijā `main()` nolasi datus un aizpildi `fleet`.
4. Izsauc funkciju un izvadi katra drona stāvokli: `DRONE <id>: <battery>`.

**Etalona risinājums:**
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
**Autonomais IRIS eskadras komandieris**

**Task:**
1. Definē `struct Drone` ar laukiem `id`, `battery` un `altitude`.
2. Funkcijā `main()` nolasi `n` un aizpildi `vector<Drone> fleet`.
3. Aprēķini flotes kopējo bateriju enerģiju.
4. Atrodi augstāk lidojošā drona ID.
5. Saskaiti, cik droniem ir `battery >= 50` un `altitude >= 0`.
6. Izvadi `TOTAL ENERGY: <summa>`.
7. Izvadi `HIGHEST DRONE: <id>`.
8. Izvadi `MISSION READY: <skaits>`.

**Etalona risinājums:**
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
**Kopsavilkums: Flotes datu modeļi C++**


---


# Lesson 29 · Darbs ar failiem: <fstream>
**Slug:** `files` | **Module:** 4. bloks · Autonomija

#### Step: why-files [THEORY]
**Pastāvīgā misijas žurnāla veidošana**


---

#### Step: fstream-architecture [THEORY]
**Failu plūsmu arhitektūra un dzīves cikls**


---

#### Step: inspect-file-modes [PREDICT]
**Diagnostika: Faila atvēršanas pārbaude**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `NOT OPEN
`

---

#### Step: audit-missing-close-bug [CLICKLINE]
**Diagnostika: Neapstrādātas nolasīšanas audits**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 8

---

#### Step: write-file-stream-validator [EDITOR]
**Avionikas drošība: Failu validators**

**Task:**
1. Izveido `bool verify_log_file(const string &filename)`.
2. Aizver plūsmu un atgriez rezultātu.
3. Funkcijā `main()` nolasi `filename` no `cin`.
4. Izvadi `FILE READY: <filename>` vai `FILE OFFLINE: <filename>`.

**Etalona risinājums:**
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
**Diagnostika: Plūsmas nolasīšanas cikls**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `4 100
`

---

#### Step: parsons-file-writer-pipeline [PARSONS]
**Avionikas montāža: Telemetrijas arhivētājs**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Žurnāla formatēšana: Strukturēts ieraksts**

**Task:**
1. Nolasi `sol`, `id` un `status` no `cin`.
2. Izvadi rindu formātā `[SOL <sol>] DRONE#<id> STATUS:<status>`.
3. Nobeidz ar jaunu rindu.

**Etalona risinājums:**
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
**Autonomais lidojumu melnās kastes reģistrators**

**Task:**
1. Funkcijā `main()` nolasi `n`.
2. Izstaigā visus maršruta punktus, summējot noieto attālumu.
3. Pārbaudi `ofstream fout("blackbox.log")` ar `.is_open()`.
4. Izvadi `LOG STATUS: <LOGGED TO DISK vai BUFFERED IN RAM>`.
5. Izvadi `WAYPOINTS RECORDED: <n>`.
6. Izvadi `TOTAL DISTANCE: <dist>`.

**Etalona risinājums:**
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
**Kopsavilkums: Darbs ar failiem C++**


---


# Lesson 30 · Kļūdu apstrāde un ievades aizsardzība
**Slug:** `errors` | **Module:** 4. bloks · Autonomija

#### Step: why-defensive-input [THEORY]
**Avionikas kļūmju noturība**


---

#### Step: stream-failure-and-recovery [THEORY]
**Plūsmas atjaunošanas protokols**


---

#### Step: inspect-cin-fail-flag [PREDICT]
**Diagnostika: Plūsmas kļūdas stāvoklis**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `FAILED
`

---

#### Step: audit-infinite-fail-loop [CLICKLINE]
**Diagnostika: Nobloķētas plūsmas audits**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 11

---

#### Step: write-safe-integer-reader [EDITOR]
**Sensoru kalibrācija: Diapazonu aizsardzība**

**Task:**
1. Funkcijā `main()` nolasi `reading` no `cin`.
2. Ja `reading < 0 || reading > 100`, piešķir `reading = 50`.
3. Izvadi `VALIDATED READING: <reading>` ar jaunu rindu.

**Etalona risinājums:**
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
**Diagnostika: Veiksmīga plūsmas atiestatīšana**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `75
`

---

#### Step: parsons-stream-recovery-pipeline [PARSONS]
**Avionikas montāža: Drošais nolasītājs**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Telemetrijas tīrīšana: Bojāto datu filtrēšana**

**Task:**
1. Funkcijā `main()` nolasi `n`.
2. Ciklā `n` reizes nolasi katru mērījumu `sample`.
3. Saskaiti derīgos paraugus (`sample >= 0 && sample <= 100`) un summē to vērtības.
4. Izvadi `VALID SAMPLES: <skaits>`.
5. Izvadi `TOTAL VALID SUM: <summa>`.

**Etalona risinājums:**
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
**Autonomais kļūmjpārlēces kontrolieris**

**Task:**
1. Nolasi `n` no `cin`.
2. Ciklā `n` reizes nolasi `id`, `reading` un `fallback_val`.
3. Pārbaudi diapazonu `[0, 100]` un kļūmes gadījumā izmanto rezerves vērtību.
4. Izvadi `SENSOR <id>: <gala_rādījums>` katram kanālam.
5. Izvadi `FAULT COUNT: <kļūmju skaits>`.
6. Izvadi `TOTAL TELEMETRY: <kopējā summa>`.

**Etalona risinājums:**
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
**Kopsavilkums: Kļūdu apstrāde un aizsardzība**


---


# Lesson 31 · Noslēguma projekts I: Arhitektūra un moduļi
**Slug:** `final-1` | **Module:** 4. bloks · Autonomija

#### Step: why-capstone-architecture [THEORY]
**Marsa noslēguma misija**


---

#### Step: capstone-system-architecture [THEORY]
**Modulārā avionikas arhitektūra**


---

#### Step: inspect-capstone-data-model [PREDICT]
**Diagnostika: drona datu modelis**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `SIGMA BAT:95
`

---

#### Step: audit-capstone-modular-bug [CLICKLINE]
**Koda audits: vērtības nodošanas kļūda**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 9

---

#### Step: write-capstone-drone-model [EDITOR]
**Avionikas loģika: pacelšanās gatavības vārti**

**Task:**
1. Definē funkciju `bool is_launch_ready(const Drone &d)`, kas atgriež `true`, ja `battery >= 50 && altitude >= 0`, un `false` pretējā gadījumā.
2. Funkcijā `main()` izsauc `is_launch_ready(d)`.
3. Izvadi `LAUNCH READY: <1 vai 0>`, kam seko jauna rindiņa.

**Etalona risinājums:**
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
**Diagnostika: maršruta enerģijas akumulators**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `ROUTE COST: 50
`

---

#### Step: parsons-capstone-architecture-assembly [PARSONS]
**Moduļu salikšana: koordinātu attāluma funkcija**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Navigācijas dzinējs: baterijas dispečers**

**Task:**
1. Funkcijā `main()` nolasi `battery` un `n`.
2. Inicializē `cur_x = 0` un `cur_y = 0`.
3. Ciklā `n` reizes nolasi `x` un `y`.
4. Atņem Manhatanas attālumu `abs(x - cur_x) + abs(y - cur_y)` no `battery`.
5. Ja `battery < 0`, iestati `battery = 0`.
6. Izvadi `FINAL BATTERY: <battery>`, kam seko jauna rindiņa.

**Etalona risinājums:**
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
**Noslēguma 1. posms: flotes direktors**

**Task:**
1. Nolasi veselu skaitli `n` un aizpildi `vector<Drone> fleet`.
2. Izvadi tabulas virsrakstu ar `left << setw(8) << "DRONE" << right << setw(10) << "BATTERY" << setw(10) << "ALTITUDE"`.
3. Ciklā ej cauri `fleet` un izvadi katra drona rindu ar vienādiem platumiem.
4. Saskaiti dronus ar `battery >= 50 && altitude >= 0` un izvadi `FLEET READY: <skaits>`.
5. Aprēķini vidējo bateriju un izvadi `AVG BATTERY: <fixed << setprecision(1) << avg>`.

**Etalona risinājums:**
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
**Kopsavilkums: Noslēguma projekta I posms pabeigts**


---


# Lesson 32 · Noslēguma projekts II: Autonomais lidojums un misijas noslēgums
**Slug:** `final-2` | **Module:** 4. bloks · Autonomija

#### Step: why-autonomous-mission [THEORY]
**Kanjona ekspedīcijas starts**


---

#### Step: mission-pipeline-architecture [THEORY]
**Pilnā lidojuma simulācijas arhitektūra**


---

#### Step: inspect-flight-state-evolution [PREDICT]
**Diagnostika: koordinātu un enerģijas solis**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `POS:(15,20) BAT:65
`

---

#### Step: audit-mission-loop-condition [CLICKLINE]
**Koda audits: masīva robežu kļūda ciklā**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 9

---

#### Step: write-hazard-obstacle-detector [EDITOR]
**Lidojuma navigācija: bīstamības tuvuma sensors**

**Task:**
1. Definē funkciju `bool is_hazard(int x, int y, int hx, int hy, int safe_dist)`, kas atgriež `true`, ja `(abs(x - hx) + abs(y - hy)) < safe_dist`, un `false` pretējā gadījumā.
2. Funkcijā `main()` nolasi `x`, `y`, `hx`, `hy` un `safe_dist` no `cin`.
3. Izsauc `is_hazard` un izvadi `HAZARD: <1 vai 0>`, kam seko jauna rindiņa.

**Etalona risinājums:**
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
**Diagnostika: enerģijas patēriņa izsekošana**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `SURVIVING BATTERY: 25
`

---

#### Step: parsons-mission-simulation-loop [PARSONS]
**Moduļu salikšana: drošais lidojuma cikls**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Avionikas kodols: vairāku punktu lidojuma simulators**

**Task:**
1. Funkcijā `main()` nolasi `battery` un `n` no `cin`.
2. Inicializē `cur_x = 0`, `cur_y = 0` un `bool aborted = false`.
3. Ciklā `n` reizes nolasi `x` un `y`.
4. Ja `abs(x - cur_x) + abs(y - cur_y) > battery`, izvadi `MISSION ABORTED`, iestati `aborted = true` un pārtrauc ciklu ar `break`.
5. Pretējā gadījumā atņem izmaksas no `battery` un atjauno koordinātas.
6. Ja lidojums netika pārtraukts, izvadi `MISSION SUCCESS`, `REMAINING BATTERY: <battery>` un `FINAL POS: (<cur_x>, <cur_y>)`.

**Etalona risinājums:**
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
**Noslēguma 2. posms: lielais eskadriļas misijas direktors**

**Task:**
1. Nolasi veselu skaitli `n` un saglabā datus vektorā `vector<DroneReport> fleet`.
2. Izvadi tabulas virsrakstu ar `left << setw(8) << "DRONE" << right << setw(10) << "BATTERY" << setw(12) << "DISTANCE" << setw(12) << "STATUS"`.
3. Ciklā ej cauri `fleet` un izvadi katra drona rindu ar vienādiem platumiem.
4. Saskaiti kopējo attālumu un izvadi `TOTAL DISTANCE: <total_dist> KM`.
5. Izvadi `FLEET STATUS: <n> DRONES OPERATIONAL`.

**Etalona risinājums:**
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
**Misija izpildīta: kursa absolvēšana!**


---
