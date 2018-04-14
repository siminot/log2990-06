import { DeroulemenCourseService, sujetDebutCourse, sujetFinCourse, sujetJoueur, sujetAi } from "./deroulemen-course.service";

describe("DeroulemenCourseService", () => {
    // beforeEach(() => {
    //     //
    // });

    // it("should be created", inject([DeroulemenCourseService], (service: DeroulemenCourseService) => {
    //     expect(service).toBeTruthy();
    // }));

    // c'est une classe statique, je peux pas vraiment la construire :(

    it("le sujet devrait dire aux observateur que la partie est debutee", () => {
        spyOn(sujetDebutCourse, "next");
        DeroulemenCourseService.debutCourse();
        expect(sujetDebutCourse.next).toHaveBeenCalled();
    });

    it("le sujet devrait dire aux observateur que la partie est terminee", () => {
        spyOn(sujetFinCourse, "next");
        DeroulemenCourseService.finCourse();
        expect(sujetFinCourse.next).toHaveBeenCalled();
    });

    it("le sujet devrait dire aux observateur que le joueur a termine un tour", () => {
        spyOn(sujetJoueur, "next");
        DeroulemenCourseService.nouveauTourJoueur();
        expect(sujetJoueur.next).toHaveBeenCalled();
    });

    it("le sujet devrait dire aux observateur qu'un AI a termine un tour", () => {
        spyOn(sujetAi, "next");
        DeroulemenCourseService.nouveauTourAi(0);
        expect(sujetAi.next).toHaveBeenCalled();
    });

});
