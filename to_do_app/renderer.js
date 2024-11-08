
function submitNotes(){
    title = document.getElementById('title').value;
    description = document.getElementById('description').value;
    window.electronAPI.createNotes(title, description);
}

function fetchNotes(){
    window.electronAPI.fetchNotes();
}

window.electronAPI.readNotesUI((rows) => {
    rows.forEach(row => {
        div = returnPanelDiv(row);
        $("#accordion").append(div);
    });  
})

function returnPanelDiv( row ){
    return `<div class="panel panel-default" id="${row.id}">
        <div class="panel-heading">
          <span class="panel-title">
            <a data-toggle="collapse" data-parent="#accordion" href="#collapse${row.id}">${row.title}</a>
          </span>
          <button type="button" class="btn btn-info act-btns" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-pencil"></span></button>
          <button type="button" class="btn btn-danger act-btns"> <span class="glyphicon glyphicon-trash"></span></button>
        </div>
        <div id="collapse1" class="panel-collapse collapse">
          <div class="panel-body">${row.description}</div>
      </div>`
}