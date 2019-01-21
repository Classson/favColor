console.log('connected')

const colorChange = (event) => {
  if(event.target.className === 'name'){
    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = event.target.id;
  }
}

const userGrid = document.getElementById('allUsers');

userGrid.addEventListener('click', colorChange);
