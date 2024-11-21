import { Component, Input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() label = "";
  @Input() opcoes: string[] = [];

  form = new FormGroup({
    label: new FormControl<string>('')
  })

  search = output<string>();

  onSubmit(){
    this.search.emit(this.form.controls.label.value || "")
  }
}
