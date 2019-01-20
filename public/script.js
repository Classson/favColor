console.log('connected')

const colorChange = (event) => {
  console.log(event.target.id)
}

const userButtons = document.getElementById('test');

userButtons.addEventListener('click', colorChange);


// userButtons.addEventListener('click', colorChange());
