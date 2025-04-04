const validateName = (name) => {
  if(!name) return false;
  let lengthValid = name.trim().length >= 3 && name.trim().length <= 80;
  return lengthValid;
}

const validateEmail = (email) => {
  if (!email) return false;
  let lengthValid = email.length > 15;

  // validamos el formato
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // devolvemos la l├│gica AND de las validaciones.
  return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return true;
  // validaci├│n de longitud
  let lengthValid = phoneNumber.length >= 8;

  // validaci├│n de formato
  let re = /^[0-9]+$/;
  let formatValid = re.test(phoneNumber);

  // devolvemos la l├│gica AND de las validaciones.
  return lengthValid && formatValid;
};

const validateFiles = (files) => {
  if (!files) return false;

  // validaci├│n del n├║mero de archivos
  let lengthValid = 1 <= files.length && files.length <= 3;

  // validaci├│n del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    // el tipo de archivo debe ser "image/<foo>" o "application/pdf"
    let fileFamily = file.type.split("/")[0];
    typeValid &&= fileFamily == "image" || file.type == "application/pdf";
  }

  // devolvemos la l├│gica AND de las validaciones.
  return lengthValid && typeValid;
};

const validateSelect = (select) => {
  if(!select) return false;
  return true
}

const validateYears = (years) => {
  if (!years) return false;
  // validaci├│n de longitud
  let numberValid = years >= 1 && years <= 99;

  return numberValid;
};



const validateForm = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let myForm = document.forms["myForm"];
  let email = myForm["email"].value;
  let phoneNumber = myForm["phone"].value;
  let name = myForm["nombre"].value;
  //let files = document.getElementById("files") ? document.getElementById("files").files : null;
  let region = myForm["select-region"].value;
  let comuna = myForm["select-comuna"].value;
  

  // variables auxiliares de validaci├│n y funci├│n.
  let invalidInputs = [];
  let isValid = true;
  
  const setInvalidInput = (inputName, index = "") => {
    invalidInputs.push(`Formulario ${index}: ${inputName}`);
    isValid &&= false;
  };
  
  // l├│gica de validaci├│n
  if (!validateName(name)) {
    setInvalidInput("Nombre", "principal");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Email", "principal");
  }
  if (!validatePhoneNumber(phoneNumber)) {
    setInvalidInput("Número", "principal");
  }
  if (!validateSelect(region)) {
    setInvalidInput("Region", "principal");
  }
  if (!validateSelect(comuna)) {
    setInvalidInput("Comuna", "principal");
  }
  
  const forms = document.querySelectorAll('#form-wrapper .form-container');
  
  forms.forEach((form, index) => {
    const deviceName = form.querySelector('[name^="name-dispositivo"]').value;
    const deviceType = form.querySelector('[name^="select-tipo-dispositivo"]').value;
    const deviceFunction = form.querySelector('[name^="select-funcionamiento"]').value;
    const deviceYears = form.querySelector('[name^="annos-uso"]').value;
    const files = form.querySelector('[name^="files"]') ? form.querySelector('[name^="files"]').files : null;


    // Validar cada form
    if (!validateName(deviceName)) {
        setInvalidInput("Nombre del dispositivo", index + 1);
    }
    if (!validateSelect(deviceType)) {
        setInvalidInput("Tipo de dispositivo", index + 1);
    }
    if (!validateSelect(deviceFunction)) {
        setInvalidInput("Funcionamiento del dispositivo", index + 1);
    }
    if (!validateYears(deviceYears)) {
        setInvalidInput("Años de uso", index + 1);
    }
    if (files && !validateFiles(files)) {
        setInvalidInput("Fotos", index + 1);
    }
});
  
  
  // finalmente mostrar la validaci├│n
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");
  let formContainer = document.querySelector(".main-container");

  if (!isValid) {
    validationListElem.textContent = "";
    // agregar elementos inv├ílidos al elemento val-list.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
    // establecer val-msg
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";
    
    // aplicar estilos de error
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";
    
    // hacer visible el mensaje de validaci├│n
    validationBox.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    // Ocultar el formulario
    myForm.style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("add-form").style.display = "none";
   

    // establecer mensaje de ├®xito
    validationMessageElem.innerText = "¿Confirma que desea publicar esta donación?";
    validationListElem.textContent = "";

    // aplicar estilos de ├®xito
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";

    // Agregar botones para enviar el formulario o volver
    let submitButton = document.createElement("button");
    submitButton.innerText = "Sí, confirmo";
    submitButton.style.marginRight = "10px";
    submitButton.addEventListener("click", () => {
      submitButton.style.display = "none";
      backButton.style.display = "none";
      validationMessageElem.innerText = "Hemos recibido la información de su donación. Muchas gracias.";

      
    });

    let backButton = document.createElement("button");
    backButton.innerText = "No, quiero volver al formulario";
    backButton.addEventListener("click", () => {
      // Mostrar el formulario nuevamente
      myForm.style.display = "block";
      validationBox.hidden = true;
      document.getElementById("submit-btn").style.display = "inline-block";
      document.getElementById("add-form").style.display = "inline-block";
    });

    validationListElem.appendChild(submitButton);
    validationListElem.appendChild(backButton);

    
    validationBox.hidden = false;
  }
};


// Para clonar el formulario
document.addEventListener('DOMContentLoaded', () => {
  const formWrapper = document.getElementById('form-wrapper');
  const formTemplate = document.getElementById('form-template');
  const addFormButton = document.getElementById('add-form');

  addFormButton.addEventListener('click', () => {
      
    // Clonar el formulario
      const newForm = formTemplate.cloneNode(true);

      // Hacer que estén vacíos
      const inputs = newForm.querySelectorAll('input, textarea');
      inputs.forEach(input => input.value = '');

      // Usamos la fecha y hora actual para que sea único
      const uniqueId = Date.now(); 
      newForm.querySelectorAll('input, textarea').forEach(input => {
          input.id = `${input.id}-${uniqueId}`;
          input.name = `${input.name}-${uniqueId}`;
      });

      // Añadir el nuevo formulario
      formWrapper.appendChild(newForm);
  });
});


let submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", validateForm);
