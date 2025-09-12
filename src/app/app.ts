import { Component, signal } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { Header } from "./core/header/header"
import { Footer } from "./core/footer/footer"
import { Home } from "./home/home"
import { Auth } from "./auth/auth"
import { Login } from "./auth/login/login"
import { Signup } from "./auth/signup/signup"
import { Course } from "./course/course"
import { Subscriptions} from "./subscriptions/subscriptions"
import { CourseList } from "./course/course-list/course-list";
import { CourseDetail } from "./course/course-detail/course-detail";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    Header,
    Footer,
    Home,
    Auth,
    Login,
    Signup,
    Course,
    Subscriptions,
    CourseList,
    CourseDetail
],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("info-caps")
}