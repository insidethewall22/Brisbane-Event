

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="stylesheet" href="./css/diceRolling.css" />
    <title>Pig Game</title>
  </head>
  <body>
  <p class = 'hidden' id = 'pokemonNumber'><?php echo $_GET['pokemonNumber']?><p>
    <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">You🥷🏼</h2>
        <p class="score" id="score--0">43</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">0</p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">Pokemon🐹</h2>
        <p class="score" id="score--1">24</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">0</p>
        </div>
      </section>

      <img src="./asset/dice/dice-5.png" alt="Playing dice" class="dice" />
      <button class="btn btn--new">🔄 New game</button>
      <button class="btn btn--roll">🎲 Roll dice</button>
      <button class="btn btn--hold">📥 Hold</button>
     <a class="hidden btn btn--win" id="gameSuccess"> 🎆You win!!</a>
     <div id="gameModal">
        <button class="closeGameModal">&times;</button>
        <h1>Rolling Dice Game Rule</h1>  
        <p>1. winning🎆 condition: You🥷🏼 need to obtain 30 real scores faster than the Pokemon🐹</p> 
        <p>2. At your turn, clicking 🎲 Roll dice button to get current score and you can click mutiple times to get sum of the current score until you meet 1️⃣ point.</p> 
        <p>3. At your turn, when clicking 🎲 Roll dice button and meeting one point, the sum of current score would clear and jump to the Pokemon turn.  </p> 
        <p>4. At your turn, you can also choose 📥 Hold to convert the current score to real score and end your turn. </p> 
        <p>5. When You🥷🏼 win🎆 the game, clicking 🎆You win!! button to see this event detail. If You🥷🏼 lose🫠 the game🎮 do not be frustrated 😢, click 🔄 New game button Try again !!!  </p> 
    </div>
    <div class = "modalBackground"></div>

    </main>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/diceRolling.js"></script>
    
  </body>
</html>

