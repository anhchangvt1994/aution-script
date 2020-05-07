const $contentBox = $('.Content_box');
let $oThreadMess = $contentBox.find('.o_thread_message ');

const maxPriceToPaid = 500;

const textSplit = 'sp2';
const unitSplit = 'k';

let intCurPriceToPaid = null;
let intTmpCurPriceToPaid = null;
let arrExcludePersonId = ['934','935','936'];
let isStopAutoCmt = false;

const autoAutionScript = function() {
  if($oThreadMess.length <= 0) {
    $oThreadMess = $contentBox02.find('.o_thread_message ');
    autoCmtAutionBot();
    return;
  }

  $.each($oThreadMess, function(intKey, threadMessItem) {
    $threadMessItem = $(threadMessItem);
    const $threadAvatar = $threadMessItem.find('.o_thread_message_avatar');
  
    if($threadAvatar.length <= 0) {return;}
  
    const personId = $threadAvatar[0].dataset.oeId;
    console.log(arrExcludePersonId.indexOf(personId));
    if(!personId) {return;}
    else if(arrExcludePersonId.indexOf(personId) !== -1) {return;}

    const $oThreadMessCore = $threadMessItem.find('.o_thread_message_core');
  
    if($oThreadMessCore.length <= 0) {return;}
  
    let strOThreadMessContent = $oThreadMessCore[0].textContent;
    strOThreadMessContent = strOThreadMessContent.toLowerCase();
  
    if(strOThreadMessContent.indexOf(textSplit) !== -1) {
      let contentSplitWithWishText = strOThreadMessContent.split(textSplit);
  
      if(contentSplitWithWishText.length <= 0) {return;}
  
      contentSplitWithWishText = contentSplitWithWishText[1].trim();
  
      if(contentSplitWithWishText[1].length > 8) {return;}
      const intOtherPrice = Number(contentSplitWithWishText.replace(/\W|_|k/g,''));
      
      if(!intOtherPrice) {return;}
      else if(intOtherPrice >= maxPriceToPaid) {
        isStopAutoCmt = true;
        return;
      }
      else if(intOtherPrice > intCurPriceToPaid) {
        intTmpCurPriceToPaid = intOtherPrice+5;
      }
    }
  });

  if(
    !intTmpCurPriceToPaid ||
    isStopAutoCmt
  ) {
    return;
  }

  intCurPriceToPaid = intTmpCurPriceToPaid;

  const strAutionTxt = textSplit02 + ':' + intCurPriceToPaid02 + unitSplit;

  $contentBox02.append(`<div class="o_thread_message">
    <div class="o_thread_message_sidebar">
      <img src="./image/enzo.jpg" alt="" data-oe-id="938" class="o_thread_message_avatar o_mail_redirect_avatar">
    </div>

    <div class="o_thread_message_core">
      <p>${strAutionTxt}</p>
    </div>
  </div> <!-- .o_thread_message -->`);

  $oThreadMess.remove();
  $oThreadMess = [];
};

autoAutionScript();

const setBotAuto = setInterval(function() {
  if(isStopAutoCmt) {
    clearInterval(setBotAuto);
  }
  
  autoAutionScript();
}, 1000);