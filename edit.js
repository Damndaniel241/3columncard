// const removeBtn = document.getElementById('RemoveBtn');
// const editInput = document.getElementById('note-title');
// const saveBtn = document.getElementById('saveBtn');
const editInput = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const saveBtn = document.getElementById("saveBtn");
const removeBtn = document.getElementById("removeBtn");
const lastEditTime = document.getElementById("last-edit-time");

// document.getElementById("editForm").addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     // const currentDate = new Date();
//     function getCurrentTime() {
//         const currentDate = new Date();
//         const hours = String(currentDate.getHours()).padStart(2, '0');
//         const minutes = String(currentDate.getMinutes()).padStart(2, '0');
//         return `${hours}h:${minutes}m`;
//       }

//     const currentTime = getCurrentTime()

//     // Perform any actions with the form values (e.g., validation, processing)

//     const notnamed = "Unamed Note";
//     if (editInput.value.length == 0){
//         editInput.value = notnamed;
//     }

    

//     console.log("title:", editInput.value);
//     console.log("content", noteContent.value);
//     console.log("last edited at ",currentTime);

//     Datalist = []
//     const formData = {
//         storedNoteTitle: editInput.value,
//        storedNoteContent : noteContent.value,
//        timeStamp : currentTime,
//       };



//     localStorage.setItem('DataList',JSON.stringify(formData));
    

// });

let noteRemoved = false;
let noteSaved = false;


window.addEventListener("load", () => {

    const noteId = localStorage.getItem("currentNoteId");
    
    //  urlParams = new URLSearchParams(window.location.search);
    // const noteId = urlParams.get("noteId");
    
    console.log(noteId);
//
    if (noteId) {
        const storedData = localStorage.getItem("notes");
        if (storedData) {
            const notes = JSON.parse(storedData);
            if (notes.hasOwnProperty(noteId)) {
            const { storedNoteTitle, storedNoteContent, timeStamp } = notes[noteId];
            editInput.value = storedNoteTitle;
            noteContent.value = storedNoteContent;
            lastEditTime.textContent = `last edited at ${timeStamp}`;
        } else {
            console.log(`Note with ID '${noteId}' not found.`);
        }
        }
    }
});


saveBtn.addEventListener("click", (event) => {
    event.preventDefault();

    function getCurrentTime() {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        return `${hours}h:${minutes}m`;
      }



      let storedNoteTitle =null;
      const notnamed = "Unamed Note";
      if (editInput.value.length == 0){
          storedNoteTitle = notnamed;
      }else{
        storedNoteTitle = editInput.value;
      }
  

    
    const storedNoteContent = noteContent.value;
    const timeStamp = getCurrentTime();
    const noteId = localStorage.getItem("currentNoteId");

    // Save the note data in localStorage
    const storedData = localStorage.getItem("notes");
    const notes = storedData ? JSON.parse(storedData) : {};

    if (!noteSaved) {
        // If the note was not previously saved, change the Save button text to "Saved"
        saveBtn.textContent = "Saved";
        noteSaved = true;
    }

    if (noteRemoved) {
        // If the note was previously removed, change the Remove button text back to "Remove Note"
        removeBtn.textContent = "Remove Note";
        noteRemoved = false;
    }

    notes[noteId] = { storedNoteTitle, storedNoteContent, timeStamp };
    localStorage.setItem("notes", JSON.stringify(notes));
    lastEditTime.textContent = `last edited at ${timeStamp}`;
    // Navigate back to index.html
    // window.location.href = "index.html";
    // saveBtn.textContent = 'save note';

    // Add event listeners to input and textarea fields
    editInput.addEventListener("focus", () => {
        // When input field is focused, change the Save button text back to "Save"
        if (noteSaved) {
            saveBtn.textContent = "save note";
            noteSaved = false;
        }
    });
    
    noteContent.addEventListener("focus", () => {
        // When textarea field is focused, change the Save button text back to "Save"
        if (noteSaved) {
            saveBtn.textContent = "save note";
            noteSaved = false;
        }
    });

});


removeBtn.addEventListener("click", () => {
    const storedData = localStorage.getItem("notes");
    const noteId = localStorage.getItem("currentNoteId");

    if (storedData) {
        const notes = JSON.parse(storedData);
        delete notes[noteId];
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    removeBtn.textContent = 'removed';
    noteRemoved = true;

});


