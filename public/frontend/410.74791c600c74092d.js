"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[410],{2410:(z,k,s)=>{s.r(k),s.d(k,{TasksModule:()=>_});var g=s(6895),m=s(3127),T=s(797),f=s(3645),v=s(6911),y=s(6184),l=s(7340),t=s(4650),A=s(6814),b=s(953),U=s(1645),c=s(4006),Z=s(7392),x=s(9017),w=s(6896);function M(e,a){1&e&&(t.TgZ(0,"mat-icon"),t._uU(1,"flag"),t.qZA()),2&e&&t.Akn("color:darkred; padding: 3px 0 5px 4px; font-size:30px; height:38px; width:40px; border:1px solid; border-radius:50%;")}function q(e,a){1&e&&(t.TgZ(0,"mat-icon"),t._uU(1,"flag"),t.qZA()),2&e&&t.Akn("color:darkorange; padding: 3px 0 5px 4px; font-size:30px; height:38px; width:40px; border:1px solid; border-radius:50%;")}function D(e,a){1&e&&(t.TgZ(0,"mat-icon"),t._uU(1,"flag"),t.qZA()),2&e&&t.Akn("color: darkblue; padding: 3px 0 5px 4px; font-size:30px; height:38px; width:40px; border:1px solid; border-radius:50%;")}function C(e,a){1&e&&(t.TgZ(0,"mat-icon"),t._uU(1,"flag"),t.qZA()),2&e&&t.Akn("color: darkgray; padding: 3px 0 5px 4px; font-size:30px; height:38px; width:40px; border:1px solid; border-radius:50%;")}function J(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"button",8),t.NdJ("click",function(){const r=t.CHM(n).$implicit;t.oxw();const d=t.MAs(28),h=t.oxw().ngIf;return t.oxw().updateTaskId(h.id,h.status,"status",r),t.KtG(d.innerText=r)}),t._uU(1),t.qZA()}if(2&e){const n=a.$implicit;t.xp6(1),t.hij(" ",n," ")}}function I(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"section")(1,"div",5)(2,"button",6)(3,"mat-icon"),t._uU(4,"more_vert"),t.qZA()(),t.TgZ(5,"mat-menu",null,7)(7,"button",8),t.NdJ("click",function(){t.CHM(n);const o=t.oxw(2);return t.KtG(o.editTask=!0)}),t.TgZ(8,"mat-icon"),t._uU(9,"edit"),t.qZA(),t.TgZ(10,"span"),t._uU(11,"Edit"),t.qZA()(),t.TgZ(12,"button",8),t.NdJ("click",function(){t.CHM(n);const o=t.oxw().ngIf,r=t.oxw();return t.KtG(r.deleteTask(o))}),t.TgZ(13,"mat-icon"),t._uU(14,"delete"),t.qZA(),t.TgZ(15,"span"),t._uU(16,"Delete"),t.qZA()()()(),t.TgZ(17,"section",9)(18,"span",10,11),t.ynx(20,12),t.YNc(21,M,2,2,"mat-icon",13),t.YNc(22,q,2,2,"mat-icon",13),t.YNc(23,D,2,2,"mat-icon",13),t.YNc(24,C,2,2,"mat-icon",13),t.BQk(),t.qZA(),t.TgZ(25,"div",14)(26,"div",15)(27,"span",null,16),t._uU(29),t.qZA(),t.TgZ(30,"mat-icon"),t._uU(31,"arrow_right"),t.qZA()(),t.TgZ(32,"mat-menu",17,18),t.YNc(34,J,2,1,"button",19),t.qZA()()(),t.TgZ(35,"pre",20),t._uU(36),t.qZA(),t.TgZ(37,"div",21)(38,"p",15)(39,"mat-icon",22),t._uU(40,"calendar_today"),t.qZA(),t.TgZ(41,"span"),t._uU(42),t.ALo(43,"date"),t.qZA()(),t.TgZ(44,"p",15)(45,"mat-icon",23),t._uU(46,"event"),t.qZA(),t.TgZ(47,"span"),t._uU(48),t.ALo(49,"date"),t.qZA()()()()}if(2&e){const n=t.MAs(6),i=t.MAs(33),o=t.oxw().ngIf,r=t.oxw();t.Q6J("@fadeInOut",void 0),t.xp6(2),t.Q6J("matMenuTriggerFor",n),t.xp6(18),t.Q6J("ngSwitch",o.priority),t.xp6(1),t.Q6J("ngSwitchCase",r.TaskPriorityNames.URGENT),t.xp6(1),t.Q6J("ngSwitchCase",r.TaskPriorityNames.HIGH),t.xp6(1),t.Q6J("ngSwitchCase",r.TaskPriorityNames.LOW),t.xp6(1),t.Q6J("ngSwitchCase",r.TaskPriorityNames.NO_PRIORITY),t.xp6(1),t.Q6J("matMenuTriggerFor",i),t.xp6(4),t.Oqu(o.status),t.xp6(5),t.Q6J("ngForOf",r.taskStatuses),t.xp6(2),t.Oqu(o.description),t.xp6(6),t.hij("Start Date: ",t.xi3(43,13,o.start_date,"MMM d, y"),""),t.xp6(6),t.hij("End Date: ",t.xi3(49,16,o.end_date,"MMM d, y"),"")}}function Q(e,a){1&e&&(t.TgZ(0,"span",58),t._uU(1," Please enter Title! "),t.qZA())}function N(e,a){1&e&&(t.TgZ(0,"span",58),t._uU(1," The task title must be at least 5 - 145 characters long! "),t.qZA())}function S(e,a){if(1&e&&(t.ynx(0),t.YNc(1,Q,2,0,"span",57),t.YNc(2,N,2,0,"span",57),t.BQk()),2&e){t.oxw();const n=t.MAs(5);t.xp6(1),t.Q6J("ngIf",null==n.errors?null:n.errors.required),t.xp6(1),t.Q6J("ngIf",null==n.errors?null:n.errors.minlength)}}function Y(e,a){1&e&&(t.TgZ(0,"span",58),t._uU(1," Start Date can not be empty! "),t.qZA())}function F(e,a){if(1&e&&(t.ynx(0),t.YNc(1,Y,2,0,"span",57),t.BQk()),2&e){t.oxw();const n=t.MAs(14);t.xp6(1),t.Q6J("ngIf",null==n.errors?null:n.errors.required)}}function O(e,a){1&e&&(t.TgZ(0,"span",58),t._uU(1," task Due Date can not be empty! "),t.qZA())}function $(e,a){if(1&e&&(t.ynx(0),t.YNc(1,O,2,0,"span",57),t.BQk()),2&e){t.oxw();const n=t.MAs(53);t.xp6(1),t.Q6J("ngIf",null==n.errors?null:n.errors.required)}}function B(e,a){1&e&&(t.TgZ(0,"span",58),t._uU(1," Description can not be empty! "),t.qZA())}function P(e,a){if(1&e&&(t.ynx(0),t.YNc(1,B,2,0,"span",57),t.BQk()),2&e){t.oxw();const n=t.MAs(58);t.xp6(1),t.Q6J("ngIf",null==n.errors?null:n.errors.required)}}function j(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"form",24,25),t.NdJ("ngSubmit",function(){t.CHM(n);const o=t.MAs(1),r=t.oxw().ngIf,d=t.oxw();return t.KtG(d.editTaskFormHandler(o,r))}),t.TgZ(2,"div")(3,"div",26),t._UZ(4,"input",27,28),t.qZA(),t.YNc(6,S,3,2,"ng-container",0),t.qZA(),t.TgZ(7,"section",29)(8,"div",30)(9,"label",31),t._uU(10,"Start Date:"),t.qZA(),t.TgZ(11,"div",15)(12,"div",26),t._UZ(13,"input",32,33),t.qZA(),t.YNc(15,F,2,1,"ng-container",0),t.qZA(),t.TgZ(16,"div",15)(17,"div",26)(18,"select",34,35)(20,"option",36),t._uU(21,"Time"),t.qZA(),t.TgZ(22,"option",37),t._uU(23,"08:00"),t.qZA(),t.TgZ(24,"option",38),t._uU(25,"09:00"),t.qZA(),t.TgZ(26,"option",39),t._uU(27,"10:00"),t.qZA(),t.TgZ(28,"option",40),t._uU(29,"11:00"),t.qZA(),t.TgZ(30,"option",41),t._uU(31,"12:00"),t.qZA(),t.TgZ(32,"option",42),t._uU(33,"13:00"),t.qZA(),t.TgZ(34,"option",43),t._uU(35,"14:00"),t.qZA(),t.TgZ(36,"option",44),t._uU(37,"15:00"),t.qZA(),t.TgZ(38,"option",45),t._uU(39,"16:00"),t.qZA(),t.TgZ(40,"option",46),t._uU(41,"17:00"),t.qZA(),t.TgZ(42,"option",47),t._uU(43,"18:00"),t.qZA(),t.TgZ(44,"option",48),t._uU(45,"19:00"),t.qZA(),t.TgZ(46,"option",49),t._uU(47,"20:00"),t.qZA()()()()(),t.TgZ(48,"div",50)(49,"label",31),t._uU(50,"End Date:"),t.qZA(),t.TgZ(51,"div",26),t._UZ(52,"input",51,52),t.qZA(),t.YNc(54,$,2,1,"ng-container",0),t.qZA()(),t.TgZ(55,"div")(56,"div",26),t._UZ(57,"textarea",53,54),t.qZA(),t.YNc(59,P,2,1,"ng-container",0),t.qZA(),t.TgZ(60,"div")(61,"button",55),t._uU(62," Save Changes "),t.qZA(),t.TgZ(63,"button",56),t.NdJ("click",function(){t.CHM(n);const o=t.oxw(2);return t.KtG(o.editTask=!1)}),t._uU(64," Cancel "),t.qZA()()()}if(2&e){const n=t.MAs(5),i=t.MAs(14),o=t.MAs(53),r=t.oxw().ngIf,d=t.oxw();t.Q6J("@fadeTaskInOut",void 0),t.xp6(4),t.Q6J("ngModel",r.title),t.xp6(2),t.Q6J("ngIf",n.touched),t.xp6(7),t.Q6J("ngModel",d.toInputDefaultDate(r.start_date)),t.xp6(2),t.Q6J("ngIf",i.touched),t.xp6(37),t.Q6J("ngModel",d.toInputDefaultDate(r.end_date)),t.xp6(2),t.Q6J("ngIf",o.touched),t.xp6(3),t.Q6J("ngModel",r.description),t.xp6(2),t.Q6J("ngIf",n.touched)}}const H=function(e){return["/target",e]};function R(e,a){if(1&e&&(t.ynx(0),t._UZ(1,"app-page-title",1),t.TgZ(2,"button",2)(3,"mat-icon"),t._uU(4,"arrow_back_ios_new"),t.qZA(),t.TgZ(5,"span"),t._uU(6,"Target"),t.qZA()(),t.TgZ(7,"article",3),t.YNc(8,I,50,19,"section",0),t.YNc(9,j,65,9,"form",4),t.qZA(),t.BQk()),2&e){const n=a.ngIf,i=t.oxw();t.xp6(1),t.Q6J("text",n.title),t.xp6(1),t.Q6J("routerLink",t.VKq(4,H,n.target_id)),t.xp6(6),t.Q6J("ngIf",!i.editTask),t.xp6(1),t.Q6J("ngIf",i.editTask)}}class u{constructor(a,n,i,o){this.store$=a,this.taskService=n,this.notificationService=i,this.activatedRoute=o,this.taskStatuses=Object.values(T.h),this.taskPriority=Object.values(T.T),this.TaskPriorityNames=T.T,this.editTask=!1,this.activeTask$=this.store$.select(v.N.selectActiveTask)}ngOnInit(){this.activatedRoute.params.subscribe(a=>{this.store$.dispatch(f.C.getActiveTask({taskId:a.id}))})}ngOnDestroy(){this.store$.dispatch(f.C.clear())}editTaskFormHandler(a,n){if(a.invalid)return void this.notificationService.showErrorNotification("Invalid Form Fields!");const i=a.value;let o={};i.title&&i.title!==n.title&&(o={...o,title:i.title}),i.description&&i.description!==n.description&&(o={...o,description:i.description}),i.start_date&&i.start_date+" 00:00:00"!==n.start_date&&(o={...o,start_date:i.start_date}),i.end_date&&i.end_date+" 00:00:00"!==n.end_date&&(o={...o,end_date:i.end_date}),o={...o,id:n.id},this.store$.dispatch(f.C.updateActiveTask({taskId:n.id,changedTask:o})),this.editTask=!1}toInputDefaultDate(a){let n;return n=a?new Date(a):new Date,`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`}deleteTask(a){}updateTaskId(a,n,i,o){a&&i&&o&&n?this.taskService.updateTask(a,{id:a,[i]:o}).subscribe({next:d=>{this.notificationService.showSuccessNotification(d.message),this.store$.dispatch(y.U.updateActiveTaskSuccess({changedTask:d.task}))},error:d=>{this.notificationService.showErrorNotification(d.error.message)}}):alert("Invalid Task Update Request!")}}u.\u0275fac=function(a){return new(a||u)(t.Y36(A.yh),t.Y36(b.M),t.Y36(U.g),t.Y36(m.gz))},u.\u0275cmp=t.Xpm({type:u,selectors:[["app-task-details"]],decls:2,vars:3,consts:[[4,"ngIf"],["title","\u2714 TASK:",3,"text"],[1,"m-5","flex","gap-3","items-center","px-3","py-2","cursor-pointer","border","rounded",3,"routerLink"],[1,"bg-white","dark:bg-gray-800","relative","m-5","p-5","border","rounded"],["class","bg-white dark:bg-gray-800 mt-8 space-y-6 shadow p-10 rounded-lg\n            shadow-2xl dark:shadow dark:shadow-gray-500",3,"ngSubmit",4,"ngIf"],[1,"absolute","top-3","right-3"],["mat-icon-button","","aria-label","task menu",3,"matMenuTriggerFor"],["menu","matMenu"],["mat-menu-item","",3,"click"],[1,"my-5","flex","gap-3","items-center"],["mat-button","",1,"dark:hover:text-gray-700"],["selectorPriority",""],[3,"ngSwitch"],[3,"style",4,"ngSwitchCase"],["mat-button","",1,"dark:hover:bg-gray-700","px-2","py-1","cursor-pointer","border","rounded-full",3,"matMenuTriggerFor"],[1,"flex","items-center"],["selectorStatus",""],["xPosition","after",1,"example-mat-menu","dark:example-mat-menu-dark"],["statusMenu","matMenu"],["mat-menu-item","",3,"click",4,"ngFor","ngForOf"],[1,"p-5","border","bg-gray-50","dark:bg-gray-700"],[1,"py-5","flex","flex-wrap","justify-between"],[1,"mb-[9px]","text-xl"],[1,"mb-[5px]","text-[24px]"],[1,"bg-white","dark:bg-gray-800","mt-8","space-y-6","shadow","p-10","rounded-lg","shadow-2xl","dark:shadow","dark:shadow-gray-500",3,"ngSubmit"],["editTaskForm","ngForm"],[1,"flex","align-center","border","border-slate-600","rounded"],["type","text","name","title","placeholder","Title...","minlength","5","max","255","required","",1,"w-full","py-2","px-3","dark:bg-gray-800","dark:focus:bg-gray-900","dark:active:bg-gray-700",3,"ngModel"],["title","ngModel"],[1,"flex","flex-wrap"],[1,"w-[50%]","flex","gap-3"],[1,"text-color-light","dark:text-color-dark"],["type","date","name","start_date",1,"w-full","py-2","px-3","dark:bg-gray-800","dark:focus:bg-gray-900","dark:active:bg-gray-700",3,"ngModel"],["start_date","ngModel"],["name","time","ngModel","",1,"w-full","py-2","px-3","dark:bg-gray-800","dark:focus:bg-gray-900","dark:active:bg-gray-700"],["time","ngModel"],["value",""],["value","08:00:00"],["value","09:00:00"],["value","10:00:00"],["value","11:00:00"],["value","12:00:00"],["value","13:00:00"],["value","14:00:00"],["value","15:00:00"],["value","16:00:00"],["value","17:00:00"],["value","18:00:00"],["value","19:00:00"],["value","20:00:00"],[1,"w-[50%]"],["type","date","name","end_date",1,"w-full","py-2","px-3","dark:bg-gray-800","dark:focus:bg-gray-900","dark:active:bg-gray-700",3,"ngModel"],["due_date","ngModel"],["name","description","placeholder","Task Description...","required","",1,"w-full","min-h-[175px]","py-2","px-3","dark:bg-gray-800","dark:focus:bg-gray-900","dark:active:bg-gray-700",3,"ngModel"],["description","ngModel"],["type","submit",1,"relative","btn-primary","dark:btn-primary-dark"],["type","button",1,"py-2","px-3","ml-3","border","shadow","dark:shadow-gray-300","rounded","dark:active:bg-gray-700",3,"click"],["class","text-sm text-red-600",4,"ngIf"],[1,"text-sm","text-red-600"]],template:function(a,n){1&a&&(t.YNc(0,R,10,6,"ng-container",0),t.ALo(1,"async")),2&a&&t.Q6J("ngIf",t.lcZ(1,1,n.activeTask$))},dependencies:[g.sg,g.O5,g.RF,g.n9,c._Y,c.YN,c.Kr,c.Fj,c.EJ,c.JJ,c.JL,c.Q7,c.wO,c.On,c.F,Z.Hw,x.VK,x.OP,x.p6,m.rH,w.T,g.Ov,g.uU],data:{animation:[(0,l.X$)("fadeInOut",[(0,l.SB)("void",(0,l.oB)({transform:"scaleY(0.01)",opacity:0})),(0,l.eR)("void <=> *",(0,l.jt)(400))]),(0,l.X$)("fadeTaskInOut",[(0,l.SB)("void",(0,l.oB)({transform:"scaleY(0.01)",opacity:0})),(0,l.eR)("void <=> *",(0,l.jt)(800))])]}});const E=[{path:":id",component:u}];class p{}p.\u0275fac=function(a){return new(a||p)},p.\u0275mod=t.oAB({type:p}),p.\u0275inj=t.cJS({imports:[m.Bz.forChild(E),m.Bz]});var K=s(4466);class _{}_.\u0275fac=function(a){return new(a||_)},_.\u0275mod=t.oAB({type:_}),_.\u0275inj=t.cJS({imports:[g.ez,c.u5,Z.Ps,x.Tx,p,K.m]})}}]);