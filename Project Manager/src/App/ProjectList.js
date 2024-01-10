import {ProjectItem} from "./ProjectItem.js"
import {DOMFunc} from "../Utility/DOMFunc.js"

export class ProjectList {

    constructor(type){
        
        this.projects = []
        this.type = type;
        const projItems = document.querySelectorAll(`#${type}-projects li`);
        for (const item of projItems)
            this.projects.push(new ProjectItem(item.id, this.switchProject.bind(this), this.type))

        this.createDropzone();
    }

    createDropzone(){
        
        const dropzone = document.querySelector(`#${this.type}-projects ul`);

        dropzone.addEventListener("dragenter", event => {
            event.preventDefault();
            dropzone.parentElement.classList.add("droppable")
        })
        dropzone.addEventListener("dragover", event => {
            event.preventDefault()
        })

        dropzone.addEventListener("dragleave", event => {
            if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== dropzone)
                dropzone.parentElement.classList.remove("droppable")
        })

        dropzone.addEventListener("drop", event => {
            const proj = event.dataTransfer.getData("text/plain");
            if (this.projects.find(p => p.id === proj)) {
                return;
            }

            document.getElementById(proj).querySelector("button:last-of-type").click();
            dropzone.parentElement.classList.remove("droppable")

        })
    }

    addProject(project){
        this.projects.push(project);
        DOMFunc.move(project.id, `#${this.type}-projects ul`)
        project.updateEventListener(this.switchProject.bind(this), this.type)
    }

    setSwitchHandler(switchHandlerFunc){
        this.switchHandler = switchHandlerFunc
    }

    switchProject(projId){
         
        this.switchHandler(this.projects.find(p => p.id === projId))
        this.projects = this.projects.filter(p => p.id !== projId);
    }
}