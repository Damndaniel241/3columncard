const filterDiv= document.getElementById('filter-div');
const todoFilter = document.getElementById('todo-filter');
const selectFilter = document.getElementById('select-filter');
const emptyDiv = document.getElementById('empty');
const notesContainer = document.getElementById('notes-container');
const createBtn = document.getElementById('createBtn');
const editLink = document.getElementById('edit-link');
const noteListWrapper = document.getElementById("noteListWrapper");


function createNote(noteId, noteTitle, timeStamp){

    
let note = document.createElement('div');
note.classList.add('note-item');
note.setAttribute('data-id',`${noteId}`);
note.innerHTML = `
        <h3>${noteTitle}</h3>
        <h5><i> last edited at ${timeStamp} </i></h5>
    `;
noteListWrapper.appendChild(note);

note.addEventListener("click", () => {
    // Save the clicked noteId in localStorage
    localStorage.setItem("currentNoteId", noteId);
    
    // Navigate to the edit.html page with the specific noteId
    window.location.href = `edit.html?noteId=${noteId}`;
    // localStorage.getItem()
});

// console.log(noteId);
}



createBtn.addEventListener("click", () => {
    // Generate a unique note ID (you can use a UUID library for a more robust solution)
    const noteId = Date.now().toString();

    // Save the note ID in localStorage
    localStorage.setItem("currentNoteId", noteId);

    // Navigate to the edit.html page
    window.location.href = "edit.html";
});




window.addEventListener("load", () => {
    const storedData = localStorage.getItem("notes");
    if (storedData) {
        const notes = JSON.parse(storedData);
        for (const noteId in notes) {
            const { storedNoteTitle, timeStamp } = notes[noteId];
            createNote(noteId, storedNoteTitle, timeStamp);
        }
    }
});





    function filterNotes(notes, selectedValue) {
      const noteArray = Object.values(notes);
      switch (selectedValue) {
        case "1":
          // Sort by last edited (timestamp from newest to oldest)
          noteArray.sort((note1, note2) => new Date(note2.timeStamp) - new Date(note1.timeStamp));
          break;
        case "2":
          // Sort by recently created (timestamp from oldest to newest)
          noteArray.sort((note1, note2) => new Date(note1.timeStamp) - new Date(note2.timeStamp));
          break;
        case "3":
          // Sort alphabetically by note title
          noteArray.sort((note1, note2) => note1.storedNoteTitle.localeCompare(note2.storedNoteTitle));
          break;
        default:
          // Default sorting (no filter or original order)
          break;
      }

   console.log(noteArray);
    return noteArray;
  }




  function displayNotes(notes) {
    // Clear the existing note list
    noteListWrapper.innerHTML = "";
  
    // Get the selected sorting option
    const selectedValue = selectFilter.value;
  
    // Convert notes object into an array for sorting
    // const noteArray = Object.values(notes);
    const noteArray =  Object.entries(notes).map(([noteId,note]) => ({
      id: noteId,
      storedNoteTitle: note.storedNoteTitle,
          storedNoteContent: note.storedNoteContent,
          timeStamp: note.timeStamp,}))
  
    // Sorting based on the selected option
    switch (selectedValue) {
      case "1":
        // Sort by last edited (timestamp from newest to oldest)
        noteArray.sort((note1, note2) => new Date(note2.timeStamp) - new Date(note1.timeStamp));
        break;
      case "2":
        // Sort by recently created (timestamp from oldest to newest)
        noteArray.sort((note1, note2) => new Date(note1.timeStamp) - new Date(note2.timeStamp));
        break;
      case "3":
        // Sort alphabetically by note title
        noteArray.sort((note1, note2) => note1.storedNoteTitle.localeCompare(note2.storedNoteTitle));
        break;
      default:
        // Default sorting (no filter or original order)
        break;
    }

    // console.log(noteArray);

    // Rebuild the entire note list based on the filtered or sorted notes
    for (const note of noteArray) {
      // console.log(note);
      createNote(note.id, note.storedNoteTitle, note.timeStamp);
    }

  }
  


  function convertToISOFormat(timeStamp) {
    const now = new Date();
    const [time, period] = timeStamp.split(' ');
    const [hours, minutes] = time.split('h:');
    const [h, m] = period.split('h:');
  
    // Assuming that the timeStamp refers to the same day
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are zero-indexed
    const day = now.getDate();
  
    const isoFormat = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours}:${minutes}:${seconds}`;
  
    return isoFormat;
  }
  





    selectFilter.addEventListener("change", () => {
        const formData = localStorage.notes;
        // console.log(formData);
        const notes = JSON.parse(formData);
        displayNotes(notes);
    });




      function filterNotesByTitle(notes, filterText) {
        filterText = filterText.trim().toLowerCase();
        return Object.entries(notes).map(([noteId, note]) => ({
          id: noteId,
          storedNoteTitle: note.storedNoteTitle,
          storedNoteContent: note.storedNoteContent,
          timeStamp: note.timeStamp,
        })).filter((note) =>
          note.storedNoteTitle.toLowerCase().includes(filterText)
        );
      }


      function loadListItems() {
        const storedDataData = localStorage.getItem("notes");
        const notes = JSON.parse(storedDataData);
      
        // Filter notes based on the input field value
        const filterText = todoFilter.value;
        const filteredNotes = filterNotesByTitle(notes, filterText);
      
        displayNotes(filteredNotes);
      }

  
      
      // Event listener for filtering notes
      todoFilter.addEventListener("input", () => {
        const formData = localStorage.getItem("notes");
        const notes = JSON.parse(formData);
        const filterText = todoFilter.value.trim();

        if (filterText === '') {
            // If the filter text is empty, display all notes
            updateNoteList(Object.values(notes));
          } else {
            // Filter the notes based on the storedNoteTitle
            const filteredNotes = filterNotesByTitle(notes, filterText);
            updateNoteList(filteredNotes);
          }
      
      });

      

   
 

   function updateNoteList(filteredNotes) {
    // Clear the existing note list
    noteListWrapper.innerHTML = "";
  
    const addedNoteIds = new Set();
    const remainingNotes = [];
  
    // Reorder the existing note items based on the filtered array
    for (const note of filteredNotes) {
      // console.log("Note Object:", note);
      const existingNote = document.querySelector(`[data-id="${note.id}"]`);
     
      if (existingNote) {
        // console.log(existingNote)
        noteListWrapper.appendChild(existingNote); // Reorder the existing note item
        
      } else {
        remainingNotes.push(note);
        console.log("remainingNotes = ", remainingNotes);
      }
    }
  
  
    remainingNotes.forEach((note) => {
      // Accessing the id property inside each object
      const id = note.id;
      // Use the id or any other properties as needed
      console.log(id, note.storedNoteTitle, note.timeStamp);
      // note.addEventListener(clickk)
      createNote(id, note.storedNoteTitle, note.timeStamp);
      addedNoteIds.add(id);
      // ... Rest of the code ...
    });
  
    // Add click event listener to each note div
    const noteItems = document.querySelectorAll(".note-item");
    noteItems.forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        const noteId = noteItem.getAttribute("data-id");
           // Save the clicked noteId in localStorage
      localStorage.setItem("currentNoteId", noteId);
      // Navigate to the edit.html page with the specific noteId
      window.location.href = `edit.html?noteId=${noteId}`;
    });
  });
}
   
      

      
      
      

 





