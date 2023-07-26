function scrollCheck() {
  if (window.scrollY >= 50) {
    document.getElementById('#return-to-top').style.setProperty('display', 'block');
  } else {
    document.getElementById('#return-to-top').style.setProperty('display', 'none');
  }
};

function returnToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
};