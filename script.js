const presentToggle = document.querySelector("#open-present");
const birthdayCard = document.querySelector(".birthday-card");
const replayButton = document.querySelector(".replay-button");
const birthdayScene = document.querySelector(".birthday-scene");
const hiddenStars = [...document.querySelectorAll(".hidden-star")];
const starHuntStatus = document.querySelector(".star-hunt-status");
const starSecretNote = document.querySelector(".star-secret-note");
const starSecretClose = document.querySelector(".star-secret-close");
const pinataSurprise = document.querySelector(".pinata-surprise");
const pinataButton = document.querySelector(".pinata-button");
const pinataCandy = document.querySelector(".pinata-candy");
const pinataStatus = document.querySelector(".pinata-status");
const birthdayTitle = birthdayScene.querySelector("h1");
const surpriseTrigger = document.querySelector(".surprise-trigger");
const pagePuzzle = document.querySelector(".page-puzzle");
const puzzleSlots = [...document.querySelectorAll(".page-puzzle-slot")];
const puzzlePieces = [...document.querySelectorAll(".page-puzzle-piece")];
const puzzlePieceTray = document.querySelector(".page-puzzle-pieces");
const puzzlePieceOrder = [...puzzlePieces];
const puzzleStatus = document.querySelector(".page-puzzle-status");
const puzzleComplete = document.querySelector(".page-puzzle-complete");
const puzzleReturnButton = document.querySelector(".page-puzzle-return");
const birthdayCake = document.querySelector(".birthday-cake");
const cakeStatus = document.querySelector(".cake-status");
const candleSecret = document.querySelector("#candle-secret");
const candleOrderSecret = document.querySelector(".candle-order-secret");
const hiddenBirthdayBadge = document.querySelector(".hidden-birthday-badge");
const birthdayBadgeNote = document.querySelector(".birthday-badge-note");
const birthdayBadgeClose = document.querySelector(".birthday-badge-close");
const candleCelebration = document.querySelector(".candle-celebration");
const pawPrints = [...document.querySelectorAll(".paw-print")];
const pawSecret = document.querySelector(".paw-secret");
const wishForm = document.querySelector(".wish-form");
const wishInput = document.querySelector("#birthday-wish");
const wishStatus = document.querySelector(".wish-status");
const wishNameReveal = document.querySelector(".wish-kyoko-reveal");
const wishStar = document.querySelector(".wish-star");
const wishStarText = document.querySelector(".wish-star-text");
const wishReveal = document.querySelector(".wish-reveal");
const wishStarStorm = document.querySelector(".wish-star-storm");
const wishFallingStars = document.querySelector(".wish-falling-stars");
const wishPartyCelebration = document.querySelector(".wish-party-celebration");
const wishPartyConfetti = document.querySelector(".wish-party-confetti");
const constellation = document.querySelector(".birthday-constellation");
const constellationStars = [...document.querySelectorAll(".constellation-star")];
const constellationStatus = document.querySelector(".constellation-status");
const constellationMessage = document.querySelector(".constellation-message");
const memoryPhoto = document.querySelector(".memory-photo");
const memoryRevealButton = document.querySelector(".memory-reveal-button");
const memoryLightFlash = document.querySelector(".memory-light-flash");
const memorySecretMessage = document.querySelector(".memory-secret-message");
const musicButton = document.querySelector(".music-button");
const soundButton = document.querySelector(".sound-button");
const audioStatus = document.querySelector(".audio-status");
const secretCat = document.querySelector(".cat-secret");
const secretCatMessage = document.querySelector("#cat-secret-message");
const catRainTrigger = document.querySelector(".cat-rain-trigger");
const catRain = document.querySelector(".cat-rain");
const hamTrigger = document.querySelector(".ham-trigger");
const hamsterPop = document.querySelector(".hamster-pop");
const dancePartyMessage = document.querySelector(".dance-party-message");
const hiddenHamster = document.querySelector(".hidden-hamster");
let wishRevealTimer;
let wishStarStormTimer;
let wishPartyTimer;
let hamsterPopTimer;
let hamsterPartyTimer;
let candleCelebrationTimer;
let pawSecretTimer;
let titleDanceTimer;
let birthdayTitleTapCount = 0;
let surpriseTapCount = 0;
let hamTapCount = 0;
let replayTapCount = 0;
let pinataTapCount = 0;
let pinataSurpriseTimer;
let selectedPuzzlePiece = null;
let puzzlePointerDrag = null;
let suppressPuzzleClickUntil = 0;
let candleSequencePosition = 0;
let candleSequenceComplete = false;
let candleBeatPosition = 0;
let candleBeatLastTap = 0;
let candleBeatComplete = false;
let memoryPhotoTapCount = 0;
let wishPaletteIndex = 0;
let wishSubmitCount = 0;
let memoryLightPaletteIndex = 0;
let constellationStep = 0;
const rainbowWishColors = new Map();
const nonColorKeywords = new Set(["currentcolor", "transparent", "inherit", "initial", "unset", "revert", "revert-layer"]);
const memoryLightColors = ["#ff63c3", "#47eaff", "#ffe34a", "#9b6bff", "#64ff9b", "#ff784f"];
const wishFireworkPalettes = [
    ["#fff2a8", "#ff7cab", "#7ef1d2", "#bda0ff", "#ffd166"],
    ["#a8f7ff", "#5ee7ff", "#63a7ff", "#d4a5ff", "#ffffff"],
    ["#ffb3c6", "#ff5d8f", "#ff9f68", "#ffe66d", "#fff4d6"],
    ["#b8ffb0", "#5dffb7", "#47d7c5", "#e2ff8f", "#ffffff"],
    ["#e0b3ff", "#b28dff", "#ff9de2", "#8ee7ff", "#fff0a6"],
    ["#ffc857", "#ff7b54", "#ff4d6d", "#f7aef8", "#fff3b0"]
];

surpriseTrigger.addEventListener("click", () => {
    surpriseTapCount += 1;
    if (surpriseTapCount === 3) {
        surpriseTapCount = 0;
        startPagePuzzle();
    }
});

function resetConstellation() {
    constellationStep = 0;
    constellation.classList.remove("is-complete");
    constellationMessage.hidden = true;
    constellationStars.forEach((star) => {
        star.hidden = false;
        star.classList.remove("is-found");
    });
}

constellationStars.forEach((star, index) => {
    star.addEventListener("click", () => {
        if (index !== constellationStep) {
            resetConstellation();
            constellationStatus.textContent = "Start again with the leftmost star.";
            return;
        }

        star.hidden = true;
        star.classList.add("is-found");
        constellationStep += 1;
        if (constellationStep === constellationStars.length) {
            constellation.classList.add("is-complete");
            constellationMessage.hidden = false;
            constellationStatus.textContent = "You connected all five stars and revealed the birthday constellation.";
            return;
        }

        constellationStatus.textContent = `Star ${constellationStep} of ${constellationStars.length} connected. Keep moving from left to right.`;
    });
});

hiddenStars.forEach((star) => {
    star.addEventListener("click", () => {
        star.hidden = true;
        const foundStars = hiddenStars.filter((candidate) => candidate.hidden).length;
        if (foundStars === hiddenStars.length) {
            starHuntStatus.textContent = "You found all three tiny stars. A birthday message is open.";
            starSecretNote.hidden = false;
            starSecretClose.focus();
            return;
        }

        starHuntStatus.textContent = `You found ${foundStars} of ${hiddenStars.length} tiny stars.`;
    });
});

hiddenBirthdayBadge.addEventListener("click", () => {
    hiddenBirthdayBadge.hidden = true;
    birthdayBadgeNote.hidden = false;
    birthdayBadgeClose.focus();
});

birthdayBadgeClose.addEventListener("click", () => {
    birthdayBadgeNote.hidden = true;
    birthdayCake.focus();
});

starSecretClose.addEventListener("click", () => {
    starSecretNote.hidden = true;
    hamTrigger.focus();
});

function resetPagePuzzle() {
    puzzlePointerDrag?.ghost?.remove();
    puzzlePointerDrag?.piece.classList.remove("is-dragging");
    puzzlePointerDrag = null;
    puzzleSlots.forEach((slot, index) => {
        slot.classList.remove("is-selected-target");
        slot.classList.remove("has-piece");
        slot.classList.remove("is-wrong", "is-correct");
        slot.querySelector(".page-puzzle-piece")?.remove();
        slot.setAttribute("aria-label", `Puzzle spot ${index + 1}: ${["decorations", "greeting", "present", "cake", "wish", "memory"][index]}`);
    });
    puzzlePieceOrder.forEach((piece) => {
        puzzlePieceTray.append(piece);
        piece.classList.remove("is-selected");
        piece.setAttribute("aria-pressed", "false");
    });
    selectedPuzzlePiece = null;
    puzzleComplete.hidden = true;
    puzzleStatus.textContent = "Choose a piece and put the birthday sections back in order.";
}

function startPagePuzzle() {
    resetPagePuzzle();
    const shuffledPieces = [...puzzlePieces];
    for (let index = shuffledPieces.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffledPieces[index], shuffledPieces[swapIndex]] = [shuffledPieces[swapIndex], shuffledPieces[index]];
    }
    if (shuffledPieces.every((piece, index) => Number(piece.dataset.piece) === index)) {
        shuffledPieces.push(shuffledPieces.shift());
    }
    shuffledPieces.forEach((piece) => puzzlePieceTray.append(piece));
    pagePuzzle.hidden = false;
    birthdayScene.classList.add("is-puzzling");
    document.documentElement.classList.add("page-puzzle-mode");
    document.body.classList.add("page-puzzle-mode");
    puzzlePieces[0].focus();
}

function selectPuzzlePiece(piece) {
    if (piece?.hidden) {
        return;
    }
    selectedPuzzlePiece?.classList.remove("is-selected");
    selectedPuzzlePiece?.setAttribute("aria-pressed", "false");
    selectedPuzzlePiece = selectedPuzzlePiece === piece ? null : piece;
    selectedPuzzlePiece?.classList.add("is-selected");
    selectedPuzzlePiece?.setAttribute("aria-pressed", "true");
    puzzleSlots.forEach((slot) => slot.classList.toggle("is-selected-target", Boolean(selectedPuzzlePiece)));
    puzzleStatus.textContent = selectedPuzzlePiece
        ? `Now choose any spot for ${selectedPuzzlePiece.querySelector("span:last-child").textContent}.`
        : "Choose a piece and put the birthday sections back in order.";
}

function updatePuzzleProgress() {
    let correctCount = 0;
    puzzleSlots.forEach((slot, index) => {
        const piece = slot.querySelector(".page-puzzle-piece");
        slot.classList.toggle("has-piece", Boolean(piece));
        slot.classList.remove("is-wrong", "is-correct");
        if (!piece) {
            slot.setAttribute("aria-label", `Puzzle spot ${index + 1}`);
            return;
        }

        const label = piece.querySelector("span:last-child").textContent;
        const isCorrect = Number(piece.dataset.piece) === Number(slot.dataset.slot);
        slot.classList.add(isCorrect ? "is-correct" : "is-wrong");
        slot.setAttribute("aria-label", `Puzzle spot ${index + 1}: ${label}, ${isCorrect ? "correct" : "not correct"}`);
        if (isCorrect) {
            correctCount += 1;
        }
    });

    if (correctCount === puzzleSlots.length) {
        puzzleStatus.textContent = "All the pieces are back in place!";
        puzzleComplete.hidden = false;
        puzzleReturnButton.focus();
        return;
    }

    puzzleComplete.hidden = true;
    puzzleStatus.textContent = `${correctCount} of ${puzzleSlots.length} pieces in the right place. Keep moving pieces until they all turn green!`;
}

function placePuzzlePiece(piece, slot) {
    if (!piece || !slot || piece.hidden) {
        return;
    }

    const origin = piece.parentElement;
    if (origin === slot) {
        selectPuzzlePiece(null);
        return;
    }

    const pieceInTarget = slot.querySelector(".page-puzzle-piece");
    if (pieceInTarget) {
        origin.append(pieceInTarget);
    }
    slot.append(piece);
    piece.classList.remove("is-selected");
    piece.setAttribute("aria-pressed", "false");
    selectedPuzzlePiece?.classList.remove("is-selected");
    selectedPuzzlePiece?.setAttribute("aria-pressed", "false");
    selectedPuzzlePiece = null;
    puzzleSlots.forEach((item) => item.classList.remove("is-selected-target"));
    updatePuzzleProgress();
}

function returnPuzzlePieceToTray(piece) {
    puzzlePieceTray.append(piece);
    piece.classList.remove("is-selected");
    piece.setAttribute("aria-pressed", "false");
    selectedPuzzlePiece?.classList.remove("is-selected");
    selectedPuzzlePiece?.setAttribute("aria-pressed", "false");
    selectedPuzzlePiece = null;
    puzzleSlots.forEach((slot) => slot.classList.remove("is-selected-target"));
    updatePuzzleProgress();
}

puzzlePieces.forEach((piece) => {
    piece.addEventListener("click", (event) => {
        event.stopPropagation();
        if (performance.now() < suppressPuzzleClickUntil) {
            event.preventDefault();
            return;
        }
        if (selectedPuzzlePiece === piece) {
            selectPuzzlePiece(null);
        } else {
            selectPuzzlePiece(piece);
        }
    });
    piece.addEventListener("pointerdown", (event) => {
        if (!event.isPrimary || event.button !== 0) {
            return;
        }
        puzzlePointerDrag = {
            piece,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            moved: false,
            ghost: null
        };
    });
});

document.addEventListener("pointermove", (event) => {
    if (!puzzlePointerDrag || event.pointerId !== puzzlePointerDrag.pointerId) {
        return;
    }

    const distance = Math.hypot(event.clientX - puzzlePointerDrag.startX, event.clientY - puzzlePointerDrag.startY);
    if (!puzzlePointerDrag.moved && distance < 6) {
        return;
    }

    puzzlePointerDrag.moved = true;
    puzzlePointerDrag.piece.classList.add("is-dragging");
    if (!puzzlePointerDrag.ghost) {
        const ghost = puzzlePointerDrag.piece.cloneNode(true);
        ghost.classList.add("page-puzzle-drag-ghost");
        ghost.setAttribute("aria-hidden", "true");
        ghost.removeAttribute("aria-pressed");
        ghost.tabIndex = -1;
        ghost.style.width = `${puzzlePointerDrag.piece.getBoundingClientRect().width}px`;
        document.body.append(ghost);
        puzzlePointerDrag.ghost = ghost;
    }
    puzzlePointerDrag.ghost.style.left = `${event.clientX}px`;
    puzzlePointerDrag.ghost.style.top = `${event.clientY}px`;
    event.preventDefault();
});

document.addEventListener("pointerup", (event) => {
    if (!puzzlePointerDrag || event.pointerId !== puzzlePointerDrag.pointerId) {
        return;
    }

    const drag = puzzlePointerDrag;
    puzzlePointerDrag = null;
    drag.ghost?.remove();
    drag.piece.classList.remove("is-dragging");
    if (!drag.moved) {
        return;
    }

    suppressPuzzleClickUntil = performance.now() + 200;
    const dropTarget = document.elementFromPoint(event.clientX, event.clientY);
    const targetSlot = dropTarget?.closest(".page-puzzle-slot");
    const targetTray = dropTarget?.closest(".page-puzzle-pieces");
    if (targetSlot) {
        placePuzzlePiece(drag.piece, targetSlot);
    } else if (targetTray) {
        returnPuzzlePieceToTray(drag.piece);
    }
});

document.addEventListener("pointercancel", () => {
    puzzlePointerDrag?.ghost?.remove();
    puzzlePointerDrag?.piece.classList.remove("is-dragging");
    puzzlePointerDrag = null;
});

puzzleSlots.forEach((slot) => {
    slot.addEventListener("click", () => {
        if (selectedPuzzlePiece) {
            placePuzzlePiece(selectedPuzzlePiece, slot);
        }
    });
    slot.addEventListener("keydown", (event) => {
        if (selectedPuzzlePiece && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            placePuzzlePiece(selectedPuzzlePiece, slot);
        }
    });
});

puzzleReturnButton.addEventListener("click", () => {
    pagePuzzle.hidden = true;
    birthdayScene.classList.remove("is-puzzling");
    document.documentElement.classList.remove("page-puzzle-mode");
    document.body.classList.remove("page-puzzle-mode");
    surpriseTapCount = 0;
    resetPagePuzzle();
    surpriseTrigger.focus();
});

presentToggle.addEventListener("change", (event) => {
    birthdayCard.disabled = !presentToggle.checked;
    if (presentToggle.checked && event.isTrusted) {
        playPresentSound();
    } else if (!presentToggle.checked) {
        birthdayCard.classList.remove("is-open");
        birthdayCard.setAttribute("aria-expanded", "false");
        birthdayCard.setAttribute("aria-label", "Open birthday card");
    }
});

birthdayCard.addEventListener("click", () => {
    const isOpen = birthdayCard.classList.toggle("is-open");
    birthdayCard.setAttribute("aria-expanded", String(isOpen));
    birthdayCard.setAttribute(
        "aria-label",
        isOpen
            ? "Birthday card message: Happy Birthday! I hope you like this birthday code. Have a great birthday and wishing you well."
            : "Open birthday card"
    );
});

secretCat.addEventListener("click", () => {
    const isRevealed = secretCat.getAttribute("aria-expanded") !== "true";
    secretCat.setAttribute("aria-expanded", String(isRevealed));
    secretCatMessage.setAttribute("aria-hidden", String(!isRevealed));
    secretCatMessage.hidden = !isRevealed;
    secretCat.classList.toggle("is-revealed", isRevealed);
});

function startCatRain() {
    const catFaces = ["🐈", "🐱", "😺", "😸", "😻", "🐈‍⬛", "😽"];
    const totalCats = 120;

    catRain.replaceChildren(
        ...Array.from({ length: totalCats }, (_, index) => {
            const cat = document.createElement("span");
            cat.className = "falling-cat";
            cat.textContent = catFaces[index % catFaces.length];
            cat.style.setProperty("--cat-x", `${(index * 37) % 98 + 1}%`);
            cat.style.setProperty("--cat-size", `${1.7 + (index % 5) * 0.18}rem`);
            cat.style.setProperty("--cat-duration", `${4.4 + (index % 7) * 0.28}s`);
            cat.style.setProperty("--cat-delay", `${(index % 48) * 30}ms`);
            cat.style.setProperty("--cat-drift", `${(index * 29) % 121 - 60}px`);
            return cat;
        })
    );
    catRain.classList.remove("is-raining");
    void catRain.offsetWidth;
    catRain.classList.add("is-raining");
}

catRainTrigger.addEventListener("click", startCatRain);

hamTrigger.addEventListener("click", () => {
    showHamsterPop();
    hamTapCount += 1;
    if (hamTapCount === 5) {
        hamTapCount = 0;
        startHamsterDanceParty();
    }
});

function startHamsterDanceParty() {
    birthdayScene.classList.add("is-dance-party");
    dancePartyMessage.hidden = false;
    showHamsterPop();
    const hamBounds = hamTrigger.getBoundingClientRect();
    playCandleCelebration({
        x: hamBounds.left + hamBounds.width / 2,
        y: hamBounds.top + hamBounds.height / 2
    });
    window.clearTimeout(hamsterPartyTimer);
    hamsterPartyTimer = window.setTimeout(() => {
        birthdayScene.classList.remove("is-dance-party");
        dancePartyMessage.hidden = true;
    }, 4200);
}

function showHamsterPop() {
    hamsterPop.classList.remove("is-visible");
    window.clearTimeout(hamsterPopTimer);
    void hamsterPop.offsetWidth;
    hamsterPop.classList.add("is-visible");
    hamsterPopTimer = window.setTimeout(() => {
        hamsterPop.classList.remove("is-visible");
    }, 1800);
}

hiddenHamster.addEventListener("click", () => {
    hiddenHamster.classList.add("is-found");
    hiddenHamster.textContent = "🐾";
    hiddenHamster.setAttribute("aria-label", "You found the hidden hamster");
    showHamsterPop();
});

birthdayTitle.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
        return;
    }

    triggerTitleDance();
});

birthdayTitle.addEventListener("keydown", (event) => {
    if (event.target !== birthdayTitle || (event.key !== "Enter" && event.key !== " ")) {
        return;
    }

    event.preventDefault();
    triggerTitleDance();
});

function triggerTitleDance() {
    birthdayTitleTapCount += 1;
    if (birthdayTitleTapCount < 5) {
        return;
    }

    birthdayTitleTapCount = 0;
    birthdayTitle.classList.remove("is-dancing");
    window.clearTimeout(titleDanceTimer);
    void birthdayTitle.offsetWidth;
    birthdayTitle.classList.add("is-dancing");
    titleDanceTimer = window.setTimeout(() => {
        birthdayTitle.classList.remove("is-dancing");
    }, 1800);
}

function startPinataSurprise() {
    pinataTapCount = 0;
    pinataButton.disabled = false;
    pinataButton.classList.remove("is-hit");
    pinataButton.setAttribute("aria-label", "Piñata, 20 taps remaining");
    pinataCandy.replaceChildren();
    pinataStatus.textContent = "Tap the piñata 20 times to break it.";
    pinataSurprise.classList.remove("is-broken");
    pinataSurprise.hidden = false;
    document.documentElement.classList.add("pinata-mode");
    document.body.classList.add("pinata-mode");
    birthdayScene.inert = true;
    pinataButton.focus();
}

function finishPinataSurprise() {
    window.clearTimeout(pinataSurpriseTimer);
    pinataSurpriseTimer = undefined;
    pinataSurprise.hidden = true;
    pinataSurprise.classList.remove("is-broken");
    document.documentElement.classList.remove("pinata-mode");
    document.body.classList.remove("pinata-mode");
    birthdayScene.inert = false;
    pinataButton.disabled = false;
    pinataButton.removeAttribute("aria-hidden");
    pinataButton.classList.remove("is-hit");
    pinataCandy.replaceChildren();
    pinataStatus.textContent = "";
    pinataTapCount = 0;
    replayTapCount = 0;
    replayButton.focus();
}

function breakPinata() {
    pinataButton.disabled = true;
    pinataButton.setAttribute("aria-hidden", "true");
    pinataSurprise.classList.add("is-broken");
    pinataStatus.textContent = "The piñata broke! Candy is falling.";

    const candyTypes = ["🍬", "🍭", "🍫", "🍬", "🍡", "🍭"];
    const candies = Array.from({ length: 40 }, (_, index) => {
        const candy = document.createElement("span");
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight * (0.08 + Math.random() * 0.82);
        candy.className = "pinata-candy-piece";
        candy.textContent = candyTypes[index % candyTypes.length];
        candy.style.setProperty("--candy-x-offset", `${x - window.innerWidth / 2}px`);
        candy.style.setProperty("--candy-y-offset", `${y - window.innerHeight * 0.45}px`);
        candy.style.setProperty("--candy-delay", `${Math.random() * 0.45}s`);
        candy.style.setProperty("--candy-size", `${1.2 + Math.random() * 1.4}rem`);
        candy.style.setProperty("--candy-rotation", `${Math.random() * 720 - 360}deg`);
        return candy;
    });

    pinataCandy.replaceChildren(...candies);
    pinataSurpriseTimer = window.setTimeout(finishPinataSurprise, 12_000);
}

pinataButton.addEventListener("click", () => {
    if (pinataButton.disabled) {
        return;
    }

    pinataTapCount += 1;
    const tapsRemaining = 20 - pinataTapCount;
    pinataButton.setAttribute(
        "aria-label",
        `Piñata, ${tapsRemaining} ${tapsRemaining === 1 ? "tap" : "taps"} remaining`
    );
    pinataButton.classList.remove("is-hit");
    void pinataButton.offsetWidth;
    pinataButton.classList.add("is-hit");

    if (pinataTapCount === 20) {
        breakPinata();
    }
});

pawPrints.forEach((pawPrint, index) => {
    pawPrint.addEventListener("click", () => {
        if (pawPrint.classList.contains("is-found")) {
            return;
        }

        pawPrint.classList.add("is-found");
        pawPrint.setAttribute("aria-label", `Paw print ${index + 1} of 3 found`);
        if (!pawPrints.every((paw) => paw.classList.contains("is-found"))) {
            return;
        }

        pawSecret.hidden = false;
        window.clearTimeout(pawSecretTimer);
        pawSecretTimer = window.setTimeout(() => {
            pawSecret.hidden = true;
        }, 4500);
        playCandleCelebration({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    });
});

replayButton.addEventListener("click", () => {
    replayTapCount += 1;
    playPresentSound();
    wishSubmitCount = 0;
    rainbowWishColors.clear();
    window.clearTimeout(wishPartyTimer);
    wishPartyCelebration.hidden = true;
    wishPartyCelebration.classList.remove("is-celebrating");
    wishPartyConfetti.replaceChildren();
    resetWishStarRain();
    wishNameReveal.hidden = true;
    wishNameReveal.classList.remove("is-visible");
    memoryPhoto.hidden = true;
    memoryRevealButton.hidden = false;
    memoryRevealButton.setAttribute("aria-expanded", "false");
    memoryPhotoTapCount = 0;
    memoryPhoto.setAttribute("aria-label", "Tap the birthday photo to see a colorful light");
    memorySecretMessage.hidden = true;
    memorySecretMessage.classList.remove("is-visible");
    birthdayCake.classList.remove("is-blown");
    birthdayCake.setAttribute("aria-pressed", "false");
    birthdayCake.setAttribute("aria-label", "Blow out the birthday candles");
    cakeStatus.textContent = "Tap the cake to blow out the candles!";
    candleSecret.hidden = true;
    candleOrderSecret.hidden = true;
    candleSequencePosition = 0;
    candleSequenceComplete = false;
    candleBeatPosition = 0;
    candleBeatLastTap = 0;
    candleBeatComplete = false;
    birthdayCake.querySelectorAll(".cake-candle").forEach((candle) => candle.classList.remove("is-sequence-lit"));
    hiddenBirthdayBadge.hidden = false;
    birthdayBadgeNote.hidden = true;
    birthdayScene.classList.remove("is-cake-spotlight");
    document.documentElement.classList.remove("cake-spotlight-mode");
    document.body.classList.remove("cake-spotlight-mode");
    window.clearTimeout(candleCelebrationTimer);
    candleCelebration.classList.remove("is-celebrating");
    candleCelebration.replaceChildren();
    pawPrints.forEach((paw, index) => {
        paw.classList.remove("is-found");
        paw.setAttribute("aria-label", `Find paw print ${index + 1} of 3`);
    });
    pawSecret.hidden = true;
    window.clearTimeout(pawSecretTimer);
    hiddenHamster.classList.remove("is-found");
    hiddenHamster.textContent = "🐹";
    hiddenHamster.setAttribute("aria-label", "Find the hidden hamster");
    hamsterPop.classList.remove("is-visible");
    window.clearTimeout(hamsterPopTimer);
    birthdayTitleTapCount = 0;
    birthdayTitle.classList.remove("is-dancing");
    window.clearTimeout(titleDanceTimer);
    presentToggle.checked = false;
    presentToggle.dispatchEvent(new Event("change"));

    secretCat.setAttribute("aria-expanded", "false");
    secretCatMessage.setAttribute("aria-hidden", "true");
    secretCatMessage.hidden = true;
    secretCat.classList.remove("is-revealed");
    catRain.classList.remove("is-raining");

    requestAnimationFrame(() => {
        presentToggle.checked = true;
        presentToggle.dispatchEvent(new Event("change"));
    });

    if (replayTapCount === 10) {
        startPinataSurprise();
    }
});

function resetWishStarRain() {
    window.clearTimeout(wishStarStormTimer);
    wishStarStorm.classList.remove("is-raining");
    wishStarStorm.hidden = true;
    wishFallingStars.replaceChildren();
}

function startRainbowParty() {
    const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93", "#f15bb5"];
    const confetti = Array.from({ length: 60 }, (_, index) => {
        const piece = document.createElement("span");
        piece.style.setProperty("--party-x", `${Math.random() * 100}%`);
        piece.style.setProperty("--party-color", colors[index % colors.length]);
        piece.style.setProperty("--party-delay", `${Math.random() * 0.8}s`);
        piece.style.setProperty("--party-drift", `${Math.random() * 160 - 80}px`);
        piece.style.setProperty("--party-rotation", `${Math.random() * 720 - 360}deg`);
        return piece;
    });

    window.clearTimeout(wishPartyTimer);
    wishPartyConfetti.replaceChildren(...confetti);
    wishPartyCelebration.hidden = false;
    wishPartyCelebration.classList.remove("is-celebrating");
    void wishPartyCelebration.offsetWidth;
    wishPartyCelebration.classList.add("is-celebrating");
    wishPartyTimer = window.setTimeout(() => {
        wishPartyCelebration.hidden = true;
        wishPartyCelebration.classList.remove("is-celebrating");
        wishPartyConfetti.replaceChildren();
    }, 6500);
}

function startWishStarRain() {
    resetWishStarRain();
    const stars = Array.from({ length: 42 }, (_, index) => {
        const star = document.createElement("span");
        star.className = "wish-falling-star";
        star.textContent = index % 4 === 0 ? "✦" : "★";
        star.style.setProperty("--star-x", `${(index * 47 + Math.random() * 18) % 100}%`);
        star.style.setProperty("--star-delay", `${Math.random() * 1.8}s`);
        star.style.setProperty("--star-duration", `${2.8 + Math.random() * 1.5}s`);
        star.style.setProperty("--star-drift", `${Math.random() * 100 - 50}px`);
        star.style.setProperty("--star-size", `${0.65 + Math.random() * 0.85}rem`);
        return star;
    });

    wishFallingStars.replaceChildren(...stars);
    wishStarStorm.hidden = false;
    void wishStarStorm.offsetWidth;
    wishStarStorm.classList.add("is-raining");
    wishStarStormTimer = window.setTimeout(() => {
        resetWishStarRain();
        wishStatus.textContent = "The star shower has passed. Send five more wishes for another!";
    }, 7200);
}

function flashMemoryLight() {
    const color = memoryLightColors[memoryLightPaletteIndex % memoryLightColors.length];
    memoryLightPaletteIndex += 1;
    memoryLightFlash.style.setProperty("--memory-light", color);
    memoryLightFlash.classList.remove("is-flashing");
    void memoryLightFlash.offsetWidth;
    memoryLightFlash.classList.add("is-flashing");
}

function handleMemoryPhotoTap() {
    flashMemoryLight();
    if (memorySecretMessage.hidden) {
        memoryPhotoTapCount += 1;
        if (memoryPhotoTapCount >= 3) {
            memorySecretMessage.hidden = false;
            memorySecretMessage.classList.add("is-visible");
            memoryPhoto.setAttribute("aria-label", "Secret revealed: Best birthday ever!");
        }
    }
}

memoryRevealButton.addEventListener("click", () => {
    memoryPhoto.hidden = false;
    memoryRevealButton.hidden = true;
    memoryRevealButton.setAttribute("aria-expanded", "true");
    memoryPhotoTapCount = 0;
    memorySecretMessage.hidden = true;
    memorySecretMessage.classList.remove("is-visible");
    memoryPhoto.setAttribute("aria-label", "Tap the birthday photo to see a colorful light");
    flashMemoryLight();
});

memoryPhoto.addEventListener("click", handleMemoryPhotoTap);
memoryPhoto.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleMemoryPhotoTap();
    }
});

function enterCakeSpotlight() {
    birthdayScene.classList.add("is-cake-spotlight");
    document.documentElement.classList.add("cake-spotlight-mode");
    document.body.classList.add("cake-spotlight-mode");
    birthdayCake.classList.remove("is-blown");
    birthdayCake.setAttribute("aria-pressed", "false");
    birthdayCake.setAttribute("aria-label", "Tap a candle to blow it out");
    cakeStatus.textContent = "The lights are out! Tap a candle to blow it out.";
    candleSecret.hidden = true;
}

function playCandleCelebration(origin) {
    const palette = ["#fff2a8", "#ff7cab", "#7ef1d2", "#bda0ff", "#ffd166", "#ffffff"];
    const cakeBounds = birthdayCake.getBoundingClientRect();
    const centerX = origin?.x ?? cakeBounds.left + cakeBounds.width / 2;
    const centerY = origin?.y ?? cakeBounds.top + cakeBounds.height / 2;
    const fireworks = [-1, 0, 1].map((offset) => {
        const firework = document.createElement("span");
        firework.className = "candle-firework";
        firework.style.setProperty("--firework-x", `${centerX + offset * 58}px`);
        firework.style.setProperty("--firework-y", `${centerY - 25 - (offset === 0 ? 20 : 0)}px`);
        firework.append(...Array.from({ length: 16 }, (_, index) => {
            const spark = document.createElement("span");
            const angle = (index / 16) * Math.PI * 2;
            const distance = 48 + Math.random() * 32;
            spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
            spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);
            spark.style.setProperty("--spark-color", palette[(index + Math.floor(Math.random() * palette.length)) % palette.length]);
            spark.style.setProperty("--spark-delay", `${Math.random() * 120}ms`);
            return spark;
        }));
        return firework;
    });
    const confetti = Array.from({ length: 38 }, (_, index) => {
        const piece = document.createElement("span");
        piece.className = "candle-confetti";
        piece.style.setProperty("--confetti-x", `${centerX + (Math.random() - 0.5) * 150}px`);
        piece.style.setProperty("--confetti-y", `${centerY + (Math.random() - 0.5) * 55}px`);
        piece.style.setProperty("--confetti-fall", `${100 + Math.random() * 190}px`);
        piece.style.setProperty("--confetti-drift", `${(Math.random() - 0.5) * 160}px`);
        piece.style.setProperty("--confetti-color", palette[index % palette.length]);
        piece.style.setProperty("--confetti-delay", `${Math.random() * 220}ms`);
        return piece;
    });

    window.clearTimeout(candleCelebrationTimer);
    candleCelebration.classList.remove("is-celebrating");
    candleCelebration.replaceChildren(...fireworks, ...confetti);
    void candleCelebration.offsetWidth;
    candleCelebration.classList.add("is-celebrating");
    candleCelebrationTimer = window.setTimeout(() => {
        candleCelebration.classList.remove("is-celebrating");
        candleCelebration.replaceChildren();
    }, 2400);
}

function extinguishCakeCandles() {
    birthdayCake.classList.add("is-blown");
    birthdayCake.setAttribute("aria-pressed", "true");
    birthdayCake.setAttribute("aria-label", "Relight the birthday candles");
    cakeStatus.textContent = "Make a wish, Ham! Your candles are out!";
    candleSecret.hidden = false;
    birthdayScene.classList.remove("is-cake-spotlight");
    document.documentElement.classList.remove("cake-spotlight-mode");
    document.body.classList.remove("cake-spotlight-mode");
    birthdayCake.scrollIntoView({ block: "center" });
    playCandleCelebration();
}

function handleCandleSequence(candle) {
    const sequence = [".cake-candle-center", ".cake-candle-right", ".cake-candle-left"];
    const expectedCandle = sequence[candleSequencePosition];

    if (candle.matches(expectedCandle)) {
        candle.classList.add("is-sequence-lit");
        candleSequencePosition += 1;
        if (candleSequencePosition === sequence.length) {
            candleSequenceComplete = true;
            candleOrderSecret.hidden = false;
            cakeStatus.textContent = "You found the secret candle pattern! ✨";
            birthdayCake.scrollIntoView({ block: "center" });
            requestAnimationFrame(() => playCandleCelebration());
        } else {
            cakeStatus.textContent = "A little candle magic... ✨";
        }
        return;
    }

    birthdayCake.querySelectorAll(".cake-candle").forEach((item) => item.classList.remove("is-sequence-lit"));
    candleSequencePosition = 0;
    if (candle.matches(sequence[0])) {
        candle.classList.add("is-sequence-lit");
        candleSequencePosition = 1;
    }
    cakeStatus.textContent = "The candles flicker with a little mystery...";
}

function handleCandleBeat(candle) {
    if (candleBeatComplete) {
        return;
    }

    const sequence = [
        ".cake-candle-center",
        ".cake-candle-right",
        ".cake-candle-left"
    ];
    const now = performance.now();
    const beatGap = now - candleBeatLastTap;
    const isInTime = candleBeatPosition === 0 || (beatGap >= 100 && beatGap <= 1800);
    const tappedExpectedCandle = candle.matches(sequence[candleBeatPosition]);

    if (isInTime && tappedExpectedCandle) {
        candleBeatPosition += 1;
    } else {
        candleBeatPosition = candle.matches(sequence[0]) ? 1 : 0;
    }
    candleBeatLastTap = now;

    if (candleBeatPosition === sequence.length) {
        candleBeatComplete = true;
        cakeStatus.textContent = "You found the birthday beat! Listen for your birthday song! 🎵";
        if (musicPlaying) {
            stopMelody();
        }
        playHappyBirthdaySong();
        playCandleCelebration();
    }
}

birthdayCake.addEventListener("click", (event) => {
    const isSpotlight = birthdayScene.classList.contains("is-cake-spotlight");
    const clickedGreeting = event.target.closest(".cake-greeting");
    const clickedCandle = event.target.closest(".cake-candle");

    if (clickedGreeting && !isSpotlight) {
        enterCakeSpotlight();
        return;
    }

    if (isSpotlight && event.target.closest(".cake-candle")) {
        extinguishCakeCandles();
        return;
    }

    if (isSpotlight) {
        return;
    }

    if (clickedCandle && !birthdayCake.classList.contains("is-blown")) {
        handleCandleBeat(clickedCandle);
        if (!candleSequenceComplete) {
            handleCandleSequence(clickedCandle);
        }
        return;
    }

    const isBlown = !birthdayCake.classList.contains("is-blown");
    birthdayCake.classList.toggle("is-blown", isBlown);
    birthdayCake.setAttribute("aria-pressed", String(isBlown));
    birthdayCake.setAttribute("aria-label", isBlown ? "Relight the birthday candles" : "Blow out the birthday candles");
    cakeStatus.textContent = isBlown
        ? "Make a wish, Ham! Your candles are out!"
        : "Your candles are glowing again!";
    candleSecret.hidden = !isBlown;
    if (isBlown) {
        playCandleCelebration();
    }
});

birthdayCake.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    event.preventDefault();
    if (birthdayScene.classList.contains("is-cake-spotlight")) {
        extinguishCakeCandles();
    } else {
        enterCakeSpotlight();
    }
});

wishForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const wish = wishInput.value.trim();

    if (!wish) {
        wishStatus.textContent = "Type your wish before sending it to the stars.";
        wishInput.focus();
        return;
    }

    const startsRainbowParty = wish.toLowerCase() === "party";
    if (startsRainbowParty) {
        startRainbowParty();
    }
    const startsKittyParade = wish.toLowerCase() === "kitty parade";
    if (startsKittyParade) {
        startCatRain();
    }
    const startsStarryNight = wish.toLowerCase() === "starry night";
    if (startsStarryNight) {
        wishSubmitCount = 0;
        startWishStarRain();
    }
    const wishColors = [...new Set((wish.match(/[a-z]+/gi) || [])
        .map((color) => color.toLowerCase())
        .filter((color) => !nonColorKeywords.has(color) && CSS.supports("color", color)))];
    let completedRainbowColor = "";
    wishColors.forEach((color) => {
        const colorCount = (rainbowWishColors.get(color) || 0) + 1;
        rainbowWishColors.set(color, colorCount);
        if (colorCount === 3 && !completedRainbowColor) {
            completedRainbowColor = color;
        }
    });
    const completesRainbowWishes = Boolean(completedRainbowColor);
    if (completesRainbowWishes) {
        startRainbowParty();
        rainbowWishColors.clear();
    }

    const playsHappyBirthdaySong = wish.toLowerCase() === "happy birthday";
    if (playsHappyBirthdaySong) {
        playHappyBirthdaySong();
    }

    const revealsKyokoAndSayaka = wish.toLocaleLowerCase() === "kyoko and sayaka";
    if (revealsKyokoAndSayaka) {
        wishNameReveal.querySelector("figcaption").textContent = "A special picture appeared for Kyoko and Sayaka! ✨";
        wishNameReveal.hidden = false;
        wishNameReveal.classList.remove("is-visible");
        void wishNameReveal.offsetWidth;
        wishNameReveal.classList.add("is-visible");
    }

    wishSubmitCount += 1;
    const startStarRain = wishSubmitCount === 5;
    if (startStarRain) {
        wishSubmitCount = 0;
    }

    const palette = wishFireworkPalettes[wishPaletteIndex % wishFireworkPalettes.length];
    wishPaletteIndex += 1;
    wishStarText.textContent = wish;
    wishStarText.style.setProperty("--wish-text-color", palette[0]);
    wishStar.classList.remove("is-launched");
    wishStar.classList.remove("is-bursting");
    wishReveal.classList.remove("is-visible");
    wishReveal.hidden = true;
    window.clearTimeout(wishRevealTimer);
    const sparkCount = 64;
    wishStar.querySelector(".wish-star-burst").replaceChildren(
        ...Array.from({ length: sparkCount }, (_, index) => {
            const spark = document.createElement("span");
            const angle = (index / sparkCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
            const distance = 125 + Math.random() * 105;
            spark.style.setProperty("--wish-x", `${Math.cos(angle) * distance}px`);
            spark.style.setProperty("--wish-y", `${Math.sin(angle) * distance}px`);
            spark.style.setProperty("--wish-color", palette[index % palette.length]);
            spark.style.setProperty("--wish-width", `${4 + Math.random() * 4}px`);
            spark.style.setProperty("--wish-height", `${14 + Math.random() * 13}px`);
            spark.style.setProperty("--wish-delay", `${Math.random() * 100}ms`);
            spark.style.setProperty("--wish-duration", `${1.45 + Math.random() * 0.35}s`);
            return spark;
        })
    );
    void wishStar.offsetWidth;
    wishStar.classList.add("is-launched");
    wishReveal.textContent = `Ham's birthday wish: "${wish}" ✨`;
    wishStatus.textContent = "Your wish is sparkling into a firework...";
    wishInput.value = "";
    if (startStarRain) {
        wishStatus.textContent = "A dark cloud is here... look out for the falling stars!";
        startWishStarRain();
    }

    playPresentSound();
    wishRevealTimer = window.setTimeout(() => {
        wishStar.classList.add("is-bursting");
        wishRevealTimer = window.setTimeout(() => {
            wishReveal.hidden = false;
            wishReveal.classList.add("is-visible");
            wishStatus.textContent = startsRainbowParty
                ? "You found the secret word! The rainbow party is underway! 🌈"
                : startsKittyParade
                ? "You found the kitty parade secret! Look out for falling cats! 🐱"
                : startsStarryNight
                ? "You found the starry night secret! Make a wish under the falling stars! ✨"
                : completesRainbowWishes
                ? `You sent wishes with ${completedRainbowColor} three times! The rainbow is here! 🌈`
                : wishColors.length
                ? `Rainbow wish colors: ${wishColors.map((color) => `${color} ${rainbowWishColors.get(color) || 0}/3`).join(", ")}.`
                : revealsKyokoAndSayaka
                ? (wishStarStorm.hidden
                    ? "Kyoko and Sayaka's picture appeared with your wish! ✨"
                    : "Kyoko and Sayaka's picture appeared under the falling stars! ✨")
                : (wishStarStorm.hidden
                    ? "Your wish burst into a firework! ✨"
                    : "The dark cloud is raining falling stars! ✨");
        }, 1650);
    }, 1750);
});

const melody = [659.25, 783.99, 987.77, 783.99, 880, 1046.5, 987.77, 783.99];
const happyBirthdayNotes = [
    { frequency: 392, duration: 0.25 }, { frequency: 392, duration: 0.25 },
    { frequency: 440, duration: 0.5 }, { frequency: 392, duration: 0.5 },
    { frequency: 523.25, duration: 0.5 }, { frequency: 493.88, duration: 0.9 },
    { frequency: 392, duration: 0.25 }, { frequency: 392, duration: 0.25 },
    { frequency: 440, duration: 0.5 }, { frequency: 392, duration: 0.5 },
    { frequency: 587.33, duration: 0.5 }, { frequency: 523.25, duration: 0.9 },
    { frequency: 392, duration: 0.25 }, { frequency: 392, duration: 0.25 },
    { frequency: 783.99, duration: 0.5 }, { frequency: 659.25, duration: 0.5 },
    { frequency: 523.25, duration: 0.5 }, { frequency: 493.88, duration: 0.5 },
    { frequency: 440, duration: 0.9 },
    { frequency: 698.46, duration: 0.25 }, { frequency: 698.46, duration: 0.25 },
    { frequency: 659.25, duration: 0.5 }, { frequency: 523.25, duration: 0.5 },
    { frequency: 587.33, duration: 0.5 }, { frequency: 523.25, duration: 1.1 }
];
const beatDuration = 0.32;
let audioContext;
let musicGain;
let musicTimer;
let musicPlaying = false;
let soundEffectsEnabled = true;
let soundGain;

function scheduleMelody() {
    if (!musicPlaying || !audioContext || !musicGain) {
        return;
    }

    const startTime = audioContext.currentTime + 0.05;
    melody.forEach((frequency, index) => {
        const noteStart = startTime + index * beatDuration;
        const oscillator = audioContext.createOscillator();
        const noteGain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, noteStart);
        noteGain.gain.setValueAtTime(0, noteStart);
        noteGain.gain.linearRampToValueAtTime(0.22, noteStart + 0.025);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + beatDuration * 0.9);
        oscillator.connect(noteGain);
        noteGain.connect(musicGain);
        oscillator.start(noteStart);
        oscillator.stop(noteStart + beatDuration);
    });

    musicTimer = window.setTimeout(() => {
        musicTimer = undefined;
        scheduleMelody();
    }, melody.length * beatDuration * 1000);
}

function scheduleHappyBirthdaySong(noteIndex = 0) {
    if (!musicPlaying || !audioContext || !musicGain) {
        return;
    }

    if (noteIndex >= happyBirthdayNotes.length) {
        musicPlaying = false;
        musicTimer = undefined;
        musicGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.08);
        musicButton.textContent = "Play birthday music";
        musicButton.setAttribute("aria-pressed", "false");
        audioStatus.textContent = "The Happy Birthday song is finished.";
        return;
    }

    const note = happyBirthdayNotes[noteIndex];
    const noteStart = audioContext.currentTime + 0.03;
    const oscillator = audioContext.createOscillator();
    const noteGain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note.frequency, noteStart);
    noteGain.gain.setValueAtTime(0, noteStart);
    noteGain.gain.linearRampToValueAtTime(0.5, noteStart + 0.025);
    noteGain.gain.setTargetAtTime(0.001, noteStart + note.duration * 0.72, Math.max(0.025, note.duration * 0.12));
    oscillator.connect(noteGain);
    noteGain.connect(musicGain);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + note.duration);

    musicTimer = window.setTimeout(
        () => scheduleHappyBirthdaySong(noteIndex + 1),
        (note.duration + 0.045) * 1000
    );
}

async function playHappyBirthdaySong() {
    if (!window.AudioContext) {
        audioStatus.textContent = "Happy Birthday music is not supported in this browser.";
        return;
    }

    musicButton.disabled = true;
    try {
        if (!audioContext) {
            audioContext = new AudioContext();
            musicGain = audioContext.createGain();
            musicGain.gain.value = 0;
            musicGain.connect(audioContext.destination);
        }

        await audioContext.resume();
        window.clearTimeout(musicTimer);
        musicGain.gain.cancelScheduledValues(audioContext.currentTime);
        musicGain.gain.setTargetAtTime(0.65, audioContext.currentTime, 0.04);
        musicPlaying = true;
        musicButton.textContent = "Mute birthday music";
        musicButton.setAttribute("aria-pressed", "true");
        audioStatus.textContent = "Happy Birthday is playing!";
        scheduleHappyBirthdaySong();
    } catch (error) {
        audioStatus.textContent = "Happy Birthday music could not start. Please try again.";
        console.error("Could not start Happy Birthday music:", error);
    } finally {
        musicButton.disabled = false;
    }
}

function stopMelody() {
    musicPlaying = false;
    window.clearTimeout(musicTimer);
    musicTimer = undefined;

    if (musicGain && audioContext) {
        musicGain.gain.cancelScheduledValues(audioContext.currentTime);
        musicGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.04);
    }

    musicButton.textContent = "Play birthday music";
    musicButton.setAttribute("aria-pressed", "false");
    audioStatus.textContent = "Birthday music is muted.";
}

soundButton.addEventListener("click", () => {
    soundEffectsEnabled = !soundEffectsEnabled;
    soundButton.setAttribute("aria-pressed", String(soundEffectsEnabled));
    soundButton.textContent = soundEffectsEnabled ? "Sound effects: on" : "Sound effects: off";
    audioStatus.textContent = soundEffectsEnabled
        ? "Present sound effects are on."
        : "Present sound effects are muted.";
});

async function playPresentSound() {
    if (!soundEffectsEnabled) {
        return;
    }

    if (!window.AudioContext) {
        audioStatus.textContent = "Present sound effects are not supported in this browser.";
        return;
    }

    try {
        if (!audioContext) {
            audioContext = new AudioContext();
            musicGain = audioContext.createGain();
            musicGain.gain.value = 0;
            musicGain.connect(audioContext.destination);
        }

        if (!soundGain) {
            soundGain = audioContext.createGain();
            soundGain.gain.value = 0.14;
            soundGain.connect(audioContext.destination);
        }

        await audioContext.resume();
        const notes = [523.25, 659.25, 783.99];
        const startTime = audioContext.currentTime + 0.02;
        notes.forEach((frequency, index) => {
            const noteStart = startTime + index * 0.12;
            const oscillator = audioContext.createOscillator();
            const noteGain = audioContext.createGain();

            oscillator.type = "triangle";
            oscillator.frequency.setValueAtTime(frequency, noteStart);
            noteGain.gain.setValueAtTime(0.001, noteStart);
            noteGain.gain.linearRampToValueAtTime(0.32, noteStart + 0.015);
            noteGain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.32);
            oscillator.connect(noteGain);
            noteGain.connect(soundGain);
            oscillator.start(noteStart);
            oscillator.stop(noteStart + 0.34);
        });
        if (!musicPlaying) {
            audioStatus.textContent = "A little surprise sound!";
        }
    } catch (error) {
        audioStatus.textContent = "Present sound effect could not play.";
        console.error("Could not play present sound effect:", error);
    }
}

musicButton.addEventListener("click", async () => {
    if (musicPlaying) {
        stopMelody();
        return;
    }

    if (!window.AudioContext) {
        audioStatus.textContent = "Birthday music is not supported in this browser.";
        return;
    }

    musicButton.disabled = true;
    try {
        if (!audioContext) {
            audioContext = new AudioContext();
            musicGain = audioContext.createGain();
            musicGain.gain.value = 0;
            musicGain.connect(audioContext.destination);
        }

        await audioContext.resume();
        musicGain.gain.cancelScheduledValues(audioContext.currentTime);
        musicGain.gain.setTargetAtTime(0.12, audioContext.currentTime, 0.04);
        musicPlaying = true;
        musicButton.textContent = "Mute birthday music";
        musicButton.setAttribute("aria-pressed", "true");
        audioStatus.textContent = "A little birthday tune is playing.";
        scheduleMelody();
    } catch (error) {
        audioStatus.textContent = "Birthday music could not start. Please try again.";
        console.error("Could not start birthday music:", error);
    } finally {
        musicButton.disabled = false;
    }
});