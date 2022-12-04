export interface TimeInterval {
    id: string;
    projectName: string;
    timeStart: Date;
    timeEnd: Date | null;
    duration: string;
}