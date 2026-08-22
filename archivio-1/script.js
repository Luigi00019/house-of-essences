/* =====================================================
   HOUSE OF ESSENCES
   ARCHIVE I
===================================================== */

const lockedScreen =
    document.getElementById("lockedScreen");

const unlockScreen =
    document.getElementById("unlockScreen");

const fragmentScreen =
    document.getElementById("fragmentScreen");

const input =
    document.getElementById("essenceInput");

const enterButton =
    document.getElementById("enterButton");

const errorMessage =
    document.getElementById("errorMessage");


/* =====================================================
   STORAGE
===================================================== */

const STORAGE_KEY = "house_of_essences_progress";

function getProgress() {

    return localStorage.getItem(STORAGE_KEY);

}

function saveProgress(value) {

    localStorage.setItem(STORAGE_KEY, value);

}


/* =====================================================
   NORMALIZE INPUT
===================================================== */

function normalize(value) {

    return value
        .trim()
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* =====================================================
   SHOW SCREEN
===================================================== */

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(element => {

            element.classList.remove("active");

        });

    setTimeout(() => {

        screen.classList.add("active");

    }, 50);

}


/* =====================================================
   WRONG ANSWER
===================================================== */

function wrongAnswer() {

    errorMessage.textContent =
        "La porta non riconosce questa essenza.";

}


/* =====================================================
   UNLOCK ARCHIVE
===================================================== */

function unlockArchive() {

    /*
        Salviamo immediatamente il progresso.

        Da questo momento in poi,
        anche chiudendo il browser,
        l'Archivio I resterà sbloccato.
    */

    saveProgress("archive-01-unlocked");

    errorMessage.textContent = "";

    showScreen(unlockScreen);

    /*
        Dopo l'animazione mostriamo
        il primo frammento.
    */

    setTimeout(() => {

        showScreen(fragmentScreen);

    }, 4500);

}


/* =====================================================
   CHECK ESSENCE
===================================================== */

function checkEssence() {

    const value =
        normalize(input.value);


    /*
        Il nome della persona
        NON è la risposta.
    */

    if (value === "MELANIA") {

        errorMessage.textContent =
            "Il nome è conosciuto. Cerca ciò che si trova dietro di esso.";

        return;

    }


    /*
        Prima essenza.
    */

    if (value === "CURIOSITA") {

        unlockArchive();

        return;

    }


    wrongAnswer();

}


/* =====================================================
   LOAD SAVED PROGRESS
===================================================== */

function loadProgress() {

    const progress =
        getProgress();


    /*
        Se il Giorno 1 è già stato completato,
        saltiamo completamente la serratura.
    */

    if (progress === "archive-01-unlocked") {

        showScreen(fragmentScreen);

        return;

    }


    /*
        Prima visita.
    */

    showScreen(lockedScreen);

    setTimeout(() => {

        input.focus();

    }, 200);

}


/* =====================================================
   EVENTS
===================================================== */

enterButton.addEventListener(
    "click",
    checkEssence
);


input.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            checkEssence();

        }

    }
);


/* =====================================================
   START
===================================================== */

loadProgress();
