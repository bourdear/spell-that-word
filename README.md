# <div align="center">Spell That Word</div>
## Description
Spell That Word is a browser based typing game implemented with vanilla JavaScript and the SweetAlert library. A player correctly spells as many words as they can within thirty seconds in an attempt to beat the high score. 

&nbsp;

![game demonstration](/images/example.gif?raw=true)

&nbsp;

## How to Play
* Click the "Begin" button.
* Correctly spell the displayed word and hit "ENTER."
* See if you can beat the high score before time runs out!

&nbsp;

## <div align="center">  [Live Demo](https://bourdear.github.io/spell-that-word/)</div>

&nbsp;

# About the Project

&nbsp;

## Picking a Word
* The project pulls words from a dictionary of over 107,000 words.
* Using `Math.floor()` and `Math.random()`, a number is generated and applied as the value of "index."
```javascript 
    index = Math.floor(Math.random() * 107344) + 1; 
```
* The "index" value pulls a word from the Dictionary array at `Dictionary[index]` and displays that word as the `innerHTML` of the element "result."
```
    document.getElementById('result').innerHTML = words[index];
```
&nbsp;


## Building a Timer
* The function `setInterval()` repeats its internal function every 1000 milliseconds.

* Within the `setInterval()` function, `parseInt()` calculates the minutes and seconds.
* The minutes are calculated by dividing the "timer" variable (remaining time) by 60 and the seconds are calculated using "timer" modulo 60.



```
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
```
* The time is displayed in the `innerHTML` of the"display"  element. 
```
    display.innerHTML = minutes + ":" + seconds;    
```
* One second is subtracted from the "timer" variable with each iteration of the `setInterval()` function. If the "timer" variable is less than 0, the timer ends and the `innerHTML` of the "display" element becomes "00:00."
```
    if (--timer < 0) {
        display.innerHTML = "00:00";
    }
```        
&nbsp;

## Keeping Score
* At the beginning of each game, the "point" and "high" variables (player's score and high score) are set to 0.
* `localStorage` is checked for a saved "highScore" variable via `localStorage.getItem().` If a saved "highScore" variable is found, the current high score of 0 is replaced with the saved "highScore" variable. 
```
    let newHS = localStorage.getItem('highScore');
    if (newHS > high) {
        high = newHS;
    }
```


* At the end of each game, the player's score is compared to the saved high score. If the player's score is greater than the high score, the variable "high" (high score) is set equal to the variable "point" (player's score). The new high score is saved locally via `localStorage.setItem().`
```
    if (point > high) {
        high = point;
        point = 0;
        localStorage.setItem('highScore', high);
```
&nbsp;

## Making a Modal

* A modal popup created using the "SweetAlert" library displays the "Game Over" message along with the player's score at the end of the game. 
* The SweetAlert JavaScript file was connected by linking to its CDN. 
* The following code was placed in the `<head>` of `index.html.`
```
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
```
* The modal was triggered to pop up with the `swal()` function. The first parameter set the title and the second parameter set the display message.
```
     swal('Game Over',` You got a score of ${point}. Well done!`);
```



&nbsp;

![modal popup](/images/modal.png?raw=true)

&nbsp;
