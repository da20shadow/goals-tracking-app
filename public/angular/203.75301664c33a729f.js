"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[203],{6203:(te,A,l)=>{l.r(A),l.d(A,{AgendaModule:()=>p});var T=l(6895),k=l(3127),y=l(797),v=l(1844),c=l(921),h=l(7340),Z=l(9722),w=l(9208),$=l(6184),M=l(431),C=l(6002),e=l(4650),b=l(953),U=l(6814),N=l(4359),O=l(1645),F=l(6194);class _{transform(n,t){if(n&&t){const a=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],i=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],o=new Date(n),r=new Date,d=new Date(t);if(r.getDate()!==o.getDate()&&r.getMonth()===o.getMonth()&&r.getFullYear()===o.getUTCFullYear())return r.getDate()-1===o.getDate()?`Yesterday ${this.getTime(o)} - Today ${this.getTime(d)}`:`${o.getDate()} ${i[o.getMonth()]} ${this.getTime(o)} - Today ${this.getTime(d)}`;if(o.getDate()+1===d.getDate())return`Today ${this.getTime(o)} - Tomorrow ${this.getTime(d)}`;if(o.getDate()<d.getDate()){let g=a[d.getDay()];return`Today ${this.getTime(o)} - ${g}, ${this.getTime(d)}`}return`Today ${this.getTime(o)} - ${this.getTime(d)}`}if(n){const a=new Date(n);return`Today ${this.getTime(a)} -`}if(t){const a=new Date(t);return`Today - ${this.getTime(a)}`}return""}getTime(n){return`${n.getHours()}:${n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes()}`}}_.\u0275fac=function(n){return new(n||_)},_.\u0275pipe=e.Yjl({name:"taskTime",type:_,pure:!0});const J=["calendarView"];function D(s,n){if(1&s&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&s){const t=n.ngIf;e.xp6(1),e.hij(" Today(",t.length,") ")}}function q(s,n){1&s&&(e.TgZ(0,"span",26),e._uU(1,"Today(0)"),e.qZA())}function Y(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"button",27),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.addNewTask())}),e._uU(1," + Add Task "),e.qZA()}}const f=function(s){return["/tasks",s]};function H(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"li",29)(1,"p",30)(2,"span",31),e.NdJ("click",function(){const o=e.CHM(t).$implicit,r=e.oxw(2);return e.KtG(r.openViewTaskModal(o))}),e._uU(3),e.qZA(),e.TgZ(4,"span",32),e._uU(5),e.qZA()(),e.TgZ(6,"span",33),e._uU(7),e.ALo(8,"taskTime"),e.qZA()()}if(2&s){const t=n.$implicit;e.xp6(3),e.Oqu(t.title),e.xp6(1),e.Q6J("routerLink",e.VKq(7,f,t.id)),e.xp6(1),e.Oqu(t.title),e.xp6(2),e.Oqu(e.xi3(8,4,t.start_date,t.end_date))}}function Q(s,n){if(1&s&&(e.TgZ(0,"ul"),e.YNc(1,H,9,9,"li",28),e.qZA()),2&s){const t=n.ngIf;e.xp6(1),e.Q6J("ngForOf",t)}}function I(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"li",29)(1,"p",30)(2,"span",31),e.NdJ("click",function(){const o=e.CHM(t).$implicit,r=e.oxw(2);return e.KtG(r.openViewTaskModal(o))}),e._uU(3),e.qZA(),e.TgZ(4,"span",32),e._uU(5),e.qZA()(),e.TgZ(6,"span",34),e._uU(7),e.ALo(8,"date"),e.qZA()()}if(2&s){const t=n.$implicit;e.Q6J("@fadeInOut",void 0),e.xp6(3),e.Oqu(t.title),e.xp6(1),e.Q6J("routerLink",e.VKq(8,f,t.id)),e.xp6(1),e.Oqu(t.title),e.xp6(2),e.hij(" ",e.xi3(8,5,t.end_date,"MMM d, y")," ")}}function L(s,n){if(1&s&&(e.TgZ(0,"ul"),e.YNc(1,I,9,10,"li",28),e.qZA()),2&s){const t=n.ngIf;e.xp6(1),e.Q6J("ngForOf",t)}}function S(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"li",29)(1,"p",30)(2,"span",31),e.NdJ("click",function(){const o=e.CHM(t).$implicit,r=e.oxw(2);return e.KtG(r.openViewTaskModal(o))}),e._uU(3),e.qZA(),e.TgZ(4,"span",32),e._uU(5),e.qZA()(),e.TgZ(6,"span",35),e._uU(7),e.ALo(8,"date"),e.qZA()()}if(2&s){const t=n.$implicit;e.Q6J("@fadeInOut",void 0),e.xp6(3),e.Oqu(t.title),e.xp6(1),e.Q6J("routerLink",e.VKq(8,f,t.id)),e.xp6(1),e.Oqu(t.title),e.xp6(2),e.hij(" ",e.xi3(8,5,t.start_date,"E, dd MMM, y")," ")}}function E(s,n){if(1&s&&(e.TgZ(0,"ul"),e.YNc(1,S,9,10,"li",28),e.qZA()),2&s){const t=n.ngIf;e.xp6(1),e.Q6J("ngForOf",t)}}function V(s,n){if(1&s){const t=e.EpF();e.TgZ(0,"li",29)(1,"p",30)(2,"span",31),e.NdJ("click",function(){const o=e.CHM(t).$implicit,r=e.oxw(2);return e.KtG(r.openViewTaskModal(o))}),e._uU(3),e.qZA(),e.TgZ(4,"span",32),e._uU(5),e.qZA()(),e.TgZ(6,"span",35),e._uU(7),e.ALo(8,"date"),e.qZA()()}if(2&s){const t=n.$implicit;e.Q6J("@fadeInOut",void 0),e.xp6(3),e.Oqu(t.title),e.xp6(1),e.Q6J("routerLink",e.VKq(8,f,t.id)),e.xp6(1),e.Oqu(t.title),e.xp6(2),e.hij(" ",e.xi3(8,5,t.end_date,"H:mm")," ")}}function j(s,n){if(1&s&&(e.TgZ(0,"ul"),e.YNc(1,V,9,10,"li",28),e.qZA()),2&s){const t=n.ngIf;e.xp6(1),e.Q6J("ngForOf",t)}}function K(s,n){if(1&s&&(e.TgZ(0,"div",36)(1,"span"),e._uU(2),e.qZA()()),2&s){const t=n.$implicit;e.xp6(2),e.Oqu(t)}}function G(s,n){if(1&s){const t=e.EpF();e.ynx(0),e.TgZ(1,"p",38)(2,"span",31),e.NdJ("click",function(){e.CHM(t);const i=e.oxw().$implicit,o=e.oxw();return e.KtG(o.openViewTaskModal(i))}),e._uU(3),e.qZA(),e.TgZ(4,"span",32),e._uU(5),e.qZA(),e.TgZ(6,"span",39),e._uU(7),e.ALo(8,"taskTime"),e.qZA()(),e.BQk()}if(2&s){const t=e.oxw().$implicit,a=e.oxw();e.xp6(1),e.Akn("height:"+a.calculateTaskHeight(t)+"px"),e.xp6(2),e.Oqu(t.title),e.xp6(1),e.Q6J("routerLink",e.VKq(9,f,t.id)),e.xp6(1),e.Oqu(t.title),e.xp6(2),e.Oqu(e.xi3(8,6,t.start_date,t.end_date))}}function P(s,n){if(1&s&&(e.TgZ(0,"div",37),e.YNc(1,G,9,11,"ng-container",11),e.qZA()),2&s){const t=n.$implicit,a=e.oxw();e.Akn("top:"+a.calculateTopPx(t)+"px;"),e.xp6(1),e.Q6J("ngIf",a.calculateTaskHeight(t))}}function B(s,n){1&s&&(e.TgZ(0,"div",40),e._UZ(1,"div",41)(2,"div",41),e.qZA())}class x{constructor(n,t,a,i){this.taskService=n,this.store$=t,this.modalService=a,this.notificationService=i,this.showOverdueTasks=!1,this.showNextTasks=!1,this.showUnscheduledTasks=!1,this.today=new Date,this.times=C.S,this.todayTasks$=this.store$.select(v.f.selectTodayTasks),this.overdueTasks$=this.store$.select(v.f.selectOverdueTasks),this.nextTasks$=this.store$.select(v.f.selectNextTasks),this.unscheduledTasks$=this.store$.select(v.f.selectUnscheduledTasks)}ngOnInit(){this.store$.dispatch(c.w.getTodayTasks()),this.store$.dispatch(c.w.getOverdueTasks()),this.store$.dispatch(c.w.getNextTasks()),this.store$.dispatch(c.w.getUnscheduledTasks());let n=new Date;this.hourNow=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,this.lineTopPx=`${60*n.getHours()+n.getMinutes()}px`;const t=1e3*(60-n.getSeconds());setTimeout(()=>{this.interval=setInterval(()=>{n=new Date,this.hourNow=`${n.getHours()}:${String(n.getMinutes()).padStart(2,"0")}`,this.lineTopPx=`${60*n.getHours()+n.getMinutes()}px`},6e4)},t)}ngAfterViewInit(){let n=new Date;this.calendarView.nativeElement.scrollTop=60*n.getHours()+n.getMinutes()}ngOnDestroy(){this.interval&&clearInterval(this.interval)}addNewTask(){this.modalService.openFormModal(Z.e).afterClosed().subscribe(t=>{const a=t.data&&t.data.taskForm&&t.data.taskForm.value?t.data.taskForm.value:null;if(a){let i={};i={...i,title:a.title},""!==a.priority&&(i={...i,priority:a.priority}),""!==a.status&&(i={...i,status:a.status}),""!==a.start_date&&(i={...i,start_date:a.start_date}),""!==a.end_date&&(i={...i,end_date:a.end_date}),this.taskService.saveTask(i).subscribe({next:o=>{this.notificationService.showSuccessNotification(o.message);const r=o.task;let d,g;console.log("response.task:",r),r.start_date&&(d=new Date(r.start_date)),r.end_date&&(g=new Date(r.end_date));const m=new Date;(d&&d.getDate()===m.getDate()&&d.getMonth()===m.getMonth()&&d.getFullYear()===m.getFullYear()||g&&g.getDate()===m.getDate()&&g.getMonth()===m.getMonth()&&g.getFullYear()===m.getFullYear())&&(this.store$.dispatch(M.X.addTodayTaskSuccess({task:r})),r.priority===y.T.URGENT&&this.store$.dispatch($.U.addUrgentTaskSuccess({task:r})))},error:o=>this.notificationService.showErrorNotification(o.error.message)})}})}getOverdueTasks(){this.store$.dispatch(c.w.getOverdueTasks())}getNextTasks(){this.store$.dispatch(c.w.getNextTasks())}getUnscheduledTasks(){this.store$.dispatch(c.w.getUnscheduledTasks())}openViewTaskModal(n){this.modalService.openFormModal(w.e,{task:n})}logScroll(n){console.log(n)}calculateTopPx(n){if(n.start_date){const t=new Date(n.start_date);return 60*t.getHours()+t.getMinutes()}return null}calculateTaskHeight(n){if(n.start_date&&n.end_date){const t=new Date(n.start_date),a=60*t.getHours()+t.getMinutes(),i=new Date(n.end_date),o=60*i.getHours()+i.getMinutes(),r=o-a,d=1440-o;return r>=d?d:r}return null}isAllDayTask(n){const t=n.start_date?new Date(n.start_date):null,a=n.end_date?new Date(n.end_date):null;return!(!t||0!==t.getHours()||0!==t.getMinutes()||!a||0!==a.getHours()||0!==a.getMinutes())}}x.\u0275fac=function(n){return new(n||x)(e.Y36(b.M),e.Y36(U.yh),e.Y36(N.Z),e.Y36(O.g))},x.\u0275cmp=e.Xpm({type:x,selectors:[["app-agenda"]],viewQuery:function(n,t){if(1&n&&e.Gf(J,5),2&n){let a;e.iGM(a=e.CRH())&&(t.calendarView=a.first)}},decls:53,vars:45,consts:[[3,"title"],[1,"px-2","py-5","md:p-5","grid","grid-cols-1","lg:grid-cols-2","gap-5"],[1,"h-[75vh]","p-5","bg-white","dark:bg-gray-900","border","overflow-auto","rounded-md"],[1,"text-2xl"],[1,"my-3"],["type","hidden","value","false"],["showAddTaskButton",""],[1,"mb-3","h-4","flex","gap-3","items-center",3,"mouseenter","mouseleave"],[4,"ngIf","ngIfElse"],["todayTasksTemplate",""],["class","px-2 py-1 text-sm dark:hover:bg-gray-700 dark:active:bg-gray-800 rounded",3,"click",4,"ngIf"],[4,"ngIf"],[1,"my-3","text-sm","cursor-pointer",3,"click"],["id","calendarView",1,"h-[75vh]","md:p-5","bg-white","dark:bg-gray-900","border","overflow-auto","rounded-md"],["calendarView",""],[1,"pl-5","md:pl-0","text-2xl"],[1,"pl-5","md:pl-0","mb-3"],[1,"flex"],[1,"w-[70px]","h-[100%]","border-r","dark:border-gray-600"],["class","w-[70px] h-[60px] flex justify-center text-sm relative",4,"ngFor","ngForOf"],[1,"w-full","relative"],[1,"flex","items-center","absolute","left-[-58px]","z-20"],[1,"px-2","text-orange-900","bg-orange-400","rounded-lg"],[1,"h-[1px]","w-[82vw]","lg:w-[36vw]","bg-orange-400"],["class","absolute z-10 w-[100%] mx-[1px]",3,"style",4,"ngFor","ngForOf"],["class","h-[60px] border-b dark:border-gray-600",4,"ngFor","ngForOf"],[1,"py-1","text-sm"],[1,"px-2","py-1","text-sm","dark:hover:bg-gray-700","dark:active:bg-gray-800","rounded",3,"click"],["class","p-2 bg-gray-50 hover:bg-gray-100 border border-gray-50 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-500 text-sm flex items-center relative dark:bg-gray-800 dark:hover:bg-gray-700",4,"ngFor","ngForOf"],[1,"p-2","bg-gray-50","hover:bg-gray-100","border","border-gray-50","hover:border-gray-400","dark:border-gray-800","dark:hover:border-gray-500","text-sm","flex","items-center","relative","dark:bg-gray-800","dark:hover:bg-gray-700"],[1,"text-ellipsis","overflow-hidden","..."],[1,"cursor-pointer","hidden","md:inline-block",3,"click"],[1,"cursor-pointer","inline-block","md:hidden",3,"routerLink"],[1,"text-[0.75rem]","absolute","right-1","dark:text-[#b9b901]"],[1,"text-[12px]","text-rose-300","absolute","right-1"],[1,"text-[12px]","text-cyan-300","absolute","right-1"],[1,"w-[70px]","h-[60px]","flex","justify-center","text-sm","relative"],[1,"absolute","z-10","w-[100%]","mx-[1px]"],[1,"p-1","text-sm","text-ellipsis","overflow-hidden","...","bg-gray-800","hover:bg-gray-700","border","rounded"],[1,"absolute","text-[10px]","bottom-0","right-1"],[1,"h-[60px]","border-b","dark:border-gray-600"],[1,"cursor-pointer","h-[30px]","hover:bg-gray-100","dark:hover:bg-gray-800"]],template:function(n,t){if(1&n){const a=e.EpF();e._UZ(0,"app-page-title",0),e.TgZ(1,"section",1)(2,"div",2)(3,"h3",3),e._uU(4,"My Work"),e.qZA(),e._UZ(5,"hr",4)(6,"input",5,6),e.TgZ(8,"div",7),e.NdJ("mouseenter",function(){e.CHM(a);const o=e.MAs(7);return e.KtG(o.value="true")})("mouseleave",function(){e.CHM(a);const o=e.MAs(7);return e.KtG(o.value="false")}),e.YNc(9,D,2,1,"span",8),e.ALo(10,"async"),e.YNc(11,q,2,0,"ng-template",null,9,e.W1O),e.YNc(13,Y,2,0,"button",10),e.qZA(),e.YNc(14,Q,2,1,"ul",11),e.ALo(15,"async"),e.TgZ(16,"p",12),e.NdJ("click",function(){return t.getOverdueTasks(),t.showOverdueTasks=!t.showOverdueTasks}),e._uU(17),e.ALo(18,"async"),e.ALo(19,"async"),e.qZA(),e.YNc(20,L,2,1,"ul",11),e.ALo(21,"async"),e.TgZ(22,"p",12),e.NdJ("click",function(){return t.getNextTasks(),t.showNextTasks=!t.showNextTasks}),e._uU(23),e.ALo(24,"async"),e.ALo(25,"async"),e.qZA(),e.YNc(26,E,2,1,"ul",11),e.ALo(27,"async"),e.TgZ(28,"p",12),e.NdJ("click",function(){return t.getUnscheduledTasks(),t.showUnscheduledTasks=!t.showUnscheduledTasks}),e._uU(29),e.ALo(30,"async"),e.ALo(31,"async"),e.qZA(),e.YNc(32,j,2,1,"ul",11),e.ALo(33,"async"),e.qZA(),e.TgZ(34,"div",13,14)(36,"h3",15),e._uU(37,"Calendar"),e.qZA(),e._UZ(38,"hr",4),e.TgZ(39,"p",16),e._uU(40),e.ALo(41,"date"),e.qZA(),e.TgZ(42,"section",17)(43,"div",18),e.YNc(44,K,3,1,"div",19),e.qZA(),e.TgZ(45,"div",20)(46,"div",21)(47,"span",22),e._uU(48),e.qZA(),e._UZ(49,"span",23),e.qZA(),e.YNc(50,P,2,3,"div",24),e.ALo(51,"async"),e.YNc(52,B,3,0,"div",25),e.qZA()()()()}if(2&n){const a=e.MAs(7),i=e.MAs(12);let o,r,d;e.Q6J("title","Agenda"),e.xp6(9),e.Q6J("ngIf",e.lcZ(10,18,t.todayTasks$))("ngIfElse",i),e.xp6(4),e.Q6J("ngIf","true"===a.value),e.xp6(1),e.Q6J("ngIf",e.lcZ(15,20,t.todayTasks$)),e.xp6(3),e.hij(" Overdue(",null!=(o=e.lcZ(18,22,t.overdueTasks$))&&o.length?null==(o=e.lcZ(19,24,t.overdueTasks$))?null:o.length:"0",")"),e.xp6(3),e.Q6J("ngIf",t.showOverdueTasks&&e.lcZ(21,26,t.overdueTasks$)),e.xp6(3),e.hij("Next(",null!=(r=e.lcZ(24,28,t.nextTasks$))&&r.length?null==(r=e.lcZ(25,30,t.nextTasks$))?null:r.length:"0",")"),e.xp6(3),e.Q6J("ngIf",t.showNextTasks&&e.lcZ(27,32,t.nextTasks$)),e.xp6(3),e.hij(" Unscheduled(",null!=(d=e.lcZ(30,34,t.unscheduledTasks$))&&d.length?null==(d=e.lcZ(31,36,t.unscheduledTasks$))?null:d.length:"0",")"),e.xp6(3),e.Q6J("ngIf",t.showUnscheduledTasks&&e.lcZ(33,38,t.unscheduledTasks$)),e.xp6(8),e.hij("Today: ",e.xi3(41,40,t.today,"d MMM, EEEE"),""),e.xp6(4),e.Q6J("ngForOf",t.times),e.xp6(2),e.Akn("top:"+t.lineTopPx),e.xp6(2),e.Oqu(t.hourNow),e.xp6(2),e.Q6J("ngForOf",e.lcZ(51,43,t.todayTasks$)),e.xp6(2),e.Q6J("ngForOf",t.times)}},dependencies:[T.sg,T.O5,k.rH,F.T,T.Ov,T.uU,_],data:{animation:[(0,h.X$)("fadeInOut",[(0,h.SB)("void",(0,h.oB)({transform:"scaleX(0.01)",opacity:0})),(0,h.eR)("void <=> *",(0,h.jt)(400))])]}});const R=[{path:"",component:x}];class u{}u.\u0275fac=function(n){return new(n||u)},u.\u0275mod=e.oAB({type:u}),u.\u0275inj=e.cJS({imports:[k.Bz.forChild(R),k.Bz]});var z=l(4006),X=l(7392),W=l(9017),ee=l(990);class p{}p.\u0275fac=function(n){return new(n||p)},p.\u0275mod=e.oAB({type:p}),p.\u0275inj=e.cJS({imports:[T.ez,k.Bz,z.u5,X.Ps,W.Tx,u,ee.m]})}}]);