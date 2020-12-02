console.log("[classes.js] loaded");

class Egg {
  constructor(name) {
    this.name = name;

    this.alive = true;
    this.warmth = 100;
    this.image = "assets/egg.png";

    this.warmthIntervalValue = 1000 * 20;

    this.evolveThreshold = 1000 * 120;

    this.nextLevel = Baby;
  }

  isAlive() {
    if (!this.alive) {
      console.log("You have died");
    }
  }

  increaseWarmth() {
    this.warmth = this.warmth + 10;
    $("#warmth progress").attr("value", this.warmth);
  }

  decreaseWarmth() {
    if (this.warmth > 0) this.warmth = this.warmth - 10;
    if (this.warmth === 0) {
      $("#modal").css("display", "flex");
    }
    $("#warmth progress").attr("value", this.warmth);
  }

  warmthTimer() {
    this.warmthInterval = setInterval(
      () => this.decreaseWarmth(),
      this.warmthIntervalValue
    );

    $("#warmth-button").click(() => this.increaseWarmth());
  }
}

class Baby extends Egg {
  constructor(name) {
    super(name);

    this.hunger = 0;
    this.sleep = 0;
    this.bored = 0;

    this.hungerIntervalValue = 1000 * 50;
    this.sleepIntervalValue = 1000 * 120;
    this.boredIntervalValue = 1000 * 40;

    this.evolveThreshold = 1000 * 240;

    this.nextLevel = Rookie;
  }
}

class Rookie extends Baby {
  constructor(name) {
    super(name);

    this.hungerIntervalValue = 1000 * 40;
    this.sleepIntervalValue = 1000 * 100;
    this.boredIntervalValue = 1000 * 30;

    this.evolveThreshold = 1000 * 400;

    this.nextLevel = Champion;
  }
}

class Champion extends Rookie {
  constructor(name) {
    super(name);

    this.hungerIntervalValue = 1000 * 20;
    this.sleepIntervalValue = 1000 * 50;
    this.boredIntervalValue = 1000 * 10;

    this.evolveThreshold = 1000 * 500;
  }
}

class Game {
  constructor(pokemon) {
    this.pokemon = pokemon;

    this.totalTime = 0;
  }

  start() {
    console.log($(".creature img"));
    $(".creature img").attr("src", this.pokemon.image);
    this.pokemon.warmthTimer();
    this.startTimer();
  }

  startTimer() {
    this.totalTimeInterval = setInterval(() => {
      this.totalTime = this.totalTime + 1000;
      if (this.totalTime >= this.pokemon.evolveThreshold) {
        this.totalTime = 0;
        this.pokemon = new this.pokemon.nextLevel(this.pokemon.name);
      }
    }, 1000);
  }
}
