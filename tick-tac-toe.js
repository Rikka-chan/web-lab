/**
 * Created by kamina on 22.10.16.
 */

var matrix = [];
var player = 'cross';


function move(element){
    if(element.className.search(/cell/) == -1 ||
        element.getElementsByClassName('pic').length){
        return;
    }
    var elem_to_paste = document.getElementById(player).cloneNode(true);
    elem_to_paste.style.display = 'block';
    element.appendChild(elem_to_paste);

    var id = element.id.split(';');
    matrix[id[0]][id[1]] = player;

    if(player == 'cross')player = 'ring';
    else player = 'cross';

    var result = check();

    if(result){
        document.getElementById(result + '-win').style.display='block';
    }
}

function build_matrix(){
    var rows = document.getElementsByClassName('row');


    for(var i = 0;i < rows.length; i++){
        var tmp_row = [];
        var cells = rows[i].getElementsByClassName('cell');

        for(var j = 0;j < cells.length; j++){
            cells[j].id = i + ';' + j;
            tmp_row.push(0);
        }
    matrix.push(tmp_row);
    }

    document.getElementById('playfield').onclick = function(event){
        move(event.target);
    };
}

function check(){
    var is_full = true;
    var is_complete = true;
    for(var j = 0;j < matrix[0].length;j++){
        is_full = true;
        for(var i = 0;i < matrix.length;i++){
            if(!matrix[i][j]){
                is_complete = false;
            }
            if(!matrix[i][j] || matrix[i][j] != matrix[0][j]){
                is_full = false;
            }
        }
        if(is_full) return matrix[0][j];
    }

    for(var i= 0;i<matrix.length;i++){
        is_full = true;
        for(var j=0;j<matrix[i].length;j++){
            if(!matrix[i][j] || matrix[i][j] != matrix[i][0]){
                is_full = false;
            }
        }
        if (is_full) return matrix[i][0];
    }
    is_full = true;
    for(var i =0;i<matrix.length;i++){
        if(!matrix[i][i] || matrix[i][i] != matrix[0][0]){
            is_full = false;
        }
    }

    if(is_full){
        return matrix[0][0];
    }

    is_full = true;
    for(var i =0;i<matrix.length;i++){
        if(!matrix[i][matrix.length - i -1] || matrix[i][matrix.length - i -1] != matrix[0][matrix.length -1]){
            is_full = false;
        }
    }

    if(is_full){
        return matrix[0][matrix.length -1];
    }
    if (is_complete) return 'no';
    return null;
}

function close(){
    var modals = document.getElementsByClassName('modal');
    for(var i=0;i<modals.length;i++){
        if(modals[i].style.display != 'none'){
            modals[i].style.display = 'none';
        }
    }
    location.reload();
}

window.onload = function(){
    build_matrix();
    var modals = document.getElementsByClassName('modal');
    for(var i=0;i<modals.length;i++){
        modals[i].onclick = close;
    }

};

