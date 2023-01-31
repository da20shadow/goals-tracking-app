import {Component} from '@angular/core';
import {TaskService} from "../../../tasks/services/task.service";
import {Task} from "../../../core/models";
import {ViewTaskModalComponent} from "../../../shared/components/tasks-list/view-task-modal/view-task-modal.component";
import {ModalService} from "../../../core/services/modal.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {AddTaskModalComponent} from "../../../shared/components/tasks-list/add-task-modal/add-task-modal.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        transform: 'scale(0.01)', opacity: 0
      })),
      transition('void <=> *', animate(400)),
    ]),
  ]
})
export class CalendarComponent {
  currentMonthTasksList: any[] = [];
  monthDays: any = [];
  prevMonthLastDays: any = [];
  nextMonthFirstDays: any = [];
  date = new Date();
  currentYear: any = this.date.getFullYear();
  currentMonth: any = this.date.getMonth();
  currentDate: any = this.date.getDate();
  monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private taskService: TaskService,private modalService: ModalService) {
    this.createCalendar()
  }

  createCalendar(monthToShow?: string) {

    if (monthToShow === 'next') {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
    } else if (monthToShow === 'prev') {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
    }

    let firstDayOfTheCurrentMonth = new Date(this.currentYear, this.currentMonth, 1).getDay(),
      lastDayOfCurrentMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();


    const previewsMonthLastDay = this.currentMonth === 0
      ? new Date(this.currentYear - 1, 12, 0).getDate()
      : new Date(this.currentYear, this.currentMonth, 0).getDate();

    firstDayOfTheCurrentMonth = firstDayOfTheCurrentMonth === 0 ? 7 : firstDayOfTheCurrentMonth
    if (firstDayOfTheCurrentMonth > 1) {
      const prevMonthDays = previewsMonthLastDay - (firstDayOfTheCurrentMonth - 1);
      for (let i = previewsMonthLastDay; i > prevMonthDays; i--) {
        this.prevMonthLastDays.unshift(i);
      }
    }

    for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
      this.monthDays.push(i);
    }

    const filledBoxes = this.prevMonthLastDays.length + this.monthDays.length;
    if (filledBoxes > 35) {
      const availableBoxes = 42 - filledBoxes;
      for (let i = 1; i <= availableBoxes; i++) {
        this.nextMonthFirstDays.push(i)
      }
    } else if (filledBoxes >= 30) {
      const availableBoxes = 35 - filledBoxes;
      for (let i = 1; i <= availableBoxes; i++) {
        this.nextMonthFirstDays.push(i)
      }
    }
    this.getCurrentMonthTasks(this.currentYear, this.currentMonth + 1);
  }

  getCurrentMonthTasks(year: number, month: number) {
    this.taskService.getTasksByMonth(year, month).subscribe({
      next: (tasks) => {
        console.log(tasks)
        tasks.forEach(t => {
          if (t.start_date) {
            const taskDate = new Date(t.start_date);
            this.currentMonthTasksList.push({position: taskDate.getDate(), task: t})
          }
        })
      },
      error: (err) => {

      }
    })
  }

  openViewTaskModal(task: Task) {
    this.modalService.openFormModal(ViewTaskModalComponent,{task})
  }

  prevMonth() {
    this.clearCalendar();
    this.createCalendar('prev');
  }

  nextMonth() {
    this.clearCalendar();
    this.createCalendar('next');
  }

  clearCalendar() {
    this.currentMonthTasksList = [];
    this.monthDays = [];
    this.prevMonthLastDays = [];
    this.nextMonthFirstDays = [];
  }

  addNewTask(day: number) {
    const boxDate = new Date(this.currentYear, this.currentMonth, day);
    this.modalService.openFormModal(AddTaskModalComponent,{boxDate});
  }
}
