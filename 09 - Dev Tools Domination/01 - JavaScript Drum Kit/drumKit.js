let code;
let div;

function removeTransition(e)
{
  console.log(this);
  console.log(e);
  if(e.propertyName !== 'transform')
  {
    return;
  }
  e.target.classList.remove('playing');
}

function playSound(e)
{
  code = e.keyCode;
  let key = e.key;
  const song = document.querySelector(`audio[data-key="${code}"]`);
  div = document.querySelector(`div[data-key="${code}"]`);
  if(!song)
  {
    return;
  }
  div.classList.add('playing');
  song.currentTime = 0;
  song.play();
}
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
// poslouchani mackani klaves, po zmacknuti se spusti funkce playSound
window.addEventListener("keydown", playSound);
