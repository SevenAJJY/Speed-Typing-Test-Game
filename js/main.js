const paragraphs = [
    "television is a great gift of science. it offers double the benefits of cinema and radio. television is the most important and effective instrument of entertainment. it relays live telecasts of important events. it is also the best medium of advertisement. it helps mass education.",
    "The greatest wealth is our own health. A healthy body can earn great wealth but, a wealthy person cannot earn great health. We live in a fast-moving world where individuals have no time for themselves. Most part of their life withers away in search of materialistic wealth in order to outshine others but.",
    "Co-education is a system of education in which boys and girls study together in a common school or college. Co-education was not prevalent in ancient times. It is a groundbreaking thought. The parents supported the case for adequate education for the children irrespective of their sex.",
    "There are two basic purposes behind education. The first is to free people from ignorance, superstition, bad habits, and many wrong ideas. Secondly, to provide the citizens of a country with some skill or special kind of knowledge that would enable them to earn a decent living.",
    "There is truth in the common saying: “Cleanliness is next to godliness.” It is a great virtue. It makes a man healthy and happy. The healthy habit of cleanliness should be formed from childhood in our everyday routine. A clean environment keeps us free from pollution. Cleanliness comes out of a taste for decency.",
    "Contamination of water bodies because of the discharge of pollutants into them is known as water pollution. Water pollution may severely affect human, plant, and animal life. Pathogens are disease-causing bacteria present in wastewater. When contaminated water is consumed, the pathogens enter the human body. ",
    "In recent periods, many campaigns have been organized against employing children in mines, factories, motor garages, restaurants, tea stalls, and shops. There are various households that employ poor children though only a few provide their child servants with adequate food and clothing. ",
    "There are some simple habits which we can follow for maintaining our health. A morning walk is such a healthy habit. It is good exercise after a long night’s rest and provides us with fresh oxygen from the cool morning air. Even doctors advise their patients to have a morning walk daily.",
    "Trees form an important part of the wealth of a country. Trees supply a country with all the timber necessary for buildings and furniture and provide abundant fuel to the localities nearby. But the greatest use of the trees lies in their power to attract rain and preserve moisture.",
    "Time and tide wait for none. Man has a lot of duties in his short span of life and so time is the most important factor in one’s life. We should remember that we cannot recall the time that is gone. We can stop the clock but we cannot stop the time. If we idle away our time, our appointed",
    "My ambition in life is to become a physician. Our village has many good things to boast of. But it has no qualified doctors. A man falling sick has no other alternative than to get himself treated by a quack. Every year many people die in our village for want of proper medical treatment.",
    "My favourite hobby is gardening. I started it when I was only ten. I dig the land, sow the seeds, and water the plants in my garden. Every afternoon I work for an hour in my garden and watch the buds come up and the branches nod in the breeze. Although a hobby is a source of pleasure and not of profit.",
    "The newspaper is the mirror of the world. It plays a vital role in modern civilization. In our country newspapers are published in many languages. It helps us to acquire general knowledge. Newspapers provide reports, speeches, reviews on trade and commerce, films, sports, etc, and puzzles.",
    "Television is a great gift of science. It offers double the benefits of cinema and radio. Television is the most important and effective instrument of entertainment. It relays live telecasts of important events. It is also the best medium of advertisement. It helps mass education.",
    "Of late, sound or noise pollution has adversely affected our normal life in a major way. It is chasing us at almost every step. In schools, colleges, offices, and even hospitals we have an explosion of deafening sound. There are many causes of sound pollution. We are almost deafened by the blaring mikes.",
    "We live in an age of science and feel its influence at every step of our life. The alarm clock wakes us and science has made our lives more enjoyable with radio, TV, light, fan, refrigerator, etc. Vehicles carry us to distant places in a short time. Telephones have improved communication.",
    "Emerson's own contributions to this democratic ideal of equality so uniquely American are great. Not many writers can challenge his talent for a brevity of sentence that contains such daring power as this: The simplest person, who in his integrity worships God, becomes God; or Behold, it saith.",
    "An idea can transcend time because the soul advances by an ascension of state; we gain a deeper understanding of truth not by anything physical, but through our minds. The greater insight we gain into the spirit that connects everything in our world, the closer we come to the Over-Soul. Emerson.",
    "Christmas is one of the most famous and light-hearted festivals which is celebrated across the world by billions of people. People of the Christian religion celebrate Christmas to remember the great works of Jesus Christ. 25th December is celebrated as Christmas Day across the world.",
    "Family is the place where you learn your first lesson in life. Your family members are the only assets that will remain with you forever. Whatever the circumstances, family members are always there for each other to support us. Good values and good morals are always taught in a family."
];

const typingText = document.querySelector('.typing-text p');
const inputField = document.querySelector('.input-field');
const timeTag = document.querySelector('.time span b');
const mistakesTag = document.querySelector('.mistake span');
const wpmTag = document.querySelector('.wpm span');
const cpmTag = document.querySelector('.cpm span');
const accuracyTag = document.querySelector('.accuracy span b');
const tryAgainBtn = document.querySelector('.content-box button');
const sGame = document.querySelector('._sGame');
const stratGame = sGame.querySelector('.start-game');

let timer;
let maxTime = 60;
let timeLeft = maxTime;

let isTyping = false;
let charIndex = mistakes = 0;

/**
 * @return void
 */
function randomParagraph() {
    /**
     * We bring a random number and it will always be less than the length of the paragraph
     */
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // getting random item from the paragraphs array, splitting all characters
    // of it, adding each character inside span and then adding this span inside <p> tag
    paragraphs[randIndex].toLowerCase().split("").forEach((span) => {
        typingText.innerHTML += `<span>${span}</span>`;
    });
    typingText.querySelectorAll('span')[0].classList.add('active');
    // focusing input field on keydown or click event
    document.addEventListener('keydown', () => inputField.focus());
    document.addEventListener('click', () => inputField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    let typedChar = inputField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        // once timer is start, it Won't restart again on every Key clickeds
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
            typingText.parentElement.parentElement.classList.add('progress');
        }
        // if user hasn't entered any character or pressed backspace
        if (typedChar == undefined) {
            charIndex--;
            // decrement mistakes only if the charIndex span contains increment
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--;
            }
            characters[charIndex].classList.remove('incorrect', 'correct');
        } else {
            // if user typed character and shown character matched then add the
            // correct class else increment the mistakes and  add the incorrect class
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct');
                timeTag.innerHTML--;
            } else {
                characters[charIndex].classList.add('incorrect');
                if (characters[charIndex].classList.contains('incorrect')) {
                    mistakes++;
                }
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove('active'));
        characters[charIndex].classList.add('active');

        /**
         * count mistakes
         */
        mistakesTag.innerText = mistakes;
        /**
         * cpm will not count mistakes
         */
        cpmTag.innerText = charIndex - mistakes;
        /**
         * __ Calculating Words per Minute (WPM)
         * Total Number of chars =(Total Number of chars - miskes) / 5
         * WPM = Total Number of chars / Time Elapsed in Minutes (rounded down)
         */
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
        /**
         *  if wpm Value Is 0, Empty, Or Infinity Then setting It's Value to 0
         *  
         */
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        /**
         * Calculating Accuracy
         * Accuracy = (Correct Keys Pressed  / Total Keys Pressed) * 100 = 95%
         * @Exemple
         * Accuracy = (190 / 200) * 100 = 95%
         */
        let accuracy = ((charIndex - mistakes) / charIndex) * 100;
        accuracyTag.innerText = accuracy.toFixed(1);
    } else {
        inputField.value = "";
        clearInterval(timer);
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}
/**
 *  calling loadParagraph function And 
 *  resetting each variable and elements value to default 
 *  @return void
 */
function resetGame() {
    typingText.parentElement.parentElement.classList.remove('progress');
    randomParagraph();
    inputField.value = '';
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakesTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    accuracyTag.innerText = 0;

}

/**
 * Start game
 */

stratGame.onclick = () => {
    sGame.classList.add('hide');
    inputField.parentElement.classList.add('show');
}

randomParagraph();
inputField.addEventListener('input', initTyping);
tryAgainBtn.addEventListener('click', resetGame);