

     <div id="loading">
     </div>


<!-- ======================================================================== C A R O U S E L -->

<?php include('slideshow.php'); ?>

<!-- ======================================================================== N A V I G A T I O N -->

<?php include('navigation.php'); ?>
<div class="hideme content">
<!-- ======================================================================== Q U I Z -->

  <div id="eventQuiz" >
  <h5 class="sectionHeader">Make a date!</h5>
      <div class="quiz-page">
      <div class="background"></div>
        <div id="question"></div>
        <div id="progress"></div>
        <div id="choices">
            <div class="choice" id="A"></div>
            <div class="choice" id="B"></div>
            <div class="choice" id="C"></div>
            <div class="choice" id="D"></div>
            <div class="choice" id="E"></div>
        </div>
      </div>
      
      <!-- finish all quiz button -->
      <div id="generateOutcome">
        <input class='generateOutcome hiden' type='submit' value = 'Generate Outcome!'>
      </div>
      <!-- render the quiz outcome -->
      <div class="userChoose"></div>
      <section id = "filteredRecords">
      
      </section>

      <!-- select a date -->
      <div id="modal">
        <button class="close-modal">&times;</button>
        <h1>Choose a free time 🥰 </h1>
        <form>
        <label for="date"></label>
          <input id="dateSelect" type="date" name = "date" reuqired>
          <button id="submit" type="button">submit </button>
        </form>      
    </div>
    <div class = "fuzzy"></div>
    <div id="quizLoading" ></div>
  </section>
<!-- ========================================================================= G A M E -->
<!-- not it -->
<?php include('gameHome.php'); ?>

<!-- ======================================================================== A B O U T    P A G E -->

<?php include('aboutHome.php'); ?>

<!-- ======================================================================== E V E N T    L I S T -->

  <section id="records">
    <h5 class="sectionHeader">Popular Events</h5>
    <form id="filter">
          <input id="filter-text" type="text" placeholder="Search..."value=""></input>
    </form>
  </section>



  <!-- ======================================================================== J A V A S C R I P T    L I N K S -->
</div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/script.js"></script>
    <script src="js/carousel.js"></script>
    <script src="js/stickynav.js"></script>
    <script src="js/fade-in.js"></script>
    <script type="text/javascript" src="brisbane-city-council.json"></script>
    <script type='text/javascript' src='https://platform-api.sharethis.com/js/sharethis.js#property=634fa98ad9431f001240b4ee&product=inline-share-buttons' async='async'></script>

  
  </body>
</html>
