
export const isValidRobotName = (robotname : string) : boolean =>  {
    return (robotname.length >= 3 && robotname.length <= 12);
}
