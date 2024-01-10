export class DOMFunc{

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
