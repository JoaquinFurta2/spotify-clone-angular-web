import { Injectable, signal } from "@angular/core";
import { color } from "../models/data.model";

@Injectable ({
    providedIn:'root'
}) export class hoverColorService {
    currentHoverColor = signal<color>({accent:'',dark:''})
}