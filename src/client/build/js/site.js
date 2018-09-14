//const apiRoot = "https://659ae2add3a45f48ba3b672a133a9750.resindevice.io";
const apiRoot = "";

const alerts = {
  messageSendSuccess: $("#alert-message-send-success"),
  messageClearSuccess: $("#alert-message-clear-success"),
  messageSendFail: $("#alert-message-send-fail"),
  messageClearFail: $("#alert-message-clear-fail")
}

function setupHandlers() {
  $("#post-message").on("submit", postMessageToDevice);
  $("#clear-message").on("click", clearMessage);
}

$(function() {
  setupHandlers();
});

function postMessageToDevice(e) {
  if(!e.preventDefault) return;
  e.preventDefault();
  var data = $("#post-message").serialize();
  $.ajax({
    type: "POST",
    data: data,
    url: `${apiRoot}/api/message`
  }).done(function() {
    showAlert(alerts.messageSendSuccess, 3000);
  }).fail(function() {
    console.error("failed to send");
    console.log(arguments);
    showAlert(alerts.messageSendFail, 5000);
  });
}

function showAlert(alert, time) {
  alert.show();
  setTimeout(function() { alert.hide() }, time);
}

function clearMessage() {
  $.ajax({
    type: "POST",
    url: `${apiRoot}/api/clearMessage`
  }).done(function() {
    showAlert(alerts.messageClearSuccess, 3000);
  }).fail(function() {
    console.error("failed to send");
    console.log(arguments);
    showAlert(alerts.messageClearFail, 5000);
  });
}