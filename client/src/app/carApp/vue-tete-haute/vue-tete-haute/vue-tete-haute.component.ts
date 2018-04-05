import { Component, OnInit } from "@angular/core";
import { TimerService } from "../../timer/timer.service";

@Component({
  selector: "app-vue-tete-haute",
  templateUrl: "./vue-tete-haute.component.html",
  styleUrls: ["./vue-tete-haute.component.css"]
})
export class VueTeteHauteComponent implements OnInit {

  public constructor(private timer: TimerService) {
    this.timer.debuterCourse();
  }

  public ngOnInit(): void {
    //
  }

}
