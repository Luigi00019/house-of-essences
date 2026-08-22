/* =====================================================
   HOUSE OF ESSENCES
   ARCHIVE II
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

   NOTA: chiave diversa da Archivio I,
   così i due archivi restano indipendenti
   e non si sovrascrivono a vicenda.
===================================================== */

const STORAGE_KEY = "house_of_essences_progress_archive_02";

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
        l'Archivio II resterà sbloccato.
    */

    saveProgress("archive-02-unlocked");

    errorMessage.textContent = "";

    showScreen(unlockScreen);

    /*
        Dopo l'animazione mostriamo
        il secondo frammento.
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
        Le sei parole "segno" non sono
        la risposta finale: sono indizi,
        non la chiave.
    */

    const clues = [
        "GATTA",
        "COCCOLA",
        "TENEREZZA",
        "DELICATEZZA",
        "FIORE",
        "CURA"
    ];

    if (clues.includes(value)) {

        errorMessage.textContent =
            "Questo è un segno, non il nome che li contiene tutti.";

        return;

    }


    /*
        Seconda essenza.
    */

    if (value === "GENTILEZZA") {

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
        Se il Giorno 2 è già stato completato,
        saltiamo completamente la serratura.
    */

    if (progress === "archive-02-unlocked") {

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
