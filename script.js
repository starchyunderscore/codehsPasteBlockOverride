const EVENT_OPTIONS = {bubbles: true, cancelable: false, composed: true};
const EVENTS = {
  BLUR: new Event("blur", EVENT_OPTIONS),
  CHANGE: new Event("change", EVENT_OPTIONS),
  INPUT: new Event("input", EVENT_OPTIONS),
};

function overrideListeners(eventType) {
  window.addEventListener(eventType, function(event) {
      event.stopImmediatePropagation();
  }, true);
}

var inputDiv = document.createElement("div"),
    inputText = document.createElement("textarea"),
    inputButton = document.createElement("button");

try {
  console.log("TRY BLOCK START");
  overrideListeners("cut");
  overrideListeners("copy");
  overrideListeners("paste");
  var ACE_SCROLLER = document.getElementsByClassName("ace_scroller")[0];
  console.log(ACE_SCROLLER);
  if (ACE_SCROLLER != undefined) {
    console.log("ACE_SCROLLER PASSED");
    document.getElementsByTagName("body")[0].appendChild(inputDiv);
    inputDiv.appendChild(inputText);
    inputDiv.appendChild(inputButton);
    inputButton.textContent = "⤶";
    inputButton.style.color = "#fff";
    inputButton.style.background = "#000";
    inputText.style.color = "#fff";
    inputText.style.background = "#000";
    inputDiv.style.position = "absolute";
    inputDiv.style.top = "60px";
    inputDiv.style.left = "0px";
    inputDiv.style.zIndex = "2147483647";
    document.getElementsByClassName("ace_scroller")[0].addEventListener("click", (event) => {
      var inputElement = document.getElementById("ace_text-input-textarea");
      inputText.value = inputElement.value;
    });
    inputButton.addEventListener("click", (event) => {
      var text = inputText.value ;
      var inputElement = document.getElementById("ace_text-input-textarea");
      inputElement.value = text;
      var tracker = inputElement._valueTracker
      tracker && tracker.setValue(text);
      inputElement.dispatchEvent(EVENTS.INPUT);
      inputElement.dispatchEvent(EVENTS.BLUR);
    });
  } else {
    console.log("ACE_SCROLLER UNDEFINED");
  }
} catch {
  console.log("TRY FAILED");
}
