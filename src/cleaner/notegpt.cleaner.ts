export const notegptCleaner = ()=>{
// Set height for all .container.h-100 elements
    document.querySelectorAll('.container.h-100').forEach((el) => {
        if (el) { // @ts-ignore
            el.style.setProperty('height', '1600px', 'important');
        }
    });

// Remove all .ng-generate-content divs
    document.querySelectorAll('div.ng-generate-content').forEach((el) => {
        if (el && el.remove) el.remove();
    });

// Set width of .ng-generate-video to 100%
    const videoEl = document.querySelector('.ng-generate-video');
    if (videoEl) { // @ts-ignore
        videoEl.style.setProperty('width', '100%', 'important');
    }

// Set height of #app
    const appEl = document.getElementById('app');
    if (appEl) appEl.style.setProperty('height', '1800px', 'important');

// Set height for all .play-box elements
    document.querySelectorAll('.play-box').forEach((el) => {
        if (el) { // @ts-ignore
            el.style.setProperty('height', '600px', 'important');
        }
    });

// Set height of #youtebeSummary
    const summaryEl = document.getElementById('youtebeSummary');
    if (summaryEl) summaryEl.style.setProperty('height', '1200px', 'important');

// Set height for all .ng-generate-body elements
    document.querySelectorAll('.ng-generate-body').forEach((el) => {
        if (el) { // @ts-ignore
            el.style.setProperty('height', '1600px', 'important');
        }
    });

// Set height for all .ng-transcript.ng-generate-video_transcript elements
    document.querySelectorAll('.ng-transcript.ng-generate-video_transcript').forEach((el) => {
        if (el) { // @ts-ignore
            el.style.setProperty('height', '1600px', 'important');
        }
    });

// Set height for all .ng-generate-video-content elements
    document.querySelectorAll('.ng-generate-video-content').forEach((el) => {
        if (el) { // @ts-ignore
            el.style.setProperty('height', '1600px', 'important');
        }
    });

// Set height for the first <div> inside .ng-generate-video_transcript
    const transcriptParent = document.querySelector('.ng-generate-video_transcript');
    if (transcriptParent) {
        const firstDiv = transcriptParent.querySelector('div');
        if (firstDiv) firstDiv.style.setProperty('height', '430px', 'important');
    }

// Remove all <section> elements
    document.querySelectorAll('section').forEach((el) => {
        if (el && el.remove) el.remove();
    });

}