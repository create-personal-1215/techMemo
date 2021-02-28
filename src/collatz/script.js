
var messageSpan;
var inputArea;

window.addEventListener('load', function(e){
  init();
  
  // イベント定義
  addEvent();
});

function init(){
  messageSpan = document.getElementById('message');
  inputArea = document.getElementById('inputN');
}

/**
 * イベントを定義する。
 */
function addEvent(){

  // 計算開始ボタン押下時
  var calcBtn = document.getElementById('calcBtn');
  calcBtn.addEventListener('click', function(e){
    
    var firstVal = parseInt(inputArea.value, 10);
    if(firstVal.length == 0 || firstVal <= 0){
      return;
    }
    console.log('calcurate start.');
    
    var calcResultList = calcurate(firstVal);

    console.log('result');
    console.log(calcResultList);
    showLineGraph(calcResultList);
    messageSpan.textContent = calcResultList.length + '回で収束しました。';
  });
}

/**
 * コラッツ問題のルールに基づき計算を行う。
 * @param {integer} firstVal 初期値 
 */
function calcurate(firstVal){
  var val = firstVal;
  var calcResultList = [];
  
  while (val > 1) {
    calcResultList.push(val);
    if(val % 2 == 0){
      val = val / 2;
    }else{
      val = (val * 3) + 1;
    }
  }
  calcResultList.push(val);

  return calcResultList;
}

/**
 * 折れ線グラフを表示する。
 * @param {array} calcResultList 計算結果
 */
function showLineGraph(calcResultList){
  var dataClumn = [...calcResultList];
  dataClumn.unshift('value');

  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: [
        dataClumn
      ]
    }
  });
}
