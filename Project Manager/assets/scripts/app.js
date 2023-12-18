class DOMFunc{

    static deleteEventListener(elem){
        
        const copyElem = elem.cloneNode(true); 
        elem.replaceWith(copyElem);
        return copyElem; 
    }

    static move(ID, destID) {

        const projectElem = document.getElementById(ID);
        const destElem = document.querySelector(destID);
        destElem.append(projectElem);
        projectElem.scrollIntoView();
    }
}

class Component { 
    
    constructor(hostElementId, insertBefore = false) {
        if (hostElementId) {
        this.hostElement = document.getElementById(hostElementId);
        } 
        else {
        this.hostElement = document.body;
        }

        this.insertBefore = insertBefore;
    }

    detach() {
        if (this.infoDiv) {
        this.infoDiv.remove();
        }
    }

    attach() {
        this.hostElement.insertAdjacentElement(
        this.insertBefore ? 'afterbegin' : 'beforeend',
        this.infoDiv
        );
     }
}

class Tooltip extends Component{

    constructor(closeMoreInfoFunc, projDataInfo, hostElementId){
        super(hostElementId);
        this.closeMoreInfoHandler = closeMoreInfoFunc;
        this.text = projDataInfo;
        this.createMoreInfo();
    }

    detachHandler = () => {
        this.detach();
        this.closeMoreInfoHandler();
    }

    createMoreInfo(){
        
        const infoDiv  = document.createElement("div");
        infoDiv.classList = "card";
        const infoDivTemplate = document.getElementById("more-info");
        const infoDivBody = document.importNode(infoDivTemplate.content, true);
        infoDivBody.querySelector("p").textContent = this.text;
        infoDiv.append(infoDivBody);

        const hostElPosLeft = this.hostElement.offsetLeft;
        const hostElPosTop = this.hostElement.offsetTop;
        const hostElHeight = this.hostElement.clientHeight;
        const parentElementScrolling = this.hostElement.parentElement.scrollTop;

        const x = hostElPosLeft + 20;
        const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

        infoDiv.style.position = 'absolute';
        infoDiv.style.left = x + 'px'; // 500px
        infoDiv.style.top = y + 'px';

        infoDiv.addEventListener("click", this.detachHandler);
        this.infoDiv = infoDiv;
    }
}

class ProjectItem {

    hasMoreInfoOpen = false;

    constructor(id, switchProjectFunc, type){

        this.id = id;
        this.switchProjectHandler = switchProjectFunc;
        this.connectSwitchButton(type);
        this.connectMoreInfo()
    }

    showMoreInfoHandler () {
        if (this.hasMoreInfoOpen)
            return

        const projElem = document.getElementById(this.id);
        const projDataInfo = projElem.dataset.extraInfo;

        const tooltip = new Tooltip(() => {
            this.hasMoreInfoOpen = false;
        }, projDataInfo, this.id);

        tooltip.attach();
        this.hasMoreInfoOpen = true;       
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

class ProjectList {

    projects = []

    constructor(type){

        this.type = type;
        const projItems = document.querySelectorAll(`#${type}-projects li`);
        for (const item of projItems)
            this.projects.push(new ProjectItem(item.id, this.switchProject.bind(this), this.type))
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

class App {

    static init() {
        const activeProjectList = new ProjectList("active");
        const finishedProjectList = new ProjectList("finished");
        activeProjectList.setSwitchHandler(finishedProjectList.addProject.bind(finishedProjectList))
        finishedProjectList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList))
    }
}

App.init()