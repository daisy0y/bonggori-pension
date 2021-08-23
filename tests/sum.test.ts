// import sum from "../helpers/sum";

// describe("sum 함수 테스트", () => {
//     it("함수정상!", () => {
//         expect(sum(1, 2)).toBe(3);
//     });
// });

import sum from "../helpers/sum";

describe("The sum function should work as expected", () => {
    it("should sum numbers correctly", () => {
        expect(sum(1, 2)).toBe(3);
    });
});
