# Course: C++ Programming — Mission IRIS (67coder)
## Block 2: 2. bloks · Lēmumi (LV)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 9 to 16.*

---


# Lesson 9 · Nosacījumi if / else
**Slug:** `if-else` | **Module:** 2. bloks · Lēmumi

#### Step: why-autonomy [THEORY]
*Eyebrow:* Sakaru aizkave un autonomija
**Kāpēc dronam jālemj pašam**

Izlūkdrons Sigma paceļas gaisā no bāzes IRIS un uzsāk tālu lidojumu uz Mawrth Vallis kanjonu. Dronam attālinoties aiz kalnu grēdas, radiosakaru signāla aizkave starp aparātu un bāzes dispečeru sāk strauji pieaugt.

Attālumā no Zemes līdz Marsam radiosignāls gaismas ātrumā ceļo no 3 līdz 22 minūtēm katrā virzienā. Pat vietējā sakaru lokā aizkave liedz vadīt dronu ar manuālu sviru reāllaikā: ja Sigma ceļā pēkšņi parādās klints un operatoram būtu jānosūta komanda ar roku, aparāts ietriektos šķērslī daudz ātrāk, nekā signāls paspētu nonākt līdz bāzei.

Lai izdzīvotu skarbajos planētas apstākļos, borta datoram jāspēj pieņemt autonomus lēmumus tieši lidojuma laikā, balstoties uz sensoru rādījumiem. Līdz šim visas mūsu programmas izpildījās stingri lineāri — no pirmās rindas līdz pēdējai. Ar nosacījumiem mēs iemācīsim programmai zarošanos: spēju izvēlēties dažādus koda ceļus atkarībā no situācijas.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Inside the forward avionics observation bay of Mars base IRIS at dusk. Through a reinforced panoramic observation viewport, Scout drone Sigma with dark carbon-slate faceted hull and warm amber thruster vents glides autonomously over a rugged canyon on Mars. Standing at an illuminated tactical navigation console, monitoring telemetry and radio delay counters, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Distant Martian hills and canyons rendered in desaturated warm greys, strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the telemetry display and drone sensor beam.


##### [Arhīva ieraksts] Kāpēc Marsa aparāti lēmumus pieņem paši
Gaisma un radioviļņi vakuumā pārvietojas ar fundamentālu fizikas ātrumu — aptuveni 299 792 kilometri sekundē. Tā kā Zeme un Marss nepārtraukti riņķo ap Sauli dažādās orbītās, attālums starp abām planētām svārstās no 56 miljoniem kilometru tuvākajā punktā līdz pat 401 miljonam kilometru pretējās Saules pusēs.

Tas nozīmē, ka radiosakaru aizkave vienā virzienā ilgst no 3,1 līdz 22,3 minūtēm. Pilns sakaru cikls — nosūtīt komandu, sagaidīt izpildi un saņemt atbildes telemetriju — prasa no 6 līdz pat 44 minūtēm. Šādos apstākļos vadīt aparātu reāllaikā ar kloķi nav iespējams pēc dabas likumiem.

1997. gadā pirmais Marsa mikroroveris Sojourner izmantoja piecus lāzera starus šķēršļu noteikšanai un patstāvīgi apstājās, ja priekšā pamanīja akmeni. Mūsdienu izpētes aparāti, tostarp Curiosity un Perseverance, izmanto autonomās navigācijas sistēmu AutoNav: borta dators analizē stereokameru kadrus, atrod draudus un pats aprēķina drošu apbraukšanas trajektoriju bez Zemes iejaukšanās.

Avots: NASA JPL Mars Exploration Rover Mission: Autonomous Navigation (AutoNav); NASA Mars Fact Sheet (Radio Travel Time).


---

#### Step: comparison-operators [THEORY]
*Eyebrow:* Loģiskā salīdzināšana
**Salīdzināšanas operatori**

Pirms pieņemt lēmumu, programmai ir jāsalīdzina vērtības savā starpā: vai augstums ir mazāks par drošo robežu, vai baterijas uzlāde ir pietiekama, vai sensora statuss atbilst normai.

C++ valodā salīdzināšanai izmanto sešus attiecību operatorus. Katra salīdzināšanas izteiksme tiek novērtēta un atgriež loģisko vērtību `bool`: patiesu (`true`, kas terminālī tiek izvadīts kā 1) vai aplamu (`false`, kas tiek izvadīts kā 0):

| Operators | Nozīme | Koda piemērs | Rezultāts |
| :--- | :--- | :--- | :--- |
| `==` | Vienāds ar | `speed == 60` | `true` (1), ja ātrums ir tieši 60 |
| `!=` | Nav vienāds ar | `status != 0` | `true` (1), ja statuss nav 0 |
| `<` | Mazāks par | `altitude < 20` | `true` (1), ja augstums zem 20 |
| `>` | Lielāks par | `battery > 90` | `true` (1), ja baterija virs 90 |
| `<=` | Mazāks vai vienāds | `dist <= 10` | `true` (1), ja distance ir 10 vai mazāka |
| `>=` | Lielāks vai vienāds | `charge >= 25` | `true` (1), ja uzlāde ir 25 vai lielāka |

!> **Bīstamākais slazds: vienādība `==` pret piešķiršanu `=`.** Viens vienādības simbols `=` piešķir mainīgajam jaunu vērtību. Divi simboli `==` salīdzina divas vērtības, nemainot mainīgo saturu. Ja nosacījumā nejauši uzrakstīsiet `speed = 60`, dators piešķirs ātrumam 60, un šis nosacījums vienmēr skaitīsies patiess!

**Koda salīdzinājums:**
```cpp
int speed = 60;
if (speed == 60) {
    // valid equality comparison
}
```
[PAREIZI] Korekta salīdzināšana: operators == pārbauda vienādību, nemainot mainīgo

```cpp
int speed = 60;
if (speed = 60) {
    // bug: assigns 60, condition is always true
}
```
[KĻŪDA / SLAZDS] Kritiska kļūda: operators = pārraksta mainīgā vērtību un izkropļo nosacījumu


---

#### Step: predict-comparison [PREDICT]
**Paredziet salīdzināšanas iznākumu**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `1
0`
**Explanation:** Pirmais nosacījums `15 < 20` ir patiess, tādēļ `cout` izvada `1`. Otrais nosacījums `15 != 15` ir aplams (skaitlis 15 ir vienāds ar 15), tādēļ `cout` izvada `0` jaunā rindā.


---

#### Step: if-syntax [EXPLAIN]
*Eyebrow:* Viena zara lēmums
**Nosacījuma teikums if**

Operators `if` ļauj izpildīt koda fragmentu tikai tad, ja konkrētais nosacījums izrādās patiess.

syntax: if ({condition}) {
    {action}
}
- if: C++ atslēgvārds, kas ievada nosacījuma pārbaudi
- condition: izteiksme apaļajās iekavās, kas novērtējas kā true vai false
- action: komandas figūriekavās, ko izpilda tikai tad, ja nosacījums ir patiess
- { }: figūriekavas apvieno darbības vienotā koda blokā

> Nosacījuma izpildes likums:
> 1. Dators novērtē nosacījumu apaļajās iekavās `(condition)`.
> 2. Ja rezultāts ir `true`, programma ieiet figūriekavu blokā `{ action }` un izpilda visas tajā esošās rindas.
> 3. Ja rezultāts ir `false`, programma pilnībā izlaiž figūriekavu bloku un uzreiz turpina darbu no nākamās rindas aiz aizverošās iekavas `}`.

!> **Semikola slazds tūlīt aiz if.** Nekad nelieciet semikolu tūlīt aiz apaļajām iekavām: `if (altitude < 20);`. Šāds semikols izveido tukšu teikumu, un figūriekavu bloks zem tā izpildīsies vienmēr neatkarīgi no augstuma!

> *Image Alt:* Diagramma parāda if zara izpildes shēmu: patiess nosacījums novirza izpildi uz brīdinājuma bloku, bet aplams nosacījums to pilnībā apiet.


---

#### Step: altitude-alert [EDITOR]
**Borta augstuma drošības pārbaude**

**Task:**
Uzrakstiet Sigmas pirmo autonomo drošības pārbaudi:
1. Pārbaudiet, vai mainīgais `altitude` ir mazāks par 20.
2. Ja nosacījums ir patiess, izvadiet brīdinājuma tekstu formātā zemāk.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
WARNING: LOW ALTITUDE
```

**Etalona risinājums:**
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
*Padoms:* Izmantojiet `if (altitude < 20) { cout << "WARNING: LOW ALTITUDE" << endl; }`.
*Piezīme pie risinājuma:* Tā kā augstums ir 14 metri, nosacījums 14 < 20 ir patiess un brīdinājums tiek izvadīts.

---

#### Step: find-equality-bug [CLICKLINE]
**Atrodiet kļūdaino salīdzināšanas rindu**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** Rindā 7 ir uzrakstīts `if (status_code = 1)`. Viena vienādības zīme `=` piešķir mainīgajam vērtību 1, nevis salīdzina to. Pārbaudei obligāti jāizmanto divas zīmes: `if (status_code == 1)`.


---

#### Step: if-else-branches [THEORY]
*Eyebrow:* Divu virzienu izvēle
**Sazarojums if ... else**

Bieži vien programmai nepietiek tikai ar brīdinājuma parādīšanu — ir jāizvēlas viena no divām alternatīvām darbībām. Ja nosacījums izpildās, darām vienu; ja neizpildās, darām ko citu.

Šim nolūkam C++ izmanto konstrukciju `if ... else`. Vārds `else` (pretējā gadījumā) definē alternatīvo zaru, kam nav savu apaļo iekavu ar nosacījumu:

syntax: if ({condition}) {
    {action_true}
} else {
    {action_false}
}
- if: pirmā nosacījuma pārbaude
- condition: loģiskā izteiksme apaļajās iekavās
- action_true: darbības, ko izpilda, ja nosacījums ir patiess (true)
- else: atslēgvārds alternatīvajam zaram — bez sava nosacījuma
- action_false: darbības, ko izpilda, ja nosacījums ir aplams (false)

+ **Zars if.** Izpildās tad un tikai tad, ja nosacījums ir `true`. Šajā gadījumā zars `else` tiek pilnībā ignorēts.
+ **Zars else.** Izpildās tad un tikai tad, ja nosacījums ir `false`. Tieši viens no abiem blokiem garantēti tiks izpildīts.

**Koda salīdzinājums:**
```cpp
if (battery >= 20) {
    cout << "GO";
} else {
    cout << "STOP";
}
```
[PAREIZI] Vienots if / else: garantē tieši viena alternatīvā zara izpildi bez liekām pārbaudēm

```cpp
if (battery >= 20) {
    cout << "GO";
}
if (battery < 20) {
    cout << "STOP";
}
```
[KĻŪDA / SLAZDS] Divi neatkarīgi if: lieka koda dublēšana un risks kļūdīties ar pretējiem nosacījumiem


---

#### Step: battery-decision [EDITOR]
**Autonoma baterijas lēmuma pieņemšana**

**Task:**
Noprogrammējiet Sigmas enerģijas dispečeru:
1. Nolasiet baterijas līmeni no konsoles `cin` mainīgajā `battery`.
2. Ja `battery >= 25`, izvadiet atļauju lidojuma turpināšanai.
3. Pretējā gadījumā (`else`) izvadiet komandu doties uz uzlādi, kā parādīts zemāk.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SIGMA: RECHARGE
```

**Etalona risinājums:**
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
*Padoms:* Nolasiet ar `cin >> battery;`, tad uzrakstiet `if (battery >= 25) { ... } else { ... }`.
*Piezīme pie risinājuma:* Ja ievadīts 18, nosacījums 18 >= 25 ir aplams, tādēļ izpildās else zars ar paziņojumu par uzlādi.

---

#### Step: multi-branch-else-if [THEORY]
*Eyebrow:* Vairāku pakāpju lēmumi
**Kaskāde if ... else if ... else**

Reālās situācijās iespējamo stāvokļu bieži ir vairāk par diviem. Piemēram, šķēršļa attālums var būt kritisks, bīstams vai pilnīgi drošs. Lai pārbaudītu vairākus nosacījumus pēc kārtas, C++ piedāvā konstrukciju `else if`.

syntax: if ({cond1}) {
    {action1}
} else if ({cond2}) {
    {action2}
} else {
    {fallback}
}
- if: pirmā pārbaude kaskādē
- cond1: pirmais izvērtējamais nosacījums
- else if: papildu pārbaude, ko vērtē tikai tad, ja iepriekšējais nosacījums bija false
- cond2: otrais nosacījums
- else: gala drošības zars, ja neviens no nosacījumiem neizpildījās
- fallback: noklusējuma darbība visiem pārējiem gadījumiem

> Kaskādes izpildes trīs zelta likumi:
> 1. **Pārbaude secīgi no augšas uz leju.** Dators sāk ar pirmo `if` un iet uz leju pie `else if` tikai tad, ja iepriekšējā pārbaude bija `false`.
> 2. **Pirmais atbilstošais uzvar.** Tiklīdz kāds nosacījums izrādās `true`, tā figūriekavu bloks tiek izpildīts, un VISI pārējie kaskādes zari tiek nekavējoties izlaisti!
> 3. **Rezerves zars else nav obligāts, bet vēlams.** Tas nodrošina drošu noklusējuma darbību, ja neviens no konkrētajiem gadījumiem nav nostrādājis.


##### [Dziļāk] Kā procesors prognozē zarus 'zem pārsega'
Mūsdienu procesori izpilda instrukcijas caur konveijeru (instruction pipeline). Lai negaidītu, kamēr tiks pabeigts lēns atmiņas salīdzinājums, procesora borta mikrosistēma Branch Predictor mēģina uzminēt, kurš zars izpildīsies, vēl pirms nosacījums ir izskaitļots.

Procesors sāk spekulatīvi izpildīt uzminētā zara instrukcijas uz priekšu. Ja minējums izrādās pareizs, programma nezaudē nevienu takti un lidojuma vadība darbojas ar maksimālu ātrumu.

Ja minējums bija kļūdains (branch misprediction), procesoram ir jāiztīra viss konveijers (pipeline flush) un jāsāk zara izpilde no jauna. Šāda kļūda prasa 10–20 procesora taktis. Tādēļ augstas veiktspējas kaskādēs visbiežāk sastopamos gadījumus programmētāji liek pašā augšā.


---

#### Step: assemble-terrain-check [PARSONS]
**Salieciet reljefa drošības kaskādi**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
1. `if (dist <= 10) {`
2. `    cout << "HALT" << endl;`
3. `} else if (dist <= 50) {`
4. `    cout << "SLOW" << endl;`
5. `} else {`
6. `    cout << "CRUISE" << endl;`
7. `}`

**Explanation:** Korekta kaskāde sākas ar `if (dist <= 10)`, kam seko darbība un aizverošā iekava ar nākamo pārbaudi `} else if (dist <= 50)`, un noslēdzas ar universālo `} else {` zaru.


---

#### Step: drone-obstacle-avoidance [EDITOR] (Papilduzdevums)
**Papilduzdevums: Autonoms šķēršļu apvedējs**

**Task:**
Noprogrammējiet drona Sigmas šķēršļu analīzes mezglu:
1. Nolasiet attālumu līdz šķērslim metros no `cin` mainīgajā `distance`.
2. Ja `distance <= 10`, izvadiet ārkārtas bremzēšanas komandu.
3. Ja `distance <= 50`, izvadiet šķēršļa apiešanas manevra komandu.
4. Visos citos gadījumos izvadiet paziņojumu par brīvu ceļu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
ACTION: EVADE OBSTACLE
```

**Etalona risinājums:**
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
*Padoms:* Izmantojiet kaskādi `if (distance <= 10) { ... } else if (distance <= 50) { ... } else { ... }`.
*Piezīme pie risinājuma:* Ievadot distanci 35 metrus, pirmais nosacījums 35 <= 10 ir aplams, bet otrais 35 <= 50 ir patiess, tādēļ tiek izvadīts ACTION: EVADE OBSTACLE.

---

#### Step: recap [SUMMARY]
**9. misijas kopsavilkums: Lēmumu pieņemšana apgūta**

Bāze IRIS apstiprina telemetriju: izlūkdrons Sigma ir veiksmīgi apguvis sensoru analīzi un spēj pieņemt navigācijas lēmumus bez operatora tiešas vadības.

| Konstrukcija | Sintakse | Zaru skaits | Kad izmantot kosmosa misijā |
| :--- | :--- | :--- | :--- |
| Salīdzināšana | `==`, `!=`, `<`, `>`, `<=`, `>=` | — | Sensoru rādījumu pārbaude pret kritiskiem sliekšņiem |
| Vienkāršs `if` | `if (cond) { ... }` | 1 | Brīdinājuma paziņojums vai trauksmes signāls |
| Sazarojums `if/else` | `if (cond) { ... } else { ... }` | 2 | Viena no divām alternatīvām (lidot uz priekšu vai uzlādēties) |
| Kaskāde `else if` | `if ... else if ... else` | 3+ | Daudzlīmeņu diagnostika (avārija, piesardzība, normāls režīms) |

Nākamajā, 10. nodaļā «Loģiskās operācijas» mēs apgūsim operatorus `&&` (UN), `||` (VAI) un `!` (NE), lai Sigma spētu apvienot vairāku sensoru rādījumus vienā saliktā nosacījumā pirms pacelšanās.


---


# Lesson 10 · Loģiskās operācijas
**Slug:** `logic` | **Module:** 2. bloks · Lēmumi

#### Step: multi-sensor-flight [THEORY]
*Eyebrow:* Daudzkritēriju analīze
**Kāpēc ar vienu sensoru nepietiek**

Izlūkdrons Sigma atrodas uz klinšainas terases virs Mawrth Vallis lielā lūzuma. Priekšā ir bīstams kanjona šķērsojums, kur iespējami pēkšņi vēja brāzmu triecieni un retinātās atmosfēras turburence.

Iepriekšējā nodaļā mēs pieņēmām lēmumus pēc viena parametra: ja augstums par mazu, rādām brīdinājumu. Taču reālā kosmosa lidojumā viens sensors nekad nesniedz pilnu ainu: pacelšanās nedrīkst notikt tikai tāpēc, ka baterija ir pilna, ja vienlaikus plosās vētra vai atteicis navigācijas dators.

Lai pieņemtu drošus lēmumus, borta datoram jāspēj apvienot vairāku sensoru rādījumus vienā saliktā loģiskā izteiksmē. Valodā C++ šim nolūkam izmanto trīs loģiskos operatorus: `&&` (UN), `||` (VAI) un `!` (NE).

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On an elevated rocky observation ridge overlooking a massive Martian rift canyon at twilight. Scout drone Sigma with dark carbon-slate faceted hull rests ready on the launch pad, its engine nozzles glowing in warm amber. Projected in front of the drone is an illuminated holographic pre-flight checklist with green and amber status indicators. Standing nearby at a tactical telemetry terminal is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Distant Martian canyon walls in desaturated warm greys, strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the holographic display glow.


##### [Arhīva ieraksts] Džordžs Buls, Klods Šenons un loģiskā algebra
1854. gadā angļu matemātiķis Džordžs Buls publicēja darbu «Domāšanas likumi» (The Laws of Thought), kurā piedāvāja aprakstīt loģiskus spriedumus ar matemātiskiem simboliem. Viņa sistēmā bija tikai divas vērtības — patiess (1) un aplams (0) — un trīs pamatdarbības: UN, VAI, NE.

Gandrīz gadsimtu Bula algebra palika teorētiska matemātikas disciplīna. Tas mainījās 1937. gadā, kad 21 gadu vecais MIT maģistrants Klods Šenons savā diplomdarbā pierādīja, ka elektriskie slēdži un releji spēj tieši izpildīt Bula loģiskās funkcijas. Saslēdzot divus slēdžus virknē, strāva plūst tikai tad, ja ieslēgts pirmais UN otrais; saslēdzot paralēli — ja ieslēgts pirmais VAI otrais.

Šenona atklājums kļuva par visas digitālās elektronikas pamatu. No vienkāršākajiem mikrokontrolieriem līdz Marsa zonžu borta datoriem visi procesori iekšēji sastāv no loģiskajiem elementiem, kas fiziski īsteno tieši Bula algebru.

Avots: Claude Shannon, 'A Symbolic Analysis of Relay and Switching Circuits' (Transactions of the AIEE, 1938); George Boole, 'An Investigation of the Laws of Thought' (1854).


---

#### Step: logical-and [THEORY]
*Eyebrow:* Kopīgā patiesuma pārbaude
**Loģiskais UN (&&)**

Operators `&&` (divi ampersendi) apvieno divus nosacījumus vienotā pārbaudē. Rezultāts ir patiess (`true`) tad un tikai tad, ja **abi** nosacījumi ir patiesi vienlaicīgi.

syntax: ({cond1}) && ({cond2})
- cond1: pirmais nosacījums apaļajās iekavās
- &&: loģiskais UN operators — pieprasa abu pušu patiesumu
- cond2: otrais nosacījums apaļajās iekavās

| cond1 | cond2 | `cond1 && cond2` | Nozīme misijā |
| :--- | :--- | :--- | :--- |
| `true` (1) | `true` (1) | **`true` (1)** | Baterija pilna UN vējš mierīgs → atļauja pacelties |
| `true` (1) | `false` (0) | **`false` (0)** | Baterija pilna, bet vējš par stipru → aizliegts |
| `false` (0) | `true` (1) | **`false` (0)** | Vējš mierīgs, bet baterija tukša → aizliegts |
| `false` (0) | `false` (0) | **`false` (0)** | Abi parametri ārpus normas → aizliegts |

> Iekavu likums skaidrībai:
> Lai gan salīdzināšanas operatoriem (`<`, `>=`, `==`) ir augstāka prioritāte nekā `&&`, vienmēr lieciet katru atsevišķo pārbaudi apaļajās iekavās: `(battery >= 50) && (wind <= 15)`. Tas novērš kļūdas un padara lidojuma kodu uzreiz saprotamu citam inženierim.

**Koda salīdzinājums:**
```cpp
if (battery >= 50 && wind <= 15) {
    cout << "LIFTOFF";
}
```
[PAREIZI] Elegants salikts nosacījums ar &&: viena skaidra rinda bez liekiem iekavojumiem

```cpp
if (battery >= 50) {
    if (wind <= 15) {
        cout << "LIFTOFF";
    }
}
```
[KĻŪDA / SLAZDS] Neveikls iekšējais if: dubultas figūriekavas un lieka koda sarežģītība


---

#### Step: predict-and [PREDICT]
**Paredziet pacelšanās atļaujas loģiku**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `0`
**Explanation:** Pirmais nosacījums `70 >= 50` ir patiess (1), taču otrais nosacījums `20 <= 15` ir aplams (0), jo vējš ir par stipru. Tā kā operatoram `&&` nepieciešams abu pušu patiesums, kopējais rezultāts ir aplams, un `cout` izvada `0`.


---

#### Step: liftoff-clearance [EDITOR]
**Sigmas starta atļaujas modulis**

**Task:**
Noprogrammējiet pacelšanās drošības pārbaudi:
1. Pārbaudiet, vai baterija `battery >= 50` UN vēja ātrums `wind <= 15`.
2. Ja abi nosacījumi izpildās, izvadiet atļaujas paziņojumu formātā zemāk.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
LIFTOFF: APPROVED
```

**Etalona risinājums:**
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
*Padoms:* Izmantojiet `if (battery >= 50 && wind <= 15) { cout << "LIFTOFF: APPROVED" << endl; }`.
*Piezīme pie risinājuma:* Tā kā uzlāde ir 85% un vējš ir 12 m/s, abi nosacījumi ir patiesi un pacelšanās tiek apstiprināta.

---

#### Step: logical-or [THEORY]
*Eyebrow:* Alternatīvo draudu noteikšana
**Loģiskais VAI (||)**

Operators `||` (divas vertikālās svītras) atgriež `true`, ja **vismaz viens** no nosacījumiem ir patiess. Ja pirmais nosacījums ir patiess VAI otrais ir patiess (vai abi reizē), visa izteiksme ir patiesa.

syntax: ({cond1}) || ({cond2})
- cond1: pirmais nosacījums
- ||: loģiskais VAI operators (tastatūrā Shift + zīme virs Enter vai blakus kreisajam Shift)
- cond2: otrais nosacījums

| cond1 | cond2 | `cond1 \|\| cond2` | Nozīme trauksmes sistēmā |
| :--- | :--- | :--- | :--- |
| `true` (1) | `true` (1) | **`true` (1)** | Korpuss bojāts UN dzinējs pārkarsis → TRAUKSME |
| `true` (1) | `false` (0) | **`true` (1)** | Korpuss bojāts, dzinējs normā → TRAUKSME |
| `false` (0) | `true` (1) | **`true` (1)** | Korpuss vesels, dzinējs pārkarsis → TRAUKSME |
| `false` (0) | `false` (0) | **`false` (0)** | Visi rādītāji normā → lidojums turpinās |

!> **Cilvēku valodas slazds: `x == 1 || 2`.** Cilvēki runā: «ja kods ir 1 vai 2». Ja C++ uzrakstīsiet `if (code == 1 || 2)`, kompilators to sapratīs kā divas atsevišķas daļas: `code == 1` un patstāvīgu skaitli `2`. Valodā C++ jebkurš nenulles skaitlis nozīmē `true`, tādēļ šāds nosacījums būs patiess VIENMĒR! Pareizi ir pilnībā atkārtot salīdzinājumu: `if (code == 1 || code == 2)`.

**Koda salīdzinājums:**
```cpp
if (status == 1 || status == 2) {
    cout << "WARNING";
}
```
[PAREIZI] Korekta pārbaude: mainīgais tiek pilnībā salīdzināts abās operatora || pusēs

```cpp
if (status == 1 || 2) {
    // bug: 2 is non-zero (true), condition is always true!
    cout << "WARNING";
}
```
[KĻŪDA / SLAZDS] Kritisks loģikas slazds: skaitlis 2 atsevišķi novērtējas kā true, padarot if vienmēr patiesu


---

#### Step: find-or-syntax-bug [CLICKLINE]
**Atrodiet nepilnīgā nosacījuma kļūdu**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** Rindā 7 ir uzrakstīts `if (error_code == 10 || 20)`. Skaitlis 20 bez salīdzināšanas C++ vienmēr nozīmē `true`, tādēļ trauksme ieslēgtos pat pie error_code = 0! Pareizi jāraksta `if (error_code == 10 || error_code == 20)`.


---

#### Step: logical-not [EXPLAIN]
*Eyebrow:* Loģiskā apgriešana
**Loģiskais NE (!) un signālu vārti**

Operators `!` (izsaukuma zīme) veic loģisko inversiju: pārvērš patiesu par aplamu un aplamu par patiesu.

syntax: !({condition})
- !: unārais loģiskais nolieguma operators — apgriež sekojošo vērtību
- condition: apgriežamais nosacījums vai bool mainīgais

+ **Patiess kļūst aplams.** `!true` novērtējas kā `false` (0). Piemēram, ja `has_error = true`, tad `!has_error` ir `false`.
+ **Aplams kļūst patiess.** `!false` novērtējas kā `true` (1). Ja aparātam nav kļūdu (`has_error = false`), pārbaude `if (!has_error)` sekmīgi izpildīsies.
+ **Iekavu nozīme pie ! operatora.** Operatoram `!` ir ļoti augsta prioritāte. Ja vēlaties noliegt izteiksmi, lieciet to iekavās: `!(altitude < 20)` nozīmē «augstums NAV mazāks par 20».

> *Image Alt:* Diagramma attēlo trīs digitālās loģikas pamatoperācijas: UN (&&), VAI (||) un NE (!) ar to signālu plūsmām.


---

#### Step: short-circuit-evaluation [THEORY]
*Eyebrow:* Ātrdarbība un aizsardzība
**Īssavienojuma novērtēšana (Short-circuit)**

C++ loģiskos operatorus aprēķina stingri no kreisās uz labo pusi. Taču kompilators ir gudrs: tas pārtrauc izteiksmes rēķināšanu tajā pašā mirklī, kad gala iznākums jau ir garantēts.

+ **Īssavienojums ar &&.** Ja kreisā puse ir `false`, visa izteiksme garantēti būs `false` neatkarīgi no labās puses. Tādēļ labā puse vispār netiek izsaukta un izskaitļota!
+ **Īssavienojums ar ||.** Ja kreisā puse ir `true`, visa izteiksme garantēti būs `true`. Labā puse atkal netiek izpildīta vispār.

> Koda aizsardzības zelta paņēmiens:
> Īssavienojumu izmanto borta programmatūrā, lai pasargātu sistēmu no avārijām. Piemēram, pārbaude `if (count != 0 && total / count > 10)` nekad neizraisīs dalīšanu ar nulli! Ja `count == 0`, pirmā daļa ir `false` un bīstamā dalīšana labajā pusē nemaz netiek aiztikta.

**Koda salīdzinājums:**
```cpp
if (count != 0 && total / count > 10) {
    // safe: if count is 0, division never executes!
}
```
[PAREIZI] Droša koda secība: pārbaude count != 0 kreisajā pusē novērš dalīšanu ar nulli labajā pusē

```cpp
if (total / count > 10 && count != 0) {
    // crash: divides by 0 before checking count!
}
```
[KĻŪDA / SLAZDS] Kritisks avārijas risks: dalīšana izpildās vispirms, un programma avarē pirms nulles pārbaudes


##### [Dziļāk] Kā procesors izpilda īssavienojumu mašīnkodā
Asemblera līmenī C++ loģiskās izteiksmes ar `&&` un `||` netiek rēķinātas ar aritmētiskām darbībām. Tā vietā kompilators ģenerē nosacījuma lēcienu instrukcijas (conditional jumps, piemēram, `je` — jump if equal vai `jne` — jump if not equal).

Izteiksmei `if (A && B)` procesors vispirms novērtē A. Ja A ir nulle (false), procesors uzreiz izpilda lēcienu pāri visam if blokam, pat neielādējot B datus no atmiņas reģistros.

Tas nozīmē, ka saliktos nosacījumos vieglākās un biežāk kļūdainās pārbaudes ir vērts likt pašā sākumā kreisajā pusē — tas ietaupa procesora taktis un paātrina reāllaika lidojuma cilpas darbību.


---

#### Step: predict-short-circuit [PREDICT]
**Paredziet īssavienojuma uzvedību**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `SAFE FALLBACK`
**Explanation:** Tā kā `sensors` ir 0, nosacījums `sensors != 0` ir aplams (false). Pateicoties īssavienojumam (short-circuit), C++ uzreiz pārtrauc `&&` pārbaudi un bīstamo dalīšanu `100 / sensors` nemaz nemēģina izpildīt! Programma droši pāriet uz `else` zaru un izvada `SAFE FALLBACK`.


---

#### Step: emergency-abort-system [EDITOR]
**Avārijas trauksmes dispečers**

**Task:**
Noprogrammējiet drona Sigmas trauksmes sistēmu ar operatoru `||`:
1. Nolasiet procesora temperatūru `core_temp` un korpusa integritāti `hull_integrity` no `cin`.
2. Ja temperatūra `core_temp > 80` VAI integritāte `hull_integrity < 50`, izvadiet avārijas pārtraukšanas signālu.
3. Pretējā gadījumā (`else`) izvadiet atļauju turpināt misiju, kā parādīts zemāk.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
MISSION: ABORT
```

**Etalona risinājums:**
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
*Padoms:* Uzrakstiet `if (core_temp > 80 || hull_integrity < 50) { ... } else { ... }`.
*Piezīme pie risinājuma:* Ja ievadīts 85 un 90, temperatūra 85 > 80 ir patiesa, tādēļ izpildās if zars ar signālu MISSION: ABORT.

---

#### Step: drone-flight-corridor [EDITOR] (Papilduzdevums)
**Papilduzdevums: Kanjona lidojuma navigators**

**Task:**
Izveidojiet kompleksu lidojuma lēmumu kontrolieri ar `||` un `&&`:
1. Nolasiet `battery`, `wind` un `has_fault` (0 vai 1) no `cin`.
2. Ja konstatēta kļūda `has_fault == 1` VAI baterija `battery < 20`, komandējiet avārijas nosēšanos.
3. Citādi, ja baterija `battery >= 50` UN vējš `wind <= 15`, atļaujiet maksimālo kreisēšanas ātrumu.
4. Visos citos gadījumos nosakiet piesardzīga lidojuma režīmu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
ACTION: CRUISE SPEED
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet kaskādi `if (has_fault == 1 || battery < 20) { ... } else if (battery >= 50 && wind <= 15) { ... } else { ... }`.
*Piezīme pie risinājuma:* Ievadot 65 12 0, kļūdas nav un baterija ir virs 20, bet otrajā pārbaudē 65 >= 50 un 12 <= 15 abi ir patiesi, tādēļ tiek izvadīts ACTION: CRUISE SPEED.

---

#### Step: recap [SUMMARY]
**10. misijas kopsavilkums: Loģiskā navigācija apgūta**

Bāze IRIS apstiprina: izlūkdrons Sigma ir veiksmīgi pārvarējis Mawrth Vallis kanjona bīstamo sektoru, reāllaikā apvienojot sensoru signālus ar loģiskajām operācijām.

| Operators | Nosaukums | Kad ir patiess (true) | Tipisks pielietojums borta datorā |
| :--- | :--- | :--- | :--- |
| `&&` | Loģiskais UN | Tikai tad, ja **abi** nosacījumi ir patiesi | Kompleksas drošības pārbaudes pirms manevra |
| `\|\|` | Loģiskais VAI | Ja **vismaz viens** nosacījums ir patiess | Avārijas trauksmes un kļūdu sensori |
| `!` | Loģiskais NE | Ja nosacījums ir **aplams** (apgriež vērtību) | Drošības karodziņu un gatavības pārbaude |

Nākamajā, 11. nodaļā «switch un ternārais operators» mēs apgūsim, kā aizstāt garus `if/else` kaskādes zarus ar kompaktu komandu dispečeru un saīsināt vienkāršas izvēles līdz vienai koda rindai.


---


# Lesson 11 · switch un ternārais operators
**Slug:** `switch-ternary` | **Module:** 2. bloks · Lēmumi

#### Step: command-dispatcher-prep [THEORY]
*Eyebrow:* Flotes papildinājums
**Iepazīstieties ar Kartogrāfu Delta**

Misija IRIS virs Mawrth Vallis plato sasniedz jaunu posmu. Viegajam izlūkam Sigma pievienojas otrais flotes aparāts — smagais izpētes drons KARTOGRĀFS «Delta».

Delta ir aprīkota ar masīviem divu rotoru dzinējiem, pastiprinātu bruņojumu un jaudīgiem zinātniskajiem instrumentiem: reljefa skenēšanas lidaru (LiDAR), multispektrālo kameru un iežu spektrometru. Lai kontrolētu tik daudzus neatkarīgus mezglus, no bāzes IRIS tiek sūtītas īsas viena simbola komandas (`'S'`, `'L'`, `'C'`, `'H'`).

Pārbaudīt šādas komandas ar garu `if / else if` kaskādi kļūst nepārskatāmi: mainīgais `cmd ==` ir jāatkārto katrā rindā. Valoda C++ piedāvā specializētu konstrukciju `switch` — ātru un elegantu komandu dispečeru, kas izvēlas vajadzīgo darbību pēc viena simbola vai vesela skaitļa.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On an elevated industrial survey launch pad overlooking the Martian plateau Mawrth Vallis at sunrise. In the foreground, the heavy surveyor drone KARTOGRĀFS 'Delta' with dark carbon-slate armor, twin heavy-lift rotor shrouds, and an amber illuminated LiDAR aperture sits calibrated next to agile Scout drone Sigma. In the background, geometric modular structures of Mars base IRIS against a warm desaturated grey Martian horizon. Standing at an auxiliary tactical dispatch terminal, inputting telemetry mode codes, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the LiDAR aperture glow and terminal screen.


##### [Arhīva ieraksts] Kāpēc switch kompilējas par lēcienu tabulām (Jump Tables)
Kaskādē `if / else if` procesoram ir secīgi jāizpilda katrs salīdzinājums viens pēc otra. Ja kaskādē ir 10 zari, pēdējā zara sasniegšanai nepieciešamas 10 atsevišķas pārbaudes — tas ir lineārs laiks O(N).

Turpretī operatoram `switch` C++ kompilators bieži ģenerē tā saukto lēcienu tabulu (Jump Table). Tā ir masīvam līdzīga adrešu tabula mašīnkodā: simbola vai skaitļa vērtība tieši nosaka nobīdi atmiņā, un procesors uzreiz veic vienu lēcienu uz vajadzīgo koda vietu.

Lēcienu tabulas nodrošina konstantu izpildes laiku O(1) neatkarīgi no zaru skaita. Reāllaika lidojuma sistēmās, kur vadības ciklam jāreaģē milisekundēs, `switch` nodrošina prognozējamu un ātru komandu izpildi.

Avots: Bjarne Stroustrup, 'The C++ Programming Language' (4th Edition, Addison-Wesley); Agner Fog, 'Optimizing subroutines in assembly language'.


---

#### Step: switch-syntax-and-case [THEORY]
*Eyebrow:* Diskrētā izvēle
**Operators switch un case iezīmes**

Operators `switch` novērtē vienu mainīgo un nekavējoties pāriet pie atbilstošās `case` iezīmes.

syntax: switch ({expr}) {
    case {val1}:
        {action1};
        break;
    default:
        {fallback};
        break;
}
- expr: vesels skaitlis vai rakstzīme (char), ko pārbauda
- case: atslēgvārds konkrētai vērtībai ar kolu beigās
- val1: nemainīga konstante (piem., 1 vai 'S')
- break: komanda, kas pārtrauc un iziet no switch bloka
- default: noklusējuma zars, ja neviena case vērtība nesakrita

> Datu tipu ierobežojuma likums:
> Operators `switch` darbojas TIKAI ar veseliem skaitļiem (`int`, `short`) un rakstzīmēm (`char`). Valodā C++ ir kategoriski aizliegts izmantot `switch` ar daļskaitļiem (`double`) vai teksta virknēm (`string`)!

Katram `case` zaram parasti pievieno komandu `break;`. Tā signalizē kompilatoram, ka dotā zara darbības ir pabeigtas un jāiziet ārā no `switch` figūriekavām.

**Koda salīdzinājums:**
```cpp
switch (cmd) {
    case 'S': cout << "SURVEY"; break;
    case 'L': cout << "LIDAR"; break;
    default: cout << "UNKNOWN";
}
```
[PAREIZI] Pārskatāms switch dispečers: mainīgais nosaukts vienreiz, vērtības sakārtotas stabiņā

```cpp
if (cmd == 'S') {
    cout << "SURVEY";
} else if (cmd == 'L') {
    cout << "LIDAR";
} else {
    cout << "UNKNOWN";
}
```
[KĻŪDA / SLAZDS] Pārslogots if/else kaskāds: lieka koda un mainīgā nosaukuma cmd dublēšana katrā solī


---

#### Step: fallthrough-and-break [EXPLAIN]
*Eyebrow:* Plūsmas vadība
**Komanda break un caurkritums (fall-through)**

Atšķirībā no daudzām citām programmēšanas valodām, C++ valodā `case` iezīme pati par sevi nepārtrauc koda izpildi.

Ja zara beigās netiek uzrakstīts `break;`, programma neapstājas, bet 'iekrīt' nākamajā `case` zarā un turpina izpildīt tā komandas! Šo fenomenu sauc par caurkritumu (fall-through).

!> **Aizmirstā break slazds.** Ja aizmirsīsiet `break;`, drons izpildīs gan prasīto komandu, gan visas nākamās komandas pēc kārtas, līdz sastaps `break;` vai bloka beigas. Kosmosa misijā tas var novest pie nejaušas avārijas sistēmu aktivizēšanas!

> *Image Alt:* Shēma attēlo switch izpildes plūsmu: tiešais lēciens uz sakritušo case, koda izpilde, izeja ar break un kļūmīgais caurkritums bez break.


---

#### Step: predict-switch-fallthrough [PREDICT]
**Paredziet caurkrituma sekas**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `23`
**Explanation:** Mainīgais `mode` ir `'B'`, tādēļ programma lec uz `case 'B':` un izvada `2`. Tā kā aiz šīs rindas nav `break;`, izpilde caurkrīt uz `case 'C':`, izvada `3`, un tikai tad sastop `break;`. Kopējais izvadītais teksts ir `23`.


---

#### Step: surveyor-command-dispatcher [EDITOR]
**Kartogrāfa Delta komandu mezgls**

**Task:**
Noprogrammējiet drona Delta rīku aktivizācijas dispečeru ar `switch (command)`:
1. Ja `command == 'S'`, izvadiet `SURVEY: ACTIVE` un pārtrauciet ar `break;`.
2. Ja `command == 'L'`, izvadiet `LIDAR: ACTIVE` un pārtrauciet ar `break;`.
3. Noklusējuma gadījumā (`default:`), izvadiet `COMMAND: UNKNOWN` un `break;`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SURVEY: ACTIVE
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `switch (command) { case 'S': cout << "SURVEY: ACTIVE" << endl; break; ... }`.
*Piezīme pie risinājuma:* Tā kā mainīgais command ir 'S', izpildās pirmais zars un tiek izvadīts SURVEY: ACTIVE.

---

#### Step: find-switch-bug [CLICKLINE]
**Atrodiet trūkstošā break kļūdu**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 8
**Explanation:** Rindā 8 aiz `cout << "MODE: NORMAL" << endl;` trūkst komandas `break;`. Šīs kļūdas dēļ programma pie koda 1 izpildītu normālo režīmu un uzreiz arī avārijas režīmu no case 2!


---

#### Step: grouping-switch-cases [THEORY]
*Eyebrow:* Apzināts caurkritums
**Vairāku case iezīmju apvienošana**

Caurkritums ne vienmēr ir kļūda. Dažreiz tas ir ļoti ērts paņēmiens, lai vairākām dažādām ievadēm piešķirtu vienu un to pašu darbību.

Tipisks piemērs kosmosa telemetrijā ir lielo un mazo burtu apstrāde. Ja operators terminālī ievada `'M'` vai `'m'`, abos gadījumos jāaktivizē kartēšana:

+ **Iezīmju grupēšana.** Novietojiet `case 'M':` un `case 'm':` vienu zem otras bez koda un bez `break`. Ja sakritīs pirmais, tas automātiski iekritīs otrajā un izpildīs kopīgo komandu.
+ **Koda tīrība.** Šāda pieeja novērš funkciju izsaukumu kopēšanu un saglabā programmu īsu un viegli lasāmu.

**Koda salīdzinājums:**
```cpp
switch (cmd) {
    case 'M':
    case 'm':
        cout << "MAPPING";
        break;
}
```
[PAREIZI] Eleganta grupēšana: abas iezīmes izmanto vienu koda bloku un vienu break

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
[KĻŪDA / SLAZDS] Lieka koda dublēšana: viena un tā pati darbība un break pārrakstīti divreiz


---

#### Step: dispatch-telemetry-mode [EDITOR]
**Interaktīvais misijas dispečers**

**Task:**
Noprogrammējiet drona režīmu selektoru no konsoles `cin`:
1. Nolasiet simbolu `cmd` no konsoles.
2. Ar `switch (cmd)` apstrādājiet režīmus:
   - `'R'`: izvadiet `MODE: RECON`
   - `'M'`: izvadiet `MODE: MAPPING`
   - `'H'`: izvadiet `MODE: RETURN HOME`
   - `default:`: izvadiet `MODE: INVALID`
3. Neaizmirstiet pievienot `break;` katram zaram.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
MODE: MAPPING
```

**Etalona risinājums:**
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
*Padoms:* Nolasiet ar `cin >> cmd;`, pēc tam uzrakstiet `switch (cmd) { case 'R': ... break; ... }`.
*Piezīme pie risinājuma:* Ievadot 'M', izpildās zars case 'M': un terminālī tiek izvadīts MODE: MAPPING.

---

#### Step: ternary-operator [THEORY]
*Eyebrow:* Kompakta izteiksme
**Ternārais operators (?:)**

Dažreiz mums nevajag veselu `if / else` bloku ar darbībām — mēs vienkārši vēlamies izvēlēties vienu no divām vērtībām atkarībā no nosacījuma.

syntax: {condition} ? {value_true} : {value_false}
- condition: loģiskais nosacījums, kas dod true vai false
- ?: jautājuma zīme atdala nosacījumu no patiesās vērtības
- value_true: rezultāts, ja nosacījums ir patiess
- :: kols atdala patieso vērtību no aplamās
- value_false: rezultāts, ja nosacījums ir aplams

> Galvenā atšķirība: teikums pret izteiksmi:
> `if / else` ir **teikums** (statement) — tas vada koda plūsmu, bet pats par sevi nav vērtība. Ternārais operators `?:` ir **izteiksme** (expression) — tas aprēķina un atgriež gatavu vērtību, ko var uzreiz saglabāt mainīgajā vai nodot tieši plūsmā `cout`!

**Koda salīdzinājums:**
```cpp
string mode = (battery >= 20) ? "CRUISE" : "ECO";
```
[PAREIZI] Kompakta viena rinda: ternārais operators uzreiz piešķir vērtību mainīgajam

```cpp
string mode;
if (battery >= 20) {
    mode = "CRUISE";
} else {
    mode = "ECO";
}
```
[KĻŪDA / SLAZDS] Smagnējas 5 rindas: parastais if/else prasa atsevišķu deklarāciju un koda zarošanos


##### [Dziļāk] Ternārais operators kā izteiksme C++ sintaksē
Tā kā ternārais operators atgriež vērtību, tas ļauj inicializēt nemainīgus konstantes mainīgos (`const`): `const int limit = is_eco ? 50 : 100;`. Ar parasto `if / else` tas nebūtu iespējams bez mainīgā deklarēšanas kā mainīga un vēlākas piešķiršanas.

Ternāro operatoru var ievietot tieši `cout` ķēdē: `cout << (battery >= 20 ? "OK" : "LOW");`. Šeit iekavas ap ternāro izteiksmi ir obligātas, jo plūsmas operatoram `<<` ir augstāka prioritāte nekā `?:`.

Inženieru stila likums: izmantojiet ternāro operatoru tikai vienkāršām divu vērtību izvēlēm. Nekad nelieciet ternāros operatorus vienu otrā (ligzdotos) — tas padara kodu grūti salasāmu un rada kļūdas.


---

#### Step: predict-ternary-output [PREDICT]
**Paredziet ternārā operatora izvadi**

**Kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int battery = 15;
    cout << (battery >= 20 ? "GREEN" : "RED") << endl;
    return 0;
}
```

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `RED`
**Explanation:** Tā kā `battery` ir 15, nosacījums `15 >= 20` ir aplams (false). Ternārais operators izvēlas vērtību aiz kola `:`, tādēļ programma izvada `RED`.


---

#### Step: delta-mission-controller [EDITOR] (Papilduzdevums)
**Papilduzdevums: Kartogrāfa instrumentu panelis**

**Task:**
Apvienojiet ternāro operatoru un `switch` drona Delta borta kontrolierī:
1. Nolasiet instrumenta kodu `char tool` un baterijas līmeni `int battery` no `cin`.
2. Ar ternāro operatoru nosakiet jaudas režīmu: ja `battery >= 40`, jauda ir `"FULL"`, citādi `"ECO"`.
3. Apstrādājiet `'L'`: izvadiet `TOOL: LIDAR | POWER: `, kam seko jaudas režīms un jauna rinda.
4. Apstrādājiet `'C'`: izvadiet `TOOL: CAMERA | POWER: `, kam seko jaudas režīms un jauna rinda.
5. Pārējos gadījumos (`default:`): izvadiet `TOOL: STANDBY` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
TOOL: LIDAR | POWER: FULL
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `string power = (battery >= 40) ? "FULL" : "ECO";`, kam seko `switch (tool)` ar atbilstošajām izvades rindām.
*Piezīme pie risinājuma:* Ievadot 'L' un 60, baterija 60 >= 40 iestata jaudu uz FULL, un case 'L': izvada TOOL: LIDAR | POWER: FULL.

---

#### Step: recap [SUMMARY]
**11. misijas kopsavilkums: Komandu dispečers gatavs**

Bāze IRIS ziņo par gatavību: KARTOGRĀFS «Delta» ir sekmīgi integrēts misijas vadības tīklā un spēj zibenīgi apstrādāt zinātnisko instrumentu komandas.

| Konstrukcija | Sintakse | Labākais pielietojums kosmosa misijā |
| :--- | :--- | :--- |
| `if / else if` | `if (x < 10) ...` | Diapazoni, peldošā punkta skaitļi, salikti loģiskie nosacījumi |
| `switch / case` | `switch (cmd) ...` | Fiksēti diskrēti kodi (char, int), komandu dispečeri |
| Ternārais `?:` | `cond ? a : b` | Ātra vienas vērtības izvēle piešķiršanā vai tiešā cout izvadē |

Nākamajā, 12. nodaļā mūs gaida 2. bloka lielais PRAKTIKUMS: «Drošības sistēma». Mēs apvienosim visus apgūtos nosacījumus (`if`, `else`, `&&`, `||`, `!`, `switch`) vienotā, integrētā abu dronu Sigma un Delta aizsardzības sistēmā.


---


# Lesson 12 · Praktikums: Drošības sistēma
**Slug:** `practicum-safety` | **Module:** 2. bloks · Lēmumi

#### Step: safety-architecture [THEORY]
*Eyebrow:* Praktikums: 2. bloka noslēgums
**Dziļā aizsardzība: Eskadras lidojumu drošības arhitektūra**

Mawrth Vallis kanjona virzienā strauji tuvojas spēcīga Marsa putekļu vētra. Vēja brāzmas kļūst neparedzamas, un atmosfēras putekļu blīvums pieaug līdz bīstamam līmenim.

Gaisā atrodas abi aktīvie IRIS eskadras droni: veiklais izlūks IZLŪKS «Sigma» un smagais kartogrāfs KARTOGRĀFS «Delta». Katram dronam ir savas kritiskās robežas:

- **Izlūks Sigma:** Ļoti jutīgs pret vēja brāzmām un strauju baterijas izlādi turbulencē, bet putekļi tā sensoriem nekaitē.

- **Kartogrāfs Delta:** Mehāniski pasargāts no vēja, taču ļoti neaizsargāts pret smalko elektrostatisko putekļu nosēšanos uz lidara optikas un kameras lēcām.

Šajā praktikumā mēs apvienosim visu 2. blokā apgūto — `if / else` kaskādes, loģiskos operatorus (`&&`, `||`, `!`), daudzzaru izvēli `switch` un kompakto ternāro operatoru (`?:`) — vienotā, daudzlīmeņu lidojumu drošības kontrolierī.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On an elevated reinforced telemetry pylon at Mars base IRIS overlooking the vast crimson-grey Mawrth Vallis basin at twilight. An ominous, dense atmospheric dust storm front rolls across the distant horizon under an amber-tinted Martian sky. On the landing pads below, Scout drone Sigma (agile, dark carbon-slate faceted armor, glowing amber thrusters) and Surveyor drone Delta (heavy-lift twin rotor shrouds, prominent LiDAR aperture) stand anchored. Standing inside the observation post at a tactical safety console displaying radar vector grids is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and single accents of aged brass #B99A61 on the telemetry screens and muted sage #7FB3A3 on radar vectors.


---

#### Step: predict-storm-hazard [PREDICT]
*Eyebrow:* Draudu prognozēšana
**Saliktu vētras nosacījumu izvērtēšana**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `HOLD POSITION`
**Explanation:** Pirmais nosacījums pārbauda `(22 > 20 || false) && 65 < 50`. Kreisā puse ir patiesa, bet labā puse (`65 < 50`) ir aplama, tādēļ viss `&&` nosacījums ir aplams. Izpilde pāriet pie `else if (wind > 20 && battery >= 50)`. Šeit abi nosacījumi `22 > 20` un `65 >= 50` ir patiesi, tādēļ tiek izvadīts `HOLD POSITION`.


---

#### Step: sigma-wind-guard [EDITOR]
**1. apakšsistēma: Izlūka Sigma vides uzraugs**

**Task:**
Ieprogrammējiet drona Sigma laikapstākļu drošības moduli ar `cin`, `if`, `else if` un `else`:
1. Nolasiet vēja ātrumu `int wind` un baterijas uzlādi `int battery` no `cin`.
2. Ja `wind > 18` VAI `battery < 20`, izvadiet `EMERGENCY LAND` un jaunu rindu.
3. Citādi, ja `battery >= 50` UN `wind <= 12`, izvadiet `FLIGHT NOMINAL` un jaunu rindu.
4. Visos pārējos gadījumos (`else`), izvadiet `CAUTION: REDUCE SPEED` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
EMERGENCY LAND
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `if (wind > 18 || battery < 20) { cout << "EMERGENCY LAND" << endl; } else if (battery >= 50 && wind <= 12) { cout << "FLIGHT NOMINAL" << endl; } else { cout << "CAUTION: REDUCE SPEED" << endl; }`.
*Piezīme pie risinājuma:* Pie ievades datiem 22 un 80 vēja ātrums 22 > 18 nekavējoties aktivizē ārkārtas nosēšanās komandu.

---

#### Step: delta-sensor-dispatcher [EDITOR]
**2. apakšsistēma: Kartogrāfa Delta instrumentu maršrutētājs**

**Task:**
Ieprogrammējiet drona Delta sensoru selektoru, izmantojot `switch (sensor)`:
1. Nolasiet sensora kodu `char sensor` no `cin`.
2. Ja `'L'`, izvadiet `SENSOR: LIDAR ONLINE` un izejiet ar `break;`.
3. Ja `'C'`, izvadiet `SENSOR: CAMERA ONLINE` un izejiet ar `break;`.
4. Ja `'R'`, izvadiet `SENSOR: RADAR ONLINE` un izejiet ar `break;`.
5. Pārējos gadījumos (`default:`), izvadiet `SENSOR: UNKNOWN` un izejiet ar `break;`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SENSOR: LIDAR ONLINE
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `switch (sensor) { case 'L': cout << "SENSOR: LIDAR ONLINE" << endl; break; ... default: ... }`.
*Piezīme pie risinājuma:* Ievadītais kods 'L' atbilst pirmajai iezīmei un izvada SENSOR: LIDAR ONLINE.

---

#### Step: find-safety-bug [CLICKLINE]
**Koda audits: Viltus trauksmes slazds**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** 7. rindā rakstīts `if (alert_code == 1 || 2)`. Tā kā skaitlis `2` ir patstāvīgs nenulles literālis, C++ to vienmēr novērtē kā `true`, neatkarīgi no `alert_code` vērtības! Tādēļ evakuācijas trauksme nostrādā pat pie koda 0. Pareizs pieraksts ir `if (alert_code == 1 || alert_code == 2)`.


---

#### Step: assemble-sensor-packet [PARSONS]
**3. apakšsistēma: Telemetrijas paketes priekšfiltrs**

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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

**Explanation:** Filtrs vispirms pārbauda `if (!ok)`, lai noraidītu bojātu telemetriju. Tikai pēc datu derīguma apstiprināšanas izpilde pāriet pie Sigma (`'S'`) un Delta atpazīšanas.


---

#### Step: power-allocator-ternary [EDITOR]
**4. apakšsistēma: Lidara putekļu aizsardzības kontrolieris**

**Task:**
Izmantojiet ternāro operatoru `?:`, lai noteiktu lidara attīrīšanas režīmu pēc putekļu sensora rādījuma:
1. Nolasiet putekļu koncentrāciju `int dust` no `cin`.
2. Ar ternāro operatoru izvēlieties jaudas režīmu: ja `dust > 60`, režīms ir `"PURGE"`, citādi `"ACTIVE"`.
3. Izvadiet `LIDAR MODE: `, kam seko režīma nosaukums un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
LIDAR MODE: PURGE
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `string mode = (dust > 60) ? "PURGE" : "ACTIVE";` un tad `cout << "LIDAR MODE: " << mode << endl;`.
*Piezīme pie risinājuma:* Pie ievades 75 putekļu līmenis 75 > 60 aktivizē augstspiediena attīrīšanas ciklu PURGE.

---

#### Step: squadron-safety-controller [EDITOR]
**Lielais projekts: Vienotais eskadras drošības kontrolieris**

**Task:**
Izveidojiet integrēto misijas drošības kontrolieri, apvienojot `switch`, `if` un `else`:
1. Nolasiet drona kodu `char drone` un mērījumu `int metric` no `cin`.
2. Maršrutējiet ar `switch (drone)`.
3. Zaram `'S'` (Sigma, kur rādījums ir vēja ātrums): ja `metric > 20`, izvadiet `SIGMA: GROUNDED`; citādi izvadiet `SIGMA: AIRBORNE`.
4. Zaram `'D'` (Delta, kur rādījums ir putekļu līmenis): ja `metric > 50`, izvadiet `DELTA: SHELTERED`; citādi izvadiet `DELTA: SCANNING`.
5. Zaram `default:`: izvadiet `DRONE: UNRECOGNIZED` un izejiet ar `break;`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SIGMA: GROUNDED
```

**Etalona risinājums:**
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
*Padoms:* Katra switch (drone) zara iekšienē ievietojiet if / else nosacījumu, pārbaudot metric pret konkrētā drona slieksni.
*Piezīme pie risinājuma:* Pie ievades 'S' 25 izpildās zars 'S', konstatē vēju 25 > 20 un atceļ izlūka Sigma lidojumu.

---

#### Step: predict-edge-cases [PREDICT]
*Eyebrow:* Noturība pret robežgadījumiem
**Nereģistrēta telemetrijas koda analīze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `DRONE: UNRECOGNIZED`
**Explanation:** Tā kā `'X'` nesakrīt nedz ar `'S'`, nedz ar `'D'`, izpilde izlaiž abus zarus un nonāk zarā `default:`, kas izvada `DRONE: UNRECOGNIZED`. Borta programmatūrā zars default ir obligāts, lai novērstu neprognozējamu uzvedību pie bojātiem signāliem.


---

#### Step: storm-evacuation-override [EDITOR] (Papilduzdevums)
**Papilduzdevums: Planētas vētras evakuācijas protokols**

**Task:**
Ieprogrammējiet visas bāzes ārkārtas evakuācijas prioritāro protokolu:
1. Nolasiet vētras intensitātes indeksu `int storm` un atļaujas karodziņu `char clearance` no `cin`.
2. Ja `storm >= 90` VAI `clearance == 'R'`, izvadiet `PROTOCOL: IMMEDIATE EVACUATION` un jaunu rindu.
3. Citādi, ja `storm >= 50` UN `clearance == 'Y'`, izvadiet `PROTOCOL: RETURN TO DOCK` un jaunu rindu.
4. Visos pārējos gadījumos (`else`), izvadiet `PROTOCOL: STANDBY FOR UPDATES` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
PROTOCOL: IMMEDIATE EVACUATION
```

**Etalona risinājums:**
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
*Padoms:* Izmantojiet if-else kaskādi ar || visaugstākās prioritātes trauksmei un && brīdinājuma režīmam.
*Piezīme pie risinājuma:* Pie vētras indeksa 95 un koda 'G' kritiskais vētras slieksnis 95 >= 90 nekavējoties aktivizē tūlītēju evakuāciju.

---

#### Step: recap [THEORY]
**2. bloka kopsavilkums: Autonomie lēmumi apgūti**

Apsveicam! Jūs esat pilnībā pabeiguši misijas kursa 2. bloku: «LĒMUMI». Izlūks Sigma un kartogrāfs Delta tagad ir aprīkoti ar uzticamiem, determinētiem autonomās vadības mehānismiem.

| Konstrukcija | Sintakse | Kad izvēlēties borta programmatūrā |
| :--- | :--- | :--- |
| `if / else if / else` | `if (val > 10) ...` | Skaitliski diapazoni, daļskaitļu salīdzināšana, salikti dinamiski nosacījumi |
| Loģiskie operatori | `&&`, `\|\|`, `!` | Vairāku sensoru apvienošana un drošības aizsardzība ar īssavienojumu |
| `switch / case` | `switch (code) ...` | Fiksēti veselu skaitļu vai simbolu kodi; lēcienu tabulas ar $O(1)$ ātrumu |
| Ternārais `?:` | `cond ? a : b` | Kompakta vienas vērtības izvēle piešķiršanā vai tiešā cout izvadē |

Ievērojiet būtisku ierobežojumu visās līdz šim rakstītajās programmās: katra programma izpildās vienu reizi no augšas uz leju un beidz darbu. Īstā kosmosa kuģī telemetriju ir nepieciešams nolasīt un pārbaudīt tūkstošiem reižu sekundē nepārtrauktā plūsmā.

13. nodaļā mēs atklāsim **3. bloku: DATI UN CIKLI**, sākot ar ciklu `while` — atslēdzot nepārtrauktu, iteratīvu borta skaitļošanu!


---


# Lesson 13 · Cikls while
**Slug:** `while` | **Module:** 2. bloks · Lēmumi

#### Step: why-while-loop [THEORY]
*Eyebrow:* Iteratīvā skaitļošana
**Gaidot gatavību: Nepieciešamība pēc atkārtošanas**

Putekļu vētra virs Mawrth Vallis ir norimusi, un rītausmā Marsa debesis atkal ir skaidras. Izlūks Sigma atrodas uz ārējās pacelšanās platformas un sāk dzinēju pirmslidojuma kalibrāciju.

Aviācijas un kosmosa inženierijā aparatūras diagnostika nekad nenotiek acumirklī. Hidrauliskajām degvielas līnijām ir jāsasniedz darba spiediens, dzinēju blokiem ir jāuzsilst, un sensoru pārbaudes ir jāveic atkārtoti, līdz visi statusa karodziņi rāda gatavību.

Līdz šim katra mūsu rakstītā C++ programma izpildījās stingri no augšas uz leju, veicot vienu izvēli ar `if / else` un beidzot darbu. Ja spiediena sensors rādīja zem nepieciešamā sliekšņa, programma vienkārši apstājās.

Lai borta programmatūra būtu patiesi autonoma, ir nepieciešams mehānisms, kas atkārto darbību, kamēr nav izpildīts konkrēts nosacījums. Valodā C++ šo pamatu veido cikls `while`.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Dawn after the Martian dust storm on the reinforced launch pad of Mars base IRIS. Scout drone Sigma with faceted dark carbon-slate hull and amber thruster ports sits in pre-flight diagnostics, with circular telemetry calibration rings projecting onto the tarmac. In the background, heavy surveyor drone Delta rests on an auxiliary maintenance platform beside base solar arrays under a crisp peach-amber Martian sunrise. Standing at a portable diagnostics terminal, observing a pulsing countdown loop bar, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the thrusters and diagnostic telemetry rings.


---

#### Step: while-syntax-and-rules [THEORY]
*Eyebrow:* Pirmsnosacījuma cikls
**Cikls while: Sintakse un darbības princips**

syntax: while ({condition}) { {body} }
- condition: loģiskā izteiksme, ko pārbauda PIRMS katras iterācijas
- body: komandu bloks, ko atkārtoti izpilda, kamēr nosacījums ir patiess

Cikls `while` katrā solī darbojas trīs secīgās fāzēs:

1. **Pārbauda nosacījumu:** Procesors aprēķina iekavās doto loģisko izteiksmi.

2. **Izpilda vai iziet:** Ja nosacījums ir patiess (`true`), izpildās figūriekavu `{ ... }` iekšienē esošais kods. Ja aplams (`false`), cikls nekavējoties beidzas un izpilde pārlec uz kodu aiz noslēdzošās figūriekavas.

3. **Atkārto:** Kad cikla ķermeņa pēdējā rinda ir pabeigta, izpilde atgriežas 1. solī, lai no jauna pārbaudītu nosacījumu.

!> **Bezgalīgā cikla slazds.** Koda blokam cikla iekšienē ir obligāti jāmaina vismaz viens no mainīgajiem, kas piedalās nosacījumā! Ja nosacījums paliek patiess mūžīgi, dators nonāk bezgalīgā ciklā, iesaldējot sistēmu, līdz aparatūras taimeris (watchdog) izraisa avārijas pārlādi.

**Koda salīdzinājums:**
```cpp
int pressure = 20;
while (pressure < 50) {
    pressure += 10; // condition will eventually turn false
}
```
[PAREIZI] Korekts cikls: mainīgais katrā solī palielinās, un nosacījums ar laiku kļūst aplams

```cpp
int pressure = 20;
while (pressure < 50) {
    cout << "WAIT"; // pressure never updates -> infinite loop!
}
```
[KĻŪDA / SLAZDS] Bezgalīga cikla kļūda: spiediens netiek mainīts, un nosacījums paliek patiess mūžīgi


---

#### Step: predict-while-count [PREDICT]
*Eyebrow:* Cikla gaitas izsekošana
**Spiediena uzkrāšanas prognoze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `100`
**Explanation:** Trešajā iterācijā `pressure` palielinās no 90 līdz 100. Atgriežoties pie pārbaudes, izteiksme `100 < 100` ir aplama (false). Cikls nekavējoties beidzas, un `cout` izvada pēdējo uzkrāto vērtību `100`.


---

#### Step: sensor-warmup-loop [EDITOR]
**Dzinēja priekšsildītāja cikls**

**Task:**
Ieprogrammējiet drona Sigma dzinēja sildītāju, izmantojot ciklu `while`:
1. Nolasiet sākuma temperatūru `int temp` no `cin`.
2. Kamēr `temp < 50`, pieskaitiet `10` pie `temp` un izvadiet `WARMING: `, kam seko `temp` un jauna rinda.
3. Pēc cikla beigām izvadiet `READY FOR FLIGHT` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
WARMING: 30
WARMING: 40
WARMING: 50
READY FOR FLIGHT
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `while (temp < 50) { temp += 10; cout << "WARMING: " << temp << endl; }`, kam seko gatavības paziņojums.
*Piezīme pie risinājuma:* Pie ievades 20 temperatūra kļūst 30, 40 un 50, izvadot trīs sildīšanas statusus un pēc tam READY FOR FLIGHT.

---

#### Step: predict-zero-iterations [PREDICT]
*Eyebrow:* Pirmsnosacījuma pārbaude
**Kad cikls while neizpildās ne reizi**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `BATTERY READY`
**Explanation:** Tā kā `charge` ir 95, sākotnējā pārbaude `95 < 80` ir aplama (false) jau pašā sākumā! Cikla iekšiene netiek izpildīta ne reizi, un programma uzreiz pāriet pie `BATTERY READY`. Cikls `while` var izpildīties 0 reizes, ja nosacījums jau sākumā ir aplams.


---

#### Step: do-while-syntax [THEORY]
*Eyebrow:* Pēcnosacījuma cikls
**Cikls do-while: Garantēta pirmā izpilde**

syntax: do { {body} } while ({condition});
- body: komandu bloks, ko garantēti izpilda VISMAZ VIENU REIZI
- condition: loģiskā pārbaude PĒC katras iterācijas; prasa semikolu beigās

Reizēm borta aparatūrā darbība ir **jāveic vismaz vienu reizi**, pirms mēs vispār varam pārbaudīt, vai to nepieciešams atkārtot. Piemēram, drona dators nevar zināt, vai sensora dati ir derīgi, neveicot vismaz vienu mērījumu.

Cikls `do-while` apgriež secību: tas vispirms izpilda koda ķermeni un tikai pēc tam pārbauda nosacījumu.

> **Sintakses likums:** Ievērojiet noslēdzošo semikolu `;` tūlīt aiz `while (condition);` konstrukcijā `do-while`. Atšķirībā no parastā `while`, šis semikols ir obligāts, un tā izlaišana izraisa kompilācijas kļūdu.

**Koda salīdzinājums:**
```cpp
int voltage = 10;
do {
    voltage += 25;
} while (voltage < 50);
```
[PAREIZI] Korekta do-while sintakse: ķermenis izpildās vispirms, aiz while nosacījuma ir obligāts semikols

```cpp
int voltage = 10;
do {
    voltage += 25;
} while (voltage < 50) // missing trailing semicolon!
```
[KĻŪDA / SLAZDS] Sintakses kļūda: semikola izlaišana aiz while (nosacījums) izraisa kompilācijas kļūdu


---

#### Step: predict-do-while [PREDICT]
*Eyebrow:* Pēcnosacījuma izvērtēšana
**Pēcnosacījuma cikla izpildes prognoze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `5`
**Explanation:** Ciklā `do-while` ķermenis vienmēr izpildās vismaz vienu reizi. Programma izvada `5`, palielina `attempt` uz 6 un tikai tad pārbauda `6 < 3`. Tā kā nosacījums ir aplams, cikls beidzas, atstājot izvadē skaitli `5`.


---

#### Step: capacitor-pulse-charge [EDITOR]
**Lidara kondensatora impulsa uzlāde**

**Task:**
Ieprogrammējiet drona Delta lidara kondensatora uzlādi ar ciklu `do-while`:
1. Nolasiet sākuma spriegumu `int voltage` un mērķa spriegumu `int target` no `cin`.
2. Ciklā `do-while`, kamēr `voltage < target`: pieskaitiet `25` pie `voltage` un izvadiet `PULSE: `, kam seko `voltage` un jauna rinda.
3. Pēc cikla beigām izvadiet `LIDAR CHARGED` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
PULSE: 35
PULSE: 60
LIDAR CHARGED
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `do { voltage += 25; cout << "PULSE: " << voltage << endl; } while (voltage < target);`, kam seko pabeigšanas paziņojums.
*Piezīme pie risinājuma:* Pie sākuma sprieguma 10 un mērķa 60 impulsi palielina spriegumu līdz 35 un 60, sasniedzot mērķi un izvadot LIDAR CHARGED.

---

#### Step: find-infinite-loop [CLICKLINE]
**Iesaldētā cikla kļūdas atrašana**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 11
**Explanation:** 11. rindā sākas `while (pressure < 50)`. Šī cikla iekšienē mainīgais `pressure` nekad netiek mainīts! Nosacījums `10 < 50` paliek patiess mūžīgi, iesaldējot borta datoru bezgalīgā ciklā.


---

#### Step: stream-input-accumulator [EDITOR] (Papilduzdevums)
**Papilduzdevums: Telemetrijas plūsmas akumulators**

**Task:**
Uzkrājiet ienākošās telemetrijas vērtības, līdz tiek saņemta beigu sargāta vērtība `-1`:
1. Nolasiet pirmo mērījumu `int val` no `cin`.
2. Definējiet akumulatoru `int sum = 0;`.
3. Ciklā `while`, kamēr `val != -1`: pieskaitiet `val` pie `sum` un nolasiet nākamo vērtību ar `cin >> val;`.
4. Pēc cikla beigām izvadiet `TOTAL TELEMETRY: `, kam seko `sum` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
TOTAL TELEMETRY: 50
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `while (val != -1) { sum += val; cin >> val; }`, lai apstrādātu plūsmas datus.
*Piezīme pie risinājuma:* Ievadot 10 25 15 -1, cikls saskaita 10 + 25 + 15 = 50 un apstājas pie signāla -1.

---

#### Step: recap [THEORY]
**13. misijas kopsavilkums: Cikli apgūti**

Apsveicam! Jūs esat apguvuši iteratīvos ciklus valodā C++. Droni Sigma un Delta tagad spēj autonomi aptaujāt sensorus, veikt atkārtotas aparatūras pārbaudes un gaidīt labvēlīgus lidojuma apstākļus.

| Cikla veids | Kad pārbauda nosacījumu | Minimālais iterāciju skaits | Labākais pielietojums kosmosā |
| :--- | :--- | :--- | :--- |
| `while (cond)` | Pirms cikla ķermeņa | 0 | Ārējo sensoru aptauja, drošas pārbaudes |
| `do { ... } while (cond);` | Pēc cikla ķermeņa | 1 | Sensora nolasīšana pirms vērtēšanas, atkārtoti pieprasījumi |

Nākamajā, 14. nodaļā mūs gaida strukturētais skaitītāja cikls: `for`. Kad drona uzdevums prasa veikt darbību precīzi zināmu reižu skaitu — piemēram, apsekot 10 maršruta koordinātu punktus pēc kārtas —, cikls `for` nodrošina tīru un kompaktu koda ietvaru.


---


# Lesson 14 · Cikls for
**Slug:** `for` | **Module:** 2. bloks · Lēmumi

#### Step: why-for-loop [THEORY]
*Eyebrow:* Noteikta navigācija
**Koordinātu apsekošana: Nepieciešamība pēc skaitītāja cikla**

Diagnostika ir pabeigta, un dzinēju sistēmas ziņo par normālu stāvokli. Izlūks Sigma paceļas Marsa debesīs virs Mawrth Vallis, lai veiktu automātisku aerofotografēšanas misiju.

Borta datorā ir ielādēts precīzs lidojuma plāns ar kontrolpunktu koordinātām. Uzdevums nav bezgalīga gaidīšana: Sigmai ir stingrā secībā jāapmeklē tieši 10 kontrolpunkti, pirms tā atgriežas bāzē.

Lai gan cikls `while` spēj darboties kā skaitītājs, tas prasa daudz lieku darbību: mainīgā izveidošanu pirms cikla, nosacījumu iekavās un obligātu atcerēšanos palielināt skaitītāju cikla ķermenī.

Ja aizmirstat skaitītāju palielināt, programma iesalst. Ja mainīgo izveidojat ārpusē, tas piesārņo atmiņu. Situācijām, kad atkārtojumu skaits ir zināms iepriekš, valodā C++ ir paredzēts skaitītāja cikls: `for`.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. High above the Martian canyon Mawrth Vallis in mid-morning sunlight. Scout drone Sigma glides forward through a succession of holographic glowing waypoint rings suspended in the thin air, tracing a geometric flight corridor toward distant plateaus. Far below on the canyon floor, heavy surveyor drone Delta scans geological strata. Inside the forward avionics observation dome at Mars base IRIS, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, observes a tactical flight corridor path screen. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the holographic waypoint navigation rings and thruster trails.


---

#### Step: for-syntax-and-parts [THEORY]
*Eyebrow:* Skaitītāja cikla anatomija
**Cikls for: Sintakse un darbības mehānisms**

syntax: for ({init}; {condition}; {update}) { {body} }
- init: izveido un inicializē skaitītāju; izpildās VIENU REIZI pirms cikla sākuma
- condition: pārbauda PIRMS katras iterācijas; ja aplams, cikls beidzas
- update: izmaina skaitītāju PĒC katras iterācijas
- body: komandu bloks, ko izpilda katrā solī

Cikla `for` galvene iekavās apvieno trīs vadības izteiksmes, ko atdala divi semikoli `;`:

1. **Inicializācija (`int i = 0`):** Izpildās precīzi vienu reizi, ieejot ciklā.

2. **Nosacījums (`i < 5`):** Pārbauda pirms katras iterācijas. Ja patiess, izpildās ķermenis; ja aplams, cikls noslēdzas.

3. **Solis (`i++`):** Automātiski izpildās tūlīt pēc cikla ķermeņa pabeigšanas, pirms nākamās nosacījuma pārbaudes.

> **Darbības apgabala likums:** Ja mainīgais ir deklarēts cikla galvenē (`int i = 0`), tas eksistē **tikai un vienīgi** šī cikla iekšienē! Tiklīdz cikls beidzas, mainīgais `i` tiek dzēsts no atmiņas un nevar nejauši sabojāt turpmāko programmas kodu.

**Koda salīdzinājums:**
```cpp
for (int i = 0; i < 5; i++) {
    cout << i << " ";
}
```
[PAREIZI] Kompakts for cikls: inicializācija, nosacījums un solis apvienoti vienā pārskatāmā galvenē

```cpp
int i = 0;
while (i < 5) {
    cout << i << " ";
    i++;
} // variable i leaks outside the loop!
```
[KĻŪDA / SLAZDS] Izkliedēts while cikls: skaitītājs noplūst ārējā atmiņā un tā maiņa ir atdalīta no pārbaudes


---

#### Step: predict-for-output [PREDICT]
*Eyebrow:* Cikla gaitas izsekošana
**Skaitītāja reizināšanas prognoze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `10 20 30 40 `
**Explanation:** Cikls izpildās 4 reizes: pie `i = 1` izvada `10 `, pie `i = 2` izvada `20 `, pie `i = 3` izvada `30 `, un pie `i = 4` izvada `40 `. Kad `i` kļūst 5, nosacījums `5 <= 4` kļūst aplams (false) un cikls beidzas.


---

#### Step: waypoint-surveyor [EDITOR]
**Kontrolpunktu maršruta reģistrators**

**Task:**
Ieprogrammējiet drona Sigma kontrolpunktu fiksatoru ar ciklu `for`:
1. Nolasiet kopējo kontrolpunktu skaitu `int n` no `cin`.
2. Ciklā `for` no `int i = 1` līdz un ieskaitot `n` (`i <= n`), ar soli `i++`: izvadiet `WAYPOINT #`, kam seko `i` un jauna rinda.
3. Pēc cikla beigām izvadiet `ROUTE COMPLETE` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
WAYPOINT #1
WAYPOINT #2
WAYPOINT #3
ROUTE COMPLETE
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `for (int i = 1; i <= n; i++) { cout << "WAYPOINT #" << i << endl; }`, kam seko noslēguma ziņojums.
*Piezīme pie risinājuma:* Pie ievades 3 cikls izpildās vērtībām i = 1, 2 un 3, izvadot trīs punktu paziņojumus un pēc tam ROUTE COMPLETE.

---

#### Step: counting-down-and-steps [THEORY]
*Eyebrow:* Pielāgoti soļi
**Atpakaļskaitīšana un pielāgots solis**

Cikla `for` soļa izteiksme neaprobežojas tikai ar `i++`. Jūs varat skaitīt atpakaļ vai lēkt ar jebkuru soli:

- **Skaitīšana atpakaļ:** `for (int i = 10; i > 0; i--)` samazina skaitītāju katrā solī, lieliski noderot starta laika atskaitei.

- **Pielāgots solis (piem., +20):** `for (int i = 0; i <= 100; i += 20)` palielina vērtību par 20 katrā solī, noderot pakāpeniskai telemetrijas kāpņu pārbaudei.

!> **Obligātā piešķiršana.** Soļa izteiksmei ir reāli jāmaina skaitītāja vērtība! Uzrakstot vienkārši `i + 2`, skaitlis tiek aprēķināts, bet netiek saglabāts, atstājot `i` nemainīgu un iesaldējot ciklu. Vienmēr lietojiet piešķiršanas operatorus, piemēram, `i += 2` vai `i -= 2`.

**Koda salīdzinājums:**
```cpp
for (int i = 10; i >= 0; i -= 2) {
    cout << i << " ";
}
```
[PAREIZI] Korekta vērtības samazināšana: saliktais piešķiršanas operators i -= 2 atjaunina skaitītāju

```cpp
for (int i = 10; i >= 0; i - 2) {
    cout << i << " "; // bug: i - 2 does not reassign to i!
}
```
[KĻŪDA / SLAZDS] Kļūda bez piešķiršanas: izteiksme i - 2 aprēķina vērtību, bet nesaglabā to atpakaļ mainīgajā i


---

#### Step: predict-countdown [PREDICT]
*Eyebrow:* Reversā iterācija
**Starta laika atskaites prognoze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `321GO`
**Explanation:** Skaitītājs izvada 3, 2 un 1. Kad `t` kļūst 0, nosacījums `0 > 0` ir aplams (false). Cikls beidzas, un programma tūlīt izvada `GO`, kopā veidojot tekstu `321GO`.


---

#### Step: altitude-stepper [EDITOR]
**Pakāpeniskās augstuma uzņemšanas kontrolieris**

**Task:**
Ieprogrammējiet drona Sigma pakāpenisko pacelšanos:
1. Nolasiet sākuma augstumu `int start` un maksimālo augstumu `int max_alt` no `cin`.
2. Ciklā `for`, sākot ar `int alt = start`, kamēr `alt <= max_alt`, ar soli `alt += 20`: izvadiet `ALTITUDE: `, kam seko `alt` un jauna rinda.
3. Pēc cikla beigām izvadiet `LEVEL FLIGHT ESTABLISHED` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
ALTITUDE: 20
ALTITUDE: 40
ALTITUDE: 60
LEVEL FLIGHT ESTABLISHED
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `for (int alt = start; alt <= max_alt; alt += 20) { cout << "ALTITUDE: " << alt << endl; }`.
*Piezīme pie risinājuma:* Pie ievades 20 un 60 augstums pakāpeniski pieaug caur 20, 40 un 60, pirms tiek izvadīts paziņojums par horizontālu lidojumu.

---

#### Step: find-fencepost-bug [CLICKLINE]
**Žoga staba kļūda: Robežas audits**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** 7. rindā rakstīts `for (int i = 1; i < waypoints; i++)`. Tā kā izmantots `<`, nevis `<=`, pie vērtības 5 cikls pārtrauc darbu, un 5. sektors netiek apsekots vispār! Šo klasisko kļūdu sauc par žoga staba kļūdu (Fencepost error jeb Off-by-one). Pareizs nosacījums ir `i <= waypoints`.


---

#### Step: predict-scope-leak [PREDICT]
*Eyebrow:* Darbības apgabals
**Akumulatora mainīgā redzamība**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `6`
**Explanation:** Cikls izpildās 3 reizes: `total` uzkrāj 0 + 1 + 2 + 3 = 6. Tā kā `total` tika deklarēts pirms cikla, tā vērtība saglabājas arī pēc cikla beigām un tiek izvadīta terminālī.


---

#### Step: solar-radiation-sum [EDITOR] (Papilduzdevums)
**Papilduzdevums: Saules radiācijas akumulators**

**Task:**
Uzkrājiet fiksētas telemetrijas mērījumu sērijas summu:
1. Nolasiet mērījumu skaitu `int count` no `cin`.
2. Definējiet akumulatoru `int sum = 0;`.
3. Ciklā `for` no `int i = 0` līdz `i < count`: nolasiet `int reading` ar `cin >> reading;` un pieskaitiet to pie `sum`.
4. Pēc cikla beigām izvadiet `TOTAL RADIATION: `, kam seko `sum` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
TOTAL RADIATION: 70
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `for (int i = 0; i < count; i++) { int reading; cin >> reading; sum += reading; }`.
*Piezīme pie risinājuma:* Pie skaita 4 un vērtībām 15 20 25 10 cikls saskaita 4 mērījumus, iegūst 70 un izvada TOTAL RADIATION: 70.

---

#### Step: recap [THEORY]
**14. misijas kopsavilkums: Skaitītāja cikls apgūts**

Apsveicam! Jūs esat apguvuši ciklu `for` valodā C++. Izlūks Sigma tagad spēj veikt precīzu daudzpunktu patruļu, pakāpeniski kāpināt lidojuma augstumu un apstrādāt fiksētas datu sērijas.

| Cikla veids | Labākais pielietojums kosmosā | Sintakses anatomija | Biežākā iesācēju kļūda |
| :--- | :--- | :--- | :--- |
| `for` | Zināms iterāciju skaits (kontrolpunkti, datu paketes) | `(init; cond; update)` | Robežas kļūda (`<` vietā `<=`) |
| `while` | Nezināms iterāciju skaits (gaidot sensora gatavību) | `(condition)` | Aizmirsts solis -> bezgalīgs cikls |
| `do-while` | Garantēta ≥ 1 izpilde (mērījums pirms pārbaudes) | `do { } while ();` | Aizmirsts noslēdzošais semikols `;` |

Kas notiek, ja 10 kontrolpunktu lidojuma vidū tuvuma sensors pēkšņi pamana stāvu klints sienu tieši priekšā? Mums ir nekavējoties jāpārtrauc maršruts, negaidot, kamēr skaitītājs sasniegs 10!

15. nodaļā mēs apgūsim cikla vadības komandas: `break` un `continue` — iegūstot pilnīgu reāllaika kontroli pār jebkuru lidojuma ciklu.


---


# Lesson 15 · break un continue
**Slug:** `break-continue` | **Module:** 2. bloks · Lēmumi

#### Step: obstacle-detection [THEORY]
*Eyebrow:* Dinamiskā lidojuma vadība
**Šķēršļu apiešana: Ciklu izpildes kontrole**

Izlūks Sigma veic zema augstuma izpētes lidojumu Mawrth Vallis kanjona aizā. Normālos apstākļos skaitītāja cikls `for` secīgi apseko sektorus no 1 līdz 10.

Tomēr reāls planētas reljefs ir neparedzams. Pēkšņs klinšu nogruvums var bloķēt lidojuma koridoru, putekļu virpulis var padarīt aklu optisko navigāciju, vai dzinēja pārkaršana var pieprasīt tūlītēju nosēšanos.

Ārkārtas situācijā drons nevar akli turpināt lidot uz 5., 6. un 7. sektoru, gaidot, kamēr cikla skaitītājs beigsies. Tam ir jāspēj pilnībā pārtraukt atlikušo cikla izpildi.

Un otrādi: ja viens konkrēts sektors atrodas dziļā klints ēnā, drons var izlaist tikai šī viena punkta skenēšanu un uzreiz pāriet pie nākamā. Valodā C++ šīs divas reāllaika iejaukšanās komandas nodrošina `break` un `continue`.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Inside a deep winding Martian canyon gorge at midday. Scout drone Sigma with dark carbon-slate faceted hull hovers in front of a massive geological rockfall obstruction across the flight corridor, its forward LiDAR scanner casting a glowing amber conical barrier grid against the rock wall. The drone's thrusters tilt into reverse braking vector. In the distance, surveyor drone Delta monitors aerial telemetry. Inside the mobile field control bunker, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, punches an illuminated emergency abort route override on the tactical console. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the scanner beam and emergency override button.


---

#### Step: break-in-loops [THEORY]
*Eyebrow:* Tūlītēja cikla pārtraukšana
**Komanda break ciklos**

Jūs jau iepazināt komandu `break` 11. nodaļā `switch` konstrukcijā, kur tā novērsa caurkritumu. Ievietota ciklā (`for`, `while` vai `do-while`), komanda `break` veic vēl nozīmīgāku darbību:

**Tā nekavējoties pilnībā pārtrauc visu ciklu!**

Izpilde tūlīt pārlec pāri cikla noslēdzošajai figūriekavai `}` uz pašu nākamo programmas komandu.

> **Iekšējā cikla likums:** Ja cikli ir ievietoti viens otrā (ligzdoti cikli), `break` pārtrauc tikai to **pašu iekšējāko** ciklu, kurā tas tieši atrodas. Ārējie cikli turpina savu darbu.

**Koda salīdzinājums:**
```cpp
for (int s = 1; s <= 10; s++) {
    if (s == 4) break;
    cout << s << " ";
}
```
[PAREIZI] Tīra agrīnā iziešana: break nekavējoties pārtrauc ciklu, tiklīdz izpildās bīstamības nosacījums

```cpp
bool stop = false;
for (int s = 1; s <= 10 && !stop; s++) {
    if (s == 4) stop = true;
    else cout << s << " ";
} // cumbersome flag logic
```
[KĻŪDA / SLAZDS] Smagnēja karodziņu loģika: papildu bool mainīgais sarežģī nosacījumu un prasa liekas pārbaudes


---

#### Step: predict-break-output [PREDICT]
*Eyebrow:* Cikla gaitas izsekošana
**Agrīnās iziešanas prognoze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `123!`
**Explanation:** Pie `i = 1`, `2` un `3` nosacījums `i == 4` ir aplams, tādēļ tiek izvadīts `123`. Kad `i` kļūst 4, `if` nosacījums ir patiess un izpilda `break;`. Cikls tūlīt beidzas bez skaitļa 4 izvadīšanas, un programma izvada izsaukuma zīmi `!`, kopā iegūstot `123!`.


---

#### Step: canyon-obstacle-abort [EDITOR]
**Kanjona šķēršļa avārijas pārtraukšana**

**Task:**
Ieprogrammējiet drona Sigma patruļas maršrutu ar avārijas pārtraukšanu pie šķēršļa:
1. Nolasiet bloķētā sektora numuru `int obstacle` no `cin`.
2. Ciklā `for` no `int sector = 1` līdz un ieskaitot `5` (`sector <= 5`):
3. Ja `sector == obstacle`, izvadiet `OBSTACLE AT SECTOR `, kam seko `sector`, jauna rinda, un tūlīt izejiet no cikla ar `break;`.
4. Citādi (`else`), izvadiet `SECTOR `, kam seko `sector`, ` CLEARED` un jauna rinda.
5. Pēc cikla beigām izvadiet `PATROL ENDED` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SECTOR 1 CLEARED
SECTOR 2 CLEARED
OBSTACLE AT SECTOR 3
PATROL ENDED
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `if (sector == obstacle) { cout << "OBSTACLE AT SECTOR " << sector << endl; break; } else { ... }`.
*Piezīme pie risinājuma:* Pie šķēršļa 3. sektorā sektori 1 un 2 tiek apsekoti veiksmīgi, 3. sektors izvada trauksmi, un break noslēdz ciklu.

---

#### Step: continue-skip-iteration [THEORY]
*Eyebrow:* Iterācijas izlaišana
**Komanda continue: Lēciens uz nākamo soli**

Kamēr `break` pilnībā pārtrauc visu ciklu, komanda `continue` darbojas daudz saudzīgāk:

**Tā izlaiž tikai PAŠREIZĒJĀS iterācijas atlikušo daļu!**

Sasniedzot `continue`, izpilde nekavējoties pārlec uz cikla ķermeņa pašām beigām šajā konkrētajā solī:

- Ciklā `for`: izpilde pārlec uzreiz pie **soļa izteiksmes** (`i++`), pārbauda nosacījumu un turpina ar nākamo soli.

- Ciklā `while`: izpilde pārlec uzreiz pie **nosacījuma pārbaudes**.

!> **Cikla while-continue slazds.** Ja ciklā `while` izsaucat `continue` PIRMS skaitītāja palielināšanas, skaitītājs nekad netiek atjaunināts, radot bezgalīgu ciklu! Vienmēr pārliecinieties, ka mainīgais tiek izmainīts pirms `continue` izsaukuma.

**Koda salīdzinājums:**
```cpp
for (int s = 1; s <= 5; s++) {
    if (s == 3) continue; // clean guard clause
    cout << s << " ";
}
```
[PAREIZI] Tīrs aizsardzības nosacījums: continue eleganti izlaiž atlikušo iterācijas daļu jau sākumā

```cpp
for (int s = 1; s <= 5; s++) {
    if (s != 3) {
        cout << s << " ";
    }
} // unnecessary indentation level
```
[KĻŪDA / SLAZDS] Apgriezta ligzdošana: visa cikla ķermeņa ievietošana if blokā rada lieku atkāpes līmeni


---

#### Step: predict-continue-output [PREDICT]
*Eyebrow:* Cikla gaitas izsekošana
**Filtrētas iterācijas prognoze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `135`
**Explanation:** Kad `i` ir 2 vai 4, nosacījums `i % 2 == 0` ir patiess, izpildot `continue;` un izlaižot `cout` komandu. Termināli sasniedz tikai nepāra skaitļi (1, 3, 5), veidojot izvadi `135`.


---

#### Step: shadow-sector-bypass [EDITOR]
**Ēnas sektora apiešanas filtrs**

**Task:**
Ieprogrammējiet drona Sigma lidara filtru ēnas sektoru izlaišanai ar `continue`:
1. Nolasiet ēnas sektora numuru `int shadow` no `cin`.
2. Ciklā `for` no `int sector = 1` līdz un ieskaitot `5` (`sector <= 5`):
3. Ja `sector == shadow`, izvadiet `SKIPPING SHADOW SECTOR `, kam seko `sector`, jauna rinda, un izlaidiet soli ar `continue;`.
4. Izvadiet `SCANNING SECTOR `, kam seko `sector` un jauna rinda.
5. Pēc cikla beigām izvadiet `SCAN COMPLETE` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SCANNING SECTOR 1
SKIPPING SHADOW SECTOR 2
SCANNING SECTOR 3
SCANNING SECTOR 4
SCANNING SECTOR 5
SCAN COMPLETE
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `if (sector == shadow) { cout << "SKIPPING SHADOW SECTOR " << sector << endl; continue; }`, kam seko parastā skenēšanas rinda.
*Piezīme pie risinājuma:* Pie ēnas sektora 2 tas tiek izlaists, bet sektori 1, 3, 4 un 5 tiek sekmīgi noskenēti.

---

#### Step: find-continue-while-trap [CLICKLINE]
**Cikla while-continue bezgalīgā slazda atrašana**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 8
**Explanation:** 8. rindā esošais `continue;` pārlec atpakaļ pie `while (sector <= 5)`. Tā kā 11. rindas komanda `sector++` tiek apieta, `sector` uz visiem laikiem paliek 3! Nosacījums `3 <= 5` ir patiess mūžīgi, iesaldējot programmu bezgalīgā ciklā.


---

#### Step: predict-break-vs-continue [PREDICT]
*Eyebrow:* Kombinēta plūsmas kontrole
**Kombinētu break un continue darbību prognoze**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `134`
**Explanation:** Pie `i = 1` izvada 1. Pie `i = 2` komanda `continue` izlaiž izvadi. Pie `i = 3` izvada 3. Pie `i = 4` izvada 4. Pie `i = 5` komanda `break` aptur ciklu, pirms tiek izvadīts 5 vai 6. Rezultāts ir `134`.


---

#### Step: search-target-beacon [EDITOR] (Papilduzdevums)
**Papilduzdevums: Avārijas bākas frekvenču meklētājs**

**Task:**
Meklējiet frekvenču kanālus, līdz tiek uztverts avārijas bākas signāls:
1. Nolasiet meklējamās bākas frekvenci `int target` no `cin`.
2. Ciklā `for` no `int freq = 100` līdz un ieskaitot `104` (`freq <= 104`):
3. Ja `freq == target`, izvadiet `BEACON FOUND AT `, kam seko `freq`, jauna rinda, un pārtrauciet meklēšanu ar `break;`.
4. Citādi (`else`), izvadiet `SEARCHING `, kam seko `freq` un jauna rinda.
5. Pēc cikla beigām izvadiet `SEARCH SEQUENCE FINISHED` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SEARCHING 100
SEARCHING 101
BEACON FOUND AT 102
SEARCH SEQUENCE FINISHED
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `if (freq == target) { cout << "BEACON FOUND AT " << freq << endl; break; } else { cout << "SEARCHING " << freq << endl; }`.
*Piezīme pie risinājuma:* Meklējot 102, frekvences 100 un 101 tiek pārmeklētas, 102 uztver signālu un break noslēdz meklēšanu.

---

#### Step: recap [THEORY]
**15. misijas kopsavilkums: Ciklu kontrole apgūta**

Apsveicam! Jūs esat apguvuši pilnu ciklu vadības arsenālu valodā C++. Izlūks Sigma un kartogrāfs Delta tagad spēj elastīgi reaģēt uz šķēršļiem ar `break` un apiet nederīgus datu sektorus ar `continue`.

| Komanda | Ietekme uz pašreizējo ciklu | Kas izpildās nākamais | Biežākā kļūda |
| :--- | :--- | :--- | :--- |
| `break;` | Nekavējoties pārtrauc visu ciklu | Pirmā komanda aiz cikla figūriekavas `}` | Sajaukšana ar break komandu switch blokā |
| `continue;` | Izlaiž tikai tekošās iterācijas atlikumu | Cikla solis (`for`) vai nosacījuma pārbaude (`while`) | Skaitītāja maiņas izlaišana ciklā while -> iesalšana |

Nākamajā, 16. nodaļā mūs gaida 2. bloka lielais fināls: **PRAKTIKUMS: skenēšanas cikls**! Mēs apvienosim visus apgūtos ciklus (`while`, `do-while`, `for`), nosacījumus un plūsmas kontroli pilnā autonomā sektora kartēšanas misijā.


---


# Lesson 16 · PRAKTIKUMS: skenēšanas cikls
**Slug:** `practicum-scan` | **Module:** 2. bloks · Lēmumi

#### Step: scan-architecture [THEORY]
*Eyebrow:* Praktikuma arhitektūra
**Autonoms sektora skenēšanas cikls**

Laipni lūgti **2. bloka noslēguma praktikumā**. Tā kā sakaru aizture ar Zemi ir no 3 līdz 22 minūtēm, izlūkam Sigma un kartogrāfam Delta sarežģītais Mawrth Vallis kanjona koridors ir jāapseko pilnīgi autonomi.

Autonoms skenēšanas cikls apvieno visas trīs 2. blokā apgūtās ciklu konstrukcijas un vadības operatorus drošā daudzfāzu stāvokļu mašīnā:

- **Pirmslidojuma kalibrācija (`while` / `do-while`):** Drons stabilizē inerciālos sensorus un sagaida telemetrijas gatavību pirms pacelšanās.

- **Režģa ešelonu apsekošana (`for`):** Borta dators secīgi iziet cauri iepriekš noteiktiem augstuma līmeņiem un kontrolpunktiem.

- **Plūsmas trokšņu noraidīšana (`continue`):** Nenolasāmi ēnainu sektoru dati vai vāji traucējumu signāli tiek izlaisti, neapturot kopējo skenēšanu.

- **Avārijas apstāšanās (`break`):** Sensoru atteice, bīstams klinšu nogruvums vai termiskais lēciens nekavējoties pārtrauc lidojumu un saglabā uzkrātos datus.

Soli pa solim apvienosim šos elementus, lai izveidotu pilnvērtīgu kanjona autonomās skenēšanas programmu.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. High above the rugged rust-crimson Mawrth Vallis canyon corridor at solar noon. In the sky, Scout drone Sigma (sleek carbon-slate faceted fuselage, glowing amber maneuvering thrusters) and Surveyor drone Delta (heavy-lift twin ducted fan shrouds, prominent LiDAR dome) fly in synchronized formation along a flight path. Below them, glowing aged-brass sensor grid scanlines project across the stepped canyon terraces and red-orange rock outcrops, mapping terrain sectors. In the mobile field control bunker in the foreground, the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, monitors telemetry grids across dual panoramic tactical screens. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and single accents of aged brass #B99A61 on sensor scanlines and muted sage #7FB3A3 on flight vector displays.


---

#### Step: predict-composite-scan [PREDICT]
*Eyebrow:* Cikla izpildes analīze
**Saliktā cikla rezultāta noteikšana**

Izsekojiet šī saliktā skenēšanas cikla izpildei, kurā apvienoti operatori `continue` un `break`.

Nosakiet programmas izdrukāto mainīgā `valid_points` gala vērtību.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `SECTORS SCANNED: 3`

---

#### Step: sensor-warmup-while [EDITOR]
**Inerciālā žiroskopa kalibrācijas cikls**

**Task:**
Ieprogrammējiet drona Sigma žiroskopa kalibrāciju ar ciklu `while`:
1. Nolasiet sākuma d線fu `int drift` un samazinājuma soli `int step` no `cin`.
2. Kamēr `drift > 5`: atņemiet `step` no `drift` ar `drift -= step` un izdrukājiet `CALIBRATING: `, kam seko `drift` un jauna rinda.
3. Pēc cikla beigām izdrukājiet `SENSOR STABILIZED` un jaunu rindu.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
CALIBRATING: 15
CALIBRATING: 10
CALIBRATING: 5
SENSOR STABILIZED
```

**Etalona risinājums:**
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
*Padoms:* Rakstiet `while (drift > 5) { drift -= step; cout << "CALIBRATING: " << drift << endl; }`, kam seko noslēguma ziņojums.
*Piezīme pie risinājuma:* Pie ievades 20 un 5 d線fs krītas no 20 uz 15, 10 un 5. Pie 5 nosacījums 5 > 5 kļūst aplams un cikls beidzas.

---

#### Step: elevation-sweep-for [EDITOR]
**Augstuma ešelonu pakāpeniskā skenēšana**

**Task:**
Ieprogrammējiet drona Delta augstuma pakāpienu apsekošanu ar ciklu `for`:
1. Nolasiet minimālo augstumu `int min_alt` un maksimālo augstumu `int max_alt` no `cin`.
2. Izveidojiet akumulatoru `int total_samples = 0`, inicializētu ar 0.
3. Ciklā `for` no `int alt = min_alt`, kamēr `alt <= max_alt`, ar soli `alt += 25`: pieskaitiet 10 pie `total_samples` ar `total_samples += 10` un izdrukājiet `TIER: `, kam seko `alt` un jauna rinda.
4. Pēc cikla beigām izdrukājiet `TOTAL SAMPLES: `, kam seko `total_samples` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
TIER: 50
TIER: 75
TIER: 100
TOTAL SAMPLES: 30
```

**Etalona risinājums:**
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
*Padoms:* Lietojiet `for (int alt = min_alt; alt <= max_alt; alt += 25) { total_samples += 10; cout << "TIER: " << alt << endl; }`.
*Piezīme pie risinājuma:* Pie robežām 50 un 100 cikls izpildās ešeloniem 50, 75 un 100, uzkrājot kopā 30 paraugus.

---

#### Step: find-scanner-bug [CLICKLINE]
*Eyebrow:* Atkļūdošana
**Atrodiet bezgalīgā cikla slazdu**

Šim ciklam while bija jāpārbauda paraugi no 1 līdz 5, izlaižot 3. paraugu.

Tomēr borta dators izpildes laikā bezgalīgi iesalst. Noklikšķiniet uz tās koda rindas, kuras dēļ cikls nekad nebeidzas.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 9

---

#### Step: telemetry-sample-dowhile [PARSONS]
*Eyebrow:* Pārsona uzdevums
**Salieciet telemetrijas nolasīšanas ciklu**

Kartogrāfam Delta ir jāveic vismaz viens telemetrijas mērījuma mēģinājums, pirms tiek pārbaudīts signāla uztveršanas slieksnis (>= 50).

Sakārtojiet koda blokus pareizā secībā, lai izveidotu korektu `do-while` nolasīšanas ciklu.

**Uzdevums:** Sakārtojiet rindas pareizā secībā.
**Rindas (pareizā secībā):**
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
**Saules bateriju plūsmas trokšņu filtrs**

**Task:**
Ieprogrammējiet Sigma saules paneļu mērījumu apstrādi ar ciklu `for` un `continue`:
1. Nolasiet sensoru šūnu skaitu `int count` no `cin`.
2. Izveidojiet akumulatoru `int active_power = 0`, inicializētu ar 0.
3. Ciklā `for` ar `i = 1` līdz `count` ieskaitot (`i <= count`): nolasiet skaitli `reading` no `cin`.
4. Ja `reading < 20`, izlaidiet atlikušo koda daļu ar komandu `continue`.
5. Pretējā gadījumā pieskaitiet `reading` pie `active_power` ar `active_power += reading` un izdrukājiet `CELL #`, kam seko `i` un `: VALID` jaunā rindā.
6. Pēc cikla beigām izdrukājiet `ACTIVE POWER: `, kam seko `active_power` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
CELL #2: VALID
CELL #4: VALID
ACTIVE POWER: 75
```

**Etalona risinājums:**
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
*Padoms:* Cikla iekšienē: `cin >> reading; if (reading < 20) { continue; } active_power += reading; cout << "CELL #" << i << ": VALID" << endl;`.
*Piezīme pie risinājuma:* Mērījumi 10 un 15 tiek izlaisti ar continue, bet 45 un 30 tiek pieskaitīti, dodot kopējo jaudu 75.

---

#### Step: thermal-spike-break [EDITOR]
**Termiskās pārslodzes avārijas pārtraukšana**

**Task:**
Ieprogrammējiet drošības pārbaudi ar ciklu `for` un komandu `break`:
1. Nolasiet maksimālo skenējamo sektoru skaitu `int max_sectors` no `cin`.
2. Izveidojiet skaitītāju `int completed = 0`, inicializētu ar 0.
3. Ciklā `for` sektoram `s = 1` līdz `max_sectors` ieskaitot (`s <= max_sectors`): nolasiet temperatūru `temp` no `cin`.
4. Ja `temp >= 100`: izdrukājiet `THERMAL SPIKE AT SECTOR `, kam seko `s` un jauna rinda, un nekavējoties pārtrauciet ciklu ar `break`.
5. Pretējā gadījumā palieliniet `completed++` un izdrukājiet `SECTOR `, kam seko `s` un `: NOMINAL` jaunā rindā.
6. Pēc cikla beigām izdrukājiet `COMPLETED SECTORS: `, kam seko `completed` un jauna rinda.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SECTOR 1: NOMINAL
SECTOR 2: NOMINAL
THERMAL SPIKE AT SECTOR 3
COMPLETED SECTORS: 2
```

**Etalona risinājums:**
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
*Padoms:* Pārbaudiet `if (temp >= 100) { cout << "THERMAL SPIKE AT SECTOR " << s << endl; break; }` pirms completed palielināšanas.
*Piezīme pie risinājuma:* Kad 3. sektorā temperatūra sasniedz 108 grādus, cikls fiksē pārslodzi un nekavējoties apstājas, uzrādot 2 pabeigtus sektorus.

---

#### Step: predict-sector-grid [PREDICT]
*Eyebrow:* Ligzdoto ciklu analīze
**Koordinātu režģa skenēšanas gaita**

Nosakiet divdimensiju kanjona režģa koordinātu izdrukas gaitu ligzdotajā ciklā.

Pievērsiet uzmanību tam, kuri koordinātu punkti tiek izlaisti ar iekšējā cikla komandu `continue`.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `Z1-P1 Z1-P3 Z2-P1 Z2-P3 DONE`

---

#### Step: capstone-sector-scanner [EDITOR]
**Autonoms kanjona sektora skeneris**

**Task:**
Ieprogrammējiet pilnu autonomā kanjona sektora skenera loģiku drōniem Sigma un Delta:
1. Nolasiet kontrolpunktu kopējo skaitu `int n` no `cin`.
2. Inicializējiet trīs uzskaites mainīgos: `int valid_points = 0`, `int total_telemetry = 0`, `int max_signal = 0`.
3. Ciklā `for` no `i = 1` līdz `n` ieskaitot (`i <= n`): nolasiet signāla vērtību `signal` no `cin`.
4. Ja `signal < 0`: izdrukājiet `CRITICAL FAILURE AT POINT `, kam seko `i` un jauna rinda, un tūlīt pārtrauciet ciklu ar `break`.
5. Ja `signal == 0`: izdrukājiet `POINT `, kam seko `i` un `: SHADOW SKIPPED` jaunā rindā, un pārejiet pie nākamā soļa ar `continue`.
6. Pretējā gadījumā (derīgs signāls): palieliniet `valid_points++`, pieskaitiet `signal` pie `total_telemetry`, ja `signal > max_signal`, atjauniniet `max_signal = signal`, un izdrukājiet `POINT `, kam seko `i` un `: SIGNAL ` ar `signal` jaunā rindā.
7. Pēc cikla beigām izdrukājiet trīs kopsavilkuma rindas: `VALID POINTS: `, kam seko `valid_points`, `TOTAL TELEMETRY: `, kam seko `total_telemetry`, un `PEAK SIGNAL: `, kam seko `max_signal` (katru savā rindā).

**Sākuma kods:**
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

**Gaidāmā izvade:**
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

**Etalona risinājums:**
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
*Padoms:* Vispirms apstrādājiet avāriju `signal < 0` ar break, tad ēnu `signal == 0` ar continue, un beigās uzkrājiet derīgos datus.
*Piezīme pie risinājuma:* Šī programma vienā autonomā lidojuma ciklā apvieno skaitīšanu, filtrēšanu, avārijas izeju, summēšanu un maksimuma meklēšanu.

---

#### Step: recap [THEORY]
*Eyebrow:* 2. bloka noslēgums
**2. bloka kopsavilkums: lēmumu arhitektūra pabeigta**

Apsveicam! Jūs esat pabeiguši **2. bloku: LĒMUMI (Decisions)**. Apgūstot zarošanos un ciklus, jūsu droni spēj izpildīt sarežģītus, autonomus misijas protokolus bez pastāvīgas operatora iejaukšanās.

Šeit ir pilna C++ vadības konstrukciju navigācijas matrica:

| Konstrukcija | Galvenā loma kosmosā | Galvene / Nosacījums | Vadības rīki ciklā |
| :--- | :--- | :--- | :--- |
| `if / else` | Diapazonu pārbaude, telemetrijas drošības vārti | `if (wind > 20)` | `&&`, `\|\|`, `!` |
| `switch / case` | Diskrētu komandu kodu sadale | `switch (command)` | `case 'L':`, `break;` |
| `while` | Nenoteikta gaidīšana (sensoru sildīšana, aptauja) | `while (drift > 5)` | Pārbaude pirms, uzmanīgi ar `continue` |
| `do-while` | Garantēta >= 1 izpilde (mērījuma nolasīšana) | `do { } while (retry)` | Pārbaude pēc, semikols `;` beigās |
| `for` | Deterministiskas robežas (kontrolpunkti, kāpnes) | `(init; cond; update)` | `break` pārtrauc, `continue` turpina |


> **Skatoties uz 3. bloku: DATI (Data).**

> Atsevišķu mērījumu apstrāde plūsmā darbojas lieliski, bet kas notiek, kad kartogrāfam Delta jāglabā 10 000 augstuma punktu, jāanalizē pagātnes reljefa profili vai jāsakārto sensoru dati? **17. nodaļā: Masīvi (Arrays)** mēs sākam glabāt datu kolekcijas operatīvajā atmiņā.


---
