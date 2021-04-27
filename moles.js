console.log("This game was created as the final project of frontendmasters.com bootcamp, and was made for web. I made some modifications for mobile, but you should still play it on your PC. it's much more enjoyable!");

const moleArray = document.querySelectorAll('.mole');
const progressWorm = document.querySelector('.progress-worm');
let points = 0;

//functions called by newInterval

function goneToHungry (random) {    
    moleArray[random].classList.remove('gone');
    moleArray[random].classList.add('hungry');
}

function hungryToSad (random) {
    if (moleArray[random].classList.contains('fed')) {
        fedToLeaving(random);
    }
    
    moleArray[random].classList.remove('hungry');
    moleArray[random].classList.add('sad');
}

function sadToLeaving (random) {    
    moleArray[random].classList.remove('sad');
    moleArray[random].classList.add('leaving');
}

function leavingToGone (random) {    
    moleArray[random].classList.remove('leaving');
    moleArray[random].classList.add('gone');
}

function kingToHungry (random) {    
    moleArray[random].classList.remove('gone');
    moleArray[random].classList.add('king-hungry');
}

function kingToSad (random) {
    if (moleArray[random].classList.contains('king-fed')) {
        kingToLeaving(random);
    }

    moleArray[random].classList.remove('king-hungry');
    moleArray[random].classList.add('king-sad');
}

function kingToLeaving (random) {    
    moleArray[random].classList.remove('king-sad');
    moleArray[random].classList.add('king-leaving');
}

function kingToGone (random) {    
    moleArray[random].classList.remove('king-leaving');
    moleArray[random].classList.add('gone');
}

// functions called by function feedAMole

function hungryToFed (random) {
    if (moleArray[random].classList.contains('sad')) {
        moleArray[random].classList.remove('sad');
    }
    
    console.log("hungryToFed called");
    moleArray[random].classList.remove('hungry');
    moleArray[random].classList.add('fed');
    points++;
    if (points == 10) {
        clearInterval(newInterval);
        setTimeout(function () {
            location.href = "ending.html";
        }, 800);
    }
    progressWorm.style.width = (points * 10) + "%";
}

function fedToLeaving (random) {
    moleArray[random].classList.remove('fed');
    moleArray[random].classList.add('leaving');
}

function kingHungryToFed(random) {
    moleArray[random].classList.remove('king-hungry');
    moleArray[random].classList.add('king-fed');
    points += 2;
    if (points >= 10) {
        clearInterval(newInterval);
        setTimeout(function () {
            location.href = "ending.html";
        }, 800);
    }        
    progressWorm.style.width = (points * 10) + "%";
}

function kingFedtoLeaving (random) {
    moleArray[random].classList.remove('king-fed');
    moleArray[random].classList.add('king-leaving');
}

// beginning of newInterval

let newInterval = setInterval(function () {
    let random = Math.floor(Math.random() * 8);
    console.log(random);
    
    if ( Math.floor(Math.random() * 8) > 1 ) {

    setTimeout(function () {
        
        goneToHungry(random);
        
        setTimeout(function () {
            
            hungryToSad(random);

            setTimeout(function () {
                
                sadToLeaving(random);

                setTimeout(function () {
                    
                    leavingToGone(random);
                }, 500)

            }, 500)

        }, 1500)
        
    }, 100)

    } else {
        setTimeout(function () {
            
            kingToHungry(random);
            
            setTimeout(function () {
                
                kingToSad(random);
    
                setTimeout(function () {
                    
                    kingToLeaving(random);
    
                    setTimeout(function () {
                        
                        kingToGone(random);
                    }, 500)
    
                }, 500)
    
            }, 1500)
            
        }, 100)
    }

    function feedAMole() {
        if (moleArray[random].classList.contains('hungry')) {
            
            hungryToFed(random);
        
            setTimeout(function () {
                fedToLeaving(random);
                
                setTimeout(function () {
                    leavingToGone(random);
                        
                }, 500);
        
            }, 500);

        } else if (moleArray[random].classList.contains('king-hungry')) {
   
            kingHungryToFed(random);
        
            setTimeout(function () {
                kingFedtoLeaving(random);
        
                setTimeout(function () {
                    kingToGone(random);
        
                }, 500);

            }, 500);

        } else {
            return;
        }
    }

    moleArray[random].addEventListener('click', feedAMole);
            
}, 4000) //end of interval newInterval

//clearInterval(newInterval);