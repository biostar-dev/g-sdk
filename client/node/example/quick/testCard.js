const card = require('../card');

const NUM_OF_NEW_BLACKLIST = 2;
const	FIRST_BLACKLISTED_CARD_ID = 100000;
const ISSUE_COUNT = 3;

function makeCardInfos() {
  var cardInfos = [];

  for(i = 0; i < NUM_OF_NEW_BLACKLIST; i++) {
    let item = new card.cardMessage.BlacklistItem();
    item.setCardid(Buffer.from(`${FIRST_BLACKLISTED_CARD_ID + i}`, 'utf-8'));
    item.setIssuecount(ISSUE_COUNT);

    cardInfos.push(item);
  }

  return cardInfos;
}

function test(devID) {
	console.log('>>> Scan a card...');

  return card.scan(devID)
  .then((cardData) => {
    console.log('Card: ', cardData);
    return card.getBlacklist(devID);
  })
  .then((blacklist) => {
    console.log('Initial blacklist: ', blacklist);

    return card.addBlacklist(devID, makeCardInfos());
  })
  .then(() => {
    return card.getBlacklist(devID);
  })
  .then((blacklist) => {
    console.log('Blacklist after adding new items: ', blacklist);

    return card.deleteBlacklist(devID, makeCardInfos());
  })
  .then(() => {
    return card.getBlacklist(devID);
  })
  .then((blacklist) => {
    console.log('Blacklist after deleting new items: ', blacklist);

    return card.getConfig(devID);
  })
  .then((config) => {
    console.log('Card config: ', config);
  })
  .catch((err) => {
    console.error('Cannot finish the card test: ', err);
    throw err;
  });
}

module.exports.test = test;