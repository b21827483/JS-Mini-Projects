export class Modal {

    constructor(contentId) {
    
        this.contentTemplate = document.getElementById(contentId);
        this.modalTemplate = document.getElementById("modal-template");
    }

    show() {

        if ("content" in document.createElement("template")) {
            const modalElements = document.importNode(this.modalTemplate.content, true);
            this.backdropElem = modalElements.querySelector(".backdrop");
            this.modalElem = modalElements.querySelector(".modal");

            const contentElem = document.importNode(this.contentTemplate.content, true);
            
            this.modalElem.appendChild(contentElem);
            
            document.body.insertAdjacentElement("afterbegin", this.backdropElem)
            document.body.insertAdjacentElement("afterbegin", this.modalElem)

        }
        else {
            alert("This template does not supported by your browser.")}
    }

    hide() {
        if (this.modalElem)
            document.body.removeChild(this.modalElem);
            document.body.removeChild(this.backdropElem);
            this.modalElem = null
            this.backdropElem = null
            
        }



}