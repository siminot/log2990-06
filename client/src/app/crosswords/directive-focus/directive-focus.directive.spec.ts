import { DirectiveFocusDirective } from './directive-focus.directive';
import { GrilleComponent } from '../grille/grille.component';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';

describe('DirectiveFocusDirective', () => {
  it('should create an instance', () => {
    const service = new RequeteDeGrilleService();
    const grilleComp = new GrilleComponent(service);
    const directive = new DirectiveFocusDirective(grilleComp);
    expect(directive).toBeTruthy();
  });
});
