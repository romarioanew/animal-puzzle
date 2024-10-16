const words = [
    { word: "Γάτα", image: "cat.jpg", question: "cat_question.mp3", largeImage: "cat2.jpg", roar: "cat_roar.mp3" },
    { word: "Σκύλος", image: "dog.jpg", question: "dog_question.mp3", largeImage: "dog2.jpg", roar: "dog_roar.mp3" },
    { word: "Πουλί", image: "bird.jpg", question: "bird_question.mp3", largeImage: "bird2.jpg", roar: "bird_roar.mp3" },
    { word: "Λιοντάρι", image: "lion.jpg", question: "lion_question.mp3", largeImage: "lion2.jpg", roar: "lion_roar.mp3" },
    { word: "Πίθηκος", image: "monkey.jpg", question: "monkey_question.mp3", largeImage: "monkey2.jpg", roar: "monkey_roar.mp3" },
    { word: "Χοίρος", image: "pig.jpg", question: "pig_question.mp3", largeImage: "pig2.jpg", roar: "pig_roar.mp3" },
];

let targetAnimal = '';
let score = 0;
const puzzleContainer = document.getElementById('puzzle-container');
const feedbackDisplay = document.createElement('div');
const scoreDisplay = document.createElement('div');

feedbackDisplay.style.fontSize = '20px';
feedbackDisplay.style.marginTop = '20px';
scoreDisplay.style.fontSize = '20px';
scoreDisplay.style.marginTop = '10px';

document.body.appendChild(scoreDisplay);
document.body.appendChild(feedbackDisplay);

// Function to shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to create image display
function createImageDisplay() {
    shuffle(words);
    targetAnimal = words[Math.floor(Math.random() * words.length)]; // Επιλογή τυχαίου ζώου

    // Παίζει η ερώτηση
    const questionAudio = new Audio(targetAnimal.question);
    questionAudio.play(); // Παίζει η ερώτηση

    feedbackDisplay.textContent = ''; // Καθαρίζει προηγούμενες απαντήσεις
    puzzleContainer.innerHTML = ''; // Καθαρισμός παλιών εικόνων
    scoreDisplay.textContent = `Σκορ: ${score}`; // Ενημέρωση σκορ

    words.forEach((item) => {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.word;
        img.style.width = '300px'; // Μεγαλύτερες εικόνες
        img.style.height = 'auto';
        img.style.margin = '10px';
        img.style.cursor = 'pointer'; 
        img.addEventListener('click', () => checkAnswer(item));
        puzzleContainer.appendChild(img);
    });
}

// Function to check the answer
function checkAnswer(selectedAnimal) {
    if (selectedAnimal.word === targetAnimal.word) {
        score++;
        feedbackDisplay.textContent = 'Μπράβο σου!';
        showLargeImage(selectedAnimal.largeImage, selectedAnimal.roar); // Εμφάνιση μεγάλης εικόνας και ήχου γρύλισμα
        showVisualEffects(); // Εμφάνιση οπτικών εφέ
    } else {
        const roarAudio = new Audio(selectedAnimal.roar); // Ήχος του λάθους ζώου
        roarAudio.play(); // Παίζει τον ήχο του λάθους
        setTimeout(() => {
            roarAudio.pause(); // Σταματάει μετά από 3 δευτερόλεπτα
        }, 3000);
    }

    setTimeout(() => {
        feedbackDisplay.textContent = '';
        createImageDisplay();
    }, 2000); // Ανανεώνει μετά από 2 δευτερόλεπτα
}

// Function to show visual effects
function showVisualEffects() {
    const effectContainer = document.createElement('div');
    effectContainer.style.position = 'fixed';
    effectContainer.style.top = '50%';
    effectContainer.style.left = '50%';
    effectContainer.style.transform = 'translate(-50%, -50%)';
    effectContainer.style.zIndex = '1000';
    effectContainer.style.fontSize = '50px';
    effectContainer.textContent = '🎉'; // Μπορείς να προσθέσεις και άλλα emojis ή εφέ

    document.body.appendChild(effectContainer);

    // Κλείσιμο του εφέ μετά από 2 δευτερόλεπτα
    setTimeout(() => {
        document.body.removeChild(effectContainer);
    }, 2000);
}

// Function to show large image with sound
function showLargeImage(largeImage, roarSound) {
    const largeImageContainer = document.createElement('div');
    largeImageContainer.style.position = 'fixed';
    largeImageContainer.style.top = '50%';
    largeImageContainer.style.left = '50%';
    largeImageContainer.style.transform = 'translate(-50%, -50%)';
    largeImageContainer.style.zIndex = '1000';

    const img = document.createElement('img');
    img.src = largeImage;
    img.alt = 'Μεγάλη εικόνα';
    img.style.width = '600px'; // Ακόμη μεγαλύτερη εικόνα
    img.style.height = 'auto';

    largeImageContainer.appendChild(img);
    document.body.appendChild(largeImageContainer);

    const roarAudio = new Audio(roarSound); // Ήχος γρύλισμα
    roarAudio.play();

    // Κλείσιμο της μεγάλης εικόνας μετά από 2 δευτερόλεπτα
    setTimeout(() => {
        document.body.removeChild(largeImageContainer);
    }, 2000);
}

// Initial setup
createImageDisplay();