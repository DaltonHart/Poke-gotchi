console.log("[classes.js] loaded");

class Egg {
  constructor(name) {
    this.name = name;

    this.alive = true;
    this.warmth = 0;

    this.warmthInterval = 1000 * 20;

    this.evolveThreshold = 1000 * 120;
  }

  checkAlive() {
    if (!this.alive) {
      console.log("You have died");
    }
  }
}

class Baby extends Egg {
  constructor(name) {
    super(name);

    this.hunger = 0;
    this.sleep = 0;
    this.bored = 0;

    this.hungerInterval = 1000 * 50;
    this.sleepInterval = 1000 * 120;
    this.boredInterval = 1000 * 40;

    this.evolveThreshold = 1000 * 240;
  }
}

class Rookie extends Baby {
  constructor(name) {
    super(name);

    this.hungerInterval = 1000 * 40;
    this.sleepInterval = 1000 * 100;
    this.boredInterval = 1000 * 30;

    this.evolveThreshold = 1000 * 400;
  }
}

class Champion extends Rookie {
  constructor(name) {
    super(name);

    this.hungerInterval = 1000 * 20;
    this.sleepInterval = 1000 * 50;
    this.boredInterval = 1000 * 10;

    this.evolveThreshold = 1000 * 500;
  }
}
