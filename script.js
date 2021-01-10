$(document).ready(function (){
    ShowContent();
});

function ShowContent(){

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'GET',
        dataType: 'json',
        success: function (post) {
            // Boucle permettant de parcourir tout le tableau post
            for (let x = 0; x < post.length; x++) {
                $post = post[x];
                // On insère des lignes <tr> dans la balise <tbody>
                $('#tables').append(`
                <!-- Ajout d'un id="row" permettant d'identifier la ligne à supprimer -->
                <tr id="row${$post.id}">
                    <td class="text-center">${$post.userId}</td>
                    <td class="text-center">${$post.id}</td>
                    <td>${$post.title}</td>
                    <td>${$post.body}</td>
                    <td>
                    <!-- Ajout des boutons supprimer et voir plus -->
                    <button type="button" onclick="deleteUser($('#row${$post.id}'))" class="btn btn-danger" id="remove">Supprimer</button>  
                    <button type="button" onclick="showMore(${$post.id})" class="btn btn-primary" data-toggle="modal" data-target="#modalShow" id="show" >Show more</button>
                        </td>
                    </tr>`
                );
            };
        }
    });
};
// fonction pour ajouter une nouvel employé
function newUser() {

    //récupération de la valeur de chaque champ d'input
    $userId = $('#userid').val();
    $title = $('#title').val();
    $body = $('#body').val();

    $.post('https://jsonplaceholder.typicode.com/posts/',
        {
            //bind val champ d'input pour les afficher dans le tableau
            userId: $userId,
            title: $title,
            body: $body,
        }, function (post) { // inject html vers tableau, cell new user
            $('table').append(
            `<tr id='row${post.id}'>
                <td>${post.id}</td>
                <td>${post.userId}</td>
                <td id='${post.id}'>${post.title}</td>
                <td>${post.body}</td>
                <td>
                    <button type="button" onclick="deleteUser($('#row${post.id}'))" class="btn btn-danger" id="remove">Supprimer</button>
                    <button type="button" onclick="showMore(${post.id})" class="btn btn-primary" data-toggle="modal" data-target="#modalShow" id="show" >Show more</button>
                </td>
            </tr>`);

        },
    'json');
};

//fonction pour afficher le Userid et la body en fonction de l'id(showmore)
function showMore(details){

    $.get('https://jsonplaceholder.typicode.com/posts/' + details,
        function (post) {
            //insertion du paragraphe pour afficher le contenu dynamiquement
            $('#modalContent').html(`
            <p>
                <b> USER ID :</b> ${post.userId} </br> <!-- Affichage du User id-->
                <b> ID : </b> ${post.id} </br> <!-- Affichage de l'ID -->
                <b> Title : </b> ${post.title} </br> <!-- Affichage du Titre -->
                <b> Body : </b> ${post.body} </br> <!-- Affichage du Contenu (body) -->
            </p>`)
        }
        ,'json');
};

// function to del currentindex in cell
function deleteUser(details){
    return details.remove();
}