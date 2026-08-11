import {

Home,

ClipboardList,

ClipboardCheck,

Clock3,

Monitor,

BarChart3,

Gauge,

Database

} from "lucide-react";

export const navigation = [

{

title:"",

items:[

{

name:"Home",

icon:Home,

path:"/"

},

{

name:"Production Planning",

icon:ClipboardList,

path:"/production-planning"

},

{

name:"Production Log",

icon:ClipboardCheck,

path:"/production-log"

},

{

name:"Downtime Log",

icon:Clock3,

path:"/downtime-log"

}

]

},

{

title:"DASHBOARDS",

items:[

{

name:"Live Shopfloor",

icon:Monitor,

path:"/live-shopfloor"

}

]

},

{

title:"REPORTS",

items:[

{

name:"Production",

icon:BarChart3,

path:"/reports/production"

},

{

name:"Downtime",

icon:Clock3,

path:"/reports/downtime"

},

{

name:"Quality",

icon:ClipboardCheck,

path:"/reports/quality"

},

{

name:"Performance",

icon:Gauge,

path:"/reports/performance"

}

]

},

{

title:"",

items:[

{

name:"Master Data",

icon:Database,

path:"/master-data"

}

]

}

];