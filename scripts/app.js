console.log("[app.js] loaded");

const egg = new Egg("Guilmon");

const baby = new Baby(egg.name);

const rookie = new Rookie(baby.name);

const champion = new Champion(rookie.name);

const game = new Game(egg);
