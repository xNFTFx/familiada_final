let punkty1 = 0;
let punkty2 = 0;
let punkty_runda = 0;
let aktywnaDruzyna = 0;
let bledy = 0;
let pytania = {};
let mnoznik = 1;
let dobrze = new Audio("dobrze.mp3");
let zle = new Audio("zle.mp3");
let intro = new Audio("intro.mp3");
let miedzy = new Audio("miedzy.mp3");
let graRozpoczeta = false;

function zaladujPytania() {
        pytania = {
                "1": {
                        "Pytanie": "Co student robi na wykładzie zamiast słuchać?",
                        "1": { "odpowiedz": "Gra na telefonie/tablecie/laptopie", "punkty": 34, "wyswietlona": false },
                        "2": { "odpowiedz": "Śpi", "punkty": 19, "wyswietlona": false },
                        "3": { "odpowiedz": "Robi projekt/uczy się na inne zajęcia", "punkty": 17, "wyswietlona": false },
                        "4": { "odpowiedz": "Sprawdza połączenia lotnicze", "punkty": 13, "wyswietlona": false },
                        "5": { "odpowiedz": "Robi zakupy online", "punkty": 9, "wyswietlona": false },
                        "6": { "odpowiedz": "Nie choodzi na niego", "punkty": 6, "wyswietlona": false }
                },
                "2": {
                        "Pytanie": "Z czym najmocniej kojarzy się sesja egzaminacyjna?",
                        "1": { "odpowiedz": "Stres", "punkty": 22, "wyswietlona": false },
                        "2": { "odpowiedz": "Kawa/energetyki", "punkty": 21, "wyswietlona": false },
                        "3": { "odpowiedz": "Nauka", "punkty": 17, "wyswietlona": false },
                        "4": { "odpowiedz": "Brak snu", "punkty": 15, "wyswietlona": false },
                        "5": { "odpowiedz": "Prokrastynacja", "punkty": 14, "wyswietlona": false },
                        "6": { "odpowiedz": "Kombinowanie", "punkty": 4, "wyswietlona": false }
                },
                "3": {
                        "Pytanie": "Czego prowadzący nie lubią w studentach?",
                        "1": { "odpowiedz": "Braku aktywności", "punkty": 20, "wyswietlona": false },
                        "2": { "odpowiedz": "Projektów zakończonych sformułowaniem: \"Jeśli potrzebujesz pomocy w przygotowaniu slajdów, materiałów dodatkowych lub chcesz dostosować prezentację do konkretnej grupy odbiorców, chętnie pomogę!\"", "punkty": 19, "wyswietlona": false },
                        "3": { "odpowiedz": "Ściągania", "punkty": 12, "wyswietlona": false },
                        "4": { "odpowiedz": "Spóźnień", "punkty": 10, "wyswietlona": false },
                        "5": { "odpowiedz": "Nieobecności / olewania przedmiotu", "punkty": 7, "wyswietlona": false }
                },
                "4": {
                        "Pytanie": "Co robi student, gdy dowiaduje się, że zajęcia są odwołane?",
                        "1": { "odpowiedz": "Błyskawicznie ewakuuje się z uczelnii, na wypadek gdyby prowadzący jednak postanowił się zjawić", "punkty": 32, "wyswietlona": false },
                        "2": { "odpowiedz": "Idzie na złoty trunek", "punkty": 22, "wyswietlona": false },
                        "3": { "odpowiedz": "Idzie spać", "punkty": 16, "wyswietlona": false },
                        "4": { "odpowiedz": "Powiadamia o tym pozostałych studentów za pomocą grupy na messengerze", "punkty": 11, "wyswietlona": false }
                },
                "5": {
                        "Pytanie": "Z jakiego powodu studenci najczęściej opuszczają zajęcia?",
                        "1": { "odpowiedz": "Impreza dzień wcześniej", "punkty": 29, "wyswietlona": false },
                        "2": { "odpowiedz": "Lenistwo", "punkty": 22, "wyswietlona": false },
                        "3": { "odpowiedz": "Zaspanie", "punkty": 20, "wyswietlona": false },
                        "4": { "odpowiedz": "Praca lub inne zobowiązania", "punkty": 14, "wyswietlona": false },
                        "5": { "odpowiedz": "Pogoda (deszczowa lub słoneczna)", "punkty": 7, "wyswietlona": false }
                },
                "6": {
                        "Pytanie": "Co studenci jedzą najczęściej?",
                        "1": { "odpowiedz": "Tosty", "punkty": 31, "wyswietlona": false },
                        "2": { "odpowiedz": "Dania ze słoików (od mamy/babci)", "punkty": 18, "wyswietlona": false },
                        "3": { "odpowiedz": "Pesto", "punkty": 11, "wyswietlona": false },
                        "4": { "odpowiedz": "Makarony", "punkty": 8, "wyswietlona": false }
                }
        };
}

window.onload = zaladujPytania;

let aktualnePytanie = "1";

function wyswietlOdpowiedz(numer) {
        const odpowiedz = pytania[aktualnePytanie][numer];
        if (odpowiedz) {
                dobrze.play();
                punkty_runda += odpowiedz.punkty*mnoznik;
                document.getElementById("punkty_runda").textContent = `Punkty rundy: ${punkty_runda}`;
                document.getElementById(`Odp${numer}`).textContent = `${odpowiedz.odpowiedz} - ${odpowiedz.punkty}pkt`;
        }
}

function koniecRundy() {
        if (aktywnaDruzyna == 1) {
                punkty1 += punkty_runda;
                document.getElementById("Punkty1").textContent = `Punkty: ${punkty1}`;
        }
        if(aktywnaDruzyna == 2){
                punkty2 += punkty_runda;
                document.getElementById("Punkty2").textContent = `Punkty: ${punkty2}`;
        }
        document.getElementById("punkty_runda").textContent = `Punkty rundy: ${punkty_runda}`;
        punkty_runda = 0;
        document.getElementById("bledy1").textContent = `Błędy: 0`;
        document.getElementById("bledy2").textContent = `Błędy: 0`;
        document.getElementById("team1").classList.remove("active");
        document.getElementById("team2").classList.remove("active");
        aktywnaDruzyna = 0;
}

// Nasłuchiwanie zdarzenia klawiatury
document.addEventListener("keydown", function (event) {
        // Start gry po spacji
        if (!graRozpoczeta && (event.code === "Space" || event.key === " ")) {
                graRozpoczeta = true;
                intro.play();
                document.getElementById("startScreen").style.display = "none";
                document.getElementById("tresc").style.display = "";
                document.getElementById("pytanie").style.display = "";
                document.getElementById("tresc").textContent = "Pytanie " + aktualnePytanie;
                pokazTresc = true;
                return;
        }
        if (!graRozpoczeta) return;

        if(event.key === "9"){
                aktywnaDruzyna = 1;
                document.getElementById("team1").classList.add("active");
                document.getElementById("team2").classList.remove("active");
        }
        if(event.key === "0"){
                aktywnaDruzyna = 2;
                document.getElementById("team2").classList.add("active");
                document.getElementById("team1").classList.remove("active");
        }
        if(event.key ==="x"){
                zle.play();
                pokazDuzyX();
                if(aktywnaDruzyna == 1){
                        bledy++;
                        document.getElementById("bledy1").textContent = `Błędy: ${bledy}`;
                }
                else{
                        bledy++;
                        document.getElementById("bledy2").textContent = `Błędy: ${bledy}`;
                }
                if(bledy == 3){
                        bledy = 0;
                }
        }

        if (event.key === "1" && !pytania[aktualnePytanie]["1"].wyswietlona) {
                wyswietlOdpowiedz("1");
                pytania[aktualnePytanie]["1"].wyswietlona = true;
        }
        if (event.key === "2" && !pytania[aktualnePytanie]["2"].wyswietlona) {
                wyswietlOdpowiedz("2");
                pytania[aktualnePytanie]["2"].wyswietlona = true;
        }
        if (event.key === "3" && !pytania[aktualnePytanie]["3"].wyswietlona) {
                wyswietlOdpowiedz("3");
                pytania[aktualnePytanie]["3"].wyswietlona = true;
        }
        if (event.key === "4" && !pytania[aktualnePytanie]["4"].wyswietlona) {
                wyswietlOdpowiedz("4");
                pytania[aktualnePytanie]["4"].wyswietlona = true;
        }
        if (event.key === "5" && !pytania[aktualnePytanie]["5"].wyswietlona) {
                wyswietlOdpowiedz("5");
                pytania[aktualnePytanie]["5"].wyswietlona = true;
        }
        if (event.key === "6" && !pytania[aktualnePytanie]["6"].wyswietlona) {
                wyswietlOdpowiedz("6");
                pytania[aktualnePytanie]["6"].wyswietlona = true;
        }
        if(event.key === "Enter"){
                koniecRundy();
        }
        if(event.key === "z"){
                zle.play();
                pokazDuzyX();
        }
        if((event.code === "Space" || event.key === " ") && typeof kolejnePytanie === "function") {
            miedzy.play();
            kolejnePytanie();
        }
        if (event.key.toLowerCase() === "k") {
// Pokaż wszystkie odpowiedzi bez dodawania punktów
for (let i = 1; i <= 6; i++) {
const odp = pytania[aktualnePytanie][i];
if (odp && !odp.wyswietlona) {
document.getElementById(`Odp${i}`).textContent = `${odp.odpowiedz} - ${odp.punkty}pkt`;
odp.wyswietlona = true;
}
}
}
});

// Dummy kolejnePytanie function to avoid errors if not defined
let pokazTresc = false; // zmienna pomocnicza

function kolejnePytanie() {
    let nextPytanie = (parseInt(aktualnePytanie) + 1).toString();
    if (!pytania[nextPytanie]) {
        alert("To było ostatnie pytanie!");
        return;
    }
    aktualnePytanie = nextPytanie;

    // Ustaw mnożnik w zależności od numeru pytania (np. 1x, 2x, 3x)
    if (parseInt(aktualnePytanie) >= 4) mnoznik = 2;
    else mnoznik = 1;

    // Najpierw tylko numer pytania
    document.getElementById("tresc").textContent = "Pytanie " + aktualnePytanie;
    pokazTresc = true; // pozwól na pokazanie treści po q

    // Ukryj/wyczyść wszystkie odpowiedzi (do 6)
    for (let i = 1; i <= 6; i++) {
        if (pytania[aktualnePytanie][i]) {
            document.getElementById(`Odp${i}`).textContent = "...............";
            pytania[aktualnePytanie][i].wyswietlona = false;
            document.getElementById(`Odp${i}`).style.display = "";
        } else {
            document.getElementById(`Odp${i}`).style.display = "none";
        }
    }

    bledy = 0;
    document.getElementById("bledy1").textContent = `Błędy: 0`;
    document.getElementById("bledy2").textContent = `Błędy: 0`;
    punkty_runda = 0;
    document.getElementById("punkty_runda").textContent = `Punkty rundy: 0`;
    aktywnaDruzyna = 0;
    document.getElementById("team1").classList.remove("active");
    document.getElementById("team2").classList.remove("active");
}

// Po naciśnięciu q pokaż treść pytania
document.addEventListener("keydown", function (event) {
    if (event.key.toLowerCase() === "q" && pokazTresc) {
        document.getElementById("tresc").textContent = pytania[aktualnePytanie].Pytanie;
        pokazTresc = false; // już pokazano treść
    }
});

function pokazDuzyX() {
    // Jeśli już istnieje, nie dodawaj kolejnego
    if (document.getElementById("duzyX")) return;

    const xDiv = document.createElement("div");
    xDiv.id = "duzyX";
    xDiv.textContent = "X";
    Object.assign(xDiv.style, {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "20vw",
        color: "red",
        fontWeight: "bold",
        zIndex: 2000,
        textShadow: "0 0 40px #fff700, 0 0 80px #fff700"
    });
    document.body.appendChild(xDiv);

    setTimeout(() => {
        xDiv.remove();
    }, 1000);
}