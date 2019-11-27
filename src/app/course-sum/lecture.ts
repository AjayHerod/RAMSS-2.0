import { inherits } from 'util';

export class lecture {

    constructor(
        public coursecode: string,
        public faculty: string,
        public professor: string,
        
        public lecture1Day: string,
        public lecture1StartTime: number,
        public lecture1StartAcr: string,
        public lecture1EndTime: number,
        public lecture1EndAcr: string,
        public lecture1Location: string,

        public lecture2Day: string,
        public lecture2StartTime: number,
        public lecture2StartAcr: string,
        public lecture2EndTime: number,
        public lecture2EndAcr: string,
        public lecture2Location: string,

        public labDay: string,
        public labStartTime: number,
        public labStartAcr: string,
        public labEndTime: number,
        public labEndAcr: string,
        public labLocation: string,
        ){};

    
    }