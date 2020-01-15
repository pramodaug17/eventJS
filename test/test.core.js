describe("Test 1", () => {
    describe("events", () => {
        it("should retrun true", () => {
            assert.equal(true, !!window.events);
        })
    })

    describe("events.methods", () => {
        it("(on) should return true.", () => {
            assert.equal(true, !!events.on);
        });
        it("(off) should return true", () => {
            assert.equal(true, !!events.off);
        });
        it("(emit) should return true", () => {
            assert.equal(true, !!window.events.emit);
        });
        it("(registerEvent) should return true", () => {
            assert.equal(true, !!window.events.registerEvent);
        });
    })
});