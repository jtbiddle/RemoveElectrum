Hooks.on('renderActorSheet5eCharacter', (sheet, html) => {
  html.find('.denomination.ep').remove();
  html.find('[name="data.currency.ep"]').remove();
});

Hooks.on('renderTidy5eSheet', (sheet, html) => {
    html.find('.denomination.ep').parent().remove();
    html.find('.denomination.ep').remove();
    html.find('[name="data.currency.ep"]').remove();
});
Hooks.on('renderDNDBeyondCharacterSheet5e', (sheet, html) => {
  html.find('.denomination.ep').remove();
  html.find('[name="data.currency.ep"]').remove();
});

Hooks.once('ready', () => {
  CONFIG.Actor.sheetClasses.character['dnd5e.ActorSheet5eCharacter'].cls.prototype._onConvertCurrency = _onMyConvertCurrency;
});

  function _onMyConvertCurrency(event) {
    event.preventDefault();
    const curr = duplicate(this.actor.data.data.currency);
    console.log(curr);
    var currentElectrum = this.actor.data.data.currency['ep']; 
    var goldToAdd = Math.floor(currentElectrum/5);
    var silverToAdd = currentElectrum % 5 * 5; 

    curr['gp'] += goldToAdd;
    curr['sp'] += silverToAdd;
    curr['ep'] = 0;

    if(currentElectrum > 0){
      ui.notifications.info(`${this.actor.name} has ${currentElectrum} electrum. Converted to ${goldToAdd} gold and ${silverToAdd} silver.`);
    }
    return this.actor.update({"data.currency": curr});
 };

 function getTargetActor() {
  const character = game.user.character;
  if (character != null)
      return character;

  const controlled = canvas.tokens.controlled;

  if (controlled.length === 0) return character || null;

  if (controlled.length > 0 && controlled[0] != null) {
      return controlled[0].actor;
  }
}
