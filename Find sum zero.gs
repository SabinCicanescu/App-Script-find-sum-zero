function findZeroSumCombinationsT() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Fill range (e.g., A1:B2)', ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() == ui.Button.OK) {
    var range = response.getResponseText();
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var values = sheet.getRange(range).getValues().flat();
}
  
  var result = [];
  findCombinations(values, [], 0, result);
  
  Logger.log(result);
  SpreadsheetApp.getUi().alert("Combinations found: " + result);

  for (var i = 0; i < result.length; i++) {
    sheet.getRange(i + 2, 6).setValue(result[i].join(", ")); //adjust the range to your needs
  }
}

function findCombinations(values, currentCombination, startIndex, result) {
  var sum = currentCombination.reduce((a, b) => a + b, 0);
  if (sum === 0 && currentCombination.length > 0) {
    result.push(currentCombination.slice());
  }
  for (var i = startIndex; i < values.length; i++) {
    currentCombination.push(values[i]);
    findCombinations(values, currentCombination, i + 1, result);
    currentCombination.pop();
  }
}


