const words = [
    { word: "Γάτα", image: "cat.jpg", sound: "cat.mp3" },
    { word: "Σκύλος", image: "dog.jpg", sound: "dog.mp3" },
    { word: "Πουλί", image: "bird.jpg", sound: "bird.mp3" },
    { word: "Ψάρι", image: "fish.jpg", sound: "fish.mp3" },
];

const puzzleContainer = document.getElementById('puzzle-container');
const wordDisplay = document.createElement('div');
wordDisplay.style.fontSize = '24px'; // Μέγεθος γραμματοσειράς
wordDisplay.style.marginTop = '20px';
document.body.appendChild(wordDisplay);

// Function to create image display
function createImageDisplay() {
    words.forEach((item) => {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.word;
        img.style.width = '300px'; // Μεγέθυνση εικόνας
        img.style.height = 'auto';
        img.style.margin = '10px';
        img.style.cursor = 'pointer'; // Χέρι για κλικ
        img.addEventListener('click', () => showWord(item.word, item.sound));
        puzzleContainer.appendChild(img);
    });
}

// Function to show word and play sound
function showWord(word, sound) {
    wordDisplay.textContent = `Επιλέξατε: ${word}`; // Εμφάνιση λέξης
    const audio = new Audio(sound);
    audio.play(); // Παίξτε τον ήχο
}

// Initial setup
createImageDisplay();
