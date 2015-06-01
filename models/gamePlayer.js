var mongoose = require('mongoose');

var playerSchema = new mongoose.Schema({
  /* NAMES
   * - trueName is the player's... true name.
   * - displayName is the displayed name in the game, such as
   * if pranked into changing their name. All transactions and
   * actions should refer to trueName, not displayName.
   */
  trueName: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, unique: false },
  /* CHARACTER INFO
   * - job is the player's class (aka job). Can be changed, of
   * course.
   * - gold is the player's total. We may want to implement a
   * bank (in which there would be two totals). For now,
   * there will just be 'gold.'
   * - stat details are in the docs, and are just the name of the
   * stat preceded by 'stat,' like statHP.
   */
   job: { type: String, required: true, unique: false },
   gold: { type: Number },
   /* == STATS == */
   statHP: { type: Number },
   statMP: { type: Number },
   statSTR: { type: Number },
   statDEX: { type: Number },
   statINT: { type: Number },
   statMorality: { type: Number },
   statLuck: { type: Number }
   /* ITEMS
    * Items will be added by id (as a number). Max bag size of 10.
    * bag is the bag, of course.
    */
    bag: [Number]
});

/* == FUNCTIONS == */
playerSchema.methods.getTrueName = function() { return this.trueName; }
playerSchema.methods.getDispName = function() { return this.displayName; }

playerSchema.methods.create = function() {
  // create a new player
}

var playerModel = mongoose.model('Player', playerSchema);

module.exports = playerModel;
