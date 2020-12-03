console.log("[classes.js] loaded");

class Egg {
  constructor(name) {
    this.name = name;

    this.alive = true;
    this.warmth = 100;
    this.image = "assets/egg.png";

    this.warmthIntervalValue = 1000 * 2;

    this.evolveThreshold = 1000 * 120;

    this.nextLevel = Baby;
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

  generateStats() {
    const $buttons = $("#buttons");
    const $stats = $("#stats");

    $buttons.append(`<button id="warmth-button" type="button" class="nes-btn is-error">
          <i class="fas fa-thermometer-half"></i>
        </button>`);

    $stats.append(`<section id="warmth" class="stat">
          <progress
            class="nes-progress is-error"
            value="100"
            max="100"
          ></progress>
        </section>`);

    this.warmthTimer();
  }
}

class Baby extends Egg {
  constructor(name) {
    super(name);

    this.hunger = 100;
    this.sleep = 100;
    this.bored = 100;

    this.image = "assets/baby.png";

    this.hungerIntervalValue = 1000 * 50;
    this.sleepIntervalValue = 1000 * 120;
    this.boredIntervalValue = 1000 * 40;

    this.evolveThreshold = 1000 * 240;

    this.nextLevel = Rookie;
  }

  generateStats() {
    const $buttons = $("#buttons");
    const $stats = $("#stats");

    $buttons
      .empty()
      .append(
        `<button id="sleep-button" type="button" class="nes-btn is-error">
          <i class="fas fa-bed"></i>
        </button>`
      )
      .append(
        `<button type="button" class="nes-btn is-primary">
          <i class="fas fa-dice"></i>
        </button>`
      ).append(`<button type="button" class="nes-btn is-success">
          <i class="fas fa-bread-slice"></i>
        </button>`);

    $stats
      .empty()
      .append(
        `<section id="sleep" class="stat">
          <progress
            class="nes-progress is-error"
            value="100"
            max="100"
          ></progress>
        </section>`
      )
      .append(
        `<section id="boredom" class="stat">
          <progress
            class="nes-progress is-primary"
            value="100"
            max="100"
          ></progress>
        </section>`
      ).append(`<section id="hunger" class="stat">
          <progress
            class="nes-progress is-success"
            value="100"
            max="100"
          ></progress>
        </section>`);
  }
}

class Rookie extends Baby {
  constructor(name) {
    super(name);

    this.image = "assets/rookie.png";

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

    this.image = "assets/champion.png";

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
    this.updateImage();
    this.pokemon.generateStats();
    this.startTimer();
  }

  updateImage() {
    $(".creature img").attr("src", this.pokemon.image);
  }

  startTimer() {
    this.totalTimeInterval = setInterval(() => {
      this.totalTime = this.totalTime + 1000;
      if (this.totalTime >= this.pokemon.evolveThreshold) {
        this.totalTime = 0;
        this.pokemon = new this.pokemon.nextLevel(this.pokemon.name);
        this.updateImage();
        this.pokemon.generateStats();
      }
    }, 1000);
  }
}
