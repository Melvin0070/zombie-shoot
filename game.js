// eration 1: Declare variables required for this game
const game_body = document.getElementById("game-body")
let shotgun_sound = new Audio("./assets/shotgun.wav")
let background_music = new Audio("./assets/bgm.mp3")
let zombieID=0;
let lives = 5
let Zombie;
let time = 60


function gameover(){
    location.href = "game-over.html"
}

game_body.onclick = ()=>{
    shotgun_sound.currentTime = 0
    shotgun_sound.play()
}

background_music.play()
background_music.loop = true


function genZ(){
    game_body.innerHTML += `<img src=./assets/zombie-${generateUniqueNumber(1, 6)}.png class = zombie-image id = Zombies${zombieID}>`
    Zombie = document.getElementById(`Zombies${zombieID}`)

    let second = generateUniqueNumber(1,6)
    Zombie.style.animationDuration =`${second}s`
    let viewWidth = generateUniqueNumber(20, 80)
    Zombie.style.transform = `translateX(${viewWidth}vw)`
    Zombie.onclick = ()=>{
        destroyZombie(Zombie)

    }
    zombieID +=1
}
genZ()



// Iteration 6: Write a code to start the game by calling the first zombie


// Iteration 7: Write the helper function to get random integer
function generateUniqueNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
function destroyZombie(Zombie){
    Zombie.style.display = "none"
    zombieID +=1
    genZ()
}


function zombieEscape(Zombie){

    if(Zombie.getBoundingClientRect().top<=0){
      const maxLivesElement = document.getElementById("max-lives");
      maxLivesElement.style.width = lives*12+"%";
        destroyZombie(Zombie)
        lives -= 1
        if(lives==0){
            gameover()
        }
    }
}

zombieEscape(Zombie)

setInterval(timer,1000)
function timer(){
    if(time<=0){
        window.location.href = "win.html"

    }else{
        time--
        clearInterval(timer)
        document.getElementById("timer").innerText = time
        zombieEscape(Zombie)
    }

}
setInterval(check,100)
function check() {
    zombieEscape(Zombie);
}