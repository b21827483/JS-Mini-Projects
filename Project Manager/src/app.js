import {ProjectList} from "./App/ProjectList.js"

class App {

    static init() {
        console.log("INIT")
        const activeProjectList = new ProjectList("active");
        const finishedProjectList = new ProjectList("finished");
        activeProjectList.setSwitchHandler(finishedProjectList.addProject.bind(finishedProjectList))
        finishedProjectList.setSwitchHandler(activeProjectList.addProject.bind(activeProjectList))
    }
}

App.init()