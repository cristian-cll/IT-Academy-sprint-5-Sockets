import { animateScroll } from 'react-scroll';


export const scrollToBottom = ( id: string ) => {
    
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0
    });

}

export const scrollToBottomAnimated = ( id: any ) => {
    
    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250
    });

}