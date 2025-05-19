document.querySelector('.header-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#introduction').scrollIntoView({ behavior: 'smooth' });
  });