$(function () {

//variables selector
    var container = $('#container');
    var square = $('#square');
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');

//Inits
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var square_left = parseInt(square.css('left'));
    var square_height = parseInt(square.height());
    var speed = 10;
    var go_up = false;
    var score_updated = false;
    var game_over = false;


    var the_game = setInterval(function () {
        if (collision(square, pole_1) || collision(square, pole_2) || parseInt(square.css('top')) <= 0 || parseInt(square.css('top')) > container_height - square_height) {

            stop_the_game();

        } else {

            var pole_current_position = parseInt(pole.css('right'));
            //if poles poles passed the square updates score!!!!
            if (pole_current_position > container_width - square_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 1);
                    score_updated = true;
                }
            }

//if poles went out of container
            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);

//modifies the poles hight
                pole_1.css('height', pole_initial_height + new_height);
                pole_2.css('height', pole_initial_height - new_height);

                //increase speed
                speed = speed + 1;
                speed_span.text(speed);

                score_updated = false;

                pole_current_position = pole_initial_position;
            }

//
            pole.css('right', pole_current_position + speed);
            if (go_up === false) {
                go_down();
            }
        }
    }, 40);

//Mouse and keyboard input
$('#container').on('mousedown', function () { //Mouse click On
        if (go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    }); 

$('#container').on('mouseup', function () { //Mouse click On
            clearInterval(go_up);
            go_up = false;
    }); 

    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

//
    function go_down() {
        square.css('top', parseInt(square.css('top')) + 5);
    }

    function up() {
        square.css('top', parseInt(square.css('top')) - 10);
    }
//stop the game
    function stop_the_game() {
        clearInterval(the_game);
        game_over = true;
        restart_btn.slideDown();
    }

    restart_btn.click(function () {
        location.reload();
    });


// collision check the coordinates left and top of the first element against the second element.
    function collision($elm1, $elm2) {
        var x1 = $elm1.offset().left;
        var y1 = $elm1.offset().top;
        var h1 = $elm1.outerHeight(true); // to get the margin of the element
        var w1 = $elm1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $elm2.offset().left;
        var y2 = $elm2.offset().top;
        var h2 = $elm2.outerHeight(true);
        var w2 = $elm2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
});


//-------------------------------------------------

// $(document).keydown(function(event){
    //  console.log(event.keyCode)
    //  // var key = event.keyCose;
    //  if (event.keyCode == 39){
    //          $('.square').css('left', '+=10');
    //  }else if (event.keyCode == 37){
    //      $('.square').css('left', '-=10');
    //  }
    //  switch(event.keyCode){
    //      case 32: //space
    //      return function shoot (){
    //      $('.square').append("<div class=bullet></div>");
    //      $('.bullet').css('left', '+=50');
    //      };

    //      // break;
    //      case 39: //righ
    //          if ($('.square').css('left') > 100%) {
    //          $('.square').css('left', '+=10');
    //      };
    //          // break;
    //      case 37: //left
    //          $('.square').css('left', '-=10');
    //  }
    // })
    

    // $('#right').on('click', function(){
    //  $('.square').css('left', '+=10');
    // })

    // $('#left').on('click', function(){
    //  $('.square').css('left', '-=10');
    // })
