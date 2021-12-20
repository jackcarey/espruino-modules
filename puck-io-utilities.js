/* Turn an LED on or off. Returns the current state.
* num: 1-3 for R,G,B
* val: optional boolean for on or off.
*/
function LED(num, LEDval) {
  let selected = [LED1, LED2, LED3][num - 1];
  if (LEDval == null || LEDVal == undefined) {
    let res = digitalRead(selected);
    return res;
  } else {
    digitalWrite(selected, LEDval ? 1 : 0);
    return LEDval ? 1 : 0;
  }
}
/* Toggle an LED.
* num: 1-3 for R,G,B
*/
function ToggleLED(num) { LED(num, !LED(num)); }
/* Blink an LED a set number of times
* num: 1-3 for R,G,B
* ms: on/off duration
* reps: number of times to turn on
*delay: in ms
*/
function Blink(num, ms, reps, delay) {
  num = num ? num : 1;
  ms = ms ? ms : 500;
  reps = reps ? reps : 1;
  delay = delay ? delay : 0;
  let thisIntvl;
  let i = 0;
  function fn() {
    if (i == 0) {
      LED(num, 1);
    } else if (i >= (reps * 2) - 1) {
      LED(num, 0);
      thisIntvl = UpdateInterval(thisIntvl, -1);
    } else {
      ToggleLED(num);
    }
    i++;
  }
  setTimeout(function () {
    thisIntvl = UpdateInterval(fn, ms);
  }, delay);
}

//internal function for rounding values
function _round(val, places) {
  places = (places == undefined || places == null || isNaN(places) || places <= 0) ? 0 : places;
  let shift = 10 * places;
  let result = places == 0 ? Math.round(val) : Math.round(shift * val) / shift;
  //print("round",val,"to",places,"d.p. is",result);
  return result;
}

/* Return the light sensor value as a percentage
* places: the number of places to round to
*/
function Light(places) {
  return _round(100 * Puck.light(), places ? places : 1);
}

/* Return the temp sensor value in degrees C.
* places: the number of places to round to
*/
function Temp(places) {
  return _round(E.getTemperature(), places ? places : 1);
}

export default { LED, ToggleLED, Blink, Light, Temp };
