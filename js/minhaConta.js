/*var element = document.querySelector('#tipoCadastro');
element.addEventListener('change', myfunction);

function myfunction() {
  if (element.value === '1') {
    $('#ong').css('display', 'block');
  }
}*/

//Valida campo Data Nascimento
function dtNascimento(val) {
  var pass = val.value;
  var expr = /[0123456789]/;

  for (i = 0; i < pass.length; i++) {
    // charAt -> retorna o caractere posicionado no índice especificado
    var lchar = val.value.charAt(i);
    var nchar = val.value.charAt(i + 1);

    if (i == 0) {
      // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
      // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
      // instStr.search(expReg);
      if (lchar.search(expr) != 0 || lchar > 3) {
        val.value = '';
      }
    } else if (i == 1) {
      if (lchar.search(expr) != 0) {
        // substring(indice1,indice2)
        // indice1, indice2 -> será usado para delimitar a string
        var tst1 = val.value.substring(0, i);
        val.value = tst1;
        continue;
      }

      if (nchar != '/' && nchar != '') {
        var tst1 = val.value.substring(0, i + 1);

        if (nchar.search(expr) != 0)
          var tst2 = val.value.substring(i + 2, pass.length);
        else var tst2 = val.value.substring(i + 1, pass.length);

        val.value = tst1 + '/' + tst2;
      }
    } else if (i == 4) {
      if (lchar.search(expr) != 0) {
        var tst1 = val.value.substring(0, i);
        val.value = tst1;
        continue;
      }

      if (nchar != '/' && nchar != '') {
        var tst1 = val.value.substring(0, i + 1);

        if (nchar.search(expr) != 0)
          var tst2 = val.value.substring(i + 2, pass.length);
        else var tst2 = val.value.substring(i + 1, pass.length);

        val.value = tst1 + '/' + tst2;
      }
    }

    if (i >= 6) {
      if (lchar.search(expr) != 0) {
        var tst1 = val.value.substring(0, i);
        val.value = tst1;
      }
    }
  }

  if (pass.length > 10) val.value = val.value.substring(0, 10);
  return true;
}

//Valida CEP
function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('uf').value = '';
}

function meu_callback(conteudo) {
  if (!('erro' in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('rua').value = conteudo.logradouro;
    document.getElementById('bairro').value = conteudo.bairro;
    document.getElementById('cidade').value = conteudo.localidade;
    document.getElementById('uf').value = conteudo.uf;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert('CEP não encontrado.');
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != '') {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById('rua').value = '...';
      document.getElementById('bairro').value = '...';
      document.getElementById('cidade').value = '...';
      document.getElementById('uf').value = '...';

      //Cria um elemento javascript.
      var script = document.createElement('script');

      //Sincroniza com o callback.
      script.src =
        'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      alert('Formato de CEP inválido.');
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}

//valida número
function somenteNumeros(num) {
  var er = /[^0-9.]/;
  er.lastIndex = 0;
  var campo = num;
  if (er.test(campo.value)) {
    campo.value = '';
  }
}

//Valida campo nome e Orgão Expedidor
function ApenasLetras(e, t) {
  try {
    if (window.event) {
      var charCode = window.event.keyCode;
    } else if (e) {
      var charCode = e.which;
    } else {
      return true;
    }
    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      (charCode > 191 && charCode <= 255) // letras com acentos
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    alert(err.Description);
  }
}

// validador CPF
function verificarCPF(c) {
  var i;
  s = c;
  var c = s.substr(0, 9);
  var dv = s.substr(9, 2);
  var d1 = 0;
  var v = false;

  for (i = 0; i < 9; i++) {
    d1 += c.charAt(i) * (10 - i);
  }
  if (d1 == 0) {
    alert('CPF Inválido');
    v = true;
    return false;
  }
  d1 = 11 - (d1 % 11);
  if (d1 > 9) d1 = 0;
  if (dv.charAt(0) != d1) {
    alert('CPF Inválido');
    v = true;
    return false;
  }

  d1 *= 2;
  for (i = 0; i < 9; i++) {
    d1 += c.charAt(i) * (11 - i);
  }
  d1 = 11 - (d1 % 11);
  if (d1 > 9) d1 = 0;
  if (dv.charAt(1) != d1) {
    alert('CPF Inválido');
    v = true;
    return false;
  }
  /*if (!v) {
      alert(c + 'Número de CPF Válido');
    }*/
}

//Futuramente será substituido pela as informações que virão do banco
$('#nome').val('John Lennon');
$('#cel').val('(21) 92222-2222');
$('#cpf').val('111.111.111-11');
$('#identidade').val('21.212.212-1');
$('#orgaoExpedidor').val('21.212.212-1');
$('#outra_data').val('26/12/1994');
$('#email').val('johnlennon@gmail.com');
$('#cep').val('22.222-545');
$('#rua').val('Strong');
$('#num').val('102');
$('#complemento').val('02');
$('#bairro').val('Barra da Tijuca');
$('#cidade').val('Rio de Janeiro');
$('#uf').val('RJ');

//habilita ou desabilita botão enviar

//valida o cnpj
/*
  function FormataCnpj(campo, teclapres) {
    var tecla = teclapres.keyCode;
    var vr = new String(campo.value);
    vr = vr.replace('.', '');
    vr = vr.replace('/', '');
    vr = vr.replace('-', '');
    tam = vr.length + 1;
    if (tecla != 14) {
      if (tam == 3) campo.value = vr.substr(0, 2) + '.';
      if (tam == 6) campo.value = vr.substr(0, 2) + '.' + vr.substr(2, 5) + '.';
      if (tam == 10)
        campo.value =
          vr.substr(0, 2) + '.' + vr.substr(2, 3) + '.' + vr.substr(6, 3) + '/';
      if (tam == 15)
        campo.value =
          vr.substr(0, 2) +
          '.' +
          vr.substr(2, 3) +
          '.' +
          vr.substr(6, 3) +
          '/' +
          vr.substr(9, 4) +
          '-' +
          vr.substr(13, 2);
    }
  }
  
  function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
  
    if (cnpj == '') return false;
  
    if (cnpj.length != 14) return false;
  
    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;
  
    // Valida DVs
    tamanho = cnpj.length - 2;
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;
  
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;
  
    return true;
  }
  */
