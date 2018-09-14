//const apiRoot = "https://659ae2add3a45f48ba3b672a133a9750.resindevice.io";
const apiRoot = "";

const alerts = {
  messageSendSuccess: $("#alert-message-send-success"),
  messageSendFail: $("#alert-message-send-fail")
}

function setupHandlers() {
  $("#post-message").on("submit", postMessage);
}

$(function() {
  setupHandlers();
});

function postMessage(e) {
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