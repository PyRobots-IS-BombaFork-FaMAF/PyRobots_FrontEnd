export type Robot = {
    avatar : string,
    name : string,
    wins: number,
    loses: number
};

export type ListRobots = Robot[];

const robotsApi : ListRobots = [{"avatar":"PortaVolutpatQuam.mp3","name":"erowth0","wins":105,"loses":498},
{"avatar":"Suscipit.pdf","name":"glambard1","wins":254,"loses":653},
{"avatar":"NecCondimentumNeque.mp3","name":"ggwinnel2","wins":6,"loses":681},
{"avatar":"RhoncusSedVestibulum.mov","name":"gportal3","wins":687,"loses":770},
{"avatar":"UtNullaSed.avi","name":"bonoulane4","wins":485,"loses":63},
{"avatar":"AliquetPulvinar.xls","name":"ybeecker5","wins":368,"loses":22},
{"avatar":"CurabiturInLibero.xls","name":"gbrevetor6","wins":613,"loses":149},
{"avatar":"QuamSollicitudin.avi","name":"mkoppel7","wins":363,"loses":179},
{"avatar":"NamNulla.avi","name":"grubberts8","wins":388,"loses":95},
{"avatar":"Vel.avi","name":"pkochs9","wins":987,"loses":175},
{"avatar":"InConsequat.avi","name":"astelfoxa","wins":645,"loses":3},
{"avatar":"Dolor.avi","name":"lgrimmeb","wins":40,"loses":201},
{"avatar":"Eu.avi","name":"mjenmanc","wins":224,"loses":964},
{"avatar":"SitAmetSapien.xls","name":"fwisond","wins":198,"loses":539},
{"avatar":"Ut.avi","name":"tcruikshanke","wins":233,"loses":92},
{"avatar":"Pellentesque.ppt","name":"triddingf","wins":654,"loses":918},
{"avatar":"Amet.mov","name":"clorandg","wins":419,"loses":825},
{"avatar":"LiberoUt.ppt","name":"sramsdaleh","wins":931,"loses":304},
{"avatar":"AnteIpsum.mpeg","name":"mgibbetti","wins":691,"loses":588},
{"avatar":"LectusIn.xls","name":"rlamploughj","wins":657,"loses":891},
{"avatar":"UtMassa.xls","name":"carmerk","wins":57,"loses":371},
{"avatar":"Eget.txt","name":"oantonuccil","wins":978,"loses":933},
{"avatar":"AmetConsectetuer.ppt","name":"lhirtzmannm","wins":510,"loses":912},
{"avatar":"FacilisiCrasNon.xls","name":"vspellardn","wins":519,"loses":608},
{"avatar":"NullaSuscipit.mp3","name":"mholseyo","wins":858,"loses":355},
{"avatar":"SollicitudinVitaeConsectetuer.xls","name":"oflutep","wins":964,"loses":284},
{"avatar":"CongueVivamusMetus.gif","name":"shasluckq","wins":624,"loses":543},
{"avatar":"LoremIntegerTincidunt.doc","name":"kturoner","wins":133,"loses":739},
{"avatar":"NullamPorttitorLacus.ppt","name":"iburnsides","wins":53,"loses":543},
{"avatar":"SemperInterdumMauris.mp3","name":"zzanettot","wins":851,"loses":766}];

export const RobotsStatsApi = (access_token: string, setLoading : Function) : ListRobots=> {
    setLoading(false);
    return (robotsApi);
}
