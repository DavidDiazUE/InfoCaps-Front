import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-auth",
  imports: [CommonModule, RouterModule],
  templateUrl: "./auth.html",
  styleUrl: "./auth.css",
})
export class Auth {}