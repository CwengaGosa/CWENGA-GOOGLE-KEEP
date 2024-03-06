// Define a Note class to model individual notes
class Note {
    // Constructor to initialize a new Note instance with an id, title, and text
    constructor(id, title, text){
        this.id = id; // Unique identifier for the note
        this.title = title; // Title of the note
        this.text = text; // Text content of the note
    }
}
// Define an App class to manage the notes
class App {
    constructor(){
        this.notes = []; // Initialize an empty array to store notes

        // accessing HTML elemnts
        this.$activeForm = document.querySelector(".active-form");
        this.$inactiveForm = document.querySelector(".inactive-form");
        this.$noteTitle = document.querySelector("#note-title");
        this.$noteText = document.querySelector("#note-text");
        this.$notes = document.querySelector(".notes");
        this.$form = document.querySelector("#form");
        this.$modal = document.querySelector(".modal");
        // event listener
        this.addEventListeners();

        // displays notes
        this.displayNotes();
    }
    
    // adding an event listener to the application
    addEventListeners(){
        // click eventlistener to the body
        document.body.addEventListener("click", (event) =>{
            // call handle form click method
            this.handleFormClick(event);
            this.openModal(event);
        })

        this.$form.addEventListener("submit", (event) => {
            event.preventDefault();
            const title = this.$noteTitle.value ;
            const text = this.$noteText.value;
            this.addNote({title, text});
            this.closeActiveForm();
        })
    }

    // handling the formclick
    handleFormClick(event){
       const isActiveFormClickedOn = this.$activeForm.contains(event.target);
       const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);

       const title = this.$noteTitle.value ;
       const text = this.$noteText.value;

    //    when inactive form is clicked on display active form
       if (isInactiveFormClickedOn){
        this.openActiveForm();
       }
       else if(!isInactiveFormClickedOn && !isActiveFormClickedOn){
        this.addNote({title, text});
        this.closeActiveForm();
        }
    }

        // displays the active form
    openActiveForm(){
        this.$activeForm.style.display = "block";
        this.$inactiveForm.style.display = "none";
        this.$noteText.focus();
    }

    // closes active form
    closeActiveForm(){
        this.$activeForm.style.display = "none";
        this.$inactiveForm.style.display = "block";
        this.$noteTitle.value = "";
        this.$noteText.value = "";
    }

    openModal(event){
        if(event.target.closest(".note")){
            this.$modal.classList.add(".open-modal");
        }
    }
    // Method to add a new note to the notes array
    addNote({ title, text }) {
        if(text != ""){
            const newNote = new Note(cuid(), title, text); // Create a new Note instance
            this.notes = [...this.notes, newNote]; // Add the new Note to the notes array

            // displays notes
            this.displayNotes();
        }
    }
    // Method to edit an existing note by its id
    editNote(id, { title, text }) {
        this.notes = this.notes.map(note => {
            if(note.id === id) { // Find the note by id
                note.title = title; // Update the note's title
                note.text = text; // Update the note's text
            }
            return note; // Return the updated note
        });
    }
    // Method to delete a note by its id
    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id); // Remove the note from the array
    }

    handleMouseOverNote(element){
        const $note = document.querySelector("#"+ element.id);
        const $checkNote = $note.querySelector(".check-circle");
        const $noteFooter = $note.querySelector(".note-footer");
        $checkNote.style.visibility = "visible";
        $noteFooter.style.visibility = "visible";
    }

    handleMouseOutNote(element){
        const $note = document.querySelector("#"+ element.id);
        const $checkNote = $note.querySelector(".check-circle");
        const $noteFooter = $note.querySelector(".note-footer");
        $checkNote.style.visibility = "hidden";
        $noteFooter.style.visibility = "hidden";
    }

    // Method to log all notes to the console with their details
    displayNotes() {
        this.$notes.innerHTML = this.notes.map((note) =>
        `
        <div class="note" id="${note.id}" onmouseover="app.handleMouseOverNote(this)" onmouseover="app.handleMouseOutNote(this)" >
        <span class="material-icons check-circle">check_circle</span>
        <div class="title note-heading">${note.title}</div>
        <div class="text note-paragraph">${note.text}</div>

        <div class="note-footer">
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">add_alert</span>
            <span class="tooltip-text">Remind me</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">person_add</span>
            <span class="tooltip-text">Collaborator</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">palette</span>
            <span class="tooltip-text">Change Color</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">image</span>
            <span class="tooltip-text">Add Image</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">archive</span>
            <span class="tooltip-text">Archive</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">more_vert</span>
            <span class="tooltip-text">More</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">undo</span>
            <span class="tooltip-text">Undo</span>
          </div>
          <div class="tooltip">
            <span class="material-icons-outlined hover small-icon">redo</span>
            <span class="tooltip-text">Redo</span>
          </div>
        </div>
      </div>`)
      .join("");
    }
}
   

 // Initialize a new App instance
const app = new App();
   
