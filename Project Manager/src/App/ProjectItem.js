import { DOMFunc } from "../Utility/DOMFunc.js";

export class ProjectItem {

    constructor(id, switchProjectFunc, type){

        this.id = id;
        this.hasMoreInfoOpen = false;
        this.switchProjectHandler = switchProjectFunc;
        this.connectSwitchButton(type);
        this.connectMoreInfo();
        this.connetDrag();
    }

    showMoreInfoHandler () {
    

        if (this.hasMoreInfoOpen)
            return

        const projElem = document.getElementById(this.id);
        const projDataInfo = projElem.dataset.extraInfo;

        import("./Tooltip.js").then(module => {

            const tooltip = new module.Tooltip(() => {
                this.hasMoreInfoOpen = false;
            }, projDataInfo, this.id);

            tooltip.attach();
            this.hasMoreInfoOpen = true;  
        })     
    }

    connetDrag() {
        
        document.getElementById(this.id).addEventListener("dragstart", event => {
            event.dataTransfer.setData("text/plain", this.id);
            event.dataTransfer.effectAllowed = "move"
        })
    }

    connectMoreInfo() { 
        const projItemElem = document.getElementById(this.id);
        const infoBttn = projItemElem.querySelector("button:first-of-type");
        infoBttn.addEventListener("click", this.showMoreInfoHandler.bind(this));
    }

    connectSwitchButton(type){

        const projItemElem = document.getElementById(this.id);
        let switchBttn = projItemElem.querySelector("button:last-of-type");
        switchBttn = DOMFunc.deleteEventListener(switchBttn);
        switchBttn.textContent = type === "active" ? "Finish": "Activate";
        switchBttn.addEventListener("click", this.switchProjectHandler.bind(null, this.id)) ;
    }

    updateEventListener(switchProjectFunc, type){
        this.switchProjectHandler = switchProjectFunc;
        this.connectSwitchButton(type)
    }
}
