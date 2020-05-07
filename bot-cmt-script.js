const $contentBox02 = $('.Content_box');
let $oThreadMess02 = $contentBox02.find('.o_thread_message ');

const arrAvatarName = ['nobita.jpg','doraemon.jpg','sizuka.jpg','suneo.jpg','chaien.png'];
const arrBotId = [934,935,936,937,938];

const maxPriceToPaid02 = 100000;

const textSplit02 = 'sp2';
const unitSplit02 = 'k';

let intCurPriceToPaid02 = null;
let intTmpCurPriceToPaid02 = null;
let arrExcludePersonId02 = [];

const autoCmtAutionBot = function() {
  if($oThreadMess02.length <= 0) {
    $oThreadMess02 = $contentBox02.find('.o_thread_message ');
    autoCmtAutionBot();
    return;
  }

  $.each($oThreadMess02, function(intKey, threadMessItem) {
    $threadMessItem = $(threadMessItem);
    const $threadAvatar = $threadMessItem.find('.o_thread_message_avatar');

    if($threadAvatar.length <= 0) {return;}

    const personId = $threadAvatar[0].dataset.oeId;

    if(!personId) {return;}
    else if(arrExcludePersonId02.indexOf(personId) !== -1) {return;}

    const $oThreadMessCore = $threadMessItem.find('.o_thread_message_core');

    if($oThreadMessCore.length <= 0) {return;}

    let strOThreadMessContent = $oThreadMessCore[0].textContent;
    strOThreadMessContent = strOThreadMessContent.toLowerCase();

    if(strOThreadMessContent.indexOf(textSplit02) !== -1) {
      let contentSplitWithWishText = strOThreadMessContent.split(textSplit02);

      if(contentSplitWithWishText.length <= 0) {return;}

      contentSplitWithWishText = contentSplitWithWishText[1].trim();

      if(contentSplitWithWishText[1].length > 8) {return;}
      const intOtherPrice = Number(contentSplitWithWishText.replace(/\W|_|k/g,''));

      if(!intOtherPrice) {return;}

      intTmpCurPriceToPaid02 = intOtherPrice+5;
    }
  });

  intCurPriceToPaid02 = intTmpCurPriceToPaid02;
  const strAvatarUrl = './image/' + arrAvatarName[Math.floor(Math.random() * 5)];
  const intBotId = arrBotId[Math.floor(Math.random() * 5)];
  const strAutionTxt = textSplit02 + ':' + intCurPriceToPaid02 + 'K';

  console.log('----------------------------');
  console.log(intBotId);
  console.log('----------------------------');

  $contentBox02.append(`<div class="o_thread_message">
    <div class="o_thread_message_sidebar">
      <img src="${strAvatarUrl}" alt="" data-oe-id="${intBotId}" class="o_thread_message_avatar o_mail_redirect_avatar">
    </div>

    <div class="o_thread_message_core">
      <p>${strAutionTxt}</p>
    </div>
  </div> <!-- .o_thread_message -->`);

  $oThreadMess02 = [];
};

autoCmtAutionBot();

const setBotAutoCmt = setInterval(function() {
  autoCmtAutionBot();
},5000);