let round = 1;
let current_team = true; //A
let a_score = 0;
let b_score = 0;
let check_last = 0;
let a0 = Array.apply(null, Array(9)).map(Number.prototype.valueOf, 1);
let a1 = Array.apply(null, Array(9)).map(Number.prototype.valueOf, 1);
let a2 = Array.apply(null, Array(9)).map(Number.prototype.valueOf, 1);
let a3 = Array.apply(null, Array(9)).map(Number.prototype.valueOf, 1);

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

document.addEventListener("DOMContentLoaded", function() {
  for(let i=0;i<9;i++){
    if(a.includes(i)){
      a0[i] = 0;
    }
    if(b.includes(i)){
      a1[i] = 0;
    }
    if(c.includes(i)){
      a2[i] = 0;
    }
    if(d.includes(i)){
      a3[i] = 0;
    }
  }
  for(let i=0;i<9;i++){
    if(a0[i] == 0){
      $(".a" + i).addClass("bomb_a");
    } else {
      $(".a" + i).addClass("right_a");
    }
  }
  for(let i=0;i<9;i++){
    $(".w" + i).html(pictures[w[i]]);
  }
  $("#next_round").on("click", function(){
    check_last = 0;
    $(".item").attr("style", "background-color: none");
    for(let i=0;i<9;i++){
        $(".a" + i).attr("class", "a" + i);
    }
    for(let i=0;i<9;i++){
      if(round === 1){
        var next_answer = a1;
      } else if (round === 2){
        var next_answer = a2;
      } else {
        var next_answer = a3;
      }
      if(next_answer[i] == 0){
        $(".a" + i).addClass("bomb_a");
      } else {
        $(".a" + i).addClass("right_a");
      }
    } 
    for(let i=0;i<9;i++){
      $(".w" + i).html(pictures[w[i + round*9]]);
    }
    round++;
    $("#round_span").html(round);
    if(round === 4) {
      $("#next_round").attr("disabled", true);
    }
    if(round % 2 === 0){
      current_team = false;
      $("#current_team").html("B");
    } else {
      current_team = true;
      $("#current_team").html("A");
    }
  });
  $("#answer").on("dblclick", function(){
    $(this).toggleClass("clicked");
    if(round !== 4){
      $("#next_round").prop("disabled", function(i, v) { return !v; });
    }
    for(let i=0;i<9;i++){
      if(round === 1){
        var current_answer = a0;
      } else if (round === 2){
        var current_answer = a1;
      } else if (round === 3){
        var current_answer = a2;
      } else {
        var current_answer = a3;
      }
      if(current_answer[i] == 0){
        $(".a" + i).parent(".item").toggleClass("bomb");
      }
    }
  });
  $("body").on("dblclick", ".bomb_a", function(){
    if(!$(this).hasClass("disabled")){
      $(this).parent(".item").attr("style", "background-color: rgb(107, 88, 5); border-color: black; opacity: 0.2");
      $(this).parent(".item").animate({opacity: "1"}, 600);
      $(this).addClass("disabled");
      if(current_team){
        a_score--;
        $("#a_score").html(a_score);
      } else {
        b_score--;
        $("#b_score").html(b_score);
      }
      current_team ? $("#current_team").html("B") : $("#current_team").html("A");
      current_team = !current_team;
    }
  });
  $("body").on("dblclick", ".right_a", function(){
    if(!$(this).hasClass("disabled")){
      $(this).parent(".item").attr("style", "background-color: rgb(14, 209, 235); border-color: rgb(200, 200, 200); opacity: 0.2");
      $(this).parent(".item").animate({opacity: "1"}, 800);
      $(this).addClass("disabled");
      check_last++;
      if(current_team){
        if(check_last === 6) {
          a_score += 2;
        }
        a_score++;
        $("#a_score").html(a_score);
      } else {
        if(check_last === 6) {
          b_score += 2;
        }
        b_score++;
        $("#b_score").html(b_score);
      }
    }
  });
  $("#change_team").on("click", function(){
    current_team ? $("#current_team").html("B") : $("#current_team").html("A");
    current_team = !current_team;
  });
  $(".adjust_link").on("click", function(){
    $(".adjust").fadeToggle("slow");
  });
  $(".a_minus").on("click", function(){
    a_score--;
    $("#a_score").html(a_score);
  });
  $(".b_minus").on("click", function(){
    b_score--;
    $("#b_score").html(b_score);
  });
  $(".a_plus").on("click", function(){
    a_score++;
    $("#a_score").html(a_score);
  });
  $(".b_plus").on("click", function(){
    b_score++;
    $("#b_score").html(b_score);
  });
  $(function() {
    $("#qrcode").qrcode({
      text: window.location.href,
      render: "canvas",
      width: 300,
      height: 300
    });
  });
  $("#qrcode_link").on("click", function() {
    $("#qrcode").slideToggle("slow");
  });
});
