const Taunt = props => {
  const activeTaunts = [...Array(31).keys()].slice(1); //1-30

  let tauntNumber;
  if (Number.isInteger(props.number) && activeTaunts.includes(props.number)) {
    tauntNumber = props.number;
  } else {
    let randomTaunt;
    do {
      randomTaunt = Math.floor(Math.random() * activeTaunts.length);
    } while (!activeTaunts.includes(randomTaunt));
    tauntNumber = randomTaunt;
  }
  if (props.textOnly) {
    return `${taunt[tauntNumber]}`;
  } else {
    return `${tauntNumber}. ${taunt[tauntNumber]}`;
  }
};

const taunt = [];
taunt[1] = 'Yes';
taunt[2] = 'No';
taunt[3] = 'Food please';
taunt[4] = 'Wood please';
taunt[5] = 'Gold please';
taunt[6] = 'Stone please';
taunt[7] = 'Ahh!';
taunt[8] = 'All hail, king of the losers!';
taunt[9] = 'Ooh!';
taunt[10] = "I'll beat you back to Age of Empires";
taunt[11] = '(Herb laugh)';
taunt[12] = 'Ah! being rushed';
taunt[13] = 'Sure, blame it on your ISP';
taunt[14] = 'Start the game already!';
taunt[15] = "Don't point that thing at me!";
taunt[16] = 'Enemy sighted!';
taunt[17] = 'It is good to be the king';
taunt[18] = 'Monk! I need a monk!';
taunt[19] = 'Long time, no siege';
taunt[20] = 'My granny could scrap better than that';
taunt[21] = "Nice town, I'll take it";
taunt[22] = 'Quit touching me!';
taunt[23] = 'Raiding party!';
taunt[24] = 'Dadgum';
taunt[25] = 'Eh, smite me';
taunt[26] = 'The wonder, the wonder, the... no!';
taunt[27] = 'You played two hours to die like this?';
taunt[28] = 'Yeah, well, you should see the other guy';
taunt[29] = 'Roggan';
taunt[30] = 'Wololo';

taunt[31] = 'Attack an enemy now';
taunt[32] = 'Cease creating extra villagers';
taunt[33] = 'Create extra villagers';
taunt[34] = 'Build a navy';
taunt[35] = 'Stop building a navy';
taunt[36] = 'Wait for my signal to attack';
taunt[37] = 'Build a wonder';
taunt[38] = 'Give me your extra resources';

taunt[39] = '(Ally sound)';
taunt[40] = '(Neutral sound)';
taunt[41] = '(Enemy sound)';
taunt[42] = 'What age are you in?';
taunt[43] = 'What is your strategy?';
taunt[44] = 'How many resources do you have?';
taunt[45] = 'Retreat now!';
taunt[46] = 'Flare the location of your army';
taunt[47] = 'Attack in direction of the flared location';
taunt[48] = "I'm being attacked, please help!";
taunt[49] = 'Build a forward base at the flared location';
taunt[50] = 'Build a fortification at the flared location';
taunt[51] = 'Keep your army close to mine and fight with me';
taunt[52] = 'Build a market at the flared location';
taunt[53] = 'Rebuild your base at the flared location';
taunt[54] = 'Build a wall between the two flared locations';
taunt[55] = 'Build a wall around your town';
taunt[56] = "Train units which counter the enemy's army";
taunt[57] = 'Stop training counter units';
taunt[58] = 'Prepare to send me all your resources so I can vanquish our foes!';
taunt[59] = 'Stop sending me extra resources';
taunt[60] = 'Prepare to train a large army, I will send you as many resources as I can spare';
taunt[61] = 'Attack player 1! (Blue)';
taunt[62] = 'Attack player 2! (Red)';
taunt[63] = 'Attack player 3! (Green)';
taunt[64] = 'Attack player 4! (Yellow)';
taunt[65] = 'Attack player 5! (Cyan)';
taunt[66] = 'Attack player 6! (Purple)';
taunt[67] = 'Attack player 7! (Gray)';
taunt[68] = 'Attack player 8! (Orange)';
taunt[69] = 'Delete the object on the flared location';
taunt[70] = 'Delete your excess villagers';
taunt[71] = 'Delete excess warships';
taunt[72] = 'Focus on training infantry units';
taunt[73] = 'Focus on training cavalry units';
taunt[74] = 'Focus on training ranged units';
taunt[75] = 'Focus on training warships';
taunt[76] = 'Attack the enemy with Militia';
taunt[77] = 'Attack the enemy with Archers';
taunt[78] = 'Attack the enemy with Skirmishers';
taunt[79] = 'Attack the enemy with a mix of Archers and Skirmishers';
taunt[80] = 'Attack the enemy with Scout Cavalry';
taunt[81] = 'Attack the enemy with Men-at-Arms';
taunt[82] = 'Attack the enemy with Eagle Scouts';
taunt[83] = 'Attack the enemy with Towers';
taunt[84] = 'Attack the enemy with Crossbowmen';
taunt[85] = 'Attack the enemy with Cavalry Archers';
taunt[86] = 'Attack the enemy with Unique Units';
taunt[87] = 'Attack the enemy with Knights';
taunt[88] = 'Attack the enemy with Battle Elephants';
taunt[89] = 'Attack the enemy with Scorpions';
taunt[90] = 'Attack the enemy with Monks';
taunt[91] = 'Attack the enemy with Monks and Mangonels';
taunt[92] = 'Attack the enemy with Eagle Warriors';
taunt[93] = 'Attack the enemy with Halberdiers and Rams';
taunt[94] = 'Attack the enemy with Elite Eagle Warriors';
taunt[95] = 'Attack the enemy with Arbalests';
taunt[96] = 'Attack the enemy with Champions';
taunt[97] = 'Attack the enemy with Galleys';
taunt[98] = 'Attack the enemy with Fire Galleys';
taunt[99] = 'Attack the enemy with Demolition Rafts';
taunt[100] = 'Attack the enemy with War Galleys';
taunt[101] = 'Attack the enemy with Fire Ships';
taunt[102] = 'Attack the enemy with Unique Warships';
taunt[103] = 'Use an Onager to cut down trees at the flared location';
taunt[104] = "Don't resign!";
taunt[105] = 'You can resign again';

export default Taunt;
