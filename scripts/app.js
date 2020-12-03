console.log("[app.js] loaded");

let game;

$("#nickname").click(function () {
  const gastly = new Egg($("#nickname_input").val() || "gastly");
  game = new Game(gastly);
  game.start();
  $("#modal-start").css("display", "none");
});
