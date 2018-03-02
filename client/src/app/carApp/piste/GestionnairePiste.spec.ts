export class GestionnairePistes {

  private static gestionnairePistes: GestionnairePistes = null;

  private constructor() {} // singleton

  public static instance(): GestionnairePistes {
    if (this.gestionnairePistes === null) {
      this.gestionnairePistes = new GestionnairePistes();
    }

    return this.gestionnairePistes;
  }

  public ajouterPiste(): void {

  }

  public supprimerPiste(): void {}
}
