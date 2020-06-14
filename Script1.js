// JavaScript source code

var answer;
var answer_d;
var answer_n;
var glb_char_id_list = [];

function recuperation_characters_forList() {
    fetch('https://www.breakingbadapi.com/api/characters')
        .then(response => response.json())
        .then(function (characters) {
            
            
            image_accueil(characters);
        })
        .catch(function (error) {

            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

        });

}

function image_accueil(characters) {



    for (i = 0; i < characters.length; i++) {



        var image = new Image();

        var figure = document.createElement('figure');





        var p = document.createElement('p');

        var figcaption = document.createElement('figcaption');

        document.getElementById("the_list").appendChild(figure);

        figure.appendChild(p);







        // ADD POPUPS

        var overlay = document.createElement('div');

        overlay.id = 'overlay' + characters[i].char_id;

        overlay.className = 'overlay';

        var popup = document.createElement('div');

        popup.id = 'popup' + characters[i].char_id;

        popup.className = 'popup';

        var h2 = document.createElement('h2');

        //h2.innerHTML="Exemple simple de popup<span id='btnClose' class='btnClose'>&times;</span>"

        var btnClose = document.createElement('span');

        btnClose.id = characters[i].char_id;

        btnClose.className = 'btnClose';

        //btnClose.innerHTML = '>>'+'&times;';





        var divcontent = document.createElement('div');



        p.appendChild(overlay);

        overlay.appendChild(popup);

        popup.appendChild(h2);

        h2.appendChild(btnClose);

        popup.appendChild(divcontent);

        //divcontent.innerHTML=characters[i].name + ' >> ' + characters[i].char_id

        //                                                                        + "<br />"+"Lorem ipsum ";



        divcontent.innerHTML =

            "<p>Status: " + characters[i].status + "</p>" +

            "<p>Series: " + characters[i].category + "</p>";



        ;



        // END ADD POPUPS























        image.src = characters[i].img;

        image.width = 100;

        image.height = 100;

        image.className = 'picture';





        p.appendChild(image);

        p.appendChild(figcaption);

        figcaption.innerText = characters[i].name;



        //figure.id = i;

        p.id = characters[i].char_id;

        p.className = 'person'



        var newEl = document.createElement('span');

        newEl.className = 'nohide hide';

        var detail = characters[i].status;





        newEl.innerHTML = detail;

        newEl.id = 'fig' + characters[i].char_id;



        //var ref = document.querySelector('div.before');



        figure.appendChild(newEl);













        btnClose.onclick = function () {

            closeModal(this.id);



        }



        p.onmouseover = function () {



            //alert(this.id);



            document.getElementById('fig' + this.id).classList.toggle("hide");

            openMoadl(this.id);

        };



        p.onclick = function () {

            window.location.href = "characters_description.html?char_id=" + this.id;



        }

    }

}



function affiche_image(myimage) {
    var img = document.getElementById("big_photo");
    img.src = myimage;
}


function description(my_char_id) {
    fetch('https://www.breakingbadapi.com/api/characters/')
        .then(response => response.json())
        .then(function (all_characters) {
            for (i = 0; i < all_characters.length; i++) {
                if (all_characters[i].char_id == my_char_id) {
                    break;
                }
            }
            for (j = 0; j < all_characters.length; j++) {
                glb_char_id_list.push(all_characters[j].char_id);
            }
            affiche_image(all_characters[i].img);
            create_description(all_characters,i);
            create_button_ToNavig(my_char_id, all_characters);
        })
        .catch(function (error) {

            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

        });

}

function create_button_ToNavig(current_id, all_characters) {
    var my_previous_button = document.createElement("BUTTON");
    var my_next_button = document.createElement("BUTTON");
/*recherche du current id pour trouver le suivant et le précédent*/

    for (i = 0; i < all_characters.length; i++) {
        if (all_characters[i].char_id == current_id) {
            break;
        }
    }
    console.log("TEST ALL_CHARACTERS", all_characters);
    console.log("current char",all_characters[i]);
    console.log("next id",all_characters[i + 1].char_id)
    my_next_button.addEventListener("click", function () {
        
        window.location.href = "characters_description.html?char_id=" + all_characters[i + 1].char_id;
    });

    my_previous_button.addEventListener("click", function () {
        
        window.location.href = "characters_description.html?char_id=" + all_characters[i - 1].char_id;
    });

    my_next_button.innerHTML = " next >>";
    my_previous_button.innerHTML = "<< back"
    document.getElementById("div_tab").appendChild(my_previous_button);
    document.getElementById("div_tab").appendChild(my_next_button);
    my_previous_button.className = "btn_prev";
    my_next_button.className = "btn_next";
}



function create_description(characters,index) {
    //titre du tableau
    var title = "descritpion of " + characters[index].name + " character";
    document.getElementById("title_tab").textContent = title;



    var tableRef = document.getElementById('tab_describe').getElementsByTagName('tbody')[0];

    var newRow = document.getElementById('row1');

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(1);
    // Append a text node to the cell
    var newText = document.createTextNode(characters[index].name)
    newCell.appendChild(newText);

    var newRow = document.getElementById('row2');

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(1);
    // Append a text node to the cell
    var newText = document.createTextNode(characters[index].birthday)
    newCell.appendChild(newText);

    var newRow = document.getElementById('row3');

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(1);
    // Append a text node to the cell
    var textocc = "";
    for (i = 0; i < characters[index].occupation.length; i++) {
        if (i == 0) {
            textocc = characters[index].occupation[i];
        }
        else {
            textocc = textocc + "," + characters[index].occupation[i];
        }
    }
    var newText = document.createTextNode(textocc);
    newCell.appendChild(newText);

    var newRow = document.getElementById('row4');

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(1);
    // Append a text node to the cell
    var newText = document.createTextNode(characters[index].status)
    newCell.appendChild(newText);

    var newRow = document.getElementById('row5');

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(1);
    // Append a text node to the cell
    var newText = document.createTextNode(characters[index].nickname)
    newCell.appendChild(newText);

    var newRow = document.getElementById('row6');

    // Insert a cell in the row at index 0
    var newCell = newRow.insertCell(1);
    // Append a text node to the cell
    var newText = document.createTextNode(characters[index].portrayed)
    newCell.appendChild(newText);
}

function entierAleatoire(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function quizz() {
    fetch('https://www.breakingbadapi.com/api/quotes')
        .then(response => response.json())
        .then(function (quotes) {

            create_quizz_q(quotes);
            fetch('https://www.breakingbadapi.com/api/deaths')
                .then(response => response.json())
                .then(function (data_deaths) {
                    console.log(data_deaths);
                    create_quizz_d(data_deaths);
                    fetch('https://www.breakingbadapi.com/api/characters')
                        .then(response => response.json())
                        .then(function (data_char) {
                            console.log(data_char);
                            create_quizz_n(data_char);
                        })
                        .catch(function (error) {

                            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

                            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

                        });
                })
                .catch(function (error) {

                    //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

                    alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

                });
        })
        .catch(function (error) {

            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

        });
}

function create_quizz_n(data_char){
    var myrdm = entierAleatoire(0, data_char.length);
    var mynick = document.createElement('p');
    mynick.innerText = "What is the nickname of " + data_char[myrdm].name+" ?";
    document.getElementById("the_nickname").appendChild(mynick);
    answer_n = data_char[myrdm].nickname;
    console.log(answer_n);
}
function validation_nickname() {
    var myanswer = document.querySelector("#myChamps").value;
    if (myanswer == answer_n) {
        document.getElementById("result3").innerText = "Good answer";
        document.getElementById("result3").className = "good";
    }
    else {
        document.getElementById("result3").innerText = "wrong answer";
        document.getElementById("result3").className = "bad";
    }
}


function create_quizz_d(data_deaths) {
    var myrdm = entierAleatoire(0, data_deaths.length);
    var mydeath = document.createElement('p');
    mydeath.innerText = "In which episode was killed "+ data_deaths[myrdm].death+" ?";
    document.getElementById("the_death").appendChild(mydeath);
    answer_d = [data_deaths[myrdm].season, data_deaths[myrdm].episode];
    console.log(answer_d);
}
function validation_death() {
    var myepisode = document.querySelector("#episode_choice").selectedOptions[0].value;
    var mysaison = document.querySelector("#saison_choice").selectedOptions[0].value;
    if (answer_d[0] == mysaison && answer_d[1] == myepisode) {
        document.getElementById("result2").innerText = "Good answer";
        document.getElementById("result2").className = "good";
    }
    else {
        document.getElementById("result2").innerText = "wrong answer";
        document.getElementById("result2").className = "bad";
    }

}

function create_quizz_q(quotes) {

    //générations de la quote aléatoire
    var rdm = entierAleatoire(0, quotes.length - 1)
    var Quote = document.createElement('p');
    Quote.innerHTML = "Who said : <i>&laquo;" + quotes[rdm].quote +" &raquo;</i> ?";
    answer = quotes[rdm].author;
    document.getElementById("the_quote").appendChild(Quote);
    //créations du choix multiple
    let tab_answer = [];
    var test_occ = 0;
    for (i = 0; i < quotes.length; i++) {
        for (j = 0; j < tab_answer.length; j++) {
            if (quotes[i].author == tab_answer[j]) {
                test_occ = 1;
                break;
            }
        }
        if (test_occ == 0) {
            tab_answer.push(quotes[i].author);
        }
        else {
            test_occ = 0;
        }
    }

    for (j = 0; j < tab_answer.length; j++) {
        document.getElementById("char_choice").options[document.getElementById("char_choice").options.length] = new Option(tab_answer[j]);
        document.getElementById("char_choice").options[j].value = tab_answer[j - 1];
    }

}

function validation_choix() {
    var myanswer = document.querySelector("#char_choice").selectedOptions[0].value;

    if (answer == myanswer) {
        document.getElementById("result1").innerText = "Good answer";
        document.getElementById("result1").className = "good";
    }
    else {
        document.getElementById("result1").innerText = "wrong answer";
        document.getElementById("result1").className = "bad";
    }
}

function display_footer() {
    fetch('https://www.breakingbadapi.com/api/death-count')
        .then(response => response.json())
        .then(function (data_deaths) {
            
            document.getElementById("death").innerText = "number of dead " + data_deaths[0].deathCount;

        })
        .catch(function (error) {

            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

        });
    fetch('https://www.breakingbadapi.com/api/episodes')
        .then(response => response.json())
        .then(function (data_episodes) {
            
            document.getElementById("episodes").innerText = "number of episodes " + data_episodes.length ;

        })
        .catch(function (error) {

            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

        });
    fetch('https://www.breakingbadapi.com/api/quotes')
        .then(response => response.json())
        .then(function (data_quotes) {
           
            document.getElementById("quotes").innerText ="number of quotes " + data_quotes.length;

        })
        .catch(function (error) {

            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

        });
}

function print_rdm_quote() {
    fetch('https://www.breakingbadapi.com/api/quote/random')
        .then(response => response.json())
        .then(function (data_quotes) {
            
            document.getElementById("author").innerText = data_quotes[0].author;
            document.getElementById("quote").innerText = "\"" + data_quotes[0].quote + "\"";
            document.getElementById("serie").innerText = data_quotes[0].series;
        })
        .catch(function (error) {

            //console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);

            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);

        });
}

function next_video(v_id) {
    document.querySelectorAll(".video").forEach(function (el) { el.classList.remove("show")});
    document.getElementById(v_id).className = "video show";
}




//TEST D'UTILISATION DES COOKIES MAIS FONCTIONNE PAS EN LOCAL SUR CHROME//
/*
 * function setCookie(cname,cvalue,exdays) {

  var d = new Date();

  d.setTime(d.getTime() + (exdays*24*60*60*1000));

  var expires = "expires=" + d.toGMTString();

  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}



function getCookie(cname) {

  var name = cname + "=";

  var decodedCookie = decodeURIComponent(document.cookie);

  var ca = decodedCookie.split(';');

  for(var i = 0; i < ca.length; i++) {

    var c = ca[i];

    while (c.charAt(0) == ' ') {

      c = c.substring(1);

    }

    if (c.indexOf(name) == 0) {

      return c.substring(name.length, c.length);

    }

  }

  return "";

}



function checkCookie() {

  var user=getCookie("username");

  if (user != "") {

    alert("Welcome again " + user);

  } else {

     user = prompt("Please enter your name:","");

     if (user != "" && user != null) {

       setCookie("username", user, 30);

     }

  }

}
 */