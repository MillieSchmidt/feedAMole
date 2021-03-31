const moleArray = document.querySelectorAll('.mole');
const progressWorm = document.querySelector('.progress-worm');
let points = 0;

//functions called by newInterval

function goneToHungry (random) {    
    moleArray[random].classList.remove('gone');
    moleArray[random].classList.add('hungry');
}

function hungryToSad (random) {
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
    let random = Math.floor(Math.random() * 10);

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

    if ( Math.floor(Math.random() * 10) > 1 ) {

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

        }, 2000)
        
    }, Date.now())

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
    
            }, 2000)
            
        }, Date.now())
    }
            
}, 7000) //end of interval newInterval

//clearInterval(newInterval);