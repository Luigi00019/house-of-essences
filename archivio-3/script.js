/* =====================================================
   HOUSE OF ESSENCES
   ARCHIVE III
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

   Chiave indipendente da Archivio I e II.
===================================================== */

const STORAGE_KEY = "house_of_essences_progress_archive_03";

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

    saveProgress("archive-03-unlocked");

    errorMessage.textContent = "";

    showScreen(unlockScreen);

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
        Le sei parole della Tela sono indizi,
        non la risposta finale.
    */

    const clues = [
        "FIORE",
        "MANO",
        "COLORE",
        "FANTASIA",
        "PENNELLO",
        "STELO"
    ];

    if (clues.includes(value)) {

        errorMessage.textContent =
            "Questo è un frammento della tela, non ciò che hai creato.";

        return;

    }


    /*
        Terza essenza.
    */

    if (value === "CREATIVITA") {

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


    if (progress === "archive-03-unlocked") {

        showScreen(fragmentScreen);

        return;

    }


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
