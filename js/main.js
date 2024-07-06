const add = document.querySelector('.add'),
    popup = document.querySelector('.popup-app'),
    titlePopup = document.querySelector('.header_popup h4'),
    close = document.querySelector('.close'),
    textarea = document.querySelector('textarea'),
    button = document.querySelector('button'),
    input = document.querySelector('input'),
    audio = new Audio('../audios/suc.mp3');

const notes = JSON.parse(localStorage.getItem('notes') || '[]');
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let idEdit, isEdit;

// handle open popup
add.addEventListener("click", () => {
    popup.classList.add('open')
    titlePopup.innerText = "Add New Note"
    button.innerText = "Add"

    input.value = ""
    textarea.value = ""
}
)

// handle close popup
close.addEventListener("click", () => {
    popup.classList.remove('open')
    isEdit = false
}
)

button.addEventListener("click", addNotes)

//handle add note
function addNotes(e) {
    e.preventDefault();
    let title = input.value.trim(),
        description = textarea.value.trim();
    if (title && description) {
        let date = new Date(),
            month = months[date.getMonth()],
            day = date.getDate(),
            year = date.getFullYear();

        let noteInfo = {
            title,
            description,
            date: `${month} , ${day} , ${year}`
        }
        if (isEdit) {
            notes[idEdit] = noteInfo
            isEdit = false
        } else {
            notes.push(noteInfo)
        }
        // notes.push(noteInfo);
        localStorage.setItem('notes', JSON.stringify(notes));
        audio.play();
        showNotes();
        close.click();
    }

}

//handle show notes
function showNotes() {
    document.querySelectorAll('.card').forEach((card) => card.remove())

    if (!notes) return;

    notes.forEach((note, idx) => {
        let card = `<div class="card card-style">
        <div class="card_content">
            <h4>${note.title}</h4>
            <p>${note.description}</p>
        </div>
        <div class="card_details">
            <span>${note.date}</span>
            <div class="menu-app">
                <i class='bx bx-dots-horizontal-rounded'></i>
                <ul class="menu">
                    <li onclick="editNote(${idx} , '${note.title}' , '${note.description}')"><i class='bx bx-edit-alt'>Edit</i></li>
                    <li onclick="deleteNote(${idx})"><i class='bx bx-trash-alt'>Delete</i></li>
                </ul>
            </div>
        </div>
    </div>`;
        add.insertAdjacentHTML("afterend", card)
    })
}

showNotes()

//handle delet note
function deleteNote(idx) {
    let confirmDelete = confirm('Are you sure you want to delete this note ?')
    if (!confirmDelete) return

    notes.splice(idx, 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes()
}

//handle edit note
function editNote(idx, title, description) {
    isEdit = true
    idEdit = idx
    add.click();
    title.innerText = "Edit Note"
    button.innerText = "update"
    input.value = title
    textarea.value = description

}
