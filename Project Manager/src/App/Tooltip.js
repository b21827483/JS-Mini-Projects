import { Component } from "./Component.js";

export class Tooltip extends Component{

    constructor(closeMoreInfoFunc, projDataInfo, hostElementId){
        super(hostElementId);
        this.closeMoreInfoHandler = closeMoreInfoFunc;
        this.text = projDataInfo;
        
        this.detachHandler = () => {
            this.detach();
            this.closeMoreInfoHandler();
        }

        this.createMoreInfo();
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