// Array mit metakognitiven Übungen
const exercises = [
  "Übung 1: Schreibe auf, welche Gedanken dich heute negativ beeinflusst haben und hinterfrage sie.",
  "Übung 2: Atme tief ein und aus. Konzentriere dich auf deinen Atem und lasse störende Gedanken los.",
  "Übung 3: Denke an einen Moment, in dem du erfolgreich warst. Überlege, welche Gedanken dich dabei unterstützt haben.",
  "Übung 4: Beobachte deine Gedanken für 5 Minuten, ohne sie zu bewerten. Lasse sie kommen und gehen.",
  "Übung 5: Notiere dir drei positive Gedanken über dich selbst und wiederhole sie im Laufe des Tages."
];

let currentExerciseIndex = null;
let historyStack = [];
let favorites = [];

// DOM-Elemente
const exerciseTextElement = document.getElementById('exercise-text');
const newExerciseButton = document.getElementById('new-exercise-button');
const prevExerciseButton = document.getElementById('prev-exercise-button');
const favoriteButton = document.getElementById('favorite-button');
const favoritesListElement = document.getElementById('favorites-list');

// Funktion zur Erzeugung eines zufälligen Index, der nicht dem aktuellen entspricht
function getRandomExerciseIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * exercises.length);
  } while (newIndex === currentExerciseIndex && exercises.length > 1);
  return newIndex;
}

// Funktion zur Anzeige der Übung
function displayExercise(index) {
  exerciseTextElement.textContent = exercises[index];
}

// Favoriten aus dem Local Storage laden
function loadFavorites() {
  const storedFavorites = localStorage.getItem("favoriteExercises");
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  } else {
    favorites = [];
  }
}

// Favoriten im Local Storage speichern
function saveFavorites() {
  localStorage.setItem("favoriteExercises", JSON.stringify(favorites));
}

// Favoriten-Liste rendern
function renderFavorites() {
  favoritesListElement.innerHTML = "";
  if (favorites.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Noch keine Favoriten.";
    favoritesListElement.appendChild(li);
    return;
  }
  favorites.forEach((fav, index) => {
    const li = document.createElement("li");
    li.textContent = fav;
    // Entfernen-Button für jeden Favoriten
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Entfernen";
    removeBtn.addEventListener("click", () => {
      removeFavorite(index);
    });
    li.appendChild(removeBtn);
    favoritesListElement.appendChild(li);
  });
}

// Favorit entfernen
function removeFavorite(index) {
  favorites.splice(index, 1);
  saveFavorites();
  renderFavorites();
}

// Event Listener für den Button „Neue Übung“
newExerciseButton.addEventListener('click', () => {
  if (currentExerciseIndex !== null) {
    historyStack.push(currentExerciseIndex);
  }
  currentExerciseIndex = getRandomExerciseIndex();
  displayExercise(currentExerciseIndex);
});

// Event Listener für den Button „Zurück“
prevExerciseButton.addEventListener('click', () => {
  if (historyStack.length > 0) {
    currentExerciseIndex = historyStack.pop();
    displayExercise(currentExerciseIndex);
  } else {
    alert("Keine vorherige Übung vorhanden.");
  }
});

// Event Listener für den Button „Favorit“
favoriteButton.addEventListener('click', () => {
  if (currentExerciseIndex !== null) {
    const currentExercise = exercises[currentExerciseIndex];
    // Verhindere doppelte Favoriten
    if (!favorites.includes(currentExercise)) {
      favorites.push(currentExercise);
      saveFavorites();
      renderFavorites();
    } else {
      alert("Diese Übung ist bereits als Favorit markiert.");
    }
  }
});

// Initialisierung der App
function init() {
  loadFavorites();
  renderFavorites();
  // Beim Laden der Seite wird eine zufällige Übung angezeigt
  currentExerciseIndex = getRandomExerciseIndex();
  displayExercise(currentExerciseIndex);
}

init();
