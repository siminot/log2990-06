import { inject } from "@angular/core/testing";

import { DeroulemenCourseService } from "./deroulemen-course.service";

describe("DeroulemenCourseService", () => {
    beforeEach(() => {
        //
    });

    it("should be created", inject([DeroulemenCourseService], (service: DeroulemenCourseService) => {
        expect(service).toBeTruthy();
    }));
});
