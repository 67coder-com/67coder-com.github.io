# Course: C++ Programming — Mission IRIS (67coder)
## Block 1: 1. bloks · Pamodināšana (LV)

*This document contains complete, unabridged pedagogical content, code examples, tasks, expected outputs, solutions, and explanations for Lessons 1 to 8.*

---


# Lesson 1 · Iepazīšanās ar C++
**Slug:** `intro` | **Module:** 1. bloks · Pamodināšana

#### Step: why-cpp [THEORY]
*Eyebrow:* Misijas sākums
**Python uz Zemes, C++ gaisā**

Stacijas IRIS terminālis ir atrasts. Pirmais uzdevums ir nosūtīt signālu vieglajam izlūkam «Sigma». Radiosakaru aizkave starp Zemi un Marsu ir no 3 līdz 22 minūtēm katrā virzienā, tāpēc drons nevar gaidīt norādījumus no bāzes — tam jāreaģē pašam un nekavējoties.

Šāda aparatūras prasība nav izdomāta. Marsa helikopters Ingenuity nolasīja sensorus 500 reizes sekundē, lai noturētu lidaparātu retinātajā atmosfērā. Visa tā lidojuma borta vadības programmatūra tika rakstīta C++ valodā.

Python tajā pašā misijā strādāja uz Zemes — lidojumu simulācijai, analītikai un telemetrijas apstrādei. Borta datoros C++ izvēlas tur, kur izšķiroša ir determinēta reakcija un tieša atmiņas pārvaldība:

+ **Paredzams ātrums.** C++ kompilējas tiešā procesora mašīnkodā bez interpretera aiztures un bez negaidītām atmiņas savācēja (Garbage Collector) pauzēm.
+ **Tieša aparatūras kontrole.** Programmētājs pārvalda katru baitu atmiņā bez neredzamiem fona procesiem.
+ **Kosmiskās aviācijas standarts.** C++ vada reāllaika robotiku, augstas veiktspējas dzinējus un kosmiskos lidaparātus visā Saules sistēmā.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. A small, light scout drone hovers above the surface of Mars at dusk, next to a low research station with one lit terminal window. On the terminal screen is the course mascot: two square brackets [ ] facing each other with two round cream eyes between them, looking up at the drone. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the terminal glow. Render the Martian ground in desaturated warm greys, not red.


##### [Arhīva ieraksts] Kā radās C++: no Bell Labs līdz kosmosam
1979. gadā dāņu datorzinātnieks Bjorne Straustrups (Bjarne Stroustrup) Bell Labs laboratorijā sāka darbu pie valodas, kuru sākotnēji sauca par «C with Classes» («C ar klasēm»). Viņa mērķis bija apvienot valodas Simula ērto struktūru ar valodas C nepārspēto ātrumu un tiešo darbu ar aparatūru.

1983. gadā valodu pārdēvēja par C++. Nosaukumu ierosināja Riks Masiti (Rick Mascitti), izmantojot C valodas inkrementa operatoru `++`, kas nozīmē vērtības palielināšanu par vienu. Tas simbolizēja C nākamo evolūcijas soli.

Valodas pamatprincips paliek nemainīgs gadu desmitiem: «tu nemaksā par to, ko neizmanto». C++ nepieliek neredzamus skaitļošanas procesus aiz programmētāja muguras, tāpēc to izmanto reāllaika navigācijā un lidojumu datoros.

*Avoti:*
- [Bjarne Stroustrup — A History of C++: 1979—1991 (ACM HOPL-II)](https://www.stroustrup.com/hopl2.pdf)
- [NASA NTRS — FPP: A Modeling Language for F Prime](https://ntrs.nasa.gov/citations/20220012872)
- [GitHub ReadME Project — Open Source on Mars](https://github.com/readme/featured/nasa-ingenuity-helicopter)

##### [Dziļāk] Paredzamība pret negaidītām pauzēm
Kompilēta C++ programma pirms starta tiek pilnībā pārvērsta tiešā mašīnkodā. Datoram lidojuma laikā nav jāinterpretē teksts, tāpēc reakcijas laiks ir minimāls un stabils.

Valodās ar automātisko atmiņas tīrīšanu (piemēram, Python vai Java) izpilde var uz brīdi apstāties, kamēr sistēma atbrīvo atmiņu. Parastā lietotnē tā ir nepamanāma pauze. Taču dronam, kura rotori griežas ar 2700 apgriezieniem minūtē, neparedzēta pauze nozīmē avāriju.


---

#### Step: first-program [EXAMPLE]
**Pirmā programma rindu pa rindai**

Šī ir pilna, darboties spējīga C++ programma. Katra rinda tajā pilda vienu konkrētu lomu, lai izpildāmais fails spētu darboties.

syntax: cout << {teksts} << endl;
- cout: standarta teksta izvades plūsma terminālī
- <<: plūsmas ievietošanas operators (virza datus uz plūsmu)
- teksts: teksta virkne dubultpēdiņās ("...")
- endl: manipulators, kas pabeidz rindu un iztīra plūsmu
- ;: semikols — obligāts katras komandas noslēgums C++

Četri programmas pamatelementi:
+ **#include <iostream>.** Pievieno standarta ievades un izvades plūsmas rīkus. Bez šīs rindas kompilators nepazīst objektu `cout`.
+ **using namespace std;.** Norāda kompilatoram meklēt vārdus standarta bibliotēkas vārdtelpā bez atsevišķa priedēkļa `std::`.
+ **int main() { ... }.** Obligātais programmas ieejas punkts. Jebkuras C++ programmas izpilde sākas funkcijā `main()`, un visas komandas atrodas starp figūriekavām.
+ **return 0;.** Paziņo operētājsistēmai, ka programma darbu pabeigusi veiksmīgi bez kļūdām.

!> **Ieradums no Python.** Valodā Python kods izpildās no augšas uz leju vienkāršā skriptā bez ieejas funkcijas un bez semikoliem. Valodā C++ katrai komandai jāatrodas funkcijā (ieejas punktā `main()`), un katra komanda obligāti jānoslēdz ar semikolu `;`.

**Koda salīdzinājums:**
```cpp
cout << "IRIS: online" << endl;
```
[PAREIZI] semikols beigās → veiksmīgi kompilējas

```cpp
cout << "IRIS: online" << endl
```
[KĻŪDA / SLAZDS] trūkst semikola → kompilatora kļūda

**Kods:**
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
**Ko izvadīs terminālis?**

Aplūko trīs izvades komandas pēc kārtas. Mēģini uzminēt precīzu tekstu, kas parādīsies termināļa logā.

Šis ir minējums, nevis eksāmens: pareizā atbilde vēl nav jāzina. Novērtē, kā plūsma izvada datus, izsaki savu pieņēmumu un salīdzini ar rezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `SIGMA ONLINE
STATUS: READY`
**Explanation:** `cout` pats no sevis nepievieno atstarpes. Atstarpe parādās tikai tāpēc, ka tā tika ierakstīta pēdiņās pirms `" ONLINE"`. Jauna rinda sākas tikai pēc manipulatora `endl`.


---

#### Step: run-it [EDITOR]
**Ieraksti un nosūti pirmo signālu**

**Kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "IRIS: online" << endl;
    return 0;
}
```

**Task:**
Ieraksti programmu redaktorā ar roku, nevis iekopējot tekstu, lai nostiprinātu sintakses iemaņas:
1. Izveido programmas karkasu ar `#include <iostream>` un `using namespace std;`.
2. Funkcijā `main()` izvadi `"IRIS: online"` ar `cout` un `endl`.
3. Pabeidz ar `return 0;` un nospied «Palaist», lai pārbaudītu rezultātu terminālī.

**Gaidāmā izvade:**
```
IRIS: online
```

*Padoms:* Ievēro precizitāti: figūriekavas `{ }`, dubultpēdiņas ap tekstu un semikolu `;` rindas beigās.

---

#### Step: break-and-see [EDITOR]
**Salauz un izlasi kompilatora kļūdu**

**Task:**
Mērķtiecīgi salauz programmu, lai redzētu, kā kompilators ziņo par kļūdām:
1. Dzēs semikolu `;` 5. rindas beigās aiz `endl`.
2. Nospied «Palaist» un izlasi diagnostikas paziņojumu terminālī.
3. Ieliec semikolu `;` atpakaļ un nospied «Palaist», pārliecinoties par veiksmīgu izpildi.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA: signal received" << endl;
    return 0;
}
```

**Gaidāmā izvade:**
```
SIGMA: signal received
```

**Etalona risinājums:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA: signal received" << endl;
    return 0;
}
```

*Padoms:* Meklē paziņojumu «expected ';' after expression». Simbols `^` norāda precīzu vietu, kur kompilators pamanīja trūkstošo zīmi.
*Piezīme pie risinājuma:* Kad semikols ir atjaunots, kompilācija beidzas veiksmīgi un programma izpildās bez kļūdām.

---

#### Step: how-it-runs [EXPLAIN]
**Kas notiek aiz pogas «Palaist»**

C++ programma nevar tikt izpildīta uzreiz no pirmkoda teksta. Vispirms kompilators pārbauda koda gramatiku un pārtulko pirmkodu procesoram saprotamā mašīnkodā, izveidojot izpildāmo failu.

> Divi stingri kompilācijas pamatlikumi:
> 1. **Sintakses kļūda liedz startu.** Ja trūkst pat viena semikola vai figūriekavas, kompilators apstājas. Izpildāmais fails netiek izveidots, un programma vispār netiek palaista.
> 2. **Tiešs procesora ātrums.** Gatavs mašīnkods datorā izpildās uzreiz bez starpniekiem un bez interpretera bremzēšanas.

> *Image Alt:* Shēma: pirmkods nonāk kompilatorā, izveidojot izpildāmo failu, kas dod izvadi. Sintakses kļūda aptur kompilāciju pirms izpildes.


---

#### Step: drop-namespace [EDITOR]
**Programma bez vārdtelpas**

**Task:**
Šajā programmā ir izņemta rindiņa `using namespace std;`:
1. Nospied «Palaist» un ievēro, ka kompilators nepazīst `cout` un jautā: «did you mean 'std::cout'?».
2. Salabo kodu, pieliekot priedēkli `std::` pirms `cout` un `endl`.
3. Palaid programmu, neatgriežot direktīvu `using`.

**Sākuma kods:**
```cpp
#include <iostream>

int main() {
    cout << "IRIS: online" << endl;
    return 0;
}
```

**Gaidāmā izvade:**
```
IRIS: online
```

**Etalona risinājums:**
```cpp
#include <iostream>

int main() {
    std::cout << "IRIS: online" << std::endl;
    return 0;
}
```

*Requires tokens:* `std::cout`
*Padoms:* Ieraksti `std::cout` un `std::endl`. Divpunte `::` ir apgabala izšķiršanas operators, kas norāda elementa piederību vārdtelpai.
*Piezīme pie risinājuma:* Priedēkļi `std::cout` un `std::endl` nepārprotami norāda standartbibliotēkas piederību un novērš neskaidrības.

---

#### Step: why-namespace [THEORY]
*Eyebrow:* Arhitektūra
**Standarta vārdtelpa `std`**

syntax: {vardtelpa}::{nosaukums};
- vardtelpa: apgabala nosaukums — `std` standartbibliotēkai
- ::: apgabala izšķiršanas operators, kas sasaista vārdtelpu ar rīku
- nosaukums: bibliotēkas rīks — `cout`, `endl`

`cout` un `endl` nav C++ valodas atslēgvārdi kā `int` vai `return`. Tie ir standartbibliotēkas rīki, kas atrodas vārdtelpā `std`. To pilnais nosaukums ir `std::cout` — «`cout` iekš `std`».

Kāpēc inženierijā vajadzīgas vārdtelpas:
+ **Nosaukumu sadursmju novēršana.** Ja divas navigācijas bibliotēkas izveido funkciju `log()`, vārdtelpas novērš pārpratumus: `telemetry::log()` pret `sensor::log()`.
+ **Direktīva using kā saīsne.** Rindiņa `using namespace std;` atļauj kompilatoram meklēt vārdus `std` apgabalā bez atsevišķa priedēkļa.
+ **Kursa standarts.** Mācību koda skaidrībai ievada nodaļās mēs izmantojam `using namespace std;`, lai koda piemēri būtu īsi un nepārblīvēti.

!> **Vārdtelpu likums.** Reālos projektos nekad neliec `using namespace std;` galvenes failos (`.h` / `.hpp`). Tas ievieto tūkstošiem standartbibliotēkas vārdu visos failos, kas šo galveni iekļauj, un rada negaidītus vārdu konfliktus.

**Koda salīdzinājums:**
```cpp
std::cout << "SIGMA";
```
[PAREIZI] precīzs priedēklis → vienmēr strādā

```cpp
cout << "SIGMA"; // without using namespace std
```
[KĻŪDA / SLAZDS] bez priedēkļa un bez using → kompilatora kļūda


##### [Dziļāk] Kāpēc lielos projektos izvairās no `using namespace`
Vārdtelpas pasargā projektus no vārdu sadursmēm. Ja divas neatkarīgas bibliotēkas izveido funkciju `log()`, vārdtelpas ļauj skaidri norādīt vajadzīgo: `nav::log()` vai `telemetry::log()`.

Ievietojot `using namespace std;` galvenes failos, globālā vārdtelpa tiek piesārņota visos failos, kas šo galveni izmanto. Savukārt atsevišķos vienkāršos mācību failos `using namespace std;` ir drošs, skaidrs un ierasts standarts.


---

#### Step: find-bug-line [CLICKLINE]
**Kurā rindā ir sintakses kļūda?**

Drona Sigma diagnostikas programma nekompilējas. Atrodi un uzklikšķini uz rindas, kurā pieļauta sintakses kļūda.

**Kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA: DIAG" << endl
    cout << "ENGINE: OK" << endl;
    return 0;
}
```

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 5
**Explanation:** 5. rindā aiz `endl` trūkst semikola `;`. Ievēro, ka daži kompilatori kļūdu uzrāda 6. rindā, jo bez semikola kompilators mēģina lasīt nākamo komandu kā iepriekšējās turpinājumu.


---

#### Step: fill-gaps [BLANKS]
**Atjauno trūkstošos elementus**

No programmas karkasa ir izņemti trīs svarīgi elementi. Aizpildi tukšos laukus, lai programma būtu korekta.

**Kods:**
```cpp
#include <[[1]]>
using namespace [[2]];

int main() {
    [[3]] << "SIGMA REPORT" << endl;
    return 0;
}
```

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `iostream`
- [[2]]: `std`
- [[3]]: `cout`

**Explanation:** `iostream` nodrošina ievades un izvades rīkus, `std` ir standarta vārdtelpa, un `cout` ir teksta izvades plūsmas objekts.


---

#### Step: status-panel [EDITOR] (Papilduzdevums)
**Izveido drona Sigma statusa paneli**

**Task:**
Uzraksti pilnu C++ programmu, kas terminālī izvada drona Sigma trīs rindu telemetriju formātā zemāk:
1. Pievieno galveni `<iostream>` un atver vārdtelpu `std`.
2. Funkcijā `main()` izvadi virsrakstu `=== SIGMA ===`.
3. Otrajā rindā izvadi `FUEL: 87%` un trešajā rindā `STATUS: READY`.
4. Katru rindu noslēdz ar `endl` un katru komandu — ar semikolu `;`.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Gaidāmā izvade:**
```
=== SIGMA ===
FUEL: 87%
STATUS: READY
```

**Etalona risinājums:**
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

*Padoms:* Ieraksti trīs atsevišķas `cout << ... << endl;` komandas funkcijas `main()` iekšienē.

---

#### Step: recap [SUMMARY]
**1. misijas kopsavilkums**

**Kopsavilkums / Galvenie punkti:**
- C++ ir kompilējama valoda: pirmkods pirms izpildes tiek pārvērsts tiešā mašīnkodā. Sintakses kļūdas gadījumā izpildāmais fails netiek radīts un programma netiek palaista.
- Programmas izpilde vienmēr sākas ieejas punktā `int main()` un secīgi izpilda komandas starp figūriekavām `{ }`.
- `cout` ievieto tekstu standarta izvades plūsmā bez automātiskām atstarpēm; jauna rinda jāsāk ar manipulatoru `endl`.
- Katra pabeigta C++ komanda obligāti jānoslēdz ar semikolu `;`.
- `cout` un `endl` pieder vārdtelpai `std`; direktīva `using namespace std;` mācību kodā ļauj rakstīt īsāku un lasāmāku kodu.
- Misijas statuss: Izlūka drons Sigma ir atbildējis uz pirmo signālu. 2. nodaļā mēs mācīsimies izvadīt skaitļus no sensoriem un formatēt telemetrijas rādījumus.


---


# Lesson 2 · Izvade ar cout
**Slug:** `cout` | **Module:** 1. bloks · Pamodināšana

#### Step: telemetry-stream [THEORY]
*Eyebrow:* Telemetrijas plūsma
**Skaitļi un teksts vienā plūsmā**

Izlūka drons Sigma ir pamodies un sāk raidīt pirmos sensoru datus. Borta dators mēra akumulatora uzlādi, lidojuma augstumu un sistēmas kodola temperatūru. Taču neapstrādāti dati ekrānā saplūst vienā nepārtrauktā, grūti lasāmā rindā.

Lai izveidotu skaidru mērinstrumentu paneli, kodā jāapvieno divi elementi: paskaidrojošs teksts pēdiņās un fiziskie mērījumi kā skaitļi. C++ ļauj tos apvienot vienā komandā.

Trīs izvades pamatprincipi:
+ **Teksts pēdiņās.** Simbolu virknes (`"BATTERY: "`) tiek uztvertas kā nemainīgs teksts.
+ **Skaitļi bez pēdiņām.** Skaitļu literāļi (`98`, `-12`) tiek apstrādāti kā matemātiskas vērtības.
+ **Ķēde ar <<.** Operators `<<` ļauj savienot vairākus fragmentus vienā komandā virzienā no kreisās uz labo pusi.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. A sleek light scout drone hovers near a rocky Martian ridge at sunset. In the foreground, an illuminated outdoor rugged telemetry console displays streaming telemetry data. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — stands by the console, inspecting the readout. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the console display glow. Render the Martian ground in desaturated warm greys, not red.


##### [Arhīva ieraksts] Kāpēc `cout` sauc par `cout` un no kurienes radās plūsmas
Agrīnajā C valodā izvadi terminālī veica ar funkciju `printf`. Programmētājam bija manuāli jānorāda tipu kodi formāta virknē, piemēram, `%d` veseliem skaitļiem vai `%s` tekstam. Ja formāta kods nesakrita ar mainīgā patieso tipu, programma avarēja vai sabojāja atmiņu.

Veidojot C++, Bjorne Straustrups un Deivs Presoto Bell Labs laboratorijā ieviesa drošāku pieeju: tipdrošās I/O plūsmas. Plūsmas princips nozīmē, ka kompilators pats pārbauda padotā elementa tipu un izsauc atbilstošo pārveidošanas procedūru bez programmētāja kļūdām.

Nosaukums `cout` nozīmē «character output» (simbolu izvade) vai «console output». Priedēklis `c` iekļauj to standarta plūsmu saimē (līdzās `cin` ievadei un `cerr` kļūdām). Operators `<<` C valodā bija tikai bitu nobīde pa kreisi; C++ tas tika pārslogots, lai uzskatāmi apzīmētu datu plūsmas fizisko virzienu.

*Avoti:*
- [Bjarne Stroustrup — The Design and Evolution of C++ (Addison-Wesley)](https://www.stroustrup.com/dne.html)
- [Bjarne Stroustrup — A History of C++: 1979—1991 (ACM HOPL-II)](https://www.stroustrup.com/hopl2.pdf)

---

#### Step: numbers-and-chaining [EXAMPLE]
**Skaitļi un izvades ķēde**

syntax: cout << {nosaukums} << {skaitlis} << {vieniba} << endl;
- nosaukums: teksta apraksts dubultpēdiņās
- skaitlis: skaitļa literālis bez pēdiņām (98, 15, -12)
- vieniba: mērvienības teksts ("%", " M")
- endl: manipulators rindas noslēgšanai un bufera iztīrīšanai

Valodā C++ skaitļus raksta tieši, bez pēdiņām. Teksts pēdiņās kā `"98"` ir burtu virkne, savukārt `98` bez pēdiņām ir skaitliska vērtība, ar kuru procesors var veikt aprēķinus.

Plūsmas ievietošanas operatoru `<<` vienā komandā var izsaukt vairākas reizes pēc kārtas. Šo paņēmienu sauc par **ķēdi** (chaining). Dati plūst objektā `cout` secīgi no kreisās uz labo pusi, automātiski pārvēršot katru elementu simbolos ekrānam.

!> **Ieradums no Python.** Python funkcijā `print("BATTERY:", 98)` elementus atdala ar komatu un atstarpes starp tiem tiek ievietotas automātiski. C++ elementus savieno tikai ar operatoru `<<`, un `cout` nekad pats neievieto atstarpes starp savienotajām daļām, ja tās nav ierakstītas pēdiņās.

**Koda salīdzinājums:**
```cpp
cout << "ALT: " << 15 << " M" << endl;
```
[PAREIZI] plūsmas ķēde ar << → vienmērīga izvade

```cpp
cout << "ALT: ", 15, " M";
```
[KĻŪDA / SLAZDS] komats operatora << vietā → komata operatora kļūda

**Kods:**
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
**Uzmini telemetrijas rindu**

Aplūko divas koda rindas zemāk. Pievērs uzmanību atstarpēm pēdiņu iekšpusē un manipulatora `endl` atrašanās vietai.

Šis ir novērojuma uzdevums, nevis eksāmens: izseko, kā dati iekļūst `cout`, uzmini precīzu termināļa izvadi un salīdzini ar rezultātu.

**Kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SOL:" << 14 << " | " << "STATUS:" << 0 << endl;
    cout << "TEMP:" << -18 << "C";
    return 0;
}
```

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `SOL:14 | STATUS:0
TEMP:-18C`
**Explanation:** Pirmajā rindā starp `SOL:` un `14` nav atstarpes, jo pēdiņās tā nebija ierakstīta. Otrajā rindā burts `C` seko uzreiz aiz skaitļa `-18` bez atstarpes un bez jaunas rindas pārnesuma.


---

#### Step: first-chain [EDITOR]
**Apvieno atsevišķas izvades vienā ķēdē**

**Kods:**
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
Pārraksti trīs atsevišķās `cout` komandas vienā teikumā ar savienošanas operatoru `<<` formātā zemāk:
1. Sāc ar `cout << "SIGMA SPEED: "`.
2. Pievieno skaitli `12` bez pēdiņām.
3. Pievieno tekstu `" M/S"` un noslēdz ar `<< endl;`.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Gaidāmā izvade:**
```
SIGMA SPEED: 12 M/S
```

**Etalona risinājums:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA SPEED: " << 12 << " M/S" << endl;
    return 0;
}
```

*Requires tokens:* `<< 12 <<`
*Padoms:* Izveido vienu `cout` komandu: `cout << "SIGMA SPEED: " << 12 << " M/S" << endl;`.

---

#### Step: stream-flow [EXPLAIN]
**Kā dati nonāk ekrānā**

Operators `<<` darbojas kā konveijers. Katrs elements tiek uzlikts uz plūsmas un virzās uz galamērķi — termināļa ekrānu.

> Divi izvades plūsmas pamatlikumi:
> 1. **Secība no kreisās uz labo.** Dati nonāk `cout` tieši tādā secībā, kādā izvietoti operatori `<<`.
> 2. **Automātiska tipu pārveidošana.** Plūsma automātiski pārvērš skaitliskās vērtības teksta simbolos bez manuāliem formāta kodiem kā C valodā.

> *Image Alt:* Shēma: teksta literālis, skaitlis un manipulators caur operatoriem << secīgi nonāk objektā cout un parādās terminālī.


---

#### Step: newline-and-escape [THEORY]
*Eyebrow:* Rindu noformēšana
**Vadības virkne `\n` un manipulators `endl`**

syntax: cout << "{teksts1}\n{teksts2}\n";
- teksts1: pirmā teksta rinda
- \n: vadības simbols, kas pārceļ kursoru jaunā rindā
- teksts2: otrā teksta rinda

Līdz šim mēs izmantojām `endl`, lai pārnestu rindu. Rindas pārnesumu var izsaukt arī ar vadības rakstzīmju virkni `\n` (newline), kas ierakstīta tieši pēdiņu iekšpusē.

Biežāk lietotās vadības virknes C++ valodā:
+ **\n (jauna rinda).** Pārceļ kursoru uz nākamās rindas sākumu.
+ **\t (tabulācija).** Ievieto horizontālu atstarpi kolonnu līdzināšanai.
+ **\" (pēdiņa tekstā).** Izvada dubultpēdiņas simbolu teksta virknē, to nenoslēdzot.
+ **\\ (atpakaļvērstā slīpsvītra).** Izvada pašu slīpsvītras simbolu.


##### [Dziļāk] Buferēšana: kāpēc reāllaika sistēmās izvēlas `\n`
Manipulators `endl` veic divas atšķirīgas darbības: ievieto jaunas rindas simbolu un nekavējoties iztīra izvades buferi (`flush`).

Operētājsistēmas nesūta datus uz ekrānu vai disku pa vienam simbolam, jo aparatūras I/O operācijas ir lēnas. Dati uzkrājas iekšējā atmiņas buferī un tiek izvadīti lielākos blokos. Ja lidojuma ciklā tūkstošiem reižu izsauc `endl`, sistēma tiek spiesta nepārtraukti veikt sinhronus ierakstus, kas dramatiski samazina ātrumu.

Ātrdarbīgās borta sistēmās `\n` ir ikdienas standarts rindas pārnešanai. Savukārt manipulatoru `endl` izmanto tikai tad, kad izvadei noteikti jāparādās uzreiz pirms iespējamas avārijas.


---

#### Step: escape-practice [EDITOR]
**Divas rindas vienā komandā**

**Task:**
Uzraksti programmu, kas terminālī izvada divas telemetrijas rindas formātā zemāk, izmantojot TIKAI VIENU `cout` komandu un `\n` vadības simbolus:
1. Pirmajā rindā izvadi `SIGMA SENSORS: OK`.
2. Otrajā rindā izvadi `DRIFT: 0`.
3. Noslēdz komandu ar semikolu `;`.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Gaidāmā izvade:**
```
SIGMA SENSORS: OK
DRIFT: 0
```

**Etalona risinājums:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "SIGMA SENSORS: OK\nDRIFT: 0\n";
    return 0;
}
```

*Requires tokens:* `\n`
*Padoms:* Ieraksti `\n` starp statusa tekstu un `DRIFT`, kā arī pašās beigās: `cout << "SIGMA SENSORS: OK\nDRIFT: 0\n";`
*Piezīme pie risinājuma:* Viena `cout` komanda ar ievietotu `\n` izveido divas atsevišķas rindas terminālī bez `endl`.

---

#### Step: comments-guide [THEORY]
*Eyebrow:* Koda dokumentēšana
**Misijas piezīmes: komentāri**

syntax: // {piezime}
/* {bloks} */
- piezime: vienrindas komentārs, ko kompilators ignorē līdz rindas beigām
- bloks: vairākrindu komentārs neierobežotam rindu skaitam

Komentāri ir paskaidrojošas piezīmes programmētājam. Kompilators tos būvēšanas laikā pilnībā atmet — komentāri neaizņem atmiņu izpildāmajā failā un nekādi neietekmē darbības ātrumu.

Divi komentāru veidi C++ valodā:
+ **Vienrindas komentārs // .** Sākas ar divām slīpsvītrām. Viss, kas seko tajā pašā rindā, tiek ignorēts.
+ **Vairākrindu komentārs /* ... */ .** Sākas ar `/*` un beidzas ar `*/`. Viss teksts starp šīm zīmēm tiek ignorēts neatkarīgi no rindu skaita.

!> **Komentāru lamatas.** Vairākrindu komentārus `/* ... */` nedrīkst ievietot citu citā. Pats pirmais satiktais `*/` nekavējoties noslēdz komentāru, un atlikušais teksts izsauc kompilācijas kļūdas.

**Koda salīdzinājums:**
```cpp
// RAM test
cout << "RAM: OK";
```
[PAREIZI] vienrindas komentārs // → drošs un skaidrs kods

```cpp
/* RAM test
cout << "RAM: OK";
```
[KĻŪDA / SLAZDS] neaizvērts /* → neaizvērta komentāra kompilatora kļūda


---

#### Step: find-comment-bug [CLICKLINE]
**Atrodi bojāto komentāru**

Sintakses kļūda drona Sigma telemetrijas kodā neļauj programmai kompilēties. Atrodi un uzklikšķini uz rindas ar kļūdu.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** 7. rindā tiek atvērts vairākrindu komentārs `/*`, kuram nav aizverošās daļas `*/`. Rezultātā kompilators absorbēja `return` komandu un ziņo «unterminated /* comment».


---

#### Step: fill-telemetry [BLANKS]
**Atjauno spiediena telemetriju**

No telemetrijas izvades rindas pazuduši trīs savienojuma elementi. Aizpildi trūkstošos laukus, lai programma pareizi izvadītu atmosfēras spiedienu.

**Kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout [[1]] "PRESSURE: " << 610 [[2]] " PA" << [[3]];
    return 0;
}
```

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `<<`
- [[2]]: `<<`
- [[3]]: `endl` OR `'\n'`

**Explanation:** Operatori `<<` savieno tekstu un skaitļus, bet `endl` vai `'\n'` noslēdz rindu.


---

#### Step: telemetry-dashboard [EDITOR] (Papilduzdevums)
**Izveido drona Sigma telemetrijas paneli**

**Task:**
Uzraksti pilnu programmu, kas terminālī izvada 5 rindu telemetrijas paneli formātā zemāk:
1. Izvadi skaitliskās vērtības bez pēdiņām, izmantojot `<<` ķēdes.
2. Izvadi virsrakstu, `ALTITUDE: 24 M`, `BATTERY: 91%`, `CORE TEMP: -12 C` un `STATUS: OPERATIONAL`.
3. Iekļauj kodā vismaz divus vienrindas komentārus `//`, kas paskaidro koda darbību.
4. Noslēdz katru rindu ar `endl` vai `\n` un katru komandu — ar semikolu `;`.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Gaidāmā izvade:**
```
--- TELEMETRY: SIGMA ---
ALTITUDE: 24 M
BATTERY: 91%
CORE TEMP: -12 C
STATUS: OPERATIONAL
```

**Etalona risinājums:**
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

*Padoms:* Izmanto atsevišķu `cout` katrai rindai, piemēram: `cout << "BATTERY: " << 91 << "%" << endl;`.

---

#### Step: recap [SUMMARY]
**2. misijas kopsavilkums**

**Kopsavilkums / Galvenie punkti:**
- Skaitļus valodā C++ raksta bez pēdiņām — kompilators tos atpazīst kā skaitliskas vērtības un automātiski pārveido izvadei ekrānā.
- Operators `<<` savieno tekstu, skaitļus un formāta rīkus vienotā plūsmā virzienā no kreisās uz labo pusi.
- Vadības simbols `\n` pārnes rindu teksta iekšienē, neveicot piespiedu bufera iztīrīšanu atšķirībā no `endl`.
- Komentāri (`//` un `/* ... */`) dokumentē programmas loģiku un kompilācijas laikā tiek pilnībā izdzēsti, nepatērējot atmiņu.
- Pašlaik visas mērinstrumentu vērtības ir fiksētas nemainīgas konstantes. Lai datus saglabātu un atjauninātu lidojuma laikā, 3. nodaļā mēs apgūsim mainīgos un datu tipus.


---


# Lesson 3 · Datu tipi: lielā bilde
**Slug:** `data-types` | **Module:** 1. bloks · Pamodināšana

#### Step: why-types [THEORY]
*Eyebrow:* Borta atmiņa
**Kāpēc mainīgajiem vajadzīgs tips**

Iepriekšējā nodaļā visi skaitļi drona Sigma telemetrijā bija stingri ierakstīti pirmkodā. Taču reālā lidojumā telemetrijas rādījumi mainās katru sekundi — programmai vajadzīgi mainīgie, lai datus saglabātu un atjauninātu operatīvajā atmiņā.

Šī nodaļa sniedz vispārīgu ieskatu datu tipos; katru konkrētu tipu saimi padziļināti apgūsim nākamajās nodaļās.

Python valodā viens un tas pats mainīgais vispirms var glabāt veselu skaitli (15), bet pēc rindas — tekstu ("OK") (dinamiskā tipizēšana), kas prasa papildu atmiņas patēriņu un neparedzamas pārbaudes lidojuma laikā. Izlūkam Sigma borta datorā ir tikai ~1 MB atmiņas (kursa mācību ierobežojums), tāpēc C++ izmanto statisko tipizēšanu: katram mainīgajam tips jānorāda iepriekš, lai kompilators rezervētu precīzus baitus un novērstu kļūdas pirms starta.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside a dimly lit Mars research base, a small light scout drone hovers beside a vertical diagnostic console displaying segmented memory blocks of different sizes. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — inspects the illuminated memory segments. Outside a narrow viewport, the Martian ground stretches out. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the memory segments glow. Render the Martian ground in desaturated warm greys, not red.


---

#### Step: declare-variables [THEORY]
**Mainīgā deklarēšana**

syntax: {tips} {nosaukums} = {vērtība};
- tips: kādi dati — `int`, `double`
- nosaukums: kā vēlāk atsaucies uz mainīgo
- vērtība: sākuma vērtība — 14, 91.5
- ;: pabeidz teikumu — obligāts

Mainīgā deklarēšana rezervē nosauktu vietu atmiņā. Tipu norāda vienreiz pie izveides (`int sol = 14;`). Kad vērtību vēlāk atjaunina (`sol = 15;`), raksta tikai mainīgā nosaukumu — tipu atkārtot nedrīkst.

Četri pamattipi īsumā:
+ **int veseliem skaitļiem.** Glabā veselus skaitļus (1, 14, -40) bez daļveida daļas.
+ **double daļskaitļiem.** Glabā skaitļus ar komatu (2.5, 91.5), kurus kodā raksta ar punktu.
+ **char vienai rakstzīmei.** Glabā vienu simbolu ('A'), ko vienmēr raksta vienpēdiņās.
+ **bool loģikai.** Glabā patiesuma vērtības (true, false), kuras cout izvada kā 1 vai 0.

!> **Ieradums no Python.** Python valodā mainīgos veido bez tipa norādīšanas. C++ valodā vārda `int` atkārtota pierakstīšana mēģina izveidot otru mainīgo ar tādu pašu vārdu, un kompilators tūlīt aptur darbu.

**Koda salīdzinājums:**
```cpp
int sol = 14;
sol = 15;
```
[PAREIZI] tips vienreiz → strādā

```cpp
int sol = 14;
int sol = 15;
```
[KĻŪDA / SLAZDS] tips divreiz → kompilācijas kļūda


---

#### Step: predict-sizeof [PREDICT]
**Cik baitus aizņem katrs tips?**

C++ valodā ir iebūvēts operators `sizeof(...)`, kas atgriež tipa vai mainīgā aizņemto baitu skaitu konkrētajā platformā.

Mēģini uzminēt precīzu tekstu, ko šī programma izvadīs terminālī. Šis ir pirmais minējums, nevis pārbaudes darbs: ievadi savu prognozi un salīdzini to ar faktisko rezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `char: 1
int: 4
double: 8
long: 4`
**Explanation:** Mūsu 32 bitu pārlūka platformā `char` aizņem 1 baitu, `int` — 4 baitus, `double` — 8 baitus, bet `long` — 4 baitus. Uz 64 bitu Linux un macOS `sizeof(long)` ir 8, turpretī uz 64 bitu Windows — arī 4.


---

#### Step: memory-map [EXPLAIN]
*Eyebrow:* Atmiņas karte
**Lielā bilde un tipu noteikumi**

Atmiņā mainīgais ir nosaukta vieta ar fiksētu izmēru. Veseliem skaitļiem (kā 0, 15, -300) C++ piedāvā skaitļu saimi (`short`, `int`, `long`, `long long`), kur ikdienas izvēle ir `int`. Daļskaitļiem (kā 3.73, -12.5) ir `float` un `double`, kur noklusējums ir `double`.

Operatoram `sizeof` var padot gan tipa nosaukumu (`sizeof(int)`), gan konkrēta mainīgā vārdu (`sizeof(sol)`).

> Divi stingri statiskās tipizēšanas likumi:
> 1. **Nekādu nesaderīgu vērtību.** Mainīgajam nedrīkst piešķirt nesaderīga tipa vērtību — piemēram, saglabāt tekstu ("FAST") iekš `int`.
> 2. **Nekādu dubultu deklarāciju.** Vienu un to pašu mainīgā vārdu tajā pašā apgabalā nedrīkst ar tipu deklarēt divreiz.

Ievēro `sizeof(long)` atšķirību starp sistēmām: uz 64 bitu Linux un macOS tas ir 8 baiti, uz 64 bitu Windows — 4 baiti, un mūsu 32 bitu platformā — arī 4 baiti. Kāpēc tā notiek, lasi arhīva ierakstā zemāk.

> *Image Alt:* Shēma: char aizņem 1 baitu, bool aizņem 1 baitu, int aizņem 4 baitus, bet double aizņem 8 baitus 32 bitu platformā.


##### [Arhīva ieraksts] Kāpēc datu tipu izmēri ir atkarīgi no platformas
Kad 20. gadsimta 70. gados radās C valoda (C++ priekštece), datori bija ļoti dažādi — no 16 bitu minidatoriem PDP-11 līdz lielajiem skaitļošanas centriem. Lai programma strādātu ātri uz jebkuras aparatūras, standarts nepiesēja tipus vienam fiksētam baitu skaitam.

Tā vietā C un C++ standarts nosaka minimālo garantiju un secību: `1 == sizeof(char) <= sizeof(short) <= sizeof(int) <= sizeof(long) <= sizeof(long long)`. Katrs ražotājs izvēlas «datu modeli», kas vislabāk atbilst konkrētajam procesoram un operētājsistēmai.

Kad pasaule pārgāja uz 64 bitu procesoriem, operētājsistēmas izvēlējās dažādus ceļus. Linux un macOS izmanto modeli LP64, kur `long` pieauga līdz 8 baitiem. Microsoft Windows izvēlējās modeli LLP64 un atstāja `long` 4 baitu izmērā, lai saglabātu saderību ar vecākām 32 bitu programmām. Savukārt mūsu pārlūka kompilators darbojas 32 bitu WebAssembly vidē (ILP32), kur `long` arī ir 4 baiti.

*Avoti:*
- [cppreference — Fundamental types (Data models)](https://en.cppreference.com/w/cpp/language/types)
- [cppreference — sizeof operator](https://en.cppreference.com/w/cpp/language/sizeof)

##### [Dziļāk] Kas ir 1 baits un cik ietilpst 1 MB?
Viens baits sastāv no 8 bitiem — astoņām šūnām, kur katra glabā 0 vai 1. Tas dod 2⁸ = 256 dažādas kombinācijas vienā baitā.

Izlūka Sigma borta atmiņa mūsu kursā ir 1 MB jeb 1 048 576 baiti. Ja programma glabā vienu `int` (4 baiti), tas gandrīz neko nemaksā. Taču miljons `int` mērījumu aizņemtu jau 4 MB — četras reizes vairāk nekā visa Sigma operatīvā atmiņa.


---

#### Step: first-variables [EDITOR]
**Pirmie mainīgie telemetrijā**

**Task:**
Programmā jau ir izveidoti mainīgie `altitude` (`int`) un `temp` (`double`). Veic divus soļus:
1. Nomaini `altitude` vērtību uz 24, nerakstot `int` otrreiz.
2. Izvadi abus lielumus formātā, kā parādīts zemāk.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    int altitude = 15;
    double temp = -12.5;
    
    return 0;
}
```

**Gaidāmā izvade:**
```
ALTITUDE: 24 M
TEMP: -12.5 C
```

**Etalona risinājums:**
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
*Padoms:* Uzraksti `altitude = 24;` un izmanto divas `cout` komandas ar mainīgo nosaukumiem bez pēdiņām.
*Piezīme pie risinājuma:* Mainīgā vērtība atjaunota bez atkārtotas tipa norādīšanas, un `cout` automātiski izvada abus tipus.

---

#### Step: break-type-safety [EDITOR]
**Salauz un salabo tipu pārbaudi**

**Task:**
Šajā kodā mēģināts `int` mainīgajā ierakstīt tekstu — Python tas darbotos, bet C++ tas ir aizliegts:
1. Nospied «Palaist», lai izlasītu kompilatora kļūdu.
2. Izlabo 6. rindu, piešķirot veselu skaitli 18, lai programma sakompilētos un dotu gaidāmo izvadi.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
SPEED: 18
```

**Etalona risinājums:**
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
*Padoms:* Kompilators paziņo «incompatible type». Nomaini `"FAST"` 6. rindā pret skaitli `18` bez pēdiņām.
*Piezīme pie risinājuma:* Piešķirot saderīgu veselu skaitli `18`, kompilators apstiprina kodu un programma izdrukā ātrumu.

---

#### Step: measure-sizeof [EDITOR]
**Izmēri pamattipus ar `sizeof`**

**Task:**
Izmanto operatoru `sizeof(...)`, lai izvadītu `int` un `double` izmērus baitos formātā, kā parādīts zemāk:
1. Ievieto `sizeof(int)` pirmajā `cout` teikumā.
2. Ievieto `sizeof(double)` otrajā `cout` teikumā.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "INT BYTES: " <<  << endl;
    cout << "DOUBLE BYTES: " <<  << endl;
    return 0;
}
```

**Gaidāmā izvade:**
```
INT BYTES: 4
DOUBLE BYTES: 8
```

**Etalona risinājums:**
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
*Padoms:* Pirmajā tukšajā vietā pirms `<< endl` ieraksti `sizeof(int)`, bet otrajā — `sizeof(double)`.
*Piezīme pie risinājuma:* `sizeof(int)` atgriež 4, bet `sizeof(double)` atgriež 8.

---

#### Step: find-type-bug [CLICKLINE]
**Atrodi kļūdu mainīgo deklarēšanā**

Sigma degvielas kontroles kods nekompilējas. Atrodi un uzklikšķini uz rindas, kurā pieļauta tipiska mainīgo izmantošanas kļūda.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** 7. rindā rakstīts `int fuel = 60;` — tas mēģina izveidot otro mainīgo ar tādu pašu vārdu `fuel`. Lai mainītu jau esoša mainīgā vērtību, raksta tikai `fuel = 60;` bez `int`.


---

#### Step: fill-types [BLANKS]
**Atjauno tipus un mērījumu**

Aizpildi trīs izlaistos elementus, lai programma izveidotu mainīgos veselam skaitlim un daļskaitlim, atjaunotu vērtību un izvadītu `double` izmēru baitos.

**Kods:**
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

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `int` OR `short` OR `long` OR `long long`
- [[2]]: `double` OR `float`
- [[3]]: `sizeof`

**Explanation:** Veseliem skaitļiem (1, 14, -40) der `int` (vai `short`, `long`, `long long`), daļskaitļiem (2.5, 91.5) der `double` (vai `float`), bet izmēru baitos nosaka ar `sizeof`.


---

#### Step: check-typing [QUIZ]
**Kas notiks pēc šī koda palaišanas?**

Aplūko divas C++ rindas un izvēlies pareizo kompilatora rīcību.

**Kods:**
```cpp
int altitude = 15;
altitude = "HIGH";
```

**Tests:**
- [x] **compile-error**: Kompilācija apstāsies ar kļūdu — `int` mainīgajā nevar ierakstīt tekstu. *(PAREIZĀ ATBILDE)*
- [ ] **auto-switch**: Mainīgais `altitude` automātiski kļūs par tekstu, tāpat kā Python valodā.
- [ ] **prints-zero**: Programma veiksmīgi sakompilēsies, un `altitude` vērtība kļūs par 0.

**Explanation:** C++ ir statiski tipizēta valoda. Kad mainīgais `altitude` ir izveidots ar tipu `int`, tajā nedrīkst saglabāt tekstu — kompilators apturēs būvēšanu vēl pirms programmas palaišanas.


---

#### Step: drone-memory-audit [EDITOR] (Papilduzdevums)
**Sigma atmiņas audits**

**Task:**
Uzraksti pilnu programmu, veicot divus soļus:
1. Izveido četrus mainīgos: `int` misijas solam (14), `double` Marsa gravitācijai (3.73), `char` sektora kodam ('A') un `bool` aktīvam stāvoklim (`true`).
2. Izvadi katru vērtību kopā ar tās izmēru baitos ar `sizeof` formātā, kā parādīts zemāk.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    
    return 0;
}
```

**Gaidāmā izvade:**
```
SOL: 14 (4 B)
GRAVITY: 3.73 (8 B)
SECTOR: A (1 B)
ACTIVE: 1 (1 B)
```

**Etalona risinājums:**
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
*Padoms:* Atceries: `char` vērtību raksta vienpēdiņās `'A'`, bet `bool` vērtību `true` `cout` izvada kā 1. Piemēram: `cout << "SOL: " << sol << " (" << sizeof(sol) << " B)" << endl;`.

---

#### Step: recap [SUMMARY]
**Trešās misijas kopsavilkums**

**Kopsavilkums / Galvenie punkti:**
- Mainīgie ļauj saglabāt un atjaunināt datus lidojuma laikā. C++ ir statiski tipizēta valoda: tips tiek noteikts vienreiz pie izveides.
- Četri pamattipi: veseliem skaitļiem izmanto `int` (1, 14, -40), daļskaitļiem — `double` (2.5, 91.5), vienam simbolam vienpēdiņās — `char` ('A'), loģikai — `bool` (izvadē 1 vai 0).
- Divi tipizēšanas likumi: mainīgajam nedrīkst piešķirt nesaderīga tipa vērtību, un to pašu vārdu tajā pašā apgabalā nedrīkst deklarēt ar tipu divreiz.
- Operators `sizeof(...)` parāda izmēru baitos (`char` — 1, `int` — 4, `double` — 8; `long` — 4 mūsu 32 bitu vidē un Windows, bet 8 uz 64 bitu Linux/macOS).
- Nākamajā nodaļā noskaidrosim, kas notiek, kad vesels skaitlis kļūst pārāk liels un neietilpst savos baitos — Sigma degvielas skaitītājs pēkšņi rāda četrus miljardus litru.


---


# Lesson 4 · Veseli skaitļi un pārpilde
**Slug:** `integers` | **Module:** 1. bloks · Pamodināšana

#### Step: fuel-anomaly [THEORY]
*Eyebrow:* Lidojuma telemetrija
**Četru miljardu litru anomālija**

Pirmslidojuma degvielas pārbaudes laikā bāzes «IRIS» angārā izlūka Sigma telemetrijas konsole uzrādīja satraucošu skaitli: degvielas tvertnes atlikums `4 294 967 295 litri`. Sigma ir kompakts izlūkdrons, kura reālā titāna bāka ietilpina tikai 40 litrus.

Python valodā veseli skaitļi var augt neierobežoti, līdz operētājsistēmai beidzas operatīvā atmiņa. C++ valodā skaitļi tiek glabāti tieši procesora reģistros un fiksēta izmēra atmiņas šūnās (16, 32 vai 64 bitos). Kad vērtība pārsniedz šo bitu ietilpību, aprēķins neapstājas un nebrīdina — tas «pārlec» pa apli.

Šo aparatūras uzvedību sauc par **veselo skaitļu pārpildi** (integer overflow). Šajā nodaļā apgūsim C++ veselo skaitļu saimi, noskaidrosim, kā biti nosaka skaitļu robežas, un iemācīsimies izvēlēties uzticamus tipus kosmiskajai telemetrijai.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside a technical fueling hangar of Mars base IRIS, scout drone Sigma hovers connected by a corrugated fuel hose to a sleek vertical diagnostic terminal. The terminal's holographic screen shows an alarming readout: '4,294,967,295 L' with a warning pulse. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — looks up at the screen with an inquisitive tilt. Martian terrain and dusty horizon visible through an angled panoramic window. Use the attached image as the exact reference for the mascot. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the terminal screen glow. Render the Martian ground in desaturated warm greys, not red.


---

#### Step: integer-family [THEORY]
**Veselo skaitļu saime**

syntax: {tips} {nosaukums} = {vērtība};
- tips: veselo skaitļu tips — short, int, long long
- nosaukums: mainīgā vārds
- vērtība: vesels skaitlis, long long gadījumā ar sufiksu LL
- ;: pabeidz teikumu — obligāts

C++ piedāvā četrus galvenos veselo skaitļu izmērus, lai iegultajās sistēmās sabalansētu atmiņas taupīšanu un skaitļu ietilpību:

+ **short kompaktām vērtībām.** Aizņem 2 baitus (16 bitus). Glabā veselus skaitļus (-32768 līdz 32767). Piemērots leņķiem, mikrokontroleira tapu ID un maziem skaitītājiem.
+ **int ikdienas darbam.** Aizņem 4 baitus (32 bitus). Glabā veselus skaitļus (-2147483648 līdz 2147483647). Standarta izvēle visās C++ programmās.
+ **long sistēmas mērogam.** Aizņem 4 baitus 32 bitu vidē un Windows, bet 8 baitus 64 bitu Linux/macOS. Paredzamībai izvēlamies int vai long long.
+ **long long astronomiskiem skaitļiem.** Aizņem 8 baitus (64 bitus). Glabā līdz pat ~9 kvintiljoniem (aptuveni 9 × 10¹⁸). Izmanto laika zīmogiem mikrosekundēs un misijas pulksteņiem.

!> **32 bitu literāļa slazds.** C++ valodā kodā ierakstīts skaitlis (piemēram, 9000000000) pēc noklusējuma tiek uztverts kā 32 bitu `int`. Ja skaitlis pārsniedz 2,1 miljardu, tam obligāti jāpievieno sufikss `LL` (`9000000000LL`), pretējā gadījumā kompilators ziņos par skaitļa pārpildi vēl pirms tā piešķiršanas `long long` mainīgajam.

**Koda salīdzinājums:**
```cpp
long long ticks = 9000000000LL;
cout << ticks;
```
[PAREIZI] LL sufikss → kompilators uzskata konstanti par 64 bitu

```cpp
long long ticks = 9000000000;
cout << ticks;
```
[KĻŪDA / SLAZDS] bez sufiksa → brīdinājums par skaitļa pārpildi


---

#### Step: binary-ranges [EXPLAIN]
*Eyebrow:* Binārais attēlojums
**Biti, zīmes un robežas**

Katrs veselo skaitļu tips aizņem fiksētu bitu skaitu: 16 biti sniedz 65 536 dažādas vērtības (2¹⁶), bet 32 biti — vairāk nekā 4,29 miljardus (2³²).

> Divi galvenie veselo skaitļu režīmi:
> 1. **signed (noklusējums).** Augstāko bitu atvēl zīmei (+/-). 16 bitu `short` glabā skaitļus no -32 768 līdz 32 767.
> 2. **unsigned (bez zīmes).** Atsakās no negatīviem skaitļiem, divkāršojot pozitīvo maksimumu. `unsigned short` glabā no 0 līdz 65 535, bet `unsigned int` sasniedz 4 294 967 295.

Ievēro: `unsigned` nepalielina atmiņas apjomu — tas tikai pārbīda iespējamo vērtību logu, lai tas sāktos no nulles. Lielumiem, kas fiziski nevar būt negatīvi (bākas tilpums, masīva garums, baitu skaits), `unsigned` garantē drošu stāvokli bez mīnus zīmes.

> *Image Alt:* Shēma, kas salīdzina signed un unsigned robežas 16 bitu short un 32 bitu int tipiem.


##### [Arhīva ieraksts] Kāpēc raķete Ariane 5 uzsprāga 37. sekundē
1996. gada 4. jūnijā Eiropas Kosmosa aģentūra veica raķetes Ariane 5 pirmo startu (lidojums 501). Tikai 37 sekundes pēc pacelšanās nesējs strauji novirzījās no kursa, aerodinamisko spēku ietekmē sadalījās un iedarbināja pašiznīcināšanās sistēmu.

Oficiālā izmeklēšanas komisija profesora Žaka Luija Lionsa vadībā atklāja iemeslu: no iepriekšējā modeļa Ariane 4 pārņemtais programmatūras modulis mēģināja pārveidot 64 bitu peldošā komata horizontālā ātruma rādītāju par 16 bitu veselu skaitli ar zīmi (`short`).

Ariane 5 lielāks horizontālais ātrums radīja vērtību, kas pārsniedza 32 767. Aparatūras pārveidojums izsauca neapstrādātu pārpildes kļūdu, un abi borta datori (gan primārais, gan rezerves) vienlaikus izslēdzās, atstājot dzinēja sprauslas galējā stāvoklī.

Zaudējumi pārsniedza 370 miljonus dolāru. Šī katastrofa kļuva par pasaulē slavenāko piemēru datu tipu robežu un neapstrādātas pārpildes bīstamībai borta sistēmās.

Avots: ESA Ariane 5 Flight 501 Failure Report by the Inquiry Board (1996, https://www.esa.int/esapub/bulletin/bullet89/lions89.htm).


##### [Dziļāk] Kā dators glabā negatīvus skaitļus (papildkods)
Mūsdienu procesori negatīvus skaitļus glabā divnieka papildkodā (two's complement). 8 bitu baitā skaitlis 1 ir `00000001`, bet -1 tiek iegūts, apgriežot visus bitus un pieskaitot 1: `11111111`.

Ja `11111111` nolasa kā bezzīmes skaitli, tas ir 255 (2⁸ − 1). 32 bitos visi vieninieki (`11111111...`) signed režīmā nozīmē -1, bet unsigned režīmā — tieši 4 294 967 295.

Kad Sigma degvielas sensors unsigned mainīgajā mēģināja no 0 atņemt nelielu mērījumu, vērtība «pārleca» pāri nullei un kļuva par `4 294 967 295`.


---

#### Step: predict-overflow [PREDICT]
**Kas notiek pēc maksimuma?**

Šajā programmā `unsigned short` mainīgais sasniedz savu maksimālo vērtību 65 535 un tad pieskaita 1.

Mēģini uzminēt, ko šī programma izvadīs terminālī. Šis ir pirmais minējums, nevis pārbaudes darbs: ievadi savu prognozi un salīdzini to ar faktisko rezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `FUEL: 0`
**Explanation:** Kad `unsigned short` pārsniedz savu maksimālo vērtību (65 535), 17. pārnesuma bits aparatūras līmenī tiek atmests, un vērtība «pārlec» atpakaļ uz 0. C++ standarts garantē, ka bezzīmes skaitļiem pārpilde vienmēr notiek pēc moduļa 2ⁿ.


---

#### Step: fix-short-overflow [EDITOR]
**Piemērota diapazona izvēle**

**Task:**
Programma mēra Sigma patruļas attālumu metros. Pašlaik mainīgajam `distance` izmantots `short` (maksimums 32 767), tāpēc pie 45 000 metriem notiek pārpilde. Veic divus soļus:
1. Nomaini `distance` tipu uz `int`, lai skaitlis 45 000 ietilptu atmiņā.
2. Palaid programmu, lai izvadītu rezultātu formātā, kā parādīts zemāk.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    short distance = 45000;
    cout << "DISTANCE: " << distance << " M" << endl;
    return 0;
}
```

**Gaidāmā izvade:**
```
DISTANCE: 45000 M
```

**Etalona risinājums:**
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
*Padoms:* Aizstāj `short` 4. rindā ar `int`. Pašu skaitli 45000 nemaini.
*Piezīme pie risinājuma:* `int` brīvi glabā vērtības līdz ~2,1 miljardam, pilnībā atrisinot 45 000 metru pārpildi.

---

#### Step: find-overflow-bug [CLICKLINE]
**Atrodi pārpildīto mainīgo**

Sigma telemetrijas modulī viens no mainīgajiem pārsniedz sava tipa ietilpību un rada kļūdainus datus. Uzklikšķini uz rindas ar kļūdu.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 6
**Explanation:** 6. rindā `short altitude = 70000;` piešķir 70 000 16 bitu `short` mainīgajam ar zīmi. Tā kā `short` robeža ir 32 767, šāda vērtība izraisa pārpildi negatīvā skaitlī.


---

#### Step: fill-integer-types [BLANKS]
**Salāgo tipus ar Marsa misijas rādītājiem**

Izvēlies atbilstošu veselo skaitļu tipu katram no trim mainīgajiem atkarībā no nepieciešamā diapazona.

**Kods:**
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

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `short` OR `int`
- [[2]]: `int` OR `unsigned int`
- [[3]]: `long long`

**Explanation:** Mazs skaitlis (sektors 14) brīvi ietilpst `short` vai `int`. Marsa sola ilgums (88 775 sekundes) pārsniedz 32 767 un prasa `int` (vai `unsigned int`). Centrālā pulksteņa tikšķi (9 miljardi) pārsniedz 32 bitu `int` limitu (2,1 miljards) un prasa `long long`.


---

#### Step: quiz-unsigned [QUIZ]
**Kas notiek pie aizgūšanas zem nulles?**

Aplūko šīs divas koda rindas un izvēlies, kas notiks pēc 50 atņemšanas no 40 mainīgajā ar tipu `unsigned int`.

**Kods:**
```cpp
unsigned int fuel = 40;
fuel = fuel - 50;
```

**Tests:**
- [x] **wraps-to-billions**: Vērtība «pārlec» pa apli (modulo 2^32), kļūstot par aptuveni 4,29 miljardiem. *(PAREIZĀ ATBILDE)*
- [ ] **compile-error**: Kompilators aptur darbu ar zīmes nesaderības kļūdu.
- [ ] **becomes-negative**: Mainīgais nomaina tipu uz signed int un saglabā -10.

**Explanation:** Tā kā `unsigned int` nevar glabāt negatīvus skaitļus, atņemot 50 no 40, skaitlis pārlec zem nulles atpakaļ uz 32 bitu maksimālo vērtību (2³² − 10 = 4 294 967 286). Tieši tā radās Sigma 4 miljardi litru.


---

#### Step: calibrate-fuel [EDITOR]
**Kalibrē Sigma degvielas telemetriju**

**Task:**
Uzraksti Sigma telemetrijas kalibrēšanas programmu, veicot divus soļus:
1. Izveido divus mainīgos: `short tank_id` ar vērtību 3 un `unsigned int fuel_ml` ar vērtību 40000 (40 litri mililitros).
2. Izvadi telemetrijas rindiņas formātā, kā parādīts zemāk.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
```

**Gaidāmā izvade:**
```
TANK: 3
FUEL: 40000 ML
```

**Etalona risinājums:**
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
*Padoms:* Izveido `short tank_id = 3;` un `unsigned int fuel_ml = 40000;`, pēc tam izvadi katru ar `cout` un `endl`.
*Piezīme pie risinājuma:* Abi tipi precīzi atbilst saviem mērījumu diapazoniem bez atmiņas izšķērdēšanas vai pārpildes.

---

#### Step: mission-clock [EDITOR] (Papilduzdevums)
**Planetārās misijas pulkstenis**

**Task:**
Uzraksti programmu Marsa bāzes centrālajam pulkstenim, veicot divus soļus:
1. Izveido `long long` mainīgo `base_micros` ar vērtību 15000000000LL (15 miljardi mikrosekunžu — ārpus 32 bitu robežas).
2. Izvadi pulksteņa telemetriju kopā ar tā izmēru baitos ar `sizeof` formātā, kā parādīts zemāk.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
```

**Gaidāmā izvade:**
```
CLOCK: 15000000000 US
BYTES: 8
```

**Etalona risinājums:**
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
*Padoms:* Atceries pievienot sufiksu `LL`: `long long base_micros = 15000000000LL;` un izmanto `sizeof(base_micros)`.
*Piezīme pie risinājuma:* 64 bitu `long long` droši glabā 15 miljardus mikrosekunžu bez pārpildes un aizņem 8 baitus.

---

#### Step: recap [SUMMARY]
**Veselo skaitļu misijas kopsavilkums**

**Kopsavilkums / Galvenie punkti:**
- Veseli skaitļi C++ valodā ir saistīti ar reāliem aparatūras reģistriem: `short` (2 baiti), `int` (4 baiti) un `long long` (8 baiti).
- Modifikators `unsigned` divkāršo pozitīvo diapazonu, atsakoties no mīnus zīmes, taču atņemšana zem 0 liek vērtībai pārlekt uz maksimālo robežu (kā 4,29 miljardi `unsigned int` gadījumā).
- Konstantēm, kas lielākas par 2,1 miljardu, kodā jāpievieno sufikss `LL` (`9000000000LL`), lai kompilators tās neuzskatītu par pārpildītu 32 bitu `int`.
- Veselo skaitļu pārpilde reālā borta kodā notiek klusi: `signed` pārpilde izraisa nenoteiktu uzvedību, bet `unsigned` pārpildās cikliski pēc moduļa 2ⁿ.
- Nākamajā nodaļā noskaidrosim, kas notiek ar daļskaitļiem — un kāpēc aprēķins `5 / 2` nosēdina Sigma dronu krāterī, nevis uz nosēšanās laukuma.


---


# Lesson 5 · Daļskaitļi un precizitāte
**Slug:** `floating-point` | **Module:** 1. bloks · Pamodināšana

#### Step: crater-landing [THEORY]
*Eyebrow:* Lidojuma anomālija
**Nosēšanās krāterī**

Izlūka dronam Sigma bija jānolaižas uz bāzes IRIS paaugstinātās betona nosēšanās platformas. Tā vietā telemetrija apstiprināja, ka drons piezemējās 500 metrus par ātru seklā Marsa krātera akmeņainajā nogāzē.

Pēc lidojuma žurnāla analīze atklāja cēloni. Lai aprēķinātu pēdējo nolaišanās soli, borta programma dalīja 5 metrus ar 2 sekundēm, izmantojot izteiksmi `5 / 2`. Valodā C++ veselu skaitļu dalīšana vienmēr dod veselu skaitli: daļveida daļa tika vienkārši atmesta, un drons aprēķināja `2` metrus plānoto `2.5` vietā.

Veseli skaitļi un daļskaitļi aparatūras atmiņā pakļaujas atšķirīgiem likumiem:
+ **Veseli skaitļi (integers).** Vērtības kā 0, 14 un -300 glabājas `int` vai `long long`. Divu veselu skaitļu dalīšana vienmēr atmet daļskaitļa atlikumu.
+ **Daļskaitļi (floating-point).** Reāli fiziskie lielumi kā 3.73, -12.5 un 2.5 glabājas `float` vai `double` tipos.
+ **Pāreja uz daļskaitļiem.** Lai dalīšanas rezultātā iegūtu daļskaitli, vismaz vienam izteiksmes skaitlim jābūt ar decimālo punktu (`5.0 / 2`).

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside a dusty Martian crater, scout drone Sigma rests tilted on a rocky slope with carbon rotors stopped, just 500 meters away from the elevated concrete landing platform of base IRIS visible in the background. The course mascot — two square brackets [ ] facing each other with two round cream eyes between them — stands on a rocky ledge looking down at the drone with an analytical gaze. Style: minimal, geometric, flat shapes, no outlines, no text, no letters, no numbers, no logos, not cartoonish, calm and technical. Palette strictly: background #090B0F, surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the drone navigation sensor glow. Render the Martian ground in desaturated warm greys, not red.


##### [Arhīva ieraksts] Kāpēc Mars Climate Orbiter sadega atmosfērā 1999. gadā
1999. gada 23. septembrī NASA starpplanētu zonde Mars Climate Orbiter pēc deviņu mēnešu lidojuma tuvojās Sarkanajai planētai, lai ieietu stabilā orbītā. Plānotā drošā augstuma vietā (starp 140 un 150 km) kosmiskais aparāts iegāja Marsa retinātajā atmosfērā tikai 57 km augstumā, kur berze to momentā iznīcināja.

Izmeklēšanas komisija atklāja kļūdu mērvienību saskaņošanā starp divām programmatūras daļām. Kosmiskā kuģa būvētāja (Lockheed Martin) zemes vadības programmatūra dzinēju impulsu aprēķināja angļu mārciņspēka sekundēs (lbf·s). Savukārt NASA JPL navigācijas sistēma saņemtos datus interpretēja kā metriskās sistēmas Ņūtona sekundes (N·s).

Viens mārciņspēks atbilst aptuveni 4.45 Ņūtoniem. Šīs atšķirības dēļ zondes navigācijas aprēķinos 286 lidojuma dienu laikā nepārtraukti uzkrājās neliela kļūda, kas izrādījās liktenīga.

Kopējie zaudējumi pārsniedza 327 miljonus dolāru. Šī katastrofa kļuva par vienu no slavenākajām mācībām kosmiskajā navigācijā par mērvienību precizitāti un skaitļu pārveidošanas noteikumiem.

Avots: Mars Climate Orbiter Mishap Investigation Board Phase I Report (NASA, November 1999, https://llis.nasa.gov/lesson/639).


##### [Dziļāk] Kāpēc datora atmiņā skaitli 0.1 nevar saglabāt precīzi
Desmitu skaitīšanas sistēmā daļskaitlis 1/10 tiek pierakstīts vienkārši kā 0.1, jo bāze 10 dalās ar 2 un 5. Savukārt daļa 1/3 kļūst par bezgalīgu periodisku skaitli: 0.333333…

Dators visus datus glabā divnieku sistēmā (bāze 2), kur precīzi var attēlot tikai daļas, kuru saucējs ir divnieka pakāpe (1/2 = 0.5, 1/4 = 0.25, 1/8 = 0.125).

Divnieku sistēmā decimālais skaitlis 0.1 kļūst par bezgalīgu periodisku bināro daļu: 0.0001100110011… Tā kā datora reģistriem ir ierobežots bitu skaits, procesors šo virkni noapaļo. Šīs nelielās atšķirības dēļ, desmit reizes pieskaitot 0.1, rezultāts var būt 0.9999999999999999, nevis precīzi 1.0.


---

#### Step: float-vs-double [THEORY]
**Float un double**

syntax: {tips} {nosaukums} = {vertiba};
- tips: daļskaitļa tips — float, double
- nosaukums: mainīgā identifikators
- vertiba: skaitlis ar decimālo punktu, float gadījumā ar f sufiksu
- ;: semikols — obligāts katras komandas noslēgums

Pēc IEEE 754 standarta C++ nodrošina divus galvenos daļskaitļu tipus:

+ **float kompaktākai atmiņai.** Aizņem 4 baitus (32 bitus). Nodrošina apmēram 7 zīmīgos desmitdaļu ciparus. Kodā to pieraksta ar sufiksu `f` (`3.73f`, `12.5f`). Izmanto, kad mikrokontrollerī jātaupa katrs baits.
+ **double zinātniskai precizitātei.** Aizņem 8 baitus (64 bitus). Nodrošina 15 līdz 17 zīmīgos desmitdaļu ciparus. Tas ir noklusētais standarts reālajiem skaitļiem modernā C++.

!> **Literāļa sufiksa likums.** Jebkurš decimālais skaitlis kodā bez sufiksa (piemēram, `4.2` vai `0.05`) pēc noklusējuma ir `double`. Ja to mēģina piešķirt `float` mainīgajam, kompilators brīdina par iespējamu precizitātes zudumu, sašaurinot 64 bitus uz 32 bitiem.

**Koda salīdzinājums:**
```cpp
double speed = 12.5;
float alt = 4.2f;
```
[PAREIZI] literālis ar f sufiksu → 4 baitu float

```cpp
float alt = 4.2;
// warning: conversion from double to float
```
[KĻŪDA / SLAZDS] bez sufiksa → kompilators traktē kā 8 baitu double


---

#### Step: predict-division [PREDICT]
**Ko aprēķinās dalīšana valodā C++?**

Aplūko četras dalīšanas darbības zemāk. Mēģini uzminēt precīzu izvadi katrai komandai.

Šis ir novērojuma uzdevums, nevis eksāmens: novērtē, kā C++ izturas pret veseliem skaitļiem un daļskaitļiem, izdari savu pieņēmumu un pārbaudi rezultātu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `5 / 2 = 2
5.0 / 2 = 2.5
5 / 2.0 = 2.5
1 / 4 = 0`
**Explanation:** Ja abi skaitļi ir veseli (`5 / 2`), C++ veic veselo skaitļu dalīšanu un atmet atlikumu, dodot `2`. Ja vismaz viens skaitlis ir ar punktu (`5.0 / 2` vai `5 / 2.0`), izteiksme kļūst par daļskaitļu dalīšanu, dodot `2.5`. Izteiksmē `1 / 4` veselo skaitļu dalīšana dod `0`.


---

#### Step: integer-division-trap [THEORY]
*Eyebrow:* Aritmētikas mehānika
**Veselo skaitļu dalīšanas lamatas**

Bieža programmētāju kļūda ir mēģinājums saglabāt veselo skaitļu dalījumu `double` mainīgajā, cerot iegūt daļskaitli.

> Divi C++ dalīšanas pamatlikumi:
> 1. **Veselu skaitļu dalīšana atmet atlikumu.** Ja abi operandi ir veseli skaitļi (`int`), rezultāts ir `int`. Jebkura daļveida daļa tiek nekavējoties atmesta: `7 / 4` dod `1`, `1 / 4` dod `0`.
> 2. **Viens decimālais punkts maina visu aprēķinu.** Ja vismaz viens skaitlis ir daļskaitlis (`5.0 / 2` vai `5 / 2.0`), C++ pārveido visu operāciju par daļskaitļu aprēķinu.

Komanda `double d = 5 / 2;` nepasargā no kļūdas: vispirms izpildās `5 / 2`, dodot veselu `2`, un tikai pēc tam šis `2` tiek pārvērsts par `2.0` un saglabāts mainīgajā `d`.

!> **Ieradums no Python.** Valodā Python 3 parastā slīpsvītra `/` vienmēr dod daļskaitli (`5 / 2` ir `2.5`), bet veselo skaitļu dalīšanai lieto `//`. C++ viena slīpsvītra `/` strādā atkarībā no tipiem: veseliem skaitļiem tā vienmēr ir veselo skaitļu dalīšana!

**Koda salīdzinājums:**
```cpp
double d = 5.0 / 2;
// d is 2.5
```
[PAREIZI] daļskaitļa operands → precīzs 2.5

```cpp
double d = 5 / 2;
// 5 / 2 evaluates to 2, then stored as 2.0
```
[KĻŪDA / SLAZDS] veselu skaitļu dalīšana → atmet atlikumu pirms saglabāšanas double


---

#### Step: fix-crater-math [EDITOR]
**Salabo Sigma nosēšanās aprēķinu**

**Task:**
Drona nosēšanās programma aprēķināja soli `dist` ar veselu skaitļu dalīšanu, liekot dronam nolaisties krāterī. Salabo aprēķinu, lai `dist` būtu precīzi 2.5 metri formātā zemāk:
1. Aizstāj skaitli `5` ar `5.0` (vai `2` ar `2.0`).
2. Nospied «Palaist» un pārliecinies, ka terminālī parādās `2.5 M`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
DESCENT STEP: 2.5 M
```

**Etalona risinājums:**
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
*Padoms:* Labo 6. rindiņu: `double dist = 5.0 / 2;`.
*Piezīme pie risinājuma:* Pievienojot `.0`, C++ izpilda daļskaitļu dalīšanu un saglabā precīzu vērtību `2.5`.

---

#### Step: precision-map [EXPLAIN]
*Eyebrow:* Binārā uzbūve
**Daļskaitļu precizitāte atmiņā**

Pēc IEEE 754 standarta katrs daļskaitlis sastāv no trim binārām daļām: zīmes bita, eksponentes (kas mērogo skaitli) un mantisas (kas glabā zīmīgos ciparus).

> Precizitātes likums kosmiskajā navigācijā:
> 1. **float (23 bitu mantisa).** Saglabā apmēram 7 zīmīgos ciparus. Ilgstošos navigācijas aprēķinos kļūdas uzkrājas un rada novirzi.
> 2. **double (52 bitu mantisa).** Nodrošina 15 līdz 17 zīmīgos ciparus. Standarta izvēle aviācijā, trajektoriju modelēšanā un sensoru integrācijā.

Tā kā atmiņas bitu skaits ir ierobežots, daļskaitļi datorā ir nepārtrauktu reālu skaitļu tuvinājumi. Drona Sigma navigācijā lidojuma koordinātām mēs izmantojam tikai `double`.

> *Image Alt:* Shēma: IEEE 754 struktūra atmiņā — 32 bitu float (23 bitu mantisa, 7 cipari) pret 64 bitu double (52 bitu mantisa, 15 līdz 17 cipari).


---

#### Step: measure-float [EDITOR]
**Izmēri precizitātes tipus un degšanas laiku**

**Task:**
Pabeidz drona dzinēja degšanas laika aprēķinu formātā zemāk:
1. Izvadi `sizeof(float)` un `sizeof(double)`.
2. Aprēķini `burn_time`, izdalot degvielu `fuel` (7.5) ar patēriņu `rate` (2.0).
3. Izvadi dzinēja degšanas laiku sekundēs.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    double fuel = 7.5;
    double rate = 2.0;
    
    return 0;
}
```

**Gaidāmā izvade:**
```
FLOAT BYTES: 4
DOUBLE BYTES: 8
BURN TIME: 3.75 S
```

**Etalona risinājums:**
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
*Padoms:* Izveido mainīgo `double burn_time = fuel / rate;` un izvadi visus trīs lielumus ar `cout`.
*Piezīme pie risinājuma:* `float` aizņem 4 baitus, `double` — 8 baitus, un `7.5 / 2.0` dod precīzas `3.75` sekundes bez noapaļošanas.

---

#### Step: find-division-bug [CLICKLINE]
**Atrodi slēpto veselo skaitļu dalīšanu**

Drona telemetrija ziņo par lidojuma ātrumu `2 M/S` gaidīto `2.5 M/S` vietā. Atrodi un uzklikšķini uz rindas ar kļūdu aprēķinā.

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** 7. rindā tiek izpildīts `distance / seconds`. Tā kā abi mainīgie deklarēti kā `int`, veselo skaitļu dalīšana atmet atlikumu pirms vērtības piešķiršanas `double` mainīgajam `speed`. Lai to novērstu, vismaz vienam mainīgajam jābūt daļskaitlim.


---

#### Step: fill-float-types [BLANKS]
**Atjauno telemetrijas tipus un literāļus**

No Sigma telemetrijas koda ir pazuduši trīs svarīgi elementi. Aizpildi tukšos laukus, lai visi aprēķini saglabātu precīzas decimālās vērtības.

**Kods:**
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

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `double` OR `float`
- [[2]]: `.0` OR `.0f`
- [[3]]: `float` OR `double`

**Explanation:** `double` nodrošina precīzu gravitāciju, `.0` novērš veselo skaitļu dalīšanas atlikuma zudumu, un `float` atbilst literālim ar sufiksu `4.5f`.


---

#### Step: descent-trajectory [EDITOR] (Papilduzdevums)
**Nokalibrē nolaišanās profilu**

**Task:**
Uzraksti pilnu programmu, kas aprēķina drona Sigma pēdējo nolaišanās posmu formātā zemāk:
1. Deklarē `altitude` (`double`) ar vērtību `12.5`.
2. Deklarē `speed` (`double`) ar vērtību `2.5`.
3. Aprēķini nolaišanās laiku, izdalot `altitude` ar `speed`.
4. Izvadi `ALTITUDE: 12.5 M` un `DESCENT TIME: 5 S`.

**Sākuma kods:**
```cpp
#include <iostream>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}
```

**Gaidāmā izvade:**
```
ALTITUDE: 12.5 M
DESCENT TIME: 5 S
```

**Etalona risinājums:**
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
*Padoms:* Aprēķini `double time = altitude / speed;` un izvadi abus datus ar `cout` un `endl`.

---

#### Step: recap [SUMMARY]
**5. misijas kopsavilkums**

**Kopsavilkums / Galvenie punkti:**
- Reālajiem skaitļiem C++ nodrošina `float` (4 baiti, ~7 zīmīgie cipari) un `double` (8 baiti, ~15—17 zīmīgie cipari), kur `double` ir standarta izvēle.
- Dalot divus veselus skaitļus (`5 / 2`), C++ vienmēr veic veselo skaitļu dalīšanu un atmet atlikumu bez noapaļošanas.
- Lai iegūtu daļskaitli, vismaz vienam operandam jābūt decimālajam literālim (`5.0 / 2` vai `5 / 2.0`) vai daļskaitļa mainīgajam.
- Veselo skaitļu dalījuma piešķiršana `double` mainīgajam neatjauno atlikumu — atmešana notiek vēl pirms saglabāšanas atmiņā.
- Daļskaitļi IEEE 754 standartā ir bināri tuvinājumi ar ierobežotu mantisas bitu skaitu. 6. nodaļā mēs iepazīsim loģikas un teksta tipus: `bool`, `char` un `string`.


---


# Lesson 6 · bool, char un string
**Slug:** `bool-char-string` | **Module:** 1. bloks · Pamodināšana

#### Step: system-diagnostics [THEORY]
*Eyebrow:* Diagnostikas nodalījums
**Sistēmas stāvokļa karodziņu atjaunošana**

Pēc nosēšanās krāterī izlūka drons Sigma ir nogādāts bāzes IRIS tehniskās apkopes dokā. Mehāniskie mezgli ir veseli, bet borta dators pārstartē iekšējos reģistrus.

Pilnīgai sistēmas atjaunošanai ar skaitliskiem telemetrijas datiem vien nepietiek. Zondes diagnostikas konsolei nepieciešami loģiskie stāvokļu karodziņi mezglu gatavības pārbaudei, vienas rakstzīmes kodi sensoru režīmiem un teksta nosaukumi apakšsistēmu identificēšanai.

C++ nodrošina trīs specializētus tipus loģikai un tekstam:
+ **bool loģiskajiem stāvokļiem.** Glabā vērtību true vai false. Aizņem 1 baitu atmiņas.
+ **char vienai rakstzīmei.** Glabā vienu ASCII simbolu vienpēdiņās, piemēram, 'A' vai '8'. Aizņem 1 baitu atmiņas.
+ **std::string teksta virknēm.** Glabā vārdus, teikumus vai identifikatorus dubultpēdiņās, piemēram, "IRIS-01". Nodrošina standarta bibliotēkas galvene <string>.

> *Illustration scene:* Flat vector illustration, 16:9, for an online C++ course. Inside the high-tech technical maintenance bay of Mars base IRIS. A faceted geometric scout drone Sigma in dark slate #151A22 and warm grey #B7B0A4 hovers docked at an illuminated diagnostic console terminal. The console terminal has a glowing rectangular monitor showing abstract digital diagnostic readouts composed purely of flat rectangular binary status blocks, horizontal progress/level bars, and segmented matrix grids in aged brass #B99A61. Standing on the floor near the console, observing the diagnostic readout, is the course mascot: refer directly to mascot-reference.png. The mascot consists strictly of two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them, exactly as in the reference image. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Background shows minimal geometric maintenance bay architecture (#151A22, #090B0F) and an observation window revealing flat Martian terrain in desaturated warm grey (#B7B0A4), strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical and calm. Color palette strictly: #090B0F, #151A22, #B7B0A4, #D8D0C2, with aged brass #B99A61 only on the console display glow.


##### [Arhīva ieraksts] Kā ASCII 1963. gadā standartizēja datoru saziņu
Datoru pirmsākumos katrs aparatūras ražotājs izmantoja savu rakstzīmju kodējumu. IBM izmantoja BCD un vēlāk EBCDIC, savukārt citi izstrādāja 5 vai 6 bitu telegrāfa kodus. Viena datora sagatavotu magnētisko lenti cits dators nespēja nolasīt, jo skaitlis 1 vienā sistēmā nozīmēja burtu 'A', bet citā — burtu 'J'.

1963. gada maijā Amerikas Standartu asociācija (tagad ANSI) publicēja ASCII standartu (American Standard Code for Information Interchange). Tas ieviesa 7 bitu standartu ar 128 kodiem: kodi no 0 līdz 31 bija paredzēti vadības komandām (jauna rinda, zvanu signāls), no 48 līdz 57 — cipariem '0' līdz '9', no 65 līdz 90 — lielajiem latīņu burtiem 'A' līdz 'Z', un no 97 līdz 122 — mazajiem burtiem 'a' līdz 'z'.

Valoda C++ šo mantojumu saglabā tipā char, kas modernajās sistēmās aizņem 8 bitu baitu un tieši atbilst ASCII kodiem.

Avots: American Standard Code for Information Interchange, ASA X3.4-1963; Computer History Museum (https://www.computerhistory.org).


##### [Dziļāk] Kāpēc bool aizņem veselu baitu, nevis vienu bitu
Loģiskais lielums attēlo bināru izvēli: 1 (true) vai 0 (false). Matemātiski šādam stāvoklim pietiktu ar vienu vienīgu bitu.

Tomēr modernās procesoru arhitektūras (x86-64, ARM) adresē atmiņu baitos, nevis atsevišķos bitos. Atmiņas kontrolieris nevar tieši piekļūt atsevišķam bitam — mazākā nolasāmā vienība ir 8 bitu baits.

Ja C++ glabātu bool vērtības pa vienam bitam, katrai nolasīšanai un ierakstīšanai procesoram nāktos ielādēt veselu baitu, veikt bitu maskēšanas darbības (AND/OR) un saglabāt to atpakaļ, ievērojami palēninot darbību. Piešķirot bool tipam 1 baitu (8 bitus), C++ nodrošina maksimālu ātrdarbību, samierinoties ar 7 neizmantotiem bitiem katram atsevišķam karodziņam.


---

#### Step: bool-flags [THEORY]
**Loģiskie stāvokļi: bool**

Tips bool (nosaukts par godu britu matemātiķim Džordžam Būlam) glabā loģiskās patiesuma vērtības.

syntax: bool {nosaukums} = {vertiba};
- bool: loģiskā tipa atslēgvārds (1 baits)
- nosaukums: mainīgā identifikators
- vertiba: loģiskais literālis — `true` vai `false`
- ;: semikols — obligāts katras komandas noslēgums C++

> Loģisko mainīgo pamatlikumi:
> 1. **Tikai divi literāļi.** C++ pirmkodā loģiskās vērtības raksta tikai ar mazajiem burtiem: `true` un `false`.
> 2. **cout pēc noklusējuma izvada 1 vai 0.** Nosūtot bool vērtību uz cout plūsmu, terminālī tiek izvadīts `1` (par true) vai `0` (par false). Teksts "true" netiek izvadīts, ja vien nav iestatīts std::boolalpha karodziņš.
> 3. **Nulle ir false, pārējais ir true.** Valodā C++ skaitlis 0 nozīmē aplamu stāvokli (false), bet jebkurš cits skaitlis tiek uzskatīts par patiesu (true).

!> **Ieradums no Python.** Valodā Python loģiskās vērtības raksta ar lielo burtu (`True`, `False`). Valodā C++ uzraksts `True` vai `False` izraisīs kompilācijas kļūdu. Vienmēr lieto mazos burtus: `true` un `false`!

**Koda salīdzinājums:**
```cpp
bool radar_ready = true;
bool sensor_fault = false;
```
[PAREIZI] C++ atslēgvārdi: true un false (mazie burti)

```cpp
bool radar_ready = True;
// error: 'True' was not declared (C++ uses lowercase)
```
[KĻŪDA / SLAZDS] sintakses kļūda: C++ nepazīst True ar lielo burtu


---

#### Step: predict-bool-char [PREDICT]
**Paredzi bool un char izvadi**

Apskati mainīgo deklarācijas un izvades komandu zemāk. Paredzi precīzu teksta rindu, ko programma izvadīs terminālī.

Pievērs uzmanību: `active` ir `true`, `error` ir `false`, un `mode` ir rakstzīme `'S'`.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `1 0 S`
**Explanation:** Plūsma cout izvada skaitli '1' vērtībai true, skaitli '0' vērtībai false un tiešu simbolu 'S' tipam char. Atdalot ar atstarpēm, rezultāts ir "1 0 S". Valoda C++ nepievieno pēdiņas ap rakstzīmēm un neizvada vārdus "true"/"false".


---

#### Step: char-and-ascii [THEORY]
**Viena rakstzīme: char un ASCII**

Tips char glabā tieši vienu simbolu: burtu, ciparu, pieturzīmi vai atstarpi. Atmiņā tas aizņem tieši 1 baitu (8 bitus).

syntax: char {nosaukums} = '{simbols}';
- char: rakstzīmes tipa atslēgvārds (1 baits)
- nosaukums: mainīgā identifikators
- simbols: viens ASCII simbols vienpēdiņās
- ;: semikols — obligāts katras komandas noslēgums C++

> Rakstzīmju literāļu pamatlikumi:
> 1. **Tikai vienpēdiņas.** Viena simbola literāli obligāti liek vienpēdiņās: `'A'`, `'7'`, `'$'`, `'\n'`.
> 2. **Dubultpēdiņas pieder virknēm.** Simbols dubultpēdiņās (`"A"`) ir teksta virkne, nevis char. Mēģinot `"A"` piešķirt char mainīgajam, kompilators ziņos par kļūdu.
> 3. **Iekšēji tie ir veseli skaitļi.** Katrs char glabā veselu skaitli — ASCII kodu. Simbols `'A'` atmiņā ir skaitlis 65, `'B'` ir 66, bet cipara simbols `'0'` ir 48. Tā kā char pamatā ir skaitlis, ar to var veikt pat aritmētiskas darbības.

!> **Ieradums no Python.** Valodā Python vienpēdiņas un dubultpēdiņas ir pilnīgi identiskas (`'teksts'` == `"teksts"`). Valodā C++ pēdiņu veids nosaka datu tipu: vienpēdiņas `''` nozīmē tieši vienu char, bet dubultpēdiņas `""` — teksta virkni!

**Koda salīdzinājums:**
```cpp
char tier = 'A';
// 1 byte, single quotes
```
[PAREIZI] vienpēdiņas apzīmē 1 baita char literāli

```cpp
char tier = "A";
// error: invalid conversion from 'const char*' to 'char'
```
[KĻŪDA / SLAZDS] dubultpēdiņas veido virkni (nevar piešķirt char tipam)


---

#### Step: configure-status-flags [EDITOR]
**Iestati diagnostikas stāvokļa karodziņus**

**Task:**
Inicializē zondes Sigma primāros diagnostikas karodziņus:
1. Deklarē loģisko mainīgo `online` ar sākuma vērtību `true`.
2. Deklarē rakstzīmes mainīgo `sector` ar vērtību `'D'` (Diagnostikas nodalījums).
3. Izvadi ar `cout` mainīgo `online`, atstarpi `" "` un `sector` vienā rindā.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
1 D
```

**Etalona risinājums:**
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
*Padoms:* Uzraksti `bool online = true;` un `char sector = 'D';`, pēc tam izvadi tos: `cout << online << " " << sector << endl;`.
*Piezīme pie risinājuma:* Programma terminālī izvada `1 D`. Loģiskais karodziņš `online` attēlojas kā `1`, kam seko atstarpe un simbols `'D'`.

---

#### Step: string-basics [THEORY]
**Teksta virknes: std::string**

Tips char spēj glabāt tikai vienu pašu simbolu. Lai programmā strādātu ar vārdiem, komandām un paziņojumiem, C++ piedāvā tipu std::string.

syntax: string {nosaukums} = "{teksts}";
- string: teksta virknes tips no bibliotēkas `<string>`
- nosaukums: mainīgā identifikators
- teksts: patvaļīga rakstzīmju virkne dubultpēdiņās
- ;: semikols — obligāts katras komandas noslēgums C++

> Darba pamatlikumi ar std::string:
> 1. **Nepieciešama galvene <string>.** Lai izmantotu virkņu tipu, faila sākumā jāpievieno bibliotēka: `#include <string>`.
> 2. **Obligātas dubultpēdiņas.** Teksta virknes vienmēr liek dubultpēdiņās: `"IRIS-BASE"`. Vienpēdiņu lietošana izraisīs kompilatora kļūdu.
> 3. **Apvienošana ar operatoru +.** Virknes var savienot ar plusa zīmi (`+`), ja vismaz viens no elementiem jau ir string objekts: `string full = tag + "/" + code;`.
> 4. **Garuma noteikšana ar .length().** Izsaucot metodi `.length()` pie jebkura string mainīgā, iegūst precīzu rakstzīmju skaitu tajā.

!> **Burtisko virkņu savienošanas slazds.** Nedrīkst saskaitīt divus burtiskus virkņu literāļus tieši (`"IRIS" + "-01"` nedarbojas, jo neviens no tiem vēl nav `std::string` objekts). Vismaz vienam saskaitāmajam jābūt `std::string` mainīgajam!

**Koda salīdzinājums:**
```cpp
#include <string>
using namespace std;
string callsign = "IRIS-1";
```
[PAREIZI] std::string ar dubultpēdiņām teksta virknēm

```cpp
string callsign = 'IRIS-1';
// error: character constant too long for its type
```
[KĻŪDA / SLAZDS] kļūda: vienpēdiņas nevar saturēt teksta virkni


---

#### Step: string-operations-map [EXPLAIN]
*Eyebrow:* Atmiņas arhitektūra
**Tipu bool, char un string atmiņas izkārtojums**

Visi trīs neskaitliskie datu tipi pilda atšķirīgas funkcijas datora atmiņā.

> Arhitektūras salīdzinājums:
> 1. **bool (1 baits).** Glabā vienu bināru stāvokli (0 vai 1). Tieša baitu adresācija bez bitu maskēšanas.
> 2. **char (1 baits).** Glabā 8 bitu veselu skaitli, kas atbilst ASCII koda simbolam.
> 3. **std::string (dinamiska virkne).** Atmiņā pārvalda secīgu char elementu buferi, automātiski sekojot līdzi virknes garumam un noslēdzošajām rakstzīmēm.

Kad zonde Sigma pārraida telemetrijas paketi, tās virsrakstā apvienots viena baita stāvokļa karodziņš, viena baita protokola kods un mainīga garuma misijas teksta virkne.

> *Image Alt:* Atmiņas shēma ar 1 baitu bool, 1 baitu char un dinamisku std::string rakstzīmju virkni.


---

#### Step: format-mission-log [EDITOR]
**Izveido formatētu telemetrijas kanālu**

**Task:**
Formatē sakaru kanāla adresi zondei Sigma:
1. Apvieno virknes `station`, `"/"` un `channel`, izmantojot operatoru `+`, un saglabā rezultātu jaunā `string` mainīgajā `full_channel`.
2. Pirmajā rindā izvadi `full_channel`.
3. Otrajā rindā izvadi `full_channel.length()`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
LUNAR-BASE/ALPHA
16
```

**Etalona risinājums:**
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
*Padoms:* Uzraksti `string full_channel = station + "/" + channel;`, pēc tam izvadi `full_channel` un `full_channel.length()` katru savā rindā ar `endl`.
*Piezīme pie risinājuma:* Apvienotā virkne ir `LUNAR-BASE/ALPHA`, un tās kopējais garums ir tieši 16 rakstzīmes.

---

#### Step: find-quote-bug [CLICKLINE]
**Atrodi pēdiņu kļūdu**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 6
**Explanation:** 6. rindā uzrakstīts `char mode = "D";` ar dubultpēdiņām. Valodā C++ dubultpēdiņas apzīmē teksta virkni, ko nevar piešķirt char mainīgajam. Pareizs pieraksts ir `char mode = 'D';`.


---

#### Step: fill-type-tokens [BLANKS]
**Piešķir datu tipus misijas mainīgajiem**

**Kods:**
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

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `bool` OR `char`
- [[2]]: `char` OR `bool`
- [[3]]: `string` OR `char`

**Explanation:** `ready = true` ir loģiskais karodziņš (`bool`), `'S'` ir viena ASCII rakstzīme (`char`), bet `"IRIS-01"` ir teksta virkne (`string`).


---

#### Step: recap [SUMMARY]
**6. misijas kopsavilkums: Loģika, simboli un teksts**

Bāze IRIS ir veiksmīgi pārbaudījusi zondes Sigma diagnostikas telemetriju. Borta datora stāvokļa karodziņi, darbības režīmi un sakaru kanālu nosaukumi ir pareizi konfigurēti atmiņā.

| Tips | Izmērs | Literāļi / Formāts | Pielietojums zondes sistēmās |
| :--- | :--- | :--- | :--- |
| `bool` | 1 baits | `true`, `false` | Apakšsistēmu stāvokļa karodziņi (dokots, dzinējs ieslēgts) |
| `char` | 1 baits | `'A'`, `'D'`, `'Z'` | Protokolu kodi, sensoru režīmi, telemetrijas atslēgas |
| `std::string` | Dinamisks | `"LUNAR-BASE/ALPHA"` | Izsaukuma signāli, sakaru kanāli, kļūdu žurnāla ieraksti |

Nākamajā — 7. nodaļā — mēs apgūsim aritmētiskās izteiksmes un saliktos operatorus, lai aprēķinātu zondes lidojuma ātrumu, orbītas laiku un sensoru robežvērtības.


---


# Lesson 7 · Aritmētika un operācijas
**Slug:** `arithmetic` | **Module:** 1. bloks · Pamodināšana

#### Step: flight-trajectory-prep [THEORY]
*Eyebrow:* Lidojuma aprēķini
**Mawrth Vallis maršruta plānošana**

Izlūka drons Sigma ir novietots uz bāzes IRIS skrejceļa sliekšņa, gatavojoties autonomam 120 kilometru izlūkošanas lidojumam pāri Mawrth Vallis plato.

Pirms pacelšanās navigācijas līdzprocesoram jāaprēķina svarīgi fiziskie lielumi: kreisēšanas ātrums ($v = s / t$), lidojuma ilgums stundās un minūtēs, degvielas patēriņa temps un sensoru telemetrijas cikli.

C++ nodrošina pilnu aritmētisko un piešķiršanas operatoru kopumu lidojuma matemātikas tiešai izpildei aparātu līmenī:
+ **Pamata operatori (+ - * / %).** Fundamentālas algebras darbības un veselo skaitļu dalīšanas atlikuma operators `%`.
+ **Saliktā piešķiršana (+= -= *= /= %=).** Saīsinātas darbības, kas izmaina esoša mainīgā vērtību uz vietas bez tā nosaukuma atkārtošanas.
+ **Inkrements un dekrements (++ --).** Ātrdarbīgi vienas vienības soļa skaitītāji telemetrijas cikliem un secību uzskaitei.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. On the launch runway outside Mars base IRIS at night. Positioned on the runway launch threshold ready for liftoff is Scout drone Sigma with faceted dark carbon-slate surfaces, with subtle navigation lights and engine vents glowing in aged brass. Standing nearby at a mobile runway telemetry terminal, observing the drone and monitor, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. In the background, geometric modular structures of base IRIS and flat Martian terrain in desaturated warm grey (#B7B0A4), strictly no red. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 only on the telemetry display and drone engine vent glow.


##### [Arhīva ieraksts] Kā Apollo 11 Mēness modulis 1969. gadā izvairījās no datora pārslodzes
1969. gada 20. jūlijā, kad Apollo 11 Mēness modulis «Eagle» tuvojās Mēness Miera jūrai, borta vadības dators (AGC) pēkšņi sāka raidīt trauksmes kodus 1202 un 1201.

Nosēšanās radars bija atstāts nepareizā aparatūras režīmā, katru sekundi noslogojot centrālo procesoru ar simtiem lieku pārtraukuma signālu. Datoram draudēja atmiņas un izpildes ciklu izsīkums.

Mārgareta Hamiltone un viņas komanda MIT bija izveidojuši asinhronu vadības sistēmu ar stingru prioritāšu sadali. Dators automātiski atmeta zemākas prioritātes radara aprēķinus un novirzīja visus resursus kritiskajai dzinēju vilces aritmētikai un nolaišanās vienādojumiem. Tā kā aritmētiskās rutīnas izpildījās stingri pēc prioritātēm, Mēness modulis veiksmīgi nosēdās brīdī, kad bākā bija atlikušas vien dažas sekundes degvielas.

Avots: NASA Apollo 11 Mission Report; MIT Museum Hamilton Archives (https://airandspace.si.edu).


##### [Dziļāk] Kāpēc dalīšanas atlikums % ar negatīviem skaitļiem senākā C bija nedefinēts
Pamata matemātikā dalīšana ar atlikumu tiek definēta kā a = b * q + r, kur atlikums r vienmēr ir nenegatīvs: 0 <= r < |b|.

Agrīnajos C standartos (C89/C90) veselo skaitļu dalīšanas rezultāta zīme ar negatīviem skaitļiem bija atkarīga no konkrētā kompilatora: daži noapaļoja uz nulles pusi, bet citi — uz negatīvās bezgalības pusi.

Kopš C99 un C++11 standartiem ir stingri noteikta noapaļošana uz nulles pusi: dalījums a / b vienmēr atmet daļveida daļu, bet atlikums a % b vienmēr saglabā dalāmā a zīmi (tādējādi -7 % 3 ir -1, bet 7 % -3 ir 1).


---

#### Step: basic-arithmetic-and-modulo [THEORY]
**Pamata aritmētika un dalīšanas atlikums (%)**

Valodā C++ ir pieci binārie aritmētiskie operatori: saskaitīšana (`+`), atņemšana (`-`), reizināšana (`*`), dalīšana (`/`) un dalīšanas atlikums (`%`).

syntax: int {atlikums} = {dalāmais} % {dalītājs};
- int: veselo skaitļu tipa atslēgvārds
- atlikums: mainīgais atlikušā skaitļa glabāšanai
- dalāmais: vesels skaitlis, ko dala
- dalītājs: no nulles atšķirīgs vesels skaitlis, ar ko dala
- ;: semikols — obligāts katras komandas noslēgums C++

> Dalīšanas atlikuma operatora (%) pamatlikumi:
> 1. **Tikai veseli skaitļi.** Operators `%` aprēķina veselo skaitļu dalīšanas atlikumu. Tas darbojas tikai ar veselu skaitļu tipiem (`int`, `short`, `long long`) un `char`. To nedrīkst lietot ar `double` vai `float`.
> 2. **Cikliskais diapazons.** Jebkuram pozitīvam dalītājam `N` izteiksme `x % N` vienmēr dod rezultātu diapazonā no `0` līdz `N - 1`. Tāpēc dalīšanas atlikums ir ideāli piemērots pulksteņiem, buferu cikliem un telemetrijas slotiem.
> 3. **Dalīšana ar nulli nav atļauta.** Tāpat kā parastā dalīšanā (`/`), dalīšana vai atlikuma aprēķins ar nulli (`x % 0`) izraisa tūlītēju programmas avāriju (aparatūras kļūdu / nedefinētu uzvedību).

!> **Ieradums no Python.** Valodā Python dalīšanas atlikums darbojas arī ar daļskaitļiem (`5.5 % 2` dod `1.5`). Valodā C++ izteiksme `5.5 % 2` izsauc kompilatora kļūdu (`invalid operands to binary expression`). C++ valodā `%` darbojas tikai ar veseliem skaitļiem!

**Koda salīdzinājums:**
```cpp
int rem = 125 % 60;
// remainder is 5 (valid for integer types)
```
[PAREIZI] veselo skaitļu atlikums: aprēķina atlikušo skaitli 5

```cpp
double rem = 125.5 % 60;
// error: invalid operands to binary expression ('double' and 'int')
```
[KĻŪDA / SLAZDS] kļūda: dalīšanas atlikuma operators % neatbalsta daļskaitļus


---

#### Step: predict-modulo-cycles [PREDICT]
**Paredzi laika vienību pārveidošanu**

Apskati, kā veselo skaitļu dalīšana un atlikuma operators sadala kopējo sekunžu skaitu pilnās minūtēs un atlikušajās sekundēs.

Aprēķini, ko dod `125 / 60` un ko — `125 % 60`, un paredzi precīzu termināļa izvades rindu.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `2M 5S`
**Explanation:** `125 / 60` veic veselo skaitļu dalīšanu, dodot `2` pilnas minūtes (daļveida atlikums tiek atmests). Savukārt `125 % 60` aprēķina atlikušās sekundes (`125 - 60 * 2 = 5`). Kopā ar teksta birkām programma izvada `2M 5S`.


---

#### Step: operator-precedence [EXPLAIN]
*Eyebrow:* Izpildes hierarhija
**Operatoru prioritāte un grupēšana**

Matemātiskās izteiksmēs ar vairākiem operatoriem C++ aprēķina darbības pēc stingrām prioritāšu pakāpēm, nevis vienkārši no kreisās uz labo pusi.

> Operatoru prioritāšu hierarhija:
> 1. **Iekavas ( )** — Augstākā prioritāte. Izteiksmes iekavās vienmēr tiek izpildītas vispirms.
> 2. **Reizināšana, dalīšana, atlikums (* / %)** — Otrā pakāpe. Tiek izpildītas no kreisās uz labo pusi.
> 3. **Saskaitīšana un atņemšana (+ -)** — Trešā pakāpe. Tiek izpildītas tikai pēc augstāko pakāpju pabeigšanas.

Paļaušanās uz atmiņā paturētiem prioritāšu likumiem kosmosa navigācijā var radīt bīstamas kļūdas. Kritiskā borta kodā vienmēr lieto iekavas, lai skaidri fiksētu un dokumentētu plānoto aprēķinu secību.

> *Image Alt:* Shēma, kas salīdzina noklusēto operatoru prioritāti (10 + 5 * 2 = 20) ar iekavu lietojumu ((10 + 5) * 2 = 30).


---

#### Step: calculate-flight-telemetry [EDITOR]
**Aprēķini lidojuma laiku un neiedalītos paraugus**

**Task:**
Pabeidz zondes Sigma pirmslidojuma navigācijas aprēķinus zemāk norādītajā formātā:
1. Aprēķini `flight_hours`, dalot distanci `distance` (120) ar ātrumu `speed` (40).
2. Aprēķini neiedalītos paraugus `unassigned`, aprēķinot atlikumu no `total_samples` (47) dalījuma ar `sensors` (4).
3. Pirmajā rindā izvadi `HOURS: ` un `flight_hours`.
4. Otrajā rindā izvadi `UNASSIGNED: ` un `unassigned`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
HOURS: 3
UNASSIGNED: 3
```

**Etalona risinājums:**
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
*Padoms:* Deklarē `int flight_hours = distance / speed;` un `int unassigned = total_samples % sensors;`, pēc tam izvadi tos ar `cout` un `endl`.
*Piezīme pie risinājuma:* 120 / 40 ir tieši 3 stundas, un 47 % 4 dod atlikumu 3 (jo 4 * 11 = 44, atlikumā 3 paraugi).

---

#### Step: compound-assignment [THEORY]
**Saliktie piešķiršanas operatori**

Programmas bieži maina esoša mainīgā vērtību, pieskaitot, atņemot vai reizinot tā pašreizējo saturu ar kādu pieaugumu. Lai nebūtu divreiz jāraksta mainīgā vārds, C++ piedāvā saliktos piešķiršanas operatorus: `+=`, `-=`, `*=`, `/=` un `%=`.

syntax: {mainigais} += {pieaugums};
- mainigais: esošais mainīgā nosaukums, ko maina
- +=: saliktais saskaitīšanas operators
- pieaugums: pieskaitāmā vērtība vai izteiksme
- ;: semikols — obligāts katras komandas noslēgums C++

> Pieci pamata saliktie operatori:
> 1. **+= (pieskaitīt un piešķirt).** `fuel += 50;` palielina degvielu par 50.
> 2. **-= (atņemt un piešķirt).** `battery -= 15;` samazina bateriju par 15.
> 3. **`*=` (reizināt un piešķirt).** `thrust *= 2;` dubulto vilci.
> 4. **/= (dalīt un piešķirt).** `altitude /= 2;` samazina augstumu uz pusi.
> 5. **%= (atlikums un piešķirt).** `slot %= 10;` ierobežo `slot` diapazonā no 0 līdz 9.

Saliktā forma ir ne tikai īsāka, bet arī drošāka pret drukas kļūdām, īpaši strādājot ar gariem telemetrijas mainīgo nosaukumiem.

**Koda salīdzinājums:**
```cpp
battery -= 10;
// compact compound subtraction
```
[PAREIZI] saliktā atņemšana: kompakts un skaidrs pieraksts

```cpp
battery = battery - 10;
// verbose repetition of variable name
```
[PAREIZI] atkārtots nosaukums: pareizs, bet liekvārdīgs pieraksts


---

#### Step: increment-decrement [THEORY]
**Inkrements un dekrements: ++ un --**

Visbiežākā aritmētiskā operācija datorprogrammās ir skaitītāja palielināšana vai samazināšana tieši par 1. C++ šim nolūkam piedāvā īpašus unāros operatorus: `++` (inkrements) un `--` (dekrements).

syntax: {skaititājs}++;
- skaititājs: vesela skaitļa mainīgais
- ++: inkrementa operators, kas pieskaita 1
- ;: semikols — obligāts katras komandas noslēgums C++

> Inkrementa darbības principi:
> 1. **Kompakts solis.** Izteiksme `waypoints++;` ir līdzvērtīga `waypoints += 1;` un `waypoints = waypoints + 1;`.
> 2. **Prefikss pret postfiksu.** Atsevišķā komandā (`x++;` vai `++x;`) abas formas palielina `x` par 1. Sarežģītās izteiksmēs prefikss (`++x`) palielina pirms nolasīšanas, bet postfikss (`x++`) — pēc nolasīšanas.
> 3. **C++ standarts.** Kā atsevišķu komandu mūsdienu C++ pirmkodā skaitītāju un maršruta punktu atjaunināšanai klasiski izmanto `counter++;`.

!> **Ieradums no Python.** Valodā Python nav operatoru `++` un `--` (`x++` valodā Python ir sintakses kļūda, bet `++x` nozīmē tikai divas plusa zīmes `+(+x)`). Valodā C++ operators `++` ir pamata veids, kā palielināt skaitītājus!

**Koda salīdzinājums:**
```cpp
waypoints++;
// increments variable value by 1
```
[PAREIZI] inkrementa operators: palielina mainīgo par 1

```cpp
waypoints =+ 1;
// bug: assigns positive 1 instead of incrementing
```
[KĻŪDA / SLAZDS] sintakses kļūda: piešķir pozitīvu 1, nevis palielina


---

#### Step: predict-increment-flow [PREDICT]
**Izseko inkrementa un salikto operatoru izmaiņām**

Izseko mainīgā `waypoints` vērtībai cauri secīgām komandām. Paredzi galīgo terminālī izvadīto rezultātu.

Pievērs uzmanību: `waypoints` sākas ar `3`, pēc tam tiek izpildīts `waypoints++;`, un visbeidzot `waypoints += 4;`.

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `WAYPOINTS: 8`
**Explanation:** `waypoints` sākotnējā vērtība ir 3. Komanda `waypoints++;` palielina to par 1, iegūstot 4. Pēc tam `waypoints += 4;` pieskaita vēl 4, iegūstot 8. Programma izvada `WAYPOINTS: 8`.


---

#### Step: find-modulo-float-bug [CLICKLINE]
**Atrodi nederīgo atlikuma operatora operandu**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 7
**Explanation:** 7. rindā mēģināts izpildīt `int fuel_rem = fuel % 2;`, bet mainīgais `fuel` ir deklarēts kā `double` (`14.5`). Valodā C++ operators `%` pieprasa tikai veselu skaitļu operandus. Mēģinot to lietot ar `float` vai `double`, rodas kompilācijas kļūda.


---

#### Step: fill-operator-tokens [BLANKS]
**Piešķir operatorus telemetrijas rādītājiem**

**Kods:**
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

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `/`
- [[2]]: `%`
- [[3]]: `+=`

**Explanation:** `minutes / 60` aprēķina pilnas stundas (2), `minutes % 60` aprēķina atlikušās minūtes (20), bet `total_dist += 25` uzkrāj kopējo nobraukto distanci (125).


---

#### Step: recap [SUMMARY]
**7. misijas kopsavilkums: Aritmētika un operācijas**

Zondes Sigma pirmslidojuma trajektorijas un resursu aprēķini ir pabeigti. Visi navigācijas rādītāji, degvielas patēriņa prognozes un sensoru cikli ir aprēķināti ar standarta C++ operatoriem.

| Operatoru grupa | Sintakse / Simboli | Darbība | Pielietojums zondes sistēmās |
| :--- | :--- | :--- | :--- |
| Pamata aritmētika | `+`, `-`, `*`, `/` | Standarta algebra | Distances, ātruma un degvielas kopsummas |
| Dalīšanas atlikums | `%` | Veselo skaitļu dalīšanas atlikums | Cikliskie skaitītāji, pulksteņa minūtes, sloti |
| Saliktā piešķiršana | `+=`, `-=`, `*=`, `/=`, `%=` | Maina vērtību uz vietas | Baterijas patēriņš, degvielas sadegšana, ceļa posmi |
| Solis par vienu | `++`, `--` | Pieskaita vai atņem 1 | Maršruta punktu indekss, paraugu iterācija |

Nākamajā — 8. nodaļā — mēs apgūsim termināļa ievadi (`cin >>` un `getline`), lai bāzes operatori varētu ievadīt lidojuma koordinātas un misijas parametrus tieši no klaviatūras.


---


# Lesson 8 · Ievade ar cin
**Slug:** `cin` | **Module:** 1. bloks · Pamodināšana

#### Step: operator-console-prep [THEORY]
*Eyebrow:* Lidojumu dispečera terminālis
**Operatora pults pieslēgšana**

Izlūkdrons Sigma atrodas bāzes IRIS starta laukumā, sagatavots pirmajam izlūklidojumam virs Mawrth Vallis plato. Iepriekšējās misijās visi lidojuma parametri tika ierakstīti tieši C++ pirmkodā kā nemainīgas konstantes.

Īstās kosmosa misijās parametru iešūšana kodā ir bīstama: maršruta punkti, lidojuma ātrums un atmosfēras apstākļi mainās ar katru izlidojumu. Lai programma būtu pielāgojama, borta datoram jāspēj saņemt ievades datus tieši no bāzes operatora programmas darbības laikā.

C++ nodrošina interaktīvu plūsmas ievadi caur standarta ievades konsoli:
+ **Plūsma cin.** Tiek iekļauta automātiski ar `<iostream>`. Savieno programmu tieši ar operatora tastatūras ievadi.
+ **Izgūšanas operators (>>).** Vērsts uz iekšu uz saņemošo mainīgo: `cin >> speed;`. Virziena bultiņa attēlo datu plūsmu.
+ **Automātiska tipu parsēšana.** Atšķirībā no Python `input()`, kas vienmēr atgriež teksta virkni, `cin >>` automātiski nolasa datus vajadzīgajā tipā: veselos skaitļos, daļskaitļos vai virknēs.

> *Illustration scene:* Flat vector illustration, 16:9 ratio, for an online C++ course. Inside the flight telemetry and dispatch room of Mars base IRIS at dawn. In the foreground, an industrial tactical console terminal with illuminated displays showing telemetry parameters and an active prompt. Sitting attentively at the console terminal, holding a data stylus, is the course mascot: strictly two freestanding cream-colored square brackets facing each other [ ] with two round cream circular eyes between them. The mascot has NO legs, NO feet, NO body, NO black bounding box, NO arms. Through a large reinforced panoramic observation window in the background, Scout drone Sigma rests ready on the launch pad under a starry space sky and soft amber Martian horizon. Style: minimalist geometric flat vector, solid color fills, zero outlines, no gradients, no text, no letters, no numbers, no logos, technical, calm, and precise. Color palette strictly: background #090B0F, structural surfaces #151A22, warm grey #B7B0A4, cream #D8D0C2, and a single accent of aged brass #B99A61 on the telemetry display and drone vent glow.


##### [Arhīva ieraksts] Kā standarta plūsmas Unix 1972. gadā mainīja skaitļošanu
Agrīnajos lieldatoros katrai ārējai iekārtai bija savas asemblera komandas. Datu nolasīšanai no perfokartēm, magnētiskās lentes vai teletaipa bija nepieciešamas pilnīgi atšķirīgas instrukcijas, padarot programmu pārnešanu starp iekārtām neiespējamu.

1972. gadā Kens Tompsons un Deniss Ričijs Bell Labs radīja Unix standarta plūsmu arhitektūru: standarta ievadi (stdin), standarta izvadi (stdout) un kļūdu plūsmu (stderr). Jebkura programma varēja lasīt datus kā vienotu baitu plūsmu neatkarīgi no tā, vai avots bija tastatūra, automatizēts skripts vai fails.

1985. gadā Bjarne Stroustrups pielāgoja šo plūsmu filozofiju C++ valodai, piešķirot bīdīšanas operatoriem << un >> plūsmas nozīmi. Ševroni tika izvēlēti kā intuitīvas virziena bultiņas: << izvada datus uz ekrānu, bet >> izgūst datus iekšā programmas atmiņā.

Avots: Dennis Ritchie, 'The Evolution of the Unix Time-sharing System'; Bjarne Stroustrup, 'The Design and Evolution of C++' (Addison-Wesley, 1994).


##### [Dziļāk] Kā cin apstrādā ievades buferi 'zem pārsega'
Kad jūs rakstāt terminālī, rakstzīmes uzkrājas operētājsistēmas buferī līdz taustiņa Enter nospiešanai. Kad C++ programma izpilda `cin >> value;`, plūsma sāk pārbaudīt bufera saturu pa vienai rakstzīmei.

Vispirms `cin` automātiski izlaiž visas sākuma atstarpes, tabulācijas un rindpārneses. Pēc tam tas nolasa visas secīgās rakstzīmes, kas atbilst mērķa mainīgā tipam. Piemēram, skaitlim `int` tiek lasīti cipari līdz pirmajai atstarpei vai burtam.

Pārējās neizmantotās rakstzīmes paliek buferī un gaida nākamo ievades komandu. Tas ļauj ar vienu ievades rindu aizpildīt vairākus mainīgos vienlaicīgi.


---

#### Step: cin-stream-basics [THEORY]
*Eyebrow:* Konsoles izgūšana
**Vērtību nolasīšana ar cin**

Lai nolasītu datus no operatora, deklarējiet mainīgo atmiņā un novirziet plūsmas saturu tajā ar operatoru `cin >>`.

syntax: cin >> {variable};
- cin: standarta konsoles ievades plūsma no `<iostream>`
- >>: izgūšanas operators — virza plūsmas datus mainīgajā
- variable: deklarēts mainīgais atmiņā, kurā saglabā datus
- ;: komandas beigu zīme — obligāta valodā C++

> Konsoles ievades pamatnoteikumi:
> 1. **Mainīgais jādeklarē iepriekš.** Nevar ievadīt datus neesošā mainīgajā. Vienmēr norādiet tipu vispirms: `int speed; cin >> speed;`.
> 2. **Bultiņu virziens rāda iekšup.** `cout <<` izvada datus ĀRĀ uz termināļa ekrānu. `cin >>` virza datus IEKŠĀ programmas mainīgajā.
> 3. **Vairākas vērtības vienā komandā.** Izgūšanu var apvienot ķēdē: `cin >> distance >> speed;`. Plūsma automātiski izmanto atstarpes vai Enter, lai atdalītu vērtības.

!> **Python ieradums, kas jāaizmirst.** Valodā Python ievade vienmēr atgriež tekstu: `speed = int(input())`. Valodā C++ manuāla pārveidošana nav vajadzīga! Mainīgā tips nosaka, kā `cin` nolasa un interpretē ienākošos datus.

> *Image Alt:* Diagramma, kas salīdzina plūsmu virzienus: cout << izvada datus uz ekrānu, bet cin >> ievada datus mainīgajā.

**Koda salīdzinājums:**
```cpp
int speed;
cin >> speed;
// valid: extraction operator >> pulls input into variable
```
[PAREIZI] Korekts izgūšanas operators >> virza datus mainīgajā

```cpp
int speed;
cin << speed;
// syntax error: invalid operands to binary expression ('istream' and 'int')
```
[KĻŪDA / SLAZDS] Sintakses kļūda: izvades operators << nevar nolasīt datus mainīgajā


---

#### Step: predict-cin-math [PREDICT]
**Paredziet plūsmas aprēķinu**

**Kods:**
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

**Uzdevums:** Paredziet programmas izvadi.
**Expected Output:** `14`
**Explanation:** Komanda `cin >> a >> b` iestata `a = 3` un `b = 4`. Izteiksme `3 * 4 + 2` vispirms izpilda reizināšanu `3 * 4 = 12` un tad saskaitīšanu `12 + 2 = 14`.


---

#### Step: read-flight-params [EDITOR]
**Nolasiet misijas lidojuma parametrus**

**Task:**
Nokonfigurējiet Sigmas dispečera datoru:
1. Nolasiet `distance` un `speed` no `cin`.
2. Aprēķiniet lidojuma ilgumu: `int hours = distance / speed;`.
3. Izvadiet `DURATION: `, kam seko `hours` un ` H` jaunā rindā.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
DURATION: 3 H
```

**Etalona risinājums:**
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
*Padoms:* Izmantojiet `cin >> distance >> speed;`, pēc tam izdrukājiet `"DURATION: " << hours << " H" << endl;`.
*Piezīme pie risinājuma:* Ja ievadīti skaitļi 120 un 40, dalījums 120 / 40 dod 3 stundas.

---

#### Step: cin-strings-and-whitespace [THEORY]
*Eyebrow:* Teksta virkņu izgūšana
**Kā cin apstrādā atstarpes un vārdus**

Teksta identifikatorus var nolasīt tieši `std::string` mainīgajā ar operatoru `cin >>`.

> Atstarpju atdalīšanas likums:
> Nolasot tekstu ar `cin >> text;`, plūsma apstājas pie pirmās atstarpes, tabulācijas vai rindpārneses. Visi nākamie vārdi paliek gaidīt ievades buferī!

Ja operators ievada `MAWRTH VALLIS`, komanda `cin >> sector;` nolasīs tikai `MAWRTH`. Lai nolasītu otro vārdu atsevišķā mainīgajā, izmanto ķēdi: `cin >> word1 >> word2;`.

**Koda salīdzinājums:**
```cpp
string sector;
cin >> sector;
// input: "MAWRTH VALLIS"
// sector becomes "MAWRTH" (stops at first space)
```
[PAREIZI] Viens string mainīgais nolasa tikai pirmo vārdu līdz atstarpei

```cpp
string word1, word2;
cin >> word1 >> word2;
// input: "MAWRTH VALLIS"
// word1 = "MAWRTH", word2 = "VALLIS"
```
[PAREIZI] Divi string mainīgie nolasa abus ar atstarpi atdalītos vārdus


---

#### Step: reading-full-lines-getline [THEORY]
*Eyebrow:* Veselas rindas ievade
**Rindu ar atstarpēm nolasīšana ar getline**

Misijas žurnāla ierakstos, sektoru nosaukumos un ziņojumos bieži ir vairāki vārdi ar atstarpēm. Lai nolasītu visu rindu līdz taustiņa Enter nospiešanai, C++ piedāvā funkciju `getline()`.

syntax: getline(cin, {target});
- getline: standarta bibliotēkas funkcija, kas nolasa pilnu rindu
- cin: ievades plūsma, no kuras lasīt
- target: `std::string` mainīgais, kurā saglabā visu rindu
- ;: komandas beigu zīme — obligāta valodā C++

> Kad kuru ievades veidu izvēlēties:
> 1. **Skaitļiem (int, double).** Lietojiet `cin >> num;` — tas automātiski izlaiž sākuma atstarpes un nolasa ciparus.
> 2. **Atsevišķiem vārdiem vai komandu kodiem.** Lietojiet `cin >> word;` — ideāli piemērots viena vārda kodiem kā `SIGMA` vai `RUNWAY-1`.
> 3. **Pilniem nosaukumiem vai teikumiem ar atstarpēm.** Lietojiet `getline(cin, text);` — nolasa visas rakstzīmes, ieskaitot atstarpes, līdz Enter.

**Koda salīdzinājums:**
```cpp
string mission_name;
getline(cin, mission_name);
// input: "Mawrth Vallis Recon"
// mission_name = "Mawrth Vallis Recon" (reads full line)
```
[PAREIZI] getline nolasa pilnu rindu kopā ar atstarpēm

```cpp
string mission_name;
cin >> mission_name;
// input: "Mawrth Vallis Recon"
// mission_name = "Mawrth" (cuts off at space)
```
[KĻŪDA / SLAZDS] cin >> apstājas pie pirmās atstarpes


---

#### Step: find-chevron-bug [CLICKLINE]
**Atrodiet ievades virziena kļūdu**

**Kods:**
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

**Uzdevums:** Atrodiet rindu ar kļūdu.
**Bug is on line:** 8
**Explanation:** Rindā 8 ir uzrakstīts `cin << distance;`. Operatori `<<` ir paredzēti izvadei ar `cout`. Datu ievadei nepieciešams izgūšanas operators `cin >> distance;`.


---

#### Step: fill-cin-sequence [BLANKS]
**Pabeidziet konsoles dialogu**

**Kods:**
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

**Uzdevums:** Ierakstiet trūkstošos vārdus.
**Trūkstošo vārdu atbildes:**
- [[1]]: `>>`
- [[2]]: `<<`

**Explanation:** `cin >> altitude;` ievada datus no konsoles mainīgajā, bet `cout << ...` izvada tekstu uz ekrāna.


---

#### Step: drone-dispatch-console [EDITOR]
**Drona izlidošanas dispečera konsole**

**Task:**
Uzrakstiet izlūkdrona Sigma starta vadības programmu:
1. Nolasiet mērķa sektora nosaukumu pirmajā rindā ar `getline(cin, target);`.
2. Nolasiet attālumu un ātrumu otrajā rindā ar `cin >> distance >> speed;`.
3. Aprēķiniet lidojuma laiku: `int time = distance / speed;`.
4. Izvadiet `TARGET: `, kam seko `target`.
5. Izvadiet `TIME: `, kam seko `time` un ` H`.

**Sākuma kods:**
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

**Gaidāmā izvade:**
```
TARGET: Mawrth Vallis
TIME: 3 H
```

**Etalona risinājums:**
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
*Padoms:* Izsauciet `getline(cin, target);`, tad `cin >> distance >> speed;`, aprēķiniet `time = distance / speed;` un izdrukājiet abas rindas ar `endl`.
*Piezīme pie risinājuma:* Ievadot sektoru 'Mawrth Vallis' un parametrus 180 km ar 60 km/h, programma izvada 3 stundas.

---

#### Step: recap [SUMMARY]
**8. misijas kopsavilkums: Interaktīvā konsole atbloķēta**

Bāze IRIS ir pārbaudījusi dispečera konsoli. Izlūkdrons Sigma ir gatavs saņemt lidojuma datus un koordinātas interaktīvi no misijas vadības centra.

| Ievades veids | Sintakse | Atstarpju apstrāde | Tipiskais lietojums kosmosa misijā |
| :--- | :--- | :--- | :--- |
| `cin >> int/double` | `cin >> val;` | Izlaiž sākuma atstarpes, nolasa skaitli | Lidojuma augstums, ātrums, koordinātas |
| `cin >> string` | `cin >> word;` | Apstājas pie pirmās atstarpes / rindpārneses | Izsaukuma signāli, statusa kodi, atslēgvārdi |
| `getline()` | `getline(cin, str);` | Nolasa visu rindu, ieskaitot atstarpes | Sektoru pilnie nosaukumi, misijas žurnāli |

Apsveicam ar 1. bloka «Pamodināšana» pabeigšanu! Jūs esat apguvuši C++ programmas uzbūvi, pamata tipus, atmiņas izmērus, aritmētiskos operatorus un konsoles ievadi/izvadi. Tālāk 2. blokā «Lēmumi» (Decisions) mēs apgūsim nosacījumus `if` un `else`, lai droni spētu patstāvīgi pieņemt lēmumus skarbajos Marsa apstākļos.


---
