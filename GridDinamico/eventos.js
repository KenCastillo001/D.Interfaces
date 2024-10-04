

let boton1 = document.getElementById('boton1');
let imagenes1 = document.querySelectorAll('.contenedor2 img');


boton1.addEventListener('click', function() {
  
  imagenes1.forEach(function(imagen) {
   if( imagen.style.borderRadius === '50%'){
       imagen.style.borderRadius = '8%'
   }else{
    imagen.style.borderRadius = '50%'

   };
    if(imagen.style.border === "5px solid #000"){
      imagen.style.border = "none"
    }else{
      imagen.style.border = "5px solid #000"
    };  
  }); 
});




let boton2 = document.getElementById('boton2');
let contenedor2 = document.querySelector('.contenedor2');

boton2.addEventListener('click', function() {
    
    if (contenedor2.style.gridTemplateColumns === 'repeat(3, 1fr)') {
        contenedor2.style.gridTemplateColumns = 'repeat(2, 1fr)'
    } else {
        contenedor2.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
});





let boton3 = document.getElementById('boton3');
let imagenes = document.querySelectorAll('.contenedor2 img');
boton3.addEventListener('click', function() {
  imagenes.forEach(function(imagen) {
      if (imagen.style.filter === 'grayscale(100%)') {
          imagen.style.filter = 'none'; 
      } else {
          imagen.style.filter = 'grayscale(100%)'; 
      }
  });


})

let boton4 = document.getElementById('boton4');
let colorOriginal = document.body.style.backgroundColor || 'gold'; 

boton4.addEventListener('click', function() {
    
    if (document.body.style.backgroundColor === 'grey') {
        document.body.style.backgroundColor = colorOriginal; 
    } else {
        document.body.style.backgroundColor = 'grey'; 
    }
});


