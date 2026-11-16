# Course: C++ Programming — Mission IRIS (67coder)
## Block 3: 3. bloks · Dati (LV)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 17 to 24.*

---


# Lesson 17 · Masīvi
**Slug:** `arrays` | **Module:** 3. bloks · Dati

#### Step: why-arrays [THEORY]
*Eyebrow:* Datu vākšanas arhitektūra
**Kāpēc borta datoriem nepieciešami masīvi**

Laipni lūgti **3. blokā: DATI (Data)**. Bāzes IRIS nosēšanās platformā ir ieradies jaunais smagais transporta drons **KRAVAS 'Omega'**. Paredzēts masīvu ģeoloģisko iežu paraugu un dzīvības uzturēšanas konteineru pārvadāšanai, Omega izvieto virsmas sensoru virknes visā Marsa kanjonā.

Iedomājieties 5 ārējo sensoru temperatūras mērījumu saglabāšanu viena Marsa sola laikā. Bez masīviem katrs sensors būtu jādeklarē un jānolasa kā atsevišķs, izolēts mainīgais:

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

Ja sensoru skaits pieaug līdz 24, 100 vai 1000 mērījumiem, atsevišķi mainīgie kļūst pilnīgi nepārvaldāmi. Pār atsevišķiem nosaukumiem `t0`, `t1`, `t2` nav iespējams palaist ciklu `for`, jo mainīgo nosaukumus programmas izpildes laikā nevar aprēķināt.

**Masīvs (array)** šo problēmu atrisina pēc būtības. Masīvs ir datu struktūra, kas apvieno fiksētu viena tipa elementu virkni vienā nepārtrauktā datora operatīvās atmiņas (RAM) apgabalā:

- Visiem masīva elementiem ir **viens kopīgs nosaukums**.

- Elementi atmiņā atrodas stingri viens aiz otra secīgās šūnās.

- Katram elementam var piekļūt acumirklī $O(1)$ laikā pēc tā kārtas numura — **indeksa** (nobīdes no masīva sākuma).

Masīva pamata deklarācijas sintakse prasa norādīt elementu tipu, masīva nosaukumu un fiksētu izmēru kvadrātiekavās:

```cpp
tips nosaukums[IZMĒRS];
```

Piemēram, rezervējot vietu Omega 5 temperatūras mērījumiem vienā rindiņā:

```cpp
int temps[5]; // Rezervē vietu 5 secīgiem veseliem skaitļiem atmiņā
```

Tagad borta dators var sistemātiski apstrādāt katru mērījumu, izmantojot vienu vienīgu skaitītāja ciklu.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On the heavy reinforced landing terrace of Mars Base IRIS at dusk. The newly introduced heavy cargo drone KRAVAS 'Omega' (powerful industrial matte slate/graphite hexagonal airframe, reinforced landing skids, heavy ducted lift rotors, ventral container clamp holding a cylindrical geological sample pod with glowing amber status LEDs) rests on the pad. In the Martian sky above, scout drone Sigma hovers in holding pattern. Across the foreground landing pad surface, five glowing aged-brass linear sensor markers lie arranged in a neat sequential memory-strip row, logging surface temperatures. Inside the observation outpost, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, inspects a holographic 1D data array on the tactical terminal. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, amber LEDs / sensor marker beams aged brass #B99A61, and holographic array grid muted sage #7FB3A3.


---

#### Step: array-syntax-and-index [THEORY]
*Eyebrow:* Sintakse un indeksācija
**Masīvu deklarēšana un piekļuve pēc indeksa**

Lai C++ valodā deklarētu masīvu, norāda elementu tipu, masīva nosaukumu un elementu skaitu kvadrātiekavās `[IZMĒRS]`:

```cpp
int temps[5] = {-55, -40, -12, -30, -50};
```

Šeit `int` ir katra elementa tips, `temps` — masīva nosaukums, bet `[5]` norāda fiksēto ietilpību. Figūriekavas `{...}` piešķir katrai šūnai sākotnējo vērtību.

C++ izmanto **indeksāciju no nulles**. Pirmais elements vienmēr atrodas pie indeksa `0`:

- `temps[0]` ir `-55` (pirmais mērījums pie nobīdes 0)

- `temps[1]` ir `-40` (otrais mērījums)

- `temps[4]` ir `-50` (piektais un pēdējais mērījums)

!> **Robežas likums par vienu vienību.** Masīvā ar izmēru `N` derīgie indeksi ir stingri no `0` līdz `N - 1`. `temps[5]` vispār NEEKSISTĒ! Mēģinājums piekļūt `temps[5]` nolasa svešu atmiņu ārpus masīva robežām (undefined behavior). Kosmiskajos borta datoros robežas pārkāpšana var sabojāt kaimiņu telemetrijas datus.

Masīva apiešanai (katra elementa apmeklēšanai) vienmēr izmanto ciklu `for`, sākot no indeksa `0` un ar stingro nevienādību `< IZMĒRS`:

```cpp
for (int i = 0; i < 5; i++) {
    cout << temps[i] << endl;
}
```

Tā kā nosacījums ir `i < 5`, cikls izpildās pie `i = 0, 1, 2, 3, 4` un nekavējoties apstājas, kad `i` sasniedz `5`, droši novēršot kļūdainu nolasīšanu ārpus masīva robežām.

**Koda salīdzinājums:**
```cpp
int temps[5] = {-55, -40, -12, -30, -50};

for (int i = 0; i < 5; i++) {
    cout << temps[i] << endl;
}
```
[PAREIZI] Korekta masīva indeksācija: indeksi ir stingri no 0 līdz IZMĒRS - 1

```cpp
int temps[5] = {-55, -40, -12, -30, -50};

// TRAP: index 5 is OUT OF BOUNDS!
for (int i = 0; i <= 5; i++) {
    cout << temps[i] << endl;
}
```
[PAREIZI] Bīstama robežas pārkāpšana: indekss 5 piecu elementu masīvā neeksistē


---

#### Step: predict-array-index [PREDICT]
*Eyebrow:* Atmiņas analīze
**Masīva elementa maiņas izsekošana**

Izsekojiet šai programmai, kurā masīva elements tiek atjaunināts pēc tā indeksa.

Nosakiet konsolē izdrukāto summas vērtību.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `100`

---

#### Step: array-loop-traversal [EDITOR]
**Masīva aizpildīšana un nolasīšana ciklā**

**Task:**
Ieprogrammējiet drona Omega 4 kanālu termisko reģistratoru ar masīvu un ciklu `for`:
1. Deklarējiet veselo skaitļu masīvu ar 4 elementiem: `int temps[4];`.
2. Pirmajā ciklā `for` no `i = 0` līdz `i < 4`: nolasiet `temps[i]` no `cin`.
3. Otrajā ciklā `for` no `i = 0` līdz `i < 4`: izdrukājiet `SENSOR #`, kam seko `i`, `: `, `temps[i]` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SENSOR #0: -55
SENSOR #1: -40
SENSOR #2: -12
SENSOR #3: -30
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `for (int i = 0; i < 4; i++) { cin >> temps[i]; }`, kam seko otrs cikls ar `cout << "SENSOR #" << i << ": " << temps[i] << endl;`.
*Piezīme pie risinājuma:* Cikls ar indeksu i no 0 līdz 3 secīgi piekļūst visiem 4 masīva elementiem.

---

#### Step: find-out-of-bounds-bug [CLICKLINE]
*Eyebrow:* Atkļūdošana
**Atrodiet izeju ārpus masīva robežām**

Šis telemetrijas cikls mēģina izdrukāt 4 vērtības no masīva.

Tomēr tajā ir kritiska robežas kļūda, kas mēģina nolasīt atmiņu ārpus masīva. Noklikšķiniet uz kļūdainās rindas.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7

---

#### Step: assemble-array-sum [PARSONS]
*Eyebrow:* Pārsona uzdevums
**Salieciet masīva summēšanas ciklu**

Transporta drons Omega pārvadā 3 iežu paraugu konteinerus. Jāaprēķina to kopējā masa.

Sakārtojiet koda blokus pareizā secībā, lai apstaigātu masīvu un summētu visu elementu vērtības mainīgajā `total_mass`.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Marsa sola vidējā temperatūra**

**Task:**
Ieprogrammējiet drona Omega meteoroloģiskā moduļa sola temperatūras analizatoru:
1. Deklarējiet masīvu ar 5 temperatūrām: `int sol_temps[5];`.
2. Ciklā `for` no `i = 0` līdz `i < 5`: nolasiet `sol_temps[i]` no `cin` un pieskaitiet to akumulatoram `sum`.
3. Aprēķiniet veselo skaitļu vidējo vērtību: `int avg = sum / 5;`.
4. Izdrukājiet `TOTAL SUM: `, kam seko `sum` un jauna rinda.
5. Izdrukājiet `AVERAGE TEMP: `, kam seko `avg` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
TOTAL SUM: -200
AVERAGE TEMP: -40
```

**Etalona risinājums:**
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
*Padoms:* Pirms cikla inicializējiet `int sum = 0;`. Ciklā: `cin >> sol_temps[i]; sum += sol_temps[i];`.
*Piezīme pie risinājuma:* Pie ievadēm -60, -50, -20, -30, -40 summa ir -200, un veselo skaitļu dalījums ar 5 dod vidējo -40.

---

#### Step: find-extreme-sensor [EDITOR]
**Maksimālās temperatūras atrašana masīvā**

**Task:**
Atrodiet maksimālo temperatūru starp 4 sensoru rādījumiem:
1. Nolasiet 4 veselus skaitļus no `cin` masīvā `int temps[4];`.
2. Inicializējiet `max_temp` ar masīva pirmo elementu: `int max_temp = temps[0];`.
3. Ciklā `for` no `i = 1` līdz `i < 4`: ja `temps[i] > max_temp`, atjauniniet `max_temp = temps[i]`.
4. Izdrukājiet `MAX TEMP: `, kam seko `max_temp` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
MAX TEMP: -10
```

**Etalona risinājums:**
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
*Padoms:* Vienmēr piešķiriet max_temp sākuma vērtību temps[0], nevis 0, jo Marsa temperatūras visas var būt negatīvas!
*Piezīme pie risinājuma:* Inicializējot ar temps[0] (-45), vērtība -10 pareizi kļūst par maksimumu pat tad, ja visi skaitļi ir zem nulles.

---

#### Step: predict-array-search [PREDICT]
*Eyebrow:* Algoritmu analīze
**Lineārā meklēšana masīvā**

Izsekojiet lineārās meklēšanas algoritmam, kas meklē kļūdas kodu `309` diagnostikas kodu masīvā.

Nosakiet mainīgā `found_index` gala vērtību, ko izvadīs programma.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `FOUND AT INDEX: 2`

---

#### Step: cargo-batch-analyzer [EDITOR]
**Kravas konteineru veselības monitors**

**Task:**
Ieprogrammējiet drona Omega konteineru telemetrijas skeneri:
1. Nolasiet 5 radiācijas mērījumus no `cin` masīvā `int rad[5];`.
2. Ciklā `for` no `i = 0` līdz `i < 5`: saskaitiet, cik konteineriem ir `rad[i] > 50` skaitītājā `hazardous`.
3. Saskaitiet visu radiācijas rādījumu kopsummu akumulatorā `total_rad`.
4. Atrodiet zemāko radiācijas vērtību mainīgajā `min_rad` (inicializējiet ar `rad[0]`).
5. Izdrukājiet visus trīs rādītājus atsevišķās rindās:
   `HAZARDOUS CONTAINERS: `, kam seko `hazardous`,
   `TOTAL RADIATION: `, kam seko `total_rad`,
   `LOWEST RADIATION: `, kam seko `min_rad`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
HAZARDOUS CONTAINERS: 2
TOTAL RADIATION: 260
LOWEST RADIATION: 25
```

**Etalona risinājums:**
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
*Padoms:* Inicializējiet `int hazardous = 0; int total_rad = 0; int min_rad = rad[0];` un apstrādājiet katru elementu vienā ciklā.
*Piezīme pie risinājuma:* Programma vienā masīva caurgājienā apvieno filtrēšanu, summēšanu un minimuma meklēšanu.

---

#### Step: recap [THEORY]
*Eyebrow:* Kopsavilkums
**Masīvu pamati: kopsavilkums**

Šajā nodaļā jūs apguvāt, kā C++ glabā un apstrādā secīgas datu kopas, izmantojot **masīvus**:

| Masīva īpašība | Sintakse | Galvenais likums |
| :--- | :--- | :--- |
| **Deklarācija** | `int temps[5];` | Izmēram jābūt zināmam kompilēšanas laikā; nepārtraukta atmiņa |
| **Inicializācija** | `int data[3] = {10, 20, 30};` | Nenorādītie elementi tiek aizpildīti ar nullēm `{0}` |
| **Indeksācija no 0** | `data[0]` līdz `data[IZMĒRS - 1]` | Pirmais elements ir pie 0, pēdējais pie `IZMĒRS - 1` |
| **Apiešanas šablons** | `for (int i = 0; i < IZMĒRS; i++)` | Vienmēr lietojiet stingro nevienādību `< IZMĒRS` |
| **Robežu drošība** | `data[IZMĒRS]` ir aizliegts! | Iziešana ārpus robežām sabojā kaimiņu atmiņu |


> **Nākamais solis: 18. nodaļa — Divdimensiju masīvi (2D Arrays).**

> Tagad, kad Omega prot apstrādāt lineāras kravas rindas, kartogrāfam Delta ir nepieciešamas divdimensiju tabulas (`int map[rows][cols]`), lai veidotu Marsa virsmas un reljefa augstumu matricas.


---


# Lesson 18 · Divdimensiju masīvi — Marsa karte
**Slug:** `arrays-2d` | **Module:** 3. bloks · Dati

#### Step: why-2d-arrays [THEORY]
*Eyebrow:* Planetārās kartēšanas arhitektūra
**No lineāriem žurnāliem līdz 2D augstuma matricām**

17. nodaļā transporta drons Omega reģistrēja 1D lineāru temperatūras sensoru virkni. Taču planētas virsma ir divdimensiju telpa, ko nosaka platums un garums, rindas un kolonnas.

Lai izlūkotu nosēšanās vietas Mawrth Vallis krātera baseinā, kartogrāfs **Delta** projicē lāzera altimetra koordinātu režģi uz krātera pamatnes. Lai saglabātu augstumu karti ar 3 rindām un 3 kolonnām, parasts 1D masīvs kļūst neērts.

C++ valoda nodrošina **divdimensiju masīvus (2D arrays jeb matricas)** — masīvu masīvus, kas atmiņā sakārtoti rindu un kolonnu tabulā:

```cpp
int map[3][3]; // 3 rindas, katrā pa 3 kolonnām
```

Pirmā dimensija nosaka **rindu** skaitu (vertikālā pozīcija), bet otrā dimensija — **kolonnu** skaitu (horizontālā pozīcija).

Tas ļauj borta datoram piesaistīt topogrāfiskos punktus tieši koordinātu pāriem `map[rinda][kolonna]`.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Surveyor drone Delta (heavy-lift twin ducted fan shrouds, prominent forward LiDAR scanner aperture, matte carbon-slate faceted armor with amber thruster glow) flies high above the rugged rust-red Mawrth Vallis crater basin at midday. Delta casts a glowing muted sage-green 3x3 laser matrix grid projection directly onto the stepped rock floor of a prominent crater below, performing digital elevation terrain mapping. In the far distance, scout drone Sigma maneuvers near a canyon cliff. In the foreground inside the mobile observation outpost, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, inspects a holographic 3x3 topographic grid matrix on the tactical terminal. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural armor #151A22, warm sandstone terrain #B7B0A4, mascot and highlights #D8D0C2, amber LEDs / thruster glow #B99A61, and laser elevation grid #7FB3A3.


---

#### Step: matrix-syntax-and-coordinates [THEORY]
*Eyebrow:* Matricas sintakse un indeksi
**Matricu deklarēšana un apiešana**

Lai C++ deklarētu 2D masīvu, norāda divus kvadrātiekavu pārus `[RINDAS][KOLONNAS]`:

```cpp
int map[2][3] = {
    {10, 20, 30},
    {40, 50, 60}
};
```

Katrai šūnai piekļūst pēc tās rindas indeksa `r` un kolonnas indeksa `c`: `map[r][c]`.

Abi indeksi sākas no nulles:

- `map[0][0]` ir augšējā kreisā šūna (`10`)

- `map[0][2]` ir augšējā labā šūna (`30`)

- `map[1][0]` ir apakšējā kreisā šūna (`40`)

- `map[1][2]` ir apakšējā labā šūna (`60`)

!> **Ligzdoto ciklu likums.** Lai apstaigātu visu matricu, izmanto ligzdotus ciklus `for`. Ārējais cikls kontrolē rindu `r` no `0` līdz `r < RINDAS`, bet iekšējais cikls — kolonnu `c` no `0` līdz `c < KOLONNAS`.

> **Atmiņas izvietojums:** C++ glabā 2D masīvus rindu secībā (row-major order): rinda 0 atmiņā atrodas uzreiz pirms rindas 1.

**Koda salīdzinājums:**
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
[PAREIZI] Korekta rindu-kolonnu apiešana: ārējais cikls iet pa rindām, iekšējais pa kolonnām

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
[PAREIZI] Bīstama robežu sajaukšana: kolonnu skaita izmantošana rindām izraisa kļūdu


---

#### Step: predict-matrix-cell [PREDICT]
*Eyebrow:* Atmiņas analīze
**2D šūnas maiņas izsekošana**

Izsekojiet šai matricas programmai, kurā šūnas vērtība tiek mainīta pēc rindas un kolonnas koordinātām.

Nosakiet konsolē izdrukāto summas vērtību.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `120`

---

#### Step: matrix-nested-traversal [EDITOR]
**2D augstuma režģa ievade un izdruka**

**Task:**
Ieprogrammējiet drona Delta 2x3 sektora augstuma režģa reģistratoru:
1. Deklarējiet 2D veselo skaitļu masīvu ar 2 rindām un 3 kolonnām: `int grid[2][3];`.
2. Ligzdotos ciklos `for` (ārējais `r = 0` līdz `r < 2`, iekšējais `c = 0` līdz `c < 3`): nolasiet `grid[r][c]` no `cin`.
3. Otrā ligzdoto ciklu pārī: izdrukājiet `grid[r][c]`, kam seko atstarpe, un pēc katras rindas beigām izdrukājiet jaunu rindu (`endl`).

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
10 20 30 
40 50 60 
```

**Etalona risinājums:**
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
*Padoms:* Ievietojiet `cout << endl;` ārējā ciklā uzreiz pēc tam, kad iekšējais cikls ir izdrukājis visas attiecīgās rindas kolonnas.
*Piezīme pie risinājuma:* Ārējais cikls apstaigā 0. un 1. rindu, bet iekšējais katrā rindā izdrukā trīs kolonnu vērtības.

---

#### Step: find-matrix-bounds-bug [CLICKLINE]
*Eyebrow:* Atkļūdošana
**Atrodiet kolonnas robežas pārkāpumu**

Šī programma mēģina izdrukāt 2x3 augstumu režģi.

Tomēr viena no cikla robežām satur kļūdu, kuras dēļ notiek mēģinājums nolasīt atmiņu ārpus matricas. Noklikšķiniet uz kļūdainās rindas.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 8

---

#### Step: assemble-matrix-flat-sum [PARSONS]
*Eyebrow:* Pārsona uzdevums
**Salieciet matricas elementu summēšanu**

Kartogrāfam Delta jāaprēķina 2x2 krātera sektora kopējais summārais augstums.

Sakārtojiet koda blokus pareizā secībā, lai apstaigātu abas rindas un kolonnas un saskaitītu visas šūnas mainīgajā `total`.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Krātera augstākās virsotnes atrašana**

**Task:**
Atrodiet augstāko topogrāfisko virsotni un tās koordinātas 3x3 krātera režģī:
1. Nolasiet 9 veselus skaitļus 3x3 matricā `int elev[3][3];` no `cin`.
2. Inicializējiet maksimumu ar augšējo kreiso šūnu: `int max_elev = elev[0][0]; int peak_r = 0; int peak_c = 0;`.
3. Ligzdotos ciklos `for` (r no 0 līdz 2, c no 0 līdz 2): ja `elev[r][c] > max_elev`, atjauniniet `max_elev = elev[r][c]`, `peak_r = r` un `peak_c = c`.
4. Izdrukājiet `PEAK ELEVATION: `, kam seko `max_elev` un jauna rinda.
5. Izdrukājiet `AT COORDINATES: (`, kam seko `peak_r`, `, `, `peak_c` un `)` jaunā rindā.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
PEAK ELEVATION: 250
AT COORDINATES: (1, 1)
```

**Etalona risinājums:**
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
*Padoms:* Neaizmirstiet atjaunināt abas koordinātas `peak_r = r; peak_c = c;`, kad tiek atrasts jauns `max_elev`.
*Piezīme pie risinājuma:* Šūnai (1, 1) ar vērtību 250 algoritms atjaunina virsotnes koordinātas un izvada precīzu atskaiti.

---

#### Step: row-hazard-audit [EDITOR]
**Sektoru rindu radiācijas audits**

**Task:**
Analizējiet radiācijas līmeņus pa rindām 3x3 sektora režģī:
1. Nolasiet 3x3 matricu `int rad[3][3];` no `cin`.
2. Katrai rindai `r` no 0 līdz 2: inicializējiet akumulatoru `int row_sum = 0;`.
3. Iekšējā ciklā `c = 0` līdz `c < 3`: pieskaitiet `rad[r][c]` pie `row_sum`.
4. Pēc katras rindas iekšējā cikla beigām izdrukājiet `ROW #`, kam seko `r`, `: SUM `, `row_sum` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
ROW #0: SUM 60
ROW #1: SUM 150
ROW #2: SUM 240
```

**Etalona risinājums:**
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
*Padoms:* Novietojiet `int row_sum = 0;` ārējā ciklā, lai tas tiktu atiestatīts uz nulli pirms katras jaunas rindas apstrādes.
*Piezīme pie risinājuma:* Akumulatora atiestatīšana katrai rindai aprēķina neatkarīgas summas katram no 3 reljefa sektoriem.

---

#### Step: predict-matrix-diagonal [PREDICT]
*Eyebrow:* Matricu algoritmi
**Diagonālā griezuma profila aprēķins**

Topogrāfiskajos krātera griezumos bieži analizē diagonālo profilu, kur rindas indekss sakrīt ar kolonnas indeksu (`r == c`).

Izsekojiet šim diagonāles summēšanas ciklam un nosakiet izdrukāto `diag_sum` vērtību.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `DIAGONAL TRANSECT: 20`

---

#### Step: capstone-landing-grid [EDITOR]
**Nosēšanās laukuma raupjuma novērtētājs**

**Task:**
Ieprogrammējiet drona Delta nosēšanās laukuma novērtētāju 3x3 raupjuma matricai:
1. Nolasiet 3x3 matricu `int grid[3][3];` no `cin` (virsmas raupjuma rādītāji).
2. Ligzdotos ciklos saskaitiet, cik šūnām `grid[r][c] <= 15` skaitītājā `safe_count`.
3. Tajos pašos ciklos saskaitiet, cik šūnām `grid[r][c] > 50` skaitītājā `hazard_count`.
4. Atrodiet minimālo raupjuma vērtību visā matricā mainīgajā `min_rough` (inicializējiet ar `grid[0][0]`).
5. Izdrukājiet trīs kopsavilkuma rindas:
   `SAFE SECTORS: `, kam seko `safe_count`,
   `HAZARD SECTORS: `, kam seko `hazard_count`,
   `BEST LANDING ROUGHNESS: `, kam seko `min_rough`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SAFE SECTORS: 4
HAZARD SECTORS: 3
BEST LANDING ROUGHNESS: 5
```

**Etalona risinājums:**
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
*Padoms:* Inicializējiet skaitītājus pirms cikliem: `int safe_count = 0; int hazard_count = 0; int min_rough = grid[0][0];`.
*Piezīme pie risinājuma:* Šī programma novērtē nosēšanās drošību, pārbaudot 9 sektoru zonas vienā 2D matricas caurgājienā.

---

#### Step: recap [THEORY]
*Eyebrow:* Kopsavilkums
**Divdimensiju masīvu kopsavilkums: koordinātu matricas C++**

Šajā nodaļā jūs paplašinājāt savas datu modelēšanas iespējas divās dimensijās:

| Jēdziens | Sintakse | Pielietojums kosmosā |
| :--- | :--- | :--- |
| **Deklarācija** | `int map[RINDAS][KOLONNAS];` | Fiksētas topogrāfisko režģu tabulas |
| **Inicializācija** | `{ {1, 2}, {3, 4} }` | Iepriekš noteiktas kalibrācijas matricas |
| **Koordinātu piekļuve** | `map[r][c]` | Rinda `r` ir vertikāle, kolonna `c` ir horizontāle |
| **Ligzdotie cikli** | `for (r...) for (c...)` | Sistemātiska virsmas skenēšana pa šūnām |
| **Diagonāles saskaitīšana** | `map[i][i]` | Krātera šķērsgriezuma profili |


> **Nākamais solis: 19. nodaļa — std::vector (Dinamiskie masīvi).**

> Statiskajiem masīviem izmērs ir jāzina jau kompilēšanas laikā. Taču, droniem Sigma un Delta pētot nezināmu teritoriju, kontrolpunktu saraksts nepārtraukti pieaug. 19. nodaļā mēs atslēgsim dinamiskos masīvus ar `std::vector`.


---


# Lesson 19 · vector
**Slug:** `vector` | **Module:** 3. bloks · Dati

#### Step: why-vector [THEORY]
*Eyebrow:* Dinamiskā datu arhitektūra
**Kāpēc borta datoriem nepieciešami dinamiskie masīvi**

Iepriekšējās misijās telemetriju saglabājām fiksētos masīvos, piemēram, `int temps[5]` un `int map[3][3]`. Statiskie masīvi ir ātri un uzticami, taču to izmēram jābūt precīzi zināmam jau programmas kompilēšanas brīdī.

Tagad izlūka drons **IZLŪKS 'Sigma'** dodas Mawrth Vallis pazemes lavas cauruļu un vulkānisko kanjonu izpētē. Virzoties cauri nezināmam aizai, Sigma ar lidaru reģistrē navigācijas bāku koordinātas. Pirms nolaišanās alā borta dators nevar paredzēt, cik punktus nāksies fiksēt: 4, 85 vai 300.

Ja deklarē statisku masīvu `int path[50];`, 51. koordinātas saņemšana izraisīs avāriju vai sabojās atmiņu. Savukārt rezervējot `int path[10000];`, tiek nelietderīgi izšķērdēta dārgā operatīvā atmiņa, ja atrastas tikai 5 bākas.

C++ standartbibliotēka piedāvā risinājumu — dinamisko masīvu konteineru: `std::vector` (no bibliotēkas `#include <vector>`):

- **Dinamiska ietilpība.** Vektors sākumā var būt tukšs un automātiski izplešas atmiņā, tiklīdz tiek pievienots jauns elements.

- **Nepārtraukta atmiņa.** Tāpat kā parastā masīvā, visi elementi atrodas secīgās atmiņas šūnās, nodrošinot tūlītēju $O(1)$ piekļuvi pēc indeksa.

- **Paškontrolēts izmērs.** Vektors jebkurā brīdī precīzi zina savu elementu skaitu, izmantojot metodi `.size()`.


---

#### Step: vector-syntax-and-push [THEORY]
*Eyebrow:* Sintakse un operācijas
**Vektoru deklarēšana un elementu pievienošana ar push_back**

Lai izmantotu vektorus, programmas sākumā jāpievieno bibliotēka `<vector>`. Deklarējot vektoru, elementu tipu norāda leņķa iekavās `<tips>`:

```cpp
#include <vector>
using namespace std;

vector<int> waypoints; // Izveido tukšu veselo skaitļu vektoru (izmērs ir 0)
```

Lai pievienotu jaunu elementu vektora beigās, izsauc dalībnieka funkciju `.push_back(vērtība)`:

```cpp
waypoints.push_back(120); // Pievieno 120 pie indeksa 0 (izmērs kļūst 1)
waypoints.push_back(180); // Pievieno 180 pie indeksa 1 (izmērs kļūst 2)
```

Pašreizējo elementu skaitu uzzina ar `.size()`, bet elementiem piekļūst ar ierastajām kvadrātiekavām `[i]`:

```cpp
cout << waypoints.size(); // Izdrukā: 2
cout << waypoints[0];      // Izdrukā: 120
```

!> **Tukša vektora indeksēšanas kļūda.** Ja vektors ir deklarēts bez sākotnējā izmēra (`vector<int> v;`), tajā ir **0 elementu**. Komanda `v[0] = 50;` ir rupjš robežas pārkāpums! Tukšu vektoru vienmēr piepilda ar `.push_back()`, kas vispirms rezervē jaunu šūnu un tikai tad ieraksta tajā vērtību.

**Koda salīdzinājums:**
```cpp
#include <vector>
using namespace std;

vector<int> v;
v.push_back(10);
v.push_back(20);
// v.size() is now 2
```
[PAREIZI] Korekta dinamiskā pievienošana: push_back paplašina vektora izmēru

```cpp
#include <vector>
using namespace std;

vector<int> v;
v[0] = 10; // Crash!
// Empty vector has size 0,
// index 0 does not exist yet
```
[KĻŪDA / SLAZDS] Neatļauta atmiņas piekļuve: rakstīšana pie indeksa 0 tukšā vektorā izraisa avāriju


---

#### Step: predict-vector-push [PREDICT]
*Eyebrow:* Stāvokļa analīze
**Vektora izmēra un pop_back izsekošana**

Izsekojiet šī navigācijas bāku reģistratora izpildei.

Nosakiet konsolē izdrukāto galarezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `3 250
`
**Explanation:** Sākumā vektorā tiek pievienoti 100, 250 un 400 (izmērs 3). Pēc tam `pop_back()` izdzēš pēdējo elementu (400), un izmērs samazinās līdz 2. Nākamais `push_back(350)` beigās pievieno 350. Vektora saturs tagad ir `[100, 250, 350]`, tā `size()` ir 3, bet pie indeksa 1 atrodas `250`. Rezultāts ir `3 250`.


---

#### Step: vector-input-loop [EDITOR]
**Lidara augstumu plūsmas reģistrators**

**Task:**
Ieprogrammējiet izlūka Sigma dinamisku augstuma mērījumu reģistratoru:
1. Nolasiet mērījumu skaitu `int n` no `cin`.
2. Deklarējiet tukšu veselo skaitļu vektoru `vector<int> elevations;`.
3. Ciklā `for`, kas izpildās `n` reizes: nolasiet `int val` no `cin` un pievienojiet to vektoram ar `elevations.push_back(val);`.
4. Otrā ciklā `for` no `i = 0` līdz `i < elevations.size()`: izdrukājiet `ELEVATION #`, indeksu `i`, `: `, elementu `elevations[i]` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Deklarējiet `vector<int> elevations;` pirms cikla. Otrajā ciklā izmantojiet `elevations.size()`, lai droši apstaigātu visus elementus.
*Piezīme pie risinājuma:* Izmantojot push_back, vektors pielāgojas jebkuram ievadītajam n izmēram dinamiski.

---

#### Step: find-vector-size-bug [CLICKLINE]
*Eyebrow:* Robežu atkļūdošana
**Vektora cikla robežas kļūdas atrašana**

Šī programma inicializē 3 elementu koordinātu vektoru un mēģina izdrukāt katru elementu.

Tomēr cikla nosacījums pēdējā solī mēģina nolasīt neatļautu atmiņu. Noklikšķiniet uz kļūdainās rindiņas.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** Rindiņā 7 izmantots `i <= coords.size()`. Vektorā ar 3 elementiem `coords.size()` ir 3, tāpēc derīgie indeksi ir tikai 0, 1 un 2. Kad `i` sasniedz 3, `coords[3]` piekļūst ārpus atmiņas robežām! Pareizam nosacījumam jābūt ar stingro nevienādību `i < coords.size()`.


---

#### Step: assemble-vector-filter [PARSONS]
*Eyebrow:* Parsons puzzle
**Telemetrijas sliekšņa filtra salikšana**

Sigma ir reģistrējusi neapstrādātus sensoru datus, tostarp negatīvus trokšņu mērījumus. Jaunā vektorā `valid_data` jāsaglabā tikai pozitīvie mērījumi.

Salieciet koda blokus pareizā secībā, lai pārbaudītu `raw`, pievienotu derīgos datus vektorā `valid_data` un izdrukātu derīgo paraugu skaitu.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Seismisko signālu pīķa un summas analizators**

**Task:**
Ieprogrammējiet Sigma akustisko atbalsu analizatoru:
1. Nolasiet kopējo signālu skaitu `int count` no `cin`.
2. Nolasiet `count` veselus skaitļus vektorā `vector<int> signals;`, izmantojot `.push_back()`.
3. Ciklā `for` aprēķiniet visu vektora elementu summu mainīgajā `sum`.
4. Tajā pašā vai atsevišķā ciklā atrodiet lielāko vērtību `max_signal` (sākotnēji piešķirot `signals[0]`).
5. Izdrukājiet `TOTAL SIGNAL: `, summu `sum` un jaunu rindu.
6. Izdrukājiet `PEAK SIGNAL: `, pīķa vērtību `max_signal` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Inicializējiet `int sum = 0;` un `int max_signal = signals[0];`. Ciklā no `0` līdz `signals.size()` atjauniniet abus lielumus.
*Piezīme pie risinājuma:* Inicializējot max_signal ar signals[0], pīķa noteikšana darbojas pareizi arī ar visām negatīvām vērtībām.

---

#### Step: predict-vector-empty [PREDICT]
*Eyebrow:* Konteinera pārbaude
**Vektora tukšuma un steka operāciju izsekošana**

Izsekojiet šai programmai, kas izmanto metodes `.empty()` un `.pop_back()` sensoru stekam.

Nosakiet precīzu konsolē izdrukāto teksta virkni.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `ACTIVE 1 VAL 5
`
**Explanation:** Vektorā vispirms pievieno 5 un 15, pēc tam `pop_back()` noņem 15. Paliek tikai `[5]`. Nosacījums `!stack.empty()` ir patiess (vektors nav tukšs). Tiek izdrukāts `ACTIVE `, `stack.size()` (1), ` VAL ` un `stack[0]` (5), kopā dodot `ACTIVE 1 VAL 5`.


---

#### Step: drone-flight-path-logger [EDITOR]
**Sigma kanjona lidojuma trajektorijas audits**

**Task:**
Ieprogrammējiet izlūka Sigma autonomā kanjona lidojuma audita moduli:
1. Nolasiet kontrolpunktu skaitu `int n` no `cin`.
2. Ciklā nolasiet `n` augstuma vērtības vektorā `vector<int> altitudes;` ar `.push_back()`.
3. Inicializējiet skaitītāju `int high_altitude_count = 0;` un summu `int total_alt = 0;`.
4. Ciklā `for` pār `altitudes`: pieskaitiet katru augstumu pie `total_alt`, un, ja `altitudes[i] >= 100`, palieliniet `high_altitude_count`.
5. Izdrukājiet `WAYPOINTS LOGGED: `, vektora izmēru `altitudes.size()` un jaunu rindu.
6. Izdrukājiet `TOTAL ALTITUDE: `, kopējo augstumu `total_alt` un jaunu rindu.
7. Izdrukājiet `HIGH ALTITUDE FIXES: `, skaitu `high_altitude_count` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Vispirms nolasiet visus datus ar `altitudes.push_back(alt);`, tad ciklā no `0` līdz `altitudes.size()` veiciet summas un sliekšņa aprēķinus.
*Piezīme pie risinājuma:* Šis noslēguma uzdevums apvieno dinamisku datu vākšanu, kopsummas aprēķinu un sliekšņa filtrēšanu vienotā kosmiskās navigācijas plūsmā.

---

#### Step: recap [THEORY]
*Eyebrow:* Kopsavilkums
**Dinamisko vektoru kopsavilkums**

Šajā misijā jūs apguvāt dinamiskās atmiņas konteinerus C++ valodā ar `std::vector`:

| Iespēja | Statiskais masīvs (`int a[N]`) | Dinamiskais vektors (`vector<int> v`) |
| :--- | :--- | :--- |
| **Bibliotēka** | Iebūvēta valodā | `#include <vector>` |
| **Ietilpība** | Fiksēta kompilēšanas laikā | Dinamiski aug izpildes laikā |
| **Pievienošana** | Nevar pievienot | `v.push_back(vērtība)` |
| **Dzēšana no beigām** | Nevar dzēst | `v.pop_back()` |
| **Izmēra noteikšana** | Jāseko pašam | `v.size()` |
| **Tukšuma pārbaude** | Nav iebūvētas pārbaudes | `v.empty()` atgriež `true`/`false` |
| **Piekļuve elementam** | `a[i]` | `v[i]` vai drošā `v.at(i)` |


> **Nākamā tēma: 20. nodaļa — Funkcijas: pamati (Functions: The Basics).**

> Kad mūsu droni spēj apstrādāt sarežģītas dinamiskas datu kopas, programmas kļūst garākas. 20. nodaļā mēs sadalīsim borta datora kodu atkārtoti izmantojamās funkcijās ar parametriem un atgriežamām vērtībām.


---


# Lesson 20 · Funkcijas: pamati
**Slug:** `functions-basics` | **Module:** 3. bloks · Dati

#### Step: why-functions [THEORY]
*Eyebrow:* Modulārā avionika
**Kāpēc borta datoriem nepieciešamas funkcijas**

Laipni lūgti nodaļā par **funkcijām**! IRIS flotei paplašinoties — izlūkam Sigma pētot lavas kanjonus, kartogrāfam Delta veidojot reljefa kartes un kravas dronam Omega pārvietojot smagos konteinerus —, mūsu lidojuma programmas kļūst aizvien apjomīgākas un sarežģītākas.

Iedomājieties dzinēja degvielas patēriņa aprēķinu: `attālums * patēriņa_koeficients`. Ja šo formulu iekopē 20 dažādās ciklu un nosacījumu vietās, kods kļūst trausls. Tiklīdz inženieri maina dzinēja kalibrāciju, formula jālabo visās 20 vietās. Ja kādā vietā aizmirst vai pieļauj drukas kļūdu, drons kļūdaini aprēķina vilci un riskē novirzīties no orbītas.

Programmatūras inženierijā šo problēmu atrisina **modulārā sadalīšana**: lielas programmas sadalīšana nelielās, neatkarīgās un nosauktās apakšprogrammās — **funkcijās**:

- **Uzraksti vienreiz, izmanto visur.** Funkcija definē aprēķinu vienā uzticamā vietā. Visas drona apakšsistēmas izsauc vienu un to pašu pārbaudīto moduli.

- **Koda lasāmība un skaidrība.** Tā vietā, lai lasītu garas matemātiskas izteiksmes funkcijā `main()`, mēs redzam skaidrus komandu nosaukumus: `calculate_fuel(dist, rate)`.

- **Neatkarīga testēšana.** Kosmisko aprēķinu var atsevišķi pārbaudīt un notestēt, pirms to integrē autonomajā lidojuma vadībā.


---

#### Step: function-anatomy [THEORY]
*Eyebrow:* Sintakse un uzbūve
**C++ funkcijas anatomija**

C++ funkcija sastāv no **galvenes** (paraksta) un figūriekavās `{}` ietverta **ķermeņa**:

```cpp
int calc_fuel(int dist, int rate) {
    return dist * rate;
}
```

Aplūkosim katru no šiem elementiem:

- **Atgriežamais tips (`int`):** Norāda datu tipu gala rezultātam, ko funkcija nosūta atpakaļ izsaucējam. Ja aprēķina skaitli, tas parasti ir `int` vai `double`. Ja pārbauda nosacījumu — `bool`.

- **Funkcijas nosaukums (`calc_fuel`):** Identifikators, ar kuru funkciju izsauc no citām koda vietām.

- **Parametru saraksts (`(int dist, int rate)`):** Ieejas mainīgie, kas pieņem datus funkcijas izsaukuma brīdī. Katram parametram obligāti jānorāda tā tips.

- **Komanda `return`:** Aprēķina rezultāta izteiksmi, nodod to izsaucējam un nekavējoties pārtrauc funkcijas izpildi.

> **Funkcijas izsaukšana:** Funkcijā `main()` funkciju izsauc pēc tās nosaukuma, iekavās norādot vērtības: `int total = calc_fuel(100, 5);`. Padotās vērtības (`100` un `5`) sauc par **argumentiem**.

> *Image Alt:* Shēma attēlo C++ funkcijas uzbūvi: definīcija ar atgriežamo tipu, nosaukumu, parametriem, ķermeni un izsaukums funkcijā main(), nododot argumentus un saņemot rezultātu.


---

#### Step: predict-function-call [PREDICT]
*Eyebrow:* Izpildes plūsma
**Funkciju izsaukumu un atgriezto vērtību izsekošana**

Izsekojiet šai programmai ar divām atsevišķām aprēķinu funkcijām.

Nosakiet konsolē izdrukāto galarezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `40 25
`
**Explanation:** Vispirms tiek izsaukta funkcija `calc_distance(10, 4)` ar argumentiem 10 un 4. Tā aprēķina `10 * 4 = 40` un atgriež 40, ko saglabā mainīgajā `d`. Pēc tam izsauc `square(5)` ar argumentu 5, iegūstot `5 * 5 = 25`, ko saglabā `area`. Programma izdrukā `40 25`.


---

#### Step: write-fuel-function [EDITOR]
**Dzinēja degvielas patēriņa funkcija**

**Task:**
Ieprogrammējiet Sigma modulāro degvielas patēriņa funkciju:
1. Virs `main()` definējiet funkciju `int calculate_fuel(int distance, int burn_rate)`, kas atgriež reizinājumu `distance * burn_rate`.
2. Funkcijā `main()` nolasiet `dist` un `rate` no `cin`.
3. Izsauciet `calculate_fuel(dist, rate)` un saglabājiet rezultātu mainīgajā `fuel_needed`.
4. Izdrukājiet `FUEL REQUIRED: `, mainīgo `fuel_needed` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Definējiet funkciju pirms `main()`: `int calculate_fuel(int distance, int burn_rate) { return distance * burn_rate; }`.
*Piezīme pie risinājuma:* Izolējot aprēķina loģiku atsevišķā funkcijā, to var droši atkārtoti izmantot visos lidojuma posmos.

---

#### Step: void-function-and-return [THEORY]
*Eyebrow:* Atgriežamais tips void
**Darbību funkcijas ar void tipu**

Ne visas funkcijas veic matemātiskus aprēķinus ar skaitlisku rezultātu. Bieži apakšprogrammas veic darbības — piemēram, izdrukā paziņojumu konsolē, ieslēdz skaņas signālu vai notīra kļūdu žurnālu.

Ja funkcijai nav jāatgriež vērtība, tās atgriežamo tipu deklarē kā **`void`**:

```cpp
void sound_alarm(int code) {
    cout << "ALARM TRIGGERED: " << code << endl;
}
```

Funkcijā ar tipu `void` neraksta `return <vērtība>;`. No funkcijas var iziet pirms laika, vienkārši uzrakstot `return;` bez vērtības:

```cpp
void test_sensor(int signal) {
    if (signal < 0) {
        return; // Pārtrauc izpildi nederīga signāla gadījumā
    }
    cout << "SIGNAL OK: " << signal << endl;
}
```

!> **Vērtības piešķiršanas kļūda.** Funkcija ar tipu `void` neatgriež nekādu rezultātu. Mēģinājums rakstīt `int x = sound_alarm(404);` nekompilēsies, jo nav vērtības, ko piešķirt mainīgajam `x`!

**Koda salīdzinājums:**
```cpp
void log_alert(int code) {
    cout << "ALERT CODE: " << code << endl;
}

int main() {
    log_alert(404); // Correct statement call
}
```
[PAREIZI] Korekts void izsaukums: darbības funkciju izsauc kā atsevišķu komandu

```cpp
void log_alert(int code) {
    cout << "ALERT CODE: " << code << endl;
}

int main() {
    int status = log_alert(404); // Error!
    // void function returns no value
}
```
[KĻŪDA / SLAZDS] Neatļauta vērtības piešķiršana: void funkcija neatgriež nekādu vērtību


---

#### Step: find-missing-return-bug [CLICKLINE]
*Eyebrow:* Kompilatora audits
**Trūkstošās return komandas atrašana**

Šī funkcija ir deklarēta kā tāda, kas atgriež veselu skaitli (dzinēja vilces jaudu).

Tomēr autors pirms funkcijas noslēguma ir aizmirsis būtisku komandu. Noklikšķiniet uz rindiņas, kur funkcijas izpilde beidzas bez vērtības atgriešanas.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** Rindiņā 7 noslēdzas funkcijas `compute_thrust` figūriekava `{}`. Tā kā funkcijas atgriežamais tips ir `int`, tajā obligāti jābūt komandai `return thrust;`. Ja vērtību atgriezošas funkcijas izpilde sasniedz beigas bez `return`, programma satur nenoteiktu uzvedību un kompilators ziņo par kļūdu!


---

#### Step: assemble-function-prototype [PARSONS]
*Eyebrow:* Parsons puzzle
**Funkcijas prototipa salikšana**

C++ kompilators lasa programmas kodu no augšas uz leju. Ja funkcijā `main()` vēlas izsaukt funkciju, kas uzrakstīta zemāk, faila sākumā nepieciešams **funkcijas prototips** (iepriekšēja deklarācija).

Salieciet koda blokus pareizā secībā: prototips pirms `main()`, izsaukums funkcijā `main()` un pilna definīcija zem `main()`.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
*Eyebrow:* Vadības plūsma
**Agrīnās return komandas izsekošana**

Izsekojiet šai sensora signāla ierobežotāja funkcijai, kurā tiek izmantots nosacījuma `return`.

Nosakiet konsolē izdrukāto galarezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `100 45
`
**Explanation:** Pirmajā izsaukumā `clamp_sensor(150, 100)` nosacījums `value > limit` (150 > 100) ir patiess, tāpēc funkcija nekavējoties atgriež `limit` (100). Otrajā izsaukumā `clamp_sensor(45, 100)` nosacījums ir aplams, tāpēc tiek atgriezts pats `value` (45). Izdruka ir `100 45`.


---

#### Step: drone-telemetry-toolkit [EDITOR]
**Sigma avionikas drošības moduļu kopa**

**Task:**
Ieprogrammējiet izlūka Sigma modulāros avionikas drošības rīkus:
1. Virs `main()` definējiet `int battery_margin(int capacity, int reserved)`, kas atgriež starpību `capacity - reserved`.
2. Virs `main()` definējiet `bool is_safe_altitude(int alt)`, kas atgriež `true`, ja `alt >= 50 && alt <= 300`, pretējā gadījumā `false`.
3. Funkcijā `main()` nolasiet `cap`, `res` un `alt` no `cin`.
4. Izsauciet `battery_margin(cap, res)` un izdrukājiet `BATTERY MARGIN: `, rezultātu un jaunu rindu.
5. Ja `is_safe_altitude(alt)` atgriež `true`, izdrukājiet `FLIGHT STATUS: NOMINAL` un jaunu rindu; pretējā gadījumā izdrukājiet `FLIGHT STATUS: HAZARDOUS` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Definējiet abas funkcijas pirms `main()`. Izmantojiet `if (is_safe_altitude(alt))`, lai ērti pārbaudītu loģisko funkcijas rezultātu.
*Piezīme pie risinājuma:* Šis noslēguma uzdevums parāda skaitlisko aprēķinu un loģisko predikātu funkciju apvienošanu autonomajā lidojuma vadībā.

---

#### Step: recap [THEORY]
*Eyebrow:* Kopsavilkums
**Funkciju pamatu kopsavilkums**

Šajā misijā jūs ieviesāt modulāru koda arhitektūru C++ valodā ar **funkcijām**:

| Jēdziens | Sintakse / Piemērs | Nozīme |
| :--- | :--- | :--- |
| **Definīcija** | `int add(int a, int b) { return a + b; }` | Iekapsulē aprēķinu loģiku vienā atkārtoti lietojamā vietā |
| **Void procedūra** | `void log_event() { cout << "OK"; }` | Veic darbību, neatgriežot vērtību |
| **Funkcijas izsaukums** | `int res = add(10, 20);` | Nodod argumentus un saņem atgriezto rezultātu |
| **Prototips** | `int add(int a, int b);` | Paziņo kompilatoram funkcijas parakstu pirms `main()` |
| **Agrīnais return** | `if (err) return;` | Nekavējoties pārtrauc funkcijas izpildi īpašos gadījumos |


> **Nākamā tēma: 21. nodaļa — Funkcijas: parametru nodošana (Parameter Passing).**

> Šajā nodaļā parametri tika nodoti pēc vērtības (kopēti). 21. nodaļā mēs apgūsim nodošanu pēc norādes (`int &x`) un `const &`, kas ļauj funkcijām tieši atjaunināt mainīgos atmiņā un bez liekas kopēšanas apstrādāt apjomīgus datus.


---


# Lesson 21 · Funkcijas: parametru nodošana
**Slug:** `functions-params` | **Module:** 3. bloks · Dati

#### Step: why-references [THEORY]
*Eyebrow:* Atmiņas sinhronizācija
**Kāpēc borta datoriem nepieciešamas norādes**

20. nodaļā mēs uzzinājām, ka C++ funkcijas parametrus pēc noklusējuma saņem **pēc vērtības**. Kad tiek izsaukts `calc_fuel(dist, rate)`, dators atmiņā izveido neatkarīgu katra argumenta kopiju.

Viena 4 baitu `int` skaitļa nokopēšana ir zibenīga. Bet iedomājieties izlūka dronu Sigma, kura `vector<int>` glabā 10 000 lidara mērījumu. Ja funkcija saņem `vector<int> v` pēc vērtības, datoram pie katra izsaukuma jākopē 40 kilobaiti atmiņas! Marsa borta datorā ar ierobežotu kopnes joslas platumu tas rada bīstamu aizturi un lieki tērē bateriju.

Turklāt, kā rīkoties, ja funkcijai vienlaikus jāatjaunina drona pozīcija un jāpārkalibrē divi sensoru kanāli? C++ funkcija ar `return` spēj atgriezt tikai vienu vienīgu vērtību.

C++ abus šos izaicinājumus atrisina ar **norādēm (references)** — simbolu `&`:

- **Tieša piekļuve atmiņai.** Norāde neveido kopiju. Tā kļūst par **sinonīmu** (otro vārdu) oriģinālajam mainīgajam izsaucēja atmiņā.

- **Nulles kopēšanas ātrdarbība.** Apjomīgi vektori un dati tiek nodoti acumirklī, nepatērējot nevienu papildu baitu operatīvās atmiņas.

- **Vairāku vērtību atgriešana.** Funkcija var tieši mainīt vairākus padotos mainīgos, faktiski atgriežot vairākus jaunus rezultātus.


---

#### Step: pass-by-value-vs-ref [THEORY]
*Eyebrow:* Sintakse un mehānismi
**Nodošana pēc vērtības pret nodošanu pēc norādes (&)**

Lai parametru deklarētu kā norādi, starp datu tipu un parametra nosaukumu ieraksta ampersandu **`&`**:

```cpp
void refuel(int &fuel_tank, int amount) {
    fuel_tank += amount; // Tieši atjaunina izsaucēja mainīgo!
}
```

Salīdzināsim abus darbības principus:

- **Pēc vērtības (`int x`):** Funkcija saņem izolētu kopiju. Jebkura vērtības piešķiršana (`x = 50;`) funkcijas iekšienē ietekmē tikai pagaidu kopiju. Izsaucēja oriģinālais mainīgais nemainās.

- **Pēc norādes (`int &x`):** Parametrs `x` tieši sasaistās ar izsaucēja mainīgā atmiņas adresi. Jebkura `x` vērtības maiņa uzreiz maina pašu izsaucēja mainīgo.

> **Svarīgs likums:** Izsaucot funkciju `refuel(omega_fuel, 50);`, mainīgo padod kā parasti, bez papildu simboliem. Zīmi `&` raksta tikai funkcijas parametru sarakstā.

> *Image Alt:* Shēma salīdzina parametru nodošanas veidus: pēc vērtības izveido kopiju, pēc norādes (&) maina oriģinālu atmiņā, bet const norāde nodrošina ātru lasīšanu bez kopēšanas.


---

#### Step: predict-ref-mutation [PREDICT]
*Eyebrow:* Atmiņas izmaiņu analīze
**Vērtības un norādes parametru izsekošana**

Izsekojiet šai dzinēju vadības funkcijai, kur viens parametrs nodots pēc vērtības, bet otrs — pēc norādes.

Nosakiet konsolē izdrukāto galarezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `100 75
`
**Explanation:** Funkcijā `consume_fuel` parametrs `regular` ir nodots pēc vērtības, tāpēc `regular -= 10` maina tikai lokālo kopiju, un izsaucēja `fuel` paliek 100. Turpretī `battery` ir nodots pēc norādes `int &battery`, tāpēc `battery -= 25` tieši samazina `batt` no 100 uz 75. Programma izdrukā `100 75`.


---

#### Step: write-swap-telemetry [EDITOR]
**Koordinātu kanālu apmaiņas funkcija**

**Task:**
Ieprogrammējiet izlūka Sigma koordinātu apmaiņas moduli, izmantojot norādes:
1. Virs `main()` definējiet funkciju `void swap_coords(int &a, int &b)`, kas samaina `a` un `b` vērtības vietām, izmantojot pagaidu mainīgo `int temp`.
2. Funkcijā `main()` nolasiet divus veselus skaitļus `x` un `y` no `cin`.
3. Izsauciet `swap_coords(x, y)`, lai samainītu to vērtības atmiņā.
4. Izdrukājiet `COORDINATES: `, mainīgo `x`, atstarpi, mainīgo `y` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Abiem parametriem jābūt norādēm: `int &a, int &b`. Funkcijas ķermenī: `int temp = a; a = b; b = temp;`.
*Piezīme pie risinājuma:* Tā kā norādes sasaistās ar oriģinālajiem mainīgajiem, funkcija maina abus mainīgos tieši funkcijā main.

---

#### Step: const-reference-for-containers [THEORY]
*Eyebrow:* Ātrdarbība un drošība
**Const norādes vektoriem un apjomīgiem datiem**

Nodošana pēc norādes novērš lieku datu kopēšanu. Taču, ja funkcijai nepieciešams vektoru tikai **nolasīt** (piemēram, aprēķināt vidējo vērtību vai izdrukāt izmēru), mēs nevēlamies pieļaut nejaušu datu izmainīšanu.

Nododot vektoru ar parasto norādi `vector<int> &v`, kļūda funkcijas kodā varētu sabojāt borta datora reģistrētos datus.

C++ piedāvā zelta standartu apjomīgiem datiem — **const norādi** (`const T &`):

```cpp
void inspect_path(const vector<int> &path) {
    cout << "WAYPOINTS: " << path.size() << endl;
    // path.push_back(10); // KOMPILATORA KĻŪDA: path ir tikai lasāms!
}
```

!> **Const norādes labā prakse.** Vienmēr nododiet `std::vector`, `std::string` un citus apjomīgus datus pēc `const &`, ja vien funkcijas tiešais uzdevums nav modificēt pašu konteineru. Tas garantē maksimālu ātrumu bez atmiņas kopēšanas un pilnīgu aizsardzību.

**Koda salīdzinājums:**
```cpp
#include <vector>
#include <iostream>
using namespace std;

void print_status(const vector<int> &v) {
    cout << "POINTS: " << v.size(); // Zero copy, fast!
}
```
[PAREIZI] Optimāla datu nolasīšana: const norāde nodod vektoru bez kopēšanas un aizsargā pret izmaiņām

```cpp
#include <vector>
using namespace std;

void print_status(const vector<int> &v) {
    v[0] = 99; // Error! const protects
    // from unintended modification
}
```
[KĻŪDA / SLAZDS] Kompilatora kļūda: mēģinājums mainīt datus caur const norādi tiek nekavējoties bloķēts


---

#### Step: find-value-copy-bug [CLICKLINE]
*Eyebrow:* Avionikas audits
**Nejaušas kopēšanas kļūdas atrašana**

Šai kalibrēšanas funkcijai bija jāpalielina drona sensora rādījums par 15 vienībām.

Tomēr pēc izsaukuma `main()` izdrukātais `sensor` joprojām ir 100! Noklikšķiniet uz rindiņas, kas izraisa šo kļūdu.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 4
**Explanation:** Rindiņā 4 ir definēts `void calibrate_sensor(int reading)`. Tā kā `reading` nodots pēc vērtības (trūkst zīmes `&`), funkcija maina tikai lokālo kopiju, un izsaucēja `sensor` paliek 100! Parametrs obligāti jādeklarē kā norāde `int &reading`.


---

#### Step: assemble-multi-return-ref [PARSONS]
*Eyebrow:* Parsons puzzle
**Vairāku rezultātu atgriešanas funkcijas salikšana**

Nepieciešama funkcija `divide_power`, kas sadala kopējo enerģiju starp dzīvības uzturēšanas konteineriem, atgriežot gan enerģiju vienam konteineram (dalījumu), gan atlikumu, izmantojot norādes.

Salieciet koda blokus pareizā secībā, lai realizētu un pārbaudītu šo moduli.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
*Eyebrow:* Konteinera analīze
**Const norādes vektora apstrādes izsekošana**

Izsekojiet šai sensoru analīzes funkcijai, kurai vektors tiek nodots pēc const norādes.

Nosakiet konsolē izdrukāto gala rindiņu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `ABOVE: 2 TOTAL: 5
`
**Explanation:** Funkcija `count_valid` saņem `sensors` pēc const norādes un saskaita elementus, kas ir `>= 100`. Šādi elementi ir 120 un 150 (skaits ir 2). Vektora izmērs saglabājas 5. Rezultāts ir `ABOVE: 2 TOTAL: 5`.


---

#### Step: drone-flight-trim-controller [EDITOR]
**Sigma un Omega telemetrijas trimēšanas kontrolieris**

**Task:**
Ieprogrammējiet IRIS flotes autonomo telemetrijas trimēšanas moduli:
1. Virs `main()` definējiet `void adjust_throttle(int &current, int target, int step)`: ja `current < target`, palieliniet `current += step`; ja `current > target`, samaziniet `current -= step`.
2. Virs `main()` definējiet `int scan_peak(const vector<int> &signals)`, kas atrod un atgriež lielāko vērtību vektorā `signals`.
3. Funkcijā `main()` nolasiet `throttle`, `target`, `step` un mērījumu skaitu `count` no `cin`.
4. Ciklā nolasiet `count` skaitļus vektorā `vector<int> readings;` ar `push_back`.
5. Izsauciet `adjust_throttle(throttle, target, step)`.
6. Izsauciet `scan_peak(readings)` un saglabājiet rezultātu mainīgajā `peak`.
7. Izdrukājiet `TRIMMED THROTTLE: `, mainīgo `throttle` un jaunu rindu.
8. Izdrukājiet `PEAK TELEMETRY: `, mainīgo `peak` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Nododiet dzinēja vilci pēc norādes `int &current`, lai tā mainītos funkcijā main. Vektoru nododiet pēc const norādes `const vector<int> &signals`.
*Piezīme pie risinājuma:* Šis noslēguma uzdevums demonstrē maināmu parametru norāžu apvienošanu ar ātrdarbīgām const norādēm datu analīzei.

---

#### Step: recap [THEORY]
*Eyebrow:* Kopsavilkums
**Parametru nodošanas veidu kopsavilkums**

Šajā misijā jūs apguvāt trīs C++ parametru nodošanas pamatveidus:

| Nodošanas veids | Sintakse | Darbība atmiņā | Labākais pielietojums |
| :--- | :--- | :--- | :--- |
| **Pēc vērtības** | `void fn(int x)` | Izveido kopiju; izsaucējs izolēts | Mazi pamatipi (`int`, `double`, `bool`, `char`) |
| **Pēc norādes** | `void fn(int &x)` | Piesaistās izsaucēja atmiņai; maina oriģinālu | Mainīgo vērtību atjaunināšana, vairāki rezultāti |
| **Pēc const norādes** | `void fn(const vector<int> &v)` | Bez kopēšanas; aizsargā pret izmaiņām | Vektori, teksta virknes, lieli datu objekti |


> **Nākamā tēma: 22. nodaļa — Pārslodze, redzamība, const (Overloading, Scope, Const).**

> Kad funkcijas prot pieņemt datus dažādos veidos, mēs apgūsim funkciju pārslogošanu: vienāda nosaukuma piešķiršanu dažādām dronu konfigurācijām (Sigma pret Omega) un mainīgo redzamības apgabalus.


---


# Lesson 22 · Pārslodze, redzamība, const
**Slug:** `overload-scope-const` | **Module:** 3. bloks · Dati

#### Step: why-overloading-and-scope [THEORY]
*Eyebrow:* Flotes pielāgojamība
**Kāpēc borta datoriem nepieciešama funkciju pārslogošana**

IRIS flote Marsa kanjonos izmanto dažādus lidaparātus. Izlūka drons **IZLŪKS 'Sigma'** ir viegls, aerodinamisks kvadrokopters, kura dzinēju vilces aprēķinam pietiek tikai ar lidojuma attālumu. Turpretī **KRAVAS 'Omega'** ir masīvs transporta drons, kura vilces formulā obligāti jāņem vērā gan attālums, gan smago ģeoloģisko konteineru masa.

Senākās valodās, piemēram, C, nācās izgudrot garus un mākslīgus nosaukumus: `calculate_thrust_scout()` un `calculate_thrust_cargo()`. Pievienojot trešo dronu, būtu vajadzīgs `calculate_thrust_cartographer()`. Tas piesārņo kodu un liek programmētājiem atcerēties desmitiem dažādu vārdu vienai un tai pašai loģiskajai darbībai.

C++ ievieš **funkciju pārslogošanu (overloading)**: iespēju definēt vairākas funkcijas ar **pilnīgi vienādu nosaukumu**, kas atšķiras tikai ar saviem parametriem (parametru skaitu vai to tipiem):

- **Vienots un skaidrs interfeiss.** Borta dators vienkārši izsauc `calculate_thrust(...)`. Kompilators jau kompilēšanas laikā analizē padotos argumentus un automātiski nosūta izpildi uz pareizo variantu.

- **Kompilēšanas laika efektivitāte.** Funkciju pārslogošana nerada nekādu papildu slodzi programmas izpildē.

- **Droša redzamība.** Ierobežojot mainīgos lokālos koda blokos `{}` un definējot nemainīgos bāzes parametrus ar `const`, mēs novēršam nejaušus datu bojājumus sarežģītās borta sistēmās.


---

#### Step: function-overloading-syntax [THEORY]
*Eyebrow:* Pārslogošanas likumi
**Funkciju pārslogošanas sintakses likumi**

Lai C++ valodā pārslogotu funkciju, uzraksta divas vai vairākas definīcijas ar vienādu nosaukumu, bet atšķirīgu **parakstu (signature)**:

```cpp
int thrust(int dist) { return dist * 10; }             // Sigma: 1 parametrs
int thrust(int dist, int mass) { return dist * 10 + mass * 2; } // Omega: 2 parametri
```

Kompilators automātiski piemeklē atbilstošo funkciju pēc izsaukuma argumentu skaita un tipiem:

- `thrust(50)` izsauc 1 parametra variantu dronam Sigma.

- `thrust(50, 1200)` izsauc 2 parametru variantu dronam Omega.

!> **Atgriežamā tipa ierobežojums.** Funkcijas NEVAR pārslogot, balstoties tikai uz atgriežamo tipu! Definējot `int get_stat()` un `double get_stat()` ar vienādiem parametriem, radīsies kompilatora kļūda. Kompilatoram jāspēj atpazīt funkcija tikai pēc argumentu saraksta.

> *Image Alt:* Shēma attēlo funkciju pārslogošanu, kur viens nosaukums 'thrust' atbilst dažādiem parametru sarakstiem, un bloka redzamības apgabalu ar figūriekavām.


---

#### Step: predict-overload-dispatch [PREDICT]
*Eyebrow:* Izsaukumu atpazīšana
**Pārslogoto funkciju izpildes izsekošana**

Izsekojiet šai programmai ar divām pārslogotām vilces aprēķina funkcijām.

Nosakiet konsolē izdrukāto galarezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `200 300
`
**Explanation:** Izsaukums `compute_thrust(20)` atbilst viena parametra funkcijai: `20 * 10 = 200`. Izsaukums `compute_thrust(20, 50)` atbilst divu parametru funkcijai: `20 * 10 + 50 * 2 = 200 + 100 = 300`. Rezultāts ir `200 300`.


---

#### Step: write-overloaded-burn [EDITOR]
**Pārslogots degvielas patēriņa kalkulators**

**Task:**
Ieprogrammējiet IRIS flotes dubulto degvielas patēriņa kalkulatoru ar pārslogošanu:
1. Virs `main()` definējiet `int burn(int dist)`, kas atgriež `dist * 5`.
2. Virs `main()` definējiet pārslogotu funkciju `int burn(int dist, int cargo)`, kas atgriež `dist * 5 + cargo * 3`.
3. Funkcijā `main()` nolasiet `dist` un `cargo` no `cin`.
4. Izdrukājiet `SIGMA: `, izsaukumu `burn(dist)` un jaunu rindu.
5. Izdrukājiet `OMEGA: `, izsaukumu `burn(dist, cargo)` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Abām funkcijām ir vienāds nosaukums `burn`. Kompilators tās atšķirs pēc tā, vai tiek padots 1 vai 2 argumenti.
*Piezīme pie risinājuma:* Pārslogojot funkciju burn, izsaucējs lieto vienu loģisku nosaukumu gan vieglā drona, gan kravas drona misijās.

---

#### Step: variable-scope-and-shadowing [THEORY]
*Eyebrow:* Redzamības arhitektūra
**Mainīgo dzīves cikls un bloka redzamība**

Katram mainīgajam C++ valodā ir noteikts **redzamības apgabals (scope)**, ko ierobežo figūriekavas `{}`, kurās tas tika deklarēts:

- **Lokālā redzamība:** Mainīgais, kas deklarēts funkcijā vai ciklā, eksistē tikai šajās iekavās. Tiklīdz programma sasniedz beigu iekavu `}`, mainīgais tiek iznīcināts no atmiņas.

- **Ārējie un iekšējie bloki:** Iekšējie koda bloki redz un var izmantot ārējos blokos deklarētos mainīgos. Taču ārējie bloki NEREDZ iekšējos mainīgos.

!> **Mainīgo aizēnošanas (shadowing) lamatas.** Ja iekšējā blokā deklarē mainīgo ar tieši tādu pašu vārdu kā ārējā blokā (`int battery = 10;`), iekšējais mainīgais **aizēno** (paslēpj) ārējo. Borta datoru programmās tā ir bīstama kļūdu vieta.

**Koda salīdzinājums:**
```cpp
int battery = 100;

void check() {
    if (battery > 20) {
        int boost = 5; // Clean local scope
        cout << battery + boost;
    }
}
```
[PAREIZI] Korekta bloka redzamība: iekšējais mainīgais eksistē tikai savā if blokā

```cpp
int battery = 100;

void check() {
    int battery = 10; // Variable shadowing!
    // Inner battery hides outer battery,
    // creating subtle logic bugs
}
```
[KĻŪDA / SLAZDS] Bīstama mainīgā aizēnošana: iekšējais mainīgais nejauši aizsedz ārējo


---

#### Step: find-scope-leak-bug [CLICKLINE]
*Eyebrow:* Redzamības audits
**Kļūdainas mainīgā piekļuves atrašana**

Šī programma `if` blokā aprēķina papildu vilces jaudu, bet pēc bloka beigām mēģina to izdrukāt konsolē.

Tomēr kompilators kodu noraida. Noklikšķiniet uz rindiņas, kas mēģina piekļūt ārpus redzamības apgabala esošam mainīgajam.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 10
**Explanation:** Rindiņā 10 programma mēģina izmantot `thrust_boost`. Bet `thrust_boost` tika deklarēts 6. rindiņas `if` blokā, un tā dzīves cikls beidzās pie 8. rindiņas figūriekavas `}`! Mēģinājums izmantot mainīgo ārpus tā redzamības apgabala rada kompilatora kļūdu.


---

#### Step: assemble-const-scope-guard [PARSONS]
*Eyebrow:* Parsons puzzle
**Globālās const konstantes pārbaudes salikšana**

Globālās konstantes, kas deklarētas ar `const` (piemēram, `const int MAX_LIMIT = 500;`), ir redzamas visās programmas funkcijās, un kompilators stingri aizsargā tās pret izmaiņām.

Salieciet koda blokus pareizā secībā: globālā konstante, pārbaudes funkcija un izsaukums funkcijā `main()`.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
*Eyebrow:* Aizēnošanas analīze
**Ielocīto bloku aizēnošanas izsekošana**

Izsekojiet mainīgā `level` vērtības izmaiņām cauri ielocītiem koda blokiem.

Nosakiet skaitli, ko konsolē izdrukā komanda `cout << level` funkcijā `main()`.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `20
`
**Explanation:** Funkcijā `main()` mainīgais `int level = 20;` aizēno globālo `level = 5`. Iekšējā blokā `{}` lokālais `int level = 99;` īslaicīgi aizsedz 20, taču tiek iznīcināts pie bloka beigām. Tāpēc `cout << level` izdrukā 20.


---

#### Step: drone-fleet-thrust-manager [EDITOR]
**IRIS flotes daudzprofilu vilces kontrolieris**

**Task:**
Ieprogrammējiet daudzprofilu vilces kontrolieri ar 3 pārslogotiem variantiem:
1. Definējiet globālo konstanti `const int SAFETY_CEILING = 1000;`.
2. Definējiet `int profile(int distance)`, kas atgriež `distance * 2`.
3. Definējiet pārslogotu funkciju `int profile(int distance, int payload)`, kas atgriež `distance * 2 + payload * 4`.
4. Definējiet pārslogotu funkciju `int profile(int distance, int payload, int wind_penalty)`, kas atgriež `distance * 2 + payload * 4 + wind_penalty * 10`.
5. Funkcijā `main()` nolasiet `dist`, `load` un `wind` no `cin`.
6. Izdrukājiet `SCOUT: `, rezultātu `profile(dist)` un jaunu rindu.
7. Izdrukājiet `CARGO: `, rezultātu `profile(dist, load)` un jaunu rindu.
8. Izdrukājiet `STORM: `, rezultātu `profile(dist, load, wind)` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Izveidojiet trīs funkcijas ar vienādu vārdu `profile` un 1, 2 un 3 parametriem. Kompilators atpazīs katru pēc padoto argumentu skaita.
*Piezīme pie risinājuma:* Šis noslēguma uzdevums parāda vienotu funkciju pārslogošanu dažādām drona slodzēm un laikapstākļiem.

---

#### Step: recap [THEORY]
*Eyebrow:* Kopsavilkums
**Pārslodzes, redzamības un const kopsavilkums**

Šajā misijā jūs apguvāt funkciju pārslogošanu un mainīgo dzīves ciklu pārvaldību:

| Jēdziens | Definīcija | Likums |
| :--- | :--- | :--- |
| **Funkciju pārslogošana** | Vairākas funkcijas ar vienādu vārdu | Jāatšķiras ar parametru skaitu vai to tipiem |
| **Atgriežamā tipa likums** | Nevar atšķirties tikai ar atgriežamo tipu | Kompilatora kļūda, ja vienādi parametri |
| **Bloka redzamība** | Redzamība figūriekavās `{}` | Mainīgais beidz eksistēt pie beigu iekavas `}` |
| **Aizēnošana (shadowing)** | Tāda paša vārda deklarēšana iekšējā blokā | Iekšējais mainīgais paslēpj ārējo |
| **Globālā `const`** | Visā programmā nemainīga vērtība | Tikai lasāma visās funkcijās; nulles izmaiņu risks |


> **Nākamā tēma: 23. nodaļa — PRAKTIKUMS: funkciju bibliotēka (Function Library Practicum).**

> Tagad mēs apvienosim visas 3. blokā apgūtās zināšanas vienotā kosmiskās bāzes IRIS utilītu bibliotēkā: navigācija, sensoru pārbaudes un bateriju diagnostika.


---


# Lesson 23 · Praktikums: funkciju bibliotēka
**Slug:** `practicum-library` | **Module:** 3. bloks · Dati

#### Step: library-architecture [THEORY]
*Eyebrow:* Praktikuma misija
**Bāzes IRIS funkciju bibliotēkas izveide**

Laipni lūgti **23. nodaļā — Praktikumā**! Visi trīs IRIS flotes droni — izlūks Sigma, kartogrāfs Delta un kravas drons Omega — atrodas bāzes centrālajā angārā.

Iepriekšējās nodarbībās mēs izstrādājām atsevišķas funkcijas degvielas patēriņam, koordinātu apmaiņai un telemetrijas analīzei. Kosmiskajā avionikā izkaisītas, neatkarīgas funkcijas rada milzīgu risku: ja Delta izmantos vienu robežu pārbaudes versiju, bet Omega — citu, kopīgā lidojumā radīsies bīstama koordinātu nesakritība.

Šodien mēs apvienojam visus rīkus vienotā **Bāzes IRIS Avionikas Funkciju Bibliotēkā (`libiris`)**:

- **Standartizētas apakšprogrammas.** Viena kopīga pārbaudītu funkciju kopa visām trim dronu klasēm.

- **Trīs parametru nodošanas veidi.** Tīrie matemātiskie aprēķini pēc vērtības, aparatūras kalibrēšana pēc norādes (`&`) un apjomīgas telemetrijas apstrāde bez kopēšanas pēc const norādes (`const &`).

- **Pārslogošanas elastība.** Vienoti, intuitīvi funkciju nosaukumi, kas automātiski pielāgojas dažādiem telemetrijas parametriem.


---

#### Step: library-modules-anatomy [THEORY]
*Eyebrow:* Arhitektūras pārskats
**Trīs IRIS bibliotēkas pamatmoduļi**

IRIS bibliotēka strukturē funkcijas trīs galvenajos arhitektūras moduļos:

- **1. modulis: Drošības predikāti (pēc vērtības).** Tīras funkcijas, kas pārbauda datus un atgriež `bool` (`is_valid`, `in_range`). Tā kā parametri tiek nodoti pēc vērtības, ir garantēts, ka funkcija neizraisīs nekādus blakusefektus izsaucēja atmiņā.

- **2. modulis: Aparatūras kalibrēšana (pēc norādes `&`).** Darbību procedūras ar `void`, kas tieši kalibrē sensoru nobīdes un samaina koordinātas izsaucēja operatīvajā atmiņā.

- **3. modulis: Telemetrijas analītika (pēc `const &`).** Ātrdarbīgas analītiskās funkcijas vektoru apstrādei bez atmiņas kopēšanas un ar stingru aizsardzību pret datu bojājumiem.

> **Praktikuma mērķis:** Šajā praktikumā jūs patstāvīgi izstrādāsiet, notestēsiet un integrēsiet visu trīs moduļu funkcijas vienotā borta datora programmā.

> *Image Alt:* Shēma attēlo IRIS funkciju bibliotēkas arhitektūru: drošības predikāti pēc vērtības, kalibrēšana pēc norādes un vektoru analītika pēc const norādes.


---

#### Step: predict-library-pipeline [PREDICT]
*Eyebrow:* Plūsmas analīze
**Kalibrēšanas un ierobežošanas plūsmas izsekošana**

Izsekojiet šai integrētajai telemetrijas apstrādes plūsmai, kas apvieno norādes kalibrēšanu un matemātisko ierobežošanu.

Nosakiet konsolē izdrukāto galarezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `100
`
**Explanation:** Sākotnējais sensora rādījums ir 85. Izsaukums `calibrate(sensor, 25)` nodod `sensor` pēc norādes, atjauninot to uz `85 + 25 = 110`. Pēc tam `clamp(110, 100)` konstatē, ka 110 pārsniedz 100, un atgriež 100, ko piešķir atpakaļ mainīgajam `sensor`. Konsolē tiek izdrukāts `100`.


---

#### Step: write-math-helpers [EDITOR]
**Matemātiskie palīgrīki: clamp un diff**

**Task:**
Ieprogrammējiet divas būtiskas libiris matemātisko aprēķinu funkcijas:
1. Virs `main()` definējiet `int clamp(int val, int lo, int hi)`: ja `val < lo`, atgriež `lo`; ja `val > hi`, atgriež `hi`; pretējā gadījumā atgriež `val`.
2. Virs `main()` definējiet `int diff(int a, int b)`: atgriež pozitīvo starpību starp `a` un `b` (`a - b`, ja `a >= b`, pretējā gadījumā `b - a`).
3. Funkcijā `main()` nolasiet `v`, `lo`, `hi`, `a` un `b` no `cin`.
4. Izdrukājiet `CLAMPED: `, rezultātu `clamp(v, lo, hi)` un jaunu rindu.
5. Izdrukājiet `DIFF: `, rezultātu `diff(a, b)` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Abas funkcijas atgriež veselu skaitli un nodod parametrus pēc vērtības. Pārliecinieties, ka diff vienmēr atgriež nenegatīvu skaitli.
*Piezīme pie risinājuma:* Šie pamatbloki tiek izmantoti augstuma ierobežošanai un sensoru noviržu mērīšanai visos lidojumos.

---

#### Step: write-vector-statistics [EDITOR]
**Telemetrijas statistika: summa un minimums**

**Task:**
Ieprogrammējiet ātrdarbīgas vektoru statistikas funkcijas bez atmiņas kopēšanas:
1. Virs `main()` definējiet `int compute_sum(const vector<int> &v)`, kas aprēķina visu `v` elementu summu.
2. Virs `main()` definējiet `int find_min(const vector<int> &v)`, kas atrod un atgriež mazāko vērtību vektorā `v` (inicializējiet ar `v[0]`).
3. Funkcijā `main()` nolasiet paraugu skaitu `count` no `cin`.
4. Ciklā nolasiet `count` skaitļus vektorā `vector<int> data;` ar `push_back`.
5. Izdrukājiet `SUM: `, summu `compute_sum(data)` un jaunu rindu.
6. Izdrukājiet `MIN: `, minimumu `find_min(data)` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Abās funkcijās vektoru nododiet kā `const vector<int> &v`, lai nodrošinātu maksimālu ātrumu bez kopēšanas.
*Piezīme pie risinājuma:* Const norādes nodrošina apjomīgu datu kopu analīzi ar nulles atmiņas izšķērdēšanu.

---

#### Step: find-library-ref-bug [CLICKLINE]
*Eyebrow:* Koda audits
**Trūkstošās norādes kļūdas atrašana**

Inženieris uzrakstīja funkciju `apply_trim`, lai tieši pielāgotu drona ātrumu izsaucēja atmiņā.

Tomēr testi rāda, ka `drone_speed` funkcijā `main()` vispār nemainās! Noklikšķiniet uz rindiņas, kas izraisa kļūdu.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 4
**Explanation:** Rindiņā 4 ir definēts `void apply_trim(int speed, int delta)`. Tā kā `speed` nodots pēc vērtības (trūkst `&`), funkcija maina tikai izolētu pagaidu kopiju, un izsaucēja `drone_speed` paliek nemainīts! Pareizam parakstam jābūt `int &speed`.


---

#### Step: assemble-telemetry-pipeline [PARSONS]
*Eyebrow:* Parsons puzzle
**Sensoru validācijas plūsmas salikšana**

Salieciet sensoru ielasīšanas un validācijas ciklu: predikāta funkcija `is_valid` pārbauda, vai vērtība nav negatīvs troksnis, un cikls saskaita derīgos paraugus.

Sakārtojiet koda blokus pareizā secībā, lai palaistu šo validācijas moduli.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Pārslogots robežu pārbaudes predikāts**

**Task:**
Ieprogrammējiet pārslogotus robežu pārbaudes predikātus:
1. Virs `main()` definējiet `bool in_range(int v, int max_limit)`: atgriež `true`, ja `v >= 0 && v <= max_limit`, pretējā gadījumā `false`.
2. Virs `main()` definējiet pārslogotu `bool in_range(int v, int min_limit, int max_limit)`: atgriež `true`, ja `v >= min_limit && v <= max_limit`, pretējā gadījumā `false`.
3. Funkcijā `main()` nolasiet `a`, `max_a`, `b`, `min_b` un `max_b` no `cin`.
4. Izdrukājiet `CHECK 1: `, rezultātu `in_range(a, max_a)` un jaunu rindu.
5. Izdrukājiet `CHECK 2: `, rezultātu `in_range(b, min_b, max_b)` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Abām funkcijām ir vienāds vārds in_range. Pirmā saņem 2 argumentus, otrā — 3.
*Piezīme pie risinājuma:* Pārslogošana ļauj pārbaudīt gan vienpusējas, gan divpusējas robežas ar vienotu un skaidru interfeisu.

---

#### Step: capstone-avionics-suite [EDITOR]
**Bāzes IRIS lidojumu diagnostikas komplekss**

**Task:**
Izveidojiet pilnu bāzes IRIS avionikas diagnostikas sistēmu:
1. Definējiet `bool is_valid_signal(int signal)`: atgriež `true`, ja `signal >= 0`, pretējā gadījumā `false`.
2. Definējiet `void apply_calibration(int &sensor_val, int offset)`: pieskaita `offset` tieši pie `sensor_val` atmiņā.
3. Definējiet `int fleet_energy_summary(const vector<int> &batteries, int &low_battery_count)`: saskaita visu bateriju līmeņus un atgriež to summu; skaitītājā `low_battery_count` (iepriekš to iestatot uz 0) saskaita, cik baterijām līmenis ir `< 20`.
4. Funkcijā `main()` nolasiet `sensor`, `offset` un bateriju skaitu `n` no `cin`.
5. Ciklā nolasiet `n` bateriju vērtības vektorā `vector<int> batteries;` ar `push_back`.
6. Izsauciet `apply_calibration(sensor, offset)`.
7. Izsauciet `fleet_energy_summary(batteries, low_count)` un saglabājiet summu mainīgajā `total`.
8. Izdrukājiet `CALIBRATED SENSOR: `, mainīgo `sensor` un jaunu rindu.
9. Izdrukājiet `TOTAL FLEET ENERGY: `, mainīgo `total` un jaunu rindu.
10. Izdrukājiet `CRITICAL PODS: `, mainīgo `low_count` un jaunu rindu.

**Etalona risinājums:**
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

*Padoms:* Mainīgo low_count deklarējiet pirms funkcijas izsaukuma, lai funkcija to varētu atjaunināt pēc norādes.
*Piezīme pie risinājuma:* Šis noslēguma uzdevums apvieno vērtību predikātus, tiešu norāžu kalibrēšanu un const-norāžu analītiku vienotā aviācijas sistēmā.

---

#### Step: recap [THEORY]
*Eyebrow:* Praktikuma kopsavilkums
**Avionikas bibliotēka pilnībā apgūta**

Apsveicam ar lielisku sniegumu! Jūs esat izveidojis vienotu **IRIS Avionikas Funkciju Bibliotēku**:

- **Trīs parametru nodošanas veidi.** Pēc vērtības tīriem aprēķiniem, pēc norādes (`&`) tiešām izmaiņām un pēc const norādes (`const &`) ātrai analīzei bez kopēšanas.

- **Funkciju pārslogošana.** Elastīgas borta apakšprogrammas zem vienotiem, skaidriem nosaukumiem.

- **Modulāra programmatūra.** Reāllaika kosmiskajiem standartiem atbilstoši neatkarīgi un pārbaudāmi moduļi.

> **Nākamā tēma: 24. nodaļa — KONTROLPUNKTS (3. bloka noslēgums).**

> Nākamajā nodaļā jūs gaida visaptverošais **Flotes operatora kvalifikācijas pārbaudījums (1.–24. nodarbība)**. 24. nodaļas nokārtošana nozīmē pilnīgu C++ pamatu kodola apguvi!


---


# Lesson 24 · Kontrolpunkts: Bāzes sertifikācija
**Slug:** `checkpoint` | **Module:** 3. bloks · Dati

#### Step: operator-qualification-brief [THEORY]
**Misijas statuss: Sertifikācijas eksāmens**


---

#### Step: core-knowledge-roadmap [THEORY]
**Arhitektūras pamatu ceļvedis**


---

#### Step: exam-predict-composite-loop [PREDICT]
**Diagnostika: Cikla iterācija un vadība**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `16
`

---

#### Step: exam-audit-syntax-bug [CLICKLINE]
**Diagnostika: Norādes kļūdas audits**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 4

---

#### Step: exam-core-challenge-1-filtering [EDITOR]
**1. izaicinājums: Telemetrijas diapazona filtrs**

**Task:**
1. Uzraksti `bool is_stable(int reading)`, kas atgriež `true`, ja `reading >= 20 && reading <= 80`.
2. Funkcijā `main()` nolasi `n` un aizpildi `vector<int> readings` ar `push_back()`.
3. Saskaiti, cik elementu atbilst `is_stable()` nosacījumam.
4. Izvadi `STABLE COUNT: <skaits>` ar jaunu rindu.

**Etalona risinājums:**
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
**Diagnostika: Matricas diagonāle**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `50
`

---

#### Step: exam-parsons-modular-dispatch [PARSONS]
**Diagnostika: Funkciju pārslogošanas montāža**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**2. izaicinājums: Signāla apgriešana pēc norādes**

**Task:**
1. Definē `void trim_channel(int &signal, int baseline, int max_cap)`.
2. Atņem `baseline` no `signal` un ierobežo diapazonā `[0, max_cap]`.
3. Funkcijā `main()` nolasi `sig`, `base`, `cap`, izsauc `trim_channel` un izvadi `TRIMMED SIGNAL: <sig>`.

**Etalona risinājums:**
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
**Lielais kontrolpunkts: Flotes misijas direktors**

**Task:**
1. Izveido funkcijas `is_sector_safe`, `apply_thrust_trim` un `audit_telemetry`.
2. Funkcijā `main()` nolasi telemetrijas ievaddatus un aizpildi `vector<int> samples`.
3. Izsauc visas trīs funkcijas uz iegūtajiem datiem.
4. Izvadi `SECTOR SAFETY: <1 vai 0>`.
5. Izvadi `FINAL THRUST: <val>`.
6. Izvadi `TELEMETRY SUM: <sum>`.
7. Izvadi `HAZARD SAMPLES: <count>`.

**Etalona risinājums:**
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
**Sertifikācija pabeigta**


---
